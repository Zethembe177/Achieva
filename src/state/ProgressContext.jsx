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
import { LEARNER, TOPIC_SCORES, NOTIFICATIONS, nscLevel, RECENT_ACTIVITY, DOWNLOADS } from "../data/mockData";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [points, setPoints] = useState(LEARNER.points);
  const [completedLessons, setCompletedLessons] = useState([]);      // lesson ids
  const [topics, setTopics] = useState(TOPIC_SCORES);                // {topic, score, attempts}
  const [examResults, setExamResults] = useState([]);                // {paperId, title, pct, level}
  const [recentActivity, setRecentActivity] = useState(RECENT_ACTIVITY); // seeded activity rows
  const [quizAttempts, setQuizAttempts] = useState([]);              // {quizId, topicName, pct, pts}
  const [completedStudyTasks, setCompletedStudyTasks] = useState([]); // study task ids
  const [downloads, setDownloads] = useState(DOWNLOADS);            // offline content
  const [readNotifications, setReadNotifications] = useState([]);    // notification ids

  const resetProgress = useCallback(() => {
    setPoints(LEARNER.points);
    setCompletedLessons([]);
    setTopics(TOPIC_SCORES);
    setExamResults([]);
    setRecentActivity(RECENT_ACTIVITY);
    setQuizAttempts([]);
    setCompletedStudyTasks([]);
    setDownloads(DOWNLOADS);
    setReadNotifications([]);
  }, []);

  const completeLesson = useCallback((lessonId) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) return prev;
      setPoints((p) => p + 10);
      return [...prev, lessonId];
    });
  }, []);

  const recordQuiz = useCallback((quizId, topicName, scorePct, pts = 2) => {
    setPoints((p) => p + pts);
    setTopics((prev) =>
      prev.map((t) => {
        if (t.topic !== topicName) return t;
        const attempts = t.attempts + 1;
        const score = Math.round((t.score * t.attempts + scorePct) / attempts);
        return { ...t, score, attempts };
      })
    );
    setQuizAttempts((prev) => {
      const nextAttempt = { quizId, topicName, pct: scorePct, pts, timestamp: Date.now() };
      return prev.some((attempt) => attempt.quizId === quizId)
        ? prev.map((attempt) => attempt.quizId === quizId ? nextAttempt : attempt)
        : [...prev, nextAttempt];
    });
  }, []);

  const recordMockExam = useCallback((paperId, title, pct) => {
    setPoints((p) => p + 50);
    setExamResults((prev) => [{ paperId, title, pct, level: nscLevel(pct) }, ...prev]);
  }, []);

  const addActivity = useCallback((activity) => {
    setRecentActivity((prev) => {
      if (activity.uniqueKey && prev.some((item) => item.uniqueKey === activity.uniqueKey)) return prev;
      return [activity, ...prev];
    });
  }, []);

  const addDownload = useCallback((download) => {
    setDownloads((prev) => {
      if (prev.some((item) => item.id === download.id)) {
        return prev.map((item) => (item.id === download.id ? { ...item, ...download } : item));
      }
      return [download, ...prev];
    });
  }, []);

  const updateDownload = useCallback((id, patch) => {
    setDownloads((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const removeDownload = useCallback((id) => {
    setDownloads((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const completeDownload = useCallback((id) => {
    setDownloads((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, progress: 100, status: "complete" } : item
      )
    );
  }, []);

  const toggleStudyTask = useCallback((task) => {
    setCompletedStudyTasks((prev) =>
      prev.includes(task.id) ? prev.filter((id) => id !== task.id) : [...prev, task.id]
    );
  }, []);

  const markNotificationRead = useCallback((notificationId) => {
    setReadNotifications((prev) =>
      prev.includes(notificationId) ? prev : [...prev, notificationId]
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setReadNotifications(NOTIFICATIONS.map((notification) => notification.id));
  }, []);

  const isWalkthroughUnlocked = useCallback(
    (paperId) => examResults.some((result) => result.paperId === paperId),
    [examResults]
  );

  const unreadNotifications = useMemo(
    () => NOTIFICATIONS.filter((notification) => !readNotifications.includes(notification.id)).length,
    [readNotifications]
  );

  const average = useMemo(
    () => Math.round(topics.reduce((s, t) => s + t.score, 0) / Math.max(1, topics.length)),
    [topics]
  );

  const value = {
    progress: {
      points,
      completedLessons,
      topics,
      examResults,
      recentActivity,
      quizAttempts,
      completedStudyTasks,
      downloads,
      readNotifications,
      unreadNotifications,
      average,
      streak: LEARNER.streak,
    },
    completeLesson,
    recordQuiz,
    recordMockExam,
    addActivity,
    addDownload,
    updateDownload,
    removeDownload,
    completeDownload,
    toggleStudyTask,
    markNotificationRead,
    markAllNotificationsRead,
    isWalkthroughUnlocked,
    resetProgress,
  };
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
