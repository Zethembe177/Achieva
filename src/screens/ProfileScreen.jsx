// screens/ProfileScreen.jsx
// SRS REQ-AUTH-6: profile shows achievements, total points, active badges.
// Also the jumping-off point to Downloads and Wellness.
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { LEARNER } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import ScreenHeader from "../components/ScreenHeader";
const BADGES = ["7-day streak", "First mock exam", "Calculus starter", "100 points"];
export default function ProfileScreen() {
  const { navigate, switchTab } = useNav();
  const { progress } = useProgress(); // live points
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader title="Profile" />
      <Card style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: COLORS.gold, color: COLORS.navy,
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20 }}>{LEARNER.initials}</div>
        <div>
          <div style={{ color: COLORS.white, fontSize: 18, fontWeight: 800 }}>{LEARNER.name}</div>
          <div style={{ color: COLORS.midgrey, fontSize: 12 }}>{LEARNER.school} · {LEARNER.province}</div>
          <div style={{ marginTop: 6 }}><Badge color={COLORS.gold}>{LEARNER.tier} tier</Badge></div>
        </div>
      </Card>
      <Card style={{ display: "flex", textAlign: "center" }}>
        {[{ v: progress.points.toLocaleString(), l: "Points" }, { v: LEARNER.streak, l: "Day streak" }, { v: BADGES.length, l: "Badges" }].map((s, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ color: COLORS.gold, fontSize: 20, fontWeight: 800 }}>{s.v}</div>
            <div style={{ color: COLORS.midgrey, fontSize: 11 }}>{s.l}</div>
          </div>
        ))}
      </Card>
      <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "8px 4px" }}>Badges earned</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {BADGES.map((b) => <Badge key={b}>{b}</Badge>)}
      </div>
      <Button variant="outline" onClick={() => navigate("downloads")}>Manage downloads</Button>
      <Button variant="outline" onClick={() => navigate("wellness")}>Wellness Corner</Button>
      <Button onClick={() => switchTab("welcome")}>Log out</Button>
    </div>
  );
}
