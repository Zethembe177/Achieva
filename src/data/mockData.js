// ============================================================================
// data/mockData.js
// Fake-but-realistic content so the screens have something to show for the
// founder demo. In production this comes from the Node/Express API (SRS 3.3).
// Keeping it all here means screens never hard-code content and a teammate can
// swap this file for real API calls later without touching the UI.
// ============================================================================

export const LEARNER = {
  name: "Thabo",
  initials: "TM",
  school: "Soweto High",
  province: "Gauteng",
  grade: 12,
  tier: "Bachelor Pass",   // Starter | Foundation | Bachelor Pass | Elite
  streak: 12,
  points: 2420,
  schoolRank: 4,
  average: 73,             // current overall %
  target: 70,              // Achieva internal benchmark
  examDate: "2026-10-26",  // used by the live exam countdown on Home
};

export const SUBJECTS = [
  { id: "core", name: "Mathematics Core" },
  { id: "lit", name: "Mathematical Literacy" },
];

// Content hierarchy per REQ-CONTENT-1: Subject -> Chapter -> Topic -> Lesson.
export const CHAPTERS = [
  {
    id: 1, title: "Functions & Graphs", progress: 62,
    lessons: [
      { id: 11, title: "Parabolas", tutor: "Dr Mpho Sithole", mins: 18, done: true },
      { id: 12, title: "Hyperbolas", tutor: "Dr Mpho Sithole", mins: 15, done: true },
      { id: 13, title: "Exponential graphs", tutor: "Dr Mpho Sithole", mins: 21, done: false },
    ],
  },
  {
    id: 2, title: "Calculus — Derivatives", progress: 34,
    lessons: [
      { id: 21, title: "Rules of differentiation", tutor: "Ms Dlamini", mins: 24, done: false },
      { id: 22, title: "Tangents & gradients", tutor: "Ms Dlamini", mins: 19, done: false },
    ],
  },
  {
    id: 3, title: "Trigonometry", progress: 0,
    lessons: [
      { id: 31, title: "Sine & cosine rules", tutor: "Dr Mpho Sithole", mins: 22, done: false },
    ],
  },
];

// One quiz used by both the Daily Challenge card and the Quiz screen (REQ-QUIZ-2).
export const DAILY_CHALLENGE = {
  topic: "Quadratic Equations",
  points: 2,
  question: "Solve for x:  x² − 5x + 6 = 0",
  options: [
    { label: "A", text: "x = 2 and x = 3", correct: true },
    { label: "B", text: "x = −2 and x = −3", correct: false },
    { label: "C", text: "x = 1 and x = 6", correct: false },
    { label: "D", text: "x = 5 and x = −1", correct: false },
  ],
  explanation:
    "Factorise: x² − 5x + 6 = (x − 2)(x − 3). Setting each factor to zero gives x = 2 or x = 3.",
};

// Past papers for Mock Exam Mode (SRS 4.5).
export const PAST_PAPERS = [
  { id: "p1", title: "2024 NSC Paper 1", marks: 150, hours: 3, downloaded: true, memo: "Worked memo with step-by-step answers for Paper 1.", memoDetails: "Use this memo to self-mark every question and check where you lost marks. Focus on functions, algebra and graphs." },
  { id: "p2", title: "2023 NSC Paper 1", marks: 150, hours: 3, downloaded: true, memo: "Complete memo for Paper 1 showing exam-style solutions.", memoDetails: "Review the question layout, follow the memo's structured responses, and compare your working to the model answers." },
  { id: "p3", title: "2023 NSC Paper 2", marks: 150, hours: 3, downloaded: false, memo: "Memo available after paper submission.", memoDetails: "This paper includes extended algebra and calculus worked solutions — open the memo after marking your answers." },
];

// Performance Tracker topic breakdown (REQ-TRACK-3).
export const TOPIC_SCORES = [
  { topic: "Functions & Graphs", score: 81, attempts: 6 },
  { topic: "Quadratic Equations", score: 76, attempts: 5 },
  { topic: "Number Patterns", score: 70, attempts: 3 },
  { topic: "Trigonometry", score: 61, attempts: 4 },
  { topic: "Calculus", score: 54, attempts: 2 },
];

// Rule-based AI Study Planner output (REQ-PLAN-1 — NOT predictive/ML for V1).
export const STUDY_PLAN = [
  { day: "Mon", task: "Calculus: Rules of differentiation", mins: 45, priority: "High" },
  { day: "Tue", task: "Trigonometry: Sine & cosine rules", mins: 40, priority: "High" },
  { day: "Wed", task: "Mock exam: Paper 1 full attempt", mins: 180, priority: "Exam sim" },
];

