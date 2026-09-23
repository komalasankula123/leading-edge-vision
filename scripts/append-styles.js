const fs = require('fs');

const cssToAdd = `
/* ==========================================================================
   ENHANCED ROBOTICS & STEM INFOGRAPHIC SECTIONS (INCORPORATED INTO SECTION 8)
   ========================================================================== */

/* 1. Robotics Hero Showcase Banner inside Section 8 */
.v2robotics-hero {
  background: #091624;
  border: 1px solid var(--brand-card-border-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.v2robotics-hero-copy {
  padding: 48px 40px;
  position: relative;
  z-index: 2;
}

.v2robotics-hero-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 76px);
  line-height: 0.95;
  color: #FFFFFF;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.v2robotics-hero-sub1 {
  font-family: var(--font-body);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.2;
}

.v2robotics-hero-sub2 {
  font-family: var(--font-body);
  font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 800;
  color: var(--brand-primary);
  line-height: 1.1;
  margin-bottom: 20px;
  display: block;
  text-shadow: 0 0 25px rgba(216, 191, 11, 0.45);
}

.v2robotics-hero-desc {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  max-width: 520px;
}

.v2robotics-hero-media {
  height: 100%;
  min-height: 380px;
  position: relative;
  overflow: hidden;
}

.v2robotics-hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center right;
  transition: transform 0.8s ease;
}

.v2robotics-hero:hover .v2robotics-hero-media img {
  transform: scale(1.04);
}

.v2robotics-hero-callout {
  position: absolute;
  top: 24px;
  right: 24px;
  text-align: center;
  transform: rotate(-3deg);
  z-index: 3;
}

.v2robotics-hero-callout-text {
  font-family: 'Caveat', cursive, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #0284C7;
  line-height: 1.1;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.9), 0 0 1px #fff;
  white-space: pre-line;
}

.v2robotics-hero-swoosh {
  width: 130px;
  height: 14px;
  margin: -2px auto 0 auto;
}

@media (max-width: 992px) {
  .v2robotics-hero {
    grid-template-columns: 1fr;
  }
  .v2robotics-hero-media {
    min-height: 260px;
  }
}

/* 2. Image-Rich Sector Cards (6-Grid) */
.v2sector-card-enhanced {
  background: var(--brand-card-dark);
  border: 1px solid var(--brand-card-border-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all var(--trans);
  position: relative;
}

.v2sector-card-enhanced:hover {
  border-color: var(--brand-primary);
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(216, 191, 11, 0.2);
}

.v2sector-card-enhanced .card-img-wrap {
  width: 100%;
  height: 170px;
  position: relative;
  overflow: hidden;
  background: #0B111A;
}

.v2sector-card-enhanced .card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.v2sector-card-enhanced:hover .card-img-wrap img {
  transform: scale(1.06);
}

.v2sector-card-enhanced .card-badge-icon {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--badge-accent, #0284C7);
  border: 3px solid var(--brand-card-dark);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  z-index: 2;
  transition: transform 0.3s ease;
}

.v2sector-card-enhanced:hover .card-badge-icon {
  transform: translateX(-50%) scale(1.12) rotate(6deg);
}

.v2sector-card-enhanced .card-badge-icon svg {
  width: 22px;
  height: 22px;
}

.v2sector-card-enhanced .card-content {
  padding: 30px 18px 24px 18px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.v2sector-card-enhanced .card-badge-num {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--badge-accent, var(--brand-primary));
  margin-bottom: 6px;
}

.v2sector-card-enhanced .card-title-text {
  font-family: var(--font-display);
  font-size: 20px;
  text-transform: uppercase;
  color: #FFFFFF;
  margin-bottom: 10px;
  line-height: 1.15;
}

.v2sector-card-enhanced .card-desc-text {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
  margin-top: auto;
}

/* 3. Handshake Collaboration Banner (3-Column Layout) */
.v2collab-banner {
  background: linear-gradient(135deg, rgba(14, 28, 48, 0.95) 0%, rgba(8, 18, 32, 0.98) 100%);
  border: 1px solid rgba(216, 191, 11, 0.35);
  border-radius: var(--radius-md);
  padding: 40px;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  gap: 32px;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.v2collab-left-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--brand-primary);
  margin-bottom: 8px;
}

.v2collab-left-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 3.5vw, 44px);
  text-transform: uppercase;
  line-height: 1.05;
  color: #FFFFFF;
}

.v2collab-left-title span {
  color: var(--brand-primary);
  display: block;
}

.v2collab-center-media {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v2collab-handshake-img {
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  border-radius: var(--radius-sm);
  filter: drop-shadow(0 0 25px rgba(56, 189, 248, 0.35));
  transition: transform 0.6s ease;
}

.v2collab-banner:hover .v2collab-handshake-img {
  transform: scale(1.04);
}

.v2collab-right {
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 28px;
}

.v2collab-right-intro {
  font-size: 13px;
  color: #94A3B8;
  margin-bottom: 4px;
}

.v2collab-right-title {
  font-family: var(--font-display);
  font-size: 26px;
  color: var(--brand-primary);
  text-transform: uppercase;
  line-height: 1.15;
  margin-bottom: 12px;
}

.v2collab-right-desc {
  font-size: 14px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 992px) {
  .v2collab-banner {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .v2collab-right {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-left: 0;
    padding-top: 20px;
  }
}

/* 4. STEM Tour to Japan Block inside Section 8 */
.v2japan-tour-block {
  margin-top: 60px;
  background: #FFFFFF;
  color: var(--brand-dark);
  border-radius: var(--radius-md);
  padding: 44px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 40px;
  align-items: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.v2japan-tour-visual {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: visible;
}

.v2japan-tour-photo {
  width: 100%;
  height: 360px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(14, 20, 30, 0.2);
}

.v2japan-tour-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  transition: transform 0.8s ease;
}

.v2japan-tour-visual:hover .v2japan-tour-photo img {
  transform: scale(1.04);
}

/* Red Circular Stamp Badge */
.v2stamp-badge {
  position: absolute;
  top: -18px;
  right: -14px;
  width: 124px;
  height: 124px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #EF4444, #B91C1C 80%);
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transform: rotate(-10deg);
  box-shadow: 0 8px 24px rgba(185, 28, 28, 0.45);
  border: 2px dashed rgba(255, 255, 255, 0.8);
  z-index: 5;
  transition: transform 0.3s ease;
}

.v2stamp-badge:hover {
  transform: rotate(-5deg) scale(1.08);
}

.v2stamp-stem {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 1;
}

.v2stamp-tour {
  font-family: 'Caveat', cursive, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  color: #FEF08A;
}

.v2stamp-japan {
  font-family: var(--font-body);
  font-size: 24px;
  font-weight: 900;
  line-height: 0.95;
}

.v2flag-sticker {
  position: absolute;
  bottom: 10px;
  right: 14px;
  width: 46px;
  height: 32px;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E2E8F0;
  z-index: 6;
  transform: rotate(5deg);
}

.v2flag-sun {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #DC2626;
}

.v2japan-tour-heading {
  font-family: var(--font-display);
  font-size: clamp(30px, 3.2vw, 42px);
  text-transform: uppercase;
  color: var(--brand-dark);
  line-height: 1.1;
  margin-bottom: 14px;
}

.v2japan-tour-desc {
  font-size: 15px;
  line-height: 1.7;
  color: #475569;
  margin-bottom: 28px;
}

.v2four-points-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.v2point-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.v2point-col:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 15%;
  height: 70%;
  width: 1px;
  background: #E2E8F0;
}

.v2point-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;
}

.v2point-col:hover .v2point-circle {
  transform: translateY(-3px) scale(1.1);
}

.v2point-circle svg {
  width: 22px;
  height: 22px;
}

.v2point-strong {
  font-size: 14px;
  font-weight: 800;
  color: var(--brand-dark);
  line-height: 1.2;
}

.v2point-text {
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  line-height: 1.3;
  margin-top: 2px;
}

.v2info-callout {
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  border-radius: var(--radius-sm);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.v2info-callout-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #0369A1;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.v2info-callout-icon svg {
  width: 24px;
  height: 24px;
}

.v2info-callout-text {
  font-size: 13.5px;
  line-height: 1.6;
  color: #0F172A;
  font-weight: 500;
}

@media (max-width: 992px) {
  .v2japan-tour-block {
    grid-template-columns: 1fr;
    padding: 28px;
  }
  .v2four-points-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .v2point-col:not(:last-child)::after {
    display: none;
  }
}

/* 5. Curious Minds Footer Block */
.v2curious-banner {
  background: #071524;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);
  padding: 36px 40px;
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1.3fr 1.1fr;
  gap: 32px;
  align-items: center;
}

.v2curious-left-intro {
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.2;
}

.v2curious-left-title {
  font-family: var(--font-display);
  font-size: clamp(34px, 4vw, 48px);
  color: var(--brand-primary);
  text-transform: uppercase;
  line-height: 1.05;
  text-shadow: 0 0 20px rgba(216, 191, 11, 0.4);
}

.v2curious-center-desc {
  font-size: 14px;
  color: #CBD5E1;
  line-height: 1.65;
  margin-bottom: 8px;
}

.v2curious-center-highlight {
  font-family: 'Caveat', cursive, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--brand-primary);
  line-height: 1.2;
}

.v2curious-right {
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 28px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.v2curious-right-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  color: #FFFFFF;
}

.v2curious-right-title {
  font-family: var(--font-display);
  font-size: 22px;
  color: #FFFFFF;
  text-transform: uppercase;
  line-height: 1.2;
}

.v2curious-right-sub {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--brand-primary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 4px;
}

@media (max-width: 992px) {
  .v2curious-banner {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 28px;
  }
  .v2curious-right {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-left: 0;
    padding-top: 20px;
  }
}
`;

let content = fs.readFileSync('css/style.css', 'utf8');
if (!content.includes('ENHANCED ROBOTICS & STEM INFOGRAPHIC SECTIONS')) {
  content += '\n' + cssToAdd;
  fs.writeFileSync('css/style.css', content, 'utf8');
  console.log('Appended enhanced styles to css/style.css successfully!');
} else {
  console.log('Already present in css/style.css.');
}
