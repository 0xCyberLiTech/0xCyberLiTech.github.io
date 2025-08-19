# Portfolio 0xCyberLiTech

## Structure du projet

```
index.html
portfolio.html
rapport.txt
README.md
assets/
  logo/
    logo.png
  portfolio/
    script.js
    style.css
    tron-numbers-bg.js
  preloader/
    preloader-ultramodern.css
    preloader-ultramodern.js
```

## Description des dossiers et fichiers

  - **logo/** : Contient le logo du site.
  - **portfolio/** : Scripts et styles du portfolio.
    - **script.js** : Logique d’affichage des projets, protection XSS, gestion du DOM.
    - **style.css** : Styles principaux, responsive design, thème Tron.
    - **tron-numbers-bg.js** : Script d’arrière-plan animé Tron.
  - **preloader/** : Ressources pour l’animation de préchargement.
    - **preloader-ultramodern.css** : Styles du préloader.
    - **preloader-ultramodern.js** : Logique d’animation du préloader.

## Interactions et rôles


## Sécurité


## Optimisation


## Compatibilité


## Auteur

0xCyberLiTech


Pour toute question ou amélioration, contactez l’auteur via GitHub.

## Structure du projet

```
index.html
portfolio.html
rapport.txt
README.md
assets/
  logo/
    logo.png
  portfolio/
    script.js
    style.css
    tron-numbers-bg.js
  preloader/
    preloader-ultramodern.css
    preloader-ultramodern.js
```

## Description des fichiers et dossiers

- **index.html** : Page d’accueil, lance le préloader puis le portfolio.
- **portfolio.html** : Page principale du portfolio, affiche les projets et le contenu dynamique.
- **rapport.txt** : Rapport d’audit et d’optimisation (généré automatiquement).
- **README.md** : Ce fichier, documentation complète du projet.
- **assets/logo/logo.png** : Logo du site.
- **assets/portfolio/script.js** : Script principal du portfolio, gestion de l’affichage des dépôts GitHub, protection XSS, animations.
- **assets/portfolio/style.css** : Feuille de style principale, thème Tron, responsivité mobile/tablette, animations.
- **assets/portfolio/tron-numbers-bg.js** : Script d’arrière-plan animé Tron.
- **assets/preloader/preloader-ultramodern.css** : Styles du préloader animé.
- **assets/preloader/preloader-ultramodern.js** : Script du préloader, gestion de la progression et transition vers le portfolio.

## Interactions et rôles

- Les fichiers JS et CSS sont séparés pour faciliter la maintenance et l’optimisation.
- Le préloader s’affiche au chargement, puis le portfolio devient interactif.
- Les données dynamiques (dépôts GitHub) sont protégées contre les attaques XSS.
- La structure responsive garantit une expérience optimale sur mobile et tablette.

## Sécurité

- Protection XSS assurée par l’échappement des données dynamiques.
- Aucun formulaire ou champ input non sécurisé détecté.

## Optimisation

- Code épuré, sans doublons ni éléments orphelins.
- Utilisation de variables CSS, animations et transitions modernes.
- Media queries pour la compatibilité mobile/tablette.

## Recommandations

- Continuer à séparer les responsabilités (JS/CSS/HTML).
- Vérifier régulièrement les dépendances et les points d’entrée utilisateur.
- Documenter toute modification majeure dans le rapport.txt.
