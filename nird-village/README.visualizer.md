# Visualiseur Audio – Village Numérique Résistant

Cette page fait partie du projet de la Nuit de l’Info et illustre le défi **Visualisation Audio**.
Elle propose un visualiseur audio rétro / néon qui réagit en temps réel à la musique choisie par
l’utilisateur grâce à la **Web Audio API**.

## Où se trouve le visualiseur ?

- Fichier : `nird-village/visualizer.html`
- URL (GitHub Pages) typique :
  - `https://eferrier81.github.io/Nuit-de-l-info-2025/visualizer.html`
- Depuis la page d’accueil `index.html`, un bouton **“Voir le Visualiseur Audio”** est disponible
  dans le bloc d’actions principal.

## Comment tester rapidement

### En local

Depuis le dossier `nird-village` :

```powershell
python -m http.server 8000
```

Puis ouvrir dans votre navigateur :

```text
http://localhost:8000/visualizer.html
```

### En ligne (jury)

Ouvrir directement :

```text
https://eferrier81.github.io/Nuit-de-l-info-2025/visualizer.html
```

> Remarque : certains navigateurs exigent une interaction utilisateur (clic) pour démarrer
> l’audio, c’est normal. Chargez d’abord un fichier puis cliquez sur Lecture.

## Fonctionnement côté interface

- Un **header** en haut de l’écran propose :
  - Un bouton **“Choisir un fichier audio”** (`input type="file"`) pour charger un MP3/OGG/WAV.
  - Un bouton **Lecture / Pause**.
  - Un **slider de volume**.
- La zone centrale est un `<canvas>` plein écran où s’affiche la visualisation.
- Un message d’accueil invite à choisir une piste pour "lancer la fête".

## Fonctionnement technique (Web Audio API)

- La page utilise un `AudioContext` connecté à :
  - `createMediaElementSource(audio)` comme source (l’élément `<audio>` HTML caché).
  - Un `GainNode` pour gérer le volume.
  - Un `AnalyserNode` configuré avec `fftSize = 2048`.
- À chaque frame (`requestAnimationFrame`) :
  - `analyser.getByteFrequencyData()` remplit un tableau avec les amplitudes fréquentielles.
  - Le script dessine un **spectre en barres** :
    - Barres verticales centrées sur la hauteur, de taille proportionnelle au niveau de chaque bande.
    - Couleurs en dégradé (vert → teintes plus chaudes) pour un effet néon.
    - Lignes de "scan" horizontales pour rappeler les vieux lecteurs multimédia.

## Ce que le jury peut regarder en 2–3 minutes

1. Ouvrir la page `visualizer.html`.
2. Charger un fichier audio via le bouton **“Choisir un fichier audio”**.
3. Lancer la **Lecture** :
   - Les barres se mettent à vibrer au rythme de la musique.
   - Les couleurs et la hauteur des barres changent avec l’énergie du son.
4. Ajuster le **volume** pour voir que la dynamique visuelle suit toujours.

## Points techniques à mettre en avant

- 100 % **front-end**, compatible avec un hébergement statique (GitHub Pages).
- Utilisation de la **Web Audio API** (AnalyserNode, GainNode, MediaElementSource).
- Visualisation en temps réel dans un `<canvas>` avec `requestAnimationFrame`.
- Design cohérent avec l’univers du **Village Numérique Résistant** (fond sombre, accents néon).

## Évolutions possibles

- Ajouter un bouton "Mode spécial" pour alterner entre plusieurs styles :
  - cercle/anneau de barres,
  - tunnel,
  - vue "oscilloscope" (waveform).
- Gérer la capture micro (`getUserMedia`) en plus des fichiers locaux.
- Ajouter de petites interactions (flash sur kick/basses, surbrillance selon le tempo, etc.).
