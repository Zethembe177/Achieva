import { COLORS } from "../theme/tokens";
import Card from "./Card";
export default function ActivityItem({ item, Icon, onClick }) {
  return <Card onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 8 }}>
    <div style={{ width: 38, height: 38, borderRadius: 12, background: `${item.color || COLORS.gold}22`, display: "grid", placeItems: "center", flexShrink: 0 }}>
      <Icon size={18} color={item.color || COLORS.gold} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: COLORS.white, fontSize: 13, fontWeight: 700 }}>{item.title}</div>
      <div style={{ color: COLORS.midgrey, fontSize: 11, marginTop: 2 }}>{item.subtitle}</div>
    </div>
    <div style={{ textAlign: "right" }}>
      {item.value && <div style={{ color: item.color || COLORS.gold, fontSize: 12, fontWeight: 800 }}>{item.value}</div>}
      <div style={{ color: COLORS.midgrey, fontSize: 9, marginTop: 2 }}>{item.time}</div>
    </div>
  </Card>;
}