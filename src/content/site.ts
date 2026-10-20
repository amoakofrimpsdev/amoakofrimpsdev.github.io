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
    "Software engineer in Los Angeles. I build systems that hold up in production: data ingestion, access control, background jobs, and the tests that keep them correct. MS in Computer Science from USC.",
  intro:
    "I lead a 10-person team building a Unity and C# game at Easley-Dunn Productions, and I build production systems of my own: a job search engine that reads 2,500 employer boards, and a media platform my church runs on. MS in Computer Science, USC.",
};

export const facts = [
  { label: "Now", value: "Software Engineer Intern", detail: "Leading a 10-person team, Easley-Dunn" },
  { label: "Building", value: "Jobhunt and RCW Media", detail: "Both in real use" },
  { label: "Education", value: "MS Computer Science", detail: "USC, May 2026" },
];

export const receipts = [
  {
    value: "31 of 34",
    label: "merged pull requests reviewed and merged as lead of a 10-person team",
    source: "Easley-Dunn",
  },
  {
    value: "~30x",
    label: "faster dashboard queries, found by a load test with two years of data",
    source: "RCW Media",
  },
  {
    value: "30 → 60",
    label: "frames per second, after adding frustum culling to the renderer",
    source: "Prime Engine",
  },
  {
    value: "~2,500",
    label: "employer job boards read incrementally, across 12 providers",
    source: "Jobhunt",
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
      "Designed and shipped an authenticated grade portal for two schools: a Node and Express API with JWT authentication and SSL, taken from requirements through production launch. Roughly 350 parents used it in its first year.",
      "Engineered RESTful APIs and backend services against SQL and NoSQL (MongoDB) databases, and designed ETL pipelines that kept data consistent across concurrent client applications.",
      "Built and deployed client applications on MERN and MEAN stacks, improving average page load times by an estimated 30 to 40%.",
      "Wrote and maintained unit tests across a portfolio of client applications, and worked directly with clients and non-technical staff to triage issues and ship fixes on a regular cadence.",
    ],
    stack: ["Node.js", "Express", "TypeScript", "MongoDB", "SQL", "JWT", "React", "Angular"],
  },
  {
    title: "STEM Facilitator",
    org: "The Makersplace",
    kind: "Part-time",
    place: "Accra, Ghana",
    start: "Oct 2022",
    end: "Jan 2024",
    points: [
      "Built an internal admin tool on Node, MongoDB, and React so non-technical staff could manage site content themselves. A content update went from over 3 hours to under 50 minutes.",
      "Trained 15 students on TinyML for smart agriculture with Raspberry Pi Pico and Edge Impulse. Their crop yield prototypes reached 95% model accuracy.",
    ],
    stack: ["Node.js", "MongoDB", "TinyML", "Edge Impulse"],
  },
];

export const teaching = [
  {
    title: "Head Robotics Trainer",
    org: "Coderina EdTech Foundation",
    dates: "2022 to 2024",
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
    title: "Languages",
    note: "Strongest first",
    items: ["TypeScript / JavaScript", "Python", "C#", "C++", "Java", "SQL", "Go (learning)"],
  },
  {
    title: "Systems and data",
    note: "Services, storage, access",
    items: [
      "Node.js and Express services",
      "REST APIs and auth (JWT, OAuth)",
      "PostgreSQL, Row Level Security, query plans",
      "SQLite, MongoDB, PostGIS",
      "Background jobs and ETL pipelines",
      "Supabase, Google and Telegram APIs",
    ],
  },
  {
    title: "Testing and delivery",
    note: "Keeping it correct",
    items: [
      "Unit, integration, end-to-end, load tests",
      "Vitest, Playwright, Node test runner, PyTest",
      "CI with GitHub Actions",
      "Code review (31 of a team's 34 merged PRs)",
      "Docker, Vercel, AWS, Azure",
      "Claude Code and GitHub Copilot",
    ],
  },
  {
    title: "Also",
    note: "When the project needs it",
    items: ["Unity and game systems", "React, Next.js, Angular", "Tauri desktop apps", "TensorFlow and OpenCV", "Controls and formal specs (STL)", "Embedded: Arduino, Raspberry Pi"],
  },
];

export const moreProjects = [
  {
    title: "Follow Up",
    blurb:
      "An installable web app for following up after Bible study invitations. Tap a color for how someone came across, and it drafts a message in their communication style, 20 tones in all, to send from your own phone. Contacts stay on the device, with no server to breach.",
    stack: ["Next.js", "TypeScript", "PWA"],
    links: [{ label: "GitHub", href: "https://github.com/amoakofrimpsdev/Follow-up-app" }],
  },
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
