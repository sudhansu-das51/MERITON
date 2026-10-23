// DUMMY DATA - replace with verified academy information.
export const about = {
  founded: 2015,
  intro: {
    statement: "MERITON coaches students for JEE, NEET and school foundation exams. Small batches, weekly tests and daily doubt hours since 2015.",
    body: "We run classroom batches for Classes 8 to 12 and droppers. Every student is tested weekly, ranked and reviewed with a teacher.",
    image: "/images/about/campus.jpg"
  },
  vision: "Be the academy students and parents trust for honest, measurable preparation.",
  mission: "Teach every chapter in small batches, test every week and report progress to parents every month.",
  director: {
    name: "Dr. S. K. Mishra",
    role: "Director",
    credentials: "Ph.D. Physics, 22 years of teaching",
    quote: "We do not promise ranks. We promise a plan, a test every week and honest feedback.",
    message: "MERITON started with one classroom of 24 students in 2015. We still teach in batches of 40 or fewer, and I review test results with every teacher each week.",
    photo: "/images/about/director.jpg"
  },
  methodology: [
    { title: "Teach", text: "Concept classes six days a week, in batches of 40 or fewer.", cadence: "6 days a week" },
    { title: "Practise", text: "Problem sheets after every chapter, solved in doubt hours.", cadence: "Daily" },
    { title: "Test", text: "A ranked test every Sunday, in the exam pattern.", cadence: "Every Sunday" },
    { title: "Review", text: "Mistakes discussed in class. Parents get a monthly report.", cadence: "Monthly" }
  ],
  infrastructure: [
    { title: "Classrooms", line: "12 classrooms, 40 seats each, projector and whiteboard.", image: "/images/about/classroom.jpg" },
    { title: "Test hall", line: "Sunday tests in exam-style seating.", image: "/images/about/test-hall.jpg" },
    { title: "Library", line: "Reference books and past papers, open 8 AM to 8 PM.", image: "/images/about/library.jpg" },
    { title: "Doubt desk", line: "Two hours daily with the subject teacher.", image: "/images/about/doubt-desk.jpg" },
    { title: "Labs", line: "Physics and chemistry demonstrations for Foundation batches.", image: "/images/about/lab.jpg" },
    { title: "Study rooms", line: "Silent self-study space before and after class.", image: "/images/about/study-room.jpg" }
  ],
  journey: [
    { year: 2015, title: "First batch", text: "24 students, one classroom, JEE only." },
    { year: 2017, title: "NEET batches begin", text: "Biology faculty joins. First NEET batch of 40." },
    { year: 2019, title: "Foundation program", text: "Classes 8 to 10 added with weekly tests." },
    { year: 2021, title: "Online doubt sessions", text: "Doubt hours move online, then continue as hybrid." },
    { year: 2024, title: "Second floor opens", text: "A test hall for 120 students." },
    { year: 2026, title: "Results year", text: "1,860 selections across JEE, NEET and Foundation exams." }
  ],
  page: {
    seo: { title: "About us", description: "MERITON is a coaching academy for JEE, NEET and Foundation, running since 2015." },
    hero: { label: "About us", title: "About MERITON", line: "A coaching academy for JEE, NEET and Foundation, since 2015." },
    sections: {
      visionMission: { index: "01", label: "Vision and mission", title: "What we work towards" },
      director: { index: "02", label: "Director's message", title: "From the director" },
      methodology: { index: "03", label: "How we teach", title: "How a week works" },
      infrastructure: { index: "04", label: "Campus", title: "Where you study" },
      journey: { index: "05", label: "History", title: "Since 2015" }
    },
    cta: { title: "Visit before you decide.", line: "Book a campus visit with the admissions desk." }
  }
};

export default about;
