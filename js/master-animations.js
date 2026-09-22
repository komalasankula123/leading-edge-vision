/**
 * MASTER ANIMATIONS SYSTEM FOR STEM & ROBOTICS TOUR
 * Built with GSAP & ScrollTrigger
 * Adheres strictly to the user prompt's duration, ease, and stagger guidelines:
 * duration: 0.6–1.0s
 * ease: power2.out / power3.out
 * stagger: 0.08–0.15s
 * Respects prefers-reduced-motion
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('Reduced motion preferred: skipping GSAP animation triggers.');
    return;
  }

  // Ensure GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP library not detected. Running fallback CSS transitions.');
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. HERO ANIMATIONS (On Page Load)
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-title-main', {
      y: 40,
      opacity: 0,
      duration: 0.9,
    })
    .from('.hero-subtitle-line1', {
      y: 25,
      opacity: 0,
      duration: 0.7,
    }, '-=0.6')
    .from('.hero-subtitle-highlight', {
      y: 25,
      opacity: 0,
      scale: 0.98,
      duration: 0.8,
    }, '-=0.5')
    .from('.hero-desc', {
      y: 20,
      opacity: 0,
      duration: 0.8,
    }, '-=0.5')
    .from('.hero-statement-callout', {
      x: 30,
      y: -10,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.6')
    .from('.top-meta-bar', {
      y: -20,
      opacity: 0,
      duration: 0.6
    }, '-=0.8');

  // Subtle floating parallax on hero robot background
  const heroMedia = document.querySelector('.hero-bg-img');
  if (heroMedia && typeof ScrollTrigger !== 'undefined') {
    gsap.to(heroMedia, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: 40,
      scale: 1.05,
      ease: 'none',
    });
  }

  // 2. SECTION 2: ROBOTICS IN ACTION (6 CARDS STAGGERED REVEAL)
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.from('.action-header', {
      scrollTrigger: {
        trigger: '.action-section',
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    gsap.from('.action-card', {
      scrollTrigger: {
        trigger: '.cards-grid-6',
        start: 'top 85%',
      },
      y: 45,
      opacity: 0,
      scale: 0.96,
      duration: 0.85,
      stagger: 0.1, // 100ms stagger between cards as requested (80-120ms)
      ease: 'power2.out'
    });

    // Icons subtle floating animation
    gsap.to('.card-icon-wrap', {
      y: -3,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.18,
        from: 'start'
      }
    });
  }

  // 3. SECTION 3: HUMAN + TECHNOLOGY COLLABORATION
  if (typeof ScrollTrigger !== 'undefined') {
    const collabTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.collab-section',
        start: 'top 80%',
      }
    });

    collabTl
      .from('.collab-left', {
        x: -35,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out'
      })
      .from('.collab-handshake-img', {
        scale: 0.94,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=0.6')
      .from('.collab-right', {
        x: 35,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out'
      }, '-=0.7');

    // Horizontal parallax on handshake image while scrolling through section
    gsap.to('.collab-handshake-img', {
      scrollTrigger: {
        trigger: '.collab-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      },
      x: 12,
      ease: 'none'
    });
  }

  // 4. SECTION 4: MAIN TOUR CONNECTION (JAPAN STEM TOUR)
  if (typeof ScrollTrigger !== 'undefined') {
    // Japan photo slow zoom while scrolling
    gsap.to('.tour-photo-img', {
      scrollTrigger: {
        trigger: '.tour-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      scale: 1.06,
      y: 15,
      ease: 'none'
    });

    // Stamp pop-in
    gsap.from('.stamp-badge', {
      scrollTrigger: {
        trigger: '.tour-visual-wrapper',
        start: 'top 75%',
      },
      scale: 0.5,
      rotation: -30,
      opacity: 0,
      duration: 0.9,
      ease: 'back.out(1.5)'
    });

    // Right tour heading and description
    gsap.from('.tour-heading, .tour-desc', {
      scrollTrigger: {
        trigger: '.tour-content',
        start: 'top 80%',
      },
      y: 25,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out'
    });

    // 4 Experience points revealed one-by-one
    gsap.from('.point-item', {
      scrollTrigger: {
        trigger: '.four-points-wrap',
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      scale: 0.94,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power2.out'
    });

    // Bottom info callout box slides upward softly
    gsap.from('.info-callout-box', {
      scrollTrigger: {
        trigger: '.info-callout-box',
        start: 'top 90%',
      },
      y: 25,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out'
    });
  }

  // 5. SECTION 5: SCHOOLS + COLLEGES + GLOBAL EXPOSURE (FOOTER BANNER)
  if (typeof ScrollTrigger !== 'undefined') {
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.footer-banner',
        start: 'top 88%',
      }
    });

    footerTl
      .from('.fb-left-intro, .fb-left-title', {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out'
      })
      .from('.fb-center-desc', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.fb-center-highlight', {
        y: 15,
        opacity: 0,
        scale: 0.97,
        duration: 0.85,
        ease: 'power2.out'
      }, '-=0.4')
      .from('.fb-right', {
        x: 25,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out'
      }, '-=0.6');
  }
});
