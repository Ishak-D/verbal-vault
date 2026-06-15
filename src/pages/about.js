export function renderAbout(container) {
  container.innerHTML = `
    <header class="page-header">
      <div class="container animate-on-scroll">
        <h1>About Verbal Vault</h1>
        <p>A dedicated community of language educators and learners striving for communication confidence.</p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <div class="about-mission">
          <div class="about-mission-content animate-slide-left">
            <h2>Our Mission & Vision</h2>
            <p>
              Founded in 2021, Verbal Vault was created out of a simple belief: language learning should be an active, communal, and confidence-building journey rather than a chore of grammar charts and vocabulary sheets.
            </p>
            <p>
              We aim to break down traditional classroom barriers by offering conversational learning circles, active debate rounds, and guided workshops that prepare learners for real-world interactions in corporate, academic, and social realms.
            </p>
          </div>
          
          <div class="about-visual animate-slide-right">
            <span class="visual-emoji">🌍</span>
            <div class="visual-text">Global Learning Community</div>
            <div class="visual-sub">Connecting learners and professionals worldwide under a shared passion for English.</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-badge animate-on-scroll">Core Values</div>
        <h2 class="section-title animate-on-scroll">What Drives Us</h2>
        <p class="section-subtitle animate-on-scroll">
          Our values form the baseline of every speaking workshop, feedback card, and networking event we design.
        </p>
        
        <div class="about-values-grid">
          <div class="about-value-card animate-on-scroll" data-delay="1">
            <span class="value-emoji">⚡</span>
            <h3>Empowerment</h3>
            <p>We believe every student has a voice. We structure our circles to encourage confidence and remove anxiety.</p>
          </div>
          
          <div class="about-value-card animate-on-scroll" data-delay="2">
            <span class="value-emoji">🎯</span>
            <h3>Practical Focus</h3>
            <p>No useless worksheets. Every session centers on functional vocabulary, daily discussions, and professional tasks.</p>
          </div>
          
          <div class="about-value-card animate-on-scroll" data-delay="3">
            <span class="value-emoji">🤝</span>
            <h3>Inclusivity</h3>
            <p>We are a welcoming hub for international learners, regardless of original accent, background, or current level.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item animate-on-scroll" data-delay="1">
            <div class="stat-number">5k+</div>
            <div class="stat-label">Students Taught</div>
          </div>
          <div class="stat-item animate-on-scroll" data-delay="2">
            <div class="stat-number">50+</div>
            <div class="stat-label">Certified Tutors</div>
          </div>
          <div class="stat-item animate-on-scroll" data-delay="3">
            <div class="stat-number">12+</div>
            <div class="stat-label">Clubs & Classes</div>
          </div>
          <div class="stat-item animate-on-scroll" data-delay="4">
            <div class="stat-number">98%</div>
            <div class="stat-label">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  `;
}
