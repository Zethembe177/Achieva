import { COLORS } from "../theme/tokens";
import { NOTIFICATIONS } from "../data/mockData";
import { useNav } from "../navigation/NavContext";
import { useProgress } from "../state/ProgressContext";
import Card from "../components/Card";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import { BellIcon } from "../components/icons";

export default function NotificationsScreen() {
  const { navigate } = useNav();
  const { progress, markNotificationRead, markAllNotificationsRead } = useProgress();
  const read = progress.readNotifications ?? [];
  const unreadCount = progress.unreadNotifications ?? NOTIFICATIONS.filter((notification) => !read.includes(notification.id)).length;
  return <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
    <ScreenHeader title="Notifications" subtitle={`${unreadCount} unread updates`} />
    {NOTIFICATIONS.map((n) => <Card key={n.id} onClick={() => { markNotificationRead(n.id); navigate(n.target); }} style={{ display: "flex", gap: 11, opacity: read.includes(n.id) ? .68 : 1 }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, background: `${COLORS.gold}22`, display: "grid", placeItems: "center" }}><BellIcon size={17} color={COLORS.gold}/></div>
      <div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span style={{ color: COLORS.white, fontSize: 13, fontWeight: 800 }}>{n.title}</span>{!read.includes(n.id) && <span aria-label="Unread" style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.gold, flexShrink: 0 }}/>}</div><div style={{ color: COLORS.midgrey, fontSize: 11, lineHeight: 1.45, marginTop: 4 }}>{n.message}</div><div style={{ color: COLORS.midgrey, fontSize: 9, marginTop: 6 }}>{n.time}</div></div>
    </Card>)}
    <Button variant="outline" onClick={markAllNotificationsRead} disabled={progress.unreadNotifications === 0}>Mark all as read</Button>
  </div>;
}
