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
});
