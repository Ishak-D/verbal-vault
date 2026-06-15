export function renderClubs(container) {
  container.innerHTML = `
    <header class="page-header">
      <div class="container animate-on-scroll">
        <h1>Clubs & Social Activities</h1>
        <p>Take part in our extracurricular programs designed to boost your fluency in natural, engaging environments.</p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <h2 class="section-title animate-on-scroll">Active Clubs</h2>
        <p class="section-subtitle animate-on-scroll">Clubs are free for all active Verbal Vault students. Select a club below to read details and request access.</p>
        
        <div class="clubs-detail-grid">
          
          <div class="club-detail-card animate-on-scroll" data-delay="1">
            <span class="club-emoji">🍿</span>
            <h3>Movie Club</h3>
            <p>We select award-winning independent films, documentaries, and classic movies. Students watch them during the week, then gather to review character developments, analyze idioms used, and discuss overarching themes.</p>
            <div class="club-meta">
              <span>📅 Every Friday at 19:00</span>
              <span>👥 45 Members</span>
            </div>
          </div>
          
          <div class="club-detail-card animate-on-scroll" data-delay="2">
            <span class="club-emoji">⚖️</span>
            <h3>Debate Club</h3>
            <p>Challenge your critical thinking and logical presentation skills. Tutors provide controversial, interesting, or business themes, split members into teams, and moderate standard debate structures.</p>
            <div class="club-meta">
              <span>📅 Every Tuesday at 18:30</span>
              <span>👥 30 Members</span>
            </div>
          </div>
          
          <div class="club-detail-card animate-on-scroll" data-delay="3">
            <span class="club-emoji">📖</span>
            <h3>Reading Club</h3>
            <p>Study short stories, contemporary essays, poetry, and book extracts. We review vocabulary lists, discuss character motivations, and share insights on the texts in a relaxed, comfortable environment.</p>
            <div class="club-meta">
              <span>📅 Alternate Thursdays at 18:00</span>
              <span>👥 25 Members</span>
            </div>
          </div>
          
          <div class="club-detail-card animate-on-scroll" data-delay="4">
            <span class="club-emoji">✍️</span>
            <h3>Creative Writing Club</h3>
            <p>Express yourself through poetry, fiction, memoirs, and journal entries. Tutors supply daily prompts, guide members through style adjustments, and facilitate peer-reviews.</p>
            <div class="club-meta">
              <span>📅 Every Wednesday at 17:00</span>
              <span>👥 20 Members</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  `;
}
