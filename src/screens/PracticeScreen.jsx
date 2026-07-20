// screens/PracticeScreen.jsx
// SRS 3.1 Practice Tab: Past Paper library, Mock Exam Mode, Topic Quizzes.
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { PAST_PAPERS } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
export default function PracticeScreen() {
  const { navigate } = useNav();
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 800, margin: "10px 0 14px" }}>Practice</div>
      {/* Mock exam entry */}
      <Card gold>
        <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 700 }}>MOCK EXAM MODE</div>
        <div style={{ color: COLORS.white, fontSize: 16, fontWeight: 700, margin: "6px 0 2px" }}>Sit a full paper under timed conditions</div>
        <div style={{ color: COLORS.midgrey, fontSize: 12 }}>Self-marked · results feed your tracker</div>
        <Button onClick={() => navigate("mockExam")}>Start mock exam</Button>
      </Card>
      {/* Daily challenge / quiz */}
      <Card onClick={() => navigate("quiz")}>
        <div style={{ color: COLORS.white, fontSize: 15, fontWeight: 600 }}>Topic Quiz / Daily Challenge</div>
        <div style={{ color: COLORS.midgrey, fontSize: 12, marginTop: 2 }}>Instant marking with worked explanations</div>
      </Card>
      {/* Past paper library */}
      <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "10px 4px 8px" }}>Past paper library</div>
      {PAST_PAPERS.map((p) => (
        <Card key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: COLORS.white, fontWeight: 600 }}>{p.title}</div>
            <div style={{ color: COLORS.midgrey, fontSize: 12 }}>{p.marks} marks · {p.hours} hours</div>
          </div>
          <Badge color={p.downloaded ? COLORS.green : COLORS.gold}>{p.downloaded ? "Offline" : "Download"}</Badge>
        </Card>
      ))}
    </div>
  );
}
