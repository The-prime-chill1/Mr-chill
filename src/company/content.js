export const services = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web Development & Digital Engineering',
    summary: 'Fast, responsive, conversion-focused websites engineered around your business goals.',
    details: ['Corporate websites', 'Landing pages', 'Web portals', 'Performance optimization'],
  },
  {
    id: 'custom-software',
    number: '02',
    title: 'Custom Software & Business Applications',
    summary: 'Purpose-built applications that simplify workflows, connect teams, and support growth.',
    details: ['Business dashboards', 'Internal tools', 'Client portals', 'Workflow systems'],
  },
  {
    id: 'commerce',
    number: '03',
    title: 'E-commerce & Digital Commerce',
    summary: 'Reliable commerce experiences that make products easier to discover, trust, and purchase.',
    details: ['Online stores', 'Product catalogues', 'Order journeys', 'Commerce integrations'],
  },
  {
    id: 'product-design',
    number: '04',
    title: 'Product Strategy & UI/UX Design',
    summary: 'Clear digital product direction, usable interfaces, and visual systems built for real users.',
    details: ['Discovery', 'User journeys', 'Interface design', 'Prototyping'],
  },
  {
    id: 'industry-solutions',
    number: '05',
    title: 'Industry Technology Solutions',
    summary: 'Practical digital systems for real estate, logistics, education, commerce, and service businesses.',
    details: ['Property platforms', 'Logistics portals', 'Education systems', 'Business automation'],
  },
  {
    id: 'support',
    number: '06',
    title: 'Deployment, Support & Growth',
    summary: 'Launch support, technical maintenance, and continuous improvements after delivery.',
    details: ['Cloud deployment', 'Technical support', 'SEO foundations', 'Product iteration'],
  },
];

export const solutions = [
  {
    title: 'Business Presence',
    text: 'Professional digital experiences that communicate credibility, explain your value, and convert interest into action.',
    outcomes: ['Stronger brand trust', 'Clearer customer journeys', 'More qualified enquiries'],
  },
  {
    title: 'Operational Efficiency',
    text: 'Custom portals and applications that replace repetitive processes with clearer, connected workflows.',
    outcomes: ['Less manual work', 'Better information access', 'More consistent operations'],
  },
  {
    title: 'Digital Commerce',
    text: 'Commerce platforms designed around product discovery, simple ordering, and dependable customer experiences.',
    outcomes: ['Improved product visibility', 'Simpler sales journeys', 'Scalable digital channels'],
  },
  {
    title: 'Industry Platforms',
    text: 'Focused solutions for property, logistics, education, and other sectors with specialized digital needs.',
    outcomes: ['Sector-relevant workflows', 'Purpose-built features', 'Room for future expansion'],
  },
];

export const values = [
  ['Business before features', 'We begin with the commercial goal, the users, and the real problem technology needs to solve.'],
  ['Quality with clarity', 'We value thoughtful execution, transparent communication, and dependable delivery.'],
  ['Built for growth', 'Our products are designed to remain useful, maintainable, and adaptable as a business evolves.'],
  ['Long-term partnership', 'Launch is a milestone, not the end of the relationship. We support improvement beyond delivery.'],
];

