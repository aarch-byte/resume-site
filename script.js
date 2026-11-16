// Interactive & Epic Animated Scripts for Ayush's Passion Project Hub

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Dynamic Typing Effect for Roles & Passions
  // =========================================================================
  const roles = [
    'Curiosity & Big Ideas',
    'Passion Projects',
    'Creative Exploration',
    'Building Cool Things',
    'Lifelong Learning'
  ];
  
  const typingElement = document.getElementById('typingText');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 95;
  const erasingDelay = 45;
  const nextRoleDelay = 1900;

  function typeRole() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = nextRoleDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 450;
    }

    setTimeout(typeRole, delay);
  }

  if (typingElement) {
    setTimeout(typeRole, 500);
  }

  // =========================================================================
  // 2. Hacker / Cyber Decryption Text Scrambler Effect
  // =========================================================================
  const scrambleChars = '01#%&*+<>[]{}@!?/\\';
  const scrambleElements = document.querySelectorAll('.scramble-text');

  function scrambleText(element) {
    const originalText = element.getAttribute('data-original') || element.textContent;
    let iterations = 0;
    const totalIterations = originalText.length * 2.5;

    clearInterval(element.scrambleInterval);

    element.scrambleInterval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations / 2.5) {
            return originalText[index];
          }
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      if (iterations >= totalIterations) {
        clearInterval(element.scrambleInterval);
        element.textContent = originalText;
      }

      iterations += 1;
    }, 25);
  }

  scrambleElements.forEach(el => {
    el.addEventListener('mouseenter', () => scrambleText(el));
  });

  // Initial trigger for hero name and brand
  setTimeout(() => {
    const heroName = document.querySelector('.hero-title .scramble-text');
    if (heroName) scrambleText(heroName);
  }, 350);

  // =========================================================================
  // 3. Scroll-Reveal Animations (Intersection Observer)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // =========================================================================
  // 4. Mouse Follow Spotlight Glow
  // =========================================================================
  const mouseGlow = document.getElementById('mouseGlow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  if (mouseGlow && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateMouseGlow() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      mouseGlow.style.left = `${currentX}px`;
      mouseGlow.style.top = `${currentY}px`;

      requestAnimationFrame(animateMouseGlow);
    }
    animateMouseGlow();
  }

  // =========================================================================
  // 5. Epic Dual-Mode Canvas (Cosmic Constellation + Hyperspace Warp)
  // =========================================================================
  const canvas = document.getElementById('bgCanvas');
  let isHyperdrive = false;

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
      initWarpStars();
    });

    // --- Mode 1: Cosmic Constellation & Physics ---
    const particlesCount = Math.min(Math.floor((width * height) / 22000), 55);
    let particles = [];
    let shockwaves = [];
    let meteors = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.55 + 0.25;
      }

      update() {
        // Gravity well effect from mouse cursor
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && dist > 15) {
          const force = (150 - dist) / 150 * 0.04;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }

        // Friction
        this.vx *= 0.985;
        this.vy *= 0.985;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particlesCount; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();

    // Shockwave ripple class
    class Shockwave {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = 180;
        this.alpha = 0.9;
        this.speed = 7;
      }

      update() {
        this.radius += this.speed;
        this.alpha = (1 - this.radius / this.maxRadius) * 0.9;

        // Push nearby particles outward
        particles.forEach(p => {
          const dx = p.x - this.x;
          const dy = p.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - this.radius) < 25 && dist > 0) {
            p.vx += (dx / dist) * 3.5;
            p.vy += (dy / dist) * 3.5;
          }
        });
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#38bdf8';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    // Shooting Meteors
    class Meteor {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width + 200;
        this.y = -50;
        this.length = Math.random() * 80 + 50;
        this.speed = Math.random() * 8 + 9;
        this.alpha = 1;
        this.active = true;
      }

      update() {
        this.x -= this.speed * 0.85;
        this.y += this.speed;
        if (this.y > height + 100 || this.x < -100) {
          this.active = false;
        }
      }

      draw() {
        const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.length * 0.85, this.y - this.length);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.7)');
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length * 0.85, this.y - this.length);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    setInterval(() => {
      if (!isHyperdrive && Math.random() > 0.35) {
        meteors.push(new Meteor());
      }
    }, 4500);

    // Click anywhere for a shockwave pulse
    window.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        shockwaves.push(new Shockwave(e.clientX, e.clientY));
      }
    });

    // --- Mode 2: Hyperspace Warp Stars ---
    const warpStarsCount = 280;
    let warpStars = [];

    class WarpStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = (Math.random() - 0.5) * width;
        this.y = (Math.random() - 0.5) * height;
        this.z = Math.random() * width;
        this.pz = this.z;
      }

      update(speed) {
        this.pz = this.z;
        this.z -= speed;
        if (this.z <= 0) {
          this.reset();
          this.z = width;
          this.pz = this.z;
        }
      }

      draw() {
        const cx = width / 2;
        const cy = height / 2;

        const k = 140 / this.z;
        const px = this.x * k + cx;
        const py = this.y * k + cy;

        const pk = 140 / this.pz;
        const ppx = this.x * pk + cx;
        const ppy = this.y * pk + cy;

        if (px < 0 || px > width || py < 0 || py > height) return;

        const alpha = Math.min(1, (width - this.z) / width * 1.5);
        ctx.beginPath();
        ctx.moveTo(ppx, ppy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = Math.max(1, (1 - this.z / width) * 3);
        ctx.stroke();
      }
    }

    function initWarpStars() {
      warpStars = [];
      for (let i = 0; i < warpStarsCount; i++) {
        warpStars.push(new WarpStar());
      }
    }
    initWarpStars();

    function connectParticles() {
      const maxDistance = 110;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId;
    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      if (!isHyperdrive) {
        // Normal Cosmic Constellation Mode
        particles.forEach(p => {
          p.update();
          p.draw();
        });
        connectParticles();

        // Render shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const sw = shockwaves[i];
          sw.update();
          sw.draw();
          if (sw.radius >= sw.maxRadius) shockwaves.splice(i, 1);
        }

        // Render meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.update();
          m.draw();
          if (!m.active) meteors.splice(i, 1);
        }
      } else {
        // Hyperspace Warp Speed Mode
        warpStars.forEach(s => {
          s.update(28);
          s.draw();
        });
      }

      animationFrameId = requestAnimationFrame(renderCanvas);
    }
    renderCanvas();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        renderCanvas();
      }
    });
  }

  // =========================================================================
  // 6. Hyperdrive Toggle System & Procedural Audio Synth
  // =========================================================================
  const hyperdriveBtn = document.getElementById('hyperdriveBtn');
  const hyperdriveStatus = document.getElementById('hyperdriveStatus');

  function playHyperdriveSound(isEngaging) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = isEngaging ? 'sawtooth' : 'sine';
      const startFreq = isEngaging ? 85 : 680;
      const endFreq = isEngaging ? 720 : 110;

      osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + 0.65);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.72);
    } catch(e) {}
  }

  if (hyperdriveBtn) {
    hyperdriveBtn.addEventListener('click', () => {
      isHyperdrive = !isHyperdrive;

      if (isHyperdrive) {
        document.body.classList.add('hyperdrive-active');
        hyperdriveStatus.textContent = 'ON';
        playHyperdriveSound(true);
        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
      } else {
        document.body.classList.remove('hyperdrive-active');
        hyperdriveStatus.textContent = 'OFF';
        playHyperdriveSound(false);
      }
    });
  }

  // =========================================================================
  // 7. Holographic Foil Card Specular Sheen & 3D Tilt
  // =========================================================================
  const holoCard = document.querySelector('.holo-card');
  if (holoCard) {
    holoCard.addEventListener('mousemove', (e) => {
      const rect = holoCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      holoCard.style.setProperty('--mouse-x', `${percentX}%`);
      holoCard.style.setProperty('--mouse-y', `${percentY}%`);
    });
  }

  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.innerWidth > 992) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5.5;
        const rotateY = ((x - centerX) / centerX) * 5.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // =========================================================================
  // 8. Magnetic Elements Pull Effect
  // =========================================================================
  const magneticItems = document.querySelectorAll('.magnetic');
  if (window.innerWidth > 992) {
    magneticItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - itemCenterX) * 0.28;
        const deltaY = (e.clientY - itemCenterY) * 0.28;

        item.style.transform = `translate(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px)`;
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // =========================================================================
  // 9. Live Amritsar Clock Widget
  // =========================================================================
  const liveClockElement = document.getElementById('liveAmritsarTime');

  function updateAmritsarTime() {
    if (!liveClockElement) return;

    try {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const timeString = formatter.format(new Date());

      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      const hours = istDate.getHours();

      let mood = '⚡ Building';
      if (hours >= 22 || hours < 5) mood = '🌙 Night Owl';
      else if (hours >= 5 && hours < 12) mood = '☕ Morning Spark';
      else if (hours >= 12 && hours < 17) mood = '🚀 Flow State';
      else mood = '🌆 Evening Creative';

      liveClockElement.textContent = `Amritsar: ${timeString} (${mood})`;
    } catch (err) {
      liveClockElement.textContent = 'Amritsar, Punjab (IST)';
    }
  }

  updateAmritsarTime();
  setInterval(updateAmritsarTime, 1000);

  // =========================================================================
  // 10. Theme Accent Switcher Widget
  // =========================================================================
  const colorDots = document.querySelectorAll('.color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const selectedTheme = dot.getAttribute('data-theme');
      document.body.setAttribute('data-accent', selectedTheme);

      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      triggerConfetti(dot.getBoundingClientRect().left, dot.getBoundingClientRect().top, 25);
    });
  });

  // =========================================================================
  // 11. Lightweight Confetti Cannon Engine
  // =========================================================================
  const confettiCanvas = document.getElementById('confettiCanvas');
  let confettiCtx = null;
  let confettiPieces = [];

  if (confettiCanvas) {
    confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    });
  }

  class Confetti {
    constructor(originX, originY) {
      this.x = originX || window.innerWidth / 2;
      this.y = originY || window.innerHeight / 2;
      this.size = Math.random() * 8 + 4;
      this.color = ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#fbbf24', '#f43f5e'][Math.floor(Math.random() * 6)];
      this.vx = (Math.random() - 0.5) * 14;
      this.vy = Math.random() * -12 - 4;
      this.gravity = 0.35;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.008;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.rotation += this.rotationSpeed;
      this.alpha -= this.decay;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      ctx.restore();
    }
  }

  let confettiAnimating = false;
  function triggerConfetti(x, y, count = 65) {
    if (!confettiCtx) return;
    for (let i = 0; i < count; i++) {
      confettiPieces.push(new Confetti(x, y));
    }
    if (!confettiAnimating) {
      confettiAnimating = true;
      runConfettiLoop();
    }
  }

  function runConfettiLoop() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.update();
      p.draw(confettiCtx);
      if (p.alpha <= 0 || p.y > confettiCanvas.height) {
        confettiPieces.splice(i, 1);
      }
    }

    if (confettiPieces.length > 0) {
      requestAnimationFrame(runConfettiLoop);
    } else {
      confettiAnimating = false;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  const confettiBtn = document.getElementById('confettiBtn');
  const avatarEmblem = document.getElementById('avatarEmblem');

  if (confettiBtn) {
    confettiBtn.addEventListener('click', () => {
      const rect = confettiBtn.getBoundingClientRect();
      triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 75);
    });
  }

  if (avatarEmblem) {
    avatarEmblem.addEventListener('click', () => {
      const rect = avatarEmblem.getBoundingClientRect();
      triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
    });
  }

  // =========================================================================
  // 12. Project Details Modal Popup System
  // =========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');

  const projectData = {
    hub: {
      title: 'My Personal Hub',
      badge: 'Active Passion Project',
      desc: 'The very site you are viewing right now! Built from scratch with love, curiosity, and modern web craft.',
      features: [
        'Pure Vanilla Stack (Semantic HTML5, Modern CSS3, Modular JavaScript)',
        'Zero dependencies, zero bloat, instant 60fps performance',
        'Interactive particle constellation engine with ambient glow lighting',
        'Full theme accent customization and printer-ready PDF export'
      ],
      link: '#hero',
      linkText: 'Back to Top'
    },
    lab: {
      title: 'Smart Idea Lab',
      badge: 'Prototyping & R&D',
      desc: 'An ongoing experimental sandbox where concepts are born, tested, and iterated before becoming full-fledged creations.',
      features: [
        'AI prompt acceleration workflows and automations',
        'UI component testing and visual micro-interaction experiments',
        'Fast wireframing from concept scratchpads to working web prototypes',
        'Continuous tinkering with new developer and creator tools'
      ],
      link: '#contact',
      linkText: 'Talk Ideas With Me'
    },
    spark: {
      title: 'Next Big Spark',
      badge: 'Upcoming Creation',
      desc: 'The next evolution of my passion projects. Exploring creative media, interactive tools, and community-driven utilities.',
      features: [
        'Venturing into new digital horizons and experimental interfaces',
        'Combining aesthetic minimalism with functional problem solving',
        'Building in public to share learnings and milestones with others'
      ],
      link: '#contact',
      linkText: 'Collaborate On This'
    }
  };

  function openProjectModal(key) {
    const data = projectData[key];
    if (!data || !projectModal || !modalContent) return;

    modalContent.innerHTML = `
      <span class="modal-badge">${data.badge}</span>
      <h3>${data.title}</h3>
      <p>${data.desc}</p>
      <h4 style="font-size: 1rem; color: var(--accent-cyan); margin-bottom: 0.75rem;">Key Highlights:</h4>
      <ul class="modal-features">
        ${data.features.map(f => `<li><i class="fa-solid fa-check-circle"></i> <span>${f}</span></li>`).join('')}
      </ul>
      <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
        <a href="${data.link}" class="btn btn-primary btn-sm modal-action-btn">
          <i class="fa-solid fa-arrow-right"></i> ${data.linkText}
        </a>
      </div>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');

    const actionBtn = modalContent.querySelector('.modal-action-btn');
    if (actionBtn) {
      actionBtn.addEventListener('click', closeProjectModal);
    }
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.getAttribute('data-project');
      openProjectModal(key);
    });
  });

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      if (key) openProjectModal(key);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // =========================================================================
  // 13. Mobile Menu Toggle
  // =========================================================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
      const icon = navToggle.querySelector('i');
      if (navLinks.classList.contains('nav-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // =========================================================================
  // 14. Print / Save as PDF Button
  // =========================================================================
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // 15. Dynamic Year in Footer
  // =========================================================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 16. Active Link Highlight on Scroll
  // =========================================================================
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // =========================================================================
  // 17. Interactive Ambient Cyber Lo-Fi Audio Player (Web Audio Synth)
  // =========================================================================
  const lofiToggleBtn = document.getElementById('lofiToggleBtn');
  const lofiWidget = document.getElementById('lofiWidget');
  const lofiIcon = document.getElementById('lofiIcon');
  let lofiAudioCtx = null;
  let isLofiPlaying = false;
  let lofiOscs = [];
  let lofiGain = null;

  function startLofiSynth() {
    try {
      lofiAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      lofiGain = lofiAudioCtx.createGain();
      lofiGain.gain.setValueAtTime(0.06, lofiAudioCtx.currentTime);
      lofiGain.connect(lofiAudioCtx.destination);

      // Warm ambient pentatonic chord frequencies (F3, Ab3, C4, Eb4)
      const chord = [174.61, 207.65, 261.63, 311.13];

      lofiOscs = chord.map(freq => {
        const osc = lofiAudioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, lofiAudioCtx.currentTime);

        // Subtle slow frequency vibrato for warmth
        const lfo = lofiAudioCtx.createOscillator();
        const lfoGain = lofiAudioCtx.createGain();
        lfo.frequency.setValueAtTime(0.25, lofiAudioCtx.currentTime);
        lfoGain.gain.setValueAtTime(2.5, lofiAudioCtx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(lofiGain);
        osc.start();
        return osc;
      });

      isLofiPlaying = true;
      lofiWidget.classList.add('playing');
      lofiIcon.classList.remove('fa-play');
      lofiIcon.classList.add('fa-pause');
    } catch(e) {}
  }

  function stopLofiSynth() {
    if (lofiGain && lofiAudioCtx) {
      lofiGain.gain.exponentialRampToValueAtTime(0.0001, lofiAudioCtx.currentTime + 0.6);
      setTimeout(() => {
        lofiOscs.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
        lofiOscs = [];
        try { lofiAudioCtx.close(); } catch(e) {}
        lofiAudioCtx = null;
      }, 650);
    }
    isLofiPlaying = false;
    lofiWidget.classList.remove('playing');
    lofiIcon.classList.remove('fa-pause');
    lofiIcon.classList.add('fa-play');
  }

  if (lofiToggleBtn) {
    lofiToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isLofiPlaying) {
        startLofiSynth();
      } else {
        stopLofiSynth();
      }
    });
  }

  // =========================================================================
  // 18. Project Category Filter Tabs
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('filter-hidden');
        } else {
          card.classList.add('filter-hidden');
        }
      });
    });
  });

  // =========================================================================
  // 19. Interactive Random Project Spark Wheel
  // =========================================================================
  const sparkOutput = document.getElementById('sparkOutput');
  const rollSparkBtn = document.getElementById('rollSparkBtn');

  const sparksList = [
    '⚡ "A minimal dark-mode ambient soundscape generator with animated neon waveforms."',
    '🚀 "An AI-powered daily focus companion designed with high-contrast brutalist aesthetics."',
    '🌐 "A live interactive 3D map of Amritsar showcasing hidden cultural gems and late-night food spots."',
    '🎨 "An open-source generative art tool that converts music beats into abstract geometric posters."',
    '💡 "A micro-journaling web app with Markdown support and instant encrypted local backup."',
    '🔮 "A futuristic dashboard tracking celestial events, meteor showers, and space station flybys."'
  ];

  if (rollSparkBtn && sparkOutput) {
    rollSparkBtn.addEventListener('click', () => {
      rollSparkBtn.disabled = true;
      let counter = 0;
      const interval = setInterval(() => {
        sparkOutput.textContent = sparksList[Math.floor(Math.random() * sparksList.length)];
        counter++;
        if (counter > 6) {
          clearInterval(interval);
          rollSparkBtn.disabled = false;
          triggerConfetti(rollSparkBtn.getBoundingClientRect().left, rollSparkBtn.getBoundingClientRect().top, 30);
        }
      }, 70);
    });
  }

  // =========================================================================
  // 20. Real Working Contact Form (Connected to ayush23021@gmail.com)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Delivering to Ayush...';
      submitBtn.disabled = true;

      const nameVal = document.getElementById('name').value;
      const emailVal = document.getElementById('email').value;
      const messageVal = document.getElementById('message').value;

      try {
        const response = await fetch('https://formsubmit.co/ajax/ayush23021@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            message: messageVal,
            _subject: `New Message from ${nameVal} via your Passion Project Hub!`,
            _template: 'table'
          })
        });

        const data = await response.json();

        if (response.ok) {
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Delivered to Gmail!';
          submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

          const btnRect = submitBtn.getBoundingClientRect();
          triggerConfetti(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 85);

          if (formStatus) {
            formStatus.textContent = 'Awesome! Your message has been delivered straight to Ayush’s Gmail inbox.';
            formStatus.classList.add('success');
          }

          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 5000);
        } else {
          throw new Error('Delivery failed');
        }
      } catch (err) {
        // Fallback: If offline or initial activation required, offer direct mailto
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send via Email App';
        submitBtn.style.background = 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)';
        submitBtn.disabled = false;

        if (formStatus) {
          formStatus.innerHTML = `Note: Click above to send directly to <strong>ayush23021@gmail.com</strong>.`;
          formStatus.classList.add('success');
        }

        window.location.href = `mailto:ayush23021@gmail.com?subject=Message from ${encodeURIComponent(nameVal)}&body=${encodeURIComponent(messageVal)}`;
      }
    });
  }
});
