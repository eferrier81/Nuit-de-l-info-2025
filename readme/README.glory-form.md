# Formulaire de la Gloire – Cérémonie de Remise de Prix

Cette page fait partie du projet **Village Numérique Résistant** pour la Nuit de l’Info.
Elle illustre un défi **front-end / UX** : transformer un simple formulaire de contact
en une véritable **cérémonie de remise de prix** avec projecteurs, confettis et message :
> **« Félicitations, vous avez gagné ! »**

## Où se trouve le "Formulaire de la Gloire" ?

- Fichier : `nird-village/pages/glory-form.html`
- URL (GitHub Pages) typique :
  - `https://eferrier81.github.io/Nuit-de-l-info-2025/pages/glory-form.html`
- Depuis la page d’accueil `index.html` :
  - Un lien dans la section "Passer à l’action" :
    - **« contacter le Jury de la Gloire »** → ouvre directement `glory-form.html`.

## Comment tester rapidement

### En local

Depuis le dossier `nird-village` :

```powershell
python -m http.server 8000
```

Puis ouvrir dans votre navigateur :

```text
http://localhost:8000/pages/glory-form.html
```

### En ligne (jury)

Ouvrir directement :

```text
https://eferrier81.github.io/Nuit-de-l-info-2025/pages/glory-form.html
```

## Champs et validation

Le formulaire est 100 % front-end (pas d’envoi serveur), mais **fonctionnel** :

- Champs présents :
  - **Nom** (`#glory-name`) – requis
  - **Email** (`#glory-email`) – requis + validation basique de format
  - **Sujet** (`#glory-subject`) – requis
  - **Message** (`#glory-message`) – requis, **minimum 30 caractères**
- Validation :
  - Gérée en JavaScript dans un `<script>` en bas de `glory-form.html`.
  - Messages d’erreur affichés sous les champs en cas de saisie invalide.
  - Soumission bloquée (`event.preventDefault()`) tant que le formulaire n’est pas valide.

Une fois les champs valides, un "faux envoi" est simulé (pas de back-end), puis la popup
cérémonielle s’ouvre.

## Popup de victoire : "Félicitations, vous avez gagné !"

Après soumission réussie :

- Un **overlay** couvre l’écran (`.glory-overlay`).
- Une carte centrale s’ouvre avec :
  - Un trophée 🏆 animé.
  - Le titre : **« Félicitations, vous avez gagné ! »**.
  - Un texte de félicitations qui fait le lien avec le **Village Numérique Résistant**.
- Des **confettis** tombent via de simples `<div>` animés en CSS.
- Un bouton **« Revenir sur scène »** permet de fermer la popup.
- Fermeture possible aussi par clic en dehors de la carte ou par la touche **Échap**.

Il s’agit d’une cérémonie purement front-end, pensée pour être amusante à regarder
2–3 minutes par le jury.

## Détails techniques

- Stack : **HTML/CSS/JavaScript pur**, aucun framework.
- Pas de backend : l’envoi est **simulé** côté front (utile pour un hébergement statique).
- Architecture :
  - HTML : structure complète dans `glory-form.html` (formulaire + overlay + confettis).
  - CSS : styles et animations dans un bloc `<style>` du même fichier.
  - JS : script inline en bas de `glory-form.html` qui gère :
    - la validation,
    - l’interception du submit,
    - l’affichage de la popup,
    - la génération des confettis,
    - les easter eggs.

## Easter eggs (à mentionner au jury)

Le script contient plusieurs **easter eggs** documentés par des commentaires `// Easter egg ...` :

1. **Konami Code – changement de thème**
   - Commentaire : `// Easter egg 1 : Konami code -> change le thème de la cérémonie`.
   - Combinaison à taper avec le clavier :
     - `↑ ↑ ↓ ↓ ← → ← → B A`
   - Effet : bascule la classe `glory-alt-theme` sur le `body` → la scène change de couleurs
     (thème plus "techno" bleu/rose, aura différente autour des cartes et du bouton).

2. **Clic sur "Ne cliquez surtout pas ici"**
   - Commentaire : `// Easter egg 2 : clic sur la petite ligne "Ne cliquez surtout pas ici"`.
   - Élément : texte discret en bas de la carte latérale (`#glory-secret-click`).
   - Effet : le texte se transforme en message "Trop tard, la légende retiendra ce clic." avec un
     petit effet lumineux.

3. **Sujet spécial « Nuit de l’Info »**
   - Commentaire : `// Easter egg 3 : sujet exactement "Nuit de l'Info" -> message personnalisé`.
   - Si le champ **Sujet** est exactement `Nuit de l'Info` ou `Nuit de l Info` :
     - Un message personnalisé est préparé dans `popupMessage.dataset.special`.
     - Au moment de l’ouverture de la popup, ce message remplace le texte standard.

En plus :

- Mention de **Linux** ou **NIRD** dans le sujet ou le message déclenche aussi des variantes
  de texte de félicitations (médaille open source / médaille NIRD).

## Ce que le jury peut vérifier en 2–3 minutes

1. Aller sur `glory-form.html` ou via le lien "contacter le Jury de la Gloire" sur `index.html`.
2. Tester un envoi classique :
   - Remplir tous les champs (message ≥ 30 caractères).
   - Cliquer sur **« Invoquer la Gloire »**.
   - Vérifier que :
     - un message d’erreur apparaît si un champ est vide ou invalide,
     - la popup de victoire s’affiche une fois tout valide,
     - la phrase **« Félicitations, vous avez gagné ! »** est bien visible.
3. Tester les easter eggs :
   - Taper le **Konami code** pour changer le thème.
   - Cliquer sur la phrase "Ne cliquez surtout pas ici".
   - Mettre le sujet à `Nuit de l'Info` et renvoyer le formulaire pour voir le message spécial.

## Points à noter dans le README principal

Dans le `README.md` global du projet, vous pouvez ajouter :

- Une section "Formulaire de la Gloire" avec :
  - Lien vers `glory-form.html` (URL GitHub Pages).
  - Rappel : formulaire purement front-end, avec cérémonial de victoire.
  - Liste rapide des easter eggs ci-dessus.

Cela permettra aux organisateurs de la Nuit de l’Info de tester facilement cette
partie du projet et d’identifier les interactions cachées.
