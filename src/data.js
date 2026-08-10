// ============================================================
// Central content source — pulled from the full CV. Only the
// testimonials (marked PLACEHOLDER) still need real quotes.
// ============================================================

export const profile = {
  name: "Lamidi Abdulhameed Olawale",
  tagline: "SOFTWARE ENGINEERING STUDENT • FOUNDER @ CHILL TECH LTD • GENERAL MANAGER @ CHIL INVESTMENT",
  role: "Software Engineering Student • Web Developer • Technology Entrepreneur",
  headlineSub: "General Manager & Tech Entrepreneur",
  heroBio: "Software Engineering student at Aptech, Founder of CHILL TECH LTD, and General Manager at CHIL Investment Ltd — managing multi-million naira real estate portfolios while engineering modern, high-performance digital solutions across e-commerce, real estate, gadgets, and web tech.",
  bio: "Software Engineering student at Aptech Computer Education with practical experience designing, developing, deploying, and improving modern web applications. Founder of CHILL TECH LTD and General Manager at CHIL Investment Ltd, combining technical problem-solving with operational leadership.",
  aboutFull: [
    "I’m Lamidi Abdulhameed Olawale, a passionate Web Developer and the founder of CHILL TECH LTD, focused on building modern, responsive, and high-performance digital solutions for businesses and individuals.",
    "My experience spans Frontend Development, React.js, JavaScript, HTML, CSS, UI/UX Design, and modern web technologies. I enjoy turning ideas into functional, visually engaging websites that solve real-world problems.",
    "Beyond technology, I have a strong background in leadership, discipline, and organization, having held multiple leadership positions throughout my academic journey. These experiences shaped my ability to take responsibility, work with people, and lead with confidence.",
    "My long-term vision is to grow CHILL TECH LTD into a full-service company combining technology, real estate, and gadgets/electronics, creating innovative solutions and opportunities across different industries.",
    "I’m constantly learning, building, and improving — with the goal of becoming a highly skilled technology professional and building products that make a meaningful impact."
  ],
};

export const stats = [
  { label: "Projects Delivered", value: 7, suffix: "+" },
  { label: "Investors Served", value: 500, suffix: "+" },
  { label: "Plots Allocated", value: 1000, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
];

export const education = [
  {
    school: "Aptech Computer Education",
    degree: "Software Engineering Student",
    detail: "Currently studying Software Engineering with practical training in programming, web development, databases, software design, and modern application development.",
    coursework: "Programming Principles & Techniques • Logic Building & C Programming • Modern Website Development • UI/UX Responsive Design • Frontend Development with React • Object-Oriented Programming • Database Management with SQL • Generative AI",
    period: "Present",
  },
  {
    school: "Police Secondary School, Akure",
    degree: "Senior Secondary School Certificate Examination (SSCE)",
    detail: "Secondary Education — SSCE CERTIFICATE",
    achievement: "Became the first Student Provost in the history of Police Secondary School, Akure, demonstrating leadership, responsibility, discipline, organization, and decision-making.",
    period: "Completed",
  },
];

export const experience = [
  {
    role: "Founder & Web Developer",
    org: "CHILL TECH LTD",
    location: "Nigeria",
    period: "Present",
    points: [
      "Lead the company's digital and technology direction and manage client-facing software projects",
      "Design and develop responsive websites and web applications based on business requirements",
      "Translate client requirements into practical, user-focused digital solutions",
      "Manage projects from consultation and planning through development, testing, deployment, and delivery",
      "Build and maintain projects using modern frontend technologies and version-control workflows",
      "Deploy and maintain websites using platforms including Vercel and Netlify",
      "Develop solutions for e-commerce, real estate, logistics, education, and business use cases",
    ],
    achievements: [
      "Founded and lead CHILL TECH LTD, combining technology development with business-focused digital solutions",
      "Successfully delivered 7+ web projects across different industries",
    ],
  },
  {
    role: "General Manager",
    org: "CHIL Investment Ltd",
    location: "Nigeria",
    period: "Present",
    points: [
      "Coordinate day-to-day business operations and support management decision-making",
      "Manage relationships with investors, clients, stakeholders, and business partners",
      "Support land documentation, property allocation, sales, and estate development activities",
      "Contribute to business growth, customer service, property marketing, and operational improvement",
      "Coordinate stakeholders and support the effective execution of company initiatives",
    ],
    achievements: [
      "Managed real estate investments for 500+ investors across Nigeria",
      "Supervised allocation of 1,000+ plots across multiple estate locations",
    ],
  },
];

export const skills = [
  {
    category: "Real Estate & Business",
    items: [
      { name: "Property Investment", level: 92 },
      { name: "Portfolio Management", level: 90 },
      { name: "Investor Relations", level: 90 },
      { name: "Land Documentation & Sales Strategy", level: 85 },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "React", level: 88 },
      { name: "JavaScript (ES6+) / TypeScript", level: 82 },
      { name: "Three.js", level: 76 },
      { name: "Node.js / Express", level: 78 },
    ],
  },
  {
    category: "Design & UI/UX",
    items: [
      { name: "UI/UX Design", level: 82 },
      { name: "Wireframing & Prototyping", level: 78 },
      { name: "Responsive Design", level: 88 },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git / GitHub", level: 86 },
      { name: "Vercel / Netlify", level: 88 },
      { name: "Figma", level: 76 },
    ],
  },
];

