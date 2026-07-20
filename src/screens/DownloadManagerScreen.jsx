// screens/DownloadManagerScreen.jsx
// SRS 4.3 REQ-OFFLINE-3: per-item progress, total storage used, delete items.
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { DOWNLOADS } from "../data/mockData";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Badge from "../components/Badge";
import ScreenHeader from "../components/ScreenHeader";
import { TrashIcon } from "../components/icons";
export default function DownloadManagerScreen() {
  const [items, setItems] = useState(DOWNLOADS);
  const usedMB = items.reduce((sum, i) => sum + i.size, 0);
  const remove = (id) => setItems((xs) => xs.filter((x) => x.id !== id));
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader title="Downloads" subtitle={`${(usedMB / 1000).toFixed(2)} GB used on this device`} />
      {items.length === 0 && <div style={{ color: COLORS.midgrey, fontSize: 13, textAlign: "center", marginTop: 24 }}>
        Nothing downloaded yet. Download lessons over WiFi to study offline.</div>}
      {items.map((d) => (
        <Card key={d.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>{d.title}</div>
              <div style={{ color: COLORS.midgrey, fontSize: 12, marginTop: 2 }}>{d.size} MB · {d.quality}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {d.progress < 100
                ? <Badge>{d.progress}%</Badge>
                : <Badge color={COLORS.green}>Ready</Badge>}
              <button onClick={() => remove(d.id)} aria-label="Delete"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                <TrashIcon size={18} color={COLORS.midgrey} />
              </button>
            </div>
          </div>
          {d.progress < 100 && <ProgressBar pct={d.progress} />}
        </Card>
      ))}
    </div>
  );
}
