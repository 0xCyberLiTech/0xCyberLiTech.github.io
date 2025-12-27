// Script Node.js pour minifier JS (ES6 modules) et CSS avec esbuild
// Usage : node build.cjs

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Minification JS (en gardant les imports ES6)
esbuild.build({
  entryPoints: ['assets/portfolio/script.js'],
  bundle: false, // Pas de bundle, juste minification
  minify: true,
  format: 'esm',
  outfile: 'assets/portfolio/script.min.js',
  sourcemap: false,
  target: ['es2020'],
  charset: 'utf8',
  legalComments: 'none',
}).then(() => {
  console.log('JS minifié avec succès.');
}).catch((e) => {
  console.error('Erreur minification JS:', e);
});

// Minification CSS simple (suppression espaces/commentaires)
function minifyCSS(inputPath, outputPath) {
  let css = fs.readFileSync(inputPath, 'utf8');
  css = css.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, ''); // Remove comments
  css = css.replace(/\s{2,}/g, ' '); // Collapse spaces
  css = css.replace(/\s*([:;{},])\s*/g, '$1'); // Remove space around : ; { } ,
  css = css.replace(/;}/g, '}'); // Remove ; before }
  fs.writeFileSync(outputPath, css, 'utf8');
  console.log('CSS minifié avec succès.');
}

minifyCSS('assets/portfolio/style.css', 'assets/portfolio/style.min.css');