export const LEADERBOARD = {
  school: [
    { name: "Kefilwe N.", where: "salton High", pts: 2840 },
    { name: "Zinhle M.", where: "Orlando High", pts: 2690 },
    { name: "Thabo M. (You)", where: "Soweto High", pts: 2420, you: true },
  ],
  province: [
    { name: "Kefilwe N.", where: "Sandton High", pts: 2840 },
    { name: "Lerato P.", where: "Pretoria Girls", pts: 2755 },
    { name: "Thabo M. (You)", where: "Soweto High", pts: 2420, you: true },
  ],
  national: [
    { name: "Aisha D.", where: "Durban", pts: 3120 },
    { name: "Kefilwe N.", where: "Sandton High", pts: 2840 },
    { name: "Thabo M. (You)", where: "Soweto High", pts: 2420, you: true },
  ],
};

// Study Together forum — every thread is anchored to a topic (REQ-COMM-1).
export const THREADS = [
  { id: 1, author: "Lungelo N.", topic: "Calculus", ago: "45 min ago",
    body: "Can someone explain the chain rule? I lose the plot when functions are nested.",
    replies: 4, helpful: 12, tutor: true },
  { id: 2, author: "Siphesihle A.", topic: "Functions", ago: "2h ago",
    body: "How do you know when to use the discriminant vs just factorising?",
    replies: 7, helpful: 28, tutor: false },
];

// Wellness Corner — never paywalled, works offline (REQ-GAM-3).
export const WELLNESS = {
  articles: [
    { id: 1, title: "Beating exam anxiety", mins: 4, kind: "Article" },
    { id: 2, title: "A calm 10-minute study reset", mins: 10, kind: "Video" },
    { id: 3, title: "Sleep and memory before exams", mins: 5, kind: "Article" },
  ],
  helplines: [
    { name: "SADAG Mental Health Line", number: "0800 456 789" },
    { name: "Childline South Africa", number: "116" },
  ],
};

// Download Manager items (REQ-OFFLINE-3): per-item progress + storage.
export const DOWNLOADS = [
  { id: 1, title: "Functions & Graphs — Parabolas", size: 240, quality: "720p", progress: 100 },
  { id: 2, title: "2023 NSC Paper 1 — Walkthrough", size: 610, quality: "480p", progress: 100 },
  { id: 3, title: "Calculus — Rules of differentiation", size: 320, quality: "720p", progress: 45 },
];

// NSC level from a percentage (REQ-EXAM-3 / REQ-TRACK-1).
export function nscLevel(pct) {
  if (pct >= 80) return 7;
  if (pct >= 70) return 6;
  if (pct >= 60) return 5;
  if (pct >= 50) return 4;   // Level 4 = Bachelor pass threshold
  if (pct >= 40) return 3;
  if (pct >= 30) return 2;
  return 1;
}

export const MOTIVATIONAL_QUOTES = [
  "Small steps every day lead to big results.",
  "Discipline today, success tomorrow.",
  "Your Bachelor Pass starts with today's session.",
];

export const DASHBOARD_STATS = {
  lessonsCompleted: 26,
  papersCompleted: 4,
  quizzesCompleted: 18,
  weeklyMinutes: 315,
};

export const STUDY_TASKS = [
  { id: "st1", time: "08:00", type: "lesson", title: "Watch Lesson", topic: "Quadratic Equations", mins: 45, priority: "High", target: "learn" },
  { id: "st2", time: "10:00", type: "quiz", title: "Topic Quiz", topic: "Functions Quiz", mins: 30, priority: "High", target: "quiz" },
  { id: "st3", time: "14:00", type: "paper", title: "Past Paper Practice", topic: "2023 Paper 1 (Q1–Q3)", mins: 60, priority: "Exam sim", target: "practice" },
  { id: "st4", time: "16:00", type: "notes", title: "Revision", topic: "Trigonometry Notes", mins: 30, priority: "Medium", target: "learn" },
];

export const RECENT_ACTIVITY = [
  { id: "a1", type: "lesson", title: "Lesson completed", subtitle: "Quadratic Functions", value: "+50 pts", time: "08:15", color: "#2ECC71", target: "learn" },
  { id: "a2", type: "quiz", title: "Quiz completed", subtitle: "Functions Quiz", value: "78%", time: "10:32", color: "#C9A84C", target: "quiz" },
  { id: "a3", type: "paper", title: "Past paper attempted", subtitle: "2024 Paper 1", value: "72%", time: "Yesterday", color: "#5B9CFF", target: "practice" },
  { id: "a4", type: "download", title: "Downloaded", subtitle: "Trigonometry Notes", value: "Ready", time: "Yesterday", color: "#2ECC71", target: "downloads" },
];

export const NOTIFICATIONS = [
  { id: "n1", type: "content", title: "New walkthrough available", message: "The 2024 Paper 2 walkthrough is now available.", time: "10 min ago", target: "practice" },
  { id: "n2", type: "plan", title: "Study session at 14:00", message: "Your past-paper practice session starts this afternoon.", time: "1 hour ago", target: "studyPlanner" },
  { id: "n3", type: "progress", title: "You moved up a level", message: "Your Functions score improved to 81%.", time: "Yesterday", target: "performance" },
];

