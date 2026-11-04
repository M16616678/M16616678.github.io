/**
 * Single source of truth for every public portfolio claim.
 *
 * Rules (see README "Content policy"):
 *  - Only facts already approved in the Portfolio 3.0 handoff or existing repository copy.
 *  - No invented metrics, benchmarks, adoption numbers or employer relationships.
 *  - Architecture diagrams are illustrative and public-safe, never internal diagrams.
 *  - Every project states its evidence level so visitors can tell shipped work from concepts.
 */

export type Accent = "gold" | "cyan" | "violet" | "blue";
export type Category = "Government" | "Healthcare" | "AI Evaluation" | "Academic" | "Independent";
export type RoleView = "backend" | "fullstack" | "ai" | "healthcare" | "research";
export type EvidenceLevel = "Professional work" | "Contract work" | "Academic project" | "Independent project" | "Open-source derived";

export const profile = {
  name: "Adi Narayana Manga",
  initials: "AN",
  title: "Software Engineer | Technical AI Evaluator | Full-Stack & Backend Developer",
  shortTitle: "Software Engineer & Technical AI Evaluator",
  location: "Cincinnati, Ohio, USA",
  summary:
    "Software engineer with close to four years of enterprise Java and Spring work on CFMS 2.0, a state-government financial management system at Tata Consultancy Services, now building scoliosis-care healthcare software at Innovision LLC and evaluating technical AI responses on contract platforms. M.S. in Information Technology from the University of Cincinnati.",
  email: "mangaaa@mail.uc.edu",
  phone: "+1 (513) 501-1280",
  phoneHref: "tel:+15135011280",
  links: {
    github: "https://github.com/M16616678",
    linkedin: "https://www.linkedin.com/in/adi-narayana-manga/",
    site: "https://m16616678.github.io/",
  },
  portraits: [
    { src: "/portfolio-formal.svg", alt: "Adi Narayana Manga, formal portrait" },
    { src: "/portfolio-headshot.svg", alt: "Adi Narayana Manga, headshot" },
  ],
} as const;

/** Highlights shown in the hero. Each one is a plain fact, not a performance metric. */
export const highlights = [
  { value: "~4 yrs", label: "Enterprise engineering at TCS", detail: "Nov 2020 to Aug 2024, active work period" },
  { value: "3.97", label: "M.S. IT GPA, Univ. of Cincinnati", detail: "Reported GPA on a 4.0 scale" },
  { value: "4", label: "AI evaluation platforms", detail: "Handshake AI, Mercor, Appen CrowdGen, Outlier" },
  { value: "16", label: "Browser-playable games", detail: "TypeScript and Canvas implementations" },
] as const;

export type TimelineKind = "Education" | "Employment" | "Contract" | "Independent";
export interface TimelineEvent {
  id: string;
  period: string;
  kind: TimelineKind;
  title: string;
  org: string;
  place?: string;
  body: string;
  points: string[];
  projects: string[];
}

export const timeline: TimelineEvent[] = [
  {
    id: "diploma",
    period: "2014 to 2017",
    kind: "Education",
    title: "Diploma, Electrical & Electronics Engineering",
    org: "Diploma programme",
    body: "Foundational electrical engineering education in circuits, machines and electronics.",
    points: ["Electrical circuits and machines", "Electronics fundamentals"],
    projects: [],
  },
  {
    id: "btech",
    period: "2017 to 2020",
    kind: "Education",
    title: "B.Tech, Electrical & Electronics Engineering",
    org: "Vignan University",
    place: "Guntur, Andhra Pradesh, India",
    body: "Undergraduate EEE degree, finishing with a Bluetooth home automation final project built on Arduino and Python.",
    points: ["Embedded control and microcontrollers", "Final project: Advanced Home Automation Control System"],
    projects: ["home-automation"],
  },
  {
    id: "tcs",
    period: "Nov 2020 to Aug 2024",
    kind: "Employment",
    title: "Software Engineer",
    org: "Tata Consultancy Services",
    place: "Hyderabad, India",
    body: "Active engineering work on CFMS 2.0, the Comprehensive Financial Management System used for state-government financial operations.",
    points: [
      "Payee, Treasury and E-billing modules",
      "Java, Spring Boot and Spring Batch services backed by PostgreSQL",
      "JasperReports, JMeter, Jenkins and Docker in reporting, testing and delivery",
    ],
    projects: ["cfms"],
  },
  {
    id: "uc",
    period: "Aug 2024 to Dec 2025",
    kind: "Education",
    title: "M.S. Information Technology",
    org: "University of Cincinnati",
    place: "Cincinnati, Ohio",
    body: "Graduate study across web development, AI, cybersecurity and human-computer interaction. Reported GPA 3.97 / 4.0.",
    points: ["GPA 3.97 / 4.0 (reported)", "HCI project: CareerConnect", "Cloud and data engineering labs"],
    projects: ["careerconnect", "cloud-data-labs"],
  },
  {
    id: "ai-eval",
    period: "Contract periods vary",
    kind: "Contract",
    title: "Technical AI Evaluator",
    org: "Handshake AI · Mercor · Appen CrowdGen · Outlier",
    place: "Remote",
    body: "Contract evaluation of AI-generated technical and coding responses. Engagement dates, projects and methods differ by platform.",
    points: ["Code and technical response review", "Instruction-following and reasoning checks", "Client prompts and rubrics stay confidential"],
    projects: ["ai-evaluation"],
  },
  {
    id: "innovision",
    period: "Jan 2026 onward",
    kind: "Employment",
    title: "Software Engineering Intern",
    org: "Innovision LLC",
    place: "Dayton, Ohio",
    body: "Full-stack work on IBrace, a scoliosis and spinal-orthotic care portal, and ComFit / DCAP, a scoliosis-focused AI assistance effort.",
    points: [
      "Next.js, React and TypeScript interfaces",
      "Python FastAPI services with Supabase / PostgreSQL and row-level security",
      "Multi-role testing across patient, parent, clinician and admin journeys",
    ],
    projects: ["ibrace", "comfit", "healthcare-testing"],
  },
  {
    id: "independent",
    period: "2024 onward",
    kind: "Independent",
    title: "Independent Engineering",
    org: "Personal projects",
    body: "Interactive browser games, workflow automation experiments and this portfolio itself.",
    points: ["16 TypeScript / Canvas games with Web Audio", "n8n workflow exploration with upstream attribution", "Portfolio built with Next.js and static export"],
    projects: ["arcade", "ai-workflows", "portfolio-site"],
  },
];

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  /** column 0-3 and row 0-3 inside the diagram grid */
  col: number;
  row: number;
  detail: string;
}
export interface Diagram {
  caption: string;
  nodes: DiagramNode[];
  edges: [string, string][];
}

