import { useEffect, useMemo, useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { PAST_PAPERS, WALKTHROUGHS } from "../data/mockData";
import ScreenHeader from "../components/ScreenHeader";
import Card from "../components/Card";
import Button from "../components/Button";
import { PlayIcon, BackIcon, DownloadIcon, CheckIcon } from "../components/icons";

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60);
  const remainder = String(safe % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export default function WalkthroughScreen() {
  const { params, navigate, goBack } = useNav();
  const { isWalkthroughUnlocked, addActivity, addDownload } = useProgress();
  const walkthrough = useMemo(
    () => WALKTHROUGHS.find((item) => item.id === params.walkthroughId || item.paperId === params.paperId),
    [params.paperId, params.walkthroughId]
  );
  const paper = PAST_PAPERS.find((item) => item.id === walkthrough?.paperId);
  const unlocked = walkthrough ? isWalkthroughUnlocked(walkthrough.paperId) : false;
  const durationSeconds = (walkthrough?.mins || 0) * 60;
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [guidePopup, setGuidePopup] = useState(true);
  const [feedbackStatus, setFeedbackStatus] = useState(null);

  useEffect(() => {
    if (!playing || !unlocked || completed) return undefined;
    const id = window.setInterval(() => {
      setPosition((previous) => {
        const next = Math.min(durationSeconds, previous + speed);
        if (next >= durationSeconds) {
          setPlaying(false);
          setCompleted(true);
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, unlocked, completed, durationSeconds, speed]);

  if (!walkthrough || !paper) {
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        <ScreenHeader title="Walkthrough" subtitle="Video not found" />
        <Card>
          <div style={{ color: COLORS.white, fontWeight: 700 }}>This walkthrough is unavailable.</div>
          <div style={{ color: COLORS.midgrey, fontSize: 12, marginTop: 6 }}>
            Return to Practice and choose a past paper again.
          </div>
          <Button onClick={() => navigate("practice")}>Return to Practice</Button>
        </Card>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        <ScreenHeader title="Walkthrough locked" subtitle={paper.title} />
        <Card gold style={{ textAlign: "center", padding: 24 }}>
          <div style={{ color: COLORS.gold, fontSize: 34, marginBottom: 8 }}>🔒</div>
          <div style={{ color: COLORS.white, fontWeight: 800, fontSize: 18 }}>Complete this paper first</div>
          <div style={{ color: COLORS.midgrey, fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>
            Submit and self-mark {paper.title}. Only this paper's walkthrough will then unlock.
          </div>
          <Button onClick={() => navigate("mockExam", { paperId: paper.id })}>Attempt paper</Button>
          <Button variant="outline" onClick={() => navigate("practice")}>Back to Practice</Button>
        </Card>
      </div>
    );
  }

  const percentage = durationSeconds ? Math.round((position / durationSeconds) * 100) : 0;

  function downloadWalkthrough() {
    const id = `download-${walkthrough.id}`;
    addDownload({
      id,
      title: walkthrough.title,
      size: 610,
      quality: "480p",
      type: "walkthrough",
      progress: 0,
      status: "paused",
    });
    addActivity({
      uniqueKey: `walkthrough-download-${walkthrough.id}`,
      type: "download",
      title: "Walkthrough added to downloads",
      subtitle: walkthrough.title,
      value: "Queued",
      target: "downloads",
    });
    navigate("downloads");
  }

  function markWatched() {
    setCompleted(true);
    setPosition(durationSeconds);
    setPlaying(false);
    addActivity({
      uniqueKey: `walkthrough-complete-${walkthrough.id}`,
      type: "walkthrough",
      title: "Walkthrough completed",
      subtitle: walkthrough.title,
      value: "Watched",
      target: "practice",
    });
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px", position: "relative" }}>
      <ScreenHeader title="Paper walkthrough" subtitle={paper.title} />

      {guidePopup && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.65)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          padding: 16,
        }}>
          <div style={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 22,
            background: COLORS.navy,
            border: `1px solid ${COLORS.line}`,
            padding: 24,
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
          }}>
            <div style={{ color: COLORS.gold, fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.6 }}>
              Walkthrough ready
            </div>
            <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 900, margin: "12px 0 10px" }}>
              Review the paper step-by-step
            </div>
            <div style={{ color: COLORS.midgrey, fontSize: 13, lineHeight: 1.6 }}>
              This walkthrough shows the exact exam questions you just marked. Choose your reaction below once you’ve watched the key explanations.
            </div>
            <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
              <Button onClick={() => setGuidePopup(false)}>Got it</Button>
              <Button variant="outline" onClick={() => { setGuidePopup(false); setPlaying(true); }}>
                Start walkthrough now
              </Button>
            </div>
          </div>
        </div>
      )}

      <div style={{
        minHeight: 220,
        borderRadius: 18,
        border: `1px solid ${COLORS.line}`,
        background: "linear-gradient(145deg, rgba(14,31,58,.96), rgba(6,18,36,.98))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: `1px solid ${COLORS.gold}`,
            background: "rgba(201,168,76,.18)",
            color: COLORS.gold,
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          {playing ? <span style={{ fontSize: 24, fontWeight: 900 }}>Ⅱ</span> : <PlayIcon size={30} color={COLORS.gold} />}
        </button>
        <div style={{ position: "absolute", left: 14, right: 14, bottom: 14 }}>
          <div style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,.14)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${percentage}%`, background: COLORS.gold }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: COLORS.soft, fontSize: 11, marginTop: 6 }}>
            <span>{formatTime(position)}</span>
            <span>{formatTime(durationSeconds)}</span>
          </div>
        </div>
      </div>

      <Card gold>
        <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 800 }}>UNLOCKED AFTER SUBMISSION</div>
        <div style={{ color: COLORS.white, fontSize: 17, fontWeight: 800, marginTop: 5 }}>{walkthrough.title}</div>
        <div style={{ color: COLORS.midgrey, fontSize: 12, marginTop: 6 }}>
          A step-by-step review of the exact paper you submitted. This remains a simulated player in the prototype.
        </div>
      </Card>

      <Card>
        <div style={{ color: COLORS.white, fontWeight: 700, marginBottom: 10 }}>Playback controls</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          <button type="button" onClick={() => setPosition((value) => Math.max(0, value - 10))} style={controlStyle}>
            <BackIcon size={16} /> 10s
          </button>
          <button type="button" onClick={() => setPlaying((value) => !value)} style={controlStyle}>
            {playing ? "Pause" : "Play"}
          </button>
          <select
            aria-label="Playback speed"
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            style={controlStyle}
          >
            <option value={0.75}>0.75×</option>
            <option value={1}>1×</option>
            <option value={1.25}>1.25×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </div>
      </Card>

      <Card style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${COLORS.line}`, marginTop: 10 }}>
        <div style={{ color: COLORS.white, fontWeight: 700, marginBottom: 10 }}>How is this walkthrough?</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button variant={feedbackStatus === "understand" ? "solid" : "outline"} onClick={() => setFeedbackStatus("understand")}>
            I understand
          </Button>
          <Button variant={feedbackStatus === "dontUnderstand" ? "solid" : "outline"} onClick={() => setFeedbackStatus("dontUnderstand")}> 
            I don't understand
          </Button>
          <Button variant={feedbackStatus === "needHelp" ? "solid" : "outline"} onClick={() => setFeedbackStatus("needHelp")}> 
            I need help
          </Button>
        </div>
        {feedbackStatus && (
          <div style={{ color: COLORS.midgrey, fontSize: 12, marginTop: 10 }}>
            {feedbackStatus === "understand" && "Great! Keep going with the next paper."}
            {feedbackStatus === "dontUnderstand" && "Try rewinding a bit and replaying the explanation for the difficult step."}
            {feedbackStatus === "needHelp" && "You can revisit your notes or ask a tutor in the community for the same concept."}
          </div>
        )}
      </Card>

      <Button variant="outline" onClick={downloadWalkthrough}>
        <DownloadIcon size={17} /> Download for offline
      </Button>
      <Button onClick={markWatched} disabled={completed}>
        <CheckIcon size={17} /> {completed ? "Walkthrough completed ✓" : "Mark walkthrough as watched"}
      </Button>
      <Button variant="outline" onClick={goBack}>Back</Button>
    </div>
  );
}

const controlStyle = {
  minHeight: 42,
  borderRadius: 10,
  border: "1px solid rgba(201,168,76,.22)",
  background: "rgba(255,255,255,.03)",
  color: "#E8EDF2",
  padding: "8px",
  cursor: "pointer",
};
