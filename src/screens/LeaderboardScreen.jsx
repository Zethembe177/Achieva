// screens/LeaderboardScreen.jsx
// SRS 4.7 REQ-GAM-1/2: School / Province / National leaderboards.
// (School resets Monday; Province & National reset on the 1st — per the brief.)
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { LEADERBOARD } from "../data/mockData";
import Card from "../components/Card";
import ScreenHeader from "../components/ScreenHeader";
const TABS = [
  { key: "school", label: "School" },
  { key: "province", label: "Province" },
  { key: "national", label: "National" },
];
const MEDALS = ["🥇", "🥈", "🥉"];
export default function LeaderboardScreen() {
  const [tab, setTab] = useState("school");
  const rows = LEADERBOARD[tab];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader title="Leaderboard" subtitle="School resets Monday · Province/National on the 1st" />
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {TABS.map((t) => {
          const on = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ flex: 1, padding: "8px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                border: `1px solid ${on ? COLORS.gold : COLORS.line}`,
                background: on ? "rgba(201,168,76,0.15)" : "transparent", color: on ? COLORS.gold : COLORS.midgrey }}>
              {t.label}
            </button>
          );
        })}
      </div>
      {rows.map((r, i) => (
        <Card key={i} style={{ display: "flex", alignItems: "center", gap: 12,
          borderColor: r.you ? COLORS.gold : COLORS.line }}>
          <span style={{ width: 24, textAlign: "center", fontSize: 16 }}>{MEDALS[i] || `#${i + 1}`}</span>
          <div style={{ flex: 1 }}>
            <div style={{ color: r.you ? COLORS.gold : COLORS.white, fontSize: 14, fontWeight: 600 }}>{r.name}</div>
            <div style={{ color: COLORS.midgrey, fontSize: 12 }}>{r.where}</div>
          </div>
          <span style={{ color: COLORS.soft, fontWeight: 800 }}>{r.pts.toLocaleString()}</span>
        </Card>
      ))}
    </div>
  );
}
