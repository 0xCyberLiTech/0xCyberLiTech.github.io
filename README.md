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

- **index.html** : Page d’accueil avec préloader et accès au portfolio.
- **portfolio.html** : Page principale du portfolio, affichage des projets.
- **rapport.txt** : Rapport d’audit et d’optimisation (généré automatiquement).
- **README.md** : Documentation du projet (ce fichier).
- **assets/** : Dossier des ressources statiques.
  - **logo/** : Contient le logo du site.
  - **portfolio/** : Scripts et styles du portfolio.
    - **script.js** : Logique d’affichage des projets, protection XSS, gestion du DOM.
    - **style.css** : Styles principaux, responsive design, thème Tron.
    - **tron-numbers-bg.js** : Script d’arrière-plan animé Tron.
  - **preloader/** : Ressources pour l’animation de préchargement.
    - **preloader-ultramodern.css** : Styles du préloader.
    - **preloader-ultramodern.js** : Logique d’animation du préloader.

## Interactions et rôles

- Les fichiers JS manipulent le DOM et injectent du contenu sécurisé via `escapeHTML`.
- Le CSS gère la responsivité et le style Tron.
- Les fichiers HTML sont structurés pour la clarté et la performance.

## Sécurité

- Toutes les données injectées dans le DOM sont filtrées pour éviter les attaques XSS.
- Aucun formulaire ou champ de saisie utilisateur non protégé.

## Optimisation

- CSS optimisé : doublons supprimés, règles regroupées.
- JS factorisé et sécurisé.
- Structure de projet claire et maintenable.

## Compatibilité

- Design responsive pour mobile et tablette (media queries).

## Auteur

0xCyberLiTech

---

Pour toute question ou amélioration, contactez l’auteur via GitHub.
