# Sécurité automatisée et recommandations – 0xCyberLiTech.github.io

## Ce qui a été mis en place

### 1. Protection XSS JavaScript
- Toutes les données dynamiques injectées dans le DOM via `innerHTML` passent par la fonction utilitaire `utilEscapeHTML`.
- Les partiels HTML injectés sont filtrés par une fonction de sanitization qui supprime les balises `<script>` et les attributs on*.
- Des commentaires explicites rappellent l’obligation d’utiliser utilEscapeHTML à chaque point critique.

### 2. Content Security Policy (CSP) et en-têtes de sécurité
- Ajout d’une balise `<meta http-equiv="Content-Security-Policy">` stricte dans `index.html` et `portfolio.html` :
  - Bloque scripts/styles/images externes, interdit le JS/CSS inline, interdit les objets, limite les frames et formulaires.
- Ajout d’en-têtes de sécurité supplémentaires :
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: geolocation, microphone, camera désactivés

### 3. Fichier SECURITY.md
- Procédure de signalement, délais, contacts, reconnaissance, bonnes pratiques (XSS, dépendances, architecture).
- Section "Historique des mises à jour" ajoutée.

### 4. Dépendances et secrets
- Pas de dépendances JS externes non maîtrisées.
- .gitignore protège les secrets et fichiers sensibles.
- Dependabot, CodeQL, secret scanning activés (voir GitHub).

### 5. Tests automatisés
- Dossier `tests/` créé.
- Exemple de test unitaire pour `utilEscapeHTML` avec Jest dans `tests/utilEscapeHTML.test.js`.
- Fichier `package.json` prêt pour l’exécution des tests (`npm install` puis `npm test`).


## Ce qu’il reste à mettre en place ou à surveiller

1. **Forcer le HTTPS sur GitHub Pages**
   - À activer dans les paramètres du dépôt (Settings > Pages > Enforce HTTPS).
2. **Vérifier régulièrement les alertes de sécurité GitHub**
   - Dependabot, CodeQL, secret scanning.
3. **Mettre à jour les dépendances JS/CSS si ajoutées à l’avenir**
4. **Ajouter d’autres tests automatisés**
   - Tester la sanitization des partiels, le comportement DOM, etc.
5. **Documenter la politique de revue de sécurité régulière**
   - Ajouter un rappel dans le README ou SECURITY.md.
6. **(Optionnel) Audit externe ou bug bounty**
   - Si le projet devient critique.

---

Pour toute évolution, mettre à jour cette documentation et le fichier SECURITY.md.
