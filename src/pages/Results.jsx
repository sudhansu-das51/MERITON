import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import SectionHeading from "../components/common/SectionHeading";
import PageHero from "../components/common/PageHero";
import FilterChips from "../components/common/FilterChips";
import EmptyState from "../components/common/EmptyState";
import CTABanner from "../components/common/CTABanner";
import Seo from "../components/common/Seo";
import CountUp from "../components/animations/CountUp";

import ResultStatsBar from "../components/results/ResultStatsBar";
import YearTabs from "../components/results/YearTabs";
import ToppersGrid from "../components/results/ToppersGrid";
import ResultsDisclaimer from "../components/results/ResultsDisclaimer";
import AwardsGrid from "../components/results/AwardsGrid";
import AchievementsTimeline from "../components/results/AchievementsTimeline";

import { results } from "../data/results.js";
import { resultsPage } from "../data/resultsPage.js";
import { useEnquiry } from "../lib/EnquiryContext.jsx";
import "./Results.css";

export function Results() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openEnquiry } = useEnquiry();
  const { seo, hero, sections, controls, summary, empty, cta } = resultsPage;

  // 1. Available years (newest first)
  const availableYears = results.years;
  const defaultYear = availableYears[0].year;

  // 2. Active year from URL (?year=...)
  const yearParam = searchParams.get("year");
  const isYearValid = availableYears.some((y) => String(y.year) === yearParam);
  const activeYear = isYearValid ? Number(yearParam) : defaultYear;

  const selectedYearData =
    availableYears.find((y) => y.year === activeYear) || availableYears[0];

  // 3. Derived exam chips for selected year's toppers
  const yearExams = useMemo(() => {
    const list = [];
    selectedYearData.toppers.forEach((t) => {
      if (t.exam && !list.includes(t.exam)) {
        list.push(t.exam);
      }
    });
    return list;
  }, [selectedYearData]);

  // 4. Active exam from URL (?exam=...)
  const examParam = searchParams.get("exam");
  const isExamValid = examParam && yearExams.includes(examParam);
  const activeExam = isExamValid ? examParam : "All";

  // Exam filter chips options with counts
  const examChipOptions = useMemo(() => {
    const options = [
      {
        value: "All",
        label: controls.allLabel,
        count: selectedYearData.toppers.length
      }
    ];

    yearExams.forEach((exam) => {
      const count = selectedYearData.toppers.filter((t) => t.exam === exam).length;
      options.push({
        value: exam,
        label: exam,
        count
      });
    });

    return options;
  }, [yearExams, selectedYearData.toppers, controls.allLabel]);

  // 5. Update params with replace
  const handleYearChange = (newYear) => {
    const params = new URLSearchParams(searchParams);
    params.set("year", newYear);

    // If current exam does not exist in new year's toppers, reset exam
    const targetYearData = availableYears.find((y) => y.year === newYear);
    const targetExams = new Set((targetYearData?.toppers || []).map((t) => t.exam));
    if (examParam && !targetExams.has(examParam)) {
      params.delete("exam");
    }

    setSearchParams(params, { replace: true });
  };

  const handleExamChange = (newExam) => {
    const params = new URLSearchParams(searchParams);
    if (newExam && newExam !== "All") {
      params.set("exam", newExam);
    } else {
      params.delete("exam");
    }
    setSearchParams(params, { replace: true });
  };

  // 6. Filtered toppers
  const filteredToppers = useMemo(() => {
    if (activeExam === "All") return selectedYearData.toppers;
    return selectedYearData.toppers.filter((t) => t.exam === activeExam);
  }, [selectedYearData, activeExam]);

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Results" }
  ];

  // Dynamic meta row computed from data
  const heroMeta = [
    `${availableYears[0].year} results`,
    `${(results.stats.find((s) => s.label.includes("Selections"))?.value || availableYears[0].summary.selections).toLocaleString("en-IN")} selections`,
    `${availableYears.length} years on record`
  ];

  return (
    <div className="results-page">
      <Seo title={seo.title} description={seo.description} />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="RESULTS"
        line="Measurable academic excellence across JEE, NEET, and Olympiads year after year."
        bgImage="/images/heroes/results-hero-bg.jpg"
      />

      {/* 2. Stats Bar (Tone: Main) */}
      <Section tone="main" className="results-section--stats">
        <Container>
          <ResultStatsBar />
        </Container>
      </Section>

      {/* 3. Toppers Section (Tone: Light / Lichen) */}
      <Section tone="light" className="results-section--toppers">
        <Container>
          <div className="results-toppers-layout">
            <div className="results-toppers-header">
              <SectionHeading
                index={sections.toppers.index}
                label={sections.toppers.label}
                title={sections.toppers.title}
              />

              {/* Year Tabs */}
              <div className="results-year-tabs-wrap">
                <YearTabs
                  years={availableYears}
                  selectedYear={activeYear}
                  onChange={handleYearChange}
                />
              </div>
            </div>

            {/* Filter Chips & Year Summary Row */}
            <div className="results-controls-bar">
              <div className="results-exam-chips-wrap">
                <FilterChips
                  options={examChipOptions}
                  value={activeExam}
                  onChange={handleExamChange}
                  ariaLabel={controls.examAria}
                />
              </div>

              {/* Year Summary Live Line */}
              <div className="results-summary-line label numeral" aria-live="polite">
                <span className="results-summary-selections">
                  <CountUp
                    key={selectedYearData.year}
                    value={selectedYearData.summary.selections}
                    duration={1.2}
                  />{" "}
                  {summary.selections}
                </span>
                <span className="results-summary-sep" aria-hidden="true">
                  &middot;
                </span>
                <span className="results-summary-best">
                  {summary.best} {selectedYearData.summary.best}
                </span>
              </div>
            </div>

            {/* Toppers Grid or Empty State */}
            {filteredToppers.length > 0 ? (
              <ToppersGrid
                toppers={filteredToppers}
                filterKey={`${activeYear}-${activeExam}`}
              />
            ) : (
              <EmptyState title={empty.title} line={empty.line} />
            )}

            {/* Disclaimer */}
            <ResultsDisclaimer />
          </div>
        </Container>
      </Section>

      {/* 4. Awards Section (Tone: Deep) */}
      <Section tone="deep" className="results-section--awards">
        <Container>
          <div className="results-awards-layout">
            <SectionHeading
              index={sections.awards.index}
              label={sections.awards.label}
              title={sections.awards.title}
            />

            <AwardsGrid awards={results.awards} />
          </div>
        </Container>
      </Section>

      {/* 5. Achievements Timeline (Tone: Main) */}
      <Section tone="main" className="results-section--achievements">
        <Container>
          <div className="results-achievements-layout">
            <SectionHeading
              index={sections.achievements.index}
              label={sections.achievements.label}
              title={sections.achievements.title}
            />

            <AchievementsTimeline items={results.timeline} />
          </div>
        </Container>
      </Section>

      {/* 6. CTABanner (Tone: Light / Lichen) */}
      <CTABanner
        tone="light"
        title={cta.title}
        line={cta.line}
        primary={{
          label: "Enquire now",
          onClick: () => openEnquiry()
        }}
        secondary={{
          label: "View courses",
          to: "/courses"
        }}
      />
    </div>
  );
}

export default Results;
