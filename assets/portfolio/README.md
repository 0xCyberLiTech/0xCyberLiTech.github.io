# assets/portfolio

Scripts et styles pour l’affichage du portfolio.

## Fichiers principaux

- `script.js` : Logique d’affichage dynamique, appels API GitHub, sécurisation XSS, gestion du DOM.
- `tronNumbersBg.js` : Effet visuel de fond Tron 3D (canvas animé).
- `style.css` : Styles principaux du portfolio.
- `variables.css` : Variables CSS globales (couleurs, polices, rayons, transitions).
- `animations.css` : Animations CSS globales.
- `_keyframes-group.css` : Keyframes spécifiques au portfolio.

## Bonnes pratiques

- Utiliser les variables CSS pour toute couleur ou taille récurrente.
- Importer les utilitaires JS via `import` ES6.
- Documenter chaque fonction ou module ajouté.
- Ne pas dupliquer de logique entre les scripts.
