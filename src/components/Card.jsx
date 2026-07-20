// components/Card.jsx — standard surface, now with the founder's gradient depth.
// `gold` = the highlighted gradient card (Daily Challenge, results).
import { COLORS, RADIUS, GRADIENTS } from "../theme/tokens";
export default function Card({ children, gold = false, onClick, style = {} }) {
  const base = {
    background: gold ? GRADIENTS.goldCard : GRADIENTS.card,
    border: `1px solid ${gold ? "rgba(201,168,76,0.45)" : COLORS.line}`,
    borderRadius: RADIUS.lg, padding: 16, marginBottom: 12,
    boxShadow: gold
      ? "0 10px 30px -12px rgba(201,168,76,0.25)"   // soft gold glow
      : "0 8px 24px -16px rgba(0,0,0,0.6)",         // gentle depth
    cursor: onClick ? "pointer" : "default",
    transition: "transform .18s ease, box-shadow .18s ease",
    ...style,
  };
  return <div className={onClick ? "ach-card-tap" : ""} style={base} onClick={onClick}>{children}</div>;
}
