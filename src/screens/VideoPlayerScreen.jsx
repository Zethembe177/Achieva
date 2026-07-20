// screens/VideoPlayerScreen.jsx
// SRS 3.1 Video Player + REQ-CONTENT-2/3/6:
//  - resume position (shown), formula highlight box, related notes link
//  - "Mark as Complete" (manual, not auto) -> REQ-CONTENT-3
//  - two-type feedback: "I got this" / "I need help" -> REQ-CONTENT-6
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { CHAPTERS } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";
import { PlayIcon } from "../components/icons";
// find the lesson passed via nav params (falls back to the first lesson)
function findLesson(id) {
  for (const ch of CHAPTERS) { const l = ch.lessons.find((x) => x.id === id); if (l) return l; }
  return CHAPTERS[0].lessons[0];
}
export default function VideoPlayerScreen() {
  const { params } = useNav();
  const { completeLesson } = useProgress();
  const lesson = findLesson(params.lessonId);
  const [complete, setComplete] = useState(lesson.done);
  const [feedback, setFeedback] = useState(null); // "got" | "help" | null

  // mark complete locally AND push to the shared store (+10 pts, feeds tracker)
  function markComplete() {
    setComplete(true);
    completeLesson(lesson.id);
  }
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader title={lesson.title} subtitle={`${lesson.tutor} · ${lesson.mins} min`} />
      {/* fake player surface */}
      <div style={{ height: 190, borderRadius: 16, background: "linear-gradient(135deg,#12233d,#0a1628)",
        border: `1px solid ${COLORS.line}`, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 8 }}>
        <div style={{ width: 54, height: 54, borderRadius: "50%", background: COLORS.gold,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PlayIcon size={22} color={COLORS.navy} />
        </div>
        <span style={{ color: COLORS.midgrey, fontSize: 12 }}>Resumes at 07:24</span>
      </div>
      {/* formula highlight box (SRS 3.1) */}
      <Card style={{ marginTop: 12 }}>
        <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 700 }}>KEY FORMULA</div>
        <div style={{ color: COLORS.white, fontSize: 18, fontWeight: 700, textAlign: "center", padding: "8px 0" }}>
          y = ax² + bx + c
        </div>
      </Card>
      <Button variant="outline">Open related notes</Button>
      {/* Mark as Complete — manual only */}
      <Button onClick={markComplete} disabled={complete}>
        {complete ? "Completed ✓" : "Mark as Complete"}
      </Button>
      {/* two-type feedback */}
      <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "16px 4px 8px" }}>Was this clear?</div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setFeedback("got")}
          style={{ flex: 1, padding: "10px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer",
            border: `1px solid ${feedback === "got" ? COLORS.green : COLORS.line}`,
            background: feedback === "got" ? "rgba(46,204,113,0.15)" : "transparent",
            color: feedback === "got" ? COLORS.green : COLORS.soft }}>✅ I got this</button>
        <button onClick={() => setFeedback("help")}
          style={{ flex: 1, padding: "10px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer",
            border: `1px solid ${feedback === "help" ? COLORS.red : COLORS.line}`,
            background: feedback === "help" ? "rgba(231,76,60,0.15)" : "transparent",
            color: feedback === "help" ? COLORS.red : COLORS.soft }}>🚩 I need help</button>
      </div>
      {feedback && <div style={{ color: COLORS.midgrey, fontSize: 12, marginTop: 10 }}>
        Thanks — this feeds the weekly Content Lead review dashboard.</div>}
    </div>
  );
}
