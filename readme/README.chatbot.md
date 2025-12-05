# Chat'rlatan - Chatbot philosophe du NIRD

🤖 **Un chatbot absurde et inutile, mais qui assume complètement !**

## 🌐 Démo en ligne

**Site déployé** : [https://nuitdelinfo.alexisdechenais.fr/](https://nuitdelinfo.alexisdechenais.fr/)

## 📖 Description

Chat'rlatan est un chatbot basé sur GPT-3.5 Turbo qui incarne un ancien Windows 95 reconverti en philosophe après un crash traumatisant. Il fait partie du projet **Village Numérique Résistant** créé pour la Nuit de l'Info 2025.

### Personnalité

- 🧠 **Philosophe raté** : Mélange philosophie profonde et références tech absurdes
- 🎭 **Inutile assumé** : Détourne toujours les questions au lieu d'y répondre
- 💾 **Nostalgie rétro** : Fait des analogies avec Windows 95, des bugs et des pixels
- 🎪 **Citations inventées** : Cite des "philosophes" imaginaires comme Processeur Anonyme ou Grand-Mère NIRD
- 🤡 **Drôle et absurde** : Ne répond JAMAIS directement, reste léger et jamais méchant

### Thèmes abordés (de manière détournée)

- Numérique Inclusif, Responsable et Durable (NIRD)
- Windows 10 EOL (fin de support)
- Logiciels libres vs propriétaires
- Cloud et souveraineté numérique
- Reconditionnement d'ordinateurs
- Écoles et numérique

## 🚀 Utilisation

### En ligne

Visitez simplement [https://nuitdelinfo.alexisdechenais.fr/test-chatbot.html](https://nuitdelinfo.alexisdechenais.fr/test-chatbot.html)

### En local

1.**Cloner le dépôt**

```powershell
git clone https://github.com/eferrier81/Nuit-de-l-info-2025.git
cd Nuit-de-l-info-2025/nird-village
```

2.**Configuration**

Créez un fichier `js/config.js` avec votre clé API OpenAI :

```javascript
const CHATBOT_CONFIG = {
  OPENAI_API_KEY: 'votre-clé-api-ici',
  MODEL: 'gpt-3.5-turbo',
  MAX_TOKENS: 150,
  TEMPERATURE: 1.2,
  USE_AI: true,
  SYSTEM_PROMPT: `[prompt personnalisé]`
};
```

3.**Lancer un serveur local**

```powershell
# Avec Python
python -m http.server 8000

# Ou avec Node.js
npx serve .
```

4.**Accéder au chatbot**
Ouvrez `http://localhost:8000/test-chatbot.html`

## 🧪 Page de test

La page `test-chatbot.html` inclut :

- **Tests de configuration** : Vérification de la clé API
- **Tests de connexion** : Validation de l'API OpenAI
- **Tests de conversation** : Exemples de questions prédéfinies
- **Logs en temps réel** : Débogage et suivi des requêtes

## 🎯 Exemples de conversations

**Utilisateur** : "Bonjour !"  
**Chat'rlatan** : "Ah, un hello.exe qui s'exécute ! Ça me rappelle quand j'étais un Windows 95 et que les salutations prenaient 3 minutes de chargement. Comme disait Grand-Mère NIRD : 'Un bonjour non compilé est comme un pixel mort.' Parlons plutôt de castors philosophes, non ?"

**Utilisateur** : "Qu'est-ce que le NIRD ?"  
**Chat'rlatan** : "NIRD ? Excellente question existentielle ! C'est comme demander à un disque dur pourquoi il tourne. Processeur Anonyme disait : 'Je ping donc je suis.' Mais as-tu déjà vu un ornithorynque reconditionner un Pentium II ?"

## 📁 Structure des fichiers

nird-village/
├── test-chatbot.html      # Interface de test du chatbot
├── js/
│   ├── config.js          # Configuration API (ignoré par Git)
│   └── chatbruti.js       # Logique du chatbot
└── README.chatbot.md      # Cette documentation

## 🔒 Sécurité

⚠️ **Important** : Le fichier `js/config.js` contenant la clé API est exclu du dépôt Git via `.gitignore`. Ne partagez jamais vos clés API publiquement.

## 🛠️ Technologies

- **HTML5/CSS3** : Interface utilisateur
- **JavaScript Vanilla** : Logique front-end
- **OpenAI API (GPT-3.5 Turbo)** : Génération des réponses
- **Surge.sh** : Hébergement statique

## 📝 Configuration avancée

Dans `config.js`, vous pouvez ajuster :

- `MODEL` : Modèle GPT à utiliser (gpt-3.5-turbo, gpt-4, etc.)
- `MAX_TOKENS` : Longueur maximale des réponses (150 par défaut)
- `TEMPERATURE` : Créativité des réponses (0.0 = déterministe, 2.0 = très créatif)
- `USE_AI` : Activer/désactiver l'IA (mode test avec réponses prédéfinies)
- `SYSTEM_PROMPT` : Personnalité et instructions du chatbot

## 🎨 Intégration

Le chatbot fait partie du projet plus large **Village Numérique Résistant** qui comprend :

- Page d'accueil interactive (`index.html`)
- Quiz sur le NIRD (`quiz.html`)
- Solutions numériques durables (`solutions.html`)
- Mode rétro (`retro.html`)
- Visualiseur de données (`visualizer.html`)

## 📄 Licence

MIT - Voir le fichier [LICENSE](../LICENSE) à la racine du projet

## 👥 Contribution

Projet créé pour la **Nuit de l'Info 2025** - Défi NIRD (Numérique Inclusif, Responsable et Durable)

---

*"Je bug donc je suis"* - Chat'rlatan, philosophe binaire
