import { useEffect, useMemo } from "react";
import { COLORS } from "../theme/tokens";
import { useProgress } from "../state/ProgressContext";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Badge from "../components/Badge";
import ScreenHeader from "../components/ScreenHeader";
import { TrashIcon, DownloadIcon, PlayIcon } from "../components/icons";

export default function DownloadManagerScreen() {
  const { progress, updateDownload, removeDownload, completeDownload } = useProgress();
  const items = progress.downloads;
  const active = items.filter((i) => i.status === "downloading" && i.progress < 100);

  useEffect(() => {
    if (!active.length) return undefined;
    const timer = window.setInterval(() => {
      active.forEach((item) => {
        const next = Math.min(100, item.progress + 5);
        if (next >= 100) completeDownload(item.id); else updateDownload(item.id, { progress: next });
      });
    }, 500);
    return () => window.clearInterval(timer);
  }, [active, completeDownload, updateDownload]);

  const usedMB = useMemo(() => items.filter((i) => i.progress >= 100).reduce((sum, i) => sum + i.size, 0), [items]);
  const capacityMB = 3000;
  const usedPct = Math.min(100, Math.round((usedMB / capacityMB) * 100));
  const toggle = (item) => updateDownload(item.id, { status: item.status === "downloading" ? "paused" : "downloading" });

  return <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
    <ScreenHeader title="Downloads" subtitle="Offline lessons, notes and papers" />
    <Card gold><div style={{ display: "flex", justifyContent: "space-between", color: COLORS.white, fontSize: 12, fontWeight: 800 }}><span>Device storage</span><span>{(usedMB / 1000).toFixed(2)} GB / 3 GB</span></div><ProgressBar pct={usedPct}/><div style={{ color: COLORS.midgrey, fontSize: 10, marginTop: 5 }}>{100 - usedPct}% available for more content</div></Card>
    {items.length === 0 && <Card style={{ textAlign: "center", color: COLORS.midgrey }}><DownloadIcon size={30} color={COLORS.gold}/><div style={{ marginTop: 8 }}>Nothing downloaded yet. Open Learn or Practice to add offline content.</div></Card>}
    {items.map((d) => <Card key={d.id}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1 }}><div style={{ color: COLORS.white, fontSize: 13, fontWeight: 700 }}>{d.title}</div><div style={{ color: COLORS.midgrey, fontSize: 10, marginTop: 3 }}>{d.size} MB · {d.quality} · {d.type || "Lesson"}</div></div>
        {d.progress < 100 ? <Badge>{d.progress}%</Badge> : <Badge color={COLORS.green}>Offline ready</Badge>}
      </div>
      {d.progress < 100 && <ProgressBar pct={d.progress}/>} 
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {d.progress < 100 && <button onClick={() => toggle(d)} style={actionButton}>{d.status === "downloading" ? "Pause" : <><PlayIcon size={12}/> Resume</>}</button>}
        <button onClick={() => removeDownload(d.id)} aria-label={`Delete ${d.title}`} style={{ ...actionButton, color: COLORS.red, borderColor: COLORS.red }}><TrashIcon size={13}/> Delete</button>
      </div>
    </Card>)}
  </div>;
}
const actionButton = { display: "inline-flex", alignItems: "center", gap: 5, border: `1px solid ${COLORS.line}`, background: "transparent", color: COLORS.soft, borderRadius: 9, padding: "7px 9px", fontSize: 10, fontWeight: 800, cursor: "pointer" };
