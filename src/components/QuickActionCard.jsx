import { COLORS, RADIUS } from "../theme/tokens";
export default function QuickActionCard({ title, subtitle, Icon, onClick, accent = COLORS.gold }) {
  return (
    <button onClick={onClick} style={{ minHeight: 96, width: "100%", borderRadius: RADIUS.lg,
      border: `1px solid ${COLORS.line}`, background: `linear-gradient(145deg, ${accent}25, ${COLORS.navy2})`,
      color: COLORS.white, padding: 12, textAlign: "left", cursor: "pointer" }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `${accent}30`, display: "grid", placeItems: "center", marginBottom: 9 }}>
        <Icon size={18} color={accent} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 800 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 10, color: COLORS.midgrey, marginTop: 2 }}>{subtitle}</div>}
    </button>
  );
}
