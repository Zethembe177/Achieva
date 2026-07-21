// screens/PracticeScreen.jsx
// SRS 3.1 Practice Tab: Past Paper library, Mock Exam Mode, Topic Quizzes.
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useSubject } from "../state/SubjectContext";
import { useProgress } from "../state/ProgressContext";
import { PAST_PAPERS, QUIZZES, WALKTHROUGHS } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import AppHeader from "../components/AppHeader";

export default function PracticeScreen() {
  const { navigate } = useNav();
  const { selectedSubject } = useSubject();
  const { progress, isWalkthroughUnlocked } = useProgress();
  const [memoOpen, setMemoOpen] = useState(null);

  const quizzes = QUIZZES.filter((q) => q.subjectId === selectedSubject.id);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <AppHeader />
      <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 800 }}>Practice</div>
      <div style={{ color: COLORS.midgrey, fontSize: 12, marginBottom: 12 }}>{selectedSubject.name}</div>

      <Card gold>
        <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 800 }}>MOCK EXAM MODE</div>
        <div style={{ color: COLORS.white, fontWeight: 700, margin: "6px 0" }}>Sit a full paper under timed conditions</div>
        <Button onClick={() => navigate("mockExam")}>Start mock exam</Button>
      </Card>

      <div className="section-heading">
        <span>Topic quizzes</span>
      </div>
      {quizzes.map((q) => {
        const attempt = progress.quizAttempts.find((a) => a.quizId === q.id);
        return (
          <Card key={q.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: COLORS.white, fontWeight: 700 }}>{q.title}</div>
                <div style={{ color: COLORS.midgrey, fontSize: 11 }}>{q.questions.length} questions · {q.estimatedMinutes} min · {q.difficulty}</div>
              </div>
              {attempt && <Badge color={COLORS.green}>{attempt.pct}%</Badge>}
            </div>
            <Button variant="outline" onClick={() => navigate("quiz", { quizId: q.id })}>
              {attempt ? "Retry quiz" : "Start quiz"}
            </Button>
          </Card>
        );
      })}

      <div className="section-heading">
        <span>Past papers</span>
      </div>
      {PAST_PAPERS.map((p) => {
        const result = progress.examResults.find((r) => r.paperId === p.id);
        const unlocked = isWalkthroughUnlocked(p.id);
        const walk = WALKTHROUGHS.find((w) => w.paperId === p.id);
        const memoVisible = memoOpen === p.id;
        let badgeText;

        if (result) {
          badgeText = `${result.pct}%`;
        } else if (p.downloaded) {
          badgeText = "Offline";
        } else {
          badgeText = "Online";
        }

        return (
          <Card key={p.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: COLORS.white, fontWeight: 700 }}>{p.title}</div>
                <div style={{ color: COLORS.midgrey, fontSize: 11 }}>{p.marks} marks · {p.hours} hours</div>
                {p.memo && <div style={{ color: COLORS.soft, fontSize: 11, marginTop: 4 }}>{p.memo}</div>}
              </div>
              <Badge color={result ? COLORS.green : COLORS.gold}>{badgeText}</Badge>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              <Button variant="outline" onClick={() => navigate("mockExam", { paperId: p.id })}>
                {result ? "Attempt again" : "Start paper"}
              </Button>
              <Button
                disabled={!unlocked}
                onClick={() => unlocked && walk && navigate("walkthrough", { paperId: p.id, walkthroughId: walk.id })}
              >
                {unlocked ? "Watch walkthrough" : "Submit paper to unlock"}
              </Button>
              {p.memo && (
                <Button variant="outline" onClick={() => setMemoOpen(memoVisible ? null : p.id)}>
                  {memoVisible ? "Hide memo" : "View memo"}
                </Button>
              )}
            </div>
            {memoVisible && p.memoDetails && (
              <div style={{ color: COLORS.soft, fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
                {p.memoDetails}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
