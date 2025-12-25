# Guide de Déploiement - Portfolio 0xCyberLiTech v2.1

📦 Guide complet pour déployer et maintenir le portfolio sur GitHub Pages et autres plateformes.

**Dernière mise à jour** : 25 décembre 2025

## 🎯 Vue d'Ensemble

Ce portfolio est conçu pour être déployé facilement sur différentes plateformes, avec GitHub Pages comme solution principale. Le déploiement est **automatique** pour GitHub Pages et peut être adapté pour d'autres services.

## 🚀 Déploiement GitHub Pages (Recommandé)

### Configuration Automatique

GitHub Pages est configuré pour se déployer automatiquement depuis la branche `main`.

#### Vérification de la Configuration
1. Aller sur le repository GitHub
2. **Settings** → **Pages**
3. **Source** : Deploy from a branch
4. **Branch** : `main` / `/ (root)`
5. **URL** : https://0xcyberlitech.github.io

#### Processus de Déploiement
```bash
# 1. Faire vos modifications localement
git add .
git commit -m "feat: description de vos changements"

# 2. Pusher vers la branche main
git push origin main

# 3. GitHub Pages se déploie automatiquement
# Temps d'attente: 1-5 minutes généralement
```

#### Vérification du Déploiement
```bash
# Vérifier le statut du déploiement
# Via l'onglet "Actions" sur GitHub
# Ou via l'API GitHub
curl -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/0xCyberLiTech/0xCyberLiTech.github.io/deployments
```

### Custom Domain (Optionnel)

#### Configuration DNS
```bash
# Pour un domaine personnalisé (ex: portfolio.0xcyberlitech.io)
# 1. Créer un fichier CNAME à la racine
echo "portfolio.0xcyberlitech.io" > CNAME

# 2. Configurer les DNS de votre domaine
# Type: CNAME
# Name: portfolio (ou @)
# Target: 0xcyberlitech.github.io
```

#### Vérification HTTPS
```bash
# GitHub Pages active automatiquement HTTPS
# Vérification via curl
curl -I https://0xcyberlitech.github.io
# Rechercher: "HTTP/2 200" et "strict-transport-security"
```

## 🌐 Déploiements Alternatifs

### Netlify

#### Configuration
```toml
# netlify.toml
[build]
  publish = "."
  command = "echo 'Static site, no build required'"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### Déploiement
```bash
# Via Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Vercel

#### Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

#### Déploiement
```bash
# Via Vercel CLI
npm i -g vercel
vercel login
vercel --prod
```

### Firebase Hosting

#### Configuration
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

#### Déploiement
```bash
# Installation et déploiement
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🔧 Configuration Avancée

### Variables d'Environnement

#### GitHub Pages avec Actions
```yaml
# .github/workflows/deploy.yml (optionnel)
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install # Si vous ajoutez des dépendances build
    
    - name: Build
      run: npm run build # Si vous ajoutez un process de build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist # Ou le dossier de build
```

### Optimisations Pré-Déploiement

#### Minification (Optionnelle)
```bash
# Script de minification pour optimiser les performances
# package.json (si vous souhaitez ajouter un build process)
{
  "scripts": {
    "build": "npm run minify:css && npm run minify:js",
    "minify:css": "cleancss -o dist/assets/portfolio/style.min.css assets/portfolio/style.css",
    "minify:js": "terser assets/portfolio/script.js -o dist/assets/portfolio/script.min.js",
    "deploy": "npm run build && git add dist && git commit -m 'Build for deployment' && git push"
  },
  "devDependencies": {
    "clean-css-cli": "^5.6.0",
    "terser": "^5.16.0"
  }
}
```

#### Compression d'Images
```bash
# Optimisation des images (si nécessaire)
# Installation d'outils
npm install -g imagemin-cli imagemin-pngquant imagemin-mozjpeg