export interface Project {
  slug: string;
  name: string;
  org: string;
  category: Category;
  accent: Accent;
  period: string;
  evidence: EvidenceLevel;
  /** what is shipped vs concept, in one line */
  status: string;
  featured?: boolean;
  roles: RoleView[];
  summary: string;
  problem: string;
  responsibilities: string[];
  stack: string[];
  methodology: string;
  implementation: string[];
  challenges: { challenge: string; response: string }[];
  testing: string[];
  outcomes: string[];
  lessons: string[];
  confidentiality: string;
  links: { label: string; href: string; external?: boolean }[];
  related: string[];
  diagram: Diagram;
}

export const projects: Project[] = [
  {
    slug: "cfms",
    name: "CFMS 2.0",
    org: "Tata Consultancy Services",
    category: "Government",
    accent: "gold",
    period: "2020 to 2024",
    evidence: "Professional work",
    status: "Production enterprise system (employer-owned, source not public)",
    featured: true,
    roles: ["backend", "fullstack"],
    summary:
      "Comprehensive Financial Management System 2.0, enterprise software for state-government public financial management. Work across Payee, Treasury and E-billing modules.",
    problem:
      "State-government financial operations depend on accurate payee records, treasury processing, billing and reporting across interconnected systems, and those paths have to stay dependable under recurring batch and reporting load.",
    responsibilities: [
      "Developed and maintained Java / Spring services for Payee, Treasury and E-billing modules",
      "Built REST APIs and Spring Batch workflows for recurring financial data processing",
      "Produced financial reports with JasperReports",
      "Investigated performance with JMeter and supported releases through Jenkins and Docker",
      "Production support for enterprise integrations",
    ],
    stack: ["Java", "Spring Boot", "Spring Batch", "REST APIs", "PostgreSQL", "JPA / Hibernate", "JasperReports", "JMeter", "Jenkins", "Docker"],
    methodology: "Module-based enterprise delivery inside a large team, with CI builds through Jenkins and containerised environments.",
    implementation: [
      "Service layer in Java and Spring Boot exposing REST endpoints to the wider CFMS platform",
      "Batch jobs in Spring Batch for scheduled, high-volume financial processing",
      "PostgreSQL persistence accessed through JPA / Hibernate",
      "Report templates in JasperReports for financial statements and summaries",
    ],
    challenges: [
      {
        challenge: "Recurring batch and reporting paths needed to stay reliable as data grew.",
        response: "Load and performance checks with JMeter to find slow paths before release.",
      },
      {
        challenge: "Changes touched several interconnected financial modules.",
        response: "Kept changes inside module boundaries and relied on CI builds through Jenkins.",
      },
    ],
    testing: ["Functional testing of module workflows", "JMeter performance investigation", "CI builds through Jenkins"],
    outcomes: [
      "Performance improvements are self-reported résumé claims and are not shown here as audited numbers.",
      "No government data, internal diagrams or source code are published.",
    ],
    lessons: [
      "Batch and reporting work rewards measuring first and optimising second.",
      "Clear module ownership makes large financial systems easier to change safely.",
    ],
    confidentiality: "Public-safe overview only. No government records, credentials, private integrations or internal source code.",
    links: [],
    related: ["healthcare-testing", "ibrace"],
    diagram: {
      caption: "Illustrative layering of a Spring-based financial service. Not an internal CFMS diagram.",
      nodes: [
        { id: "ui", label: "CFMS clients", sub: "Department users", col: 0, row: 1, detail: "Users and upstream systems that call financial services." },
        { id: "api", label: "REST APIs", sub: "Spring Boot", col: 1, row: 0, detail: "Payee, Treasury and E-billing endpoints built with Spring Boot." },
        { id: "batch", label: "Batch jobs", sub: "Spring Batch", col: 1, row: 2, detail: "Scheduled financial processing jobs." },
        { id: "db", label: "PostgreSQL", sub: "JPA / Hibernate", col: 2, row: 1, detail: "Relational persistence for financial records." },
        { id: "reports", label: "Reports", sub: "JasperReports", col: 3, row: 0, detail: "Financial statements and summaries." },
        { id: "ci", label: "CI / Delivery", sub: "Jenkins · Docker", col: 3, row: 2, detail: "Builds, containers and release support." },
      ],
      edges: [["ui", "api"], ["api", "db"], ["batch", "db"], ["db", "reports"], ["api", "ci"], ["batch", "ci"]],
    },
  },
  {
    slug: "ibrace",
    name: "IBrace Healthcare Portal",
    org: "Innovision LLC",
    category: "Healthcare",
    accent: "cyan",
    period: "2026",
    evidence: "Professional work",
    status: "In active development. Feature status varies by module.",
    featured: true,
    roles: ["fullstack", "healthcare", "backend"],
    summary:
      "Web portal for scoliosis care and spinal orthotic workflows, coordinating patients, parents, clinicians and administrators.",
    problem:
      "Families, clinicians and orthotic care teams need one place to request appointments, share clinical uploads, follow case status and see only what their role allows.",
    responsibilities: [
      "Implemented and supported authentication, role-based access and parent to child account linkage",
      "Built appointment request and approval flows",
      "Worked on secure uploads and administrative access restrictions",
      "Investigated multi-role defects and calendar issues",
    ],
    stack: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "Supabase", "PostgreSQL", "Row-Level Security", "Playwright"],
    methodology: "Iterative full-stack development with role-based scenario testing for each user journey.",
    implementation: [
      "Next.js / React / TypeScript front end with role-specific views",
      "Python FastAPI REST services for application logic",
      "Supabase Auth, Storage and PostgreSQL with row-level security policies",
      "Protected file storage for clinical uploads",
    ],
    challenges: [
      {
        challenge: "Several roles (patient, parent, clinician, admin) see overlapping data with different permissions.",
        response: "Enforced boundaries at the database with row-level security and tested each role separately.",
      },
      {
        challenge: "Calendar and appointment edge cases surfaced only under specific role combinations.",
        response: "Reproduced defects with multi-role browser scenarios before fixing them.",
      },
    ],
    testing: ["Role-boundary checks for each user type", "Browser scenario testing with Playwright", "Regression notes for authentication and appointment flows"],
    outcomes: [
      "Implemented workflows listed above. Clinical imaging, CAD / mesh viewing, IoT, insurance and payment features are not claimed as shipped.",
      "No independent clinical validation is claimed.",
    ],
    lessons: [
      "In healthcare apps, permission bugs are product bugs, so they deserve their own test plan.",
      "Putting access rules in the database keeps every client honest.",
    ],
    confidentiality: "No patient information, proprietary screenshots or private configuration are shown.",
    links: [],
    related: ["healthcare-testing", "comfit"],
    diagram: {
      caption: "Illustrative public-safe architecture of a role-based healthcare portal.",
      nodes: [
        { id: "users", label: "Role-based users", sub: "Patient · Parent · Clinician", col: 0, row: 1, detail: "Each role sees a different journey and data scope." },
        { id: "web", label: "Web app", sub: "Next.js · React · TS", col: 1, row: 1, detail: "Role-specific views, forms and appointment flows." },
        { id: "api", label: "API", sub: "FastAPI · Python", col: 2, row: 0, detail: "Application logic and integrations." },
        { id: "auth", label: "Auth", sub: "Supabase Auth", col: 2, row: 2, detail: "Sign-in and session management." },
        { id: "db", label: "PostgreSQL + RLS", sub: "Supabase", col: 3, row: 0, detail: "Row-level security policies enforce role boundaries." },
        { id: "storage", label: "Protected storage", sub: "Supabase Storage", col: 3, row: 2, detail: "Clinical uploads with restricted access." },
      ],
      edges: [["users", "web"], ["web", "api"], ["web", "auth"], ["api", "db"], ["api", "storage"], ["auth", "db"]],
    },
  },
  {
    slug: "comfit",
    name: "ComFit / DCAP",
    org: "Innovision LLC",
    category: "Healthcare",
    accent: "violet",
    period: "2026",
    evidence: "Professional work",
    status: "Experimental AI work. Not a medical device and not clinically validated.",
    roles: ["ai", "healthcare", "research"],
    summary:
      "Scoliosis-focused AI assistance: retrieval experiments, RAGAS-based evaluation, feedback loops and offline packaging.",
    problem:
      "A scoliosis information assistant has to retrieve the right context, be measured honestly, and ship in an offline package without bloating its size.",
    responsibilities: [
      "Explored scoliosis-focused assistant behaviour",
      "Worked on retrieval and vectorless / RAG-style experiments",
      "Supported RAGAS evaluation and feedback-loop analysis",
      "Investigated offline package size and project separation",
    ],
    stack: ["Python", "RAG", "Vectorless retrieval", "RAGAS", "Packaging"],
    methodology: "Experiment-driven: try a retrieval approach, evaluate it with RAGAS, keep what measurably helps.",
    implementation: [
      "Python retrieval components for scoliosis-related content",
      "Evaluation runs with RAGAS metrics",
      "Offline packaging with separated environments",
    ],
    challenges: [
      { challenge: "Retrieval quality is hard to judge by eye.", response: "Used RAGAS evaluation instead of anecdotes." },
      { challenge: "Offline distribution limits package size.", response: "Investigated size optimisation and split projects apart." },
    ],
    testing: ["RAGAS evaluation runs", "Synthetic medical context for any public example"],
    outcomes: ["Experimental results are internal. No clinical effectiveness or medical validation is claimed.", "Model output is not medical advice."],
    lessons: ["Evaluation needs to be designed before the model work, not after.", "Offline constraints shape architecture as much as accuracy does."],
    confidentiality: "No internal datasets, prompts or private configuration are published.",
    links: [],
    related: ["ibrace", "ai-evaluation"],
    diagram: {
      caption: "Illustrative retrieval and evaluation loop. Synthetic, public-safe.",
      nodes: [
        { id: "q", label: "User question", sub: "Synthetic example", col: 0, row: 1, detail: "Questions about scoliosis care information." },
        { id: "ret", label: "Retrieval", sub: "Vectorless / RAG", col: 1, row: 0, detail: "Finds relevant reference context." },
        { id: "gen", label: "Response", sub: "LLM answer", col: 2, row: 1, detail: "Grounded answer with retrieved context." },
        { id: "eval", label: "Evaluation", sub: "RAGAS", col: 1, row: 2, detail: "Faithfulness and relevance style metrics." },
        { id: "pkg", label: "Offline package", sub: "Packaging", col: 3, row: 1, detail: "Size-aware offline distribution." },
      ],
      edges: [["q", "ret"], ["ret", "gen"], ["gen", "eval"], ["eval", "ret"], ["gen", "pkg"]],
    },
  },
  {
    slug: "healthcare-testing",
    name: "Multi-Role Healthcare Testing",
    org: "Innovision LLC",
    category: "Healthcare",
    accent: "cyan",
    period: "2026",
    evidence: "Professional work",
    status: "Ongoing QA practice for the IBrace portal",
    roles: ["fullstack", "healthcare"],
    summary: "Browser-based scenario validation for healthcare user roles and critical workflows.",
    problem: "Role-based healthcare apps break in the gaps between roles, so each journey needs its own scenarios.",
    responsibilities: [
      "Scenario coverage for patient, parent, clinician and administrative workflows",
      "Investigated authentication, appointment and calendar edge cases",
      "Documented regression findings and proposed fixes",
    ],
    stack: ["Playwright", "Next.js", "FastAPI", "QA"],
    methodology: "Scenario-based testing per role, with written reproduction steps for each finding.",
    implementation: ["Browser automation for core journeys", "Role switching to verify access boundaries", "Regression notes linked to defects"],
    challenges: [{ challenge: "Bugs appeared only for certain role combinations.", response: "Built scenarios around role pairs, not single screens." }],
    testing: ["Playwright browser scenarios", "Manual exploratory passes"],
    outcomes: ["No coverage percentages are claimed."],
    lessons: ["A good bug report is half the fix."],
    confidentiality: "No patient data or internal test artefacts are shown.",
    links: [],
    related: ["ibrace", "cfms"],
    diagram: {
      caption: "Illustrative role-scenario test loop.",
      nodes: [
        { id: "plan", label: "Role scenarios", sub: "Per journey", col: 0, row: 1, detail: "Scenarios written for each role." },
        { id: "run", label: "Browser runs", sub: "Playwright", col: 1, row: 1, detail: "Automated and exploratory passes." },
        { id: "find", label: "Findings", sub: "Repro steps", col: 2, row: 0, detail: "Documented defects with evidence." },
        { id: "fix", label: "Fix + regress", sub: "Dev loop", col: 3, row: 1, detail: "Fixes verified against the same scenario." },
      ],
      edges: [["plan", "run"], ["run", "find"], ["find", "fix"], ["fix", "run"]],
    },
  },
  {
    slug: "ai-evaluation",
    name: "Technical AI Evaluation",
    org: "Handshake AI · Mercor · Appen CrowdGen · Outlier",
    category: "AI Evaluation",
    accent: "violet",
    period: "Contract periods vary",
    evidence: "Contract work",
    status: "Contract engagements. Client tasks are confidential.",
    featured: true,
    roles: ["ai", "research"],
    summary:
      "Contract evaluation of AI-generated code and technical explanations for correctness, instruction-following, reasoning and quality.",
    problem: "AI-generated code and technical answers need repeatable judgement against instructions, correctness and evidence.",
    responsibilities: [
      "Evaluated technical and coding responses against assignment-specific criteria",
      "Checked instruction adherence and reasoning where relevant",
      "Wrote evidence-based justifications and error classifications",
    ],
    stack: ["Code review", "Rubric scoring", "Reasoning assessment", "STEM", "QA"],
    methodology: "Read the instructions, reproduce the claim, score each dimension with evidence, then justify in writing.",
    implementation: ["Task and instruction interpretation", "Rubric-based response and code review", "Evidence-based error classification", "Consistent written justifications"],
    challenges: [
      { challenge: "Plausible-looking code can hide edge-case failures.", response: "Test edge cases (empty input, boundaries) before scoring correctness." },
      { challenge: "Each platform uses its own guidelines.", response: "Follow the assignment's rubric rather than one universal method." },
    ],
    testing: ["Reproducing code behaviour on edge cases", "Cross-checking reasoning steps"],
    outcomes: [
      "Evaluation counts, quality scores and dates are not published because they vary by platform and are not independently verified.",
      "The AI Evaluation Studio on this site uses original synthetic examples only.",
    ],
    lessons: ["Evidence beats intuition when scoring model output.", "A short, specific justification is more useful than a long vague one."],
    confidentiality: "No client prompts, ratings, rubrics or project names are disclosed.",
    links: [{ label: "Try the synthetic AI Evaluation Studio", href: "/#ai-studio" }],
    related: ["comfit", "ai-workflows"],
    diagram: {
      caption: "Generic evaluation workflow. Not any client's proprietary process.",
      nodes: [
        { id: "task", label: "Task + instructions", sub: "Read carefully", col: 0, row: 1, detail: "Understand exactly what was asked." },
        { id: "resp", label: "Model response", sub: "Code or text", col: 1, row: 0, detail: "The output being evaluated." },
        { id: "check", label: "Verify", sub: "Run · trace · test", col: 1, row: 2, detail: "Reproduce behaviour and check edge cases." },
        { id: "score", label: "Rubric score", sub: "Per dimension", col: 2, row: 1, detail: "Correctness, adherence, edge cases, clarity." },
        { id: "just", label: "Justification", sub: "Evidence", col: 3, row: 1, detail: "Written reasoning tied to evidence." },
      ],
      edges: [["task", "resp"], ["task", "check"], ["resp", "check"], ["check", "score"], ["score", "just"]],
    },
  },
  {
    slug: "careerconnect",
    name: "CareerConnect",
    org: "University of Cincinnati",
    category: "Academic",
    accent: "blue",
    period: "2024 to 2025",
    evidence: "Academic project",
    status: "HCI coursework concept, not a production platform",
    roles: ["research", "fullstack"],
    summary: "Usability-driven career guidance concept for university students, built through personas, task flows and evaluation planning.",
    problem: "Students face scattered job-search information, little mentorship visibility and inconsistent career-support workflows.",
    responsibilities: ["Problem framing and user needs", "Personas, use cases and task analysis", "Interface goals and user journeys", "Usability evaluation plan"],
    stack: ["HCI", "UX research", "Personas", "Task analysis", "Wireframing", "Usability testing"],
    methodology: "Human-centred design: research, personas, task analysis, concept, then evaluation planning.",
    implementation: ["Student and counselor personas", "Task flows for search, applications and resources", "Conceptual dashboard navigation"],
    challenges: [{ challenge: "Two audiences (students and counselors) with different goals.", response: "Separate personas and journeys for each." }],
    testing: ["Planned usability study and survey"],
    outcomes: ["Coursework artefacts only. No live-user adoption metrics."],
    lessons: ["Writing the evaluation plan early sharpens the design."],
    confidentiality: "Academic work. Screenshots only where authentic.",
    links: [],
    related: ["portfolio-site", "cloud-data-labs"],
    diagram: {
      caption: "HCI process used for the concept.",
      nodes: [
        { id: "res", label: "Research", sub: "User needs", col: 0, row: 1, detail: "Problem framing." },
        { id: "per", label: "Personas", sub: "Student · Counselor", col: 1, row: 0, detail: "Two core audiences." },
        { id: "task", label: "Task analysis", sub: "Journeys", col: 1, row: 2, detail: "Search, apply, find resources." },
        { id: "con", label: "Concept", sub: "Wireframes", col: 2, row: 1, detail: "Dashboard and navigation concept." },
        { id: "eval", label: "Evaluation plan", sub: "Usability", col: 3, row: 1, detail: "Study and survey design." },
      ],
      edges: [["res", "per"], ["res", "task"], ["per", "con"], ["task", "con"], ["con", "eval"]],
    },
  },
  {
    slug: "home-automation",
    name: "Advanced Home Automation",
    org: "Vignan University",
    category: "Academic",
    accent: "blue",
    period: "2019 to 2020",
    evidence: "Academic project",
    status: "Bachelor's final project (historical)",
    roles: ["research"],
    summary: "B.Tech EEE project for Bluetooth-controlled home automation built on Arduino with Python support.",
    problem: "Give people simple remote control over selected home devices using low-cost microcontrollers.",
    responsibilities: ["Built the Bluetooth control concept", "Integrated microcontroller, control logic and devices", "Explored basic energy-management use cases"],
    stack: ["Arduino", "Bluetooth", "Python", "EEE"],
    methodology: "Prototype, wire, test and iterate on bench hardware.",
    implementation: ["Arduino control layer switching device circuits", "Bluetooth link from phone to controller", "Python-supported testing"],
    challenges: [{ challenge: "Reliable switching over a wireless link.", response: "Kept the command set small and tested each device path." }],
    testing: ["Bench tests per device circuit"],
    outcomes: ["Historical academic project. Circuit photos can be added once verified."],
    lessons: ["Hardware projects teach you to respect the edge cases software can hide."],
    confidentiality: "Educational project.",
    links: [],
    related: ["arcade"],
    diagram: {
      caption: "Simplified system diagram of the project.",
      nodes: [
        { id: "phone", label: "Phone", sub: "Bluetooth app", col: 0, row: 1, detail: "User sends commands." },
        { id: "bt", label: "Bluetooth module", sub: "Serial link", col: 1, row: 1, detail: "Wireless link to the controller." },
        { id: "ard", label: "Arduino", sub: "Control logic", col: 2, row: 1, detail: "Parses commands and switches outputs." },
        { id: "relay", label: "Devices", sub: "Relays · loads", col: 3, row: 1, detail: "Lights and appliances." },
      ],
      edges: [["phone", "bt"], ["bt", "ard"], ["ard", "relay"]],
    },
  },
  {
    slug: "hospital-checkin",
    name: "Hospital Check-in System",
    org: "Software project",
    category: "Academic",
    accent: "blue",
    period: "Repository",
    evidence: "Academic project",
    status: "Public Java repository. Feature walkthrough pending code-backed documentation.",
    roles: ["backend"],
    summary: "Version-controlled Java project for hospital patient check-in.",
    problem: "Check-in queues need a simple, consistent way to register arriving patients.",
    responsibilities: ["Java implementation in a public repository"],
    stack: ["Java", "Git"],
    methodology: "Version-controlled Java development.",
    implementation: ["Java source code (see repository)"],
    challenges: [],
    testing: ["Walkthrough and test evidence to be added"],
    outcomes: ["Functionality is described only as far as the repository shows."],
    lessons: [],
    confidentiality: "Public repository.",
    links: [{ label: "Source on GitHub", href: "https://github.com/M16616678/Hospital-Check-in-System", external: true }],
    related: ["cfms"],
    diagram: {
      caption: "Generic check-in flow.",
      nodes: [
        { id: "arr", label: "Patient arrives", col: 0, row: 1, detail: "Starts check-in." },
        { id: "app", label: "Java app", sub: "Check-in logic", col: 1, row: 1, detail: "Captures and validates details." },
        { id: "q", label: "Queue / records", col: 2, row: 1, detail: "Stores check-in state." },
      ],
      edges: [["arr", "app"], ["app", "q"]],
    },
  },
  {
    slug: "cloud-data-labs",
    name: "Cloud & Data Engineering Labs",
    org: "University of Cincinnati · Independent study",
    category: "Academic",
    accent: "blue",
    period: "Graduate study",
    evidence: "Academic project",
    status: "Coursework and labs, not professional deployments",
    roles: ["backend", "research"],
    summary: "Cloud service, database, software architecture and information technology experiments from graduate study.",
    problem: "Build hands-on understanding of cloud data services and database design.",
    responsibilities: ["Coursework labs in software systems and IT", "Azure Synapse and data workflow exploration where repository evidence supports it"],
    stack: ["SQL", "Azure", "Data engineering"],
    methodology: "Lab-based learning with documented experiments.",
    implementation: ["SQL modelling and queries", "Cloud data workflow exploration"],
    challenges: [],
    testing: [],
    outcomes: ["Academic examples, kept separate from professional work."],
    lessons: [],
    confidentiality: "Academic work.",
    links: [],
    related: ["careerconnect", "cfms"],
    diagram: {
      caption: "Generic cloud data workflow explored in labs.",
      nodes: [
        { id: "src", label: "Sources", col: 0, row: 1, detail: "Raw data inputs." },
        { id: "ing", label: "Ingest", sub: "Pipelines", col: 1, row: 1, detail: "Load and transform." },
        { id: "wh", label: "Warehouse", sub: "SQL / Synapse", col: 2, row: 1, detail: "Query and analysis." },
        { id: "rep", label: "Insights", col: 3, row: 1, detail: "Reports." },
      ],
      edges: [["src", "ing"], ["ing", "wh"], ["wh", "rep"]],
    },
  },
  {
    slug: "arcade",
    name: "Interactive Game Engineering",
    org: "Independent",
    category: "Independent",
    accent: "gold",
    period: "2024 to 2026",
    evidence: "Independent project",
    status: "Live and playable on this site",
    roles: ["fullstack"],
    summary: "16 browser-playable games in TypeScript and Canvas 2D, with a level editor, Web Audio synthesis and mouse / touch input.",
    problem: "Build engaging browser games around a shared, reusable rendering and input harness that works on desktop and mobile.",
    responsibilities: [
      "Ported and organised 16 playable game implementations, adapted from Solar2D / Lua game concepts",
      "Mouse and touch controls",
      "Reusable canvas runner, game factories and score callbacks",
      "Configurable levels and synthesized sound effects",
    ],
    stack: ["TypeScript", "React", "Canvas 2D", "Web Audio API", "PWA"],
    methodology: "Shared engine first, then each game as a small factory plugged into it.",
    implementation: ["Shared GameEnv and canvas runner in gameEngines.ts", "Per-game factories with step and draw loops", "Web Audio synth in soundSynth.ts", "Visual level editor in the game modal"],
    challenges: [
      { challenge: "Sixteen games with different mechanics.", response: "A common factory interface so each game only implements its own logic." },
      { challenge: "Touch and mouse behave differently.", response: "Unified pointer input in the shared harness." },
    ],
    testing: ["Automated smoke test that the arcade route renders and lists games", "Manual play-testing per game"],
    outcomes: ["The browser versions are TypeScript / Canvas, not a native Solar2D runtime.", "No FPS or latency numbers are claimed without measured benchmarks."],
    lessons: ["A small shared engine makes many small games cheap to maintain."],
    confidentiality: "Original independent work.",
    links: [{ label: "Play the arcade", href: "/arcade" }],
    related: ["portfolio-site", "home-automation"],
    diagram: {
      caption: "How the browser arcade is structured in this repository.",
      nodes: [
        { id: "ui", label: "Game library", sub: "DashboardPortfolio", col: 0, row: 1, detail: "Lists games and opens the play modal." },
        { id: "runner", label: "Canvas runner", sub: "gameEngines.ts", col: 1, row: 1, detail: "Frame loop, input and buffering." },
        { id: "fac", label: "Game factories", sub: "16 games", col: 2, row: 0, detail: "Each game's step and draw logic." },
        { id: "audio", label: "Web Audio synth", sub: "soundSynth.ts", col: 2, row: 2, detail: "Generated sound effects, no audio files." },
        { id: "edit", label: "Level editor", sub: "Modal tools", col: 3, row: 1, detail: "Paint and tweak levels." },
      ],
      edges: [["ui", "runner"], ["runner", "fac"], ["runner", "audio"], ["ui", "edit"], ["edit", "fac"]],
    },
  },
  {
    slug: "ai-workflows",
    name: "AI Workflow Exploration",
    org: "Independent / open source",
    category: "Independent",
    accent: "violet",
    period: "2026",
    evidence: "Open-source derived",
    status: "Fork of an open-source n8n workflow collection with personal experiments",
    roles: ["ai", "backend"],
    summary: "Containerised automation and workflow experiments built on an open-source n8n workflow repository, with upstream attribution.",
    problem: "Learn how AI steps fit into real automation pipelines without starting from zero.",
    responsibilities: ["n8n and Docker workflow exploration", "AI runtime integration notes and deployment documentation", "Original changes kept separate from upstream"],
    stack: ["n8n", "Docker", "Python"],
    methodology: "Start from upstream, document every original change.",
    implementation: ["Dockerised n8n setup", "Workflow experiments with AI steps"],
    challenges: [{ challenge: "Telling original work apart from upstream.", response: "Explicit attribution and separately documented changes." }],
    testing: [],
    outcomes: ["Most repository content is upstream open-source work, credited to its authors."],
    lessons: ["Attribution is part of engineering honesty."],
    confidentiality: "Public repository.",
    links: [{ label: "Repository on GitHub", href: "https://github.com/M16616678/n8n-workflows", external: true }],
    related: ["ai-evaluation", "comfit"],
    diagram: {
      caption: "Generic automation pipeline with an AI step.",
      nodes: [
        { id: "trig", label: "Trigger", col: 0, row: 1, detail: "Event or schedule." },
        { id: "n8n", label: "n8n workflow", sub: "Docker", col: 1, row: 1, detail: "Orchestrates steps." },
        { id: "ai", label: "AI step", sub: "Model call", col: 2, row: 0, detail: "Classify, summarise or generate." },
        { id: "out", label: "Action", col: 3, row: 1, detail: "Notify, store or update." },
      ],
      edges: [["trig", "n8n"], ["n8n", "ai"], ["ai", "out"], ["n8n", "out"]],
    },
  },
  {
    slug: "portfolio-site",
    name: "This Portfolio",
    org: "Independent",
    category: "Independent",
    accent: "gold",
    period: "2024 to 2026",
    evidence: "Independent project",
    status: "Live. Source is public.",
    roles: ["fullstack"],
    summary: "Next.js 16 / React 19 / TypeScript portfolio, statically exported to GitHub Pages with CI checks and Playwright tests.",
    problem: "Show engineering ability through the portfolio itself, not just describe it.",
    responsibilities: ["Design system and interactive components", "Typed single-source content model", "CI quality gate, Playwright tests and GitHub Pages deployment"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Playwright", "GitHub Actions"],
    methodology: "Feature branches, PR quality gate, static export, verified deploys.",
    implementation: ["Static export with generated case-study routes", "Spring-physics tilt cards without extra dependencies", "Network-first service worker for fresh HTML"],
    challenges: [{ challenge: "Keeping claims consistent across pages.", response: "One typed data file feeds every page." }],
    testing: ["TypeScript, ESLint and build in CI", "Playwright tests at phone, tablet, laptop and desktop widths"],
    outcomes: ["Lighthouse and Web Vitals are reported only from real measurements."],
    lessons: ["The fastest way to stay honest is to have one source of truth."],
    confidentiality: "Public repository.",
    links: [{ label: "Source on GitHub", href: "https://github.com/M16616678/M16616678.github.io", external: true }],
    related: ["arcade", "careerconnect"],
    diagram: {
      caption: "Build and delivery path for this site.",
      nodes: [
        { id: "data", label: "portfolio.ts", sub: "Typed content", col: 0, row: 1, detail: "Single source of truth." },
        { id: "next", label: "Next.js build", sub: "Static export", col: 1, row: 1, detail: "Pre-renders every route." },
        { id: "ci", label: "CI gate", sub: "tsc · lint · Playwright", col: 2, row: 0, detail: "Blocks broken PRs." },
        { id: "pages", label: "GitHub Pages", sub: "deploy.yml", col: 3, row: 1, detail: "Static hosting." },
        { id: "sw", label: "Service worker", sub: "Network-first HTML", col: 2, row: 2, detail: "Offline support without stale pages." },
      ],
      edges: [["data", "next"], ["next", "ci"], ["ci", "pages"], ["next", "sw"], ["sw", "pages"]],
    },
  },
];

