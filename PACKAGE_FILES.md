# À propos de package.json et package-lock.json

## Où doivent-ils se trouver ?
Toujours à la racine du projet Node.js (ici : 0xCyberLiTech.github.io).

## Rôle de chaque fichier

### package.json
- Décrit le projet (nom, version, scripts, dépendances, etc.)
- Permet d’installer les dépendances avec `npm install`
- Définit les scripts personnalisés (ex : `npm run build`)
- Sert de référence pour tous les outils Node.js

### package-lock.json
- Enregistre précisément les versions installées de chaque dépendance
- Garantit que tous les développeurs/installations utilisent exactement les mêmes versions
- Généré et mis à jour automatiquement par npm
- Doit être versionné (commité sur GitHub)

## Bonnes pratiques
- **Ne jamais déplacer ces fichiers** hors de la racine du projet
- **Ne pas les supprimer** sauf cas très particulier (réinitialisation complète du projet)
- Toujours les inclure dans le contrôle de version (Git)
- Si tu rencontres des problèmes de dépendances, tu peux supprimer node_modules/ puis relancer `npm install` (mais garde ces deux fichiers !)

## En résumé
Ces deux fichiers sont essentiels au bon fonctionnement de tout projet Node.js. Ils doivent rester à la racine et être maintenus à jour.

---

**Auteur :** 0xCyberLiTech — 2025
