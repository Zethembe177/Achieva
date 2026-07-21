// screens/VideoPlayerScreen.jsx
// SRS 3.1 Video Player + REQ-CONTENT-2/3/6:
//  - resume position (shown), formula highlight box, related notes link
//  - "Mark as Complete" (manual, not auto) -> REQ-CONTENT-3
//  - two-type feedback: "I got this" / "I need help" -> REQ-CONTENT-6
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { LESSONS, NOTES } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";
import ProgressBar from "../components/ProgressBar";
import { PlayIcon } from "../components/icons";

export default function VideoPlayerScreen() {
  const { params, navigate } = useNav();
  const { progress, completeLesson, addActivity } = useProgress();
  const index = Math.max(0, LESSONS.findIndex((l) => l.id === params.lessonId));
  const lesson = LESSONS[index];
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(lesson.progress || 0);
  const [speed, setSpeed] = useState("1x");
  const [feedback, setFeedback] = useState(null);
  const [help, setHelp] = useState("");
  const done = progress.completedLessons.includes(lesson.id) || lesson.progress === 100;
  const note = NOTES.find((n) => n.lessonId === lesson.id);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader
        title={lesson.title}
        subtitle={`${lesson.tutor} · ${lesson.mins} min`}
      />

      <button
        aria-label={playing ? "Pause lesson" : "Play lesson"}
        onClick={() => setPlaying(!playing)}
        style={{
          width: "100%",
          height: 190,
          borderRadius: 16,
          background: "linear-gradient(135deg,#12233d,#0a1628)",
          border: `1px solid ${COLORS.line}`,
          display: "grid",
          placeItems: "center",
          color: COLORS.midgrey,
        }}
      >
        <div>
          <div
            style={{
              width: 56,
              height: 56,
              margin: "auto",
              borderRadius: "50%",
              background: COLORS.gold,
              display: "grid",
              placeItems: "center",
            }}
          >
            <PlayIcon color={COLORS.navy} />
          </div>
          <div style={{ marginTop: 8 }}>
            {playing ? "Playing prototype" : `Resume at ${position}%`}
          </div>
        </div>
      </button>

      <ProgressBar pct={position} />

      <div style={{ display: "flex", gap: 8, margin: "8px 0" }}>
        <button
          onClick={() => setPosition(Math.max(0, position - 10))}
          style={mini}
        >
          ↶ 10 sec
        </button>
        <select
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          style={{ ...mini, flex: 1 }}
        >
          {["0.75x", "1x", "1.25x", "1.5x", "2x"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={() => setPosition(Math.min(100, position + 15))}
          style={mini}
        >
          Advance
        </button>
      </div>

      <Card>
        <div style={{ color: COLORS.white, fontWeight: 700 }}>
          About this lesson
        </div>
        <p style={{ color: COLORS.midgrey, fontSize: 13, lineHeight: 1.5 }}>
          {lesson.description}
        </p>
      </Card>

      <Card gold>
        <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 800 }}>
          KEY FORMULA
        </div>
        <div
          style={{
            color: COLORS.white,
            fontSize: 18,
            fontWeight: 800,
            textAlign: "center",
            padding: 8,
          }}
        >
          {lesson.formula}
        </div>
      </Card>

      {note && (
        <Button
          variant="outline"
          onClick={() => navigate("notes", { noteId: note.id })}
        >
          Open related notes
        </Button>
      )}

      <Button
        variant="outline"
        onClick={() => {
          addActivity({
            uniqueKey: `download-${lesson.id}`,
            type: "download",
            title: "Lesson downloaded",
            subtitle: lesson.title,
            value: "Ready",
            target: "downloads",
          });
          navigate("downloads");
        }}
      >
        Download lesson
      </Button>

      <Button onClick={() => completeLesson(lesson)} disabled={done}>
        {done ? "Completed ✓ — Watch again anytime" : "Mark as Complete"}
      </Button>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={() => setFeedback("got")}
          style={{
            ...mini,
            flex: 1,
            borderColor: feedback === "got" ? COLORS.green : COLORS.line,
          }}
        >
          I got this
        </button>
        <button
          onClick={() => setFeedback("help")}
          style={{
            ...mini,
            flex: 1,
            borderColor: feedback === "help" ? COLORS.red : COLORS.line,
          }}
        >
          I need help
        </button>
      </div>

      {feedback === "help" && (
        <Card style={{ marginTop: 10 }}>
          <textarea
            aria-label="Describe where you need help"
            value={help}
            onChange={(e) => setHelp(e.target.value)}
            placeholder={`Explain what is unclear at ${position}%`}
            style={{
              width: "100%",
              minHeight: 80,
              background: COLORS.navy,
              color: COLORS.white,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 10,
              padding: 10,
            }}
          />
          <Button
            disabled={!help.trim()}
            onClick={() => setFeedback("sent")}
          >
            Send help request
          </Button>
        </Card>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <Button
          variant="outline"
          disabled={index === 0}
          onClick={() =>
            navigate("videoPlayer", { lessonId: LESSONS[index - 1]?.id })
          }
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={index === LESSONS.length - 1}
          onClick={() =>
            navigate("videoPlayer", { lessonId: LESSONS[index + 1]?.id })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const mini = {
  padding: "9px 10px",
  borderRadius: 10,
  border: "1px solid rgba(201,168,76,.18)",
  background: "transparent",
  color: "#E8EDF2",
};
