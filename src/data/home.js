// DUMMY DATA - replace with verified academy information.
export const homeContent = {
  hero: {
    eyebrow: "Admissions 2027-28 · New batches from 5 April",
    headline: "Serious preparation, *tracked* weekly.",
    subline: "JEE, NEET and Foundation for Classes 8 to 12 and droppers. Weekly tests, ranked and reviewed.",
    primaryCta: { label: "Explore courses", to: "/courses" },
    secondaryCta: { label: "Enquire now" },
    sheet: {
      title: "Weekly test 24 / JEE Main pattern",
      student: "Aarav N.",
      rows: [
        { subject: "Physics", score: 88, max: 100 },
        { subject: "Chemistry", score: 79, max: 100 },
        { subject: "Mathematics", score: 94, max: 100 }
      ],
      total: 261,
      totalMax: 300,
      rank: "3 / 40",
      trend: [188, 201, 196, 219, 224, 238, 247, 261]
    }
  },
  why: [
    {
      n: "01",
      title: "Weekly ranked tests",
      line: "Every Sunday, ranked and reviewed in class.",
      metric: "52 a year",
      image: "/images/why/why-weekly-tests.jpg",
      alt: "OMR answer sheet and weekly exam paper"
    },
    {
      n: "02",
      title: "Small batches",
      line: "40 seats per batch. No overflow rooms.",
      metric: "Max 40",
      image: "/images/why/why-small-batches.jpg",
      alt: "Disciplined small-batch classroom of 40 students"
    },
    {
      n: "03",
      title: "Daily doubt hours",
      line: "Two hours after class with the subject teacher.",
      metric: "2 hrs",
      image: "/images/why/why-doubt-hours.jpg",
      alt: "1-on-1 teacher doubt clearing and academic mentorship"
    },
    {
      n: "04",
      title: "Printed study packs",
      line: "Chapter sheets and problem banks, issued monthly.",
      metric: "Monthly",
      image: "/images/why/why-study-packs.jpg",
      alt: "Printed chapter modules and question bank workbooks"
    },
    {
      n: "05",
      title: "Parent reports",
      line: "Attendance and test scores shared every month.",
      metric: "12 a year",
      image: "/images/why/why-parent-reports.jpg",
      alt: "Monthly academic performance report card"
    }
  ],
  subjects: [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Mechanics",
    "Organic",
    "Calculus",
    "Optics",
    "Genetics",
    "Thermodynamics",
    "Algebra",
    "Electrostatics",
    "Kinematics",
    "Ecology"
  ],
  sections: {
    courses: { index: "01", label: "Courses", title: "Batches filling now", linkLabel: "All courses" },
    why: { index: "02", label: "Why MERITON", title: "Built around the weekly test" },
    subjects: { index: "03", label: "SUBJECTS", title: "Every subject, one plan", subtitle: "A clear path through every topic." },
    results: { index: "04", label: "Results", title: "2026 results", linkLabel: "All results" },
    faculty: { index: "05", label: "Faculty", title: "Who teaches you", linkLabel: "All faculty" },
    testimonials: { index: "06", label: "Students", title: "Students, in their words" },
    resourcesNotices: { index: "07", label: "Resources", title: "Study material and notices" },
    admission: { index: "08", label: "Admissions", title: "How admission works", linkLabel: "Admission details" },
    faq: { label: "FAQ", title: "Common questions", linkLabel: "All FAQs" }
  },
  finalCta: {
    title: "Next batch starts 5 April.",
    line: "Talk to the admissions desk. We reply the same day."
  }
};
