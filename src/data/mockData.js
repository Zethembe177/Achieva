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
  { id: "p1", title: "2024 NSC Paper 1", marks: 150, hours: 3, downloaded: true },
  { id: "p2", title: "2023 NSC Paper 1", marks: 150, hours: 3, downloaded: true },
  { id: "p3", title: "2023 NSC Paper 2", marks: 150, hours: 3, downloaded: false },
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
    { name: "Kefilwe N.", where: "Sandton High", pts: 2840 },
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
