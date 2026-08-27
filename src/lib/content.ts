export const site = {
  name: "Daniel Amoako Frimpong",
  role: "Software Engineer",
  location: "Los Angeles, CA",
  email: "amoakofrimps@gmail.com",
  phone: "(323) 791-5522",
  github: "https://github.com/amoakofrimpsdev",
  linkedin: "https://www.linkedin.com/in/danielfrimps/",
  instagram: "https://www.instagram.com/bits.by.anda/",
  url: "https://amoakofrimpsdev.github.io",
  tagline:
    "I build web applications end to end. React and TypeScript on the front, Node and Express behind it. Finishing an MS in Computer Science at USC in May 2026.",
  roles: [
    "Full Stack Engineer",
    "React + TypeScript",
    "Node.js + Express",
    "MS CS, USC",
    "Robotics Trainer",
  ],
};

export const stats = [
  { value: 6, suffix: "+", label: "Years writing web applications" },
  { value: 350, suffix: "+", label: "Parents using the school portal" },
  { value: 50, suffix: "+", label: "High schools taught robotics" },
  { value: 0.947, decimals: 3, label: "Best macro F1, pest classifier" },
];

export const marquee = [
  "TypeScript", "React", "Next.js", "Angular", "Tailwind CSS", "Node.js",
  "Express", "REST APIs", "GraphQL", "Python", "Java", "C#", "C++",
  "PostgreSQL", "PostGIS", "MongoDB", "Docker", "CI/CD", "AWS", "Azure",
  "Jest", "PyTest", "TensorFlow", "SwiftUI",
];

