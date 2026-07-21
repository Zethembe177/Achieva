// screens/PerformanceScreen.jsx
// SRS 4.6 Performance Tracker + AI Study Planner.
// REQ-TRACK-2: show gap to Level 4 (Bachelor pass) and the 70% benchmark.
// REQ-TRACK-3: topic-by-topic breakdown, colour-coded by band.
// REQ-PLAN-1: rule-based weekly plan (NOT predictive) shown below.
import { COLORS, bandColor } from "../theme/tokens";
import { LEARNER, STUDY_PLAN } from "../data/mockData";
import { useProgress } from "../state/ProgressContext";
import { useNav } from "../navigation/NavContext";
import { useSubject } from "../state/SubjectContext";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Badge from "../components/Badge";
export default function PerformanceScreen() {
  // read LIVE values from the shared store (updated by lessons/quizzes/exams)
  const { progress } = useProgress();
  const { navigate } = useNav();
  const { selectedSubject } = useSubject();
  const average = progress.average;
  const TOPIC_SCORES = progress.topics;
  const gap = LEARNER.target - average; // negative means above target
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 800, margin: "10px 0 4px" }}>My Progress</div>
      <div style={{ color: COLORS.midgrey, fontSize: 13, marginBottom: 12 }}>Grade 12 · 2026 · {selectedSubject.name}</div>
      {/* headline vs benchmark */}
      <Card gold>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ color: COLORS.gold, fontSize: 34, fontWeight: 900 }}>{average}%</span>
          <span style={{ color: COLORS.green, fontSize: 12 }}>
            {gap <= 0 ? `On track · ${Math.abs(gap)}% above target` : `${gap}% to target`}
          </span>
        </div>
        <div style={{ color: COLORS.soft, fontSize: 12, marginTop: 4 }}>Target {LEARNER.target}% · Level 4 Bachelor Pass secured</div>
      </Card>
      {/* topic breakdown */}
      <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "10px 4px 8px" }}>Performance by topic</div>
      {TOPIC_SCORES.map((t) => (
        <Card key={t.topic} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>{t.topic}</span>
            <span style={{ color: bandColor(t.score), fontWeight: 800 }}>{t.score}%</span>
          </div>
          <ProgressBar pct={t.score} color={bandColor(t.score)} />
          <div style={{ color: COLORS.midgrey, fontSize: 11, marginTop: 4 }}>{t.attempts} attempts</div>
        </Card>
      ))}
      {/* recent mock exams — appears once you save a result from Mock Exam Mode */}
      {progress.examResults.length > 0 && (
        <>
          <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "10px 4px 8px" }}>Recent mock exams</div>
          {progress.examResults.map((e, i) => (
            <Card key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: COLORS.white, fontSize: 14 }}>{e.title}</span>
              <span style={{ color: bandColor(e.pct), fontWeight: 800 }}>{e.pct}% · Lv {e.level}</span>
            </Card>
          ))}
        </>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => navigate("studyPlanner")} style={{ flex: 1, padding: 11, borderRadius: 12, border: `1px solid ${COLORS.gold}`, background: "transparent", color: COLORS.gold, fontWeight: 800, cursor: "pointer" }}>Study Planner</button>
        <button onClick={() => navigate("recentActivity")} style={{ flex: 1, padding: 11, borderRadius: 12, border: `1px solid ${COLORS.line}`, background: COLORS.navy2, color: COLORS.soft, fontWeight: 800, cursor: "pointer" }}>Recent Activity</button>
      </div>

      {/* rule-based study plan */}
      <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "10px 4px 8px" }}>AI Study Plan · this week</div>
      {STUDY_PLAN.map((d, i) => (
        <Card key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(201,168,76,0.15)", color: COLORS.gold,
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>{d.day}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>{d.task}</div>
            <div style={{ color: COLORS.midgrey, fontSize: 11 }}>{d.mins} min</div>
          </div>
          <Badge color={d.priority === "High" ? COLORS.red : COLORS.gold}>{d.priority}</Badge>
        </Card>
      ))}
    </div>
  );
}
