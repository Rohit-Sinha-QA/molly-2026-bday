/* ============================================================
   Site logic. You shouldn't need to edit this file —
   go edit js/config.js instead.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundParticles();
  initLockScreen();
});

/* ---------------- Starfield / floating hearts background ---------------- */
function initBackgroundParticles() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const symbols = ['✦', '·', '♥'];
  particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.4,
    speed: Math.random() * 0.25 + 0.05,
    drift: (Math.random() - 0.5) * 0.15,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    heart: Math.random() < 0.06,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      ctx.globalAlpha = p.opacity;
      if (p.heart) {
        ctx.fillStyle = '#ff8fa3';
        ctx.font = `${p.r * 6 + 8}px sans-serif`;
        ctx.fillText('♥', p.x, p.y);
      } else {
        ctx.fillStyle = '#f6ecdf';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  tick();
}

/* ---------------- Lock screen ---------------- */
function initLockScreen() {
  const form = document.getElementById('unlockForm');
  const dayInput = document.getElementById('dayInput');
  const monthInput = document.getElementById('monthInput');
  const errorEl = document.getElementById('unlockError');
  const hintBtn = document.getElementById('hintBtn');
  const hintText = document.getElementById('hintText');
  let attempts = 0;

  hintBtn.addEventListener('click', () => {
    hintText.textContent = CONFIG.unlockHint;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const day = dayInput.value.trim().padStart(2, '0');
    const month = monthInput.value.trim().padStart(2, '0');

    if (day === CONFIG.unlockDay && month === CONFIG.unlockMonth) {
      unlockSite();
    } else {
      attempts++;
      errorEl.textContent = "That's not quite it... try again.";
      if (attempts >= 2) hintText.textContent = CONFIG.unlockHint;
      const lockContent = document.querySelector('.lock-content');
      lockContent.style.animation = 'none';
      void lockContent.offsetWidth;
      lockContent.style.animation = 'shake 0.4s';
    }
  });

  const styleSheet = document.createElement('style');
  styleSheet.textContent = `@keyframes shake {
    0%,100% { transform: translateX(0); }
    20%,60% { transform: translateX(-8px); }
    40%,80% { transform: translateX(8px); }
  }`;
  document.head.appendChild(styleSheet);
}

function unlockSite() {
  const lockScreen = document.getElementById('lockScreen');
  lockScreen.style.transition = 'opacity 0.8s ease';
  lockScreen.style.opacity = '0';
  setTimeout(() => {
    lockScreen.style.display = 'none';
    document.getElementById('journey').classList.remove('hidden-ui');
    document.getElementById('heart-tracker').classList.remove('hidden-ui');
    document.getElementById('progress-dots').classList.remove('hidden-ui');
    if (CONFIG.songPath) document.getElementById('music-toggle').classList.remove('hidden-ui');
    initJourney();
  }, 800);
}

/* ---------------- Journey (everything after unlock) ---------------- */
function initJourney() {
  document.getElementById('herNameSlot').textContent = CONFIG.herName;

  buildScrollButtons();
  buildProgressDots();
  initScrollReveal();
  initLetter();
  initGallery();
  initLightbox();
  initMemoryMatch();
  initCipher();
  initReasons();
  initWishCandle();
  initFinale();
  initHeartHunt();
  initMusic();
}

