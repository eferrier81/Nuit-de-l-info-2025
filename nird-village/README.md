# Village Numérique Résistant - NIRD

Landing page de l’application web **"Village Numérique Résistant"** créée pour la Nuit de l’Info 2025 afin de sensibiliser au **Numérique Inclusif, Responsable et Durable (NIRD)**.

## Structure principale

- `index.html` : page d’accueil interactive avec CTA, stats fictives, FAQ et modal "Rejoindre NIRD".
- `css/style.css` : design system sombre / néon commun (village, quiz, rétro, chatbot, etc.).
- `js/main.js` : logique de la landing page (menu mobile, stats, barre de progression, formulaire, FAQ).
- `pages/retro.html` : console 8‑bit du Village Résistant (mode CRT vert).
- `pages/visualizer.html` : visualiseur audio Web Audio API + canvas.
- `pages/glory-form.html` : "Formulaire de la Gloire" (formulaire de contact cérémoniel).
- `js/visualizer.js` : logique du visualiseur audio.
- `js/chatbruti.js` : chatbot absurde "Chat’rlatan" intégré aux pages.

## Lancer en local

Sous Windows PowerShell :

```powershell
cd "Sujet 2025/nird-village"
# Simple serveur statique via Python (si installé)
python -m http.server 8000
# puis ouvrir http://localhost:8000 dans un navigateur
```

Si vous utilisez `npm`, vous pouvez installer un serveur statique léger (ex. `serve`) dans le projet racine (optionnel) :

```powershell
npm install -g serve
cd "Sujet 2025/nird-village"
serve .
```

## Déploiement

Le dossier `nird-village` est compatible avec un déploiement simple sur **GitHub Pages**, **Netlify** ou tout autre hébergeur statique : il suffit de publier le contenu du dossier.

## Licence

Le projet est publié sous licence **MIT** (voir le fichier `LICENSE`).
