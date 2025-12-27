# Minification automatique du code (JS & CSS)

## Objectif
Optimiser les performances de ton site en réduisant la taille des fichiers JavaScript et CSS, tout en gardant la compatibilité avec les modules ES6 (import/export).

---

## Prérequis
- Node.js installé sur ta machine
- Les dépendances du projet installées (`npm install` à la racine du projet)

---

## Structure utilisée
- Le script principal de minification est : **build.cjs** (à la racine du projet)
- Les fichiers à minifier sont dans `assets/portfolio/` :
  - `script.js` → `script.min.js`
  - `style.css` → `style.min.css`

---

## Comment minifier automatiquement ?

1. **Ouvre un terminal** dans le dossier du projet :
   ```
   cd 0xCyberLiTech.github.io
   ```

2. **Installe les dépendances** (si ce n'est pas déjà fait) :
   ```
   npm install
   ```

3. **Lance la minification** :
   ```
   npm run build
   ```
   - Cela exécute le script `build.cjs`.
   - Les fichiers minifiés sont générés/écrasés automatiquement.

4. **Utilise les fichiers minifiés** dans ton HTML :
   - Pour le CSS :
     ```html
     <link rel="stylesheet" href="assets/portfolio/style.min.css">
     ```
   - Pour le JS (en gardant `type="module"` pour ES6) :
     ```html
     <script type="module" src="assets/portfolio/script.min.js"></script>
     ```

---

## Astuces & bonnes pratiques
- **Ne supprime pas build.cjs** si tu veux garder l'automatisation.
- Tu peux modifier le script pour ajouter d'autres fichiers à minifier si besoin.
- En cas de problème, tu peux toujours revenir aux fichiers non minifiés (`script.js`, `style.css`).
- Le script ne touche jamais aux fichiers originaux, il ne fait qu'écraser les versions `.min.js` et `.min.css`.

---

## Dépannage
- Si tu as une erreur liée à `require` ou `import`, vérifie que tu utilises bien `build.cjs` (CommonJS) et non un ancien `build.js`.
- Si tu ajoutes de nouveaux fichiers JS/CSS à minifier, adapte le script `build.cjs` en conséquence.
- Pour toute question, consulte la documentation du projet ou demande de l'aide à un développeur Node.js.

---

**Auteur :** 0xCyberLiTech — 2025
