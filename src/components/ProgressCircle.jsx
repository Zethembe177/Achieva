// components/ProgressCircle.jsx
// SVG ring showing overall progress on the Home screen (SRS 3.1: "progress circle").
import { COLORS } from "../theme/tokens";

export default function ProgressCircle({ pct, size = 92, stroke = 8 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(100, pct) / 100) * circ;
  return (
    <svg width={size} height={size}>
      {/* track */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} />
      {/* filled arc — starts at 12 o'clock */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={COLORS.gold} strokeWidth={stroke} strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ transition: "stroke-dashoffset .8s ease" }} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
            fill={COLORS.white} fontSize="20" fontWeight="800">{pct}%</text>
    </svg>
  );
}