export const tools = [
  { label: "Git", color: "orange" },
  { label: "GitHub", color: "indigo" },
  { label: "Figma", color: "purple" },
  { label: "Vercel", color: "blue" },
  { label: "Netlify", color: "green" },
  { label: "VS Code", color: "blue" },
];

export const achievements = [
  "Managing real estate investments for 500+ investors across Nigeria",
  "Successfully delivered 7+ web projects for diverse industries",
  "Operating across Lagos, Ogun, and Oyo States",
  "Maintaining 98% client satisfaction rate at CHIL Investment Ltd",
  "Built and launched multiple production-ready web applications",
  "Increased investor portfolio by 40% year-on-year",
];

export const languages = [
  { name: "English", level: "Professional Fluency" },
  { name: "Yoruba", level: "Native" },
];

export const projects = [
  {
    title: "CHIL Investment Ltd",
    description:
      "Real estate investment portal with interactive property showcase, investment calculator, and client management system.",
    tech: ["React", "Three.js", "CSS"],
    link: "https://chil-investment-ltd.vercel.app/",
    featured: true,
  },
  {
    title: "Queen Smile",
    description: "E-commerce platform for home and kitchen products with WhatsApp ordering.",
    tech: ["React", "CSS", "Vercel"],
    link: "https://queen-smile1.vercel.app/",
    featured: false,
  },
  {
    title: "Dave Cargo",
    description: "International logistics platform connecting UK to Nigeria with real-time cargo tracking.",
    tech: ["React", "CSS", "Netlify"],
    link: "https://dave-cargo.vercel.app/",
    featured: false,
  },
  {
    title: "Royal Furniture",
    description: "Handcrafted furniture brand website with gallery and custom order system.",
    tech: ["React", "CSS", "Vercel"],
    link: "https://royal-funiture.vercel.app/",
    featured: false,
  },
  {
    title: "LEGACY.streetwear",
    description: "Fashion brand e-commerce with product catalogue and brand storytelling.",
    tech: ["React", "CSS", "Vercel"],
    link: "https://legacy-streetwear-collection.vercel.app",
    featured: false,
  },
  {
    title: "Ali Institute",
    description: "Educational platform for Quran memorisation.",
    tech: ["React", "CSS", "Vercel"],
    link: "https://ali-institute-for-qur-an-memorizati.vercel.app/",
    featured: false,
  },
  {
    title: "Mr. Chills Expense Tracker",
    description: "Fintech application with budget tracking and AI-powered analytics.",
    tech: ["React", "Netlify"],
    link: "https://agent-6a12c2049b12b62ef--mrchill-expense-tracker.netlify.app",
    featured: false,
  },
  {
    title: "Carrio Motors",
    description: "Automotive dealership platform showcasing premium vehicles and services.",
    tech: ["React", "CSS", "Vercel"],
    link: "https://carrio-motors-opal.vercel.app/",
    featured: false,
  },
  {
    title: "Transbridge Logistics",
    description: "Logistics and supply chain management solution.",
    tech: ["React", "CSS", "Vercel"],
    link: "https://transbridgelogistics.vercel.app/",
    featured: false,
  },
  {
    title: "Tife Global",
    description: "Business and corporate platform for global services.",
    tech: ["React", "CSS", "Vercel"],
    link: "https://tife-global.vercel.app/",
    featured: false,
  },
  {
    title: "The Glossy Scent",
    description: "Beauty & lifestyle e-commerce store featuring perfumes, skincare, body care and self-care essentials — everything to smell good and glow.",
    tech: ["React", "CSS", "Vercel"],
    link: "https://the-glossy-scent.vercel.app/",
    featured: false,
  },
];

export const testimonials = [
  {
    quote: "Working with Lamidi was a game-changer. The platform he built exceeded our expectations in every way.",
    name: "Chief Ololade",
    role: "CEO",
  },
  {
    quote: "He delivered a robust real estate platform that streamlined our entire investment process. Highly recommended.",
    name: "CHIL Investment Ltd",
    role: "Management",
  },
  {
    quote: "Exceptional attention to detail and a deep understanding of our business needs. The final product is flawless.",
    name: "Busari Ibrahim",
    role: "Director",
  },
  {
    quote: "Fast turnaround and great communication. The digital solution he provided has boosted our online presence significantly.",
    name: "Tife",
    role: "CEO, Tife Global",
  },
  {
    quote: "He translated our complex logistics workflow into a user-friendly platform that our whole team actually uses daily.",
    name: "Dave",
    role: "CEO, Dave Cargo",
  },
  {
    quote: "Professional, reliable, and incredibly skilled. The website is fast, responsive, and looks absolutely amazing.",
    name: "Tola",
    role: "Founder",
  },
  {
    quote: "A fantastic educational platform was built for us. The interface is intuitive and perfectly tailored for our students.",
    name: "Ali Institute",
    role: "Director",
  },
];
