/**
 * tronNumbersBg.js — Effet de fond Tron 3D
 *
 * Dépendances :
 *   - Aucune dépendance externe
 *   - Peut être appelé via window.startTronNumbersBG()
 *
 * Utilisation :
 *   - Ajoute un canvas animé en fond de page
 *   - À appeler après chargement du DOM
 */
// Effet fond Tron 3D ultra-dynamique : grille fuyante, couleurs dynamiques, scrolling latéral, points et lignes qui pulsent

window.startTronNumbersBG = function tronGrid3DPlusBG(){
	const canvas = document.createElement('canvas');
	canvas.id = 'tron-numbers-bg';
	canvas.style.position = 'fixed';
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.style.width = '100vw';
	canvas.style.height = '100vh';
	canvas.style.zIndex = '0';
	canvas.style.pointerEvents = 'none';

	canvas.style.opacity = '0';
	canvas.style.transition = 'opacity 7s cubic-bezier(0.4,0,0.2,1)';
	document.body.prepend(canvas);

	// Transition douce d'apparition
	setTimeout(() => {
		canvas.style.opacity = '0.38';
	}, 80);

	let ctx, w, h, t = 0;
	const gridSize = 32;
	const depth = 22;
	function resize() {
		w = canvas.width = window.innerWidth;
		h = canvas.height = window.innerHeight;
	}
	function lerpColor(a, b, t) {
		// a, b = hex color string, t = 0..1
		const ah = parseInt(a.replace('#',''),16), bh = parseInt(b.replace('#',''),16);
		const ar = (ah>>16)&0xff, ag = (ah>>8)&0xff, ab = ah&0xff;
		const br = (bh>>16)&0xff, bg = (bh>>8)&0xff, bb = bh&0xff;
		const rr = Math.round(ar + (br-ar)*t), rg = Math.round(ag + (bg-ag)*t), rb = Math.round(ab + (bb-ab)*t);
		return `rgb(${rr},${rg},${rb})`;
	}
	function project3D(x, y, z) {
		// Perspective simple
		const fov = 420;
		const scale = fov / (fov + z);
		return {
			x: w/2 + (x - w/2) * scale + Math.sin(t*0.7+z*0.01)*32*scale, // scrolling latéral
			y: h*0.7 + (y - h*0.7) * scale
		};
	}
	function draw() {
		ctx.clearRect(0,0,w,h);
		// Grille 3D horizontale (profondeur)
		for(let zi=0;zi<depth;zi++) {
			let z = zi*gridSize + (t*120)%gridSize;
			let glow = 0.18 + 0.82*(1-zi/depth);
			let color = lerpColor('#00fff0', '#3f6fff', zi/depth);
			ctx.strokeStyle = `rgba(0,255,255,${glow*0.7})`;
			ctx.lineWidth = 2.8-glow*1.7;
			ctx.shadowColor = color;
			ctx.shadowBlur = 22*glow;
			ctx.beginPath();
			for(let xi=0;xi<=w/gridSize;xi++) {
				let x = xi*gridSize;
				let p = project3D(x,0,z);
				if(xi===0) ctx.moveTo(p.x,p.y);
				else ctx.lineTo(p.x,p.y);
			}
			ctx.stroke();
			ctx.shadowBlur = 0;
		}
		// Grille 3D verticale
		for(let xi=0;xi<=w/gridSize;xi++) {
			let x = xi*gridSize;
			ctx.beginPath();
			for(let zi=0;zi<depth;zi++) {
				let z = zi*gridSize + (t*120)%gridSize;
				let p = project3D(x,0,z);
				if(zi===0) ctx.moveTo(p.x,p.y);
				else ctx.lineTo(p.x,p.y);
			}
			let color = lerpColor('#00fff0', '#3f6fff', xi/(w/gridSize));
			ctx.strokeStyle = color;
			ctx.lineWidth = 1.2 + 1.2*Math.sin(t*1.2+xi*0.2);
			ctx.shadowColor = color;
			ctx.shadowBlur = 10;
			ctx.stroke();
			ctx.shadowBlur = 0;
		}
		// Points d'intersection qui pulsent et changent de couleur
		for(let zi=0;zi<depth;zi++) {
			let z = zi*gridSize + (t*120)%gridSize;
			for(let xi=0;xi<=w/gridSize;xi++) {
				let x = xi*gridSize;
				let p = project3D(x,0,z);
				let pulse = 0.7 + 0.3*Math.sin(t*3 + xi*0.5 + zi*0.7);
				let color = lerpColor('#00fff0', '#3f6fff', zi/depth);
				ctx.beginPath();
				ctx.arc(p.x, p.y, 3.5 + 3*pulse*(1-zi/depth), 0, 2*Math.PI);
				ctx.fillStyle = `rgba(63,255,255,${0.22+0.22*pulse})`;
				ctx.shadowColor = color;
				ctx.shadowBlur = 22 + 18*pulse*(1-zi/depth);
				ctx.fill();
				ctx.shadowBlur = 0;
			}
		}
		t += 0.017;
		requestAnimationFrame(draw);
	}
	function init() {
		ctx = canvas.getContext('2d');
		resize();
		window.addEventListener('resize', resize);
		draw();
	}
	setTimeout(init, 1000);
};
