import { useMemo } from "react";
import { COLORS } from "../theme/tokens";
import { STUDY_TASKS } from "../data/mockData";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import Card from "../components/Card";
import Badge from "../components/Badge";
import ProgressBar from "../components/ProgressBar";
import ScreenHeader from "../components/ScreenHeader";
import { CheckIcon, ClockIcon } from "../components/icons";

export default function StudyPlannerScreen() {
  const { navigate } = useNav();
  const { progress, toggleStudyTask } = useProgress();
  const completed = progress.completedStudyTasks;
  const pct = useMemo(() => Math.round((completed.length / Math.max(1, STUDY_TASKS.length)) * 100), [completed]);
  return <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
    <ScreenHeader title="Today’s Study Plan" subtitle="A rule-based plan built around your weaker topics" />
    <Card gold>
      <div style={{ display: "flex", justifyContent: "space-between", color: COLORS.white, fontSize: 13, fontWeight: 800 }}><span>Daily progress</span><span>{completed.length}/{STUDY_TASKS.length}</span></div>
      <ProgressBar pct={pct} />
      <div style={{ color: COLORS.midgrey, fontSize: 10, marginTop: 5 }}>{pct === 100 ? "Excellent work — today’s plan is complete." : `${100 - pct}% left for today.`}</div>
    </Card>
    {STUDY_TASKS.map((task, index) => {
      const done = completed.includes(task.id);
      return <Card key={task.id} style={{ display: "flex", gap: 11, alignItems: "flex-start", opacity: done ? .72 : 1 }}>
        <div style={{ width: 44, textAlign: "center" }}><div style={{ color: COLORS.gold, fontWeight: 900, fontSize: 11 }}>{task.time}</div><div style={{ width: 1, height: 36, background: index === STUDY_TASKS.length - 1 ? "transparent" : COLORS.line, margin: "6px auto 0" }}/></div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><div style={{ color: COLORS.white, fontSize: 13, fontWeight: 800, textDecoration: done ? "line-through" : "none" }}>{task.title}</div><Badge color={task.priority === "High" ? COLORS.red : COLORS.gold}>{task.priority}</Badge></div>
          <div style={{ color: COLORS.midgrey, fontSize: 11, margin: "4px 0 8px" }}>{task.topic}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: COLORS.midgrey, fontSize: 10 }}><ClockIcon size={12}/>{task.mins} min</div>
          <div style={{ display: "flex", gap: 7, marginTop: 10 }}>
            <button onClick={() => navigate(task.target)} style={smallButton(false)}>Open</button>
            <button onClick={() => toggleStudyTask(task)} style={smallButton(done)}>{done ? "Completed ✓" : "Mark complete"}</button>
          </div>
        </div>
      </Card>;
    })}
    <Card style={{ color: COLORS.midgrey, fontSize: 11, lineHeight: 1.5 }}><CheckIcon size={14} color={COLORS.green}/> This prototype plan is generated using fixed rules and mock performance data. It does not call an AI service.</Card>
  </div>;
}
const smallButton = (active) => ({ border: `1px solid ${active ? COLORS.green : COLORS.gold}`, background: active ? `${COLORS.green}22` : "transparent", color: active ? COLORS.green : COLORS.gold, borderRadius: 9, padding: "7px 9px", fontSize: 10, fontWeight: 800, cursor: "pointer" });
