# Verbal Vault

**Where Language Comes Alive** — A vibrant English learning community where communication, confidence, and growth come together.

## About

Verbal Vault is a modern single-page application for an English language learning center. It features course listings, event schedules, club activities, a student registration portal, and an admin dashboard — all wrapped in a premium, responsive design.

**Built with:**

- **[Vite](https://vite.dev/)** — Fast build tool and development server
- **Vanilla JavaScript** — No framework (React, Vue, etc.) — pure JS with ES modules
- **Vanilla CSS** — Custom design system with CSS variables, animations, and responsive layouts
- **[Inter](https://fonts.google.com/specimen/Inter)** — Google Font for modern typography

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally (development mode)

```bash
npm run dev
```

This starts the Vite dev server. Open the URL shown in the terminal (usually `http://localhost:5173`).

### 3. Build for production

```bash
npm run build
```

This creates an optimized production bundle in the `dist/` folder.

### 4. Preview the production build

```bash
npm run preview
```

This serves the production build locally so you can verify it before deploying.

## Project Structure

```
verbal-vault/
├── index.html              # Entry HTML file
├── package.json            # Project config & scripts
├── public/                 # Static assets (served as-is)
│   ├── favicon.svg         # Site favicon
│   └── logo.png            # Main logo
└── src/                    # Application source code
    ├── main.js             # App entry & router setup
    ├── style.css           # Complete stylesheet
    ├── components/         # Shared layout components
    │   ├── navbar.js       # Navigation bar
    │   └── footer.js       # Site footer
    ├── pages/              # Page view modules
    │   ├── home.js         # Home page
    │   ├── about.js        # About page
    │   ├── courses.js      # Courses listing
    │   ├── events.js       # Events & workshops
    │   ├── clubs.js        # Clubs & activities
    │   ├── contact.js      # Contact form
    │   ├── register.js     # Student registration
    │   └── admin.js        # Admin dashboard
    └── utils/              # Utility modules
        ├── router.js       # Hash-based SPA router
        └── storage.js      # LocalStorage helper
```

## Pages

| Route | Description |
|-------|-------------|
| `#/` | Home — hero section, featured courses, testimonials, FAQ |
| `#/about` | About — mission, values, statistics |
| `#/courses` | Courses — full course catalog |
| `#/events` | Events — upcoming workshops and seminars |
| `#/clubs` | Clubs — extracurricular social activities |
| `#/contact` | Contact — contact form and info |
| `#/register` | Register — student registration portal |
| `#/admin` | Admin — registration management dashboard |

## License

© Verbal Vault. All rights reserved.
