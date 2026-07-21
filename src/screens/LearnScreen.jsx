// screens/LearnScreen.jsx
// SRS 3.1 Learn Tab + REQ-CONTENT-1: content organised Chapter -> Topic -> Lesson.
// Tapping a lesson opens the Video Player (REQ-CONTENT-2/3).
import { useMemo, useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useSubject } from "../state/SubjectContext";
import { useProgress } from "../state/ProgressContext";
import { LESSONS, NOTES } from "../data/mockData";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Badge from "../components/Badge";
import AppHeader from "../components/AppHeader";
import { PlayIcon, CheckIcon, FileIcon } from "../components/icons";

const FILTERS = ["All", "Video Lessons", "Notes & Summaries", "Foundation"];
export default function LearnScreen() {
  const { navigate } = useNav();
  const { selectedSubject } = useSubject();
  const { progress } = useProgress();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const lessons = useMemo(() => LESSONS.filter((l) => l.subjectId === selectedSubject.id && l.title.toLowerCase().includes(query.toLowerCase()) && (filter !== "Foundation" || l.difficulty === "Foundation")), [selectedSubject.id, query, filter]);
  const notes = NOTES.filter((n) => n.subjectId === selectedSubject.id && n.title.toLowerCase().includes(query.toLowerCase()));
  const showVideos = filter === "All" || filter === "Video Lessons" || filter === "Foundation";
  const showNotes = filter === "All" || filter === "Notes & Summaries";
  return <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
    <AppHeader />
    <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 800 }}>Learn</div>
    <div style={{ color: COLORS.midgrey, fontSize: 12, marginBottom: 10 }}>NSC / CAPS aligned · {selectedSubject.name}</div>
    <input aria-label="Search learning content" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search lessons and notes"
      style={{ width: "100%", padding: 11, borderRadius: 12, border: `1px solid ${COLORS.line}`, background: COLORS.navy2, color: COLORS.white, marginBottom: 9 }} />
    <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12 }}>
      {FILTERS.map((f) => <button key={f} onClick={() => setFilter(f)} style={{ whiteSpace: "nowrap", borderRadius: 18, padding: "7px 10px", border: `1px solid ${filter === f ? COLORS.gold : COLORS.line}`, background: filter === f ? "rgba(201,168,76,.14)" : "transparent", color: filter === f ? COLORS.gold : COLORS.midgrey }}>{f}</button>)}
    </div>
    {showVideos && lessons.map((l) => { const done = l.progress === 100 || progress.completedLessons.includes(l.id); return <Card key={l.id} onClick={() => navigate("videoPlayer", { lessonId: l.id })} style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(201,168,76,.14)", display: "grid", placeItems: "center", flexShrink: 0 }}>{done ? <CheckIcon color={COLORS.green}/> : <PlayIcon color={COLORS.gold}/>}</div>
      <div style={{ flex: 1 }}><div style={{ color: COLORS.white, fontWeight: 700 }}>{l.title}</div><div style={{ color: COLORS.midgrey, fontSize: 11 }}>{l.tutor} · {l.mins} min · {l.difficulty}</div><ProgressBar pct={done ? 100 : l.progress}/></div>
      <Badge color={done ? COLORS.green : COLORS.gold}>{done ? "Watch again" : `${l.progress}%`}</Badge>
    </Card>; })}
    {showNotes && notes.map((n) => <Card key={n.id} onClick={() => navigate("notes", { noteId: n.id })} style={{ display: "flex", gap: 12, alignItems: "center" }}><FileIcon color={COLORS.gold}/><div style={{ flex: 1 }}><div style={{ color: COLORS.white, fontWeight: 700 }}>{n.title}</div><div style={{ color: COLORS.midgrey, fontSize: 11 }}>{n.pages} pages · {n.fileType}</div></div><Badge>Read</Badge></Card>)}
    {!lessons.length && !notes.length && <div style={{ color: COLORS.midgrey, textAlign: "center", padding: 24 }}>No matching content.</div>}
  </div>;
}
