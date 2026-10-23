import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import PageHero from "../components/common/PageHero";
import CTABanner from "../components/common/CTABanner";
import Seo from "../components/common/Seo";
import FacultyFilter from "../components/faculty/FacultyFilter";
import FacultyGrid from "../components/faculty/FacultyGrid";
import FacultyProfileModal from "../components/faculty/FacultyProfileModal";
import { faculty } from "../data/faculty.js";
import { facultyPage } from "../data/facultyPage.js";
import { useEnquiry } from "../lib/EnquiryContext.jsx";
import "./Faculty.css";

export function Faculty() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openEnquiry } = useEnquiry();
  const { seo, hero, careersLink, cta } = facultyPage;

  // Extract unique subjects in order of first appearance
  const uniqueSubjects = useMemo(() => {
    const seen = new Set();
    const list = [];
    faculty.forEach((f) => {
      if (f.subject && !seen.has(f.subject)) {
        seen.add(f.subject);
        list.push(f.subject);
      }
    });
    return list;
  }, []);

  // Sync filter with URL ?subject=...
  const rawSubject = searchParams.get("subject");
  const selectedSubject =
    rawSubject && uniqueSubjects.includes(rawSubject) ? rawSubject : "All";

  // Filtered faculty list
  const filteredFaculty = useMemo(() => {
    if (selectedSubject === "All") return faculty;
    return faculty.filter((f) => f.subject === selectedSubject);
  }, [selectedSubject]);

  // Sync active teacher modal with URL ?teacher=...
  const teacherParam = searchParams.get("teacher");
  const activeTeacher = teacherParam
    ? faculty.find((f) => f.id === teacherParam) || null
    : null;

  const handleSelectSubject = (subj) => {
    const newParams = new URLSearchParams(searchParams);
    if (subj && subj !== "All") {
      newParams.set("subject", subj);
    } else {
      newParams.delete("subject");
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleClearFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("subject");
    setSearchParams(newParams, { replace: true });
  };

  const handleOpenProfile = (member) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("teacher", member.id);
    setSearchParams(newParams, { replace: true });
  };

  const handleCloseProfile = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("teacher");
    setSearchParams(newParams, { replace: true });
  };

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Faculty" }
  ];

  // Dynamic meta row computed from data: teacher count and subjects list
  const heroMeta = [
    `${faculty.length} teachers`,
    uniqueSubjects.join(" · ")
  ];

  return (
    <div className="faculty-page">
      <Seo title={seo.title} description={seo.description} />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="FACULTY"
        line="Experienced subject masters across Physics, Chemistry, Mathematics and Biology with dedicated daily mentorship."
        bgImage="/images/heroes/faculty-hero-bg.jpg"
      />

      {/* 2. Filter & Grid Section (Tone: Main) */}
      <Section tone="main" className="faculty-section--grid">
        <Container>
          <div className="faculty-layout">
            <FacultyFilter
              subjects={uniqueSubjects}
              facultyList={faculty}
              selectedSubject={selectedSubject}
              onSelectSubject={handleSelectSubject}
              onClear={handleClearFilter}
              filteredCount={filteredFaculty.length}
            />

            <FacultyGrid
              facultyList={filteredFaculty}
              onSelectMember={handleOpenProfile}
              selectedSubject={selectedSubject}
            />

            {/* Careers Link Line */}
            <div className="faculty-careers-line">
              <span className="body">{careersLink.line}</span>{" "}
              <Link to={careersLink.to} className="faculty-careers-link label">
                <span>{careersLink.label}</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. CTABanner (Tone: Light / Lichen) */}
      <CTABanner
        tone="light"
        title={cta.title}
        line={cta.line}
        primary={{
          label: cta.primary,
          onClick: () => openEnquiry({ message: cta.message })
        }}
      />

      {/* 4. Faculty Profile Modal */}
      <FacultyProfileModal
        member={activeTeacher}
        isOpen={Boolean(activeTeacher)}
        onClose={handleCloseProfile}
      />
    </div>
  );
}

export default Faculty;
