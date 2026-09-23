const fs = require('fs');

const backup = fs.readFileSync('index.portal-backup.html', 'utf8');

// 1. Update font link to include Caveat, keep style.css only (no master-design.css), and add GSAP
let html = backup;

const oldFont = `<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">`;

const newHead = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet">

  <!-- Unified Stylesheet -->
  <link rel="stylesheet" href="css/style.css">

  <!-- GSAP & ScrollTrigger CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>`;

html = html.replace(oldFont + '\n\n  <!-- Stylesheet -->\n  <link rel="stylesheet" href="css/style.css">', newHead);

// 2. Define Section 8 with all 5 infographic parts using the portal's native styling
const section8Content = `  <!-- ==========================================================================
       SECTION 8: STEM & ROBOTICS (WHERE EDUCATION MEETS THE FUTURE)
       Incorporating Complete Reference Infographic: Robotics From Innovation to Real-World Learning
       ========================================================================== -->
  <section class="v2stem-future" id="stem-robotics">
    <div class="v2stem-gridlines" aria-hidden="true"></div>

    <div class="site-container" style="position: relative; z-index: 2;">
      
      <!-- Section Header -->
      <div style="text-align: center; margin-bottom: 48px;">
        <p class="v2eyebrow v2eyebrow--dark v2eyebrow--center"><span class="v2badge v2badge--dark-bg">ROBOTICS &amp; INNOVATION</span> &bull; CURRICULUM INFOGRAPHIC</p>
        <h2 class="v2heading v2heading--dark v2heading--center">where education <span>meets the future</span></h2>
        <p class="v2subdesc v2subdesc--dark v2subdesc--center">
          Educational STEM &amp; Robotics Tours for Schools and Colleges, with Japan as a key destination and opportunities to explore technology, innovation, culture and global experiences.
        </p>
      </div>

      <!-- PART 1: ROBOTICS HERO SHOWCASE BANNER -->
      <div class="v2robotics-hero">
        <div class="v2robotics-hero-copy">
          <div class="v2robotics-hero-title">ROBOTICS</div>
          <div class="v2robotics-hero-sub1">From Innovation to</div>
          <span class="v2robotics-hero-sub2">Real-World Learning</span>
          <p class="v2robotics-hero-desc">
            Robotics, artificial intelligence and automation are transforming the world around us. Through <strong style="color: var(--brand-primary);">immersive educational tours</strong>, students can move beyond textbooks and experience how technology is shaping industries, communities and the future.
          </p>
        </div>
        <div class="v2robotics-hero-media">
          <img src="assets/images/hero-robot-japan.jpg" alt="Futuristic Humanoid Robot overlooking Mount Fuji and Tokyo" loading="lazy">
          <div class="v2robotics-hero-callout">
            <div class="v2robotics-hero-callout-text">Innovation
