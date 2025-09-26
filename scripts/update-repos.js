#!/usr/bin/env node
/**
 * update-repos.js - Script pour mettre à jour le fichier repos.json
 * 
 * Usage:
 *   node scripts/update-repos.js [GITHUB_TOKEN]
 * 
 * Si GITHUB_TOKEN est fourni, utilise l'authentification pour éviter les rate limits
 */

const fs = require('fs');
const path = require('path');

const USERNAME = '0xCyberLiTech';
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'repos.json');

async function fetchRepos(token = null) {
    const headers = {
        'User-Agent': '0xCyberLiTech-Portfolio-Updater',
        'Accept': 'application/vnd.github.v3+json'
    };
    
    if (token) {
        headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos`, {
        headers
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    return await response.json();
}

async function main() {
    const token = process.argv[2] || process.env.GITHUB_TOKEN;
    
    try {
        console.log('🔄 Récupération des dépôts GitHub...');
        const repos = await fetchRepos(token);
        
        // Filtrer et formater les dépôts
        const filteredRepos = repos
            .filter(repo => repo.name !== '0xCyberLiTech.github.io' && repo.name !== '0xCyberLiTech')
            .map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description || 'Aucune description disponible.',
                html_url: repo.html_url,
                default_branch: repo.default_branch || 'main',
                updated_at: repo.updated_at,
                language: repo.language
            }))
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); // Tri par date

        // Créer le dossier data s'il n'existe pas
        const dataDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Écrire le fichier
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(filteredRepos, null, 2));
        
        console.log(`✅ Fichier mis à jour: ${OUTPUT_FILE}`);
        console.log(`📊 ${filteredRepos.length} dépôts traités`);
        
        if (token) {
            console.log('🔐 Authentification utilisée');
        } else {
            console.log('⚠️  Mode anonyme (rate limit possible)');
        }
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
        process.exit(1);
    }
}

// Polyfill fetch pour Node.js < 18
if (typeof fetch === 'undefined') {
    global.fetch = require('node-fetch');
}

main();