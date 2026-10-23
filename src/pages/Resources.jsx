import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import SectionHeading from "../components/common/SectionHeading";
import PageHero from "../components/common/PageHero";
import CTABanner from "../components/common/CTABanner";
import Seo from "../components/common/Seo";
import ResourceFilter from "../components/resources/ResourceFilter";
import ResourceGrid from "../components/resources/ResourceGrid";
import { resources } from "../data/resources.js";
import { resourcesPage } from "../data/resourcesPage.js";
import { useEnquiry } from "../lib/EnquiryContext.jsx";
import "./Resources.css";

export function Resources() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openEnquiry } = useEnquiry();
  const { seo, hero, section, controls, card, empty, cta } = resourcesPage;

  // Extract unique classes in educational progression order
  const uniqueClasses = useMemo(() => {
    const order = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Dropper"];
    const present = new Set(resources.map((r) => r.class));
    return order.filter((c) => present.has(c));
  }, []);

  // Extract unique subjects in order of appearance
  const uniqueSubjects = useMemo(() => {
    const seen = new Set();
    const list = [];
    resources.forEach((r) => {
      if (r.subject && !seen.has(r.subject)) {
        seen.add(r.subject);
        list.push(r.subject);
      }
    });
    return list;
  }, []);

  // Extract unique types in order of appearance
  const uniqueTypes = useMemo(() => {
    const seen = new Set();
    const list = [];
    resources.forEach((r) => {
      if (r.type && !seen.has(r.type)) {
        seen.add(r.type);
        list.push(r.type);
      }
    });
    return list;
  }, []);

  // Sync state with URL search params (with fallback to 'All' for invalid values)
  const query = searchParams.get("q") || "";
  const rawClass = searchParams.get("class");
  const rawSubject = searchParams.get("subject");
  const rawType = searchParams.get("type");

  const selectedClass =
    rawClass && uniqueClasses.includes(rawClass) ? rawClass : "All";
  const selectedSubject =
    rawSubject && uniqueSubjects.includes(rawSubject) ? rawSubject : "All";
  const selectedType =
    rawType && uniqueTypes.includes(rawType) ? rawType : "All";

  // Filter logic: title, subject, type, class
  const filteredResources = useMemo(() => {
    const term = query.trim().toLowerCase();

    return resources.filter((item) => {
      if (selectedClass !== "All" && item.class !== selectedClass) return false;
      if (selectedSubject !== "All" && item.subject !== selectedSubject) return false;
      if (selectedType !== "All" && item.type !== selectedType) return false;

      if (term) {
        const matchTitle = item.title.toLowerCase().includes(term);
        const matchSubject = item.subject.toLowerCase().includes(term);
        const matchType = item.type.toLowerCase().includes(term);
        if (!matchTitle && !matchSubject && !matchType) return false;
      }

      return true;
    });
  }, [query, selectedClass, selectedSubject, selectedType]);

  // URL update handlers with replace: true
  const handleQueryChange = (val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val && val.trim()) {
      newParams.set("q", val.trim());
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSelectClass = (c) => {
    const newParams = new URLSearchParams(searchParams);
    if (c && c !== "All") {
      newParams.set("class", c);
    } else {
      newParams.delete("class");
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSelectSubject = (s) => {
    const newParams = new URLSearchParams(searchParams);
    if (s && s !== "All") {
      newParams.set("subject", s);
    } else {
      newParams.delete("subject");
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSelectType = (t) => {
    const newParams = new URLSearchParams(searchParams);
    if (t && t !== "All") {
      newParams.set("type", t);
    } else {
      newParams.delete("type");
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("q");
    newParams.delete("class");
    newParams.delete("subject");
    newParams.delete("type");
    setSearchParams(newParams, { replace: true });
  };

  const hasActiveFilters = Boolean(
    query.trim() ||
      selectedClass !== "All" ||
      selectedSubject !== "All" ||
      selectedType !== "All"
  );

  const filterKey = `${query}-${selectedClass}-${selectedSubject}-${selectedType}`;

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Resources" }
  ];

  // Dynamic meta row computed from data: total files, class range, subject count
  const heroMeta = [
    `${resources.length} files`,
    "Classes 8 to 12",
    `${uniqueSubjects.length} subjects`
  ];

  return (
    <div className="resources-page">
      <Seo title={seo.title} description={seo.description} />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="RESOURCES"
        line="Curated chapter notes, formula sheets, mock tests, and previous years' question papers."
        bgImage="/images/heroes/resources-hero-bg.jpg"
      />

      {/* 2. Library Section (Tone: Main) */}
      <Section tone="main" className="resources-page__library-section">
        <Container>
          <SectionHeading
            index={section.index}
            label={section.label}
            title={section.title}
          />

          <ResourceFilter
            query={query}
            onQueryChange={handleQueryChange}
            classes={uniqueClasses}
            selectedClass={selectedClass}
            onSelectClass={handleSelectClass}
            subjects={uniqueSubjects}
            selectedSubject={selectedSubject}
            onSelectSubject={handleSelectSubject}
            types={uniqueTypes}
            selectedType={selectedType}
            onSelectType={handleSelectType}
            filteredCount={filteredResources.length}
            totalCount={resources.length}
            hasActiveFilters={hasActiveFilters}
            onClear={handleClear}
            controls={controls}
          />

          <ResourceGrid
            resources={filteredResources}
            downloadLabel={card.download}
            emptyState={empty}
            onClear={handleClear}
            filterKey={filterKey}
          />
        </Container>
      </Section>

      {/* 3. CTABanner (Tone: Light / Lichen) */}
      <CTABanner
        tone="light"
        title={cta.title}
        line={cta.line}
        primary={{
          label: cta.primary || "Enquire now",
          onClick: () => openEnquiry({ message: cta.message })
        }}
        secondary={{
          label: cta.secondary || "Contact us",
          to: "/contact"
        }}
      />
    </div>
  );
}

export default Resources;
