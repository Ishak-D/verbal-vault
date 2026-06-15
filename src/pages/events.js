export function renderEvents(container) {
  container.innerHTML = `
    <header class="page-header">
      <div class="container animate-on-scroll">
        <h1>Events & Workshops</h1>
        <p>Stay up to date with our community gatherings, interactive panels, and open seminars.</p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <h2 class="section-title animate-on-scroll">Upcoming Events</h2>
        <p class="section-subtitle animate-on-scroll">Join us in-person or virtually to practice skills, listen to guest panels, and meet other learners.</p>
        
        <div class="events-detail-grid">
          
          <div class="event-card animate-on-scroll" data-delay="1">
            <div class="event-card-header">
              <div class="event-date-badge">
                <span class="day">18</span>
                <span class="month">Jun</span>
              </div>
              <h3>Public Speaking Workshop</h3>
            </div>
            <div class="event-card-body">
              <p>Learn core public speaking habits, stage confidence, how to manage nervous ticks, and draft introductory speeches that grab your audience's attention.</p>
              <div class="event-location" style="margin-bottom: var(--space-4)">📍 Main Campus & Zoom Stream</div>
              <a href="#/register?course=Speaking Club" class="btn btn-outline" style="width: 100%">RSVP/Register Interest</a>
            </div>
          </div>
          
          <div class="event-card animate-on-scroll" data-delay="2">
            <div class="event-card-header">
              <div class="event-date-badge">
                <span class="day">25</span>
                <span class="month">Jun</span>
              </div>
              <h3>Pronunciation Masterclass</h3>
            </div>
            <div class="event-card-body">
              <p>Work directly on common accent challenges, intonation patterns, word stress rules, and sound patterns that make your English sound natural and clear.</p>
              <div class="event-location" style="margin-bottom: var(--space-4)">📍 Virtual Zoom Classroom</div>
              <a href="#/register?course=Conversation Workshops" class="btn btn-outline" style="width: 100%">RSVP/Register Interest</a>
            </div>
          </div>
          
          <div class="event-card animate-on-scroll" data-delay="3">
            <div class="event-card-header">
              <div class="event-date-badge">
                <span class="day">02</span>
                <span class="month">Jul</span>
              </div>
              <h3>Global Networking Mixer</h3>
            </div>
            <div class="event-card-body">
              <p>A fun opportunity to practice speaking with language learners and professionals from all over the world in casual group formats.</p>
              <div class="event-location" style="margin-bottom: var(--space-4)">📍 Campus Garden Terrace</div>
              <a href="#/register?course=Conversation Workshops" class="btn btn-outline" style="width: 100%">RSVP/Register Interest</a>
            </div>
          </div>
          
          <div class="event-card animate-on-scroll" data-delay="4">
            <div class="event-card-header">
              <div class="event-date-badge">
                <span class="day">10</span>
                <span class="month">Jul</span>
              </div>
              <h3>IELTS Writing Boot Camp</h3>
            </div>
            <div class="event-card-body">
              <p>An intensive 3-hour session targeting Task 1 and Task 2 writing formats. Learn how examiners grade essays and common mistakes to avoid.</p>
              <div class="event-location" style="margin-bottom: var(--space-4)">📍 Seminar Room 2B & Online</div>
              <a href="#/register?course=IELTS Preparation" class="btn btn-outline" style="width: 100%">RSVP/Register Interest</a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  `;
}
