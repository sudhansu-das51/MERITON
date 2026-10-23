import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import CTABanner from "../components/common/CTABanner";
import Seo from "../components/common/Seo";
import CoursesHero from "../components/courses/CoursesHero";
import CourseFilterBar from "../components/courses/CourseFilterBar";
import CourseGrid from "../components/courses/CourseGrid";
import { courses, courseCategories } from "../data/courses";
import { coursesPage } from "../data/coursesPage";
import { siteConfig } from "../data/siteConfig";
import { useEnquiry } from "../lib/EnquiryContext";
import "./Courses.css";

export function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openEnquiry } = useEnquiry();

  const { seo, hero, controls, empty, cta } = coursesPage.listing;

  // Category and Search query from URL params
  const categoryParam = searchParams.get("category");
  const rawCategory = categoryParam && courseCategories.includes(categoryParam)
    ? categoryParam
    : "All";

  const searchQuery = searchParams.get("q") || "";

  // Helper to update search params with replace (doesn't pollute browser history)
  const updateParams = (newCat, newQ) => {
    const params = new URLSearchParams();
    if (newCat && newCat !== "All") params.set("category", newCat);
    if (newQ && newQ.trim()) params.set("q", newQ.trim());
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (val) => {
    updateParams(val, searchQuery);
  };

  const handleSearchChange = (val) => {
    updateParams(rawCategory, val);
  };

  const handleClear = () => {
    updateParams("All", "");
  };

  const hasActiveFilters = rawCategory !== "All" || Boolean(searchQuery.trim());

  // Dynamic filter chips calculation
  const chipOptions = useMemo(() => {
    const counts = {
      All: courses.length,
      JEE: courses.filter((c) => c.category === "JEE").length,
      NEET: courses.filter((c) => c.category === "NEET").length,
      Foundation: courses.filter((c) => c.category === "Foundation").length
    };

    return [
      { value: "All", label: controls.allLabel, count: counts.All },
      { value: "JEE", label: "JEE", count: counts.JEE },
      { value: "NEET", label: "NEET", count: counts.NEET },
      { value: "Foundation", label: "Foundation", count: counts.Foundation }
    ];
  }, [controls.allLabel]);

  // Filter courses based on active category & search query
  const filteredCourses = useMemo(() => {
    const list = courses.filter((course) => {
      if (rawCategory !== "All" && course.category !== rawCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = course.title?.toLowerCase().includes(q);
        const matchLevel = course.level?.toLowerCase().includes(q);
        const matchCategory = course.category?.toLowerCase().includes(q);
        if (!matchTitle && !matchLevel && !matchCategory) {
          return false;
        }
      }
      return true;
    });

    // When viewing "All" without search, interleave / mix categories evenly
    // (JEE, NEET, Foundation, JEE, NEET, Foundation...) so it's a diverse catalog
    if (rawCategory === "All" && !searchQuery.trim()) {
      const jee = list.filter((c) => c.category === "JEE");
      const neet = list.filter((c) => c.category === "NEET");
      const foundation = [
        ...list.filter((c) => c.category === "Foundation" && c.featured),
        ...list.filter((c) => c.category === "Foundation" && !c.featured)
      ];
      const mixed = [];
      const maxLen = Math.max(jee.length, neet.length, foundation.length);
      for (let i = 0; i < maxLen; i++) {
        if (jee[i]) mixed.push(jee[i]);
        if (neet[i]) mixed.push(neet[i]);
        if (foundation[i]) mixed.push(foundation[i]);
      }
      return mixed;
    }

    return list;
  }, [rawCategory, searchQuery]);

  const waText = encodeURIComponent(
    "Hi MERITON, I want help selecting a course batch for JEE / NEET / Foundation."
  );
  const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${waText}`;

  return (
    <div className="courses-page">
      <Seo title={seo.title} description={seo.description} />

      {/* Hero with unique background and left-aligned minimal layout */}
      <CoursesHero
        title="COURSES"
        line={hero.line}
        batchInfo="Batches start from 5 April to 20 May 2027"
      />

      {/* Listing (Tone: Main) */}
      <Section tone="main" className="courses-listing-section">
        <Container>
          <CourseFilterBar
            chipOptions={chipOptions}
            activeCategory={rawCategory}
            onCategoryChange={handleCategoryChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            filteredCount={filteredCourses.length}
            totalCount={courses.length}
            hasActiveFilters={hasActiveFilters}
            onClear={handleClear}
          />

          {filteredCourses.length > 0 ? (
            <CourseGrid courses={filteredCourses} />
          ) : (
            <EmptyState
              title={empty.title}
              line={empty.line}
            >
              <Button variant="secondary" onClick={handleClear}>
                {controls.clear}
              </Button>
              <Button variant="primary" onClick={() => openEnquiry()} showArrow>
                Enquire now
              </Button>
            </EmptyState>
          )}
        </Container>
      </Section>

      {/* CTA Banner (Tone: Light / Lichen) */}
      <CTABanner
        tone="light"
        title={cta.title}
        line={cta.line}
        primary={{
          label: "Enquire now",
          onClick: () => openEnquiry()
        }}
        secondary={{
          label: "WhatsApp",
          href: waUrl
        }}
      />
    </div>
  );
}

export default Courses;
