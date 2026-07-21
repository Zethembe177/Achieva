// screens/MockExamScreen.jsx
// SRS 4.5 Mock Exam Mode. Three phases: setup -> writing -> self-marking.
//
// IMPORTANT ENGINEERING NOTE (matches the team's agreed approach):
// The countdown is TIMESTAMP-BASED, not a setInterval that counts down a number.
// We store the exam end time (Date.now() + duration) and, on every tick, compute
// remaining = endTime - Date.now(). This means if the app is backgrounded, the
// phone sleeps, or a tick is missed, the timer is still correct when it resumes —
// which a naive "seconds--" interval would get wrong. This is the behaviour the
// real React Native app must replicate.
import { useMemo, useState, useEffect, useRef } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { PAST_PAPERS, WALKTHROUGHS, nscLevel } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";

function fmt(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

export default function MockExamScreen() {
  const { params, navigate } = useNav();
  const { recordMockExam } = useProgress();
  const [phase, setPhase] = useState("setup");   // setup | writing | marking
  const [saved, setSaved] = useState(false);      // ensures we record the result once
  const [paper, setPaper] = useState(
    PAST_PAPERS.find((p) => p.id === params.paperId) || PAST_PAPERS[0]
  );
  const [minutes, setMinutes] = useState(180);    // default full paper = 3 hours
  const [remaining, setRemaining] = useState(0);
  const endRef = useRef(null);                     // absolute end timestamp
  const walkthrough = useMemo(() => WALKTHROUGHS.find((item) => item.paperId === paper.id), [paper.id]);

  // Timestamp-based ticking. We recompute from the wall clock every 250ms.
  useEffect(() => {
    if (phase !== "writing") return;
    const tick = () => {
      const left = endRef.current - Date.now();
      setRemaining(left);
      if (left <= 0) setPhase("marking"); // auto-advance to self-marking on timeout
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [phase]);

  function startExam() {
    endRef.current = Date.now() + minutes * 60 * 1000; // store the END time
    setPhase("writing");
  }

  // ---- self-marking state (REQ-EXAM-2/3) ----
  const totalMarks = paper.marks;
  const [mark, setMark] = useState("");
  const pct = mark === "" ? 0 : Math.round((Number(mark) / totalMarks) * 100);

  // ---------- SETUP ----------
  if (phase === "setup") {
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        <ScreenHeader title="Mock Exam Mode" subtitle="Real exam conditions, self-marked" />
        <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "4px 4px 8px" }}>Choose a paper</div>
        {PAST_PAPERS.map((p) => (
          <Card key={p.id} onClick={() => setPaper(p)}
            style={{ borderColor: paper.id === p.id ? COLORS.gold : COLORS.line,
              display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: COLORS.white, fontWeight: 600 }}>{p.title}</div>
              <div style={{ color: COLORS.midgrey, fontSize: 12 }}>{p.marks} marks · {p.hours} hours</div>
            </div>
            <span style={{ color: p.downloaded ? COLORS.green : COLORS.midgrey, fontSize: 11 }}>
              {p.downloaded ? "Downloaded" : "Not downloaded"}
            </span>
          </Card>
        ))}
        <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "10px 4px 8px" }}>Time limit</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[180, 90, 45].map((m) => (
            <button key={m} onClick={() => setMinutes(m)}
              style={{ flex: 1, padding: "10px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer",
                border: `1px solid ${minutes === m ? COLORS.gold : COLORS.line}`,
                background: minutes === m ? "rgba(201,168,76,0.15)" : "transparent",
                color: minutes === m ? COLORS.gold : COLORS.soft }}>
              {m >= 180 ? "Full (3h)" : `${m} min`}
            </button>
          ))}
        </div>
        <Button onClick={startExam}>Start mock exam</Button>
      </div>
    );
  }

  // ---------- WRITING ----------
  if (phase === "writing") {
    const low = remaining < 5 * 60 * 1000; // under 5 min -> turn timer red
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 16px 16px" }}>
        <ScreenHeader title={paper.title} subtitle="Writing — you may pause or leave freely" />
        <Card gold style={{ textAlign: "center" }}>
          <div style={{ color: COLORS.midgrey, fontSize: 12 }}>Time remaining</div>
          <div style={{ color: low ? COLORS.red : COLORS.gold, fontSize: 40, fontWeight: 900,
            fontVariantNumeric: "tabular-nums" }}>{fmt(remaining)}</div>
        </Card>
        {/* stand-in for the question paper PDF */}
        <div style={{ flex: 1, borderRadius: 16, background: COLORS.navy2, border: `1px solid ${COLORS.line}`,
          display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.midgrey, fontSize: 13, margin: "4px 0 12px" }}>
          Question paper PDF
        </div>
        <Button onClick={() => setPhase("marking")}>I'm done — mark my paper</Button>
      </div>
    );
  }

  // ---------- SELF-MARKING ----------
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader title="Self-marking" subtitle="Enter your total from the memo" showBack={false} />
      <div style={{ borderRadius: 16, background: COLORS.navy2, border: `1px solid ${COLORS.line}`,
        padding: 14, marginBottom: 12, color: COLORS.midgrey, fontSize: 13 }}>
        Memo shown here alongside your paper. Trust-based — the app never auto-marks handwriting.
      </div>
      <Card>
        <div style={{ color: COLORS.soft, fontSize: 13, marginBottom: 8 }}>Your total (out of {totalMarks})</div>
        <input value={mark} inputMode="numeric"
          onChange={(e) => setMark(e.target.value.replace(/\D/g, "").slice(0, 3))}
          placeholder="e.g. 104"
          style={{ width: "100%", background: COLORS.navy, border: `1px solid ${COLORS.line}`, borderRadius: 12,
            padding: "12px 14px", color: COLORS.white, fontSize: 18, textAlign: "center", boxSizing: "border-box" }} />
      </Card>
      {paper.memo && (
        <Card style={{ marginTop: 12 }}>
          <div style={{ color: COLORS.white, fontWeight: 700 }}>Memo</div>
          <div style={{ color: COLORS.midgrey, fontSize: 12, marginTop: 6 }}>{paper.memoDetails || paper.memo}</div>
        </Card>
      )}
      {mark !== "" && (
        <Card gold style={{ textAlign: "center" }}>
          <div style={{ color: COLORS.gold, fontSize: 34, fontWeight: 900 }}>{pct}%</div>
          <div style={{ color: COLORS.soft, fontSize: 13 }}>NSC Level {nscLevel(pct)}
            {nscLevel(pct) >= 4 ? " · Bachelor Pass ✓" : " · below Bachelor Pass"}</div>
          {/* Save once to the shared store -> shows on the Performance Tracker + points */}
          {!saved ? (
            <Button onClick={() => { recordMockExam(paper.id, paper.title, pct); setSaved(true); }}>
              Save to my tracker
            </Button>
          ) : (
            <>
              <div style={{ color: COLORS.green, fontSize: 12, marginTop: 8, fontWeight: 600 }}>
                ✓ Saved to your Performance Tracker (+50 pts)
              </div>
              {walkthrough && (
                <Button
                  variant="outline"
                  onClick={() => navigate("walkthrough", { paperId: paper.id, walkthroughId: walkthrough.id })}
                  style={{ marginTop: 10 }}
                >
                  Watch tutor walkthrough
                </Button>
              )}
            </>
          )}
        </Card>
      )}
    </div>
  );
}
