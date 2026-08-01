// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
}

function openMobileMenu() {
  mobileMenu.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
}

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) closeMobileMenu();
  });
}

// ============================================================
// Terminal typing effect
// ============================================================
const typedEl = document.getElementById('typed');
const lines = [
  'whoami',
  'Louie Torreña — Full Stack Web Developer',
  './load_skills.sh --stack=php,laravel,react,vue,node',
  'status: open to new opportunities ✓'
];

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedEl) return;
  const current = lines[lineIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }

  setTimeout(typeLoop, deleting ? 25 : 45);
}
typeLoop();

// ============================================================
// Animated node-grid background (canvas)
// ============================================================
const canvas = document.getElementById('grid-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let animId;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
  }));
}

function drawParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  const maxDist = 140;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.strokeStyle = `rgba(90, 170, 220, ${0.14 * (1 - dist / maxDist)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    ctx.fillStyle = 'rgba(120, 200, 255, 0.55)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
    ctx.fill();
  });

  animId = requestAnimationFrame(drawParticles);
}

if (canvas && ctx && !reduceMotion) {
  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
} else if (canvas) {
  // Reduced motion: draw a single static frame, no animation loop.
  resizeCanvas();
  initParticles();
  drawParticles();
  cancelAnimationFrame(animId);
}

// ============================================================
// Count-up stats (triggered when hero is visible)
// ============================================================
const statEls = document.querySelectorAll('.stat-num');

function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 900;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statEls.forEach(countUp);
      statObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

if (statEls.length) statObserver.observe(statEls[0]);

// ============================================================
// Scroll-reveal for sections
// ============================================================
const revealTargets = document.querySelectorAll('.panel, .tl-entry, .project-card, .edu-card, .qi-item');
revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));
