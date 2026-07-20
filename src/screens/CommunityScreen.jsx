// screens/CommunityScreen.jsx
// SRS 4.7 Study Together forum. REQ-COMM-1: every thread is anchored to a topic.
// REQ-COMM-2: verified-answer pin + a report/flag button on every post.
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { THREADS } from "../data/mockData";
import Card from "../components/Card";
import Badge from "../components/Badge";
export default function CommunityScreen() {
  const { navigate } = useNav();
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 800, margin: "10px 0 4px" }}>Study Together</div>
      <div style={{ color: COLORS.midgrey, fontSize: 13, marginBottom: 12 }}>Every question anchored to a topic</div>
      {/* weekly challenge banner */}
      <Card gold>
        <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 700 }}>🏆 WEEKLY CHALLENGE</div>
        <div style={{ color: COLORS.white, fontSize: 15, fontWeight: 700, margin: "4px 0" }}>Integration by substitution</div>
        <div style={{ color: COLORS.midgrey, fontSize: 12 }}>First 10 correct earn 500 bonus points · 3 days left</div>
      </Card>
      {THREADS.map((t) => (
        <Card key={t.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: COLORS.white, fontWeight: 600, fontSize: 14 }}>{t.author}</span>
            <Badge>{t.topic}</Badge>
          </div>
          <div style={{ color: COLORS.soft, fontSize: 13, margin: "8px 0", lineHeight: 1.5 }}>{t.body}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: COLORS.midgrey, fontSize: 12 }}>💬 {t.replies} · 👍 {t.helpful} helpful</span>
            <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {t.tutor && <span style={{ color: COLORS.green, fontSize: 11, fontWeight: 700 }}>✓ Tutor replied</span>}
              {/* report/flag button required on every post */}
              <button style={{ background: "transparent", border: "none", color: COLORS.midgrey, fontSize: 11, cursor: "pointer" }}>Report</button>
            </span>
          </div>
        </Card>
      ))}
      <div onClick={() => navigate("leaderboard")}
        style={{ textAlign: "center", color: COLORS.gold, fontSize: 13, fontWeight: 700, padding: 12, cursor: "pointer" }}>
        View leaderboard →
      </div>
    </div>
  );
}
