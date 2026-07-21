import { useMemo, useState } from "react";
import { COLORS } from "../theme/tokens";
import { RECENT_ACTIVITY } from "../data/mockData";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import ScreenHeader from "../components/ScreenHeader";
import ActivityItem from "../components/ActivityItem";
import Card from "../components/Card";
import { CheckIcon, QuizIcon, FileIcon, DownloadIcon, CalendarIcon } from "../components/icons";
const ICONS = { lesson: CheckIcon, quiz: QuizIcon, paper: FileIcon, download: DownloadIcon, plan: CalendarIcon };
const FILTERS = ["all", "lesson", "quiz", "paper", "download", "plan"];
export default function RecentActivityScreen() {
  const { navigate } = useNav();
  const { progress } = useProgress();
  const [filter, setFilter] = useState("all");
  const allRows = useMemo(() => [...progress.recentActivity, ...RECENT_ACTIVITY.filter((seed) => !progress.recentActivity.some((live) => live.uniqueKey === seed.uniqueKey || live.id === seed.id))], [progress.recentActivity]);
  const rows = filter === "all" ? allRows : allRows.filter((item) => item.type === filter);
  return <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
    <ScreenHeader title="Recent Activity" subtitle="Your latest learning progress" />
    <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12 }}>{FILTERS.map((item) => <button key={item} onClick={() => setFilter(item)} style={{ borderRadius: 18, padding: "7px 11px", border: `1px solid ${filter === item ? COLORS.gold : COLORS.line}`, background: filter === item ? `${COLORS.gold}22` : "transparent", color: filter === item ? COLORS.gold : COLORS.midgrey, cursor: "pointer", textTransform: "capitalize", whiteSpace: "nowrap", fontSize: 10 }}>{item}</button>)}</div>
    {rows.length === 0 && <Card style={{ color: COLORS.midgrey, textAlign: "center" }}>No activity in this category yet.</Card>}
    {rows.map((item) => { const Icon = ICONS[item.type] || CheckIcon; return <ActivityItem key={item.id} item={item} Icon={Icon} onClick={() => item.target && navigate(item.target)}/>; })}
  </div>;
}
