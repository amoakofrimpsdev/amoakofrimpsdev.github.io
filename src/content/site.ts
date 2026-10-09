/**
 * Everything the site says about Daniel lives here and in case-studies.ts.
 * Pages read from these modules, so a copy change is a one-file edit.
 */

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time. Set
// NEXT_PUBLIC_SITE_URL to override it, for example with a custom domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const profile = {
  name: "Daniel Amoako Frimpong",
  shortName: "Daniel Frimpong",
  role: "Software Engineer",
  location: "Los Angeles, CA",
  timeZone: "America/Los_Angeles",
  email: "amoakofrimps@gmail.com",
  github: "https://github.com/amoakofrimpsdev",
  linkedin: "https://www.linkedin.com/in/danielfrimps/",
  instagram: "https://www.instagram.com/bits.by.anda/",
  summary:
    "Software engineer in Los Angeles. I build web applications end to end, with React and TypeScript in front and Node and Express behind. MS in Computer Science from USC.",
  intro:
    "React and TypeScript in front, Node and Express behind. I hold an MS in Computer Science from USC, and I currently lead a 10-person team building a Unity and C# game at Easley-Dunn Productions.",
};

export const facts = [
  { label: "Now", value: "Software Engineer Intern", detail: "Easley-Dunn Productions" },
  { label: "Before", value: "Web Application Developer", detail: "Cadi Media, 2020 to 2024" },
  { label: "Education", value: "MS Computer Science", detail: "USC, May 2026" },
];

export const receipts = [
  {
    value: "31 of 34",
    label: "merged pull requests reviewed and merged as lead of a 10-person team",
    source: "Easley-Dunn",
  },
  {
    value: "~350",
    label: "parents using the school grade portal in its first year",
    source: "Cadi Media",
  },
  {
    value: "30 → 60",
    label: "frames per second, after adding frustum culling to the renderer",
    source: "Prime Engine",
  },
  {
    value: "0.947",
    label: "macro F1 across 17 pest species, best of five backbones",
    source: "Jute classifier",
  },
];

export type Role = {
  title: string;
  org: string;
  kind?: string;
  place: string;
  start: string;
  end: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    title: "Software Engineer Intern",
    org: "Easley-Dunn Productions, Inc.",
    place: "Remote",
    start: "Jun 2026",
    end: "Present",
    current: true,
    points: [
      "Lead a 10-person engineering team building Monster Gridiron, a Unity and C# game: running standups, assigning tasks on Kanboard, and reporting progress to the professor leading the project.",
      "Reviewed and merged 31 of the team's 34 merged pull requests since June, acting as the final quality check on everything that reaches the main branch.",
      "Built a consolidated test runner that runs 7 unit and integration test suites in one command and generates a comprehensive report.",
      "Refactored legacy code using SOLID principles and added CI/CD automation, cutting new developer onboarding time in half.",
      "Use GitHub Copilot daily in production work, and built a subsystem reset menu so teammates can reset game state between tests.",
    ],
    stack: ["C#", "Unity", "GitHub", "Kanboard", "CI/CD", "GitHub Copilot"],
  },
  {
    title: "Web Application Developer",
    org: "Cadi Media",
    kind: "Part-time / Co-op",
    place: "Remote",
    start: "Jun 2020",
    end: "Apr 2024",
    points: [
      "Built and deployed client web applications end to end on MERN (React) and MEAN (Angular) stacks, improving average page load times by an estimated 30 to 40%.",
      "Shipped a secure parent portal with a React front end, a Node and Express API, JWT authentication, and SSL, from requirements through production launch. Roughly 350 parents across two schools used it in its first year.",
      "Engineered RESTful APIs with Node and Express against SQL and NoSQL (MongoDB) databases, and designed ETL pipelines that kept data consistent across concurrent client applications.",
      "Wrote and maintained unit tests across a portfolio of client applications, and worked directly with clients and non-technical staff to triage issues and ship fixes on a regular cadence.",
    ],
    stack: ["React", "Angular", "TypeScript", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    title: "STEM Facilitator",
    org: "The Makersplace",
    kind: "Part-time",
    place: "Accra, Ghana",
    start: "Oct 2022",
    end: "Jan 2024",
    points: [
      "Built the Makersplace admin dashboard in React, Node, and MongoDB so non-technical staff could update the site themselves. A content update went from over 3 hours to under 50 minutes.",
      "Trained 15 students on TinyML for smart agriculture with Raspberry Pi Pico and Edge Impulse. Their crop yield prototypes reached 95% model accuracy.",
    ],
    stack: ["React", "Node.js", "MongoDB", "TinyML"],
  },
];

