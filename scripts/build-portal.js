const fs = require('fs');

const backup = fs.readFileSync('index.portal-backup.html', 'utf8');

// 1. Update Head: Google Fonts to include Caveat, add master-design.css, and GSAP/ScrollTrigger
let html = backup;

const oldFont = `<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">`;

const newHeadAssets = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet">

  <!-- Main Portal Stylesheet -->
  <link rel="stylesheet" href="css/style.css">

  <!-- Master Infographic Poster Stylesheet (Exact Match for Section 8) -->
  <link rel="stylesheet" href="css/master-design.css">

  <!-- GSAP & ScrollTrigger CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>`;

html = html.replace(oldFont + '\n\n  <!-- Stylesheet -->\n  <link rel="stylesheet" href="css/style.css">', newHeadAssets);

// 2. Define Section 8 complete master infographic
const section8Content = `  <!-- ==========================================================================
       SECTION 8: STEM & INNOVATION (WHERE EDUCATION MEETS THE FUTURE)
       Incorporating Reference Infographic: Robotics From Innovation to Real-World Learning
       ========================================================================== -->
  <section class="v2stem-future" id="stem-robotics" style="padding: 70px 0 90px 0; background: #06111D; position: relative;">
    <div class="v2stem-gridlines" aria-hidden="true"></div>

    <div class="site-container" style="position: relative; z-index: 2;">
      <div style="text-align: center; margin-bottom: 40px;">
        <p class="v2eyebrow v2eyebrow--dark v2eyebrow--center"><span class="v2badge v2badge--dark-bg">ROBOTICS &amp; INNOVATION</span> &bull; CURRICULUM INFOGRAPHIC</p>
        <h2 class="v2heading v2heading--dark v2heading--center">where education <span>meets the future</span></h2>
        <p class="v2subdesc v2subdesc--dark v2subdesc--center" style="max-width: 780px; margin-left: auto; margin-right: auto;">
          Educational STEM &amp; Robotics Tours for Schools and Colleges, with Japan as a key destination and opportunities to explore technology, innovation, culture and global experiences.
        </p>
      </div>

      <!-- MASTER 5-SECTION INFOGRAPHIC POSTER COMPONENT (Matching Reference Design 1:1) -->
      <div class="poster-container" style="border-radius: 24px; box-shadow: 0 25px 60px rgba(0,0,0,0.65); border: 1px solid rgba(255, 255, 255, 0.14); overflow: hidden;">

        <!-- PART 1: HERO (ROBOTICS — From Innovation to Real-World Learning) -->
        <div class="hero-section" id="infographic-hero">
          <div class="hero-backdrop-gradient" aria-hidden="true"></div>
          <div class="hero-bg-media" aria-hidden="true">
            <img src="assets/images/hero-robot-japan.jpg" alt="Humanoid Robot overlooking Mount Fuji and Tokyo" class="hero-bg-img" loading="lazy">
          </div>

          <!-- Handwritten Statement (Top Right) -->
          <div class="hero-statement-callout">
            <div class="hero-statement-text">Innovation
