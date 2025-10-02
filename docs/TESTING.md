# 🧪 Guide de Tests - Portfolio 0xCyberLiTech v2.1

Ce document décrit les procédures de test et validation du portfolio.

**Dernière mise à jour** : 1er octobre 2025

---

## 🎯 Types de Tests

### 🔒 Tests de Sécurité

#### Validation XSS
```javascript
// Test de la fonction utilEscapeHTML
const testCases = [
    { input: '<script>alert("XSS")</script>', expected: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;' },
    { input: 'Nom & prénom "John"', expected: 'Nom &amp; prénom &quot;John&quot;' },
    { input: null, expected: 'null' },
    { input: undefined, expected: 'undefined' }
];

// Vérification manuelle dans la console
import { utilEscapeHTML } from './assets/utils/utils.js';
testCases.forEach(test => {
    const result = utilEscapeHTML(test.input);
    console.assert(result === test.expected, `Failed for input: ${test.input}`);
});
```

#### Validation GitHub API
- ✅ Vérifier que les données sont échappées avant affichage
- ✅ Tester la gestion d'erreur réseau
- ✅ Valider le filtrage des repositories

### ⚡ Tests de Performance

#### DOM Cache System
```javascript
// Vérifier que le cache DOM fonctionne
console.log('DOM Cache initialized:', DOMCache.isReady());
console.log('Cached elements:', {
    searchInput: !!DOMCache.searchInput,
    clearButton: !!DOMCache.clearButton,
    projectsList: !!DOMCache.projectsList
});
```

#### Moteur de Recherche
- ✅ Tester le debouncing (300ms)
- ✅ Vérifier la recherche avec moins de 3 caractères
- ✅ Valider les résultats de filtrage
- ✅ Tester la remise à zéro

### 📱 Tests Responsive

#### Breakpoints à Tester
- 📱 **Mobile** : 320px - 768px
- 📱 **Tablette** : 768px - 1024px  
- 🖥️ **Desktop** : 1024px+

#### Points de Contrôle
- ✅ Navigation et liens fonctionnels
- ✅ Lisibilité du texte
- ✅ Boutons accessibles au toucher
- ✅ Images correctement dimensionnées
- ✅ Animations fluides

---

## 🔍 Checklist de Validation

### Avant Commit
- [ ] **Sécurité** : Toutes les données utilisateurs sont échappées
- [ ] **Performance** : Pas d'accès DOM répétés
- [ ] **Code Quality** : Pas de code mort ou dupliqué
- [ ] **Documentation** : JSDoc à jour
- [ ] **Console** : Aucune erreur JavaScript
- [ ] **Responsive** : Test sur 3 tailles d'écran minimum

### Avant Pull Request
- [ ] **Tests manuels** : Toutes les fonctionnalités testées
- [ ] **Cross-browser** : Chrome, Firefox, Safari, Edge
- [ ] **GitHub API** : Vérification avec et sans réseau
- [ ] **Accessibilité** : Navigation clavier fonctionnelle
- [ ] **SEO** : Méta-tags et structure sémantique
- [ ] **Lighthouse** : Score > 90 sur tous les critères

---

## 🛠️ Outils de Test

### Tests Manuels en Local

#### Serveur de Développement
```bash
# Python (recommandé)
python -m http.server 8000

# Node.js
npx live-server

# PHP
php -S localhost:8000
```

#### URLs de Test
- `http://localhost:8000/` - Page d'accueil avec préchargeur
- `http://localhost:8000/portfolio.html` - Portfolio direct

### Tests Browser

#### Console JavaScript
```javascript
// Test rapide de l'intégrité
console.log('Portfolio Health Check:');
console.log('- DOM Cache:', window.DOMCache ? '✅' : '❌');
console.log('- GitHub Repos:', window.__allRepos?.length || 'Not loaded');
console.log('- Escape Function:', typeof window.utilEscapeHTML === 'function' ? '✅' : '❌');
```

#### Network Tab
- ✅ Vérifier les requêtes GitHub API
- ✅ Contrôler le chargement des assets
- ✅ Valider les codes de réponse HTTP

### Tests d'Accessibilité

#### Navigation Clavier
- `Tab` : Navigation séquentielle
- `Enter` : Activation des liens/boutons
- `Ctrl+K` : Focus sur la recherche
- `Escape` : Sortie des modals/overlays

#### Screen Readers
- ✅ Titres hiérarchiques (h1, h2, h3)
- ✅ Alt text sur les images
- ✅ Labels sur les inputs
- ✅ Description des actions

---

## 📊 Métriques de Validation

### Performance Targets
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

### Compatibilité Navigateur
- ✅ **Chrome** : Version 90+
- ✅ **Firefox** : Version 88+
- ✅ **Safari** : Version 14+
- ✅ **Edge** : Version 90+

### Lighthouse Scores (Minimum)
- **Performance** : 90+
- **Accessibilité** : 95+
- **Bonnes Pratiques** : 95+
- **SEO** : 90+

---

## 🐛 Résolution de Problèmes

### Problèmes Courants

#### API GitHub non responsive
```javascript
// Debug dans la console
fetch('https://api.github.com/users/0xCyberLiTech/repos')
  .then(response => console.log('API Status:', response.status))
  .catch(error => console.error('API Error:', error));
```

#### Cache DOM non initialisé
```javascript
// Forcer l'initialisation
DOMCache.init();
console.log('Cache ready:', DOMCache.isReady());
```

#### Recherche non fonctionnelle
```javascript
// Vérifier les éléments
console.log('Search elements:', {
  input: document.getElementById('search-input'),
  clear: document.getElementById('search-clear'),
  info: document.getElementById('search-results-info')
});
```

---

## 📞 Support

- 🐛 **Issues** : [GitHub Issues](https://github.com/0xCyberLiTech/0xCyberLiTech.github.io/issues)
- 📖 **Documentation** : [docs/README.md](../docs/README.md)
- 🤝 **Contribution** : [CONTRIBUTING.md](../CONTRIBUTING.md)