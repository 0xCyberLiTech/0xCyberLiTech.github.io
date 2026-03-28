/**
 * cyberParticlesBg.js — Fond cyber HUD animé v2
 *
 * Couches :
 *  1. Grille hexagonale (très subtile)
 *  2. Réseau de particules + connexions (brighter sur nœuds actifs)
 *  3. Paquets de données voyageant sur les arêtes
 *  4. Ondes de pulse
 *  5. Faisceau de scan horizontal
 *  6. Streaks de glitch (rares)
 *  7. Nœuds (avec crosshair sur les nœuds actifs)
 *
 * Usage : window.startCyberParticlesBG({ color, count, opacity, connectDist })
 */
window.startCyberParticlesBG = function(opts) {
  opts = opts || {};
  var hexColor      = opts.color       || '#00fff0';
  var count         = opts.count       || 70;
  var canvasOpacity = opts.opacity     || 0.22;
  var connectDist   = opts.connectDist || 140;

  function hexRgb(h) {
    var v = parseInt(h.replace('#',''), 16);
    return [(v>>16)&255, (v>>8)&255, v&255];
  }
  var rgb = hexRgb(hexColor);
  var rc = rgb[0], gc = rgb[1], bc = rgb[2];
  function rgba(a) { return 'rgba('+rc+','+gc+','+bc+','+a+')'; }

  // ── Canvas ───────────────────────────────────────────────────────────
  var canvas = document.createElement('canvas');
  canvas.id = 'cyber-particles-bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;opacity:0;transition:opacity 5s ease';
  document.body.prepend(canvas);
  setTimeout(function(){ canvas.style.opacity = canvasOpacity; }, 120);

  var ctx = canvas.getContext('2d');
  var w = 0, h = 0;

  // ── Grille hexagonale ────────────────────────────────────────────────
  var hexR = 58;
  var hexSegs = [];
  function buildHexGrid() {
    hexSegs = [];
    var dxCol = hexR * Math.sqrt(3);
    var dyRow = hexR * 1.5;
    var cols = Math.ceil(w / dxCol) + 3;
    var rows = Math.ceil(h / dyRow) + 3;
    for (var row = -1; row < rows; row++) {
      for (var col = -1; col < cols; col++) {
        var cx = col * dxCol + (row & 1 ? dxCol / 2 : 0);
        var cy = row * dyRow;
        // 3 segments par hex (évite doublons)
        for (var s = 0; s < 3; s++) {
          var a1 = (s * 60 - 30) * Math.PI / 180;
          var a2 = ((s + 1) * 60 - 30) * Math.PI / 180;
          hexSegs.push(
            cx + hexR * Math.cos(a1), cy + hexR * Math.sin(a1),
            cx + hexR * Math.cos(a2), cy + hexR * Math.sin(a2)
          );
        }
      }
    }
  }

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
    buildHexGrid();
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  // ── Particules ───────────────────────────────────────────────────────
  var pts = [];
  for (var i = 0; i < count; i++) {
    pts.push({
      x:  Math.random() * w,  y:  Math.random() * h,
      vx: (Math.random() - 0.5) * 0.30,
      vy: (Math.random() - 0.5) * 0.30,
      r:  0.8 + Math.random() * 1.8,
      ph: Math.random() * Math.PI * 2,
      ps: 0.014 + Math.random() * 0.022
    });
  }

  // ── Nœuds actifs ────────────────────────────────────────────────────
  var activeNodes = new Set();
  function cycleActive() {
    activeNodes.clear();
    var n = 4 + Math.floor(Math.random() * 4);
    for (var i = 0; i < n; i++) activeNodes.add(Math.floor(Math.random() * pts.length));
    setTimeout(cycleActive, 1000 + Math.random() * 1400);
  }
  cycleActive();

  // ── Ondes de pulse ───────────────────────────────────────────────────
  var pulses = [];
  function spawnPulse() {
    var p = pts[Math.floor(Math.random() * pts.length)];
    pulses.push({ x: p.x, y: p.y, r: 0, maxR: 60 + Math.random() * 80, life: 1 });
    setTimeout(spawnPulse, 1600 + Math.random() * 2200);
  }
  spawnPulse();

  // ── Paquets de données ────────────────────────────────────────────────
  var packets = [];
  function spawnPacket() {
    for (var tries = 0; tries < 30; tries++) {
      var a = Math.floor(Math.random() * pts.length);
      var b = Math.floor(Math.random() * pts.length);
      if (a === b) continue;
      var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y;
      if (dx*dx + dy*dy < connectDist * connectDist) {
        packets.push({ a: a, b: b, t: 0, spd: 0.005 + Math.random() * 0.009 });
        break;
      }
    }
    setTimeout(spawnPacket, 350 + Math.random() * 500);
  }
  spawnPacket();

  // ── Streaks de glitch ────────────────────────────────────────────────
  var streaks = [];
  function spawnStreak() {
    if (Math.random() < 0.65) {
      streaks.push({
        y:    Math.random() * h,
        x:    Math.random() * w * 0.3,
        len:  60 + Math.random() * 200,
        life: 1,
        spd:  0.08 + Math.random() * 0.12
      });
    }
    setTimeout(spawnStreak, 1800 + Math.random() * 3000);
  }
  spawnStreak();

  // ── Faisceau de scan ─────────────────────────────────────────────────
  var scanY = -80;
  var scanSpd = 0.35;

  // ── DRAW LOOP ────────────────────────────────────────────────────────
  var raf;
  function draw() {
    ctx.clearRect(0, 0, w, h);

    // 1. Grille hexagonale
    ctx.lineWidth = 0.4;
    ctx.strokeStyle = rgba(0.05);
    ctx.beginPath();
    for (var si = 0; si < hexSegs.length; si += 4) {
      ctx.moveTo(hexSegs[si],   hexSegs[si+1]);
      ctx.lineTo(hexSegs[si+2], hexSegs[si+3]);
    }
    ctx.stroke();

    // 2. Mise à jour particules
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy; p.ph += p.ps;
      if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
    }

    // 3. Connexions
    ctx.lineWidth = 0.6;
    for (var i = 0; i < pts.length - 1; i++) {
      for (var j = i + 1; j < pts.length; j++) {
        var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        var d2 = dx*dx + dy*dy;
        if (d2 < connectDist * connectDist) {
          var d = Math.sqrt(d2);
          var baseA = (1 - d / connectDist) * 0.28;
          var bothActive = activeNodes.has(i) && activeNodes.has(j);
          var anyActive  = bothActive || activeNodes.has(i) || activeNodes.has(j);
          var a = bothActive ? baseA * 3.5 : anyActive ? baseA * 1.8 : baseA;
          ctx.lineWidth = bothActive ? 1.0 : 0.6;
          ctx.strokeStyle = rgba(Math.min(a, 0.9));
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    // 4. Paquets de données
    for (var k = packets.length - 1; k >= 0; k--) {
      var pk = packets[k];
      pk.t += pk.spd;
      if (pk.t >= 1) { packets.splice(k, 1); continue; }
      var pa = pts[pk.a], pb = pts[pk.b];
      var dx = pb.x - pa.x, dy = pb.y - pa.y;
      var d2 = dx*dx + dy*dy;
      if (d2 >= connectDist * connectDist) { packets.splice(k, 1); continue; }
      var fade = Math.sin(pk.t * Math.PI);
      var px = pa.x + dx * pk.t;
      var py = pa.y + dy * pk.t;
      ctx.shadowColor  = hexColor;
      ctx.shadowBlur   = 10;
      ctx.fillStyle    = rgba(0.95 * fade);
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fill();
      // traîne
      ctx.shadowBlur  = 4;
      ctx.fillStyle   = rgba(0.35 * fade);
      ctx.beginPath();
      ctx.arc(pa.x + dx * (pk.t - 0.06), pa.y + dy * (pk.t - 0.06), 1.0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 5. Ondes de pulse
    for (var k = pulses.length - 1; k >= 0; k--) {
      var pu = pulses[k];
      pu.r   += 1.6;
      pu.life = 1 - pu.r / pu.maxR;
      if (pu.life <= 0) { pulses.splice(k, 1); continue; }
      ctx.beginPath();
      ctx.arc(pu.x, pu.y, pu.r, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(pu.life * 0.42);
      ctx.lineWidth   = 1.4 * pu.life;
      ctx.stroke();
      // anneau intérieur
      if (pu.r > 12) {
        ctx.beginPath();
        ctx.arc(pu.x, pu.y, pu.r * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(pu.life * 0.12);
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }

    // 6. Faisceau de scan
    scanY += scanSpd;
    if (scanY > h + 80) scanY = -80;
    var sg = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
    sg.addColorStop(0,    rgba(0));
    sg.addColorStop(0.45, rgba(0.03));
    sg.addColorStop(0.5,  rgba(0.10));
    sg.addColorStop(0.55, rgba(0.03));
    sg.addColorStop(1,    rgba(0));
    ctx.fillStyle = sg;
    ctx.fillRect(0, scanY - 60, w, 120);
    // ligne de scan dure
    ctx.strokeStyle = rgba(0.14);
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(w, scanY);
    ctx.stroke();

    // 7. Streaks de glitch
    for (var k = streaks.length - 1; k >= 0; k--) {
      var sk = streaks[k];
      sk.life -= sk.spd;
      if (sk.life <= 0) { streaks.splice(k, 1); continue; }
      var sg2 = ctx.createLinearGradient(sk.x, 0, sk.x + sk.len, 0);
      sg2.addColorStop(0,   rgba(0));
      sg2.addColorStop(0.3, rgba(sk.life * 0.55));
      sg2.addColorStop(1,   rgba(0));
      ctx.strokeStyle = sg2;
      ctx.lineWidth   = 0.8;
      ctx.beginPath();
      ctx.moveTo(sk.x, sk.y);
      ctx.lineTo(sk.x + sk.len, sk.y);
      ctx.stroke();
      sk.x += 4;
    }

    // 8. Nœuds
    for (var i = 0; i < pts.length; i++) {
      var p   = pts[i];
      var pf  = 0.65 + 0.35 * Math.sin(p.ph);
      var r   = p.r * pf;
      var hot = activeNodes.has(i);
      var al  = hot ? 1.0 : (0.45 + 0.45 * pf);

      ctx.shadowColor = hexColor;
      ctx.shadowBlur  = hot ? 28 : (7 * pf);
      ctx.fillStyle   = rgba(al);
      ctx.beginPath();
      ctx.arc(p.x, p.y, hot ? r * 2.2 : r, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair sur nœuds actifs
      if (hot) {
        var cr = r * 5;
        ctx.shadowBlur  = 6;
        ctx.strokeStyle = rgba(0.35);
        ctx.lineWidth   = 0.6;
        ctx.beginPath();
        ctx.moveTo(p.x - cr, p.y); ctx.lineTo(p.x - r * 2.5, p.y);
        ctx.moveTo(p.x + r * 2.5, p.y); ctx.lineTo(p.x + cr, p.y);
        ctx.moveTo(p.x, p.y - cr); ctx.lineTo(p.x, p.y - r * 2.5);
        ctx.moveTo(p.x, p.y + r * 2.5); ctx.lineTo(p.x, p.y + cr);
        ctx.stroke();
      }
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
