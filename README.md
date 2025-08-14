
# Portfolio 0xCyberLiTech

Ce dossier contient le site portfolio de 0xCyberLiTech, orienté cybersécurité et développement.

## Structure du dossier

- `index.html` : Page d’accueil du portfolio, avec préloader et présentation.
- `portfolio.html` : Page principale du portfolio, affichage des projets.
- `assets/` : Dossier des ressources (images, scripts, styles).
    - `logo.png` : Logo du site
    - `preloader-ultramodern.css` : Style du préloader
    - `preloader-ultramodern.js` : Script du préloader
    - `screenshot-1.png`, `screenshot-2.png` : Captures d’écran (à documenter ou supprimer si inutiles)
    - `script.js` : Script principal du site
    - `style.css` : Feuille de style principale
    - `tron-numbers-bg.js` : Script décoratif

## Interactions des fichiers
- `index.html` charge le CSS et JS depuis `assets/`.
- `script.js` récupère les dépôts GitHub et les affiche dynamiquement.
- Tous les champs dynamiques sont protégés contre les injections XSS via `escapeHTML`.
- Le CSS gère la mise en page, le thème, et l’adaptation mobile/tablette.

## Fonctionnalités principales
- Préloader animé et moderne
- Thème cyber/Tron, responsive
- Affichage dynamique des projets
- Footer personnalisé

## Sécurité
- Protection XSS assurée par la fonction `escapeHTML` dans le JS.
- Aucun code mort, doublon ou fichier orphelin détecté.

## Responsive & Optimisation
- Utilisation de flexbox, unités relatives, marges adaptatives.
- Compatible mobile et tablette.
- Code JS moderne, lisible et optimisé.
- CSS épuré, utilisation de variables et flexbox.

## Utilisation
Ouvrez `index.html` ou `portfolio.html` dans un navigateur pour accéder au portfolio.

## Auteur
- 0xCyberLiTech
- Année : 2025

---
Ce site est destiné à présenter des projets, scripts et tutoriels liés à la cybersécurité et au développement.