export const teaching = [
  {
    title: "Lead Robotics Trainer",
    org: "Coderina EdTech Foundation",
    dates: "2020 to 2024",
    note: "Taught robotics, programming, and embedded systems to students from 50 high schools across 5 regions of Ghana. Teams I mentored finished top 5 at the national competition three years running.",
  },
  {
    title: "Robotics Trainer, National Service",
    org: "National Service Scheme, Ghana",
    dates: "2021 to 2022",
    note: "Trained students aged 8 to 18 in programming and robotics with LEGO kits.",
  },
  {
    title: "Volunteer",
    org: "MTN Foundation, Yello Care",
    dates: "2024",
    note: "Ran 3D printing and physical computing workshops for 30 teachers and students, and built an IoT smart borehole with turbidity and pH sensors and an Android control interface.",
  },
  {
    title: "Science and ICT Teacher",
    org: "Bask Academy",
    dates: "2017 to 2020",
    note: "Taught students aged 10 to 18, part-time alongside my undergraduate degree.",
  },
];

export const education = [
  {
    school: "University of Southern California",
    degree: "MS, Computer Science",
    dates: "Aug 2024 to May 2026",
    place: "Los Angeles, CA",
    coursework:
      "Databases, Analysis of Algorithms, Machine Learning, Autonomous Cyber-Physical Systems, Web Technologies, Software Engineering",
  },
  {
    school: "Ghana Communication Technology University",
    degree: "BSc, Information Technology, First Class Honours",
    dates: "Jan 2018 to Oct 2021",
    place: "Accra, Ghana",
    coursework:
      "Algorithms, Operating Systems, Artificial Intelligence, Web Technology, Compilers and Translators",
  },
];

export const toolkit = [
  {
    title: "Frontend",
    note: "Where I spend most of my time",
    items: ["React", "Next.js", "TypeScript", "Angular", "Tailwind CSS", "Accessible, responsive UI"],
  },
  {
    title: "Backend",
    note: "APIs and data",
    items: ["Node.js", "Express", "REST APIs", "JWT auth", "PostgreSQL / PostGIS", "MongoDB and SQLite"],
  },
  {
    title: "Languages",
    note: "Strongest first",
    items: ["TypeScript / JavaScript", "Python", "C#", "C++", "Java", "SQL"],
  },
  {
    title: "Delivery",
    note: "Getting it to production",
    items: ["Git and pull request review", "CI/CD", "Docker", "AWS and Azure", "Jest and PyTest", "Agile sprints"],
  },
];

export const moreProjects = [
  {
    title: "Weather Application",
    blurb:
      "An Angular web app and a Swift iOS app on one Node and Express API, hosted on Azure with MongoDB. Containerized with Docker and deployed through Azure DevOps.",
    stack: ["Angular", "SwiftUI", "Node.js", "Azure"],
    links: [
      { label: "Web demo", href: "https://youtu.be/-3gzps2bxKQ" },
      { label: "iOS demo", href: "https://youtu.be/UW1LsexSrEE" },
    ],
  },
  {
    title: "Geospatial Database",
    blurb:
      "PostgreSQL with PostGIS: a data model plus spatial SQL for convex hulls and nearest neighbor queries, checked against ArcGIS Online, Google Earth, and an OpenLayers map.",
    stack: ["PostgreSQL", "PostGIS", "SQL"],
    links: [],
  },
  {
    title: "A Proposed GSM Based Smart Farming System",
    blurb:
      "A research paper on IoT farm monitoring over GSM, written for rural areas where 2G coverage is dependable and faster networks are not.",
    stack: ["Research", "Arduino", "GSM"],
    links: [
      {
        label: "ResearchGate",
        href: "https://www.researchgate.net/publication/372395386_A_Proposed_GSM_Based_Smart_Farming_System",
      },
    ],
  },
  {
    title: "Python Image Downloader",
    blurb: "A scripted bulk image downloader built to get through large batches.",
    stack: ["Python"],
    links: [{ label: "Demo", href: "https://youtu.be/jlfQQrZS1pA" }],
  },
];

export const community = [
  {
    src: "/images/photos/workshop.jpg",
    alt: "A small group working through an electronics exercise around a table with a laptop",
    caption: "Hands-on physical computing workshop",
    width: 1280,
    height: 960,
  },
  {
    src: "/images/photos/coderina-fll.jpg",
    alt: "A framed award being presented at a FIRST LEGO League event, with Coderina banners behind",
    caption: "FIRST LEGO League national event with Coderina",
    width: 1280,
    height: 721,
  },
  {
    src: "/images/photos/mtn-borehole.jpg",
    alt: "A certificate being presented on stage at the MTN Yello Care event",
    caption: "MTN Yello Care project handover",
    width: 1280,
    height: 876,
  },
];