Builds a
Better Tomorrow</div>
            <svg class="hero-statement-swoosh" viewBox="0 0 140 18" fill="none" aria-hidden="true">
              <path d="M4 14C35 4 95 3 136 12" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round"/>
            </svg>
          </div>

          <!-- Left Hero Text Content -->
          <div class="hero-grid">
            <div class="hero-content">
              <div class="hero-title-main">ROBOTICS</div>
              <div class="hero-subtitle-line1">From Innovation to</div>
              <span class="hero-subtitle-highlight">Real-World Learning</span>

              <p class="hero-desc">
                Robotics, artificial intelligence and automation are transforming the world around us. Through <span class="hl-yellow">immersive educational tours</span>, students can move beyond textbooks and experience how technology is <span class="hl-text">shaping industries, communities and the future</span>.
              </p>
            </div>
          </div>
        </div>

        <!-- PART 2: ROBOTICS IN ACTION (6 Cards Layout) -->
        <div class="action-section" id="infographic-action">
          <div class="action-header">
            <h3 class="action-title">
              <span>Robotics in Action</span>
              <span class="action-title-sep">|</span>
              <span class="action-title-sub">Exploring Technology Across Industries</span>
            </h3>
            <p class="action-subtitle">
              Students can discover how robotics and emerging technologies are transforming the world around us.
            </p>
          </div>

          <div class="cards-grid-6">
            <!-- CARD 1: Autonomous Mobility -->
            <article class="action-card card--mobility">
              <div class="card-media">
                <img src="assets/images/card-mobility.jpg" alt="Autonomous self-driving vehicle with lidar sensors" loading="lazy">
              </div>
              <div class="card-icon-wrap" title="Autonomous Mobility">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17l-1 2h16l-1-2M7 11h2M15 11h2M8 7l1-3h6l1 3"/>
                </svg>
              </div>
              <div class="card-body">
                <h4 class="card-title">AUTONOMOUS MOBILITY</h4>
                <p class="card-text">Explore self-driving vehicles, smart transportation and the technologies shaping the future of mobility.</p>
              </div>
            </article>

            <!-- CARD 2: Medicine & Healthcare -->
            <article class="action-card card--healthcare">
              <div class="card-media">
                <img src="assets/images/card-healthcare.jpg" alt="Robotic surgery and precision medical systems" loading="lazy">
              </div>
              <div class="card-icon-wrap" title="Medicine & Healthcare">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              </div>
              <div class="card-body">
                <h4 class="card-title">MEDICINE &amp; HEALTHCARE</h4>
                <p class="card-text">Discover how robotic systems and advanced technologies are supporting doctors, hospitals and modern healthcare.</p>
              </div>
            </article>

            <!-- CARD 3: The Future of Surgery -->
            <article class="action-card card--surgery">
              <div class="card-media">
                <img src="assets/images/card-surgery.jpg" alt="Micro-surgical robotic arms for minimally invasive surgery" loading="lazy">
              </div>
              <div class="card-icon-wrap" title="The Future of Surgery">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 15-6-6M14 6l4 4L7 21H3v-4L14 6z"/>
                  <circle cx="18" cy="6" r="3"/>
                </svg>
              </div>
              <div class="card-body">
                <h4 class="card-title">THE FUTURE OF SURGERY</h4>
                <p class="card-text">See how precision robotics and intelligent systems are enabling new possibilities in minimally invasive surgery.</p>
              </div>
            </article>

            <!-- CARD 4: Smart Agriculture -->
            <article class="action-card card--agriculture">
              <div class="card-media">
                <img src="assets/images/card-agriculture.jpg" alt="Agricultural drone monitoring lush green farm crops" loading="lazy">
              </div>
              <div class="card-icon-wrap" title="Smart Agriculture">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22v-9M12 13a5 5 0 0 0 5-5c0-4-5-6-5-6s-5 2-5 6a5 5 0 0 0 5 5z"/>
                  <path d="M12 18a4 4 0 0 1 4-4"/>
                </svg>
              </div>
              <div class="card-body">
                <h4 class="card-title">SMART AGRICULTURE</h4>
                <p class="card-text">Explore how robotics, drones and automation are helping create smarter and more sustainable agriculture.</p>
              </div>
            </article>

            <!-- CARD 5: Logistics & Delivery -->
            <article class="action-card card--logistics">
              <div class="card-media">
                <img src="assets/images/card-logistics.jpg" alt="Autonomous aerial delivery drone carrying package" loading="lazy">
              </div>
              <div class="card-icon-wrap" title="Logistics & Delivery">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.29 7 12 12.01 20.71 7"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div class="card-body">
                <h4 class="card-title">LOGISTICS &amp; DELIVERY</h4>
                <p class="card-text">Discover how automation, robotics and intelligent systems are transforming warehouses, transportation and delivery.</p>
              </div>
            </article>

            <!-- CARD 6: Robotics & AI -->
            <article class="action-card card--ai">
              <div class="card-media">
                <img src="assets/images/card-ai-robotics.jpg" alt="Robotics and artificial intelligence industrial systems" loading="lazy">
              </div>
              <div class="card-icon-wrap" title="Robotics & AI">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="3"/>
                  <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
                  <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
                  <path d="M9 15h6M12 2v2M12 20v2M2 12h2M20 12h2"/>
                </svg>
              </div>
              <div class="card-body">
                <h4 class="card-title">ROBOTICS &amp; AI</h4>
                <p class="card-text">Explore how robotics and artificial intelligence are being used across industries and shaping the future of work.</p>
              </div>
            </article>
          </div>
        </div>

        <!-- PART 3: HUMAN + TECHNOLOGY (Dark-Blue Horizontal Section) -->
        <div class="collab-section" id="infographic-collab">
          <div class="collab-bg-cyber" aria-hidden="true"></div>
          <div class="collab-grid">
            <div class="collab-left">
              <p class="collab-eyebrow">The Future Trend is</p>
              <div class="collab-headline-yellow">Collaboration:</div>
              <div class="collab-headline-white">Humans + Technology<br>Working Together</div>
            </div>

            <div class="collab-center-media">
              <img src="assets/images/handshake-human-robot.jpg" alt="Human hand shaking robotic hand in cyber network" class="collab-handshake-img" loading="lazy">
            </div>

            <div class="collab-right">
              <p class="collab-right-intro">This is called</p>
              <h4 class="collab-right-title">“Human-Centered Innovation”</h4>
              <p class="collab-right-desc">
                Technology is not simply about replacing people. It can enhance human creativity, problem-solving and capabilities — creating new opportunities for the next generation.
              </p>
            </div>
          </div>
        </div>

        <!-- PART 4: MAIN TOUR CONNECTION (STEM Tour to Japan) -->
        <div class="tour-section" id="infographic-tour">
          <div class="tour-grid">
            <div class="tour-visual-wrapper">
              <div class="tour-photo-box">
                <img src="assets/images/stem-students.jpg" alt="School students admiring Mount Fuji, cherry blossoms and pagoda" class="tour-photo-img" loading="lazy">
              </div>
              <div class="stamp-badge" title="Official STEM Tour to Japan">
                <span class="stamp-badge-stem">STEM</span>
                <span class="stamp-badge-tour">Tour to</span>
                <span class="stamp-badge-japan">Japan</span>
              </div>
              <div class="flag-sticker" title="Japan">
                <div class="flag-sun"></div>
              </div>
            </div>

            <div class="tour-content">
              <h3 class="tour-heading">
                An Extraordinary Educational<br>and Cultural Experience
              </h3>
              <p class="tour-desc">
                Our educational STEM tours connect students with Japan's world of robotics, technology, innovation and culture — creating meaningful experiences beyond the classroom.
              </p>

              <div class="four-points-wrap">
                <!-- Point 1: See Robotics in Action -->
                <div class="point-item">
                  <div class="point-icon-circle bg-[#0284C7]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <div class="point-lead">See</div>
                  <div class="point-label">Robotics in Action</div>
                </div>

                <!-- Point 2: Experience Cutting-Edge Innovation -->
                <div class="point-item">
                  <div class="point-icon-circle bg-[#9333EA]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3 5.5v2.5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V13.5c1.5-1 3-3 3-5.5a6 6 0 0 0-6-6zM10 21h4"/>
                    </svg>
                  </div>
                  <div class="point-lead">Experience</div>
                  <div class="point-label">Cutting-Edge Innovation</div>
                </div>

                <!-- Point 3: Explore Japanese Culture & Heritage -->
                <div class="point-item">
                  <div class="point-icon-circle bg-[#16A34A]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 21h16M6 17h12M8 13h8M10 9h4M12 3v4M2 17l2-4h16l2 4M3 13l3-4h12l3 4M5 9l3-4h8l3 4"/>
                    </svg>
                  </div>
                  <div class="point-lead">Explore</div>
                  <div class="point-label">Japanese Culture &amp; Heritage</div>
                </div>

                <!-- Point 4: Discover Real-World Technology -->
                <div class="point-item">
                  <div class="point-icon-circle bg-[#EA580C]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                  </div>
                  <div class="point-lead">Discover</div>
                  <div class="point-label">Real-World Technology</div>
                </div>
              </div>

              <!-- Bottom Information Box -->
              <div class="info-callout-box">
                <div class="info-icon-badge" title="Student Mentorship">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
                  </svg>
                </div>
                <p class="info-callout-text">
                  Early exposure to technology helps students understand how the world is changing. By experiencing innovation firsthand, they can develop curiosity, creativity, collaboration and problem-solving skills for their future.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- PART 5: SCHOOLS + COLLEGES + GLOBAL EXPOSURE (Footer Banner) -->
        <div class="footer-banner" id="infographic-footer">
          <div class="footer-banner-grid">
            <div class="fb-left">
              <p class="fb-left-intro">The Future Belongs to</p>
              <h3 class="fb-left-title">Curious Minds</h3>
            </div>

            <div class="fb-center">
              <p class="fb-center-desc">
                Tomorrow's essential skills go beyond knowing how to use technology. Students need opportunities to explore, question, create and collaborate with it.
              </p>
              <div class="fb-center-highlight">
                And that future starts with what we expose our students to today.
              </div>
            </div>

            <div class="fb-right">
              <svg class="fb-right-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="14" cy="16" r="6"/>
                <path d="M6 34v-4a6 6 0 0 1 6-6h4"/>
                <rect x="28" y="10" width="12" height="12" rx="3"/>
                <circle cx="32" cy="15" r="1.5" fill="currentColor"/>
                <circle cx="36" cy="15" r="1.5" fill="currentColor"/>
                <path d="M30 34v-4a5 5 0 0 1 5-5h3"/>
                <path d="M16 28h12M22 25l6 6"/>
              </svg>
              <div>
                <div class="fb-right-title">
                  STEM + Global Exposure<br>= A Brighter Future
                </div>
                <div class="fb-right-sub">
                  Schools &bull; Colleges &bull; Educational Tours
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>`;

// Replace Section 8
const markerStart = '  <!-- ==========================================================================\n       SECTION 8: STEM & INNOVATION';
const markerEnd = '  <!-- ==========================================================================\n       SECTION 9: SCHOOL CULTURAL EXCHANGE';

const idxStart = html.indexOf(markerStart);
const idxEnd = html.indexOf(markerEnd);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Error: markers not found in backup!');
  process.exit(1);
}

let result = html.slice(0, idxStart) + section8Content + '\n\n\n' + html.slice(idxEnd);

// Add master-animations.js
result = result.replace('<script src="js/app.js"></script>', '<script src="js/app.js"></script>\n  <script src="js/master-animations.js"></script>');

fs.writeFileSync('index.html', result, 'utf8');
console.log('SUCCESS: index.html written. Size:', fs.statSync('index.html').size);
