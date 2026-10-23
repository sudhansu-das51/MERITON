// DUMMY DATA - replace with verified academy information.
export const admissions = {
  steps: [
    {
      title: "Enquire",
      when: "Day 1",
      text: "Call, message or fill the form. The admissions desk replies the same day."
    },
    {
      title: "Entrance test",
      when: "Within 7 days",
      text: "A 90-minute test on class-level basics. No preparation needed."
    },
    {
      title: "Counselling",
      when: "Within 2 days of the test",
      text: "Meet a counsellor with your result and pick a course and batch."
    },
    {
      title: "Fee and documents",
      when: "Within 5 days",
      text: "Pay the first instalment and submit your documents."
    },
    {
      title: "Batch allotment",
      when: "Before the batch starts",
      text: "You get the timetable, study pack and first test date."
    }
  ],
  eligibility: [
    {
      program: "JEE Main + Advanced",
      classes: "Class 11, Class 12, Dropper",
      criteria: "Class 11 entry: Class 10 pass with 70 percent or above. Class 12 entry: Class 11 pass.",
      entranceTest: "Yes"
    },
    {
      program: "NEET",
      classes: "Class 11, Class 12, Dropper",
      criteria: "Class 11 entry: Class 10 pass with 70 percent or above. Biology required in Class 11 and 12.",
      entranceTest: "Yes"
    },
    {
      program: "Foundation",
      classes: "Class 8, Class 9, Class 10",
      criteria: "Pass in the previous class. No minimum percentage.",
      entranceTest: "Placement test only"
    }
  ],
  documents: [
    "2 passport-size photographs",
    "Previous class marksheet",
    "Class 10 marksheet (for Class 11 and above)",
    "Government ID of the student (copy)",
    "Parent or guardian ID proof (copy)",
    "Transfer certificate, if changing school"
  ],
  scholarships: [
    {
      title: "Entrance test scholarship",
      criteria: "Score 85 percent or above in the entrance test.",
      benefit: "Up to 50% off"
    },
    {
      title: "Board merit scholarship",
      criteria: "90 percent or above in the last board exam.",
      benefit: "25% off"
    },
    {
      title: "Sibling concession",
      criteria: "A sibling is already enrolled at MERITON.",
      benefit: "10% off"
    }
  ],
  dates: [
    { label: "Admissions open", date: "2026-11-01" },
    { label: "Scholarship test", date: "2026-12-13" },
    { label: "Early fee deadline", date: "2027-01-31" },
    { label: "Orientation", date: "2027-04-03" },
    { label: "Batches start", date: "2027-04-05" }
  ],
  payment: {
    modes: ["UPI", "Debit or credit card", "Net banking", "Cheque or DD", "Cash at the office"],
    instalmentLine: "Instalment plans are shown on each course page.",
    note: "Fees may change. Confirm the exact amount with admissions."
  },
  page: {
    seo: {
      title: "Admissions",
      description: "How to join MERITON: steps, eligibility, documents, scholarships, dates and the application form."
    },
    hero: {
      label: "Admissions",
      title: "Admissions",
      line: "Five steps from enquiry to first class.",
      meta: ["Batches from 5 April", "Entrance test for JEE and NEET"]
    },
    sections: {
      process: { index: "01", label: "Process", title: "From enquiry to first class" },
      eligibility: { index: "02", label: "Eligibility", title: "Who can join" },
      documents: { index: "03", label: "Documents", title: "Documents to bring" },
      scholarships: {
        index: "04",
        label: "Scholarships",
        title: "Fee concessions",
        note: "Scholarships apply to the course fee only and are decided by the academy."
      },
      dates: { index: "05", label: "Dates", title: "Important dates" },
      fees: { index: "06", label: "Fees", title: "Fees and payment" },
      apply: {
        index: "07",
        label: "Apply",
        title: "Apply for admission",
        line: "Fill this form. The admissions desk will call you to schedule the entrance test."
      }
    },
    form: {
      labels: {
        student: "Student name",
        parent: "Parent or guardian name",
        phone: "Phone",
        email: "Email (optional)",
        classApplying: "Class applying for",
        course: "Course",
        previous: "Previous school or last exam score (optional)",
        message: "Message (optional)"
      },
      consent: "I agree to be contacted about this application.",
      submit: "Submit application",
      success: "Application received. WhatsApp is opening with your details. The admissions desk will call you within one working day.",
      error: "Could not open WhatsApp. Call or email the admissions desk instead."
    }
  }
};

export default admissions;
