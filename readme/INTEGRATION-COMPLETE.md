# Chatbot Chat'rlatan - Intégration OpenAI

## Ce qui a été fait

### Fichiers créés

1. **`js/config.js`** - Configuration principale ( À configurer avec la clé API)
2. **`test-chatbot.html`** - Page de test complète
3. **`.gitignore`** - Protection de la clé API

### Fichiers modifiés

1. **`js/chatbruti.js`** - Intégration OpenAI avec fallback
2. **`css/style.css`** - Animations typing indicator
3. **Tous les HTML** - Import du fichier config

---

### 1. Configurer votre clé API

Ouvrez `nird-village/js/config.js` et remplacez :

```javascript
OPENAI_API_KEY: 'votre-cle-api-ici',
```

### 2. Tester le chatbot

```powershell
cd "c:\Users\mdjema02\Desktop\Nuitd'info2025\Nuit-de-l-info-2025\nird-village"
python -m http.server 8000
```

Puis ouvrez ces pages :

- **Test complet** : <http://localhost:8000/test-chatbot.html>
- **Mode rétro** : <http://localhost:8000/retro.html>
- **Solutions** : <http://localhost:8000/solutions.html>
- **Quiz** : <http://localhost:8000/quiz.html>
- **Accueil** : <http://localhost:8000/index.html>

### 3. Vérifier que tout fonctionne

Sur la page `test-chatbot.html`, cliquez sur :

1. "Tester l'API OpenAI" → doit afficher "Test réussi !"
2. Les 3 boutons de test de conversation

---

## Caractéristiques du chatbot que je ajouté

### Mode IA (OpenAI)

 Réponses dynamiques et créatives
 Se souvient des 6 derniers messages
 Personnalité cohérente
 Vraiment drôle et absurde

### Mode Local (Fallback)

 Fonctionne sans API
 Réponses prédéfinies
 Pas de coût
 Fallback automatique si l'API échoue

### Animations

 Indicateur "typing..." animé
 Apparition fluide des messages
 Interface responsive

---

## Personnalisation

### Changer la personnalité

Éditez `SYSTEM_PROMPT` dans `config.js` :

```javascript
SYSTEM_PROMPT: `Tu es un pirate philosophe qui parle comme un vieux navigateur Netscape...`
```

### Ajuster la créativité

```javascript
TEMPERATURE: 0.7,  // Plus cohérent, moins fou
TEMPERATURE: 1.5,  // Plus créatif, plus absurde
```

### Changer le modèle

```javascript
MODEL: 'gpt-4',  // Plus intelligent (mais plus cher)
```

## Tests recommandés

1. **Test basique** : "Bonjour !"
2. **Test NIRD** : "Qu'est-ce que le NIRD ?"
3. **Test technique** : "Pourquoi Linux ?"
4. **Test absurde** : "Parle-moi de castors"
5. **Test mémoire** : Posez 3 questions liées
