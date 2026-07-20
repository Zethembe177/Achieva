// components/ScreenHeader.jsx — title row with an optional back button.
// Used by every non-tab screen (Video, Quiz, Mock Exam, etc.).
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { BackIcon } from "./icons";
export default function ScreenHeader({ title, subtitle, showBack = true }) {
  const { goBack, canGoBack } = useNav();
  return (
    <div style={{ padding: "4px 0 12px" }}>
      {showBack && canGoBack && (
        <button onClick={goBack} aria-label="Go back"
          style={{ background: COLORS.navy2, border: "none", borderRadius: 12, width: 40, height: 40,
            color: COLORS.soft, cursor: "pointer", marginBottom: 10 }}>
          <BackIcon size={18} color={COLORS.soft} />
        </button>
      )}
      <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 800 }}>{title}</div>
      {subtitle && <div style={{ color: COLORS.midgrey, fontSize: 13, marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}
