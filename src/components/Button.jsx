// components/Button.jsx — gold gradient fill + gold-outline variant.
// The `ach-btn-gold` class enables the hover glow defined in index.css.
import { COLORS, RADIUS, GRADIENTS } from "../theme/tokens";
export default function Button({ children, onClick, variant = "solid", style = {}, disabled }) {
  const solid = { background: GRADIENTS.goldBtn, color: COLORS.navy, border: "none" };
  const outline = { background: "transparent", color: COLORS.gold, border: `1px solid ${COLORS.gold}` };
  return (
    <button onClick={onClick} disabled={disabled}
      className={variant === "solid" ? "ach-btn-gold" : ""}
      style={{ ...(variant === "outline" ? outline : solid), fontSize: 13, fontWeight: 700,
        padding: "12px 20px", borderRadius: RADIUS.md, width: "100%", marginTop: 8,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      {children}
    </button>
  );
}
