
# API Documentation - Portfolio 0xCyberLiTech v2.1

## Sommaire
- [APIs Externes](#-apis-externes)
    - [GitHub API v3](#github-api-v3)
- [API Interne du Portfolio](#-api-interne-du-portfolio)
    - [Module PortfolioManager](#module-portfoliomanager)
- [Gestion des Erreurs](#gestion-des-erreurs)

📡 Documentation technique des APIs utilisées et de l'architecture de données du portfolio.

**Dernière mise à jour** : 4 octobre 2025

## 🌐 APIs Externes

### GitHub API v3

#### Endpoint Principal
```
GET https://api.github.com/users/0xCyberLiTech/repos
```

#### Authentification
- **Type** : Aucune (API publique)
- **Rate Limiting** : 60 requêtes/heure pour les IPs non authentifiées
- **Headers recommandés** :
  ```javascript
  {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': '0xCyberLiTech-Portfolio/1.2.0'
  }
  ```

#### Structure de Réponse
```json
[
  {
    "id": 123456789,
    "node_id": "MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODk=",
    "name": "example-project",
    "full_name": "0xCyberLiTech/example-project",
    "private": false,
    "owner": {
      "login": "0xCyberLiTech",
      "id": 12345,
      "avatar_url": "https://avatars.githubusercontent.com/u/12345?v=4",
      "html_url": "https://github.com/0xCyberLiTech"
    },
    "html_url": "https://github.com/0xCyberLiTech/example-project",
    "description": "Description du projet",
    "fork": false,
    "created_at": "2023-01-15T10:30:00Z",
    "updated_at": "2023-09-15T14:45:00Z",
    "pushed_at": "2023-09-15T14:45:00Z",
    "git_url": "git://github.com/0xCyberLiTech/example-project.git",
    "ssh_url": "git@github.com:0xCyberLiTech/example-project.git",
    "clone_url": "https://github.com/0xCyberLiTech/example-project.git",
    "homepage": "https://example-project.com",
    "size": 2048,
    "stargazers_count": 15,
    "watchers_count": 15,
    "language": "JavaScript",
    "forks_count": 3,
    "archived": false,
    "disabled": false,
    "open_issues_count": 2,
    "topics": ["web", "javascript", "portfolio"],
    "visibility": "public",
    "default_branch": "main"
  }
]
```

#### Champs Utilisés par le Portfolio
```javascript
const usedFields = {
    name: "string",           // Nom du repository (requis)
    description: "string",    // Description (peut être null)
    html_url: "string",       // URL GitHub (requis)
    updated_at: "string",     // Date ISO 8601 (requis)
    default_branch: "string", // Branche par défaut (requis)
    topics: "array",          // Tags/sujets (optionnel)
    language: "string",       // Langage principal (optionnel)
    stargazers_count: "number" // Nombre d'étoiles (optionnel)
};
```

#### Gestion des Erreurs
```javascript
// Codes de statut possibles
const statusCodes = {
    200: "Succès - Données récupérées",
    304: "Not Modified - Utiliser le cache",
    403: "Rate limit atteint",
    404: "Utilisateur non trouvé",
    500: "Erreur serveur GitHub"
};

// Exemple de gestion d'erreur
async function handleGitHubAPI(response) {
    if (!response.ok) {
        switch (response.status) {
            case 403:
                throw new Error('Rate limit GitHub atteint. Réessayez dans 1 heure.');
            case 404:
                throw new Error('Utilisateur GitHub non trouvé.');
            case 500:
                throw new Error('Erreur serveur GitHub. Réessayez plus tard.');
            default:
                throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }
    }
    return response.json();
}
```

## 🔧 API Interne du Portfolio

### Module PortfolioManager

#### Interface Publique
```javascript
/**
 * Gestionnaire principal du portfolio
 * @class PortfolioManager
 */
class PortfolioManager {
    /**
     * Initialise le portfolio
     * @returns {Promise<void>}
     */
    async init() {}
    
    /**
     * Charge les repositories depuis GitHub
     * @returns {Promise<Array>}
     */
    async loadRepositories() {}
    
    /**
     * Filtre les repositories selon les critères
     * @param {Array} repos - Liste des repositories
     * @returns {Array} Repositories filtrés
     */
    filterRepositories(repos) {}
    
    /**
     * Rend les repositories dans le DOM
     * @param {Array} repos - Repositories à afficher
     * @returns {void}
     */
    renderRepositories(repos) {}
}
```

#### Variables Globales
```javascript
// Variables exposées globalement pour debugging et intégrations
window.__portfolioData = {
    allRepos: [],           // Tous les repositories chargés
    filteredRepos: [],      // Repositories après filtrage
    lastUpdate: null,       // Timestamp du dernier chargement
    isLoading: false,       // État de chargement
    errors: []              // Historique des erreurs
};
```

### Module PreloaderManager

#### Interface
```javascript
class PreloaderManager {
    /**
     * Démarre l'animation du préchargeur
     * @param {Object} options - Configuration
     * @returns {Promise<void>}
     */
    async start(options = {}) {}
    
    /**
     * Met à jour la progression
     * @param {number} percent - Pourcentage (0-100)
     * @param {string} message - Message à afficher
     */
    updateProgress(percent, message) {}
    
    /**
     * Termine et masque le préchargeur
     * @returns {Promise<void>}
     */
    async complete() {}
}
```

## 📊 Formats de Données

### Repository Data Structure
```typescript
interface Repository {
    // Identifiants
    id: number;
    name: string;
    full_name: string;
    
    // URLs
    html_url: string;
    clone_url: string;
    homepage?: string;
    
    // Métadonnées
    description: string | null;
    language: string | null;
    topics: string[];
    
    // Statistiques
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    size: number;
    
    // Dates
    created_at: string; // ISO 8601
    updated_at: string; // ISO 8601
    pushed_at: string;  // ISO 8601
    
    // Configuration
    default_branch: string;
    private: boolean;
    fork: boolean;
    archived: boolean;
    disabled: boolean;
}
```

### Portfolio Configuration
```typescript
interface PortfolioConfig {
    github: {
        username: string;
        excludedRepos: string[];
        apiEndpoint: string;
        requestTimeout: number;
    };
    ui: {
        newRepoThresholdDays: number;
        maxReposDisplay: number;
        enableAnimations: boolean;
    };
    performance: {
        cacheTimeout: number;
        retryAttempts: number;
        retryDelay: number;
    };
}
```

## 🚀 Performance et Optimisation

### Stratégies de Cache

#### Cache Navigateur
```javascript
// Cache avec expiration temporelle
class APICache {
    constructor(ttl = 5 * 60 * 1000) { // 5 minutes par défaut
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
    
    get(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;
        
        if (Date.now() - cached.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return cached.data;
    }
    
    clear() {
        this.cache.clear();
    }
    
    size() {
        return this.cache.size;
    }
}
```

#### Service Worker Cache (Future)
```javascript
// Stratégie de cache pour PWA
const cacheStrategy = {
    github_api: 'network-first',    // API GitHub
    static_assets: 'cache-first',   // CSS, JS, images
    html_pages: 'stale-while-revalidate'
};
```

### Rate Limiting

#### Gestion GitHub API
```javascript
class RateLimiter {
    constructor() {
        this.requests = [];
        this.maxRequests = 60;
        this.windowMs = 60 * 60 * 1000; // 1 heure
    }
    
    async canMakeRequest() {
        const now = Date.now();
        
        // Nettoyer les requêtes anciennes
        this.requests = this.requests.filter(
            timestamp => now - timestamp < this.windowMs
        );
        
        return this.requests.length < this.maxRequests;
    }
    
    recordRequest() {
        this.requests.push(Date.now());
    }
    
    getStatus() {
        return {
            remaining: this.maxRequests - this.requests.length,
            resetTime: new Date(Date.now() + this.windowMs)
        };
    }
}
```

## 🔒 Sécurité des APIs

### Validation des Données
```javascript
/**
 * Valide la structure d'un repository GitHub
 * @param {Object} repo - Repository à valider
 * @returns {boolean} True si valide
 */
function validateRepository(repo) {
    const requiredFields = ['name', 'html_url', 'updated_at'];
    
    // Vérifier les champs obligatoires
    for (const field of requiredFields) {
        if (!(field in repo) || repo[field] === null) {
            console.warn(`Repository invalide: champ '${field}' manquant`);
            return false;
        }
    }
    
    // Valider les URLs
    if (!repo.html_url.startsWith('https://github.com/')) {
        console.warn('URL de repository invalide:', repo.html_url);
        return false;
    }
    
    // Valider les dates
    if (isNaN(Date.parse(repo.updated_at))) {
        console.warn('Date updated_at invalide:', repo.updated_at);
        return false;
    }
    
    return true;
}
```

### Content Security Policy
```javascript
// Headers CSP recommandés pour les APIs
const cspDirectives = {
    'default-src': "'self'",
    'connect-src': "'self' https://api.github.com",
    'img-src': "'self' data: https://avatars.githubusercontent.com",
    'script-src': "'self' 'unsafe-inline'",
    'style-src': "'self' 'unsafe-inline'"
};
```

## 📈 Monitoring et Analytics

### Métriques API
```javascript
class APIMetrics {
    constructor() {
        this.metrics = {
            requests: 0,
            errors: 0,
            averageResponseTime: 0,
            cacheHitRate: 0
        };
    }
    
    recordRequest(duration, fromCache = false) {
        this.metrics.requests++;
        
        if (fromCache) {
            this.metrics.cacheHits = (this.metrics.cacheHits || 0) + 1;
        }
        
        // Calcul moyenne mobile
        this.metrics.averageResponseTime = 
            (this.metrics.averageResponseTime + duration) / 2;
    }
    
    recordError(error) {
        this.metrics.errors++;
        console.error('API Error:', error);
    }
    
    getReport() {
        return {
            ...this.metrics,
            cacheHitRate: this.metrics.cacheHits / this.metrics.requests * 100,
            errorRate: this.metrics.errors / this.metrics.requests * 100
        };
    }
}
```

### Health Check
```javascript
/**
 * Vérifie la santé des APIs externes
 * @returns {Promise<Object>} Rapport de santé
 */
async function healthCheck() {
    const results = {
        github_api: { status: 'unknown', responseTime: 0 },
        portfolio_api: { status: 'ok', responseTime: 0 }
    };
    
    try {
        const start = performance.now();
        const response = await fetch('https://api.github.com/rate_limit');
        const end = performance.now();
        
        results.github_api = {
            status: response.ok ? 'ok' : 'error',
            responseTime: end - start,
            rateLimit: response.ok ? await response.json() : null
        };
    } catch (error) {
        results.github_api.status = 'error';
        results.github_api.error = error.message;
    }
    
    return results;
}
```

## 🧪 Testing des APIs

### Tests Unitaires
```javascript
// Test de l'API GitHub
describe('GitHub API Integration', () => {
    test('should fetch repositories successfully', async () => {
        const mockResponse = [
            {
                name: 'test-repo',
                html_url: 'https://github.com/user/test-repo',
                description: 'Test repository',
                updated_at: '2023-09-15T10:30:00Z',
                default_branch: 'main'
            }
        ];
        
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse)
            })
        );
        
        const repos = await loadRepos();
        expect(repos).toEqual(mockResponse);
    });
    
    test('should handle API errors gracefully', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 403,
                statusText: 'Forbidden'
            })
        );
        
        await expect(loadRepos()).rejects.toThrow('Rate limit');
    });
});
```

### Tests d'Intégration
```javascript
// Test complet du workflow
test('should load and render repositories', async () => {
    // Setup DOM
    document.body.innerHTML = '<div id="projects-list"></div>';
    
    // Mock API
    mockGitHubAPI();
    
    // Exécuter le workflow complet
    await loadRepos();
    
    // Vérifications
    const container = document.getElementById('projects-list');
    expect(container.children.length).toBeGreaterThan(0);
    expect(container.innerHTML).toContain('project-tile');
});
```

## 🔄 Évolutions Futures

### Nouvelles APIs
- **GitHub GraphQL** : Migration vers l'API v4 pour plus d'efficacité
- **GitHub Contributions** : Graphique d'activité
- **Repository Stats** : Métriques détaillées par projet
- **Search API** : Recherche dans les repositories

### Fonctionnalités Avancées
- **Offline Support** : Cache avec Service Worker
- **Real-time Updates** : WebSockets pour les mises à jour live
- **Analytics** : Tracking des interactions utilisateur
- **A/B Testing** : Tests de différentes présentations

---

📡 **Architecture API** : Conçue pour être extensible, sécurisée et performante, avec une séparation claire entre les données externes et la logique interne.