Mode Rétro NIRD - Nuit de l'Info 2025
=====================================

Une page spéciale en style 8-bit a été ajoutée au projet
« Village Numérique Résistant » pour répondre au défi :
« On veut du gros pixel ! ».

Accès à la page rétro
---------------------

En ligne (GitHub Pages) :

- Ouvrir l’URL publique du site, par exemple :
  <https://eferrier81.github.io/Nuit-de-l-info-2025/pages/retro.html>
  (adapter l’URL si le chemin du dépôt ou du dossier change)

En local :

- Se placer dans le dossier `nird-village`
- Lancer un petit serveur HTTP, par exemple :
  python -m http.server 8000
- Ouvrir ensuite : <http://localhost:8000/retro.html>

Contenu de la page rétro
------------------------

Fichier : retro.html

La page « Console du Village Résistant » propose :

- Un écran central type console 8-bit :
  - texte vert façon terminal CRT,
  - faux boot NIRD : détection de Windows 10 EOL, cloud hors UE,
    contre-attaque par migration Linux et reconditionnement,
  - objectif annoncé : « libérer les écoles du village ».
- Deux boutons style manette NES :
  - « Retour au village » -> index.html (page principale),
  - « Lancer le défi NIRD » -> quiz.html (quiz gamifié).
- Un bandeau bas rappelant :
  - les fiches solutions NIRD (solutions.html),
  - la FAQ du village (index.html#faq).

Style 8-bit
-----------

Les styles associés sont dans `css/style.css`, section :

- « MODE RÉTRO 8-BIT NIRD »

Caractéristiques principales :

- Palette limitée inspirée des jeux 8-bit :
  - vert CRT (#32c96b),
  - fond sombre (#020813),
  - gris (#444, #888),
  - accent orange (#ffb347).
- Police monospace type terminal :
  - "Lucida Console", "Courier New", monospace.
- Fond quadrillé pixellisé et effet CRT sur l’écran.
- Boutons « NES » :
  - bords carrés, ombres en escalier, effets de survol.
- Image rendering réglé sur `pixelated` pour les éventuels sprites.

Intégration avec le reste du site
---------------------------------

- Un lien direct vers la page rétro est présent dans la navigation
  de la page d’accueil `index.html` :
  - Menu : « Mode rétro NIRD » -> retro.html
- Un lien supplémentaire se trouve en bas de la section « Prêt(e) à libérer ton établissement ? » :
  - « Console du Village Résistant (mode 8-bit) » -> retro.html

Résumé pour le jury
-------------------

Pour voir le mode rétro 8-bit du Village Numérique Résistant :

- Ouvrir : <https://eferrier81.github.io/Nuit-de-l-info-2025/pages/retro.html>
- Ou, depuis la home du site, cliquer sur « Mode rétro NIRD » dans la barre de navigation.
