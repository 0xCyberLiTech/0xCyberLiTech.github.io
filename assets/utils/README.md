// assets/utils/README.md

# Utils JS

Ce dossier contient les fonctions utilitaires JavaScript réutilisables dans tout le projet.

## Dépendances
- Aucun module externe requis.
- Les fonctions sont importées via `import` ES6 (nécessite `<script type="module">`).

## Fonctions disponibles
- `utilEscapeHTML(str)` : échappe les caractères HTML spéciaux pour éviter les injections XSS.

## Utilisation
```js
import { utilEscapeHTML } from '../utils/utils.js';
const safe = utilEscapeHTML('<script>alert(1)</script>');
```

## Bonnes pratiques
- Ajoutez ici toute nouvelle fonction utilitaire qui pourrait servir à plusieurs scripts.
- Documentez chaque fonction avec JSDoc.
