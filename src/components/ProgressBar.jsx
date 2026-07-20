// components/ProgressBar.jsx — thin horizontal progress bar.
import { COLORS } from "../theme/tokens";
export default function ProgressBar({ pct, color = COLORS.gold }) {
  return (
    <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden", marginTop: 6 }}>
      <div style={{ height: "100%", width: `${Math.min(100, pct)}%`, background: color, borderRadius: 3, transition: "width .6s ease" }} />
    </div>
  );
}
