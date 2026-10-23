// DUMMY DATA - replace with verified academy information.
export const coursesPage = {
  listing: {
    seo: { title: "Courses", description: "JEE, NEET and Foundation batches for Classes 8 to 12 and droppers." },
    hero: { label: "Courses", title: "Courses", line: "JEE, NEET and Foundation. Pick a class and an exam." },
    controls: { searchLabel: "Search courses", searchPlaceholder: "Search by name or class", clear: "Clear filters", allLabel: "All" },
    empty: { title: "No course matches", line: "Try another class or exam, or ask the admissions desk." },
    cta: { title: "Not sure which batch?", line: "Tell us the class and exam. Admissions will suggest a batch." }
  },
  details: {
    notFound: { label: "Course not found", line: "This course is not available or the link is old." },
    labels: { level: "Level", duration: "Duration", mode: "Mode", nextBatch: "Next batch", seatsLeft: "Seats left", feeFrom: "Fee from" },
    sections: { overview: "Overview", syllabus: "Syllabus", batches: "Batches", fees: "Fees", eligibility: "Eligibility", faculty: "Faculty", related: "Related courses" },
    feeNote: "Fees are for the course only. Confirm the exact amount with the admissions desk before paying.",
    cta: { title: "Questions about this batch?", line: "Ask the admissions desk. We reply the same day." }
  }
};

export default coursesPage;
