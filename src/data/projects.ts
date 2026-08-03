

export type ThemedAsset = string | { dark?: string; light?: string };

export interface Project {
  id: string;
  number: string;
  title: string;
  hook: string;
  description: string;
  notes: string[];
  technologies: string[];
  github: string;
  live: string;
  thumbnail: ThemedAsset | null;
  gallery: ThemedAsset[];
  architectureDiagram: string[];
  tags: string[];
  domain: string;
  highlight: string | null;
  featured: boolean;
  status: string;
  year: number | null;
}

export const projects: Project[] = [
  {
    id: "undertriai",
    number: "001",
    title: "UndertriAI",
    hook: "Agentic bail-assessment RL environment.",
    description:
      "A sequential 10-action RL environment that trains LLMs — via GRPO, HuggingFace TRL, and Unsloth — to reason through Indian bail cases the way a judge structures the decision.",
    notes: [
      "5-component deterministic reward function, including an explicit demographic-bias penalty.",
      "Trained on 1,200 real High Court judgments across 4 curriculum stages.",
      "Sequential 10-action episode structure forces the model to gather facts before deciding.",
      "OpenEnv-compatible, so any GRPO/TRL training loop can plug straight in.",
    ],
    technologies: ["Python", "GRPO", "HuggingFace TRL", "Unsloth", "OpenEnv"],
    github: "https://github.com/Faiz-1606/Undertrial",
    live: "",
    thumbnail: null,
    gallery: [],
    architectureDiagram: ["case intake", "10-action agent loop", "reward (5 components)", "GRPO update"],
    tags: ["Python", "GRPO", "HuggingFace TRL", "Unsloth", "OpenEnv"],
    domain: "Reinforcement Learning",
    highlight: "Meta OpenEnv Hackathon Finalist",
    featured: true,
    status: "",
    year: null,
  },
  {
    id: "repo-onboarder",
    number: "002",
    title: "Repo Onboarder",
    hook: "RAG system for querying unfamiliar codebases.",
    description:
      "Indexes source code and Git commit history into two independent Qdrant vector collections with separate TF-IDF embeddings, so \"what does this function do\" and \"why did this change\" never contaminate each other.",
    notes: [
      "Parses Python/JS/TS via AST + tree-sitter — 200+ chunks indexed in under 5 seconds.",
      "Zero-latency regex query routing decides code vs. history before any embedding runs.",
      "Every answer carries file or commit-hash citations, so nothing is unverifiable.",
      "Two collections, two TF-IDF vocabularies: code tokens and commit prose are different languages.",
    ],
    technologies: ["Python", "FastAPI", "Qdrant", "scikit-learn", "React", "Docker"],
    github: "https://github.com/Faiz-1606/Repo-onboarder",
    live: "",
    thumbnail: null,
    gallery: [],
    architectureDiagram: ["repo clone", "AST / tree-sitter chunking", "2× Qdrant collections", "regex router", "cited answer"],
    tags: ["Python", "FastAPI", "Qdrant", "scikit-learn", "React", "Docker"],
    domain: "Developer Tools · RAG",
    highlight: null,
    featured: true,
    status: "",
    year: null,
  },
  {
    id: "container-port",
    number: "003",
    title: "Container Port",
    hook: "RL environment for container yard operations at shipping ports.",
    description:
      "A simulation-based, OpenEnv-compatible RL environment for managing and improving container yard operations — crane moves, stacking decisions, and yard congestion as a sequential decision problem.",
    notes: [
      "Yard state, vessel schedules, and crane allocation modeled as one simulation loop.",
      "OpenEnv-compatible interface — the same agent code that runs on UndertriAI runs here.",
      "Built to measure operational improvement, not just episode reward.",
    ],
    technologies: ["Python", "FastAPI", "Qdrant", "scikit-learn", "React", "Docker"],
    github: "https://github.com/Faiz-1606/container-port-env",
    live: "",
    thumbnail: null,
    gallery: [],
    architectureDiagram: ["vessel arrivals", "yard state sim", "agent action", "throughput metrics"],
    tags: ["Python", "FastAPI", "Qdrant", "scikit-learn", "React", "Docker"],
    domain: "Simulation · RL",
    highlight: null,
    featured: true,
    status: "",
    year: null,
  },
  {
    id: "smart-ecu",
    number: "004",
    title: "Smart ECU",
    hook: "Bluetooth-enabled ECU: Android app + Arduino embedded controller.",
    description:
      "A Kotlin Android application communicating over Bluetooth (HC-05) with an Arduino-powered ECU simulator — ignition control, command processing, real-time diagnostics, and serial communication.",
    notes: [
      "Hardware–software integration end to end: app UI → Bluetooth frames → serial → actuator.",
      "Real-time diagnostics streamed back from the ECU over the same HC-05 link.",
      "Command protocol designed to stay debuggable with a bare serial monitor.",
    ],
    technologies: ["Kotlin", "Android", "Arduino", "Bluetooth", "Embedded Systems"],
    github: "https://github.com/Faiz-1606/Smart-ECU",
    live: "",
    thumbnail: null,
    gallery: [],
    architectureDiagram: ["Kotlin app", "HC-05 Bluetooth", "Arduino ECU", "ignition + diagnostics"],
    tags: ["Kotlin", "Android", "Arduino", "Bluetooth", "Embedded Systems"],
    domain: "Embedded · Mobile",
    highlight: null,
    featured: true,
    status: "",
    year: null,
  },
  {
    id: "huxler",
    number: "005",
    title: "Huxler",
    hook: "Full-stack collaboration platform with real-time everything.",
    description:
      "Real-time messaging via Socket.io, AI-powered project idea generation through the OpenAI API, and AWS S3 file storage — 21 database models under one Next.js 14 + TypeScript + PostgreSQL roof.",
    notes: [
      "Unlimited channels per project with WebSocket delivery, live typing indicators, and cross-project notifications.",
      "Drag-and-drop Kanban boards for task management, backed by Prisma ORM over complex relational data.",
      "Redis caching layer for session persistence; S3 uploads up to 10MB.",
    ],
    technologies: ["Next.js 14", "TypeScript", "Socket.io", "Prisma", "PostgreSQL", "Redis", "AWS S3", "OpenAI API"],
    github: "https://github.com/Faiz-1606/Huxler",
    live: "",
    thumbnail: null,
    gallery: [],
    architectureDiagram: ["Next.js 14", "Socket.io", "PostgreSQL / Prisma (21 models)", "Redis + S3"],
    tags: ["Next.js", "AWS", "PostgreSQL", "Redis"],
    domain: "Full-Stack",
    highlight: null,
    featured: true,
    status: "",
    year: null,
  },
  {
    id: "sign-bridge",
    number: "006",
    title: "Sign Bridge",
    hook: "Real-time sign language recognition and 3D-avatar translation.",
    description:
      "React + Flask + a PyTorch LSTM doing real-time sign detection at an 80% confidence threshold and 300ms processing intervals, with MediaPipe hand tracking feeding the model.",
    notes: [
      "3D avatar animation system covering 26 alphabets + 4 words, rendered with Three.js/WebGL.",
      "Flask API serves predictions; MediaPipe handles hand detection client-side.",
      "Flutter mobile wrapper (camera permissions, WebView, connectivity monitoring) cut development time ~70% vs. native iOS/Android.",
    ],
    technologies: ["React.js", "Flutter", "Dart", "Python", "MediaPipe", "OpenCV", "PyTorch", "Three.js", "Flask"],
    github: "https://github.com/Faiz-1606/signtranslator",
    live: "",
    thumbnail: null,
    gallery: [],
    architectureDiagram: ["camera feed", "MediaPipe landmarks", "LSTM (PyTorch)", "3D avatar / text"],
    tags: ["React.js", "Flutter", "Dart", "Python", "MediaPipe", "OpenCV", "PyTorch"],
    domain: "Computer Vision · Mobile",
    highlight: null,
    featured: true,
    status: "",
    year: null,
  },
  {
    id: "abandoned-bag-detector",
    number: "007",
    title: "Abandoned Bag Detector",
    hook: "Real-time surveillance for unattended baggage.",
    description:
      "YOLO object detection + OpenCV tracking + person–object association, with time-based alert logic so a bag is only \"abandoned\" when its owner has actually left.",
    notes: [
      "Person–object association is the core: alerts fire on ownership loss, not mere presence.",
      "Time-based alert thresholds keep false alarms down in busy public environments.",
      "Automated notifications plus a secure monitoring dashboard for continuous surveillance.",
    ],
    technologies: ["Python", "YOLO", "OpenCV", "Flask"],
    github: "https://github.com/Faiz-1606/abandoned-bag-detection",
    live: "",
    thumbnail: null,
    gallery: [],
    architectureDiagram: ["video stream", "YOLO detect", "track + associate owner", "timer", "alert + dashboard"],
    tags: ["Python", "YOLO", "OpenCV", "Computer Vision", "Flask"],
    domain: "Computer Vision",
    highlight: null,
    featured: true,
    status: "",
    year: null,
  },
];
