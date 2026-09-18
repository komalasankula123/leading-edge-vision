/**
 * Leading Edge Vision - Japan STEM Tour Interactive Application
 */

const ITINERARY_DATA = {
  1: {
    day: 'Day 1',
    theme: 'Arrival in Tokyo',
    badge: 'ARRIVAL & CULTURAL ROOTS',
    image: 'assets/images/japan-hero.jpg',
    activities: [
      {
        name: 'Sensoji Temple — Asakusa',
        desc: "Tokyo's oldest and most iconic Buddhist temple. Explore Nakamise-dori, the traditional shopping street, and discover the cultural heart of old Tokyo."
      },
      {
        name: 'Akihabara — Electronics City',
        desc: 'The world-famous electronics district. Witness the latest tech gadgets, gaming culture and the bleeding edge of Japanese consumer innovation.'
      }
    ]
  },
  2: {
    day: 'Day 2',
    theme: 'Space & Science Exploration',
    badge: 'AEROSPACE & RESEARCH',
    image: 'assets/images/jaxa-space.jpg',
    activities: [
      {
        name: 'JAXA — Japan Aerospace Exploration Agency',
        desc: "Tour Japan's premier space agency. See actual rockets, satellites, and learn about Japan's ambitious space exploration programs firsthand."
      },
      {
        name: 'Tsukuba Science City',
        desc: 'Visit one of the world\'s foremost research clusters, home to 300+ research institutes, universities, and innovators shaping the future of science.'
      }
    ]
  },
  3: {
    day: 'Day 3',
    theme: 'Innovation & City Views',
    badge: 'AI & TOKYO PANORAMA',
    image: 'assets/images/miraikan-robotics.jpg',
    activities: [
      {
        name: 'Miraikan — National Museum of Emerging Science',
        desc: "Japan's premier science museum featuring interactive AI, robotics, space exploration exhibits and the iconic Geo-Cosmos digital globe."
      },
      {
        name: 'Tokyo Tower Observatory',
        desc: "Panoramic views of the Tokyo skyline from the iconic 333m tower. A symbol of Japan's post-war technological renaissance and national pride."
      }
    ]
  },
  4: {
    day: 'Day 4',
    theme: 'Robotics & Future Innovation',
    badge: 'HUMANOIDS & SMART CITIES',
    image: 'assets/images/stem-students.jpg',
    activities: [
      {
        name: 'Kawasaki Robot Museum',
        desc: "Hands-on encounters with industrial and humanoid robots. See Kawasaki's duAro collaborative robot and discover how automation is reshaping manufacturing."
      },
      {
        name: 'Haneda Innovation City',
        desc: "A cutting-edge smart city complex at Haneda Airport. Experience Japan's future through tech startups, research labs and immersive innovation showcases."
      }
    ]
  },
  5: {
    day: 'Day 5',
    theme: 'Mount Fuji & Scenic Hakone',
    badge: 'BULLET TRAIN DAY 🚄',
    image: 'assets/images/japan-hero.jpg',
    activities: [
      {
        name: 'Mount Fuji — 富士山 (3,776m)',
        desc: "Marvel at Japan's sacred and iconic peak framed by cherry blossoms. Explore the Fuji Five Lakes region and experience Japan's most beloved natural wonder."
      },
      {
        name: 'Lake Ashi — Pirate Cruise, Hakone',
        desc: 'Sail Lake Ashi aboard a replica galleon with spectacular views of Mt. Fuji on clear days. A unique and unforgettable experience in the Hakone region.'
      },
      {
        name: 'Shinkansen High-Speed Bullet Train',
        desc: 'Experience the marvel of 300 km/h Japanese high-speed rail engineering connecting regions seamlessly.'
      }
    ]
  },
  6: {
    day: 'Day 6',
    theme: 'School Exchange & Robot Restaurant',
    badge: 'CROSS-CULTURAL PEER DIALOGUE',
    image: 'assets/images/stem-students.jpg',
    activities: [
      {
        name: 'Tokyo School Cultural Exchange',
        desc: 'Interact with Japanese students in a meaningful cross-cultural exchange. Share ideas, compare education systems and build global friendships that last a lifetime.'
      },
      {
        name: 'Robot Restaurant Experience',
        desc: 'Dine surrounded by cutting-edge robotic technology in an unforgettable futuristic experience. A spectacular fusion of entertainment and innovation unique to Japan.'
      }
    ]
  },
  7: {
    day: 'Day 7',
    theme: 'Tokyo Disneyland — Magic & Imagination',
    badge: 'CELEBRATION & CREATIVITY',
    image: 'assets/images/tokyo-disneyland.jpg',
    activities: [
      {
        name: 'Full Day at Tokyo Disneyland',
        desc: "A full day at one of the world's most celebrated theme parks — the perfect reward after a week of scientific discovery and cultural exploration."
      },
      {
        name: 'Evening Fireworks Spectacular',
        desc: 'Witness the iconic nighttime illumination and musical fireworks celebration over Cinderella Castle.'
      }
    ]
  },
  8: {
    day: 'Day 8',
    theme: 'Departure Back to India',
    badge: 'MISSION ACCOMPLISHED',
    image: 'assets/images/japan-hero.jpg',
    activities: [
      {
        name: 'Tokyo Haneda / Narita Departure',
        desc: 'Final flight departure back to India with lifelong friendships, global perspective, and certificates of completion.'
      },
      {
        name: 'Core Educational Outcomes',
        desc: 'Lifelong memories, exposure to world-class space & robotics organizations, and IIT exam inspiration from Padma Shri Anand Kumar.'
      }
    ]
  }
};