export const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const portfolioProjects = [
  {
    title: 'Olorunayo Global Ventures Ltd',
    link: 'https://olorunayo-global-ventures-ltd-ten.vercel.app/',
    preview: '/project-previews/olorunayo-global.png',
    description: 'Corporate digital presence presenting the company, its business activities, and a clear route for customers and partners to connect.',
    category: 'Corporate & Business Websites', industry: 'Corporate services', status: 'Live project',
    services: ['Website strategy', 'UI/UX design', 'Responsive development'], tech: [],
  },
  {
    title: 'Amsolf Prints and Packed',
    link: 'https://amsolf-prints-and-packed.vercel.app/',
    preview: '/project-previews/amsolf-prints.png',
    description: 'Commercial printing, publishing, packaging, and corporate branding website designed to present services and generate customer enquiries.',
    category: 'Corporate & Business Websites', industry: 'Printing & packaging', status: 'Live project',
    services: ['Website design', 'Responsive development', 'SEO foundations'], tech: ['React', 'CSS', 'Vercel'],
  },
  {
    title: 'R&G Collections',
    link: 'https://r-g-three.vercel.app/',
    preview: '/project-previews/rg-collections.png',
    description: 'Modern retail showcase created to present fashion and lifestyle products through a clear, polished digital shopping experience.',
    category: 'E-commerce & Retail', industry: 'Fashion & retail', status: 'Live project',
    services: ['E-commerce experience', 'UI/UX design', 'Responsive development'], tech: [],
  },
  {
    title: 'Chill Cakes & Pastries',
    link: 'https://chill-pi-green.vercel.app/',
    preview: '/project-previews/chill-cakes.png',
    description: 'A visual bakery and pastry concept demonstrating product presentation, brand storytelling, and a potential digital ordering journey.',
    category: 'Concept & Experimental Projects', industry: 'Food & hospitality', status: 'Concept / Demo — not a live purchasing platform',
    services: ['Concept design', 'Frontend development', 'Product showcase'], tech: [], concept: true,
  },
  {
    title: "The Noble Qur'an",
    link: 'https://chill-noble-quran.vercel.app/',
    preview: '/project-previews/noble-quran.png',
    description: "A respectful digital Qur'an experience focused on accessible reading, thoughtful navigation, and a calm, focused interface.",
    category: 'Education & Islamic Platforms', industry: 'Islamic digital education', status: 'Live project',
    services: ['Product design', 'Frontend development', 'Responsive experience'], tech: [],
  },
  {
    title: 'CHILLVERSE',
    link: 'https://chill-verse-kappa.vercel.app/',
    preview: '/project-previews/chillverse.png',
    description: 'An interactive digital experience exploring creative technology, visual storytelling, and immersive web presentation.',
    category: 'Entertainment & Digital Experiences', industry: 'Creative technology', status: 'Live experimental project',
    services: ['Creative direction', 'Interactive development', 'Digital experience design'], tech: [],
  },
  {
    title: 'Olorunayo Afgbeirinajo Recruitment Ltd',
    link: 'https://olorunayo-afgbeirinajo-recruitment.vercel.app/',
    preview: '/project-previews/olorunayo-recruitment.png',
    description: 'Recruitment and candidate onboarding platform created to make applicant registration and organizational communication clearer.',
    category: 'Corporate & Business Websites', industry: 'Recruitment', status: 'Live project',
    services: ['Business website', 'Candidate onboarding flow', 'Responsive development'], tech: ['React', 'CSS', 'Vercel'],
  },
  {
    title: 'Al-Irshaad Islamic Institute',
    link: 'https://al-irshaadislamicinstitute.com/',
    preview: '/project-previews/al-irshaad.png',
    description: "International online Islamic education platform presenting Qur'an, Tajweed, Hifdh, Arabic programs, and student enrolment information.",
    category: 'Education & Islamic Platforms', industry: 'Online Islamic education', status: 'Live client project',
    services: ['Education website', 'Programme architecture', 'SEO foundations'], tech: ['React', 'CSS'],
  },
  {
    title: "Ali Institute for Qur'an Memorization (AIQM)",
    link: 'https://ali-institute-for-qur-an-memorizati.vercel.app/',
    preview: '/project-previews/ali-institute.png',
    description: "Educational platform designed to communicate the institute's Qur'an memorization offering and support prospective student enquiries.",
    category: 'Education & Islamic Platforms', industry: "Qur'an education", status: 'Live project',
    services: ['Education website', 'UI/UX design', 'Responsive development'], tech: ['React', 'CSS', 'Vercel'],
  },
  {
    title: 'TransBridge Logistics',
    link: 'https://trans-bridge-logistics.vercel.app/',
    preview: '/project-previews/transbridge.png',
    description: 'International freight and logistics website explaining door-to-door shipping services between the United Kingdom and Nigeria.',
    category: 'Logistics & Transportation', industry: 'Freight & logistics', status: 'Live client project',
    services: ['Corporate website', 'Service presentation', 'Responsive development'], tech: ['React', 'Three.js', 'CSS', 'Vercel'],
  },
  {
    title: 'Carrio Motors',
    link: 'https://carrio-motors-opal.vercel.app/',
    preview: '/project-previews/carrio-motors.png',
    description: 'Automotive dealership platform showcasing premium vehicles through a responsive, image-led browsing experience.',
    category: 'E-commerce & Retail', industry: 'Automotive', status: 'Academic project — Distinction',
    services: ['Product showcase', 'Frontend development', 'Responsive UI'], tech: ['React', 'CSS', 'Vercel'],
  },
  {
    title: 'BudgetBasics',
    link: 'https://budgetbasics-two.vercel.app/',
    preview: '/project-previews/budget-basics.png',
    video: 'https://youtu.be/F4XqTGBhddY',
    description: 'Financial literacy and budgeting platform with expense logging, 50/30/20 planning, analytics, and supporting technical documentation.',
    category: 'Finance & Technology', industry: 'Fintech education', status: 'Founder-led TechWiz competition project',
    services: ['Product development by Founder', 'Financial UX', 'Frontend engineering'], tech: ['React', 'Vite', 'CSS', 'Vercel'],
    attribution: 'CHILL TECH LTD client-delivery contribution is not independently confirmed; presented as a verified Founder-led competition project.',
  },
];

export const projectCategories = ['All', 'Corporate & Business Websites', 'E-commerce & Retail', 'Education & Islamic Platforms', 'Logistics & Transportation', 'Entertainment & Digital Experiences', 'Finance & Technology', 'Concept & Experimental Projects'];

export const companyProjects = portfolioProjects.map((project) => ({
  ...project,
  slug: slugify(project.title),
  sector: project.industry,
  challenge: `Create a credible, responsive digital experience for ${project.title} that clearly communicates its purpose and supports its intended audience.`,
  solution: project.description,
  outcome: 'A modern, responsive digital foundation with clear information architecture, purposeful visual design, and direct paths for users to engage.',
}));
