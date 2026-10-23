import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Container from "../common/Container";
import Breadcrumbs from "../common/Breadcrumbs";
import Badge from "../common/Badge";
import Button from "../common/Button";
import WhatsAppIcon from "../common/WhatsAppIcon";
import ImageWithFallback from "../common/ImageWithFallback";
import Reveal from "../animations/Reveal";
import { useEnquiry } from "../../lib/EnquiryContext";
import { siteConfig } from "../../data/siteConfig";
import { coursesPage } from "../../data/coursesPage";
import { formatRupees, formatDate } from "../../lib/format";
import { gsap, EASE, prefersReducedMotion } from "../../lib/motion";
import "./CourseDetailHero.css";

export function CourseDetailHero({ course, className = "" }) {
  const { openEnquiry } = useEnquiry();
  const factsRef = useRef(null);

  const batch = course?.batches?.[0] || {
    startDate: siteConfig.nextBatchDate,
    seatsLeft: 12
  };

  const { labels } = coursesPage.details;

  const facts = [
    { label: labels.level, value: course?.level },
    { label: labels.duration, value: course?.duration },
    { label: labels.mode, value: course?.mode },
    { label: labels.nextBatch, value: formatDate(batch.startDate) },
    { label: labels.seatsLeft, value: `${batch.seatsLeft} seats` },
    { label: labels.feeFrom, value: formatRupees(course?.fees?.total) }
  ];

  const waText = encodeURIComponent(
    `Hi MERITON, I want details about ${course?.title} (${course?.level}).`
  );
  const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${waText}`;

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Courses", to: "/courses" },
    { label: course?.title, to: null }
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = factsRef.current;
      if (!el) return;

      const cells = el.querySelectorAll(".course-facts-strip__cell");
      if (!cells.length) return;

      gsap.from(cells, {
        opacity: 0,
        y: 12,
        duration: 0.45,
        stagger: 0.06,
        ease: EASE.out,
        delay: 0.2
      });
    },
    { scope: factsRef, dependencies: [course] }
  );

  return (
    <section className={`course-detail-hero ${className}`} aria-labelledby="course-h1">
      <Container>
        <div className="course-detail-hero__layout">
          <div className="course-detail-hero__content">
            <div className="course-detail-hero__breadcrumbs">
              <Breadcrumbs items={breadcrumbs} />
            </div>

            <div className="course-detail-hero__badge-row">
              <Badge variant="accent">{course?.category}</Badge>
              <span className="course-detail-hero__level">{course?.level}</span>
            </div>

            <h1 id="course-h1" className="course-detail-hero__title display-l">
              {course?.title}
            </h1>

            <p className="course-detail-hero__summary body">
              {course?.summary}
            </p>

            <Reveal delay={0.15} className="course-detail-hero__actions">
              <Button
                variant="primary"
                onClick={() => openEnquiry({ course: course?.title })}
                showArrow
              >
                Enquire now
              </Button>
              <Button
                variant="secondary"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={<WhatsAppIcon size={16} />}
              >
                WhatsApp
              </Button>
            </Reveal>
          </div>

          <div className="course-detail-hero__media">
            <ImageWithFallback
              src={course?.image}
              alt={course?.title}
              ratio="4/3"
              duotone={true}
              label={course?.title}
            />
          </div>
        </div>

        {/* Facts Strip */}
        <div ref={factsRef} className="course-facts-strip" role="list" aria-label="Course key facts">
          {facts.map((fact) => (
            <div key={fact.label} className="course-facts-strip__cell" role="listitem">
              <span className="course-facts-strip__label">{fact.label}</span>
              <span className="course-facts-strip__value">{fact.value}</span>
            </div>
          ))}
        </div>
      </Container>
      <div className="course-detail-hero__ticks" aria-hidden="true" />
    </section>
  );
}

export default CourseDetailHero;