// Toast notification helper
function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar & Active Tracking
  const header = document.querySelector('.portal-navbar') || document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.portal-nav-link, .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinksContainer.style.display === 'flex';
      navLinksContainer.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '80px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.background = '#0a0d14';
        navLinksContainer.style.padding = '24px';
        navLinksContainer.style.borderBottom = '1px solid var(--brand-yellow-border)';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinksContainer.style.display = 'none';
        }
      });
    });
  }

  // 2. Itinerary Day Switching
  const pills = document.querySelectorAll('.itinerary-pill');
  const dayTag = document.getElementById('itinerary-day-tag');
  const dayTheme = document.getElementById('itinerary-theme-title');
  const activitiesContainer = document.getElementById('itinerary-activities');
  const mediaImg = document.getElementById('itinerary-media-img');
  const mediaBadge = document.getElementById('itinerary-media-badge');

  function renderDay(dayNum) {
    const data = ITINERARY_DATA[dayNum];
    if (!data) return;

    pills.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-day') === String(dayNum));
    });

    if (dayTag) dayTag.textContent = `${data.day} — ${data.badge}`;
    if (dayTheme) dayTheme.textContent = data.theme;
    if (mediaImg) mediaImg.src = data.image;
    if (mediaBadge) mediaBadge.textContent = data.badge;

    if (activitiesContainer) {
      activitiesContainer.innerHTML = '';
      data.activities.forEach(act => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
          <div class="activity-name">${act.name}</div>
          <div class="activity-desc">${act.desc}</div>
        `;
        activitiesContainer.appendChild(item);
      });
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const day = parseInt(pill.getAttribute('data-day'), 10);
      renderDay(day);
    });
  });

  // 3. School Delegation Cost Estimator
  const sliderStudents = document.getElementById('calc-students');
  const valStudents = document.getElementById('val-students');
  const outChaperones = document.getElementById('out-chaperones');
  const outEstTotal = document.getElementById('out-est-total');

  function updateEstimator() {
    if (!sliderStudents) return;
    const count = parseInt(sliderStudents.value, 10);
    valStudents.textContent = `${count} Students`;

    // 1 Free Faculty Chaperone per 10 students
    const chaperones = Math.floor(count / 10);
    outChaperones.textContent = `${chaperones} Faculty Free`;

    // All-Inclusive standard school rate ~ ₹1,85,000 / student (Airfare, Visa, 4-Star Hotel, Food, Shinkansen, Disney, JAXA)
    const baseRatePerStudent = 185000;
    const totalINR = count * baseRatePerStudent;
    outEstTotal.textContent = `₹${(totalINR / 100000).toFixed(1)} Lakhs`;
  }

  if (sliderStudents) {
    sliderStudents.addEventListener('input', updateEstimator);
    updateEstimator();
  }

  // 4. Modal Open/Close & Forms
  const modal = document.getElementById('register-modal');
  const openModalBtns = document.querySelectorAll('.btn-open-register');
  const closeModalBtn = document.querySelector('.modal-close-button');
  const modalForm = document.getElementById('modal-register-form');
  const onPageForm = document.getElementById('onpage-inquiry-form');

  function openModal() {
    if (modal) modal.classList.add('active');
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', e => {
      e.preventDefault();
      closeModal();
      showToast('🎉 School Delegation Inquiry Received! Our Japan STEM Coordinator will contact you in 2 hours.');
      modalForm.reset();
    });
  }

  // 5. FAQ Accordion Toggles
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 6. Hero Video Highlights Modal Handler

  // 7. Video Highlights Modal Handler
  const openVideoBtn = document.getElementById('openVideoBtn');
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('closeVideoBtn');

  if (openVideoBtn && videoModal) {
    openVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      videoModal.classList.add('active');
    });
  }

  if (closeVideoBtn && videoModal) {
    closeVideoBtn.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
      }
    });
  }

  // 8. Mobile Menu Toggle for Portal Navbar
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const portalNavLinks = document.querySelector('.portal-nav-links');

  if (mobileMenuToggle && portalNavLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      const isShowing = portalNavLinks.style.display === 'flex';
      portalNavLinks.style.display = isShowing ? 'none' : 'flex';
      if (!isShowing) {
        portalNavLinks.style.flexDirection = 'column';
        portalNavLinks.style.position = 'absolute';
        portalNavLinks.style.top = '80px';
        portalNavLinks.style.left = '20px';
        portalNavLinks.style.right = '20px';
        portalNavLinks.style.background = 'rgba(12, 17, 26, 0.96)';
        portalNavLinks.style.backdropFilter = 'blur(20px)';
        portalNavLinks.style.padding = '24px';
        portalNavLinks.style.borderRadius = '16px';
        portalNavLinks.style.border = '1px solid rgba(255, 255, 255, 0.15)';
        portalNavLinks.style.zIndex = '100';
      }
    });

    portalNavLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          portalNavLinks.style.display = 'none';
        }
      });
    });
  }

  // 9. Destination Experience Gallery Carousel (2 Rows x 4 Columns per Slide)
  const galleryTrack = document.getElementById('gallery-track');
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  const galleryCounter = document.getElementById('gallery-counter');
  const galleryDotsContainer = document.getElementById('gallery-dots');
  const galleryViewport = document.getElementById('gallery-viewport');

  if (galleryTrack) {
    const pages = galleryTrack.querySelectorAll('.gallery-carousel-page');
    const totalPages = pages.length || 2;
    let currentPage = 0;
    let autoplayTimer = null;

    function createDots() {
      if (!galleryDotsContainer) return;
      galleryDotsContainer.innerHTML = '';
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = `gallery-dot ${i === currentPage ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Destination Page ${i + 1}`);
        dot.addEventListener('click', () => {
          goToPage(i);
        });
        galleryDotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      if (currentPage >= totalPages) currentPage = totalPages - 1;
      if (currentPage < 0) currentPage = 0;

      // Slide track horizontally by 100% per page
      galleryTrack.style.transform = `translateX(-${currentPage * 100}%)`;

      // Update counter text
      if (galleryCounter) {
        if (currentPage === 0) {
          galleryCounter.textContent = 'Showing 1–8 of 16 (Page 1 of 2)';
        } else {
          galleryCounter.textContent = 'Showing 9–16 of 16 (Page 2 of 2)';
        }
      }

      // Update dot active state
      if (galleryDotsContainer) {
        const dots = galleryDotsContainer.querySelectorAll('.gallery-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentPage);
        });
      }
    }

    function goToPage(pageIndex) {
      currentPage = (pageIndex + totalPages) % totalPages;
      updateCarousel();
    }

    if (galleryPrev) {
      galleryPrev.addEventListener('click', () => {
        goToPage(currentPage - 1);
      });
    }

    if (galleryNext) {
      galleryNext.addEventListener('click', () => {
        goToPage(currentPage + 1);
      });
    }

    // Touch and swipe gesture handling
    let touchStartX = 0;
    let touchEndX = 0;

    if (galleryViewport) {
      galleryViewport.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
      }, { passive: true });

      galleryViewport.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            goToPage(currentPage + 1);
          } else {
            goToPage(currentPage - 1);
          }
        }
        startAutoplay();
      }, { passive: true });

      galleryViewport.addEventListener('mouseenter', stopAutoplay);
      galleryViewport.addEventListener('mouseleave', startAutoplay);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        goToPage(currentPage + 1);
      }, 5500);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    createDots();
    updateCarousel();
    startAutoplay();
  }

  // 10. Scroll-Triggered Reveal Animations & Live Number Counters
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // Animated Stats Counter (500+, 30+, 100%)
  const statNumbers = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetStr = el.textContent.trim();
          const targetNum = parseInt(targetStr, 10);
          const suffix = targetStr.replace(/^[0-9]+/, '');
          if (!isNaN(targetNum)) {
            let startTime = performance.now();
            const duration = 1600;
            function step(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              el.textContent = Math.floor(easeOutQuart * targetNum) + suffix;
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                el.textContent = targetStr;
              }
            }
            requestAnimationFrame(step);
          }
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));
  }

  // 11. Testimonials Carousel Navigation & Autoplay
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialPrev = document.getElementById('testimonialPrevBtn');
  const testimonialNext = document.getElementById('testimonialNextBtn');
  const testimonialDotsContainer = document.getElementById('testimonialDots');
  const testimonialViewport = document.getElementById('testimonialViewport');

  if (testimonialTrack) {
    const tPages = testimonialTrack.querySelectorAll('.testimonial-carousel-page');
    const totalTPages = tPages.length || 2;
    let currentTPage = 0;
    let tAutoplayTimer = null;

    function updateTestimonials() {
      if (currentTPage >= totalTPages) currentTPage = totalTPages - 1;
      if (currentTPage < 0) currentTPage = 0;

      testimonialTrack.style.transform = `translateX(-${currentTPage * 100}%)`;

      if (testimonialDotsContainer) {
        const dots = testimonialDotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentTPage);
        });
      }
    }

    function goToTPage(pageIdx) {
      currentTPage = (pageIdx + totalTPages) % totalTPages;
      updateTestimonials();
    }

    if (testimonialPrev) {
      testimonialPrev.addEventListener('click', () => {
        goToTPage(currentTPage - 1);
        resetTAutoplay();
      });
    }

    if (testimonialNext) {
      testimonialNext.addEventListener('click', () => {
        goToTPage(currentTPage + 1);
        resetTAutoplay();
      });
    }

    if (testimonialDotsContainer) {
      const dots = testimonialDotsContainer.querySelectorAll('.testimonial-dot');
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          goToTPage(idx);
          resetTAutoplay();
        });
      });
    }

    // Touch Swipe Support
    if (testimonialViewport) {
      let touchStartX = 0;
      let touchEndX = 0;

      testimonialViewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopTAutoplay();
      }, { passive: true });

      testimonialViewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
          if (diff > 0) {
            goToTPage(currentTPage + 1);
          } else {
            goToTPage(currentTPage - 1);
          }
        }
        startTAutoplay();
      }, { passive: true });

      testimonialViewport.addEventListener('mouseenter', stopTAutoplay);
      testimonialViewport.addEventListener('mouseleave', startTAutoplay);
    }

    function startTAutoplay() {
      stopTAutoplay();
      tAutoplayTimer = setInterval(() => {
        goToTPage(currentTPage + 1);
      }, 6000);
    }

    function stopTAutoplay() {
      if (tAutoplayTimer) clearInterval(tAutoplayTimer);
    }

    function resetTAutoplay() {
      stopTAutoplay();
      startTAutoplay();
    }

    updateTestimonials();
    startTAutoplay();
  }
});