Builds a
Better Tomorrow</div>
            <svg class="v2robotics-hero-swoosh" viewBox="0 0 140 18" fill="none" aria-hidden="true">
              <path d="M4 14C35 4 95 3 136 12" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- PART 2: ROBOTICS IN ACTION (6 Transforming Key Sectors with Photos & Badges) -->
      <div style="text-align: center; margin: 40px 0 30px 0;">
        <h3 style="font-family: var(--font-display); font-size: 32px; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px;">
          Robotics in Action <span style="color: #64748B; font-weight: 300;">|</span> <span style="color: #0284C7;">Exploring Technology Across Industries</span>
        </h3>
        <p style="color: rgba(255, 255, 255, 0.75); font-size: 15px; margin-top: 6px;">
          Students can discover how robotics and emerging technologies are transforming the world around us.
        </p>
      </div>

      <div class="v2sectors-grid">

        <!-- Card 1: Autonomous Mobility -->
        <article class="v2sector-card-enhanced" style="--badge-accent: #0284C7;">
          <div class="card-img-wrap">
            <img src="assets/images/card-mobility.jpg" alt="Autonomous self-driving vehicle with lidar sensors" loading="lazy">
            <div class="card-badge-icon" title="Autonomous Mobility">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17l-1 2h16l-1-2M7 11h2M15 11h2M8 7l1-3h6l1 3"/>
              </svg>
            </div>
          </div>
          <div class="card-content">
            <div class="card-badge-num">01 &bull; MOBILITY</div>
            <h4 class="card-title-text" style="color: #38BDF8;">Autonomous Mobility</h4>
            <p class="card-desc-text">
              Explore self-driving vehicles, smart transportation and the technologies shaping the future of mobility.
            </p>
          </div>
        </article>

        <!-- Card 2: Medicine & Healthcare -->
        <article class="v2sector-card-enhanced" style="--badge-accent: #16A34A;">
          <div class="card-img-wrap">
            <img src="assets/images/card-healthcare.jpg" alt="Robotic-assisted healthcare systems" loading="lazy">
            <div class="card-badge-icon" title="Medicine & Healthcare">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
          </div>
          <div class="card-content">
            <div class="card-badge-num">02 &bull; HEALTHCARE</div>
            <h4 class="card-title-text" style="color: #4ADE80;">Medicine &amp; Healthcare</h4>
            <p class="card-desc-text">
              Discover how robotic systems and advanced technologies are supporting doctors, hospitals and modern healthcare.
            </p>
          </div>
        </article>

        <!-- Card 3: The Future of Surgery -->
        <article class="v2sector-card-enhanced" style="--badge-accent: #8B5CF6;">
          <div class="card-img-wrap">
            <img src="assets/images/card-surgery.jpg" alt="Robotic surgical precision arms" loading="lazy">
            <div class="card-badge-icon" title="The Future of Surgery">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6M14 6l4 4L7 21H3v-4L14 6z"/>
                <circle cx="18" cy="6" r="3"/>
              </svg>
            </div>
          </div>
          <div class="card-content">
            <div class="card-badge-num">03 &bull; SURGERY</div>
            <h4 class="card-title-text" style="color: #C084FC;">The Future of Surgery</h4>
            <p class="card-desc-text">
              See how precision robotics and intelligent systems are enabling new possibilities in minimally invasive surgery.
            </p>
          </div>
        </article>

        <!-- Card 4: Smart Agriculture -->
        <article class="v2sector-card-enhanced" style="--badge-accent: #D97706;">
          <div class="card-img-wrap">
            <img src="assets/images/card-agriculture.jpg" alt="Agricultural drones monitoring crops" loading="lazy">
            <div class="card-badge-icon" title="Smart Agriculture">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22v-9M12 13a5 5 0 0 0 5-5c0-4-5-6-5-6s-5 2-5 6a5 5 0 0 0 5 5z"/>
                <path d="M12 18a4 4 0 0 1 4-4"/>
              </svg>
            </div>
          </div>
          <div class="card-content">
            <div class="card-badge-num">04 &bull; AGRICULTURE</div>
            <h4 class="card-title-text" style="color: #FBBF24;">Smart Agriculture</h4>
            <p class="card-desc-text">
              Explore how robotics, drones and automation are helping create smarter and more sustainable agriculture.
            </p>
          </div>
        </article>

        <!-- Card 5: Logistics & Delivery -->
        <article class="v2sector-card-enhanced" style="--badge-accent: #0D9488;">
          <div class="card-img-wrap">
            <img src="assets/images/card-logistics.jpg" alt="Aerial logistics and delivery drones" loading="lazy">
            <div class="card-badge-icon" title="Logistics & Delivery">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.29 7 12 12.01 20.71 7"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
          </div>
          <div class="card-content">
            <div class="card-badge-num">05 &bull; LOGISTICS</div>
            <h4 class="card-title-text" style="color: #2DD4BF;">Logistics &amp; Delivery</h4>
            <p class="card-desc-text">
              Discover how automation, robotics and intelligent systems are transforming warehouses, transportation and delivery.
            </p>
          </div>
        </article>

        <!-- Card 6: Robotics & AI -->
        <article class="v2sector-card-enhanced" style="--badge-accent: #2563EB;">
          <div class="card-img-wrap">
            <img src="assets/images/card-ai-robotics.jpg" alt="Robotics and artificial intelligence industrial systems" loading="lazy">
            <div class="card-badge-icon" title="Robotics & AI">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="3"/>
                <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
                <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
                <path d="M9 15h6M12 2v2M12 20v2M2 12h2M20 12h2"/>
              </svg>
            </div>
          </div>
          <div class="card-content">
            <div class="card-badge-num">06 &bull; ARTIFICIAL INTELLIGENCE</div>
            <h4 class="card-title-text" style="color: #60A5FA;">Robotics &amp; AI</h4>
            <p class="card-desc-text">
              Explore how robotics and artificial intelligence are being used across industries and shaping the future of work.
            </p>
          </div>
        </article>

      </div>

      <!-- PART 3: HUMAN + TECHNOLOGY (COLLABORATION BANNER WITH HANDSHAKE IMAGE) -->
      <div class="v2collab-banner">
        <div>
          <p class="v2collab-left-eyebrow">THE FUTURE TREND IS</p>
          <h3 class="v2collab-left-title">Collaboration: <span>Humans + Technology</span> Working Together</h3>
        </div>
        <div class="v2collab-center-media">
          <img src="assets/images/handshake-human-robot.jpg" alt="Human hand in business suit shaking robotic hand in cyber neural network" class="v2collab-handshake-img" loading="lazy">
        </div>
        <div class="v2collab-right">
          <p class="v2collab-right-intro">This is called</p>
          <h4 class="v2collab-right-title">“Human-Centered Innovation”</h4>
          <p class="v2collab-right-desc">
            Technology is not simply about replacing people. It can enhance human creativity, problem-solving and capabilities — creating new opportunities for the next generation.
          </p>
        </div>
      </div>

      <!-- PART 4: MAIN TOUR CONNECTION (STEM TOUR TO JAPAN WITH STAMP & 4 POINTS) -->
      <div class="v2japan-tour-block">
        <div class="v2japan-tour-visual">
          <div class="v2japan-tour-photo">
            <img src="assets/images/stem-students.jpg" alt="School students admiring Mount Fuji, cherry blossoms and pagoda" loading="lazy">
          </div>
          <div class="v2stamp-badge" title="Official STEM Tour to Japan">
            <span class="v2stamp-stem">STEM</span>
            <span class="v2stamp-tour">Tour to</span>
            <span class="v2stamp-japan">Japan</span>
          </div>
          <div class="v2flag-sticker" title="Japan">
            <div class="v2flag-sun"></div>
          </div>
        </div>

        <div>
          <h3 class="v2japan-tour-heading">
            An Extraordinary Educational<br>and Cultural Experience
          </h3>
          <p class="v2japan-tour-desc">
            Our educational STEM tours connect students with Japan's world of robotics, technology, innovation and culture — creating meaningful experiences beyond the classroom.
          </p>

          <div class="v2four-points-grid">
            <div class="v2point-col">
              <div class="v2point-circle" style="background: #0284C7;" title="Robotics">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div class="v2point-strong">See</div>
              <div class="v2point-text">Robotics in Action</div>
            </div>

            <div class="v2point-col">
              <div class="v2point-circle" style="background: #9333EA;" title="Innovation">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3 5.5v2.5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V13.5c1.5-1 3-3 3-5.5a6 6 0 0 0-6-6zM10 21h4"/>
                </svg>
              </div>
              <div class="v2point-strong">Experience</div>
              <div class="v2point-text">Cutting-Edge Innovation</div>
            </div>

            <div class="v2point-col">
              <div class="v2point-circle" style="background: #16A34A;" title="Culture">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 21h16M6 17h12M8 13h8M10 9h4M12 3v4M2 17l2-4h16l2 4M3 13l3-4h12l3 4M5 9l3-4h8l3 4"/>
                </svg>
              </div>
              <div class="v2point-strong">Explore</div>
              <div class="v2point-text">Japanese Culture &amp; Heritage</div>
            </div>

            <div class="v2point-col">
              <div class="v2point-circle" style="background: #EA580C;" title="Real-World Tech">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <div class="v2point-strong">Discover</div>
              <div class="v2point-text">Real-World Technology</div>
            </div>
          </div>

          <div class="v2info-callout">
            <div class="v2info-callout-icon" title="Student Mentorship">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
              </svg>
            </div>
            <p class="v2info-callout-text">
              Early exposure to technology helps students understand how the world is changing. By experiencing innovation firsthand, they can develop curiosity, creativity, collaboration and problem-solving skills for their future.
            </p>
          </div>
        </div>
      </div>

      <!-- PART 5: SCHOOLS + COLLEGES + GLOBAL EXPOSURE (CURIOUS MINDS BANNER) -->
      <div class="v2curious-banner">
        <div>
          <p class="v2curious-left-intro">The Future Belongs to</p>
          <h3 class="v2curious-left-title">Curious Minds</h3>
        </div>
        <div>
          <p class="v2curious-center-desc">
            Tomorrow's essential skills go beyond knowing how to use technology. Students need opportunities to explore, question, create and collaborate with it.
          </p>
          <div class="v2curious-center-highlight">
            And that future starts with what we expose our students to today.
          </div>
        </div>
        <div class="v2curious-right">
          <svg class="v2curious-right-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="14" cy="16" r="6"/>
            <path d="M6 34v-4a6 6 0 0 1 6-6h4"/>
            <rect x="28" y="10" width="12" height="12" rx="3"/>
            <circle cx="32" cy="15" r="1.5" fill="currentColor"/>
            <circle cx="36" cy="15" r="1.5" fill="currentColor"/>
            <path d="M30 34v-4a5 5 0 0 1 5-5h3"/>
            <path d="M16 28h12M22 25l6 6"/>
          </svg>
          <div>
            <div class="v2curious-right-title">
              STEM + Global Exposure<br>= A Brighter Future
            </div>
            <div class="v2curious-right-sub">
              Schools &bull; Colleges &bull; Educational Tours
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>`;

// Locate boundaries of Section 8
const markerStart = '  <!-- ==========================================================================\n       SECTION 8: STEM & INNOVATION';
const markerEnd = '  <!-- ==========================================================================\n       SECTION 9: SCHOOL CULTURAL EXCHANGE';

const idxStart = html.indexOf(markerStart);
const idxEnd = html.indexOf(markerEnd);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Marker not found!');
  process.exit(1);
}

let result = html.slice(0, idxStart) + section8Content + '\n\n\n' + html.slice(idxEnd);

fs.writeFileSync('index.html', result, 'utf8');
console.log('SUCCESS: Generated index.html cleanly! Size:', fs.statSync('index.html').size);
