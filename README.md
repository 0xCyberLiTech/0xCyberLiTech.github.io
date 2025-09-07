
# Portfolio 0xCyberLiTech

_Dernière mise à jour : 7 septembre 2025_

## Schéma structurel du projet

```
.
├── index.html
├── portfolio.html
├── README.md
├── audit-technique_0xCyberLiTech_2025-09-07.md
├── assets/
│   ├── logo/
│   │   └── logo.png
│   ├── portfolio/
│   │   ├── _keyframes-group.css
│   │   ├── script.js
│   │   ├── style.css
│   │   └── tron-numbers-bg.js
│   ├── preloader/
│   │   ├── preloader-ultramodern.css
│   │   └── preloader-ultramodern.js
│   └── partials/
│       ├── footer.html
│       ├── header.html
│       └── inject-partials.js
```

## Détail de la construction et des rôles

### 1. Fichiers racine

- **index.html** : Page d’accueil, lance le préloader puis redirige vers le portfolio.
- **portfolio.html** : Page principale affichant les projets, utilise les scripts et styles du dossier `assets/portfolio`.
- **README.md** : Documentation du projet (ce fichier).
- **audit-technique_0xCyberLiTech_2025-09-07.md** : Rapport d’audit technique.

### 2. Dossier `assets/`

#### a. `logo/`
- **logo.png** : Logo du site, utilisé dans l’en-tête ou le favicon.

#### b. `portfolio/`
- **_keyframes-group.css** : Animations CSS réutilisables.
- **script.js** : Logique d’affichage dynamique des projets, protection XSS, gestion du DOM.
- **style.css** : Styles principaux, responsive design, thème Tron.
- **tron-numbers-bg.js** : Script d’arrière-plan animé façon Tron.

#### c. `preloader/`
- **preloader-ultramodern.css** : Styles du préloader animé.
- **preloader-ultramodern.js** : Logique d’animation du préloader, transition vers le portfolio.

#### d. `partials/`
- **header.html** & **footer.html** : Fragments HTML pour l’en-tête et le pied de page, injectés dynamiquement.
- **inject-partials.js** : Script d’injection des partials dans les pages.

## Approche pédagogique

- **Séparation des responsabilités** : Les scripts, styles, images et fragments HTML sont organisés par dossier pour faciliter la maintenance.
- **Modularité** : Les partials permettent de réutiliser l’en-tête et le pied de page sur plusieurs pages.
- **Sécurité** : Les données dynamiques sont échappées pour éviter les attaques XSS.
- **Responsive design** : Les media queries et animations assurent une expérience fluide sur tous les appareils.
- **Préloader** : Améliore l’expérience utilisateur en affichant une animation pendant le chargement.

## Conseils d’évolution

- Continuer à documenter chaque modification dans le README et le rapport d’audit.
- Vérifier régulièrement la sécurité des scripts et la compatibilité mobile.
- Ajouter des tests automatiques pour les scripts critiques.

---

Pour toute question ou suggestion, contactez l’auteur via GitHub.
