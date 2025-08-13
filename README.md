# Portfolio 0xCyberLiTech

Ce projet présente un portfolio cyber/développement, affichant dynamiquement les dépôts GitHub publics de l’auteur.

## Structure des fichiers

- `index.html` : Page d’accueil avec préloader, bandeau, et affichage dynamique des projets.
- `portfolio.html` : Variante de la page principale, même logique d’affichage.
- `assets/` :
  - `style.css` : Feuille de style principale, chaque sélecteur est commenté pour indiquer sa fonction (bannière, tuiles, terminal, responsive, etc.).
  - `script.js` : Script principal, chaque fonction et bloc est commenté pour expliquer le rendu dynamique, la sécurité XSS, et l’interaction avec l’API GitHub.
  - `logo.png`, `screenshot-1.png`, `screenshot-2.png` : Images utilisées ou disponibles.
  - `preloader-ultramodern.css` / `preloader-ultramodern.js` : Styles et scripts du préloader animé.
  - `tron-numbers-bg.js` : Script décoratif (optionnel).

## Fonctionnement et interactions

- Le préloader s’affiche au chargement, puis laisse place au portfolio.
- Les dépôts publics sont récupérés via l’API GitHub et affichés sous forme de tuiles.
- Chaque tuile possède un bandeau supérieur style terminal Kali Linux (boutons, prompt), puis le contenu du dépôt (nom, description, badges).
- Le CSS est organisé par zones (bannière, tuiles, terminal, responsive) et chaque sélecteur est commenté pour faciliter la maintenance.
- Le JS est sécurisé (échappement XSS) et commenté pour chaque étape.

## Hygiène et maintenance

- Aucun doublon, code mort ou orphelin détecté dans les fichiers principaux.
- Les images non utilisées sont à documenter ou supprimer si besoin.
- Les fichiers sont organisés pour faciliter la navigation et la contribution.

## Auteur
- 0xCyberLiTech
- Année : 2025

---
Ce site est destiné à présenter des projets, scripts et tutoriels liés à la cybersécurité et au développement. Pour toute contribution ou question, consultez le code commenté ou contactez l’auteur via GitHub.
