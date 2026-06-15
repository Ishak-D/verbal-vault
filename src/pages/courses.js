export function renderCourses(container) {
  container.innerHTML = `
    <header class="page-header">
      <div class="container animate-on-scroll">
        <h1>Our Courses</h1>
        <p>Explore our wide selection of professional programs tailored to fit your goals.</p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <div class="courses-detail-grid">
          
          <div class="course-detail-card animate-on-scroll" data-delay="1">
            <div class="course-icon" style="background: rgba(27, 42, 74, 0.08); color: var(--navy)">🗣️</div>
            <h3>General English</h3>
            <p>Develop a complete command of grammar, vocabulary, reading, and listening skills for daily life.</p>
            <ul>
              <li>All baseline skills</li>
              <li>Real-life scenarios</li>
              <li>Grammar in context</li>
            </ul>
            <a href="#/register?course=General English" class="btn btn-primary">Register Now</a>
          </div>
          
          <div class="course-detail-card animate-on-scroll" data-delay="2">
            <div class="course-icon" style="background: rgba(43, 181, 160, 0.1); color: var(--teal)">💬</div>
            <h3>Speaking Club</h3>
            <p>Overcome anxiety and build fluency. Engage in debates, speech circles, and casual chats.</p>
            <ul>
              <li>Fluency practice</li>
              <li>Pronunciation focus</li>
              <li>Interactive debates</li>
            </ul>
            <a href="#/register?course=Speaking Club" class="btn btn-primary">Register Now</a>
          </div>
          
          <div class="course-detail-card animate-on-scroll" data-delay="3">
            <div class="course-icon" style="background: rgba(107, 76, 154, 0.08); color: var(--purple)">📚</div>
            <h3>IELTS Preparation</h3>
            <p>Accelerate your score with deep-dives into exam patterns, sample tasks, and timed writing reviews.</p>
            <ul>
              <li>Writing evaluations</li>
              <li>Academic reading prep</li>
              <li>Mock speaking tests</li>
            </ul>
            <a href="#/register?course=IELTS Preparation" class="btn btn-primary">Register Now</a>
          </div>
          
          <div class="course-detail-card animate-on-scroll" data-delay="4">
            <div class="course-icon" style="background: rgba(245, 166, 35, 0.1); color: var(--orange)">💼</div>
            <h3>Business English</h3>
            <p>Gain corporate communication skills: negotiations, corporate emails, presentations, and resume design.</p>
            <ul>
              <li>Corporate email styles</li>
              <li>Presentation practice</li>
              <li>Interview coaching</li>
            </ul>
            <a href="#/register?course=Business English" class="btn btn-primary">Register Now</a>
          </div>
          
          <div class="course-detail-card animate-on-scroll" data-delay="5">
            <div class="course-icon" style="background: rgba(232, 93, 58, 0.08); color: var(--coral)">🧸</div>
            <h3>Kids English</h3>
            <p>Fun, story-driven, and highly interactive learning designed specifically for younger students.</p>
            <ul>
              <li>Game-based lessons</li>
              <li>Basic phonics</li>
              <li>Creative storytelling</li>
            </ul>
            <a href="#/register?course=Kids English" class="btn btn-primary">Register Now</a>
          </div>
          
          <div class="course-detail-card animate-on-scroll" data-delay="6">
            <div class="course-icon" style="background: rgba(91, 200, 215, 0.1); color: var(--cyan)">🎨</div>
            <h3>Conversation Workshops</h3>
            <p>Interactive group workshops studying specific cultural topics, jargon, and contemporary idioms.</p>
            <ul>
              <li>Contemporary slangs</li>
              <li>Cultural studies</li>
              <li>Creative speaking tasks</li>
            </ul>
            <a href="#/register?course=Conversation Workshops" class="btn btn-primary">Register Now</a>
          </div>
          
        </div>
      </div>
    </section>
  `;
}
