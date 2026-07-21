import { useEffect, useMemo, useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import { useSubject } from "../state/SubjectContext";
import { LEARNER, CHAPTERS, DAILY_CHALLENGE, MOTIVATIONAL_QUOTES, DASHBOARD_STATS, STUDY_TASKS, RECENT_ACTIVITY } from "../data/mockData";
import AppHeader from "../components/AppHeader";
import Card from "../components/Card";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import ProgressCircle from "../components/ProgressCircle";
import QuickActionCard from "../components/QuickActionCard";
import ActivityItem from "../components/ActivityItem";
import { CheckIcon, PlayIcon, QuizIcon, FileIcon, DownloadIcon, CalendarIcon } from "../components/icons";

function daysUntil(dateStr) { return Math.max(0, Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000)); }
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen() {
  const { navigate } = useNav();
  const { progress } = useProgress();
  const { selectedSubject } = useSubject();
  const [countdown, setCountdown] = useState(daysUntil(LEARNER.examDate));
  useEffect(() => { const t = setInterval(() => setCountdown(daysUntil(LEARNER.examDate)), 60000); return () => clearInterval(t); }, []);
  const quote = useMemo(() => MOTIVATIONAL_QUOTES[new Date().getDate() % MOTIVATIONAL_QUOTES.length], []);
  const resume = CHAPTERS[0];
  const firstActivity = progress.recentActivity?.[0] ?? RECENT_ACTIVITY[0];
  return <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
    <AppHeader />
    <div style={{ margin: "2px 0 14px" }}>
      <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 900 }}>{greeting()}, {LEARNER.name}! 👋</div>
      <div style={{ color: COLORS.midgrey, fontSize: 11, marginTop: 5 }}>“{quote}”</div>
    </div>

    <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div><div style={{ color: COLORS.midgrey, fontSize: 11 }}>NSC 2026 countdown</div>
        <div style={{ color: COLORS.gold, fontSize: 32, fontWeight: 900 }}>{countdown}</div>
        <div style={{ color: COLORS.soft, fontSize: 11 }}>days to {selectedSubject.name}</div></div>
      <CalendarIcon size={36} color={COLORS.gold}/>
    </Card>

    <Card gold style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <ProgressCircle pct={progress.average} size={82}/>
      <div style={{ flex: 1 }}><div style={{ color: COLORS.white, fontSize: 14, fontWeight: 800 }}>{selectedSubject.name}</div>
        <div style={{ color: COLORS.gold, fontSize: 11, marginTop: 3 }}>Bachelor Pass target · {LEARNER.target}%</div>
        <ProgressBar pct={progress.average}/>
        <button onClick={() => navigate("subject")} style={{ border: 0, background: "transparent", color: COLORS.gold, padding: "8px 0 0", cursor: "pointer", fontSize: 10, fontWeight: 800 }}>Change subject →</button>
      </div>
    </Card>

    <div className="dashboard-stat-grid">
      {[{v:`${progress.average}%`,l:"Average"},{v:LEARNER.streak,l:"Day streak"},{v:progress.points.toLocaleString(),l:"Points"},{v:Math.max(DASHBOARD_STATS.lessonsCompleted, progress.completedLessons.length),l:"Lessons"}].map(s =>
        <Card key={s.l} style={{ margin: 0, padding: 12, textAlign: "center" }}><div style={{ color: COLORS.gold, fontSize: 18, fontWeight: 900 }}>{s.v}</div><div style={{ color: COLORS.midgrey, fontSize: 9 }}>{s.l}</div></Card>)}
    </div>

    <div className="section-heading"><span>Continue where you left off</span><button onClick={() => navigate("learn")}>See all</button></div>
    <Card onClick={() => navigate("videoPlayer", { lessonId: 13 })} style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ width: 50, height: 50, borderRadius: 13, background: `${COLORS.gold}22`, display: "grid", placeItems: "center" }}><PlayIcon size={20} color={COLORS.gold}/></div>
      <div style={{ flex: 1 }}><div style={{ color: COLORS.white, fontSize: 13, fontWeight: 800 }}>{resume.title}</div><div style={{ color: COLORS.midgrey, fontSize: 10, marginTop: 3 }}>Video lesson · 18 min</div><ProgressBar pct={resume.progress}/></div>
      <span style={{ color: COLORS.gold, fontSize: 11, fontWeight: 800 }}>{resume.progress}%</span>
    </Card>

    <div className="section-heading"><span>Quick actions</span></div>
    <div className="quick-action-grid">
      <QuickActionCard title="Watch a Lesson" subtitle="Continue learning" Icon={PlayIcon} onClick={() => navigate("learn")}/>
      <QuickActionCard title="Do a Quiz" subtitle="Test your knowledge" Icon={QuizIcon} accent={COLORS.green} onClick={() => navigate("quiz")}/>
      <QuickActionCard title="Past Papers" subtitle="Exam practice" Icon={FileIcon} accent="#F08A45" onClick={() => navigate("practice")}/>
      <QuickActionCard title="Download Offline" subtitle="Study anywhere" Icon={DownloadIcon} accent="#5B9CFF" onClick={() => navigate("downloads")}/>
    </div>

    <div className="section-heading"><span>Today's plan</span><button onClick={() => navigate("studyPlanner")}>View full plan</button></div>
    <Card onClick={() => navigate("studyPlanner")} style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 900 }}>{STUDY_TASKS[0].time}</div><div style={{ flex: 1 }}><div style={{ color: COLORS.white, fontSize: 13, fontWeight: 800 }}>{STUDY_TASKS[0].title}</div><div style={{ color: COLORS.midgrey, fontSize: 10 }}>{STUDY_TASKS[0].topic} · {STUDY_TASKS[0].mins} min</div></div><span style={{ color: COLORS.gold }}>→</span>
    </Card>

    <div className="section-heading"><span>Recent activity</span><button onClick={() => navigate("recentActivity")}>View all</button></div>
    <ActivityItem item={firstActivity} Icon={CheckIcon} onClick={() => navigate("recentActivity")}/>

    <Card gold><div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 900, letterSpacing: 1 }}>DAILY CHALLENGE</div><div style={{ color: COLORS.white, fontSize: 15, fontWeight: 800, margin: "7px 0 3px" }}>{DAILY_CHALLENGE.question}</div><div style={{ color: COLORS.midgrey, fontSize: 10 }}>{DAILY_CHALLENGE.topic} · {DAILY_CHALLENGE.points} pts</div><Button onClick={() => navigate("quiz")}>Solve now</Button></Card>

    <Card onClick={() => navigate("notifications")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 900 }}>WHAT'S NEW</div><div style={{ color: COLORS.white, fontSize: 12, fontWeight: 700, marginTop: 4 }}>2024 Paper 2 walkthrough available</div></div><span style={{ color: COLORS.gold }}>→</span></Card>
    <Card style={{ display: "flex", alignItems: "center", gap: 10 }}><CheckIcon size={16} color={COLORS.green}/><div><div style={{ color: COLORS.white, fontSize: 12, fontWeight: 700 }}>All content synced</div><div style={{ color: COLORS.midgrey, fontSize: 10 }}>Last sync today · Study offline anytime</div></div></Card>
  </div>;
}
