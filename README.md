# 0xCyberLiTech.github.io — Portfolio Technique & Présentation

Bienvenue sur le dépôt GitHub du portfolio de [0xCyberLiTech](https://0xcyberlitech.github.io).  
Ce site web présente mes compétences, réalisations et projets en cybersécurité, développement, et administration système.  
Le portfolio a été conçu pour être **modulaire, maintenable et optimisé** pour la performance et l’accessibilité.

---

## Description Technique

### Architecture Générale

Le portfolio utilise une architecture statique, optimisée pour GitHub Pages :  
- **HTML sémantique** pour une structure claire et compatible SEO.
- **CSS modulaire** pour la personnalisation et l’animation (animations CSS natives, keyframes dédiées au portfolio).
- **JavaScript organisé** : 
  - Scripts séparés par fonction (préchargeur, effets visuels, injection de partials).
  - Utilisation de la convention camelCase + préfixes (`util`) pour les fonctions utilitaires.
  - Chargement asynchrone des composants dynamiques (`header`, `footer` injectés).
- **Assets structurés** (_logos, partiels, scripts spécifiques, etc._) pour faciliter la maintenance et l’évolution du site.

### Fonctionnalités Clés

- **Préchargeur ultramoderne** :  
  Affichage d’une animation de chargement personnalisée, retirée dès que la page est prête.
- **Effet visuel "Tron Numbers"** :  
  Script dédié pour le fond animé de la section portfolio.
- **Injection dynamique de partiels** :  
  Les entêtes et pieds de page sont chargés dynamiquement pour éviter la duplication et simplifier les modifications globales.
- **Accessibilité & Responsive** :  
  - Navigation clavier possible, contraste respecté.
  - Design responsive (desktop/mobile/tablette).
- **Documentation interne** :  
  Chaque dossier clé possède un `README.md` décrivant précisément son rôle et les scripts/styles associés.

### Bonnes Pratiques Adoptées

- **Nommage explicite & cohérent** (camelCase, préfixes utilitaires).
- **Fichiers et fonctions documentés**.
- **Aucune ressource orpheline ou code mort** : nettoyage régulier de l’arborescence.
- **Séparation des préoccupations** : JS, CSS, HTML, assets, partiels.

---

## Arborescence du Projet

```text
0xCyberLiTech.github.io/
├── README.md                         # Documentation principale (ce fichier)
├── index.html                        # Page d’accueil du portfolio
├── portfolio.html                    # Page détaillée des projets/compétences
├── assets/
│   ├── logo/
│   │   └── logo.png                  # Logo principal du site
│   ├── partials/
│   │   ├── footer.html               # Pied de page HTML à injecter
│   │   ├── header.html               # Entête HTML à injecter
│   │   └── inject-partials.js        # Script d’injection dynamique des partiels
│   ├── portfolio/
│   │   ├── _keyframes-group.css      # Animations CSS dédiées au portfolio
│   │   ├── script.js                 # Scripts JS pour la page portfolio
│   │   ├── style.css                 # Styles CSS spécifiques au portfolio
│   │   ├── tronNumbersBg.js          # Fond animé "Tron Numbers"
│   │   └── README.md                 # Documentation spécifique au dossier portfolio
│   └── preloader/
│       ├── preloader-ultramodern.css # Styles du préchargeur
│       ├── preloaderUltramodern.js   # Script JS du préchargeur
│       └── README.md                 # Documentation du préchargeur
```

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

