// DUMMY DATA - replace with verified academy information.
export const faqs = [
  // 1. Admissions (4 entries)
  {
    id: "q01",
    category: "Admissions",
    question: "How do I secure admission for the 2027 batch?",
    answer: "Appear for the MERITON Admission Test, review results during counselling, submit previous marksheets, and complete fee payment for seat confirmation.",
    link: { label: "Admission details", to: "/admissions" }
  },
  {
    id: "q02",
    category: "Admissions",
    question: "When do classroom batches start each academic year?",
    answer: "All new Class 11, Class 12, and repeater batches begin on 5 April, following orientation and timetable distribution.",
    link: { label: "Admission details", to: "/admissions" }
  },
  {
    id: "q03",
    category: "Admissions",
    question: "Is there a selection test for admission to courses?",
    answer: "JEE and NEET batches require qualifying the MERITON entrance test. Foundation batches take a diagnostic placement test to assign learning groups.",
    link: { label: "Admission details", to: "/admissions" }
  },
  {
    id: "q04",
    category: "Admissions",
    question: "What documents are required during admission verification?",
    answer: "Submit two passport photographs, previous school marksheets, photo identification, and the completed admission form signed by parents.",
    link: null
  },

  // 2. Courses and batches (4 entries)
  {
    id: "q05",
    category: "Courses and batches",
    question: "What is the maximum student strength in each classroom?",
    answer: "Every classroom batch is capped at strictly 40 students or fewer to ensure personal visibility, teacher attention, and focused doubt clearance.",
    link: null
  },
  {
    id: "q06",
    category: "Courses and batches",
    question: "When are daily faculty doubt hours scheduled?",
    answer: "Subject faculty conduct two hours of dedicated daily doubt consultations immediately following regular classroom sessions.",
    link: null
  },
  {
    id: "q07",
    category: "Courses and batches",
    question: "Is there a dedicated one-year course for dropper students?",
    answer: "Yes, repeaters attend full-time intensive classroom modules featuring comprehensive syllabus coverage, daily drills, and 50 full mock examinations.",
    link: { label: "See courses", to: "/courses" }
  },
  {
    id: "q08",
    category: "Courses and batches",
    question: "Can Class 8 to 10 students manage school with Foundation?",
    answer: "Foundation batches meet three evenings weekly or on weekends, complementing CBSE and State Board syllabi while building Olympiad and competitive fundamentals.",
    link: { label: "Foundation courses", to: "/courses" }
  },

  // 3. Fees and scholarships (4 entries)
  {
    id: "q09",
    category: "Fees and scholarships",
    question: "Are merit-based fee scholarships available for students?",
    answer: "Merit scholarships up to 50% tuition waiver are awarded based on performance in our admission screening test and national Olympiad achievements.",
    link: { label: "Scholarship info", to: "/admissions" }
  },
  {
    id: "q10",
    category: "Fees and scholarships",
    question: "Can course fees be paid in multiple instalments?",
    answer: "Yes, all one-year and two-year programs provide structured instalment plans divided across academic terms, detailed on course pages.",
    link: { label: "See fees", to: "/courses" }
  },
  {
    id: "q11",
    category: "Fees and scholarships",
    question: "What is the policy for fee refund upon withdrawal?",
    answer: "Refund requests submitted within thirty days of session commencement receive proportional tuition return according to academy guidelines.",
    link: { label: "Refund policy", to: "/privacy-policy#refund" }
  },
  {
    id: "q12",
    category: "Fees and scholarships",
    question: "Are books and study materials included in the fee?",
    answer: "Printed theory modules, graded exercise packs, formula books, and test series access are fully included with no separate book fee.",
    link: null
  },

  // 4. Tests and results (4 entries)
  {
    id: "q13",
    category: "Tests and results",
    question: "How often are tests conducted for enrolled students?",
    answer: "Full-syllabus ranked tests are held every Sunday under timed conditions, followed by Monday error analysis discussions and performance cards.",
    link: { label: "View results", to: "/results" }
  },
  {
    id: "q14",
    category: "Tests and results",
    question: "How do parents track student attendance and test scores?",
    answer: "Parents receive weekly test score summaries and monthly comprehensive progress reports documenting attendance, accuracy metrics, and faculty feedback.",
    link: null
  },
  {
    id: "q15",
    category: "Tests and results",
    question: "Are national exam rank predictors and test analytics provided?",
    answer: "Every Sunday test report includes percentile rankings, topic accuracy splits, and comparative batch percentiles to guide weekly revision.",
    link: { label: "View results", to: "/results" }
  },
  {
    id: "q16",
    category: "Tests and results",
    question: "What happens if a student misses a scheduled Sunday test?",
    answer: "Missed tests must be completed in the supervised testing lab on Tuesday evenings, though re-tests do not qualify for batch rank awards.",
    link: null
  },

  // 5. Campus and facilities (4 entries)
  {
    id: "q17",
    category: "Campus and facilities",
    question: "What are the academy library and self-study hours?",
    answer: "The silent study library is open from 8 AM to 8 PM Monday through Saturday, supervised by academic assistants.",
    link: null
  },
  {
    id: "q18",
    category: "Campus and facilities",
    question: "How many classrooms and laboratories are on campus?",
    answer: "The central campus houses 12 air-conditioned classrooms, dedicated physics and chemistry demonstration benches, and a computer testing hall.",
    link: { label: "Find the campus", to: "/contact" }
  },
  {
    id: "q19",
    category: "Campus and facilities",
    question: "Is campus parking and secure student pick-up available?",
    answer: "The facility features gated perimeter security, designated two-wheeler parking for senior students, and a safe front drop-off bay.",
    link: { label: "Find the campus", to: "/contact" }
  },
  {
    id: "q20",
    category: "Campus and facilities",
    question: "Does MERITON operate branches in other city locations?",
    answer: "Classes run at our Main Campuses in Anna Nagar and Adyar, sharing identical faculty, testing papers, and academic schedules.",
    link: { label: "Find the campus", to: "/contact" }
  }
];

export default faqs;
