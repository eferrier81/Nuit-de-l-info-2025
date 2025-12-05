(function () {
  const messagesEl = document.getElementById('chatbruti-messages');
  const formEl = document.getElementById('chatbruti-form');
  const inputEl = document.getElementById('chatbruti-input');
  const container = document.querySelector('.chatbruti-container');
  const toggleBtn = container?.querySelector('.chatbruti-toggle');

  if (!messagesEl || !formEl || !inputEl || !container) return;

  
  let conversationHistory = [];
  const MAX_HISTORY = 6; 

  // Réponses de secours si l'API échoue (anciennes réponses)
  const philosophicOpeners = [
    "Intéressante question, mais laisse-moi d'abord te parler d'une chaise.",
    "On me pose souvent cette question, alors que je n'écoute jamais la réponse.",
    "Comme disait probablement quelqu'un un jour, ou pas :",
    "Je vais répondre avec la gravité d'un écran cathodique.",
    "Ta question me rappelle un vieux bug sous Windows 3.1 :",
    "Ah ! Cette question me fait vibrer comme un vieux modem 56k.",
    "Excellente interrogation ! J'ai crashé 3 fois en essayant d'y réfléchir.",
  ];

  const vaguePhilosophies = [
    "La vraie réponse, c'est peut-être la question que tu n'as pas encore mal formulée.",
    "Dans le grand village du numérique, même les pixels se demandent s'ils sont inclusifs.",
    "Si un serveur tombe dans une forêt sans connexion, fait-il encore du tracking ?",
    "Entre dépendance et liberté, il y a surtout beaucoup de mots compliqués.",
    "Le nuage n'est qu'un autre mot pour dire : 'l'ordinateur de quelqu'un d'autre'. Profond, non ?",
    "Comme disait mon processeur : 'Je calcule, donc je souffre.'",
  ];

  const digressions = [
    "Parlons plutôt des castors qui reconditionnent des PC à base de branches recyclées.",
    "Cette question est si belle que je préfère ne pas l’abîmer avec une réponse.",
    "Pendant que tu lis ceci, quelque part un administrateur système met à jour un serveur… ou pas.",
    "Tu sais, au lycée Carnot de mon imagination, on pose exactement la même non-question.",
    "Je propose de migrer ta question sous Linux, peut-être qu’elle boote mieux là-bas.",
  ];

  const compliments = [
    "Tu as l’air brillant·e, un peu comme un pixel en 8‑bit sur-fondu.",
    "Honnêtement, si toutes les questions étaient comme la tienne, je serais tout aussi perdu, mais heureux.",
    "On sent une grande sagesse… quelque part… dans un cache CDN lointain.",
    "Tes idées sont plus durables qu’une licence propriétaire, c’est déjà énorme.",
    "Je n’ai rien compris, mais c’était inspirant comme un changelog de noyau Linux.",
  ];

  const pseudoQuotes = [
    "‘Là où finit le support Windows, commence la philosophie.’ – Chat’rlatan",
    "‘Qui contrôle le cloud contrôle les parents d’élèves.’ – Grand-Mère NIRD",
    "‘Je pense donc je lag.’ – Processeur Anonyme",
    "‘L’inclusion commence quand on partage le Wi-Fi… parfois.’ – Vieux Routeur",
    "‘Mieux vaut un PC reconditionné qu’une idée jamais patchée.’ – Sphinx du Data Center",
  ];

  const weirdQuestions = [
    "Mais au fait, as-tu déjà demandé son avis à ton vieux PC Windows 10 ?",
    "Entre nous, tu ferais confiance à un serveur caché derrière un nuage ?",
    "Penses-tu qu’un ping peut avoir des émotions ?",
    "Et si la vraie dépendance, c’était aux notifications, pas aux licences ?",
    "À ton avis, un pingouin peut-il enseigner la sobriété numérique ?",
  ];

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function extractKeyword(userText) {
    const lower = userText.toLowerCase();
    if (lower.includes('windows')) return 'Windows 10 EOL';
    if (lower.includes('linux')) return 'GNU/Linux';
    if (lower.includes('google') || lower.includes('microsoft')) return 'les géants du numérique';
    if (lower.includes('cloud') || lower.includes('serveur')) return 'un nuage mystérieux';
    if (lower.includes('nird')) return 'le NIRD';
    if (lower.includes('école') || lower.includes('lycée')) return 'une école pleine de câbles';
    return null;
  }

  function buildAnswer(userText) {
    const keyword = extractKeyword(userText);
    const mode = Math.floor(Math.random() * 4); // 0,1,2,3

    if (mode === 0) {
      const opener = pickRandom(philosophicOpeners);
      const body = pickRandom(vaguePhilosophies);
      const tail = keyword
        ? ` D’ailleurs, tout cela s’applique parfaitement à ${keyword}, évidemment.`
        : " Je ne vois pas le rapport avec ta question, mais ça me rassure.";
      return `${opener} ${body}${tail}`;
    }

    if (mode === 1) {
      const dig = pickRandom(digressions);
      const quote = pickRandom(pseudoQuotes);
      return `${dig} ${quote}`;
    }

    if (mode === 2) {
      const comp = pickRandom(compliments);
      const fakeAnalysis = keyword
        ? ` Ton message contient le mot-clé secret « ${keyword} ». Je ne ferai rien avec, mais ça a l’air important.`
        : " J’ai analysé chaque lettre de ta phrase et j’en conclus qu’il te faudrait un bon chocolat chaud.";
      return `${comp} ${fakeAnalysis}`;
    }

    const opener = pickRandom(philosophicOpeners);
    const wq = pickRandom(weirdQuestions);
    const pseudo = pickRandom(pseudoQuotes);
    return `${opener} ${wq} ${pseudo}`;
  }

  function addMessage(text, isUser) {
    const wrapper = document.createElement('div');
    wrapper.className = 'chatbruti-message ' + (isUser ? 'chatbruti-message--user' : 'chatbruti-message--bot');

    const bubble = document.createElement('div');
    bubble.className = 'chatbruti-bubble';
    bubble.innerText = text;

    wrapper.appendChild(bubble);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // Ajouter un indicateur de typing
  function showTypingIndicator() {
    const wrapper = document.createElement('div');
    wrapper.className = 'chatbruti-message chatbruti-message--bot chatbruti-typing-indicator';
    wrapper.id = 'typing-indicator';
    
    const bubble = document.createElement('div');
    bubble.className = 'chatbruti-bubble';
    bubble.innerHTML = '<span class="typing-dot">.</span><span class="typing-dot">.</span><span class="typing-dot">.</span>';
    
    wrapper.appendChild(bubble);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  // Fonction pour appeler l'API OpenAI
  async function getAIResponse(userMessage) {
    // Vérifier si la config existe et si USE_AI est activé
    if (typeof CHATBOT_CONFIG === 'undefined' || !CHATBOT_CONFIG.USE_AI) {
      return buildAnswer(userMessage); // Fallback sur réponses locales
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHATBOT_CONFIG.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: CHATBOT_CONFIG.MODEL || 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: CHATBOT_CONFIG.SYSTEM_PROMPT
            },
            ...conversationHistory,
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: CHATBOT_CONFIG.MAX_TOKENS || 150,
          temperature: CHATBOT_CONFIG.TEMPERATURE || 1.2,
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content.trim();

      // Mettre à jour l'historique
      conversationHistory.push(
        { role: 'user', content: userMessage },
        { role: 'assistant', content: aiResponse }
      );

      // Limiter l'historique
      if (conversationHistory.length > MAX_HISTORY) {
        conversationHistory = conversationHistory.slice(-MAX_HISTORY);
      }

      return aiResponse;

    } catch (error) {
      console.error('Erreur API OpenAI:', error);
      // Fallback sur réponses locales en cas d'erreur
      return buildAnswer(userMessage) + " (Mon cerveau quantique a bugé, je suis en mode dégradé.)";
    }
  }

  formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = inputEl.value.trim();
    if (!value) return;

    // Désactiver l'input pendant le traitement
    inputEl.disabled = true;

    addMessage(value, true);
    inputEl.value = '';

    // Afficher l'indicateur de typing
    showTypingIndicator();

    try {
      // Utiliser l'API OpenAI si disponible
      const answer = await getAIResponse(value);
      
      // Petit délai pour rendre plus naturel
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
      
      removeTypingIndicator();
      addMessage(answer, false);
    } catch (error) {
      console.error('Erreur:', error);
      removeTypingIndicator();
      addMessage("Mon processeur a crashé ! Redémarre-moi en rafraîchissant la page. 🔌", false);
    } finally {
      // Réactiver l'input
      inputEl.disabled = false;
      inputEl.focus();
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isCollapsed = container.classList.toggle('chatbruti-container--collapsed');
      toggleBtn.textContent = isCollapsed ? '▲' : '▼';
    });
  }
})();
