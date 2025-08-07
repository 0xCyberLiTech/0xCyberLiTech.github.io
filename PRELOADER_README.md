# 🚀 Structure du Portfolio avec Preloader

## 📂 Fichiers principaux

- **`index.html`** → Page de preloader (nouvelle page d'accueil)
- **`portfolio.html`** → Portfolio principal (ancien index.html)
- **`assets/preloader.css`** → Styles pour le preloader
- **`assets/preloader.js`** → Logique et animations du preloader
- **`assets/style.css`** → Styles du portfolio principal
- **`assets/script.js`** → JavaScript du portfolio principal

## ⚡ Fonctionnement

1. **Visiteur arrive** sur https://0xcyberlitech.github.io/
2. **Preloader se lance** avec effets Matrix spectaculaires
3. **Progression 0-100%** avec messages de statut Terminal
4. **Transition automatique** vers le portfolio principal
5. **Portfolio s'affiche** avec interface épurée (logo et présentation dans le preloader uniquement)

## 🎮 Contrôles

- **Échap** : Skip le preloader (pour développement)
- **Automatique** : Redirection après 4-6 secondes

## 🎨 Effets inclus

✅ **Matrix Digital Rain** en arrière-plan  
✅ **Logo avec scanlines** et rotation (preloader uniquement)  
✅ **Barre de progression Terminal**  
✅ **Frappe de texte réaliste**  
✅ **Messages de statut cybersécurité**  
✅ **Transition fluide** vers le portfolio  
✅ **Design responsive** mobile/tablette  
✅ **Interface épurée** portfolio (focus projets uniquement)  

## 🔧 Personnalisation

### Filtrage des repositories
Le script exclut automatiquement :
- `0xCyberLiTech.github.io` (repository GitHub Pages)
- `0xCyberLiTech` (repository logo) pour alléger l'interface

### Modification des effets
Pour modifier la durée ou les messages, éditez `assets/preloader.js` :
- `statusTexts[]` : Messages de progression
- `typingTexts[]` : Commandes Terminal tapées
- Délais dans `setTimeout()` pour ajuster la vitesse