export const LESSONS = [
  { id: 11, subjectId: "core", topicId: "functions", category: "video", title: "Parabolas", tutor: "Dr Mpho Sithole", mins: 18, difficulty: "Foundation", grade: 12, progress: 100, formula: "y = ax² + bx + c", description: "Understand turning points, intercepts and transformations of parabolas." },
  { id: 12, subjectId: "core", topicId: "functions", category: "video", title: "Hyperbolas", tutor: "Dr Mpho Sithole", mins: 15, difficulty: "Foundation", grade: 12, progress: 100, formula: "y = a/(x-p) + q", description: "Work with asymptotes and transformations of hyperbolic functions." },
  { id: 13, subjectId: "core", topicId: "functions", category: "video", title: "Exponential graphs", tutor: "Dr Mpho Sithole", mins: 21, difficulty: "Intermediate", grade: 12, progress: 42, formula: "y = abˣ + q", description: "Explore growth, decay, intercepts and asymptotes." },
  { id: 21, subjectId: "core", topicId: "calculus", category: "video", title: "Rules of differentiation", tutor: "Ms Dlamini", mins: 24, difficulty: "Advanced", grade: 12, progress: 18, formula: "d/dx(xⁿ) = nxⁿ⁻¹", description: "Apply the power rule and differentiate polynomial functions." },
  { id: 31, subjectId: "core", topicId: "trigonometry", category: "video", title: "Sine & cosine rules", tutor: "Dr Mpho Sithole", mins: 22, difficulty: "Intermediate", grade: 12, progress: 0, formula: "a/sin A = b/sin B", description: "Solve non-right-angled triangles using sine and cosine rules." },
  { id: 101, subjectId: "lit", topicId: "finance", category: "video", title: "Simple and compound interest", tutor: "Ms Nkosi", mins: 20, difficulty: "Foundation", grade: 12, progress: 35, formula: "A = P(1+i)ⁿ", description: "Calculate growth and depreciation in everyday financial contexts." },
  { id: 102, subjectId: "lit", topicId: "maps", category: "video", title: "Scale and map distance", tutor: "Mr Mokoena", mins: 17, difficulty: "Foundation", grade: 12, progress: 0, formula: "Scale = map distance / actual distance", description: "Use map scales and conversions to calculate real distances." },
];

export const NOTES = [
  { id: "n-core-1", subjectId: "core", lessonId: 13, topicId: "functions", title: "Functions summary sheet", pages: 8, fileType: "PDF", difficulty: "Foundation", description: "Key graph shapes, transformations and exam tips." },
  { id: "n-core-2", subjectId: "core", lessonId: 21, topicId: "calculus", title: "Calculus formula guide", pages: 6, fileType: "PDF", difficulty: "Advanced", description: "Differentiation rules, tangent equations and worked examples." },
  { id: "n-lit-1", subjectId: "lit", lessonId: 101, topicId: "finance", title: "Finance revision notes", pages: 10, fileType: "PDF", difficulty: "Foundation", description: "Interest, inflation, tariffs and household budgets." },
];

export const QUIZZES = [
  {
    id: "quiz-functions-1", subjectId: "core", topic: "Functions & Graphs", title: "Functions Checkpoint", difficulty: "Intermediate", estimatedMinutes: 8,
    questions: [
      { id: "q1", text: "Which point is the turning point of y = (x - 2)² + 3?", options: ["(2, 3)", "(-2, 3)", "(3, 2)", "(2, -3)"], answer: 0, explanation: "Vertex form y=(x-p)²+q has turning point (p,q)." },
      { id: "q2", text: "The graph y = 2ˣ has which horizontal asymptote?", options: ["x = 0", "y = 0", "x = 2", "y = 2"], answer: 1, explanation: "An unshifted exponential graph approaches y=0." },
      { id: "q3", text: "For y = -x² + 4, the parabola opens…", options: ["Upwards", "Downwards", "Left", "Right"], answer: 1, explanation: "A negative coefficient of x² makes the parabola open downwards." },
    ],
  },
  {
    id: "quiz-finance-1", subjectId: "lit", topic: "Finance", title: "Finance Basics", difficulty: "Foundation", estimatedMinutes: 7,
    questions: [
      { id: "lq1", text: "A price rises from R200 to R220. What is the percentage increase?", options: ["5%", "10%", "20%", "22%"], answer: 1, explanation: "Increase is R20; R20/R200 × 100 = 10%." },
      { id: "lq2", text: "Which value is the principal amount?", options: ["The original amount invested", "The interest earned", "The final balance", "The monthly fee"], answer: 0, explanation: "Principal means the original amount invested or borrowed." },
    ],
  },
];

export const WALKTHROUGHS = PAST_PAPERS.map((p) => ({ id: `walk-${p.id}`, paperId: p.id, title: `${p.title} Full Walkthrough`, mins: 96 }));