export const categories: ("All" | Category)[] = ["All", "Government", "Healthcare", "AI Evaluation", "Academic", "Independent"];

export const roleViews: { id: RoleView; label: string; pitch: string }[] = [
  { id: "backend", label: "Java / Backend", pitch: "Close to four years of Java, Spring Boot, Spring Batch and PostgreSQL on a state-government financial system." },
  { id: "fullstack", label: "Full-Stack", pitch: "Next.js, React and TypeScript front ends over FastAPI and Supabase back ends, plus this site and its arcade." },
  { id: "ai", label: "AI Evaluation", pitch: "Contract evaluation of technical and coding responses across four platforms, plus RAG and RAGAS experiments." },
  { id: "healthcare", label: "Healthcare Software", pitch: "Role-based scoliosis-care software with row-level security and multi-role testing." },
  { id: "research", label: "Research / University", pitch: "HCI research methods, AI evaluation design and an EEE engineering foundation." },
];

export const skillGroups: { name: string; skills: string[]; evidence: string[] }[] = [
  { name: "Backend", skills: ["Java", "Spring Boot", "Spring Batch", "Python", "FastAPI", "REST APIs"], evidence: ["cfms", "ibrace"] },
  { name: "Frontend", skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Canvas 2D", "Web Audio"], evidence: ["ibrace", "arcade", "portfolio-site"] },
  { name: "Data", skills: ["PostgreSQL", "Supabase", "Row-Level Security", "JPA / Hibernate", "SQL", "JasperReports"], evidence: ["cfms", "ibrace", "cloud-data-labs"] },
  { name: "Quality & Delivery", skills: ["Playwright", "JMeter", "Jenkins", "Docker", "GitHub Actions"], evidence: ["healthcare-testing", "cfms", "portfolio-site"] },
  { name: "AI", skills: ["Code review", "Rubric evaluation", "Reasoning checks", "RAG", "RAGAS", "n8n"], evidence: ["ai-evaluation", "comfit", "ai-workflows"] },
  { name: "Research & UX", skills: ["Personas", "Task analysis", "Usability planning", "Arduino", "Embedded"], evidence: ["careerconnect", "home-automation"] },
];

export const sections = [
  { id: "top", label: "Overview" },
  { id: "career", label: "Career" },
  { id: "projects", label: "Projects" },
  { id: "ai-studio", label: "AI Studio" },
  { id: "arcade", label: "Arcade" },
  { id: "recruiters", label: "Recruiters" },
  { id: "contact", label: "Contact" },
] as const;

export const games = [
  "Star Catcher", "Astro Blaster", "Neon Breaker", "Snake.lua", "Tap Hopper", "Pixel Sprint", "Gem Cascade", "Bubble Burst",
  "Tower Siege", "Maze Muncher", "Sky Racer", "Lua Lander", "Card Clash", "Whack Critter", "Star Forge", "Block Drop",
] as const;

export const accentHex: Record<Accent, string> = { gold: "#e8bc73", cyan: "#69d9e9", violet: "#ba9aff", blue: "#7cb9ff" };

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
