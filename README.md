

# 0xCyberLiTech - Portfolio GitHub

![Aperçu du site 1](assets/screenshot-1.png)
![Aperçu du site 2](assets/screenshot-2.png)

Bienvenue sur mon **portfolio GitHub cybersécurité** nouvelle génération, avec un preloader cyber/Tron moderne et un portfolio sécurisé, responsive et immersif.

## 🚀 Fonctionnalités principales

- Preloader animé (canvas, logo, progression, statut dynamique)
- Interface cyber/Tron, terminal, fond dynamique, curseur clignotant
- Recherche sécurisée (XSS safe), filtrage instantané
- Responsive design (desktop, tablette, mobile)
- Accessibilité (contrastes, navigation clavier, police monospace)
- Documentation à jour (README, Rapport.txt)

## 📂 Structure du projet

```text
0xCyberLiTech.github.io/
├── index.html                # Page d’accueil (preloader + portfolio)
├── portfolio.html            # Portfolio seul (interface cyber/Tron)
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

## 🔗 Logigramme d’architecture (interconnexions)

```mermaid
graph TD
    A[index.html] -- preloader, puis portfolio --> B[portfolio.html]
    A -- charge --> C[assets/preloader-ultramodern.js]
    A -- charge --> D[assets/preloader-ultramodern.css]
    B -- charge --> E[assets/style.css]
    B -- charge --> F[assets/script.js]
    B -- charge --> G[assets/tron-numbers-bg.js]
    A & B -- logo --> H[assets/logo.png]
    B -- affiche projets --> |API GitHub| I[github.com/0xCyberLiTech]
```

## 🛡️ Sécurité & bonnes pratiques

- Toutes les entrées utilisateur sont échappées (XSS safe)
- Aucune dépendance externe non maîtrisée
- Code commenté, lisible, maintenable

## 📱 Responsive & accessibilité

- Design fluide, adaptatif, police lisible
- Navigation clavier et contrastes respectés

## 📸 Aperçu

Voir captures d’écran ci-dessus ou tester sur : [https://0xcyberlitech.github.io/](https://0xcyberlitech.github.io/)

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

## 🎨 Palette de couleurs

| Nom        | Couleur    | Usage principal         |
|------------|------------|------------------------|
| Primary    | #00ff00    | Matrix Green           |
| Secondary  | #00aaff    | Terminal Blue          |
| Background | #101010    | Deep Black             |
| Text       | #e0e0e0    | Light Gray             |
| Accent     | #ff5555    | Alert Red (badges NEW) |

## 📦 Technologies utilisées

- **HTML5** sémantique, accessibilité
- **CSS3** (Grid, Flexbox, keyframes, media queries)
- **JavaScript ES6+** (Canvas API, Fetch API, DOM)
- **GitHub API** (intégration dynamique des projets)

## 🌟 Fonctionnalités avancées

- Matrix Digital Rain 2.0 (canvas performant)
- Prompts terminal Kali, headers, badges NEW dynamiques
- Effets visuels : glow, scan, hover, transitions fluides
- Gestion intelligente des erreurs API

## 🎯 Compatibilité navigateurs

- Chrome/Edge, Firefox, Safari (desktop/mobile)
- iOS Safari, Chrome Mobile optimisés

## 🚀 Déploiement GitHub Pages

1. Fork/Clone ce repository
2. Activer GitHub Pages dans les settings
3. Personnaliser :
   - Modifier le nom d'utilisateur GitHub dans `script.js`
   - Remplacer `logo.png` par votre logo
   - Adapter les textes dans `index.html` et `portfolio.html`
   - Configurer les messages dans `preloader.js` si besoin

## 📜 Licence

Projet sous licence **MIT**. Réutilisation libre avec citation de la source.

---

## 🔥 Crédits & inspiration

- Matrix Digital Rain : inspiré du film Matrix (1999)
- Terminal Design : basé sur Kali Linux Terminal
- Cybersecurity Theme : esthétique hacker éthique
- Développé avec passion par **0xCyberLiTech** 💚
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