export type Experience = {
  start: string;
  end: string;
  role: string;
  employment?: string;
  org: string;
  place: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    start: "Jun 2026",
    end: "Present",
    current: true,
    role: "Software Engineer Intern",
    org: "Easley-Dunn Productions, Inc.",
    place: "Remote",
    points: [
      "Maintain a production C# game codebase in GitHub and Visual Studio, reviewing and refactoring modules on Agile sprint cycles.",
      "Run the pull request pipeline: code reviews, unit tests, and the architectural standards that keep releases predictable.",
      "Refactored legacy code around SOLID principles and CI/CD automation, which cut new developer onboarding time by half.",
      "Debug and resolve issues in live production code, tracking bug reports through to a merged fix.",
    ],
    stack: ["C#", "Visual Studio", "GitHub", "Unit Testing", "CI/CD", "Agile"],
  },
  {
    start: "Jun 2020",
    end: "Apr 2024",
    role: "Web Application Developer",
    employment: "Part-Time / Co-op",
    org: "Cadi Media",
    place: "Remote",
    points: [
      "Built and deployed client web applications end to end on MERN (React) and MEAN (Angular) stacks, cutting average page load times by 30 to 40 percent.",
      "Shipped a secure parent portal with a React front end, Node and Express behind it, JWT authentication and SSL, taking it from requirements through production launch. It reached 350+ parents across two schools in the first year and replaced their paper report cards.",
      "Engineered RESTful APIs in Node and Express against both SQL and NoSQL databases.",
      "Designed ETL pipelines in Node against NoSQL stores to keep data consistent across concurrent client applications.",
      "Worked directly with clients and non-technical staff to triage issues and ship fixes on a regular cadence.",
    ],
    stack: ["React", "Angular", "TypeScript", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    start: "Jun 2020",
    end: "Apr 2024",
    role: "Lead Robotics Trainer",
    employment: "Part-Time",
    org: "Coderina EdTech Foundation",
    place: "Ghana",
    points: [
      "Taught robotics, programming, and embedded systems to students from 50 high schools across 5 regions of Ghana, using VEX, LEGO EV3, and Arduino kits.",
      "Coached teams to top 5 finishes at the national robotics competition three years running.",
      "Wrote curriculum that got technical ideas across to complete beginners, and trained 20 new instructors to teach it.",
    ],
    stack: ["Python", "Arduino", "VEX", "LEGO EV3", "Curriculum"],
  },
  {
    start: "Oct 2022",
    end: "Jan 2024",
    role: "STEM Facilitator",
    employment: "Part-Time",
    org: "The Makersplace",
    place: "Accra, Ghana",
    points: [
      "Built the Makersplace admin dashboard in React, Node, and MongoDB so non-technical staff could update the site themselves. Content updates dropped from over 3 hours to under 50 minutes.",
      "Trained 15 students on TinyML for smart agriculture with Raspberry Pi Pico and Edge Impulse. Their crop yield prototypes reached 95 percent model accuracy.",
      "Coached a Makersplace robotics team to first place at the national competition.",
    ],
    stack: ["React", "Node.js", "MongoDB", "TinyML", "Edge Impulse"],
  },
  {
    start: "Sep 2021",
    end: "Sep 2022",
    role: "Robotics Trainer",
    employment: "National Service",
    org: "National Service Scheme",
    place: "Ghana",
    points: [
      "Trained students aged 8 to 18 in programming and robotics across more than 50 schools nationwide.",
      "Walked students through structured problem solving with LEGO robotics kits.",
    ],
    stack: ["LEGO Robotics", "Scratch", "Facilitation"],
  },
  {
    start: "May 2017",
    end: "Sep 2020",
    role: "Science & ICT Teacher",
    employment: "Part-Time",
    org: "Bask Academy",
    place: "Greater Accra, Ghana",
    points: [
      "Taught Science and ICT to students aged 10 to 18 alongside my undergraduate studies.",
    ],
    stack: ["ICT", "Teaching"],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  kind: "featured" | "standard";
  blurb: string;
  body?: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  code?: string;
};

export const projects: Project[] = [
  {
    slug: "carla-acc",
    title: "Adaptive Cruise Control in CARLA",
    category: "Autonomous Systems / Controls",
    kind: "featured",
    blurb:
      "A zone based cruise controller for a simulated vehicle, checked against Signal Temporal Logic safety requirements with the RT-AMT monitoring package.",
    body: [
      "An adaptive cruise controller for a simulated ego vehicle in the CARLA driving simulator, written for USC's Autonomous Cyber-Physical Systems course. It takes the host vehicle's velocity, the desired cruise speed, and the distance to the lead vehicle, then returns an acceleration command and an operating mode (cruising or following) on every simulation step.",
      "Instead of one control law covering every case, I split the problem into distance zones. A failsafe commands full braking if the lead vehicle crosses the minimum safe distance. Inside the braking zone, severity scales with how fast the gap is closing. At medium range acceleration is capped so the car does not close the gap aggressively. Past that, it is ordinary cruise control.",
      "I checked the result against Signal Temporal Logic safety and performance requirements using the RT-AMT offline monitoring package, across scenarios with different lead vehicle behavior.",
    ],
    stack: ["Python", "CARLA", "Signal Temporal Logic", "Controls"],
    code: `class Controller:
    def run_step(self, obs: Observation):
        gap = obs.lead_distance

        if gap < MIN_SAFE:            # failsafe
            return FULL_BRAKE, Mode.FOLLOWING
        if gap < BRAKE_ZONE:          # proportional braking
            accel = -K_P * (BRAKE_ZONE - gap)
        elif gap < CAUTION_ZONE:      # limited acceleration
            accel = min(self._cruise(obs), A_LIMIT)
        else:                         # clear road
            accel = self._cruise(obs)

        return self._clip_acc(accel), Mode.FOLLOWING`,
  },
  {
    slug: "jute-pest",
    title: "Jute Pest Image Classification",
    category: "Machine Learning / Computer Vision",
    kind: "featured",
    blurb:
      "A classifier for 17 species of agricultural pest. I benchmarked five pretrained backbones and macro F1 ranged from 0.007 to 0.947 depending on which one I picked.",
    body: [
      "A multi-class classifier for 17 species of jute pest, built with transfer learning. I froze five pretrained backbones (ResNet50, ResNet101, VGG16, EfficientNetB0, DenseNet201) and trained a classification head with batch normalization and dropout on each one. Preprocessing handled image scaling and zero-padding in OpenCV, with Keras augmentation on the training set.",
      "The benchmark turned out to be the interesting part. DenseNet201 reached 0.947 macro F1 and 0.9998 macro AUC on the held-out test set. EfficientNetB0, on identical training settings, collapsed to 0.007. Which pretrained features happen to transfer to your domain matters far more than model size or reputation.",
    ],
    stack: ["Python", "TensorFlow / Keras", "OpenCV", "Transfer Learning"],
  },
  {
    slug: "coursepilot",
    title: "CoursePilot",
    category: "Full Stack / AI",
    kind: "standard",
    blurb:
      "Turns a course syllabus into a structured study plan, pulling out the key information and generating flashcards and quizzes from it. Built and presented with a team.",
    stack: ["React", "Node.js", "LLM API"],
    links: [{ label: "Watch demo", href: "https://youtu.be/qufEGrl9WxU" }],
  },
  {
    slug: "geospatial-db",
    title: "Geospatial Database Project",
    category: "Databases / GIS",
    kind: "standard",
    blurb:
      "PostgreSQL and PostGIS for spatial queries: ST_ConvexHull and ST_Collect for geographic boundaries, plus a nearest neighbor query for the four closest points. Validated against ArcGIS Online, Google Earth, and an OpenLayers map.",
    stack: ["PostgreSQL", "PostGIS", "Python", "OpenLayers"],
  },
  {
    slug: "weather-web",
    title: "Weather Application",
    category: "Full Stack / Cloud",
    kind: "standard",
    blurb:
      "An Angular client pulling Google Maps, IPInfo, and Tomorrow.io, backed by a Node and Express API on Azure with MongoDB. Containerized and deployed through Azure DevOps, with Azure Monitor for logging.",
    stack: ["Angular", "Node.js", "Azure DevOps", "Docker", "MongoDB"],
    links: [{ label: "Watch demo", href: "https://youtu.be/-3gzps2bxKQ" }],
  },
  {
    slug: "swiftui-weather",
    title: "SwiftUI Weather App",
    category: "Mobile / iOS",
    kind: "standard",
    blurb:
      "The iOS version of the same product, written in SwiftUI against the same Node and MongoDB API on Azure.",
    stack: ["SwiftUI", "Node.js", "MongoDB", "Azure"],
    links: [{ label: "Watch demo", href: "https://youtu.be/UW1LsexSrEE" }],
  },
  {
    slug: "prime-engine",
    title: "Prime Engine",
    category: "Systems / C++",
    kind: "standard",
    blurb:
      "A C++ physics engine with AABB collision detection and custom data structures for mass and gravity. Frustum culling took the render loop from 30 to 60 FPS.",
    stack: ["C++", "OOP", "Physics", "Rendering"],
    links: [
      { label: "Frustum culling", href: "https://youtu.be/2CuNnX5yGOE" },
      { label: "Debugging & physics", href: "https://youtu.be/m3ptNx7EmwI" },
    ],
  },
  {
    slug: "image-downloader",
    title: "Python Image Downloader",
    category: "Automation",
    kind: "standard",
    blurb:
      "A Python tool for scripted bulk image downloads from web sources, built to handle large batches without falling over.",
    stack: ["Python", "Automation"],
    links: [{ label: "Watch demo", href: "https://youtu.be/jlfQQrZS1pA" }],
  },
];

export const juteResults = [
  { model: "ResNet50", precision: 0.442, recall: 0.442, f1: 0.41, auc: 0.873 },
  { model: "ResNet101", precision: 0.357, recall: 0.383, f1: 0.347, auc: 0.851 },
  { model: "VGG16", precision: 0.889, recall: 0.885, f1: 0.882, auc: 0.994 },
  { model: "EfficientNetB0", precision: 0.004, recall: 0.059, f1: 0.007, auc: 0.659 },
  { model: "DenseNet201", precision: 0.959, recall: 0.947, f1: 0.947, auc: 0.9998 },
];

export const juteFigures = [
  { src: "/images/jute_model_comparison.png", caption: "Macro-averaged metrics across all five backbones, test set" },
  { src: "/images/jute_confusion.png", caption: "Confusion matrix, DenseNet201, test set" },
  { src: "/images/jute_per_class.png", caption: "Per-class precision, recall and F1, DenseNet201" },
  { src: "/images/jute_training_loss.png", caption: "Training against validation loss, all five models" },
];

export const publication = {
  title: "A Proposed GSM Based Smart Farming System",
  venue: "Research paper, ResearchGate",
  abstract:
    "A framework, methodology, system architecture, and experimental results for IoT agricultural monitoring over GSM. It covers the microcontroller hardware design and makes the case for GSM as a low-infrastructure alternative to Wi-Fi or LoRa on rural farms, where 3G and 4G coverage is unreliable but 2G is everywhere.",
  links: [
    { label: "Read on ResearchGate", href: "https://www.researchgate.net/publication/372395386_A_Proposed_GSM_Based_Smart_Farming_System" },
    { label: "Download PDF", href: "https://www.researchgate.net/profile/Daniel_Amoako-Frimpong/publication/372395386_A_Proposed_GSM_Based_Smart_Farming_System/links/64b3d6e395bbbe0c6e3e36ba/A-Proposed-GSM-Based-Smart-Farming-System.pdf" },
  ],
};

export const skillGroups = [
  {
    title: "Frontend",
    note: "Most of my time",
    items: ["React", "Next.js", "TypeScript", "Angular", "Tailwind CSS", "HTML / CSS", "Responsive & accessible UI", "SwiftUI"],
  },
  {
    title: "Backend",
    note: "APIs and data",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "JWT auth", "PostgreSQL / PostGIS", "MongoDB", "ETL pipelines"],
  },
  {
    title: "Languages",
    note: "Shipped code in",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C#", "C++", "Swift", "SQL"],
  },
  {
    title: "Platform & Testing",
    note: "Getting it to production",
    items: ["AWS", "Azure", "Docker", "GitHub Actions", "Azure DevOps", "Jest", "PyTest", "Agile / Scrum"],
  },
];

