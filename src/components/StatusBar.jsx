// components/StatusBar.jsx — cosmetic phone status bar (time + signal).
import { COLORS } from "../theme/tokens";
export default function StatusBar() {
  return (
    <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 20px 0", color: COLORS.soft, fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
      <span>9:41</span><span style={{ fontSize: 11 }}>WiFi 68%</span>
    </div>
  );
}
