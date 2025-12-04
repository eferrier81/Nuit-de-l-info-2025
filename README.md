# Village Numérique Résistant - NIRD

Landing page de l’application web **"Village Numérique Résistant"** créée pour la Nuit de l’Info 2025 afin de sensibiliser au **Numérique Inclusif, Responsable et Durable (NIRD)**.

## Structure minimale actuelle

- `index.html` : page d’accueil interactive avec CTA, stats fictives et modal "Rejoindre NIRD".
- `css/style.css` : design système vert, responsive, axe accessibilité.
- `js/main.js` : logique de la landing page (menu mobile, stats, barre de progression, formulaire).

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
