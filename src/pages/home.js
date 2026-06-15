export function renderHome(container) {
  container.innerHTML = `
    <!-- Decorative Background Blobs & Shapes -->
    <div class="bg-blob blob-top-left"></div>
    <div class="bg-blob blob-top-right"></div>
    <div class="bg-blob blob-bottom-right"></div>
    
    <!-- Hero Section -->
    <section class="hero hero-premium">
      <div class="hero-inner-premium container">
        <!-- Hero Left: 3D Centerpiece -->
        <div class="hero-centerpiece-wrapper animate-slide-left">
          <!-- Concentric Ring lines -->
          <div class="decorative-ring ring-outer"></div>
          <div class="decorative-ring ring-middle"></div>
          <div class="decorative-ring ring-inner"></div>
          
          <!-- Floating Particles / Dots (colors from logo) -->
          <div class="floating-particle particle-purple"></div>
          <div class="floating-particle particle-teal"></div>
          <div class="floating-particle particle-orange"></div>
          <div class="floating-particle particle-cyan"></div>
          <div class="floating-particle particle-coral"></div>
          
          <!-- 3D Dish Container -->
          <div class="dish-3d-container">
            <div class="dish-inner-shading"></div>
            <!-- Concentric rings inside the dish -->
            <div class="dish-inner-ring ring-1"></div>
            <div class="dish-inner-ring ring-2"></div>
            <!-- Logo inside the centerpiece -->
            <img src="/logo.png" alt="Verbal Vault Logo" class="hero-logo-3d" />
          </div>
        </div>

        <!-- Hero Right: Headline & CTAs -->
        <div class="hero-content-premium animate-slide-right">
          <h1 class="hero-headline-premium">
            Where Language<br><span class="gradient-text">Comes Alive</span>
          </h1>
          <p class="hero-description-premium">
            Join a vibrant English learning community where communication, confidence, and growth come together.
          </p>
          <div class="hero-cta-premium">
            <a href="#/register" class="btn btn-gradient-premium">
              <span>Register Now</span>
              <span class="btn-arrow-circle">→</span>
            </a>
            
            <a href="#/about" class="btn-discover">
              <span class="btn-play-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </span>
              <span class="btn-discover-text">
                <span class="label-discover">Discover More</span>
                <span class="sub-discover">About Us</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <!-- Floating Stats Bar (below hero content) -->
      <div class="container">
        <div class="stats-bar-floating animate-scale">
          <div class="stat-bar-item">
            <div class="stat-bar-icon-wrapper icon-blue">
              <!-- Users Icon -->
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div class="stat-bar-text">
              <h3>2,500+</h3>
              <p>Students Enrolled</p>
            </div>
          </div>
          
          <div class="stat-bar-item">
            <div class="stat-bar-icon-wrapper icon-teal">
              <!-- Book Open Icon -->
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div class="stat-bar-text">
              <h3>25+</h3>
              <p>Expert Teachers</p>
            </div>
          </div>
          
          <div class="stat-bar-item">
            <div class="stat-bar-icon-wrapper icon-orange">
              <!-- Trophy Icon -->
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                <path d="M12 2a6 6 0 0 1 6 6v7H6V8a6 6 0 0 1 6-6z" />
              </svg>
            </div>
            <div class="stat-bar-text">
              <h3>98%</h3>
              <p>Success Rate</p>
            </div>
          </div>
          
          <div class="stat-bar-item">
            <div class="stat-bar-icon-wrapper icon-cyan">
              <!-- Globe Icon -->
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div class="stat-bar-text">
              <h3>15+</h3>
              <p>Courses Offered</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 1. Why Choose Verbal Vault Section -->
    <section class="section section-why-choose">
      <div class="container grid-why-choose">
        
        <!-- Left Column: Heading and description -->
        <div class="why-choose-left animate-slide-left">
          <div class="badge-tag">WHY CHOOSE US</div>
          <h2 class="why-choose-title">The Verbal Vault Experience</h2>
          <p class="why-choose-desc">
            We combine proven teaching methods with real-life practice to help you speak with confidence and achieve your goals.
          </p>
          <a href="#/about" class="btn-learn-more">
            <span>Learn More About Us</span>
            <span class="arrow-symbol">→</span>
          </a>
        </div>

        <!-- Right Column: 6 Feature Cards Grid -->
        <div class="why-choose-right-grid">
          
          <div class="premium-feature-card animate-on-scroll" data-delay="1">
            <div class="feature-icon-box bg-green">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
            </div>
            <div class="feature-text-box">
              <h3>Expert Teachers</h3>
              <p>Learn from certified and experienced instructors passionate about your growth.</p>
            </div>
          </div>

          <div class="premium-feature-card animate-on-scroll" data-delay="2">
            <div class="feature-icon-box bg-purple">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div class="feature-text-box">
              <h3>Interactive Learning</h3>
              <p>Engaging classes, real conversations, and practical activities.</p>
            </div>
          </div>

          <div class="premium-feature-card animate-on-scroll" data-delay="3">
            <div class="feature-icon-box bg-orange">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div class="feature-text-box">
              <h3>Proven Results</h3>
              <p>Our students achieve their goals with a success rate of 98%.</p>
            </div>
          </div>

          <div class="premium-feature-card animate-on-scroll" data-delay="4">
            <div class="feature-icon-box bg-blue">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div class="feature-text-box">
              <h3>Speaking Focus</h3>
              <p>Speak more, learn faster, and build real confidence.</p>
            </div>
          </div>

          <div class="premium-feature-card animate-on-scroll" data-delay="5">
            <div class="feature-icon-box bg-teal">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div class="feature-text-box">
              <h3>Supportive Community</h3>
              <p>Join a friendly community that motivates and inspires.</p>
            </div>
          </div>

          <div class="premium-feature-card animate-on-scroll" data-delay="6">
            <div class="feature-icon-box bg-pink">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div class="feature-text-box">
              <h3>Personalized Approach</h3>
              <p>We adapt to your level, goals, and learning style.</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. Featured Courses -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-badge animate-on-scroll">Our Courses</div>
        <h2 class="section-title animate-on-scroll">Featured Programs</h2>
        <p class="section-subtitle animate-on-scroll">
          Choose from a variety of targeted programs designed to match your specific needs and goals.
        </p>
        
        <div class="courses-grid">
          <div class="course-card animate-on-scroll" data-delay="1">
            <div class="course-card-icon" style="background: rgba(27, 42, 74, 0.08); color: var(--navy)">🗣️</div>
            <h3>Speaking Club</h3>
            <p>Improve fluency, expand vocabulary, and eliminate speaking fear in casual discussion groups.</p>
            <div class="course-card-meta">
              <span>⏱️ 4 Weeks</span>
              <span>📶 All Levels</span>
            </div>
            <a href="#/register?course=Speaking Club" class="btn btn-primary">Enroll Now</a>
          </div>
          
          <div class="course-card animate-on-scroll" data-delay="2">
            <div class="course-card-icon" style="background: rgba(43, 181, 160, 0.1); color: var(--teal)">📚</div>
            <h3>IELTS Preparation</h3>
            <p>Master exam strategies, write better essays, and get high-scoring feedback on reading, listening, and speaking.</p>
            <div class="course-card-meta">
              <span>⏱️ 8 Weeks</span>
              <span>📶 Intermediate+</span>
            </div>
            <a href="#/register?course=IELTS Preparation" class="btn btn-primary">Enroll Now</a>
          </div>
          
          <div class="course-card animate-on-scroll" data-delay="3">
            <div class="course-card-icon" style="background: rgba(107, 76, 154, 0.08); color: var(--purple)">💼</div>
            <h3>Business English</h3>
            <p>Excel at work with specialized training for presentations, negotiations, emails, and job interviews.</p>
            <div class="course-card-meta">
              <span>⏱️ 6 Weeks</span>
              <span>📶 Intermediate+</span>
            </div>
            <a href="#/register?course=Business English" class="btn btn-primary">Enroll Now</a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: var(--space-12)">
          <a href="#/courses" class="btn btn-outline animate-scale">View All Courses</a>
        </div>
      </div>
    </section>

    <!-- 3. Learning Experience -->
    <section class="section">
      <div class="container">
        <div class="section-badge animate-on-scroll">The Methodology</div>
        <h2 class="section-title animate-on-scroll">The Learning Experience</h2>
        <p class="section-subtitle animate-on-scroll">
          Our immersive framework ensures you stay motivated, practice regularly, and see measurable progress.
        </p>
        
        <div class="experience-grid">
          <div class="experience-item animate-on-scroll" data-delay="1">
            <div class="experience-number">01</div>
            <h3>Immersive Learning</h3>
            <p>Surround yourself with language in structured environments designed to replicate real-world scenarios.</p>
          </div>
          <div class="experience-item animate-on-scroll" data-delay="2">
            <div class="experience-number">02</div>
            <h3>Interactive Dynamic</h3>
            <p>Collaborate in live debates, workshops, and speaking sessions with fellow students.</p>
          </div>
          <div class="experience-item animate-on-scroll" data-delay="3">
            <div class="experience-number">03</div>
            <h3>Adaptive Progress</h3>
            <p>Receive personalized feedback and adjustments to keep you moving forward at the perfect pace.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Clubs & Activities -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-badge animate-on-scroll">Beyond Classes</div>
        <h2 class="section-title animate-on-scroll">Clubs & Social Activities</h2>
        <p class="section-subtitle animate-on-scroll">
          Learning doesn't stop in the classroom. Take part in clubs that spark your curiosity.
        </p>
        
        <div class="clubs-grid">
          <div class="club-card animate-on-scroll" data-delay="1">
            <span class="club-card-emoji">🍿</span>
            <h3>Movie Club</h3>
            <p>Watch award-winning cinema and meet to discuss themes, vocabulary, and cultural nuances.</p>
          </div>
          <div class="club-card animate-on-scroll" data-delay="2">
            <span class="club-card-emoji">⚖️</span>
            <h3>Debate Club</h3>
            <p>Formulate arguments, present counterpoints, and defend your opinions on engaging topics.</p>
          </div>
          <div class="club-card animate-on-scroll" data-delay="3">
            <span class="club-card-emoji">📖</span>
            <h3>Reading Club</h3>
            <p>Dive into interesting short stories, contemporary essays, and discuss them with a warm group.</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: var(--space-12)">
          <a href="#/clubs" class="btn btn-outline animate-scale">Explore Clubs</a>
        </div>
      </div>
    </section>

    <!-- 5. Upcoming Events -->
    <section class="section">
      <div class="container">
        <div class="section-badge animate-on-scroll">What's Happening</div>
        <h2 class="section-title animate-on-scroll">Upcoming Events</h2>
        <p class="section-subtitle animate-on-scroll">
          Stay connected and challenge yourself at our special workshops, open lectures, and cultural events.
        </p>
        
        <div class="events-grid">
          <div class="event-card animate-on-scroll" data-delay="1">
            <div class="event-card-header">
              <div class="event-date-badge">
                <span class="day">18</span>
                <span class="month">Jun</span>
              </div>
              <h3>Public Speaking Workshop</h3>
            </div>
            <div class="event-card-body">
              <p>Learn core public speaking habits, stage confidence, and how to draft speeches that inspire.</p>
              <div class="event-location">📍 Main Campus & Online</div>
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
              <p>Work directly on accent improvement, intonation patterns, and sounding like a native speaker.</p>
              <div class="event-location">📍 Virtual Seminar Room</div>
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
              <p>A fun opportunity to practice speaking with learners and professionals from all over the world.</p>
              <div class="event-location">📍 Garden Café Terrace</div>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: var(--space-12)">
          <a href="#/events" class="btn btn-outline animate-scale">See All Events</a>
        </div>
      </div>
    </section>

    <!-- 6. Student Testimonials -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-badge animate-on-scroll">Success Stories</div>
        <h2 class="section-title animate-on-scroll">Student Testimonials</h2>
        <p class="section-subtitle animate-on-scroll">
          Hear from our graduates and active members about how Verbal Vault transformed their communication.
        </p>
        
        <div class="testimonials-grid">
          <div class="testimonial-card animate-on-scroll" data-delay="1">
            <div class="testimonial-stars">★★★★★</div>
            <blockquote>
              "I used to freeze during team meetings at my international job. The Business English course gave me the templates and vocabulary to speak with confidence."
            </blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background: var(--navy)">S</div>
              <div class="testimonial-author-info">
                <h4>Sarah Jenkins</h4>
                <p>Software Engineer, TechCorp</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card animate-on-scroll" data-delay="2">
            <div class="testimonial-stars">★★★★★</div>
            <blockquote>
              "Preparing for the IELTS felt impossible on my own. With the support of teachers at Verbal Vault, I achieved my target score of 7.5 on my first try!"
            </blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background: var(--teal)">D</div>
              <div class="testimonial-author-info">
                <h4>David Kim</h4>
                <p>Graduate Student, UCL</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card animate-on-scroll" data-delay="3">
            <div class="testimonial-stars">★★★★★</div>
            <blockquote>
              "The Speaking Club became my favorite part of the week. The debates are so engaging that I completely forgot I was speaking a foreign language."
            </blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background: var(--purple)">M</div>
              <div class="testimonial-author-info">
                <h4>Maria Rossi</h4>
                <p>Digital Marketer, Freelance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Frequently Asked Questions -->
    <section class="section">
      <div class="container">
        <div class="section-badge animate-on-scroll">Got Questions?</div>
        <h2 class="section-title animate-on-scroll">Frequently Asked Questions</h2>
        <p class="section-subtitle animate-on-scroll">
          Everything you need to know about our classes, schedules, and community.
        </p>
        
        <div class="faq-list animate-scale">
          <div class="faq-item">
            <button class="faq-question">
              <span>Who are these courses designed for?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-inner">
                Our courses cover all level categories, from total beginner to professional and academic prep. Whether you are seeking vocabulary expansion, fluency practice, or exam prep, we have a targeted plan for you.
              </div>
            </div>
          </div>
          
          <div class="faq-item">
            <button class="faq-question">
              <span>How are classes delivered?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-inner">
                We offer both online live streams (via high-quality classroom software) and local in-person sessions at our physical campus locations.
              </div>
            </div>
          </div>
          
          <div class="faq-item">
            <button class="faq-question">
              <span>Are there fixed schedules?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-inner">
                We have flexible group slots on mornings, afternoons, and weekends. Choose what fits your professional and personal lifestyle.
              </div>
            </div>
          </div>
          
          <div class="faq-item">
            <button class="faq-question">
              <span>Can I switch courses after registering?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-inner">
                Yes! We offer a flexible adjustment window during the first week of any term so you can settle on the right level and learning style.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Final Registration Call-To-Action -->
    <section class="cta-section animate-scale">
      <div class="container">
        <h2>Start Your Journey Today</h2>
        <p>Register today to claim a seat in our upcoming cohort and transform how you communicate.</p>
        <a href="#/register" class="btn btn-lg">REGISTER NOW</a>
      </div>
    </section>
  `;

  // Attach FAQ Interactivity
  const faqItems = container.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-icon').textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-icon').textContent = '−';
      }
    });
  });
}
