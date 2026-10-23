import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import SectionHeading from "../components/common/SectionHeading";
import PageHero from "../components/common/PageHero";
import CTABanner from "../components/common/CTABanner";
import Modal from "../components/common/Modal";
import Seo from "../components/common/Seo";
import TestimonialSlider from "../components/testimonials/TestimonialSlider";
import TestimonialFilter from "../components/testimonials/TestimonialFilter";
import TestimonialGrid from "../components/testimonials/TestimonialGrid";
import VideoTestimonialCard from "../components/testimonials/VideoTestimonialCard";
import { extractYouTubeId } from "../components/testimonials/youtube.js";
import { approvedTestimonials } from "../data/testimonials.js";
import { testimonialsPage } from "../data/testimonialsPage.js";
import { useEnquiry } from "../lib/EnquiryContext.jsx";
import "./Testimonials.css";

export function Testimonials() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openEnquiry } = useEnquiry();
  const { seo, hero, sections, controls, slider, video, empty, cta } = testimonialsPage;

  // Active video state for Modal playback
  const [activeVideo, setActiveVideo] = useState(null);

  // 1. Featured testimonials (only approved entries with featured: true)
  const featuredTestimonials = useMemo(() => {
    return approvedTestimonials.filter((t) => t.featured);
  }, []);

  // 2. Video testimonials (approved entries with a valid YouTube URL)
  const videoTestimonials = useMemo(() => {
    return approvedTestimonials.filter((t) => t.videoUrl && extractYouTubeId(t.videoUrl));
  }, []);

  // 3. Category & Author options with accurate counts for FilterChips
  const uniqueCategories = useMemo(() => ["JEE", "NEET", "Foundation"], []);

  const categoryCounts = useMemo(() => {
    return uniqueCategories.map((cat) => ({
      value: cat,
      label: cat,
      count: approvedTestimonials.filter((t) => t.category === cat).length
    }));
  }, [uniqueCategories]);

  const authorCounts = useMemo(() => {
    return (controls.authors || [
      { value: "student", label: "Students" },
      { value: "parent", label: "Parents" }
    ]).map((auth) => ({
      value: auth.value,
      label: auth.label,
      count: approvedTestimonials.filter((t) => t.author === auth.value).length
    }));
  }, [controls.authors]);

  // Sync state with URL search params: ?category=...&by=...
  const rawCategory = searchParams.get("category");
  const rawBy = searchParams.get("by");

  const selectedCategory =
    rawCategory && uniqueCategories.includes(rawCategory) ? rawCategory : "All";
  const selectedAuthor =
    rawBy && ["student", "parent"].includes(rawBy) ? rawBy : "All";

  // Filtered stories for masonry grid
  const filteredStories = useMemo(() => {
    return approvedTestimonials.filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      if (selectedAuthor !== "All" && item.author !== selectedAuthor) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedAuthor]);

  // URL update handlers with replace: true
  const handleSelectCategory = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat && cat !== "All") {
      newParams.set("category", cat);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSelectAuthor = (author) => {
    const newParams = new URLSearchParams(searchParams);
    if (author && author !== "All") {
      newParams.set("by", author);
    } else {
      newParams.delete("by");
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    newParams.delete("by");
    setSearchParams(newParams, { replace: true });
  };

  const hasActiveFilters = Boolean(
    selectedCategory !== "All" || selectedAuthor !== "All"
  );

  const filterKey = `${selectedCategory}-${selectedAuthor}`;

  // Breadcrumbs
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Testimonials" }
  ];

  // Dynamic meta row computed from approved data
  const heroMeta = useMemo(() => {
    const totalStories = approvedTestimonials.length;
    const hasStudents = approvedTestimonials.some((t) => t.author === "student");
    const hasParents = approvedTestimonials.some((t) => t.author === "parent");
    const audienceLabel =
      hasStudents && hasParents
        ? "Students and parents"
        : hasStudents
        ? "Students"
        : "Parents";

    const years = approvedTestimonials.map((t) => t.year).filter(Boolean);
    const minYear = years.length ? Math.min(...years) : 2025;
    const maxYear = years.length ? Math.max(...years) : 2026;
    const yearRange = minYear === maxYear ? String(minYear) : `${minYear} to ${maxYear}`;

    return [`${totalStories} stories`, audienceLabel, yearRange];
  }, []);

  return (
    <div className="testimonials-page">
      <Seo title={seo.title} description={seo.description} />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="TESTIMONIALS"
        line="Real stories, honest experiences, and verified feedback from MERITON students and proud parents."
        bgImage="/images/heroes/testimonials-hero-bg.jpg"
      />

      {/* 2. Featured Section (Tone: Main) */}
      {featuredTestimonials.length > 0 && (
        <Section tone="main" className="testimonials-section--featured">
          <Container>
            <SectionHeading
              index={sections.featured.index}
              label={sections.featured.label}
              title={sections.featured.title}
            />

            <TestimonialSlider
              testimonials={featuredTestimonials}
              labels={slider}
            />
          </Container>
        </Section>
      )}

      {/* 3. Stories Section (Tone: Light / Lichen) */}
      <Section tone="light" className="testimonials-section--stories">
        <Container>
          <SectionHeading
            index={sections.stories.index}
            label={sections.stories.label}
            title={sections.stories.title}
          />

          <TestimonialFilter
            categories={categoryCounts}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            selectedAuthor={selectedAuthor}
            onSelectAuthor={handleSelectAuthor}
            filteredCount={filteredStories.length}
            totalCount={approvedTestimonials.length}
            hasActiveFilters={hasActiveFilters}
            onClear={handleClear}
            controls={{
              ...controls,
              authors: authorCounts
            }}
          />

          <TestimonialGrid
            testimonials={filteredStories}
            emptyState={empty}
            onClear={handleClear}
            filterKey={filterKey}
          />
        </Container>
      </Section>

      {/* 4. Videos Section (Tone: Deep) - rendered only if approved video entries exist */}
      {videoTestimonials.length > 0 && (
        <Section tone="deep" className="testimonials-section--videos">
          <Container>
            <SectionHeading
              index={sections.videos.index}
              label={sections.videos.label}
              title={sections.videos.title}
            />

            <div
              className="testimonials-video-grid"
              role="list"
              aria-label="Student video testimonials"
            >
              {videoTestimonials.map((item) => (
                <div key={item.id} className="testimonials-video-grid__item" role="listitem">
                  <VideoTestimonialCard
                    testimonial={item}
                    onPlay={(t, vId) => setActiveVideo({ ...t, videoId: vId })}
                    playLabel={video.play}
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. CTABanner (Tone: Main) */}
      <CTABanner
        tone="main"
        title={cta.title}
        line={cta.line}
        primary={{
          label: cta.primary || "Enquire now",
          onClick: () => openEnquiry({ message: cta.message })
        }}
        secondary={{
          label: cta.secondary || "View results",
          to: "/results"
        }}
      />

      {/* 6. Video Playback Modal with privacy-enhanced YouTube iframe */}
      <Modal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.name ? `${activeVideo.name} - ${video.modalTitle}` : video.modalTitle}
      >
        {activeVideo && (
          <div className="video-player-modal">
            <div className="video-player-modal__frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                title={activeVideo.name ? `Video story of ${activeVideo.name}` : "Student story video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-player-modal__iframe"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Testimonials;
