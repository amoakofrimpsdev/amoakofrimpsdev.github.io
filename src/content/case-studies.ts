export type DemoKind = "jobhunt" | "rcw" | "portal" | "acc" | "jute" | "prime" | "coursepilot";

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
    kicker: "Data ingestion and ranking",
    context: "Personal project, 2026",
    summary:
      "A job search app that runs on your own computer. It reads employers' job boards directly, ranks every job against your profile with rules you can read, and fills the application.",
    demo: "jobhunt",
    demoNote:
      "The scoring rules from Jobhunt, running in your browser on a made-up posting. Change the inputs and watch each part of the score move. Role fit is simplified to four presets here.",
    metrics: [
      { value: "~2,500", label: "employer boards read directly" },
      { value: "12", label: "job board providers, plus big tech career sites" },
      { value: "67", label: "automated tests, run in CI" },
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
          "Jobhunt reads about 2,500 employer boards across twelve providers, including Greenhouse, Lever, Ashby, Workday, iCIMS, and SmartRecruiters, plus the career sites Amazon, Microsoft, Apple, and Meta run themselves. Every job links to the employer's own posting.",
          "Some providers return a whole board in one request. Others, like Workday, need a request per posting, so those boards are read incrementally: postings already held are only marked as still listed, and new ones are read in full a batch at a time. Every request goes out at most once a second to any one site, with no personal data in it.",
          "A posting missing from a complete list is closed, and a board that fails to answer closes nothing. Each posting is parsed once, when it arrives, by plain text rules: level, years, work model, pay, and what it says about sponsorship, citizenship, and clearance. Every extracted fact keeps the sentence it came from, and a field the posting does not state is left empty.",
        ],
      },
      {
        heading: "A score that explains itself",
        body: [
          "The match score is role (45%), skills (35%), and level (20%), with a reason attached to every number. No language model is involved, so the same profile and posting always give the same score, and it costs nothing to compute across tens of thousands of jobs.",
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
        heading: "Testing",
        body: [
          "67 tests run on Node's own test runner, with no network: a fake answers every request the app makes and records it, and each suite gets a throwaway database. They cover every board reader, a whole refresh end to end, and the Claude Desktop connector.",
          "One suite is a leak test. It fills your name, saved answers, and API keys with marker strings, runs every network path, and fails if any marker leaves the computer. Another checks SQLite's query plan for every statement the feed runs, so a slow query fails the build before anyone notices it. The fast tests run in GitHub Actions on every push.",
        ],
      },
      {
        heading: "Credit and limits",
        body: [
          "The approach comes from jobleft, an MIT licensed project: read the employers' own boards, keep everything local, and score with rules. Its posting statement parser, cap-exempt rule, skill and job title taxonomies, board directory, and H-1B table are carried over. The rest is built on top of that: the app, the Chrome extension, the Claude Desktop connector, the resume library, and the desktop shell.",
          "The live job sites and the extension inside a real browser are not covered by automated tests, and the desktop app has been built and run on Apple silicon only.",
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
    slug: "rcw-media",
    title: "RCW Media",
    kicker: "Production system",
    context: "Built for a church media team, 2026",
    summary:
      "Where a church media team uploads, finds, and hands off photos and videos from every service. It replaced hand-made albums and a busy group chat, and runs on free plans.",
    demo: "rcw",
    demoNote:
      "The bot's timing rules from the app, re-created in your browser with made-up people and uploads. Drag through the day to see what gets posted to the team, and when.",
    metrics: [
      { value: "419", label: "automated tests" },
      { value: "$0", label: "a month to run" },
      { value: "~30x", label: "faster home page charts after a load test" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres RLS", "Google Drive API", "Telegram Bot API", "Vitest", "Playwright"],
    sections: [
      {
        heading: "The problem",
        body: [
          "After every service, the media team at my church made four Google Photos albums by hand and coordinated in a Telegram group. People forgot to upload, nobody could tell who had uploaded what, and the teams waiting on the content (thumbnails, social media, the website) got it late or had to chase it.",
        ],
      },
      {
        heading: "What it does",
        body: [
          "Creating a service makes its Google Drive folder with one subfolder per category, and weekly or alternate-week services are created automatically. After the service, the team uploads straight from their phones into Drive, in resumable chunks, so a dropped connection costs seconds instead of the whole file.",
          "A Telegram bot posts the upload link on the morning of the service, keeps one running list of who uploaded what, and reminds only the people who still owe something. Each category has a receiving team and a deadline, and late handoffs are flagged. Church leaders without an account can be sent a share link to view and download what they need. Each region has its own services, people, Drive folder, and Telegram group.",
        ],
      },
      {
        heading: "Security",
        body: [
          "Four roles, from super admin to viewer, are enforced in the database with Row Level Security, so the rules hold even if a page has a bug. File bytes never pass through the server: the browser uploads straight to Google, and the server then checks with Google that the file arrived. The app asks Google only for permission to see files it created, and stored Google tokens are encrypted with AES-256-GCM.",
          "A set of leak guard tests walks every table and function in the database, so anything added later without protection fails the build.",
        ],
      },
      {
        heading: "Testing and performance",
        body: [
          "419 unit and database tests run in about 18 seconds. The database tests apply every migration to an in-process Postgres and query it as each role, in different regions, and as a signed out visitor, with no Docker needed. Playwright covers the main flow in a real browser.",
          "A load test seeds two years of data and times the busiest queries. It found the home page charts taking 1.3 to 1.8 seconds, because access rules were checked once per row. Working them out once per query brought that down to 25 to 67 ms.",
        ],
      },
      {
        heading: "How I built it",
        body: [
          "I built it with Claude Code as my pair, and kept every major decision and the reasoning behind it in docs/DECISIONS.md. It runs on the free plans of Supabase, Vercel, Google Drive, and Telegram.",
        ],
      },
    ],
    links: [
      { label: "Source on GitHub", href: "https://github.com/amoakofrimpsdev/church-media-hub" },
      { label: "Live app (invite only)", href: "https://church-media-hub-khaki.vercel.app" },
    ],
    figures: [
      {
        src: "/images/rcw-dashboard.png",
        width: 1440,
        height: 1000,
        caption: "The home page, shown with sample data: fresh uploads, on-time handoffs, and uploads per week.",
      },
      {
        src: "/images/rcw-upload-phone.png",
        width: 540,
        height: 1100,
        caption: "Uploading from a phone, with sample data. Pick the service and category, then the photos.",
      },
    ],
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
    slug: "prime-engine",
    title: "Prime Engine",
    kicker: "Systems programming",
    context: "USC graduate coursework, C++",
    summary:
      "Physics and rendering work on a C++ game engine: AABB collision detection, and frustum culling that took the frame rate from 30 to 60 FPS.",
    demo: "prime",
    demoNote:
      "The two core ideas, re-created in TypeScript on a canvas. Move your pointer to aim the camera. The engine itself is C++.",
    metrics: [
      { value: "30 → 60", label: "frames per second" },
      { value: "AABB", label: "collision detection" },
      { value: "C++", label: "physics and rendering" },
    ],
    stack: ["C++", "Physics", "Rendering", "Data structures"],
    sections: [
      {
        heading: "The problem",
        body: [
          "Extend a C++ game engine so objects have mass, respond to gravity, collide with each other, and still get drawn fast enough to stay smooth.",
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
          "The renderer drew every object every frame, including everything behind the camera. I added frustum culling: test each bounding box against the planes of the camera's view volume and skip anything fully outside it.",
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
    slug: "parent-portal",
    title: "School Grade Portal",
    kicker: "Auth and access control",
    context: "Cadi Media, 2020 to 2024",
    summary:
      "An authenticated system where parents sign in and see only their own children's grades. I took it from requirements through production launch.",
    demo: "portal",
    demoNote: "How a request moves through the system. Drawn from the architecture, not a screenshot of the product.",
    metrics: [
      { value: "~350", label: "parents in the first year" },
      { value: "2", label: "schools" },
      { value: "JWT + SSL", label: "auth and transport" },
    ],
    stack: ["Node.js", "Express", "JWT", "SSL", "React"],
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
          "A Node and Express API behind a React client. A parent signs in once and receives a JSON Web Token. Every later request carries that token, and the API verifies it before it reads a single grade. All traffic runs over SSL.",
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
    slug: "coursepilot",
    title: "CoursePilot",
    kicker: "LLM integration",
    context: "Team project",
    summary:
      "Turns a course syllabus into a structured study plan, fills your calendar, and generates flashcards and quizzes from the course material.",
    demo: "coursepilot",
    demoNote: "The flow from an uploaded syllabus to a plan you can study from.",
    metrics: [
      { value: "Node.js", label: "API" },
      { value: "Calendar", label: "API integration" },
      { value: "LLM", label: "extraction and generation" },
    ],
    stack: ["Node.js", "LLM API", "Calendar API", "React"],
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
