import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import {
  Atom,
  FlaskConical,
  Pi,
  Leaf,
  BookOpen,
  FileText,
  ArrowUpRight,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { subjectsCurriculum } from "../../data/subjects.js";
import { homeContent } from "../../data/home.js";
import { gsap, prefersReducedMotion } from "../../lib/motion.js";
import "./SubjectsPlayground.css";

// Helper for subject capsule icon
function SubjectCapsuleIcon({ name, size = 18 }) {
  if (name === "Atom") return <Atom size={size} aria-hidden="true" />;
  if (name === "FlaskConical") return <FlaskConical size={size} aria-hidden="true" />;
  if (name === "Pi") return <Pi size={size} aria-hidden="true" />;
  if (name === "Leaf") return <Leaf size={size} aria-hidden="true" />;
  return <BookOpen size={size} aria-hidden="true" />;
}

export function SubjectsPlayground() {
  const { sections } = homeContent;
  const [activeId, setActiveId] = useState(subjectsCurriculum[0].id);

  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const imageRef = useRef(null);
  const statsCardRef = useRef(null);
  const tabRefs = useRef({});

  const activeSubject =
    subjectsCurriculum.find((s) => s.id === activeId) || subjectsCurriculum[0];

  // GSAP animated transition when switching active subject
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const leftContent = leftContentRef.current;
      const img = imageRef.current;
      const stats = statsCardRef.current;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (leftContent) {
        tl.fromTo(
          leftContent.querySelectorAll(
            ".subject-split__eyebrow, .subject-split__headline, .subject-split__desc"
          ),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 }
        );

        tl.fromTo(
          leftContent.querySelectorAll(".subject-topic-row"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.04 },
          "-=0.2"
        );

        tl.fromTo(
          leftContent.querySelector(".subject-split__footer"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3 },
          "-=0.15"
        );
      }

      if (img) {
        gsap.fromTo(
          img,
          { opacity: 0.2, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
        );
      }

      if (stats) {
        gsap.fromTo(
          stats,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, delay: 0.1, ease: "power2.out" }
        );
      }
    },
    { dependencies: [activeId], scope: containerRef }
  );

  // Keyboard navigation for tablist
  const handleKeyDown = (e, index) => {
    const count = subjectsCurriculum.length;
    let nextIndex = index;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % count;
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + count) % count;
      e.preventDefault();
    } else if (e.key === "Home") {
      nextIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      nextIndex = count - 1;
      e.preventDefault();
    }

    if (nextIndex !== index) {
      const nextId = subjectsCurriculum[nextIndex].id;
      setActiveId(nextId);
      if (tabRefs.current[nextId]) {
        tabRefs.current[nextId].focus();
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="subjects-section section section--deep"
      aria-labelledby="subjects-heading"
    >
      <div className="container">
        {/* Section Header: Title on Left, Capsule Buttons on Right */}
        <div className="subjects-header-bar">
          <div className="subjects-header-bar__title-block">
            <h2 id="subjects-heading" className="subjects-header-bar__title">
              {sections.subjects.title}
            </h2>
            <p className="subjects-header-bar__subtitle">
              {sections.subjects.subtitle || "A clear path through every topic."}
            </p>
          </div>

          {/* Capsule Filter Buttons */}
          <div
            className="subjects-capsules"
            role="tablist"
            aria-label="Subject Selector"
          >
            {subjectsCurriculum.map((subject, idx) => {
              const isActive = subject.id === activeId;
              return (
                <button
                  key={subject.id}
                  ref={(el) => (tabRefs.current[subject.id] = el)}
                  role="tab"
                  id={`tab-btn-${subject.id}`}
                  aria-controls={`panel-sub-${subject.id}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`subject-capsule-btn ${
                    isActive ? "subject-capsule-btn--active" : ""
                  }`}
                  onClick={() => setActiveId(subject.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  <SubjectCapsuleIcon name={subject.iconName} size={18} />
                  <span>{subject.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Split Container: Left Content & Right Image */}
        <div
          id={`panel-sub-${activeSubject.id}`}
          role="tabpanel"
          aria-labelledby={`tab-btn-${activeSubject.id}`}
          className="subject-split-card"
        >
          {/* Left Column: Subject Details & Topics */}
          <div ref={leftContentRef} className="subject-split__left">
            <div className="subject-split__eyebrow label">
              <span aria-hidden="true">—</span>
              <span>{activeSubject.eyebrow}</span>
            </div>

            <h3 className="subject-split__headline">
              <span>{activeSubject.headlinePart1}</span>
              <br />
              <span>{activeSubject.headlinePart2}</span>
            </h3>

            <p className="subject-split__desc">{activeSubject.description}</p>

            {/* Topic Rows */}
            <div className="subject-topics-list">
              {activeSubject.topics.map((t) => (
                <div key={t.num} className="subject-topic-row">
                  <div className="subject-topic-row__lead">
                    <span className="subject-topic-row__num">{t.num}</span>
                    <h4 className="subject-topic-row__title">{t.title}</h4>
                  </div>

                  <div className="subject-topic-row__desc">{t.desc}</div>

                  <div className="subject-topic-row__count label">
                    <FileText size={15} aria-hidden="true" />
                    <span>{t.count}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row: Progress Bar & Syllabus Link */}
            <div className="subject-split__footer">
              <div className="subject-progress-block">
                <div
                  className="subject-progress-track"
                  role="progressbar"
                  aria-valuenow={activeSubject.progressValue}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${activeSubject.name} curriculum depth`}
                >
                  <div
                    className="subject-progress-fill"
                    style={{ width: `${activeSubject.progressValue}%` }}
                  />
                </div>
                <span className="subject-progress-label label">
                  {activeSubject.progressLabel}
                </span>
              </div>

              <Link
                to="/courses"
                className="subject-syllabus-link label"
                aria-label={`View full syllabus for ${activeSubject.name}`}
              >
                <span>View full syllabus</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Image with Embedded Floating Stats Card */}
          <div className="subject-split__right">
            <div className="subject-split__image-wrap">
              <img
                ref={imageRef}
                src={activeSubject.image}
                alt={`${activeSubject.name} study desk with handwritten notes and textbooks`}
                className="subject-split__image"
                loading="eager"
              />
              <div className="subject-split__image-overlay" aria-hidden="true" />
            </div>

            {/* Floating Glassmorphic Stats Overlay Card */}
            <div ref={statsCardRef} className="subject-floating-stats">
              <div className="subject-stat-col">
                <BookOpen size={20} className="subject-stat-col__icon" aria-hidden="true" />
                <div className="subject-stat-col__text">
                  <span className="subject-stat-col__val">{activeSubject.stats.topics}</span>
                  <span className="subject-stat-col__lbl label">{activeSubject.stats.topicsLabel}</span>
                </div>
              </div>

              <div className="subject-stat-divider" aria-hidden="true" />

              <div className="subject-stat-col">
                <Calendar size={20} className="subject-stat-col__icon" aria-hidden="true" />
                <div className="subject-stat-col__text">
                  <span className="subject-stat-col__val">{activeSubject.stats.weeks}</span>
                  <span className="subject-stat-col__lbl label">{activeSubject.stats.weeksLabel}</span>
                </div>
              </div>

              <div className="subject-stat-divider" aria-hidden="true" />

              <div className="subject-stat-col">
                <CheckCircle2 size={20} className="subject-stat-col__icon" aria-hidden="true" />
                <div className="subject-stat-col__text">
                  <span className="subject-stat-col__val subject-stat-col__val--serif">
                    {activeSubject.stats.practice}
                  </span>
                  <span className="subject-stat-col__lbl label">{activeSubject.stats.practiceLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubjectsPlayground;
