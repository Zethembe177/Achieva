// ============================================================================
// state/ProgressContext.jsx
// A single shared "brain" for the learner's progress, so an action on ONE
// screen (finishing a lesson, a quiz, or a mock exam) shows up on ANOTHER
// screen (the Performance Tracker, points, streak) live.
//
// This is pure front-end shared state (React Context) — NOT a backend.
// Progress resets on page refresh; persisting it across sessions is the
// backend step later. For the demo, live in-session updates are what sell it.
//
// Usage in any screen:
//   const { progress, completeLesson, recordQuiz, recordMockExam } = useProgress();
// ============================================================================

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { LEARNER, TOPIC_SCORES, nscLevel } from "../data/mockData";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  // seed from mock data so the tracker isn't empty on first load
  const [points, setPoints] = useState(LEARNER.points);
  const [completedLessons, setCompletedLessons] = useState([]);      // lesson ids
  const [topics, setTopics] = useState(TOPIC_SCORES);                // {topic, score, attempts}
  const [examResults, setExamResults] = useState([]);                // {title, pct, level}

  // --- mark a lesson complete (+10 pts, once per lesson) ---
  const completeLesson = useCallback((lessonId) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) return prev; // no double-count
      setPoints((p) => p + 10);
      return [...prev, lessonId];
    });
  }, []);

  // --- record a quiz/daily-challenge result ---
  // Updates the matching topic's rolling average + attempt count, adds points.
  const recordQuiz = useCallback((topicName, scorePct, pts = 2) => {
    setPoints((p) => p + pts);
    setTopics((prev) =>
      prev.map((t) => {
        if (t.topic !== topicName) return t;
        const attempts = t.attempts + 1;
        const score = Math.round((t.score * t.attempts + scorePct) / attempts);
        return { ...t, score, attempts };
      })
    );
  }, []);

  // --- record a mock exam result (+50 pts) ---
  const recordMockExam = useCallback((title, pct) => {
    setPoints((p) => p + 50);
    setExamResults((prev) => [{ title, pct, level: nscLevel(pct) }, ...prev]);
  }, []);

  // overall average across all topics (recomputes whenever topics change)
  const average = useMemo(
    () => Math.round(topics.reduce((s, t) => s + t.score, 0) / topics.length),
    [topics]
  );

  const value = {
    progress: { points, completedLessons, topics, examResults, average },
    completeLesson,
    recordQuiz,
    recordMockExam,
  };
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