function buildScrollButtons() {
  const chapters = Array.from(document.querySelectorAll('#journey .chapter'));
  document.querySelectorAll('[data-scroll-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = btn.closest('.chapter');
      const idx = chapters.indexOf(current);
      const next = chapters[idx + 1];
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function buildProgressDots() {
  const chapters = Array.from(document.querySelectorAll('#journey .chapter'));
  const nav = document.getElementById('progress-dots');
  chapters.forEach((ch) => {
    const dot = document.createElement('a');
    dot.href = `#${ch.id}`;
    nav.appendChild(dot);
  });
  const dots = nav.querySelectorAll('a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const idx = chapters.indexOf(entry.target);
      if (entry.isIntersecting) {
        dots.forEach((d) => d.classList.remove('active'));
        dots[idx].classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  chapters.forEach((ch) => observer.observe(ch));
}

function initScrollReveal() {
  const chapters = document.querySelectorAll('#journey .chapter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
  }, { threshold: 0.2 });
  chapters.forEach((ch) => observer.observe(ch));
}

/* ---------------- Chapter: Letter ---------------- */
function initLetter() {
  renderTypedLetter('letterLines', CONFIG.apologyLetter);
}

function renderTypedLetter(containerId, lines) {
  const container = document.getElementById(containerId);
  lines.forEach((line) => {
    const p = document.createElement('p');
    p.className = 'letter-line';
    p.textContent = line;
    container.appendChild(p);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const allLines = Array.from(container.children);
        allLines.forEach((el, idx) => {
          setTimeout(() => el.classList.add('show'), idx * 500);
        });
        observer.unobserve(container);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(container);
}

/* ---------------- Chapter: Memories ---------------- */
function initGallery() {
  const grid = document.getElementById('galleryGrid');
  CONFIG.memories.forEach((mem) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = `assets/photos/${mem.file}`;
    img.alt = mem.caption;
    img.onerror = () => {
      img.remove();
      const placeholder = document.createElement('div');
      placeholder.className = 'gallery-placeholder';
      placeholder.innerHTML = `<span class="icon">📷</span><span>Add ${mem.file}</span>`;
      item.appendChild(placeholder);
    };
    item.appendChild(img);

    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.textContent = mem.caption;
    item.appendChild(caption);

    item.addEventListener('click', () => openLightbox(img.src, mem.caption));
    grid.appendChild(item);
  });
}

function initLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
}
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  lb.classList.remove('hidden-ui');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden-ui');
}

/* ---------------- Chapter: Memory Match ---------------- */
function initMemoryMatch() {
  const icons = ['💌', '💍', '🎂', '🌹', '🎁', '🎶', '💫', '🥂'];
  const chosen = icons.slice(0, 6);
  const deck = shuffle([...chosen, ...chosen]);
  const grid = document.getElementById('matchGrid');
  const winMsg = document.getElementById('matchWinMsg');

  let first = null;
  let lock = false;
  let matchedCount = 0;

  deck.forEach((icon) => {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.innerHTML = `
      <div class="back-face">✦</div>
      <div class="front-face">${icon}</div>
    `;
    card.dataset.icon = icon;
    card.addEventListener('click', () => {
      if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
      card.classList.add('flipped');
      if (!first) {
        first = card;
      } else {
        lock = true;
        if (first.dataset.icon === card.dataset.icon) {
          first.classList.add('matched');
          card.classList.add('matched');
          matchedCount++;
          first = null;
          lock = false;
          if (matchedCount === chosen.length) {
            winMsg.textContent = "We always find our way back to each other. 💕";
            confettiBurst();
          }
        } else {
          setTimeout(() => {
            first.classList.remove('flipped');
            card.classList.remove('flipped');
            first = null;
            lock = false;
          }, 700);
        }
      }
    });
    grid.appendChild(card);
  });
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------- Chapter: Cipher ---------------- */
function initCipher() {
  const message = CONFIG.cipherMessage.toUpperCase();
  const encoded = caesarShift(message, 7); // stored shifted by 7
  const encodedEl = document.getElementById('cipherEncoded');
  const slider = document.getElementById('cipherSlider');
  const shiftVal = document.getElementById('cipherShiftVal');

  function render() {
    const shift = parseInt(slider.value, 10);
    shiftVal.textContent = shift;
    encodedEl.textContent = caesarShift(encoded, shift);
  }
  slider.addEventListener('input', render);
  render();
}

function caesarShift(str, shift) {
  return str.replace(/[A-Z]/g, (ch) => {
    const code = ch.charCodeAt(0) - 65;
    const shifted = (code + shift + 26) % 26;
    return String.fromCharCode(shifted + 65);
  });
}

/* ---------------- Chapter: Reasons ---------------- */
function initReasons() {
  const grid = document.getElementById('reasonsGrid');
  CONFIG.reasons.forEach((reason, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `
      <div class="reason-inner">
        <div class="reason-front">♥ ${i + 1}</div>
        <div class="reason-back">${reason}</div>
      </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    grid.appendChild(card);
  });
}

/* ---------------- Chapter: Wish candle ---------------- */
function initWishCandle() {
  const btn = document.getElementById('candleBtn');
  const msg = document.getElementById('wishMsg');
  btn.addEventListener('click', () => {
    if (btn.classList.contains('blown')) return;
    btn.classList.add('blown');
    btn.textContent = '💨';
    msg.textContent = CONFIG.wishMessage;
    confettiBurst();
  });
}

/* ---------------- Finale ---------------- */
function initFinale() {
  if (CONFIG.finaleImage) {
    const wrap = document.getElementById('finaleImageWrap');
    const fig = document.createElement('figure');
    fig.className = 'finale-image';
    const img = document.createElement('img');
    img.src = `assets/photos/${CONFIG.finaleImage.file}`;
    img.alt = CONFIG.finaleImage.caption;
    img.onerror = () => fig.remove();
    const caption = document.createElement('figcaption');
    caption.textContent = CONFIG.finaleImage.caption;
    fig.appendChild(img);
    fig.appendChild(caption);
    wrap.appendChild(fig);
  }
  renderTypedLetter('finalLetterLines', CONFIG.finalLetter);
  const btn = document.getElementById('forgiveBtn');
  const msg = document.getElementById('forgiveMsg');
  btn.addEventListener('click', () => {
    msg.textContent = `${CONFIG.herName} + ${CONFIG.yourName}, always. 💕`;
    bigConfetti();
  });
}

/* ---------------- Hidden heart hunt ---------------- */
function initHeartHunt() {
  const chapters = document.querySelectorAll('#journey .chapter');
  const total = Math.min(5, chapters.length);
  const positions = [
    { top: '10%', left: '8%' },
    { top: '85%', left: '90%' },
    { top: '15%', left: '85%' },
    { top: '80%', left: '10%' },
    { top: '50%', left: '92%' },
  ];
  const targets = shuffle(Array.from(chapters)).slice(0, total);
  let found = 0;
  document.getElementById('heart-total').textContent = total;

  targets.forEach((chapter, i) => {
    chapter.style.position = 'relative';
    const heart = document.createElement('button');
    heart.className = 'hidden-heart';
    heart.textContent = '♥';
    heart.style.top = positions[i].top;
    heart.style.left = positions[i].left;
    heart.setAttribute('aria-label', 'a hidden heart');
    heart.addEventListener('click', () => {
      if (heart.classList.contains('found')) return;
      heart.classList.add('found');
      found++;
      document.getElementById('heart-count').textContent = found;
      if (found === total) {
        setTimeout(() => confettiBurst(), 200);
      }
    });
    chapter.appendChild(heart);
  });
}

/* ---------------- Music ---------------- */
function initMusic() {
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bgAudio');
  audio.src = CONFIG.songPath;
  let playing = false;

  btn.addEventListener('click', () => {
    if (!playing) {
      audio.play().then(() => {
        playing = true;
        btn.classList.add('playing');
      }).catch(() => {});
    } else {
      audio.pause();
      playing = false;
      btn.classList.remove('playing');
    }
  });

  audio.addEventListener('error', () => {
    btn.classList.add('hidden-ui');
  });
}

/* ---------------- Confetti helpers ---------------- */
function confettiBurst() {
  if (typeof confetti !== 'function') return;
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#e3b873', '#ff8fa3', '#f6ecdf'],
  });
}

function bigConfetti() {
  if (typeof confetti !== 'function') return;
  const duration = 2500;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors: ['#e3b873', '#ff8fa3'] });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#e3b873', '#ff8fa3'] });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
