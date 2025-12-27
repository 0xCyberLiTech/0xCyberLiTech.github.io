# assets/portfolio

Ce dossier contient tous les fichiers nécessaires à l’affichage et à l’animation du portfolio :

- **style.css** : Feuille de style principale (lisible, modifiable)
- **style.min.css** : Version minifiée pour la production (chargement plus rapide)
- **script.js** : Script principal (lisible, modifiable, ES6 modules)
- **script.min.js** : Version minifiée pour la production (optimisée, compatible ES6 modules)
- **variables.css** : Variables CSS globales (couleurs, thèmes)
- **_keyframes-group.css** : Animations CSS réutilisables
- **tronNumbersBg.js** : Animation de fond Tron

## Bonnes pratiques
- Modifie toujours les fichiers non minifiés (`.js` et `.css`), puis lance la minification (`npm run build`) pour générer les versions `.min.js` et `.min.css`.
- Utilise les fichiers minifiés dans le HTML pour de meilleures performances.
- Ne laisse pas de fichiers de sauvegarde inutiles dans ce dossier.

## Pour aller plus loin
- Voir la documentation dans `build/MINIFICATION.md` pour automatiser la minification.

---

**Auteur :** 0xCyberLiTech — 2025