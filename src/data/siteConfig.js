// DUMMY DATA - replace with verified academy information.
export const siteConfig = {
  brand: {
    name: "MERITON",
    descriptor: "JEE, NEET and Foundation coaching, Classes 8 to 12."
  },
  contact: {
    phone: "+91 00000 00000",
    whatsapp: "910000000000",
    email: "hello@meriton.example",
    careersEmail: "careers@meriton.example",
    address: "MERITON Academy, 12 College Square, City 000000",
    mapEmbedUrl: ""
  },
  careersEmail: "careers@meriton.example",
  announcement: "Admissions 2027-28 open",
  nextBatchDate: "5 April",
  hours: [{ days: "Mon to Sat", time: "9:00 AM to 7:00 PM" }],
  socials: [
    { label: "Instagram", url: "#" },
    { label: "YouTube", url: "#" },
    { label: "Facebook", url: "#" }
  ],
  nav: [
    { label: "Home", to: "/" },
    {
      label: "Courses",
      to: "/courses",
      children: [
        { label: "JEE", to: "/courses?category=JEE" },
        { label: "NEET", to: "/courses?category=NEET" },
        { label: "Foundation", to: "/courses?category=Foundation" },
        { label: "All courses", to: "/courses" }
      ]
    },
    { label: "Faculty", to: "/faculty" },
    { label: "Results", to: "/results" },
    { label: "Admissions", to: "/admissions" },
    { label: "Resources", to: "/resources" },
    {
      label: "More",
      to: null,
      children: [
        { label: "About us", to: "/about" },
        { label: "Testimonials", to: "/testimonials" },
        { label: "News and events", to: "/news-events" },
        { label: "Careers", to: "/careers" },
        { label: "FAQs", to: "/faqs" },
        { label: "Contact", to: "/contact" }
      ]
    }
  ],
  footerLinks: {
    academy: [
      { label: "About us", to: "/about" },
      { label: "Faculty", to: "/faculty" },
      { label: "Results", to: "/results" },
      { label: "Careers", to: "/careers" }
    ],
    support: [
      { label: "Admissions", to: "/admissions" },
      { label: "Resources", to: "/resources" },
      { label: "FAQs", to: "/faqs" },
      { label: "Contact", to: "/contact" }
    ],
    policies: [
      { label: "Privacy policy", to: "/privacy-policy#privacy" },
      { label: "Terms and conditions", to: "/privacy-policy#terms" },
      { label: "Refund policy", to: "/privacy-policy#refund" }
    ]
  },
  enquiry: { channel: "whatsapp" }
};
