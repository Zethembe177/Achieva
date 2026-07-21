// screens/ProfileScreen.jsx
// SRS REQ-AUTH-6: profile shows achievements, total points, active badges.
// Also the jumping-off point to Downloads and Wellness.
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { useSubject } from "../state/SubjectContext";
import { LEARNER } from "../data/mockData";
import { readStorage, removeStorage, writeStorage } from "../utils/storage";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import ScreenHeader from "../components/ScreenHeader";
const BADGES = ["7-day streak", "First mock exam", "Calculus starter", "100 points"];
const PROFILE_KEY = "achieva:profile";
const PREF_KEY = "achieva:preferences";

export default function ProfileScreen() {
  const { navigate, switchTab } = useNav();
  const { progress, resetProgress } = useProgress();
  const { selectedSubject } = useSubject();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(() => readStorage(PROFILE_KEY, { name: LEARNER.name, school: LEARNER.school, province: LEARNER.province }));
  const [prefs, setPrefs] = useState(() => readStorage(PREF_KEY, { reminders: true, contentUpdates: true, communityReplies: true }));
  const saveProfile = () => { writeStorage(PROFILE_KEY, profile); setEditing(false); };
  const togglePref = (key) => { const next = { ...prefs, [key]: !prefs[key] }; setPrefs(next); writeStorage(PREF_KEY, next); };
  const logout = () => { removeStorage("achieva:session"); switchTab("welcome"); };
  const fullReset = () => { if (window.confirm("Reset all demo learning progress? This cannot be undone.")) { resetProgress(); logout(); } };

  return <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
    <ScreenHeader title="Profile" />
    <Card style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 56, height: 56, borderRadius: "50%", background: COLORS.gold, color: COLORS.navy, display: "grid", placeItems: "center", fontWeight: 900, fontSize: 20 }}>{LEARNER.initials}</div><div style={{ flex: 1 }}><div style={{ color: COLORS.white, fontSize: 18, fontWeight: 800 }}>{profile.name}</div><div style={{ color: COLORS.midgrey, fontSize: 11 }}>{profile.school} · {profile.province}</div><div style={{ marginTop: 6 }}><Badge color={COLORS.gold}>{LEARNER.tier}</Badge></div></div><button onClick={() => setEditing((v) => !v)} style={linkButton}>{editing ? "Cancel" : "Edit"}</button></Card>
    {editing && <Card><label style={label}>Name<input style={field} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}/></label><label style={label}>School<input style={field} value={profile.school} onChange={(e) => setProfile({ ...profile, school: e.target.value })}/></label><label style={label}>Province<input style={field} value={profile.province} onChange={(e) => setProfile({ ...profile, province: e.target.value })}/></label><Button onClick={saveProfile}>Save profile</Button></Card>}
    <Card style={{ display: "flex", textAlign: "center" }}>{[{ v: progress.points.toLocaleString(), l: "Points" }, { v: progress.streak, l: "Day streak" }, { v: BADGES.length, l: "Badges" }].map((s) => <div key={s.l} style={{ flex: 1 }}><div style={{ color: COLORS.gold, fontSize: 20, fontWeight: 900 }}>{s.v}</div><div style={{ color: COLORS.midgrey, fontSize: 10 }}>{s.l}</div></div>)}</Card>
    <Card><div style={{ color: COLORS.white, fontSize: 13, fontWeight: 800 }}>Learning profile</div><div style={row}><span>Grade</span><strong>12</strong></div><div style={row}><span>Subject</span><strong>{selectedSubject.name}</strong></div><div style={row}><span>Plan</span><strong>{LEARNER.tier}</strong></div><div style={row}><span>Trial status</span><strong style={{ color: COLORS.green }}>Active · 9 days</strong></div></Card>
    <div style={{ color: COLORS.soft, fontSize: 12, fontWeight: 800, margin: "8px 4px" }}>Badges earned</div><div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}>{BADGES.map((b) => <Badge key={b}>{b}</Badge>)}</div>
    <Card><div style={{ color: COLORS.white, fontSize: 13, fontWeight: 800, marginBottom: 8 }}>Notification preferences</div>{Object.entries(prefs).map(([key, on]) => <button key={key} onClick={() => togglePref(key)} style={{ ...row, width: "100%", background: "transparent", border: 0, cursor: "pointer" }}><span style={{ textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, " $1")}</span><strong style={{ color: on ? COLORS.green : COLORS.midgrey }}>{on ? "On" : "Off"}</strong></button>)}</Card>
    {[['performance','View performance'],['studyPlanner','Study Planner'],['recentActivity','Recent activity'],['notifications','Notifications'],['leaderboard','Leaderboard'],['downloads','Manage downloads'],['wellness','Wellness Corner'],['subscription','Subscription plans']].map(([target, text]) => <Button key={target} variant="outline" onClick={() => navigate(target)}>{text}</Button>)}
    <Button onClick={logout}>Log out</Button><button onClick={fullReset} style={{ ...linkButton, width: "100%", color: COLORS.red, marginTop: 12 }}>Reset demo data</button>
  </div>;
}
const row = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, color: COLORS.midgrey, fontSize: 11, padding: "8px 0", borderBottom: `1px solid ${COLORS.line}` };
const linkButton = { border: 0, background: "transparent", color: COLORS.gold, fontSize: 10, fontWeight: 800, cursor: "pointer" };
const label = { display: "block", color: COLORS.soft, fontSize: 11, fontWeight: 700, marginBottom: 9 };
const field = { width: "100%", marginTop: 5, padding: 10, borderRadius: 10, border: `1px solid ${COLORS.line}`, background: COLORS.navy, color: COLORS.white, fontFamily: "inherit" };
