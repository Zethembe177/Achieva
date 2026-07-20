// screens/HomeScreen.jsx
// SRS 3.1 Home Screen: greeting, exam countdown, subject toggle, progress circle,
// "Continue Where You Left Off", study streak, Daily Challenge card, quick actions.
import { useState, useEffect } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { LEARNER, SUBJECTS, CHAPTERS, DAILY_CHALLENGE } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import ProgressCircle from "../components/ProgressCircle";
import Badge from "../components/Badge";
import { FlameIcon, CheckIcon } from "../components/icons";

// Days until the NSC exam — a tiny live countdown so the demo feels alive.
function daysUntil(dateStr) {
  const ms = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86400000));
}

export default function HomeScreen() {
  const { navigate } = useNav();
  const { progress } = useProgress();                      // live points + average
  const [subject, setSubject] = useState(SUBJECTS[0].id); // Core / Lit toggle
  const [countdown, setCountdown] = useState(daysUntil(LEARNER.examDate));

  // refresh the countdown once a minute (cheap; real app would tick daily)
  useEffect(() => {
    const t = setInterval(() => setCountdown(daysUntil(LEARNER.examDate)), 60000);
    return () => clearInterval(t);
  }, []);

  const resume = CHAPTERS[0]; // "Continue where you left off"

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      {/* greeting + avatar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "8px 0 14px" }}>
        <div>
          <div style={{ color: COLORS.soft, fontSize: 13 }}>Good morning,</div>
          <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 800 }}>{LEARNER.name} 👋</div>
        </div>
        <div onClick={() => navigate("profile")} style={{ width: 40, height: 40, borderRadius: "50%",
          background: COLORS.gold, color: COLORS.navy, display: "flex", alignItems: "center",
          justifyContent: "center", fontWeight: 800, cursor: "pointer" }}>{LEARNER.initials}</div>
      </div>

      {/* subject toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {SUBJECTS.map((s) => {
          const on = subject === s.id;
          return (
            <button key={s.id} onClick={() => setSubject(s.id)}
              style={{ flex: 1, padding: "8px 6px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                border: `1px solid ${on ? COLORS.gold : COLORS.line}`,
                background: on ? "rgba(201,168,76,0.15)" : "transparent", color: on ? COLORS.gold : COLORS.midgrey }}>
              {s.name}
            </button>
          );
        })}
      </div>

      {/* exam countdown + progress circle */}
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: COLORS.midgrey, fontSize: 12 }}>NSC Maths exam in</div>
          <div style={{ color: COLORS.gold, fontSize: 30, fontWeight: 900 }}>{countdown} days</div>
          <div style={{ color: COLORS.soft, fontSize: 12, marginTop: 2 }}>On track for a Bachelor Pass</div>
        </div>
        <ProgressCircle pct={progress.average} />
      </Card>

      {/* daily challenge -> quiz screen */}
      <Card gold>
        <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>YOUR DAILY CHALLENGE</div>
        <div style={{ color: COLORS.white, fontSize: 17, fontWeight: 700, margin: "8px 0 4px" }}>{DAILY_CHALLENGE.question}</div>
        <div style={{ color: COLORS.midgrey, fontSize: 12 }}>{DAILY_CHALLENGE.topic} · {DAILY_CHALLENGE.points} pts</div>
        <Button onClick={() => navigate("quiz")}>Solve now</Button>
      </Card>

      {/* stats row */}
      <Card style={{ display: "flex", alignItems: "center" }}>
        {[
          { v: `${progress.average}%`, l: "Current avg" },
          { v: <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>{LEARNER.streak}<FlameIcon size={14} color={COLORS.gold} /></span>, l: "Day streak" },
          { v: `#${LEARNER.schoolRank}`, l: "School rank" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: COLORS.gold, fontSize: 20, fontWeight: 800 }}>{s.v}</div>
            <div style={{ color: COLORS.midgrey, fontSize: 11, marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </Card>

      {/* continue where you left off */}
      <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "6px 4px 10px" }}>Continue where you left off</div>
      <Card onClick={() => navigate("learn")}>
        <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>{resume.title}</div>
        <div style={{ color: COLORS.midgrey, fontSize: 12, marginTop: 2 }}>{resume.progress}% complete</div>
        <ProgressBar pct={resume.progress} />
      </Card>

      {/* quick actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="outline" style={{ marginTop: 4 }} onClick={() => navigate("practice")}>Mock exam</Button>
        <Button variant="outline" style={{ marginTop: 4 }} onClick={() => navigate("wellness")}>Wellness</Button>
      </div>

      {/* offline sync indicator (REQ-OFFLINE-2) */}
      <Card style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <CheckIcon size={16} color={COLORS.green} />
        <div>
          <div style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>All content synced</div>
          <div style={{ color: COLORS.midgrey, fontSize: 11 }}>Last sync: today 8:15 AM · Study offline anytime</div>
        </div>
      </Card>
    </div>
  );
}
