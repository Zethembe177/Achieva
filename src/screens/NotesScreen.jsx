import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { NOTES } from "../data/mockData";
import { readStorage, writeStorage } from "../utils/storage";
import ScreenHeader from "../components/ScreenHeader";
import Card from "../components/Card";
import Button from "../components/Button";
export default function NotesScreen() {
  const { params, navigate } = useNav();
  const note = NOTES.find((n) => n.id === params.noteId) || NOTES[0];
  const [bookmarked, setBookmarked] = useState(() => readStorage("achieva-bookmarks", []).includes(note.id));
  const toggle = () => { const current = readStorage("achieva-bookmarks", []); const next = bookmarked ? current.filter((id) => id !== note.id) : [...current, note.id]; writeStorage("achieva-bookmarks", next); setBookmarked(!bookmarked); };
  return <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}><ScreenHeader title={note.title} subtitle={`${note.pages} pages · ${note.fileType}`} />
    <Card gold><div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 800 }}>REVISION SUMMARY</div><p style={{ color: COLORS.soft, lineHeight: 1.6 }}>{note.description}</p></Card>
    <Card><div style={{ color: COLORS.white, fontWeight: 700, marginBottom: 8 }}>Key ideas</div><div style={{ color: COLORS.midgrey, fontSize: 13, lineHeight: 1.7 }}>• Identify the correct formula.<br/>• Substitute values carefully.<br/>• Show every calculation step.<br/>• Check units and round only at the end.</div></Card>
    <Button onClick={toggle} variant="outline">{bookmarked ? "Remove bookmark" : "Bookmark notes"}</Button>
    <Button onClick={() => navigate("videoPlayer", { lessonId: note.lessonId })}>Open related lesson</Button>
  </div>;
}
