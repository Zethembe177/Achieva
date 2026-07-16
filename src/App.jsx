import { useState } from "react";

// ---- Achieva design tokens (from founder demo) ----
const C = {
  navy: "#0A1628",
  navy2: "#1B2E4B",
  gold: "#C9A84C",
  gold2: "#E8C56A",
  white: "#FFFFFF",
  soft: "#E8EDF2",
  midgrey: "#D0D8E4",
  green: "#2ECC71",
};

// ---- tiny inline icons (no external deps) ----
const Icon = ({ d, size = 20, stroke = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
       stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const HomeI = (p) => <Icon {...p} d={<><path d="M3 9.5 12 3l9 6.5" /><path d="M5 10v10h14V10" /></>} />;
const BookI = (p) => <Icon {...p} d={<><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2Z" /><path d="M8 3v18" /></>} />;
const ChartI = (p) => <Icon {...p} d={<><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" /></>} />;
const UsersI = (p) => <Icon {...p} d={<><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 6a3 3 0 0 1 0 6" /><path d="M21 20a6 6 0 0 0-4-5.6" /></>} />;
const FileI = (p) => <Icon {...p} d={<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5" /></>} />;
const FlameI = (p) => <Icon {...p} size={14} stroke={C.gold} d={<path d="M12 2c2 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3 .5 2 2 2 3 3 0-3-1-5 0-8Z" />} />;
const CheckI = (p) => <Icon {...p} size={14} stroke={C.green} d={<path d="M20 6 9 17l-5-5" />} />;

const card = {
  background: C.navy2, borderRadius: 16, padding: 16, marginBottom: 12,
  border: "1px solid rgba(201,168,76,0.15)",
};

function ProgressBar({ pct, color = C.gold }) {
  return (
    <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden", marginTop: 6 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width .6s ease" }} />
    </div>
  );
}

function StatBox({ value, label, accent }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{ color: accent || C.gold, fontSize: 20, fontWeight: 800 }}>{value}</div>
      <div style={{ color: C.midgrey, fontSize: 11, marginTop: 2 }}>{label}</div>
    </div>
  );
}

const NAV = [
  { key: "home", label: "Home", I: HomeI },
  { key: "lessons", label: "Lessons", I: BookI },
  { key: "progress", label: "Progress", I: ChartI },
  { key: "community", label: "Community", I: UsersI },
  { key: "papers", label: "Papers", I: FileI },
];

export default function App() {
  const [active, setActive] = useState("home");

  const continueItems = [
    { title: "Functions & Graphs", sub: "Chapter 3 · 62% complete", pct: 62 },
    { title: "Calculus — Derivatives", sub: "Chapter 6 · 34% complete", pct: 34 },
    { title: "2023 NSC Paper 1", sub: "Past paper · 50% watched", pct: 50 },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center",
                  background: "#f0f2f5", fontFamily: "'Segoe UI', Arial, sans-serif", padding: "24px 12px" }}>
      {/* phone frame */}
      <div style={{ width: 375, height: 780, background: C.navy, borderRadius: 44, overflow: "hidden",
                    position: "relative", border: "6px solid #2a3a55", boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                    display: "flex", flexDirection: "column" }}>
        {/* notch */}
        <div style={{ width: 120, height: 26, background: C.navy, borderRadius: "0 0 18px 18px",
                      position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 10 }} />
        {/* status bar */}
        <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 20px 0", color: C.soft, fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
          <span>9:41</span><span style={{ fontSize: 11 }}>WiFi 68%</span>
        </div>

        {/* scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
          {/* greeting */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "8px 0 16px" }}>
            <div>
              <div style={{ color: C.soft, fontSize: 13 }}>Good morning,</div>
              <div style={{ color: C.white, fontSize: 22, fontWeight: 800 }}>Thabo 👋</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.gold, color: C.navy,
                          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>TM</div>
          </div>

          {/* daily challenge */}
          <div style={{ ...card, background: "linear-gradient(135deg,#1a2e4a,#0d1e33)", border: "1px solid rgba(201,168,76,0.4)" }}>
            <div style={{ color: C.gold, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>YOUR DAILY CHALLENGE</div>
            <div style={{ color: C.white, fontSize: 18, fontWeight: 700, margin: "8px 0 4px" }}>Solve: x² – 5x + 6 = 0</div>
            <div style={{ color: C.midgrey, fontSize: 12 }}>Quadratic Equations · 2 pts</div>
            <button style={btnGold}>Solve now</button>
          </div>

          {/* stats */}
          <div style={{ ...card, display: "flex", alignItems: "center" }}>
            <StatBox value="73%" label="Current avg" />
            <div style={{ width: 1, height: 34, background: "rgba(255,255,255,0.1)" }} />
            <StatBox value={<span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>12<FlameI /></span>} label="Day streak" />
            <div style={{ width: 1, height: 34, background: "rgba(255,255,255,0.1)" }} />
            <StatBox value="#4" label="School rank" />
          </div>

          {/* target */}
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", color: C.soft, fontSize: 13, fontWeight: 600 }}>
              <span>Progress to target</span><span style={{ color: C.gold }}>68% → 70%</span>
            </div>
            <ProgressBar pct={68} />
          </div>

          {/* continue studying */}
          <div style={{ color: C.soft, fontSize: 13, fontWeight: 700, margin: "8px 4px 10px" }}>Continue studying</div>
          {continueItems.map((it) => (
            <div key={it.title} style={{ ...card, cursor: "pointer" }}>
              <div style={{ color: C.white, fontSize: 14, fontWeight: 600 }}>{it.title}</div>
              <div style={{ color: C.midgrey, fontSize: 12, marginTop: 2 }}>{it.sub}</div>
              <ProgressBar pct={it.pct} />
            </div>
          ))}

          {/* offline sync */}
          <div style={{ ...card, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
            <CheckI />
            <div>
              <div style={{ color: C.white, fontSize: 13, fontWeight: 600 }}>Offline sync · All content synced</div>
              <div style={{ color: C.midgrey, fontSize: 11 }}>Last sync: today 8:15 AM · Study offline anytime</div>
            </div>
          </div>
        </div>

        {/* bottom nav */}
        <div style={{ height: 64, background: C.navy2, display: "flex", alignItems: "center",
                      justifyContent: "space-around", borderTop: "1px solid rgba(201,168,76,0.2)", flexShrink: 0 }}>
          {NAV.map(({ key, label, I }) => {
            const on = active === key;
            return (
              <div key={key} onClick={() => setActive(key)}
                   style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                            color: on ? C.gold : C.midgrey, fontSize: 10, cursor: "pointer",
                            padding: "6px 10px", borderRadius: 12, transition: "color .2s" }}>
                <I stroke={on ? C.gold : C.midgrey} />
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const btnGold = {
  background: "#C9A84C", color: "#0A1628", fontSize: 13, fontWeight: 700,
  padding: "12px 20px", borderRadius: 12, border: "none", cursor: "pointer",
  width: "100%", marginTop: 12,
};