export const education = [
  {
    school: "University of Southern California",
    degree: "MS, Computer Science",
    dates: "Aug 2024 to May 2026",
    place: "Los Angeles, CA",
    detail: "Databases, Analysis of Algorithms, Machine Learning, Autonomous Cyber-Physical Systems, Web Technologies, Software Engineering, Agile Methodologies",
  },
  {
    school: "Ghana Communication Technology University",
    degree: "BSc, Information Technology, First Class Honours",
    dates: "Jan 2018 to Oct 2021",
    place: "Accra, Ghana",
    detail: "Algorithms, Operating Systems, Artificial Intelligence, Web Technology, Compilers and Translators, Java",
  },
];

export const community = [
  {
    title: "STEM workshops",
    blurb: "LEGO robotics and Python sessions for high school students across Ghana.",
    image: "/images/photos/workshop.jpg",
  },
  {
    title: "MTN Yello Care water project",
    blurb: "An IoT smart borehole for a local high school, built with Arduino, a water pump, turbidity and pH sensors, and a wireless Android control interface.",
    image: "/images/photos/mtn-borehole.jpg",
    link: { label: "Read the article", href: "https://ameyawdebrah.com/mtn-employee-volunteers-end-yello-care-hands-over-containerized-ict-lab-digital-borehole-and-other-amenities/" },
  },
  {
    title: "National digital literacy project",
    blurb: "Trained teachers from nine rural Accra schools to teach physical computing with Arduino and Raspberry Pi.",
    image: "/images/photos/coderina-fll.jpg",
    link: { label: "Watch the session", href: "https://youtu.be/oz-oiTQaT-s" },
  },
];

