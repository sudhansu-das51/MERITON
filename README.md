# MERITON

> Premium coaching academy web application for JEE, NEET, and Foundation programs (Classes 8 to 12). Built with React 19, Vite, and GSAP.

---

## 1. Overview & Tech Stack

MERITON is a high-performance, responsive academic web application designed around an editorial "marksheet" design system featuring ruled hairlines, tabular data alignment, deep forest greens, lichen accents, and crisp typography.

- **Framework**: React 19 + Vite
- **Routing**: React Router v7 (`BrowserRouter` with SPA rewrites)
- **Animation & Physics**:
  - GSAP 3 + ScrollTrigger + `@gsap/react`
  - Lenis (smooth inertial scrolling)
  - Anime.js v4 (micro-interactions, icons, counter easing)
  - Matter.js (interactive 2D physics badge canvas on About page)
- **Styling**: Vanilla CSS with Design System Tokens in `src/index.css` (No Tailwind, zero `#fff`/pure white)
- **Icons**: Lucide React
- **Typography**: Instrument Serif, Hanken Grotesk, DM Mono (Google Fonts)

---

## 2. Quick Start & Scripts

Ensure Node.js (v18+) is installed.

```bash
# Install dependencies
npm install

# Start development server (defaults to port 5173)
npm run dev

# Run oxlint linter
npm run lint

# Build production bundle to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 3. Project Structure

```
meriton/
├── public/
│   ├── _redirects              # Netlify SPA rewrite fallback
│   ├── files/                  # Real sample download assets
│   │   ├── notices/            # Academy notice PDFs
│   │   └── resources/          # Study material & syllabus PDFs
│   └── images/                 # Optimized web imagery & fallbacks
├── src/
│   ├── assets/                 # SVGs and logos
│   ├── components/             # Reusable UI component modules
│   │   ├── about/              # About page sections & Matter.js canvas
│   │   ├── admissions/         # Admission process, fee tables, form section
│   │   ├── animations/         # GSAP Reveal, CountUp, TextReveal, StaggerGroup
│   │   ├── careers/            # Job disclosures, intro stats, Why MERITON grid
│   │   ├── common/             # Button, Card, PageHero, Accordion, Modal, etc.
│   │   ├── contact/            # Branch cards, hours, Map section
│   │   ├── courses/            # Course grid, filter chips, detail modules
│   │   ├── faculty/            # Faculty profiles, branch filter, experience badges
│   │   ├── faq/                # Search bar, category chips, grouped accordion, CTA
│   │   ├── forms/              # InputField, FileUploadField, AdmissionForm, etc.
│   │   ├── home/               # Hero, stats, methodology, ledger, preview sections
│   │   ├── layout/             # Header, Footer, Navbar, MobileMenu, ScrollToTop
│   │   ├── legal/              # TableOfContents, LegalSection, LegalPageLayout
│   │   ├── news/               # News cards, events schedule, notices table, tabs
│   │   ├── resources/          # Resource card grid, format filter, download buttons
│   │   ├── results/            # Ranker cards, statistics ledger, historical tabs
│   │   └── testimonials/       # Student quote cards, video modal, parent reviews
│   ├── data/                   # Single source of truth for all copy & content
│   ├── lib/                    # Helpers: motion, smoothScroll, validators, format
│   ├── pages/                  # Top-level page routes (all 13 lazy-loaded)
│   ├── App.jsx                 # App shell, suspense boundary, route array
│   ├── main.jsx                # Entry point
│   └── index.css               # Design tokens, reset, typography, themes
├── vercel.json                 # Vercel SPA rewrites configuration
└── README.md
```

---

## 4. How to Edit Content

All text, courses, schedules, teachers, statistics, and policies are decoupled from JSX and stored in `src/data/*`:

| File | Controls |
|---|---|
| [`src/data/siteConfig.js`](src/data/siteConfig.js) | Academy phone, WhatsApp numbers, emails, addresses, social links, navigation menus, and global banner announcement. |
| [`src/data/courses.js`](src/data/courses.js) | Syllabus, batches, duration, fees, eligibility, and feature highlights for JEE, NEET, and Foundation courses. |
| [`src/data/coursesPage.js`](src/data/coursesPage.js) | Headings, filter chips, and comparison matrix for the Courses directory. |
| [`src/data/faculty.js`](src/data/faculty.js) | Faculty names, qualifications, subjects, experience, branch assignment, and bios. |
| [`src/data/results.js`](src/data/results.js) | AIR ranks, percentile scores, historical year statistics, and university selections. |
| [`src/data/testimonials.js`](src/data/testimonials.js) | Student and parent success stories, quotes, photos, video links, and verification status. |
| [`src/data/news.js`](src/data/news.js) | Announcements, seminar events schedule, and downloadable official academy notices. |
| [`src/data/resources.js`](src/data/resources.js) | Study modules, previous year question papers, formula books, and download links. |
| [`src/data/jobs.js`](src/data/jobs.js) | Open faculty, counselor, and administrative positions, job descriptions, and criteria. |
| [`src/data/faqs.js`](src/data/faqs.js) | 20 parent and student questions categorized into Admissions, Batches, Fees, Tests, and Campus. |
| [`src/data/admissions.js`](src/data/admissions.js) | Step-by-step admission workflow, eligibility rules, required certificates, and scholarship slabs. |
| [`src/data/branches.js`](src/data/branches.js) | Campus physical locations, opening hours, local phone lines, and branch coordinators. |
| [`src/data/legal.js`](src/data/legal.js) | Full legal clauses for Privacy Policy, Terms & Conditions, and Fee Refund Policy. |

---

## 5. Replacing Dummy Assets

- **Images (`public/images/`)**:
  - Replace placeholder photography with high-resolution JPG or WebP assets.
  - Keep filenames aligned with `src/data/faculty.js`, `testimonials.js`, and `courses.js`.
  - Recommended dimensions:
    - Faculty portraits: 600x750px (4:5 ratio)
    - Course covers: 800x450px (16:9 ratio)
    - Testimonial student photos: 400x400px (1:1 ratio)
- **PDF Documents (`public/files/`)**:
  - Store sample test papers, answer keys, and syllabus documents in `public/files/resources/`.
  - Store official notices in `public/files/notices/`.
  - Keep filenames matching the `fileUrl` property in `src/data/resources.js` and `src/data/news.js`. Update the `size` string (e.g. `1.4 MB`) to reflect real file sizes.

---

## 6. Design & Motion System

### Design Tokens (`src/index.css`)
- **Palette**: Strictly semantic tokens.
  - Deep Forest base: `--forest-950` (`#06201A`), `--forest-900` (`#0A2E25`), `--forest-800` (`#0F3D32`), `--forest-700` (`#1A5242`)
  - Accent / Lichen: `--lichen` (`#B9D1C3`)
  - Accent / Primary CTA: `--chartreuse` (`#D2F04B`)
  - Secondary Highlight: `--ice` (`#8CD6E6`)
  - Text & Accents: `--mist` (`#DCEBE3`), `--sage` (`#9DBBAE`)
  - *No pure `#fff` or white backgrounds anywhere in custom component styles.*
- **Typography**:
  - Display & Numerals: *Instrument Serif*
  - Body & Paragraphs: *Hanken Grotesk*
  - Labels & Metadata: *DM Mono*

### Motion Guidelines
- Global Lenis smooth scrolling with GSAP ScrollTrigger synchronization.
- Anime.js v4 for button arrow micro-motion, drop-zone feedback, and counter easing.
- Full respect for `prefers-reduced-motion`: When active, animations are disabled, transitions complete immediately, and Lenis smooth scrolling is bypassed.

---

## 7. Enquiry & Lead Handling

The website routes user inquiries and applications directly over WhatsApp with pre-filled, structured messages via `src/lib/submitEnquiry.js`:
- Supported message types: `enquiry`, `admission`, `contact`, and `job`.
- Format starts with clear headers like `Admission application.` or `Job application.` followed by fields and values.
- *How to switch to a REST API or CRM later*:
  Open `src/lib/submitEnquiry.js` and replace `window.open(whatsappUrl)` with a `fetch("/api/leads", { method: "POST", body: JSON.stringify(...) })` call.

---

## 8. Known Limitations

1. **Dummy Content**: All faculty profiles, student ranks, course schedules, and notices are realistic dummy data for demonstration.
2. **Resume Attachment**: WhatsApp URLs cannot transmit file binaries. The careers form prompts applicants to email their resume directly to the academy careers desk via a pre-filled `mailto:` link. Attaching files requires an active backend API or S3 bucket integration.
3. **Legal Text**: Policies in `src/data/legal.js` are clear templates and must be verified and approved by the academy's legal advisor before commercial deployment.

---

## 9. Pre-Launch Checklist

- [ ] Update `siteConfig.js` with verified academy phone numbers, WhatsApp lines, and branch addresses.
- [ ] Connect Google Maps embed URLs for branches in `src/data/branches.js`.
- [ ] Replace dummy faculty portraits and course thumbnail photos with verified photography.
- [ ] Verify previous year rank lists and topper marksheets in `src/data/results.js`.
- [ ] Confirm fee installment schedules and scholarship waiver percentages with academy management.
- [ ] Have the academy's legal team review and approve `src/data/legal.js`.
- [ ] Replace sample PDF files with genuine syllabus and question paper documents.

---

## 10. Deployment

Direct visits to deep routes (e.g. `/courses/jee-two-year`, `/privacy-policy#terms`) require the host to serve `index.html` for all paths:
- **Netlify**: Pre-configured via [`public/_redirects`](public/_redirects).
- **Vercel**: Pre-configured via [`vercel.json`](vercel.json).
- *Tip*: Keep the configuration file that corresponds to your chosen host and delete the other if desired.
