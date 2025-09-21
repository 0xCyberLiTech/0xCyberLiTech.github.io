# 0xCyberLiTech.github.io — Portfolio Technique & Présentation

Bienvenue sur le dépôt GitHub du portfolio de [0xCyberLiTech](https://0xcyberlitech.github.io).

Ce site présente mes compétences, réalisations et projets en cybersécurité, développement et administration système.

## Points clés du projet

- **Architecture modulaire** :
  - HTML sémantique, CSS factorisé (variables, animations, keyframes), JS organisé par fonctionnalité.
  - Partiels HTML injectés dynamiquement (`header`, `footer`, `modal`).
  - Fonctions utilitaires centralisées (`assets/utils/`).
- **Effets visuels avancés** :
  - Préchargeur animé, fond Tron 3D, transitions soignées.
- **Accessibilité & responsive** :
  - Contraste, navigation clavier, design adaptatif.
- **Documentation** :
  - Chaque dossier clé possède un `README.md`.
  - Les scripts principaux sont documentés (dépendances, usage).

## Structure du projet

```text
0xCyberLiTech.github.io/
├── README.md                  # Documentation principale
├── index.html                 # Page d’accueil
├── portfolio.html             # Page projets/compétences
├── assets/
│   ├── logo/
│   │   └── logo.png           # Logo principal
│   ├── partials/
│   │   ├── header.html        # Entête HTML à injecter
│   │   ├── footer.html        # Pied de page HTML à injecter
│   │   ├── inject-partials.js # Script d’injection des partiels
│   │   ├── modal.html         # Modale réutilisable
│   │   └── modal.js           # Script de gestion du modal
│   ├── portfolio/
│   │   ├── script.js          # JS principal du portfolio
│   │   ├── tronNumbersBg.js   # Effet Tron 3D
│   │   ├── style.css          # Styles principaux
│   │   ├── variables.css      # Variables CSS globales
│   │   ├── animations.css     # Animations CSS globales
│   │   └── _keyframes-group.css # Keyframes spécifiques
│   ├── preloader/
│   │   ├── preloaderUltramodern.js # JS du preloader
│   │   └── preloader-ultramodern.css # CSS du preloader
│   └── utils/
│       ├── utils.js           # Fonctions utilitaires JS
│       └── README.md          # Documentation des utilitaires
└── ...
```

## Bonnes pratiques

- Nommage explicite et cohérent (camelCase, préfixes utilitaires)
- Factorisation maximale (CSS, JS, HTML)
- Documentation systématique
- Séparation claire des préoccupations

---

## Conseils d’Évolution & Maintenance

- Poursuivre la documentation à chaque évolution.
- Utiliser la même convention de nommage pour les futurs modules/scripts.
- Nettoyer régulièrement les ressources inutilisées.
- Tester systématiquement sur différentes plateformes et navigateurs.
- Ajouter des tests unitaires JS pour les logiques complexes (si le projet évolue).

---

**Auteur** : [0xCyberLiTech](https://github.com/0xCyberLiTech)  
**Dernière mise à jour** : 16 septembre 2025



