// screens/QuizScreen.jsx
// Serves the Daily Challenge / a topic quiz.
// REQ-QUIZ-2: on submission show the score immediately, then a review showing
// the learner's answer, the correct answer, and an explanation.
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { DAILY_CHALLENGE } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";

export default function QuizScreen() {
  const { navigate } = useNav();
  const { recordQuiz } = useProgress();
  const q = DAILY_CHALLENGE;
  const [picked, setPicked] = useState(null);   // chosen option index
  const [submitted, setSubmitted] = useState(false);
  const correctIndex = q.options.findIndex((o) => o.correct);
  const isRight = picked === correctIndex;

  // submit: lock the answer AND push the result to the shared store
  // (100% if right, 0% if wrong — updates the topic average + points on the tracker)
  function submit() {
    setSubmitted(true);
    recordQuiz(q.topic, isRight ? 100 : 0, isRight ? q.points : 0);
  }

  // colour each option once submitted: green = correct, red = wrong pick
  function optStyle(i) {
    let border = COLORS.line, bg = "transparent";
    if (submitted) {
      if (i === correctIndex) { border = COLORS.green; bg = "rgba(46,204,113,0.12)"; }
      else if (i === picked) { border = COLORS.red; bg = "rgba(231,76,60,0.12)"; }
    } else if (i === picked) { border = COLORS.gold; bg = "rgba(201,168,76,0.12)"; }
    return { border: `1px solid ${border}`, background: bg };
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader title="Daily Challenge" subtitle={`${q.topic} · ${q.points} pts`} />
      <Card>
        <div style={{ color: COLORS.white, fontSize: 17, fontWeight: 700 }}>{q.question}</div>
      </Card>
      {q.options.map((o, i) => (
        <div key={o.label} onClick={() => !submitted && setPicked(i)}
          style={{ ...optStyle(i), borderRadius: 12, padding: "12px 14px", marginBottom: 10,
            cursor: submitted ? "default" : "pointer", display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ color: COLORS.gold, fontWeight: 800 }}>{o.label}</span>
          <span style={{ color: COLORS.soft, fontSize: 14 }}>{o.text}</span>
        </div>
      ))}

      {!submitted ? (
        <Button disabled={picked === null} onClick={submit}>Submit answer</Button>
      ) : (
        <>
          {/* immediate result */}
          <Card style={{ marginTop: 4, borderColor: isRight ? COLORS.green : COLORS.red }}>
            <div style={{ color: isRight ? COLORS.green : COLORS.red, fontWeight: 800, fontSize: 16 }}>
              {isRight ? "Correct! +2 pts" : "Not quite"}
            </div>
            <div style={{ color: COLORS.soft, fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{q.explanation}</div>
          </Card>
          <Button onClick={() => navigate("home")}>Back to home</Button>
        </>
      )}
    </div>
  );
}
