/**
 * cyberParticlesBg.js — Réseau neuronal cyber animé
 * Particules flottantes + connexions + ondes de pulse
 * Usage : window.startCyberParticlesBG({ color, count, opacity })
 */
window.startCyberParticlesBG = function(opts) {
  opts = opts || {};
  var hexColor   = opts.color       || '#00fff0';
  var count      = opts.count       || 62;
  var canvasOpacity = opts.opacity  || 0.22;
  var connectDist   = opts.connectDist || 135;

  // Parse hex -> [r,g,b]
  function hexRgb(h) {
    var v = parseInt(h.replace('#',''), 16);
    return [(v>>16)&255, (v>>8)&255, v&255];
  }
  var rgb = hexRgb(hexColor);
  var rc = rgb[0], gc = rgb[1], bc = rgb[2];

  var canvas = document.createElement('canvas');
  canvas.id = 'cyber-particles-bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;opacity:0;transition:opacity 4s ease';
  document.body.prepend(canvas);
  setTimeout(function(){ canvas.style.opacity = canvasOpacity; }, 120);

  var ctx = canvas.getContext('2d');
  var w = 0, h = 0;
  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  // — Particules —
  var pts = [];
  for (var i = 0; i < count; i++) {
    pts.push({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r:  0.9 + Math.random() * 1.6,
      ph: Math.random() * Math.PI * 2,
      ps: 0.018 + Math.random() * 0.022
    });
  }

  // — Ondes de pulse : cercles grandissants —
  var pulses = [];
  function spawnPulse() {
    var p = pts[Math.floor(Math.random() * pts.length)];
    pulses.push({ x: p.x, y: p.y, r: 0, maxR: 55 + Math.random() * 60, life: 1 });
    setTimeout(spawnPulse, 1800 + Math.random() * 2400);
  }
  spawnPulse();

  // — Nœuds actifs (brillent plus fort) —
  var activeNodes = new Set();
  function cycleActive() {
    activeNodes.clear();
    var n = 3 + Math.floor(Math.random() * 4);
    for (var i = 0; i < n; i++) activeNodes.add(Math.floor(Math.random() * pts.length));
    setTimeout(cycleActive, 1200 + Math.random() * 1600);
  }
  cycleActive();

  var raf;
  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Mettre à jour les particules
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy; p.ph += p.ps;
      if (p.x < -10) p.x = w + 10;
      else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      else if (p.y > h + 10) p.y = -10;
    }

    // Connexions
    ctx.lineWidth = 0.7;
    for (var i = 0; i < pts.length - 1; i++) {
      for (var j = i + 1; j < pts.length; j++) {
        var dx = pts[i].x - pts[j].x;
        var dy = pts[i].y - pts[j].y;
        var d  = Math.sqrt(dx*dx + dy*dy);
        if (d < connectDist) {
          var a = (1 - d / connectDist) * 0.28;
          ctx.strokeStyle = 'rgba(' + rc + ',' + gc + ',' + bc + ',' + a + ')';
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    // Ondes pulse
    for (var k = pulses.length - 1; k >= 0; k--) {
      var pu = pulses[k];
      pu.r   += 1.4;
      pu.life = 1 - pu.r / pu.maxR;
      if (pu.life <= 0) { pulses.splice(k, 1); continue; }
      ctx.beginPath();
      ctx.arc(pu.x, pu.y, pu.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + rc + ',' + gc + ',' + bc + ',' + (pu.life * 0.38) + ')';
      ctx.lineWidth = 1.2 * pu.life;
      ctx.stroke();
    }

    // Nœuds
    for (var i = 0; i < pts.length; i++) {
      var p   = pts[i];
      var pf  = 0.65 + 0.35 * Math.sin(p.ph);
      var r   = p.r * pf;
      var hot = activeNodes.has(i);
      var a   = hot ? 0.95 : (0.45 + 0.45 * pf);

      ctx.beginPath();
      ctx.arc(p.x, p.y, hot ? r * 1.7 : r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + rc + ',' + gc + ',' + bc + ',' + a + ')';
      ctx.shadowColor = hexColor;
      ctx.shadowBlur  = hot ? 18 : (6 * pf);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    raf = requestAnimationFrame(draw);
  }
  draw();

  return {
    canvas: canvas,
    stop: function(){ cancelAnimationFrame(raf); }
  };
};
