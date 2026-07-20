// screens/WelcomeScreen.jsx
// SRS 3.1 Welcome Screen: logo on navy, tagline, Sign Up / Log In in gold.
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import Button from "../components/Button";
export default function WelcomeScreen() {
  const { navigate } = useNav();
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", padding: "0 28px", textAlign: "center" }}>
      <div style={{ width: 84, height: 84, borderRadius: 24, background: COLORS.gold, color: COLORS.navy,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, marginBottom: 20 }}>A</div>
      <div style={{ color: COLORS.white, fontSize: 30, fontWeight: 900, letterSpacing: 0.5 }}>Achieva</div>
      <div style={{ color: COLORS.gold, fontSize: 15, fontWeight: 600, marginTop: 8 }}>Your Bachelor Pass Starts Here</div>
      <div style={{ color: COLORS.midgrey, fontSize: 13, marginTop: 10, lineHeight: 1.5 }}>
        Grade 12 Maths — video lessons, past papers and mock exams that work fully offline.
      </div>
      <div style={{ width: "100%", marginTop: 32 }}>
        <Button onClick={() => navigate("signup")}>Sign Up</Button>
        <Button variant="outline" onClick={() => navigate("subject")}>Log In</Button>
      </div>
    </div>
  );
}
