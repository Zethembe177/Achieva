// screens/WellnessScreen.jsx
// SRS 4.7 REQ-GAM-3: Wellness Corner — study tips, articles, motivation videos,
// mental-health helplines. Never paywalled, available fully offline.
import { COLORS } from "../theme/tokens";
import { WELLNESS } from "../data/mockData";
import Card from "../components/Card";
import Badge from "../components/Badge";
import ScreenHeader from "../components/ScreenHeader";
import { HeartIcon } from "../components/icons";
export default function WellnessScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader title="Wellness Corner" subtitle="Always free · works offline" />
      {WELLNESS.articles.map((a) => (
        <Card key={a.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(201,168,76,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HeartIcon size={18} color={COLORS.gold} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>{a.title}</div>
            <div style={{ color: COLORS.midgrey, fontSize: 12 }}>{a.mins} min</div>
          </div>
          <Badge>{a.kind}</Badge>
        </Card>
      ))}
      <div style={{ color: COLORS.soft, fontSize: 13, fontWeight: 700, margin: "10px 4px 8px" }}>Need to talk to someone?</div>
      {WELLNESS.helplines.map((h) => (
        <Card key={h.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: COLORS.white, fontSize: 14 }}>{h.name}</span>
          <a href={`tel:${h.number.replace(/\s/g, "")}`}
            style={{ color: COLORS.gold, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>{h.number}</a>
        </Card>
      ))}
    </div>
  );
}
