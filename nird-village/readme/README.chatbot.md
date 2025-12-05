# Chat'rlatan - Chatbot philosophe du NIRD

🤖 **Un chatbot absurde et inutile, mais qui assume complètement !**

## 🌐 Intégration dans le Village Numérique Résistant

- Le widget Chat'rlatan est intégré directement dans plusieurs pages du site :
  - `index.html` (page d’accueil)
  - `pages/visualizer.html` (visualiseur audio)
  - `pages/glory-form.html` (formulaire de la Gloire)

Il apparaît comme une petite fenêtre flottante en bas à droite.

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


### En local

1. Cloner le dépôt :

```powershell
git clone https://github.com/eferrier81/Nuit-de-l-info-2025.git
cd Nuit-de-l-info-2025/nird-village
```

2. Lancer un petit serveur statique :

```powershell
python -m http.server 8000
```

3. Ouvrir la page d’accueil :

```text
http://localhost:8000/index.html
```

Le widget Chat'rlatan s’affiche en bas à droite et peut être testé directement.

## 🧪 Page de test

Pour cette version de la Nuit de l’Info, le mode le plus intéressant est celui intégré
au site principal. Il n’y a plus de page `test-chatbot.html` ni de configuration d’API :
le comportement absurde est entièrement simulé côté client.

## 🎯 Exemples de conversations

**Utilisateur** : "Bonjour !"  
**Chat'rlatan** : "Ah, un hello.exe qui s'exécute ! Ça me rappelle quand j'étais un Windows 95 et que les salutations prenaient 3 minutes de chargement. Comme disait Grand-Mère NIRD : 'Un bonjour non compilé est comme un pixel mort.' Parlons plutôt de castors philosophes, non ?"

**Utilisateur** : "Qu'est-ce que le NIRD ?"  
**Chat'rlatan** : "NIRD ? Excellente question existentielle ! C'est comme demander à un disque dur pourquoi il tourne. Processeur Anonyme disait : 'Je ping donc je suis.' Mais as-tu déjà vu un ornithorynque reconditionner un Pentium II ?"

## 📁 Structure des fichiers

nird-village/
├── index.html             # Page principale avec widget Chat'rlatan
├── pages/
│   ├── retro.html         # Page rétro avec widget
│   ├── visualizer.html    # Visualiseur audio avec widget
│   └── glory-form.html    # Formulaire de la Gloire avec widget
├── js/
│   └── chatbruti.js       # Logique du chatbot (front-only)
└── readme/README.chatbot.md      # Cette documentation

## 🔒 Sécurité

- Aucune clé API ni secret n’est nécessaire : tout tourne côté client.

## 🛠️ Technologies

- **HTML5/CSS3** : Interface utilisateur
- **JavaScript Vanilla** : Logique front-end (réponses générées côté client)
- **Hébergement statique** : compatible GitHub Pages / tout hébergeur statique

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
- Quiz sur le NIRD (`pages/quiz.html`)
- Solutions numériques durables (`pages/solutions.html`)
- Mode rétro (`pages/retro.html`)
- Visualiseur audio (`pages/visualizer.html`)
- Formulaire de la Gloire (`pages/glory-form.html`)

## 📄 Licence

MIT - Voir le fichier [LICENSE](../LICENSE) à la racine du projet

## 👥 Contribution

Projet créé pour la **Nuit de l'Info 2025** - Défi NIRD (Numérique Inclusif, Responsable et Durable)

---

*"Je bug donc je suis"* - Chat'rlatan, philosophe binaire