export const photography = {
  intro:
    "I shoot landscapes, plus community and church events. I lead the media team at my church, which is where most of it started.",
  note: "A proper Pixieset gallery is in progress. For now, here is what is live on Instagram.",
  handle: "@bits.by.anda",
  posts: [
    { title: "Sea Otter", date: "Jul 20, 2026", href: "https://www.instagram.com/p/C9o4-38y521/" },
    { title: "Sunset Palms", date: "May 10, 2026", href: "https://www.instagram.com/p/C6y4-38y338/" },
    { title: "Waterfall / Stream", date: "May 9, 2026", href: "https://www.instagram.com/p/C6w4-38y337/" },
    { title: "Rodeo Drive", date: "Jan 17, 2026", href: "https://www.instagram.com/p/C2A4-38y101/" },
  ],
  tutorials: [
    {
      tag: "Lightroom",
      title: "Park service edits",
      blurb: "A walkthrough of my Lightroom editing workflow for park service photography.",
      href: "https://youtu.be/3isqHNcgRpc",
    },
    {
      tag: "Lightroom",
      title: "Indoor service and baptism edit",
      blurb: "An editing tutorial for indoor church service and baptism photography, made for the media team I lead.",
      href: "https://youtu.be/tEAZF-vhtho",
    },
  ],
};

export const nav = [
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Photography", href: "/photography/" },
];
