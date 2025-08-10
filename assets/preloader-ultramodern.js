// Preloader canvas animation (Tron/cyber grid, optionnel)
const canvas = document.getElementById('preloader-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, animationId;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    // Simple grid/scanlines animation (peut être remplacé par un effet plus complexe)
    function draw() {
        ctx.clearRect(0,0,w,h);
        ctx.save();
        ctx.globalAlpha = 0.13;
        ctx.strokeStyle = '#00fff0';
        for(let y=0; y<h; y+=32) {
            ctx.beginPath();
            ctx.moveTo(0,y);
            ctx.lineTo(w,y);
            ctx.stroke();
        }
        ctx.globalAlpha = 0.08;
        for(let x=0; x<w; x+=32) {
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,h);
            ctx.stroke();
        }
        ctx.restore();
        animationId = requestAnimationFrame(draw);
    }
    draw();
    // Arrêt et suppression du canvas après transition
    window.addEventListener('preloader:remove', () => {
        cancelAnimationFrame(animationId);
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    });
}
