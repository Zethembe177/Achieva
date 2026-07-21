import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { useSubject } from "../state/SubjectContext";
import { useProgress } from "../state/ProgressContext";
import { BellIcon } from "./icons";

export default function AppHeader() {
  const { navigate } = useNav();
  const { selectedSubject } = useSubject();
  const { progress } = useProgress();
  const notificationCount = progress.unreadNotifications;
  return <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 0 12px" }}>
    <button aria-label="Open profile" onClick={() => navigate("profile")} style={{ width: 38, height: 38, borderRadius: 12, border: `1px solid ${COLORS.line}`, background: COLORS.navy2, color: COLORS.soft, cursor: "pointer", fontSize: 18 }}>☰</button>
    <div style={{ textAlign: "center" }}><div style={{ color: COLORS.white, fontSize: 18, fontWeight: 900, letterSpacing: -.4 }}>achieva</div><div style={{ color: COLORS.midgrey, fontSize: 9, maxWidth: 170, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selectedSubject.name}</div></div>
    <button aria-label={`${notificationCount} unread notifications`} onClick={() => navigate("notifications")} style={{ position: "relative", width: 38, height: 38, borderRadius: 12, border: `1px solid ${COLORS.line}`, background: COLORS.navy2, cursor: "pointer", display: "grid", placeItems: "center" }}>
      <BellIcon size={19} color={COLORS.soft}/>{notificationCount > 0 && <span style={{ position: "absolute", top: -4, right: -3, minWidth: 17, height: 17, padding: "0 4px", borderRadius: 9, background: COLORS.gold, color: COLORS.navy, fontSize: 9, fontWeight: 900, display: "grid", placeItems: "center" }}>{notificationCount}</span>}
    </button>
  </header>;
}