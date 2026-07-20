// components/Badge.jsx — small pill label (topic tags, priorities, tiers).
import { COLORS, RADIUS } from "../theme/tokens";
export default function Badge({ children, color = COLORS.gold }) {
  return (
    <span style={{ background: `${color}22`, color, fontSize: 10, fontWeight: 700,
      padding: "3px 8px", borderRadius: RADIUS.pill, display: "inline-block" }}>{children}</span>
  );
}
