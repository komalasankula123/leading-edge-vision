/**
 * Leading Edge Vision — Japan STEM & Robotics School Group Tour
 * Frontend Interactivity Controller
 * 100% Static & Client-Side Execution
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. SMART SCROLL-AWARE NAVBAR
  // =========================================================================
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.v2nav__links a, .v2menu__list a');
  const sections = document.querySelectorAll('section[id], footer[id]');
  
  let ticking = false;

  function updateNav() {
    const currentScrollY = window.scrollY;

    if (nav) {
      if (currentScrollY > 20) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Active section tracking for navbar links
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('is-active');
          } else if (href && href.startsWith('#')) {
            link.classList.remove('is-active');
          }
        });
      }
    });
  }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));


  // =========================================================================
  // 2. LIVE STATISTICS NUMBER COUNTERS (500+, 30+, 8)
  // =========================================================================
  const counterElements = document.querySelectorAll('.stat-counter');
  
  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const hasPlus = el.textContent.includes('+');
          
          if (!isNaN(target)) {
            let start = 0;
            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easeOut * target);
              el.textContent = currentVal + (hasPlus ? '+' : '');

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                el.textContent = target + (hasPlus ? '+' : '');
              }
            }

            requestAnimationFrame(updateCounter);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }


  // =========================================================================
  // 3. 8-DAY TIMELINE INTERACTION & PROCESS ROADMAP
  // =========================================================================
  const dayPills = document.querySelectorAll('.v2process-pill, .v2day-pill');
  const dayCards = document.querySelectorAll('.v2process-step, .v2neon-card');
  const neonNodes = document.querySelectorAll('.v2neon-node');

  function setActiveDay(dayId) {
    // Update pills
    dayPills.forEach(pill => {
      pill.classList.toggle('is-active', pill.getAttribute('data-day') === dayId);
    });

    // Update cards
    dayCards.forEach(card => {
      const isTarget = card.getAttribute('id') === dayId;
      card.classList.toggle('is-active', isTarget);
    });

    // Update bottom nodes if present
    neonNodes.forEach(node => {
      node.classList.toggle('is-active', node.getAttribute('data-node') === dayId);
    });
  }

  dayPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-day');
      setActiveDay(targetId);

      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        const offset = 140;
        const targetPos = targetCard.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  dayCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('id');
      setActiveDay(targetId);
    });
  });

  // Track active day timeline item on scroll
  if ('IntersectionObserver' in window && dayCards.length > 0) {
    const dayCardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          setActiveDay(activeId);
        }
      });
    }, { rootMargin: '-20% 0px -50% 0px', threshold: 0.2 });

    dayCards.forEach(card => dayCardObserver.observe(card));
  }


  // =========================================================================
  // 4. MOBILE DRAWER MENU
  // =========================================================================
  const burgerToggle = document.getElementById('burgerToggle');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const v2menu = document.getElementById('v2menu');

  function openMenu() {
    if (v2menu) {
      v2menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (v2menu) {
      v2menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (burgerToggle) {
    burgerToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openMenu();
    });
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  if (v2menu) {
    v2menu.addEventListener('click', (e) => {
      if (e.target === v2menu) closeMenu();
    });

    v2menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && v2menu && v2menu.classList.contains('is-open')) {
      closeMenu();
    }
  });


  // =========================================================================
  // 5. TOAST NOTIFICATION HELPER & INQUIRY FORM SUBMISSION
  // =========================================================================
  function showToast(message) {
    let toast = document.querySelector('.v2toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'v2toast';
      toast.setAttribute('role', 'alert');
      toast.innerHTML = `
        <div class="v2toast__inner">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span class="v2toast__text"></span>
        </div>
      `;
      document.body.appendChild(toast);
    }

    const textEl = toast.querySelector('.v2toast__text');
    if (textEl) textEl.textContent = message;

    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 6000);
  }

  const contactForm = document.getElementById('fitzroyContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const firstName = formData.get('first_name') || 'Educator';
      const school = formData.get('school_name') || 'your institution';

      showToast(`Thank you, ${firstName}! Your school inquiry for ${school} has been received. Our Japan STEM Tour Coordinator will contact you within 24 hours.`);
      contactForm.reset();
    });
  }


  // =========================================================================
  // 6. SMOOTH ANCHOR LINK SCROLLING WITH OFFSET
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 84;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================================================================
  // 7. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtns = document.querySelectorAll('.v2foot-back-top, #backToTopBtn');
  backToTopBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });


  // =========================================================================
  // 8. 3D MAGNETIC PERSPECTIVE TILT ON 6 ACTION CARDS
  // =========================================================================
  const actionCards = document.querySelectorAll('.action-card');

  actionCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
    });
  });


  // =========================================================================
  // 9. SCROLL REVEAL STAGGER OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll('.action-card, .point-item, .info-callout-box, .collab-left, .collab-middle, .tour-visual-wrapper, .tour-content, .fb-left, .fb-center, .fb-right');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, index * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  }


  // =========================================================================
  // 10. AMBIENT CYBER PARTICLE CANVAS (HERO TECH NODES)
  // =========================================================================
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const canvas = document.createElement('canvas');
    canvas.className = 'hero-cyber-canvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none;opacity:0.6;';
    heroSection.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = heroSection.offsetWidth;
    let height = canvas.height = heroSection.offsetHeight;

    window.addEventListener('resize', () => {
      if (heroSection) {
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
      }
    });

    const particles = [];
    const particleCount = 24;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width * 0.42), // Focus on dark left tech zone
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.5 + 0.25
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting circuit lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 85) * 0.2})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw node dots
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width * 0.42) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00f0ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }


  // =========================================================================
  // 11. READING SCROLL PROGRESS BAR (TOP OF PAGE)
  // =========================================================================
  const progressBar = document.createElement('div');
  progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#0284c7,#38bdf8,#ffd700);z-index:9999;width:0%;transition:width 0.1s ease;box-shadow:0 0 10px rgba(56,189,248,0.8);';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
});

// =========================================================================
// 12. KEY INNOVATIONS / SECTORS INTERACTIVE FILTER FUNCTION
// =========================================================================
function filterSectors(category, btnElement) {
  // Update button active state
  const filterBtns = document.querySelectorAll('.action-filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const cards = document.querySelectorAll('#sectors-grid .action-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 250);
    }
  });
}
