// components/BottomNav.jsx — the five main tabs (SRS 3.1 tab structure).
// Only shown on top-level tab screens; uses switchTab so tabs don't stack.
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { HomeIcon, LearnIcon, PracticeIcon, ChartIcon, CommunityIcon, UserIcon } from "./icons";

const TABS = [
  { key: "home", label: "Home", Icon: HomeIcon },
  { key: "learn", label: "Learn", Icon: LearnIcon },
  { key: "practice", label: "Practice", Icon: PracticeIcon },
  { key: "performance", label: "Progress", Icon: ChartIcon },
  { key: "community", label: "Community", Icon: CommunityIcon },
  { key: "profile", label: "Profile", Icon: UserIcon },
];

export default function BottomNav() {
  const { screen, switchTab } = useNav();
  return (
    <div style={{ height: 64, background: COLORS.navy2, display: "flex", alignItems: "center",
      justifyContent: "space-around", borderTop: "1px solid rgba(201,168,76,0.2)", flexShrink: 0 }}>
      {TABS.map(({ key, label, Icon }) => {
        const on = screen === key;
        return (
          <div key={key} onClick={() => switchTab(key)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              color: on ? COLORS.gold : COLORS.midgrey, fontSize: 9.5, cursor: "pointer", padding: "6px 3px" }}>
            <Icon size={19} color={on ? COLORS.gold : COLORS.midgrey} />
            {label}
          </div>
        );
      })}
    </div>
  );
}
