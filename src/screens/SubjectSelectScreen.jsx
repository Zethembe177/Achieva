// screens/SubjectSelectScreen.jsx
// SRS 3.1 Subject Selection: Mathematics Core, Mathematical Literacy, or both.
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import { SUBJECTS } from "../data/mockData";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import { CheckIcon } from "../components/icons";
export default function SubjectSelectScreen() {
  const { switchTab } = useNav();
  const [picked, setPicked] = useState(["core"]);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  return (
    <div style={{ flex: 1, padding: "0 16px 16px" }}>
      <ScreenHeader title="Choose your subjects" subtitle="You can change this later" showBack={false} />
      {SUBJECTS.map((s) => {
        const on = picked.includes(s.id);
        return (
          <div key={s.id} onClick={() => toggle(s.id)}
            style={{ background: COLORS.navy2, border: `1px solid ${on ? COLORS.gold : COLORS.line}`,
              borderRadius: 16, padding: 18, marginBottom: 12, cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: COLORS.white, fontWeight: 600 }}>{s.name}</span>
            {on && <CheckIcon size={20} color={COLORS.gold} />}
          </div>
        );
      })}
      <Button disabled={picked.length === 0} onClick={() => switchTab("home")}>Start learning</Button>
    </div>
  );
}
