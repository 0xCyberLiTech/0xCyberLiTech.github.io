# Portfolio 0xCyberLiTech

Ce dossier contient le site portfolio de 0xCyberLiTech, orienté cybersécurité et développement.

## Structure du dossier
```
0xCyberLiTech.github.io/
│
├── portfolio.html
├── index.html
├── README.md
├── Rapport.txt
│
└── assets/
    └── portfolio/
    │   ├── style.css
    │   ├── script.js
    │   └── tron-numbers-bg.js
    ├── preloader/
    │   ├── preloader-ultramodern.css
    │   └── preloader-ultramodern.js
    └── logo/
         └── logo.png
```

## Logigramme d’interconnexion des fichiers

```
[index.html] ──► [assets/preloader/preloader-ultramodern.css, .js]
      │
      └─► [assets/logo/logo.png]
      │
      └─► [assets/portfolio/style.css, script.js, tron-numbers-bg.js]

[portfolio.html] ──► [assets/portfolio/style.css, script.js, tron-numbers-bg.js]
      │
      └─► [assets/logo/logo.png]
```

- Les fichiers du portfolio sont séparés de ceux du préloader et du logo.
- Les pages HTML importent les ressources nécessaires selon leur usage.
- Le logigramme montre les dépendances et l’organisation claire du projet.

## Interactions des fichiers
- `index.html` charge le CSS et JS depuis `assets/portfolio/` et le préloader depuis `assets/preloader/`.
- `portfolio.html` utilise les ressources du portfolio et le logo commun.
- Tous les champs dynamiques JS sont protégés contre les injections XSS via `escapeHTML`.
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
