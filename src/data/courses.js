// DUMMY DATA - replace with verified academy information.
export const courses = [
  {
    slug: "jee-main-advanced-class-11",
    title: "JEE Main + Advanced",
    subtitle: "Complete Preparation Program",
    category: "JEE",
    level: "Class 11 & 12",
    duration: "24 Months",
    mode: "Classroom + Online",
    summary: "Two-year systematic preparation covering Class 11 and 12 syllabus with weekly full-length tests.",
    overview: "Two-year classroom and online program with 6 days of instruction per week. Weekly Sunday tests follow the NTA computer-based pattern with negative marking. Students receive printed chapter modules, graded homework sheets, and daily two-hour doubt counters.",
    highlights: [
      "Rigorous coverage of Physics, Chemistry and Mathematics",
      "Weekly Sunday tests mapped to NTA pattern",
      "Daily two-hour teacher-led doubt counters",
      "Complete printed chapter modules and graded sheets"
    ],
    syllabus: [
      { subject: "Physics", topics: ["Kinematics & Dynamics", "Rotational Motion", "Thermodynamics", "Waves & Oscillations"] },
      { subject: "Chemistry", topics: ["Atomic Structure", "Chemical Bonding", "Thermodynamics", "Organic Chemistry Basics"] },
      { subject: "Mathematics", topics: ["Quadratic Equations", "Coordinate Geometry", "Trigonometry", "Sequences & Series"] }
    ],
    batches: [
      { id: "b-j11-1", name: "Weekday Morning", startDate: "5 Apr 2027", timing: "7:00 AM - 1:00 PM", seatsTotal: 40, seatsLeft: 12 },
      { id: "b-j11-2", name: "Weekday Evening", startDate: "12 Apr 2027", timing: "3:30 PM - 8:30 PM", seatsTotal: 40, seatsLeft: 8 }
    ],
    fees: {
      total: 260000,
      installments: [
        { label: "Admission & Term 1", amount: 90000, due: "At admission" },
        { label: "Term 2", amount: 85000, due: "10 October 2027" },
        { label: "Term 3", amount: 85000, due: "10 April 2028" }
      ],
      scholarshipNote: "Up to 90% scholarship available through MERITON National Scholarship Test."
    },
    eligibility: [
      "Students moving to Class 11 in 2027",
      "Minimum 75% aggregate in Class 10 Science & Math",
      "Qualifying score in MERITON Admission Test"
    ],
    facultyIds: ["f01", "f02", "f03"],
    image: "/images/courses/course-jee-main-adv.jpg",
    featured: true
  },
  {
    slug: "jee-main-advanced-class-12",
    title: "JEE Main + Advanced Class 12",
    subtitle: "Intensive Class 12 & Revision Program",
    category: "JEE",
    level: "Class 12",
    duration: "12 months",
    mode: "Classroom",
    summary: "One-year intensive program covering Class 12 syllabus followed by Class 11 revision and test series.",
    overview: "One-year classroom program completing the Class 12 syllabus by November. Dedicated revision modules address Class 11 core topics alongside 40 full-length mock examinations. Daily problem-solving counters and printed 15-year question archives support preparation.",
    highlights: [
      "Rapid syllabus completion by November",
      "Dedicated revision block for Class 11 backlog",
      "40 full syllabus mock tests with rankings",
      "Printed question banks with 15-year archive"
    ],
    syllabus: [
      { subject: "Physics", topics: ["Electrostatics", "Current Electricity", "Electromagnetism", "Optics & Modern Physics"] },
      { subject: "Chemistry", topics: ["Solid State & Solutions", "Electrochemistry", "Coordination Compounds", "Organic Reaction Mechanisms"] },
      { subject: "Mathematics", topics: ["Differential Calculus", "Integral Calculus", "Vectors & 3D Geometry", "Probability"] }
    ],
    batches: [
      { id: "b-j12-1", name: "Batch Alpha", startDate: "5 April 2027", timing: "8:00 AM - 1:30 PM", seatsTotal: 40, seatsLeft: 9 },
      { id: "b-j12-2", name: "Batch Beta", startDate: "15 April 2027", timing: "3:30 PM - 8:30 PM", seatsTotal: 40, seatsLeft: 14 }
    ],
    fees: {
      total: 185000,
      installments: [
        { label: "Term 1", amount: 95000, due: "At admission" },
        { label: "Term 2", amount: 90000, due: "15 September 2027" }
      ],
      scholarshipNote: "Fee concession for students scoring above 95% in Class 11 school exams."
    },
    eligibility: [
      "Students moving to Class 12 in 2027",
      "Strong conceptual foundation in Class 11",
      "Direct admission based on Class 11 marksheet or admission test"
    ],
    facultyIds: ["f01", "f02", "f03"],
    image: "/images/courses/course-jee-12.jpg",
    featured: false
  },
  {
    slug: "jee-dropper",
    title: "JEE Dropper / Repeater",
    subtitle: "Targeted Speed & Full-Mock Repeater",
    category: "JEE",
    level: "Class 12 Passed",
    duration: "12 months",
    mode: "Classroom",
    summary: "Dedicated repeater course focused on problem-solving speed, error analysis, and 50 full tests.",
    overview: "Full-time repeater course featuring 30 lecture hours weekly across Physics, Chemistry, and Mathematics. Students take 50 full-syllabus mock tests with automated question-level error analysis. Faculty conduct daily doubt-clearing sessions and formula revision drills.",
    highlights: [
      "Rigorous 6-day weekly schedule with 30 hours of lectures",
      "Targeted problem-solving sessions per topic",
      "Detailed computer-generated error analysis reports",
      "Direct mentorship from senior department heads"
    ],
    syllabus: [
      { subject: "Physics", topics: ["Mechanics & Properties of Matter", "Electrodynamics", "Heat & Thermodynamics", "Modern Physics"] },
      { subject: "Chemistry", topics: ["Physical Chemistry Calculations", "Inorganic Metallurgy & Bonding", "Organic Name Reactions", "Qualitative Analysis"] },
      { subject: "Mathematics", topics: ["Calculus & Functions", "Algebra & Matrices", "Trigonometry & Vectors", "Coordinate Geometry"] }
    ],
    batches: [
      { id: "b-jd-1", name: "Repeater Cohort 1", startDate: "20 May 2027", timing: "8:30 AM - 2:30 PM", seatsTotal: 40, seatsLeft: 6 },
      { id: "b-jd-2", name: "Repeater Cohort 2", startDate: "10 June 2027", timing: "9:00 AM - 3:00 PM", seatsTotal: 40, seatsLeft: 19 }
    ],
    fees: {
      total: 195000,
      installments: [
        { label: "Term 1", amount: 100000, due: "At admission" },
        { label: "Term 2", amount: 95000, due: "15 October 2027" }
      ],
      scholarshipNote: "Special fee rebates for students with JEE Main 98+ percentile in previous attempt."
    },
    eligibility: [
      "Class 12 passouts preparing exclusively for JEE 2028",
      "Previous JEE Main or Board result evaluation",
      "Academic interview with department head"
    ],
    facultyIds: ["f01", "f02", "f03"],
    image: "/images/courses/course-jee-dropper.jpg",
    featured: false
  },
  {
    slug: "neet-class-11",
    title: "NEET Medical Class 11",
    subtitle: "Two-Year Pre-Medical Foundation",
    category: "NEET",
    level: "Class 11 & 12",
    duration: "24 Months",
    mode: "Classroom + Online",
    summary: "Two-year NCERT-focused classroom program with line-by-line Biology mastery and weekly OMR tests.",
    overview: "Two-year pre-medical program emphasizing NCERT line-by-line coverage for Biology, Chemistry, and Physics. Sunday full-length tests use OMR sheets matching the NTA medical pattern. Students attend timed numerical problem sessions and receive complete printed theory workbooks.",
    highlights: [
      "Complete line-by-line coverage of NCERT textbooks",
      "Physics numerical drill sessions designed for medical aspirants",
      "OMR-based weekly Sunday tests with rank lists",
      "Dissection and microscopy video lecture demonstrations"
    ],
    syllabus: [
      { subject: "Physics", topics: ["Units & Measurement", "Laws of Motion", "Work Power Energy", "Gravitation & Fluid Mechanics"] },
      { subject: "Chemistry", topics: ["Some Basic Concepts", "Structure of Atom", "Chemical Thermodynamics", "Equilibrium"] },
      { subject: "Biology", topics: ["Diversity in Living World", "Structural Organisation", "Cell Structure & Function", "Plant Physiology"] }
    ],
    batches: [
      { id: "b-n11-1", name: "Morning Medical", startDate: "5 April 2027", timing: "7:30 AM - 1:30 PM", seatsTotal: 40, seatsLeft: 11 },
      { id: "b-n11-2", name: "Evening Medical", startDate: "15 April 2027", timing: "3:00 PM - 8:30 PM", seatsTotal: 40, seatsLeft: 16 }
    ],
    fees: {
      total: 240000,
      installments: [
        { label: "Installment 1", amount: 80000, due: "At admission" },
        { label: "Installment 2", amount: 80000, due: "10 October 2027" },
        { label: "Installment 3", amount: 80000, due: "10 April 2028" }
      ],
      scholarshipNote: "Merit scholarships awarded through National Science & Medical Aptitude Test."
    },
    eligibility: [
      "Students moving to Class 11 with PCB stream",
      "Minimum 75% in Class 10 Science",
      "Admission test qualification"
    ],
    facultyIds: ["f01", "f04", "f05"],
    image: "/images/courses/course-neet-11.jpg",
    featured: true
  },
  {
    slug: "neet-class-12",
    title: "NEET Medical Class 12",
    subtitle: "Class 12 NCERT & High-Yield Test Series",
    category: "NEET",
    level: "Class 12",
    duration: "12 months",
    mode: "Classroom",
    summary: "One-year medical entrance preparation focusing on Class 12 NCERT and intensive full-syllabus test series.",
    overview: "One-year medical entrance batch completing Class 12 NCERT curriculum by October. Intensive revision covers high-weightage Class 11 chapters alongside 35 full-length test series. Weekly error-review sessions and formula analysis support score improvement.",
    highlights: [
      "NCERT completion by October with chapter tests",
      "Special test series on Genetics and Human Physiology",
      "Timed numerical drills for Physics section",
      "Monthly performance and error-review sessions"
    ],
    syllabus: [
      { subject: "Physics", topics: ["Electrostatics & Current", "Magnetism & EMI", "Ray & Wave Optics", "Semiconductor Electronics"] },
      { subject: "Chemistry", topics: ["Solutions & Electrochemistry", "Chemical Kinetics", "Surface Chemistry & d-Block", "Biomolecules & Polymers"] },
      { subject: "Biology", topics: ["Reproduction in Organisms", "Genetics & Evolution", "Biology in Human Welfare", "Biotechnology & Ecology"] }
    ],
    batches: [
      { id: "b-n12-1", name: "Fastrack Medical", startDate: "10 April 2027", timing: "8:00 AM - 1:30 PM", seatsTotal: 40, seatsLeft: 14 },
      { id: "b-n12-2", name: "Standard Medical", startDate: "20 April 2027", timing: "3:30 PM - 8:30 PM", seatsTotal: 40, seatsLeft: 22 }
    ],
    fees: {
      total: 170000,
      installments: [
        { label: "Term 1", amount: 90000, due: "At admission" },
        { label: "Term 2", amount: 80000, due: "15 September 2027" }
      ],
      scholarshipNote: "Concessions applicable based on Class 11 marksheet performance."
    },
    eligibility: [
      "Students entering Class 12 with PCB",
      "Sound understanding of Class 11 NCERT Biology",
      "Entrance test score or school report card"
    ],
    facultyIds: ["f01", "f04", "f05"],
    image: "/images/courses/course-neet-12.jpg",
    featured: false
  },
  {
    slug: "neet-dropper",
    title: "NEET Dropper / Repeater",
    subtitle: "Focused Preparation for Medical Dreams",
    category: "NEET",
    level: "Class 12 Passed",
    duration: "12 Months",
    mode: "Classroom + Online",
    summary: "Targeted repeater program with 60 full NCERT mocks and daily Physics numerical problem counters.",
    overview: "Intensive one-year repeater batch providing 60 full-length OMR tests modeled on the NEET exam. Daily two-hour doubt counters feature senior medical faculty. Students receive NCERT flashcard workbooks and weekly performance counseling.",
    highlights: [
      "60 full-length OMR mocks aligned with NEET exam pattern",
      "Daily two-hour doubt counters with senior medical faculty",
      "Line-by-line NCERT Biology flashcard workbook",
      "Individual weak-area counseling after every test"
    ],
    syllabus: [
      { subject: "Physics", topics: ["Complete Mechanics", "Electromagnetism", "Optics & Thermodynamics", "Modern Physics"] },
      { subject: "Chemistry", topics: ["Physical Chemistry Problems", "Inorganic NCERT Memory Tables", "Organic Reaction Trees", "Environmental Chemistry"] },
      { subject: "Biology", topics: ["Human Physiology & Endocrine", "Genetics & Molecular Basis", "Plant Kingdom & Morphology", "Ecology & Conservation"] }
    ],
    batches: [
      { id: "b-nd-1", name: "Repeater Batch A", startDate: "20 May 2027", timing: "8:00 AM - 2:00 PM", seatsTotal: 40, seatsLeft: 6 },
      { id: "b-nd-2", name: "Repeater Batch B", startDate: "1 June 2027", timing: "8:30 AM - 2:30 PM", seatsTotal: 40, seatsLeft: 18 }
    ],
    fees: {
      total: 195000,
      installments: [
        { label: "Term 1", amount: 100000, due: "At admission" },
        { label: "Term 2", amount: 95000, due: "15 October 2027" }
      ],
      scholarshipNote: "Special fee rebates for students scoring 550+ in NEET 2026."
    },
    eligibility: [
      "Class 12 passed students preparing for NEET 2028",
      "Submission of previous NEET scorecard",
      "Admission test and counselling interview"
    ],
    facultyIds: ["f01", "f04", "f05"],
    image: "/images/courses/course-neet-dropper.jpg",
    featured: true
  },
  {
    slug: "foundation-class-8",
    title: "Foundation Class 8",
    subtitle: "Early Conceptual & Olympiad Foundation",
    category: "Foundation",
    level: "Class 8",
    duration: "12 months",
    mode: "Classroom",
    summary: "Early conceptual development in Science and Mathematics for Olympiads, NTSE, and high school success.",
    overview: "Early conceptual foundation course covering Science and Mathematics for middle school students. Focuses on logical reasoning, mental ability, and Junior Science Olympiad preparation. Bi-weekly tests combine objective questions with descriptive problem solving.",
    highlights: [
      "Focus on logical thinking and fundamentals",
      "Preparation for Junior Science Olympiad and Mathematics Olympiad",
      "Bi-weekly tests with objective and descriptive parts",
      "Monthly activity-based practical demonstration sheets"
    ],
    syllabus: [
      { subject: "Science", topics: ["Crop Production & Microorganisms", "Force Pressure & Friction", "Sound & Chemical Effects", "Light & Solar System"] },
      { subject: "Mathematics", topics: ["Rational Numbers & Linear Equations", "Understanding Quadrilaterals", "Square Roots & Cube Roots", "Mensuration & Exponents"] },
      { subject: "Mental Ability", topics: ["Number Series & Analogy", "Coding-Decoding", "Venn Diagrams", "Direction Sense Test"] }
    ],
    batches: [
      { id: "b-f8-1", name: "Evening Batch 1", startDate: "10 April 2027", timing: "4:30 PM - 7:00 PM", seatsTotal: 40, seatsLeft: 21 },
      { id: "b-f8-2", name: "Weekend Batch", startDate: "17 April 2027", timing: "9:00 AM - 1:30 PM", seatsTotal: 40, seatsLeft: 25 }
    ],
    fees: {
      total: 54000,
      installments: [
        { label: "Term 1", amount: 27000, due: "At admission" },
        { label: "Term 2", amount: 27000, due: "15 October 2027" }
      ],
      scholarshipNote: "Merit scholarship based on Class 7 annual school results."
    },
    eligibility: [
      "Students moving to Class 8 in 2027",
      "Minimum 70% in Class 7 Science and Mathematics",
      "Aptitude assessment test"
    ],
    facultyIds: ["f06", "f07", "f08"],
    image: "/images/courses/course-foundation-8.jpg",
    featured: false
  },
  {
    slug: "foundation-class-9",
    title: "Foundation Class 9",
    subtitle: "CBSE Excellence & Pre-JEE/NEET Bridge",
    category: "Foundation",
    level: "Class 9",
    duration: "12 months",
    mode: "Classroom",
    summary: "Solid foundation building for competitive exams alongside CBSE board syllabus and Olympiad preparation.",
    overview: "Comprehensive Class 9 program aligning CBSE school curriculum with foundational JEE and NEET concepts. Students work through algebra, geometry, and physical sciences problem sets. Fortnightly cumulative tests track conceptual clarity with detailed teacher reviews.",
    highlights: [
      "In-depth Physics and Chemistry bridge concepts for JEE/NEET",
      "Rigorous Geometry and Algebra problem assignments",
      "Fortnightly cumulative tests with marksheet review",
      "Classroom notes and printed reference handbooks"
    ],
    syllabus: [
      { subject: "Physics", topics: ["Motion & Force Laws", "Gravitation & Floatation", "Work Energy & Power", "Sound & Hearing"] },
      { subject: "Chemistry", topics: ["Matter in Our Surroundings", "Is Matter Around Us Pure", "Atoms and Molecules", "Structure of the Atom"] },
      { subject: "Mathematics", topics: ["Number Systems & Polynomials", "Coordinate Geometry", "Triangles & Quadrilaterals", "Circles & Statistics"] }
    ],
    batches: [
      { id: "b-f9-1", name: "Weekday Evening", startDate: "8 April 2027", timing: "4:30 PM - 7:30 PM", seatsTotal: 40, seatsLeft: 15 },
      { id: "b-f9-2", name: "Weekend Immersion", startDate: "18 April 2027", timing: "8:30 AM - 1:30 PM", seatsTotal: 40, seatsLeft: 28 }
    ],
    fees: {
      total: 62000,
      installments: [
        { label: "Term 1", amount: 31000, due: "At admission" },
        { label: "Term 2", amount: 31000, due: "15 October 2027" }
      ],
      scholarshipNote: "Fee rebate for students holding district-level Olympiad ranks."
    },
    eligibility: [
      "Students moving to Class 9 in 2027",
      "Class 8 academic performance report",
      "MERITON Junior Talent Search qualification"
    ],
    facultyIds: ["f06", "f07", "f08"],
    image: "/images/courses/course-foundation-9.jpg",
    featured: false
  },
  {
    slug: "foundation-class-10",
    title: "Foundation Class 10",
    subtitle: "Board + Olympiad Excellence",
    category: "Foundation",
    level: "Class 9 & 10",
    duration: "12 Months",
    mode: "Classroom + Online",
    summary: "Board exam excellence paired with advanced Olympiad concepts and JEE/NEET foundation bridge modules.",
    overview: "Integrated program completing Class 10 Board exam syllabus by November before starting advanced Olympiad bridge modules. Students take weekly chapter assessments and full-syllabus mock tests matching Board specifications. Faculty provide structured homework and doubt clearing.",
    highlights: [
      "Complete coverage of Class 10 Board syllabus by November",
      "Special test series matching latest Board pattern",
      "Pre-JEE and Pre-NEET problem modules for Class 11 readiness",
      "One-on-one academic counselling and doubt clearing"
    ],
    syllabus: [
      { subject: "Physics", topics: ["Light Reflection & Refraction", "Human Eye & Colourful World", "Electricity & Circuits", "Magnetic Effects of Current"] },
      { subject: "Chemistry", topics: ["Chemical Reactions & Equations", "Acids Bases & Salts", "Metals and Non-metals", "Carbon and its Compounds"] },
      { subject: "Mathematics", topics: ["Real Numbers & Polynomials", "Pair of Linear Equations", "Quadratic Equations & AP", "Triangles & Trigonometry"] }
    ],
    batches: [
      { id: "b-f10-1", name: "Board + Olympiad Alpha", startDate: "5 Apr 2027", timing: "4:30 PM - 7:30 PM", seatsTotal: 40, seatsLeft: 5 },
      { id: "b-f10-2", name: "Board + Olympiad Beta", startDate: "15 Apr 2027", timing: "4:30 PM - 7:30 PM", seatsTotal: 40, seatsLeft: 17 }
    ],
    fees: {
      total: 68000,
      installments: [
        { label: "Term 1", amount: 34000, due: "At admission" },
        { label: "Term 2", amount: 34000, due: "15 October 2027" }
      ],
      scholarshipNote: "Up to 80% scholarship for top scorers in MERITON Junior Talent Search."
    },
    eligibility: [
      "Students moving to Class 10 in 2027",
      "Minimum 75% in Class 9 Science and Mathematics",
      "Admission aptitude evaluation"
    ],
    facultyIds: ["f06", "f07", "f08"],
    image: "/images/courses/course-foundation-10.jpg",
    featured: true
  }
];

export const courseCategories = ["JEE", "NEET", "Foundation"];

export default courses;
