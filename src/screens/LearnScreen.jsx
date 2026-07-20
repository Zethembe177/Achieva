// screens/LearnScreen.jsx
// SRS 3.1 Learn Tab + REQ-CONTENT-1: content organised Chapter -> Topic -> Lesson.
// Tapping a lesson opens the Video Player (REQ-CONTENT-2/3).
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { CHAPTERS } from "../data/mockData";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Badge from "../components/Badge";
import { PlayIcon, CheckIcon } from "../components/icons";
export default function LearnScreen() {
  const { navigate } = useNav();
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 800, margin: "10px 0 4px" }}>Video Lessons</div>
      <div style={{ color: COLORS.midgrey, fontSize: 13, marginBottom: 14 }}>NSC / CAPS aligned · Mathematics Core</div>
      {CHAPTERS.map((ch) => (
        <div key={ch.id} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "6px 4px" }}>
            <span style={{ color: COLORS.soft, fontSize: 14, fontWeight: 700 }}>{ch.title}</span>
            <span style={{ color: COLORS.midgrey, fontSize: 11 }}>{ch.progress}% done</span>
          </div>
          <ProgressBar pct={ch.progress} />
          <div style={{ marginTop: 8 }}>
            {ch.lessons.map((ls) => (
              <Card key={ls.id} onClick={() => navigate("videoPlayer", { lessonId: ls.id })}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(201,168,76,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {ls.done ? <CheckIcon size={18} color={COLORS.green} /> : <PlayIcon size={16} color={COLORS.gold} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>{ls.title}</div>
                  <div style={{ color: COLORS.midgrey, fontSize: 12 }}>{ls.tutor} · {ls.mins} min</div>
                </div>
                {ls.done && <Badge color={COLORS.green}>Done</Badge>}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
