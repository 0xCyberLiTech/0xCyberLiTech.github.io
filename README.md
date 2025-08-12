

# 0xCyberLiTech - Portfolio GitHub

Bienvenue sur mon portfolio cybersécurité nouvelle génération, avec preloader cyber/Tron, portfolio sécurisé, responsive et immersif.

## Fonctionnalités principales
- Preloader ultra-moderne (canvas, logo, barre de progression, transition fluide)
- Portfolio cyber/Tron : interface terminal, fond dynamique, curseur clignotant, affichage automatique des dépôts GitHub publics (XSS safe)
- Responsive design, accessibilité, sécurité XSS
- Documentation à jour (README, Lisez-moi.txt, Rapport.txt)

## Structure du projet
```
0xCyberLiTech.github.io/
├── index.html                # Page d’accueil (preloader animé + portfolio)
├── portfolio.html            # Portfolio seul (autonome, interface cyber/Tron)
├── assets/
│   ├── logo.png
│   ├── preloader-ultramodern.css
│   ├── preloader-ultramodern.js
│   ├── style.css
│   ├── script.js
│   ├── tron-numbers-bg.js
│   ├── screenshot-1.png
│   └── screenshot-2.png
├── Lisez-moi.txt
├── Rapport.txt
├── README.md
```

## Logigramme des interconnexions

```text
index.html
   └─> preloader-ultramodern.js, preloader-ultramodern.css, logo.png
   └─> (après animation) portfolio.html
portfolio.html
   └─> style.css, script.js, tron-numbers-bg.js, logo.png
   └─> (affichage dynamique des dépôts)
```

## Sécurité & bonnes pratiques
- Toutes les entrées utilisateur sont échappées (XSS safe)
- Aucune dépendance externe non maîtrisée
- Code commenté, lisible, maintenable

## Responsive & accessibilité
- Design fluide, adaptatif, police lisible
- Navigation clavier et contrastes respectés

## Aperçu
Voir captures d’écran dans `assets/` ou tester sur : [https://0xcyberlitech.github.io/](https://0xcyberlitech.github.io/)

## Architecture Technique
- **HTML5 Sémantique** : Structure accessible et SEO-friendly
- **CSS3 Avancé** : Grid layout, Flexbox, animations keyframes, media queries
- **JavaScript ES6+** : Async/await, Canvas 2D, DOM manipulation optimisée
- **Performance** : Code defer, animations GPU-accélérées
### **Design System**
- **Couleurs Matrix** : `#00ff00` (vert Matrix), `#00aaff` (bleu Terminal)
- **Typography** : Consolas (Terminal), Segoe UI/Roboto (descriptions)
- **Layout** : CSS Grid responsive avec auto-fit et minmax
- **Animations** : Transitions fluides, effets de glow, scan effects
### **APIs & Intégrations**
- **GitHub REST API** : Récupération automatique des repositories
- **Canvas API** : Rendu Matrix Digital Rain 2.0 optimisé
- **Responsive Design** : 4 breakpoints (Desktop/Tablette/Mobile/Petit)
## 🎨 **Palette de Couleurs**
```css
Primary:   #00ff00  /* Matrix Green */
Secondary: #00aaff  /* Terminal Blue */  
Background: #101010 /* Deep Black */
Text:      #e0e0e0  /* Light Gray */
Accent:    #ff5555  /* Alert Red (badges NEW) */
```
## 🛠 Installation en local
1. **Cloner le repository** :
```bash
git clone https://github.com/0xCyberLiTech/0xcyberlitech.github.io.git
cd 0xcyberlitech.github.io
```
2. **Ouvrir dans un navigateur** :
```bash
# Ouvrir index.html (point d’entrée principal)
# ou lancer un serveur local Python
python -m http.server 8000
# Puis ouvrir http://localhost:8000/index.html
```
3. **Pour le développement** :
- Utiliser VS Code avec Live Server extension
- Ouvrir les DevTools pour tester responsive
- Tester sur différents navigateurs
## 📈 **Performance & Optimisations**
- ✅ **Lighthouse Score** : 85-90/100
- ✅ **Mobile Performance** : Effets Matrix allégés automatiquement
- ✅ **Chargement** : < 3 secondes sur connexion 3G
- ✅ **Animations** : 60 FPS stable sur desktop, optimisé mobile
- ✅ **Memory** : Gestion propre des event listeners et Canvas
## 🔒 **Sécurité & Conformité**
- ✅ **HTTPS** : Toutes les API calls sécurisées
- ✅ **CSP Ready** : Pas de scripts inline dangereux
- ✅ **XSS Protection** : Sanitisation des données GitHub API
- ✅ **Privacy** : Aucune collecte de données personnelles
- ✅ **RGPD Compliant** : Pas de cookies ou tracking
## 📦 Technologies utilisées
- **HTML5** sémantique avec accessibilité
- **CSS3** avec Grid, Flexbox, animations keyframes
- **JavaScript ES6+** avec Canvas API et Fetch API
- **GitHub API** pour l'intégration dynamique des projets
- **Responsive Design** avec 4 breakpoints optimisés
## 🌟 **Fonctionnalités Avancées**
### **Matrix Terminal UI**
- **Prompts Kali authentiques** : `┌──(0xCyberLiTech㉿kali)-[~/projects]`
- **Headers Terminal** : Boutons système colorés sur chaque tuile
- **Style Console uniforme** : Design cohérent sur tout le portfolio
### **Effets Visuels**
- **Matrix Digital Rain 2.0** : Performance 60 FPS avec caractères japonais
- **Matrix Highlight** : Titres qui brillent en blanc avec glow vert au survol
- **Scan Effects** : Lignes lumineuses qui traversent les éléments
- **Hover Animations** : Zoom et élévation des tuiles au survol
### **GitHub Integration**
- **API Dynamique** : Récupération automatique des repositories
- **Filtrage Intelligent** : Exclusion du dépôt GitHub Pages
- **Compteur de jours avancé** : Affichage intelligent "Xj" (nombre de jours depuis dernière mise à jour)
- **Badges NEW intelligents** : Badge NEW + compteur pour projets récents (≤ 30 jours), disparition automatique après 30 jours
- **Error Handling** : Gestion gracieuse des erreurs API
## 🎯 **Compatibilité Navigateurs**
- ✅ **Chrome/Edge** : Support complet
- ✅ **Firefox** : Support complet
- ✅ **Safari** : Support partiel (Matrix légèrement différent)
- ✅ **Mobiles** : iOS Safari, Chrome Mobile optimisés
## 🚀 **Déploiement GitHub Pages**
1. **Fork/Clone** ce repository
2. **Activer GitHub Pages** dans les settings
3. **Personnaliser** :
   - Modifier le nom d'utilisateur GitHub dans `script.js`
   - Remplacer `logo.png` par votre logo
   - Adapter les textes dans `index.html` (preloader) et `portfolio.html`
   - Configurer les messages dans `preloader.js` si désiré
## 📜 Licence
Ce projet est sous licence **MIT**. Vous pouvez le réutiliser librement en citant la source.

---

## 🔥 **Crédits & Inspiration**
- **Matrix Digital Rain** : Inspiré du film Matrix (1999)
- **Terminal Design** : Basé sur Kali Linux Terminal
- **Cybersecurity Theme** : Esthétique hacker éthique
- **Développé avec passion** par **0xCyberLiTech** 💚

**⭐ Si ce portfolio vous plaît, n'hésitez pas à lui donner une étoile !**
