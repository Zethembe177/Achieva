// screens/QuizScreen.jsx
// Serves the Daily Challenge / a topic quiz.
// REQ-QUIZ-2: on submission show the score immediately, then a review showing
// the learner's answer, the correct answer, and an explanation.
import { useMemo, useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { QUIZZES } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";
import ProgressBar from "../components/ProgressBar";

export default function QuizScreen() {
  const { params, navigate } = useNav();
  const { recordQuiz } = useProgress();
  const quiz = QUIZZES.find((q) => q.id === params.quizId) || QUIZZES[0];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const q = quiz.questions[index];
  const score = useMemo(
    () =>
      quiz.questions.reduce(
        (s, x, i) => s + (answers[i] === x.answer ? 1 : 0),
        0
      ),
    [answers, quiz.questions]
  );
  const pct = Math.round((score / quiz.questions.length) * 100);

  const submit = () => {
    setSubmitted(true);
    recordQuiz(quiz.id, quiz.topic, pct, score * 2);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader
        title={quiz.title}
        subtitle={`${quiz.topic} · ${quiz.questions.length} questions`}
      />
      <ProgressBar pct={((index + 1) / quiz.questions.length) * 100} />

      {!submitted ? (
        <>
          <Card>
            <div
              style={{
                color: COLORS.gold,
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              QUESTION {index + 1} OF {quiz.questions.length}
            </div>
            <div
              style={{
                color: COLORS.white,
                fontSize: 17,
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              {q.text}
            </div>
          </Card>

          {q.options.map((o, i) => (
            <button
              key={o}
              onClick={() => setAnswers({ ...answers, [index]: i })}
              style={{
                width: "100%",
                textAlign: "left",
                padding: 12,
                marginBottom: 9,
                borderRadius: 12,
                border: `1px solid ${
                  answers[index] === i ? COLORS.gold : COLORS.line
                }`,
                background:
                  answers[index] === i
                    ? "rgba(201,168,76,.12)"
                    : "transparent",
                color: COLORS.soft,
              }}
            >
              {String.fromCodePoint(65 + i)}. {o}
            </button>
          ))}

          <div style={{ display: "flex", gap: 8 }}>
            <Button
              variant="outline"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              Previous
            </Button>
            {index < quiz.questions.length - 1 ? (
              <Button
                disabled={answers[index] === undefined}
                onClick={() => setIndex(index + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                disabled={
                  Object.keys(answers).length !== quiz.questions.length
                }
                onClick={submit}
              >
                Submit quiz
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <Card gold style={{ textAlign: "center" }}>
            <div
              style={{
                color: COLORS.gold,
                fontSize: 36,
                fontWeight: 900,
              }}
            >
              {pct}%
            </div>
            <div style={{ color: COLORS.soft }}>
              {score} of {quiz.questions.length} correct
            </div>
          </Card>

          {quiz.questions.map((x, i) => (
            <Card
              key={x.id}
              style={{
                borderColor:
                  answers[i] === x.answer ? COLORS.green : COLORS.red,
              }}
            >
              <div style={{ color: COLORS.white, fontWeight: 700 }}>
                {i + 1}. {x.text}
              </div>
              <div
                style={{
                  color: COLORS.midgrey,
                  fontSize: 12,
                  marginTop: 6,
                }}
              >
                Your answer: {x.options[answers[i]]}
              </div>
              <div style={{ color: COLORS.green, fontSize: 12 }}>
                Correct: {x.options[x.answer]}
              </div>
              <p style={{ color: COLORS.soft, fontSize: 12 }}>
                {x.explanation}
              </p>
            </Card>
          ))}

          <Button onClick={() => navigate("practice")}>
            Return to Practice
          </Button>
        </>
      )}
    </div>
  );
}