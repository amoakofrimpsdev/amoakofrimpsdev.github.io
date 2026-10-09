export type DemoKind = "jobhunt" | "portal" | "acc" | "jute" | "prime" | "coursepilot";

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  context: string;
  summary: string;
  demo: DemoKind;
  demoNote: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  sections: { heading: string; body: string[] }[];
  links: { label: string; href: string }[];
  figures?: { src: string; width: number; height: number; caption: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "jobhunt",
    title: "Jobhunt",
    kicker: "Local-first product",
    context: "Personal project, 2026",
    summary:
      "A job search app that runs on your own computer. It reads employers' job boards directly, ranks every job against your profile with rules you can read, and fills the application.",
    demo: "jobhunt",
    demoNote:
      "The scoring rules from Jobhunt, running in your browser on a made-up posting. Change the inputs and watch each part of the score move. Role fit is simplified to four presets here.",
    metrics: [
      { value: "~79,000", label: "open jobs in one read" },
      { value: "1,344", label: "employer boards" },
      { value: "0", label: "accounts, servers, or AI keys needed" },
    ],
    stack: ["Next.js", "TypeScript", "SQLite", "Tauri", "Chrome extension", "MCP"],
    sections: [
      {
        heading: "The problem",
        body: [
          "Job aggregators can list postings that have already closed, rank them with scores that come with no explanation, and say nothing about visa sponsorship until you have read the whole posting. For anyone who needs sponsorship, that last part wastes the most time.",
          "I wanted a tool that reads from the source, shows its reasoning, and treats work authorization as a fact about the job and not an afterthought.",
        ],
      },
      {
        heading: "Reading from the source",
        body: [
          "Greenhouse, Lever, and Ashby each publish a documented public feed that returns an employer's whole board in one request. Jobhunt sends one request per board, at most one a second per provider. A full read covers 1,344 boards and about 79,000 open jobs.",
          "Because each reply is the whole board, a posting that is missing from it is closed, and a board that fails to answer closes nothing. Each posting is parsed once, when it arrives, by plain text rules: level, years, work model, pay, and what it says about sponsorship, citizenship, and clearance. Every extracted fact keeps the sentence it came from, and a field the posting does not state is left empty.",
        ],
      },
      {
        heading: "A score that explains itself",
        body: [
          "The match score is role (45%), skills (35%), and level (20%), with a reason attached to every number. No language model is involved, so the same profile and posting always give the same score, and it costs nothing to compute across 79,000 jobs.",
          "Two rules stop the score from flattering a bad match. A part the posting gives nothing to judge by counts as a middling 60, so a job known only by its title cannot reach the top. And a posting that rules out sponsorship is held at 20% for anyone whose profile says they need it.",
        ],
      },
      {
        heading: "Three surfaces, one local database",
        body: [
          "Everything lives in one SQLite file on your machine, using the SQLite built into Node. There is no account and no database server.",
          "The Mac app is a small Tauri shell around the same local server. A Chrome extension fills application forms in a side panel, attaches the best fitting resume, and remembers what you type for the next form. It never presses Submit. A small Model Context Protocol server lets Claude Desktop read jobs and resumes and save drafts back onto a job.",
          "The local server answers only requests addressed to this computer, and the extension has to present a pairing code before the app gives it anything.",
        ],
      },
      {
        heading: "Credit and limits",
        body: [
          "The approach comes from jobleft, an MIT licensed project: read the employers' own boards, keep everything local, and score with rules. Its posting statement parser, cap-exempt rule, skill and job title taxonomies, board directory, and H-1B table are carried over. The rest is built on top of that: the app, the Chrome extension, the Claude Desktop connector, the resume library, and the desktop shell.",
          "It reads three board providers today. Workday, iCIMS, and others are not built yet, and the desktop app has been built and run on Apple silicon only.",
        ],
      },
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/amoakofrimpsdev/jobhunt-main" }],
    figures: [
      {
        src: "/images/jobhunt-feed.png",
        width: 1440,
        height: 1000,
        caption: "The job feed, shown with a demo profile. Each card carries its match score and the reason for it.",
      },
      {
        src: "/images/jobhunt-settings.png",
        width: 1440,
        height: 1000,
        caption: "AI is optional and off by default. It can run on a local model, your own key, or Claude Desktop.",
      },
    ],
  },
  {
    slug: "parent-portal",
    title: "School Parent Portal",
    kicker: "Production web app",
    context: "Cadi Media, 2020 to 2024",
    summary:
      "A secure portal where parents sign in and see their children's grades. I took it from requirements through production launch.",
    demo: "portal",
    demoNote: "How a request moves through the system. Drawn from the architecture, not a screenshot of the product.",
    metrics: [
      { value: "~350", label: "parents in the first year" },
      { value: "2", label: "schools" },
      { value: "JWT + SSL", label: "auth and transport" },
    ],
    stack: ["React", "Node.js", "Express", "JWT", "SSL"],
    sections: [
      {
        heading: "The problem",
        body: [
          "Two schools wanted parents to be able to check their children's grades online. The records are sensitive. A parent should see their own child's results and nobody else's, so authentication and access control were the core of the project, not a feature added at the end.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "A React front end talking to a Node and Express API. A parent signs in once and receives a JSON Web Token. Every later request carries that token, and the API verifies it before it reads a single grade. All traffic runs over SSL.",
          "I worked the project from requirements through production launch, alongside non-technical school staff the whole way.",
        ],
      },
      {
        heading: "What happened",
        body: [
          "Roughly 350 parents across the two schools used the portal in its first year, which moved grade reporting online for those families.",
          "Launch was not the end of it. Afterwards I kept working with staff to triage issues and ship fixes on a regular cadence.",
        ],
      },
    ],
    links: [],
  },
  {
    slug: "adaptive-cruise-control",
    title: "Adaptive Cruise Control",
    kicker: "Controls and verification",
    context: "USC, Autonomous Cyber-Physical Systems",
    summary:
      "A zone based cruise controller for a simulated vehicle in CARLA, verified against Signal Temporal Logic safety requirements.",
    demo: "acc",
    demoNote:
      "A simplified re-creation of the zone logic in TypeScript, running live in your browser. The thresholds are illustrative, and I added a closing speed guard for the harsher scenarios. The original ran in Python against CARLA.",
    metrics: [
      { value: "4", label: "operating zones" },
      { value: "STL", label: "formal safety spec" },
      { value: "RT-AMT", label: "offline monitoring" },
    ],
    stack: ["Python", "CARLA", "Signal Temporal Logic", "RT-AMT"],
    sections: [
      {
        heading: "The problem",
        body: [
          "Keep a simulated car at its set speed, and never let it get too close to the vehicle in front. On every simulation step the controller reads the car's velocity, the desired cruise speed, and the distance to the lead vehicle, and returns an acceleration command and an operating mode.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "I did not write one control law that tries to cover every case. I split the road ahead into distance zones, each with its own simple rule.",
          "If the lead vehicle crosses the minimum safe distance, a failsafe commands full braking. Inside the braking zone, braking gets harder the faster the gap is closing. At medium range, acceleration is capped so the car does not rush the gap. Beyond that it is ordinary cruise control.",
          "Separate rules are easier to reason about, and easier to check, than one clever equation.",
        ],
      },
      {
        heading: "Verification",
        body: [
          "The safety and performance requirements were written in Signal Temporal Logic, so a requirement like the minimum gap is a formula over a signal and not a sentence in a document. I checked recorded runs against those formulas with the RT-AMT offline monitoring package, across scenarios with different lead vehicle behavior.",
        ],
      },
    ],
    links: [],
  },
  {
    slug: "jute-pest-classifier",
    title: "Jute Pest Classifier",
    kicker: "Computer vision",
    context: "Machine learning project",
    summary:
      "A 17 class image classifier for agricultural pests. I benchmarked five pretrained backbones, and the choice of backbone moved macro F1 from 0.007 to 0.947.",
    demo: "jute",
    demoNote: "The real test set results. Switch the metric to compare the five backbones.",
    metrics: [
      { value: "0.947", label: "macro F1, DenseNet201" },
      { value: "0.999", label: "macro AUC" },
      { value: "17", label: "pest species" },
    ],
    stack: ["Python", "TensorFlow / Keras", "OpenCV", "Transfer learning"],
    figures: [
      { src: "/images/jute_confusion.png", width: 3895, height: 3468, caption: "Confusion matrix, DenseNet201, test set" },
      {
        src: "/images/jute_training_loss.png",
        width: 5370,
        height: 2966,
        caption: "Training against validation loss, all five backbones",
      },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Identify which of 17 pest species appears in a photo of a jute plant. I used transfer learning: start from a network already trained on a large general dataset, and train a new classification head on top.",
        ],
      },
      {
        heading: "The pipeline",
        body: [
          "Preprocessing ran in OpenCV: scaling each image to fit, zero padding to keep the aspect ratio, then normalization. Keras handled augmentation on the training set.",
          "I froze five pretrained backbones (ResNet50, ResNet101, VGG16, EfficientNetB0, and DenseNet201) and trained the same head, with batch normalization and dropout, on each one. Same data, same settings, so the backbone was the only variable.",
        ],
      },
      {
        heading: "What the benchmark showed",
        body: [
          "DenseNet201 reached 0.947 macro F1 and 0.999 macro AUC on the held out test set. EfficientNetB0, under identical settings, collapsed to 0.007.",
          "A newer or larger model did not mean a better result. What mattered was whether the pretrained features happened to transfer to this domain, and the only way to find out was to measure it.",
        ],
      },
    ],
    links: [],
  },
  {
    slug: "prime-engine",
    title: "Prime Engine",
    kicker: "Systems programming",
    context: "USC graduate coursework, C++",
    summary:
      "A C++ physics engine with AABB collision detection and a frustum culling renderer that took the frame rate from 30 to 60 FPS.",
    demo: "prime",
    demoNote:
      "The two core ideas, re-created in TypeScript on a canvas. Move your pointer to aim the camera. The engine itself is C++.",
    metrics: [
      { value: "30 → 60", label: "frames per second" },
      { value: "AABB", label: "collision detection" },
      { value: "C++", label: "from scratch" },
    ],
    stack: ["C++", "Physics", "Rendering", "Data structures"],
    sections: [
      {
        heading: "The problem",
        body: [
          "Build the physics and rendering core of a small engine: objects with mass that respond to gravity, collide with each other, and get drawn fast enough to stay smooth.",
        ],
      },
      {
        heading: "Collision",
        body: [
          "Each object carries an axis aligned bounding box. Two boxes overlap only if they overlap on every axis, which makes the test a handful of comparisons. I wrote custom data structures for the mass and gravity calculations, plus debug visualizations for tuning.",
        ],
      },
      {
        heading: "Culling",
        body: [
          "The first renderer drew every object every frame, including everything behind the camera. I added frustum culling: test each bounding box against the planes of the camera's view volume and skip anything fully outside it.",
          "The frame rate went from 30 to 60 FPS. No single draw call got faster. The engine just stopped doing work nobody could see.",
        ],
      },
    ],
    links: [
      { label: "Frustum culling video", href: "https://youtu.be/2CuNnX5yGOE" },
      { label: "Debugging and physics video", href: "https://youtu.be/m3ptNx7EmwI" },
    ],
  },
  {
    slug: "coursepilot",
    title: "CoursePilot",
    kicker: "Full stack and AI",
    context: "Team project",
    summary:
      "Turns a course syllabus into a structured study plan, fills your calendar, and generates flashcards and quizzes from the course material.",
    demo: "coursepilot",
    demoNote: "The flow from an uploaded syllabus to a plan you can study from.",
    metrics: [
      { value: "React", label: "front end" },
      { value: "Node.js", label: "API" },
      { value: "LLM", label: "extraction and generation" },
    ],
    stack: ["React", "Node.js", "LLM API", "Calendar API"],
    sections: [
      {
        heading: "The problem",
        body: [
          "At the start of a term, every course hands you a syllabus with dates, readings, and deadlines buried in it. Turning several of those into one workable plan is tedious work.",
        ],
      },
      {
        heading: "What we built",
        body: [
          "A full stack app in React and Node. You upload a syllabus, the app extracts the key information, and it builds a structured study plan that it writes to your calendar through an API integration.",
          "The same extraction feeds a set of AI features that generate flashcards and quizzes from the course material, so the plan comes with something to study from.",
        ],
      },
      {
        heading: "My part",
        body: [
          "This was a team project, built and presented together. The demo video below walks through the product end to end.",
        ],
      },
    ],
    links: [{ label: "Watch the demo", href: "https://youtu.be/qufEGrl9WxU" }],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