# Compression
imagemin assets/logo/*.png --out-dir=dist/assets/logo --plugin=pngquant
```

## 📊 Monitoring et Performance

### Métriques de Performance

#### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: treosh/lighthouse-ci-action@v8
        with:
          configPath: './lighthouse.config.js'
          uploadArtifacts: true
          temporaryPublicStorage: true
```

#### Configuration Lighthouse
```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['https://0xcyberlitech.github.io/'],
      startServerCommand: 'python -m http.server 8080',
      numberOfRuns: 3
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.95}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

### Monitoring en Production

#### Uptime Monitoring
```bash
# Script de monitoring simple
#!/bin/bash
# monitor.sh
URL="https://0xcyberlitech.github.io"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $RESPONSE -eq 200 ]; then
    echo "✅ Site en ligne - $(date)"
else
    echo "❌ Site hors ligne - Code: $RESPONSE - $(date)"
    # Envoyer notification (email, Slack, etc.)
fi
```

#### Performance Tracking
```javascript
// assets/utils/performance.js (optionnel)
export class PerformanceTracker {
    constructor() {
        this.metrics = {};
    }
    
    trackPageLoad() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            this.metrics.domReady = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            
            console.log('Performance Metrics:', this.metrics);
        });
    }
    
    trackApiCalls() {
        // Monitoring des appels API GitHub
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const start = performance.now();
            const response = await originalFetch(...args);
            const duration = performance.now() - start;
            
            console.log(`API Call: ${args[0]} - ${duration.toFixed(2)}ms`);
            return response;
        };
    }
}
```

## 🔒 Sécurité

### Sécurité renforcée v2.1

- **Content Security Policy (CSP)** : Balise CSP stricte dans les pages principales (`default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';`).
- **En-têtes de sécurité** : X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Sanitization HTML** : Les partiels HTML sont nettoyés (balises <script> et attributs on* supprimés) avant injection.
- **Tests automatisés** : Dossier `tests/` avec Jest pour valider l’échappement XSS et la robustesse des fonctions critiques.
- **Audit de dépendances** : Pas de dépendances JS externes non maîtrisées, surveillance automatique via Dependabot et CodeQL.
- **Secret Scanning** : Détection automatique des secrets exposés.
- **Documentation sécurité** : Voir aussi `SECURITY.md`, `docs/SECURITE_AUTO_DOC.md`, `docs/RAPPORT_AUDIT_SECURITE.md`.

#### Validation de Déploiement Sécurisé
```bash
# Script de vérification sécurité post-déploiement
#!/bin/bash
# security-check.sh

URL="https://0xcyberlitech.github.io"

echo "🔒 Vérification des headers de sécurité..."

# Vérification HTTPS
if curl -s -I $URL | grep -q "HTTP/2 200"; then
    echo "✅ HTTPS activé"
else
    echo "❌ HTTPS non configuré"
fi

# Vérification CSP
if curl -s -I $URL | grep -q "Content-Security-Policy"; then
    echo "✅ CSP configuré"
else
    echo "⚠️  CSP manquant"
fi

# Vérification X-Frame-Options
if curl -s -I $URL | grep -q "X-Frame-Options"; then
    echo "✅ X-Frame-Options présent"
else
    echo "⚠️  X-Frame-Options manquant"
fi
```

## 🚨 Troubleshooting

### Problèmes Courants

#### Déploiement GitHub Pages Échoue
```bash
# Vérifications :
# 1. Branch correcte
git branch --show-current  # Doit être 'main'

# 2. Fichiers présents
ls -la  # index.html doit être à la racine

# 3. Permissions
# Vérifier Settings > Pages > Source permissions

# 4. Actions GitHub
# Onglet Actions pour voir les erreurs
```

#### Site Inaccessible Après Déploiement
```bash
# 1. Cache DNS
# Attendre 24h ou vider le cache DNS
nslookup 0xcyberlitech.github.io

# 2. Propagation
# Vérifier sur https://whatsmydns.net

# 3. HTTPS
# Parfois prend du temps à s'activer
curl -I http://0xcyberlitech.github.io
```

#### Erreurs JavaScript en Production
```bash
# 1. Vérifier les chemins relatifs
# Les paths doivent être relatifs, pas absolus

# 2. CORS avec GitHub API
# Vérifier que les appels API fonctionnent

# 3. Console navigateur
# F12 > Console pour voir les erreurs
```

### Rollback et Recovery

#### Rollback Rapide
```bash
# 1. Identifier le dernier commit fonctionnel
git log --oneline -10

# 2. Créer une branche de fix
git checkout -b hotfix/rollback-issue

# 3. Reset au commit fonctionnel
git reset --hard COMMIT_HASH

# 4. Force push (attention!)
git push origin hotfix/rollback-issue --force

# 5. Merger via PR après validation
```

#### Backup et Restore
```bash
# Backup régulier
git clone --mirror https://github.com/0xCyberLiTech/0xCyberLiTech.github.io.git backup/

# Restore depuis backup
cd backup/
git remote set-url origin https://github.com/0xCyberLiTech/0xCyberLiTech.github.io.git
git push --mirror
```

## 📋 Checklist de Déploiement

### Pré-Déploiement
- [ ] Code testé localement avec serveur HTTP
- [ ] Pas d'erreurs console navigateur
- [ ] Responsive testé (mobile/tablette/desktop)
- [ ] Performance validée (Lighthouse > 90)
- [ ] Accessibilité vérifiée
- [ ] Links externes fonctionnels
- [ ] API GitHub accessible

### Post-Déploiement
- [ ] Site accessible à l'URL de production
- [ ] Certificat HTTPS actif et valide
- [ ] Toutes les pages se chargent correctement
- [ ] Fonctionnalités JavaScript opérationnelles
- [ ] Images et assets chargent correctement
- [ ] Formulaires fonctionnent (si applicable)
- [ ] Métriques de performance acceptables

### Maintenance Continue
- [ ] Surveillance uptime configurée
- [ ] Backups réguliers planifiés
- [ ] Métriques de performance suivies
- [ ] Logs d'erreur surveillés
- [ ] Certificats SSL suivis (renouvellement)
- [ ] Dépendances mises à jour

## 📈 Analytics et Suivi

### Google Analytics (Optionnel)
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Plausible Analytics (Alternative Privacy-Friendly)
```html
<script defer data-domain="0xcyberlitech.github.io" src="https://plausible.io/js/plausible.js"></script>
```

---

🎯 **Objectif** : Un déploiement fiable, sécurisé et performant avec un minimum de friction pour les mises à jour futures.