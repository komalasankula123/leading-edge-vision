const fs = require('fs');

// Read the pristine existing website from index.portal-backup.html
let html = fs.readFileSync('index.portal-backup.html', 'utf8');

// 1. Add Caveat font for the "Innovation Builds a Better Tomorrow" script text
html = html.replace(
  'family=Bebas+Neue&family=Plus+Jakarta+Sans',
  'family=Caveat:wght@600;700&family=Bebas+Neue&family=Plus+Jakarta+Sans'
);

// 2. Locate the hero section in index.portal-backup.html
const heroStart = '<section class="v2hero" id="home">';
const heroEnd = '</section>';

const heroIdxStart = html.indexOf(heroStart);
const heroIdxEnd = html.indexOf(heroEnd, heroIdxStart) + heroEnd.length;

if (heroIdxStart === -1 || heroIdxEnd === -1) {
  console.error('Hero section not found!');
  process.exit(1);
}

// 3. New Hero Section with ONLY the content updated, preserving existing design and image!
const newHeroContent = `  <section class="v2hero" id="home">
    <picture class="v2hero__media">
      <img src="assets/images/japan-hero.jpg" alt="Mount Fuji, Cherry Blossoms and Traditional Pagoda" fetchpriority="high">
    </picture>
    <div class="v2hero__grad-left"></div>
    <div class="v2hero__grad-bottom"></div>

    <!-- Innovation Builds a Better Tomorrow Callout (from reference image) -->
    <div class="v2hero__callout" style="position: absolute; top: 124px; right: 40px; text-align: center; transform: rotate(-3deg); z-index: 4;">
      <div style="font-family: 'Caveat', cursive, sans-serif; font-size: clamp(24px, 2.3vw, 34px); font-weight: 700; color: #38BDF8; line-height: 1.1; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);">
        Innovation<br>Builds a<br>Better Tomorrow
      </div>
      <svg width="130" height="16" viewBox="0 0 140 18" fill="none" style="margin: -2px auto 0 auto; display: block;">
        <path d="M4 14C35 4 95 3 136 12" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round"/>
      </svg>
    </div>

    <div class="site-container" style="width: 100%;">
      <div class="v2hero__copy">
        <p class="v2hero__eyebrow">JAPAN SCHOOL GROUP TOUR &bull; 8 DAYS / 7 NIGHTS &bull; STEM &amp; ROBOTICS</p>
        <h1 class="v2hero__title">ROBOTICS<br><span style="font-size: 0.52em; display: block; line-height: 1.15; margin-top: 12px; font-family: var(--font-body); font-weight: 700; text-transform: none;">From Innovation to <span style="color: var(--brand-primary); text-shadow: 0 0 25px rgba(216, 191, 11, 0.45);">Real-World Learning</span></span></h1>
        <p class="v2hero__intro">
          Robotics, artificial intelligence and automation are transforming the world around us. Through immersive educational tours, students can move beyond textbooks and experience how technology is shaping industries, communities and the future.
        </p>
        <div class="v2hero__actions">
          <a href="#journey" class="v2btn v2btn--gold">Explore the Journey</a>
          <a href="#itinerary" class="v2btn v2btn--ghost">View 8-Day Itinerary</a>
        </div>
      </div>
    </div>

    <!-- Scroll Cue -->
    <div class="v2hero__scroll">
      <a href="#mission" style="color: inherit; text-decoration: none;">
        <span>scroll to explore</span>
        <span class="v2hero__scroll-line"></span>
      </a>
    </div>

    <!-- Photo Badge -->
    <div class="v2hero__caption">
      <svg class="ic"><use href="#ic-camera"></use></svg>
      <span>Mount Fuji &amp; Cherry Blossoms &bull; India to Japan Delegation</span>
    </div>
  </section>`;

html = html.slice(0, heroIdxStart) + newHeroContent + html.slice(heroIdxEnd);

fs.writeFileSync('index.html', html, 'utf8');
console.log('SUCCESS: index.html updated with ONLY hero content updated, existing design and images untouched!');
console.log('New file size:', fs.statSync('index.html').size);
