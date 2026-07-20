// screens/OtpScreen.jsx
// SRS REQ-AUTH-1: verify mobile via SMS OTP before activation.
// Demo accepts any 4 digits; also stands in for the Parental Consent step (REQ-AUTH-2).
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
export default function OtpScreen() {
  const { navigate, params } = useNav();
  const [otp, setOtp] = useState("");
  const boxes = [0, 1, 2, 3];
  return (
    <div style={{ flex: 1, padding: "0 16px 16px" }}>
      <ScreenHeader title="Verify your number"
        subtitle={`We sent a 4-digit code to ${params.mobile || "your phone"}`} />
      <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "20px 0" }}>
        {boxes.map((i) => (
          <div key={i} style={{ width: 52, height: 60, borderRadius: 12, background: COLORS.navy2,
            border: `1px solid ${otp[i] ? COLORS.gold : COLORS.line}`, color: COLORS.white,
            fontSize: 26, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {otp[i] || ""}
          </div>
        ))}
      </div>
      {/* single hidden-ish input drives all four boxes for demo simplicity */}
      <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
        inputMode="numeric" placeholder="Enter 4-digit code"
        style={{ width: "100%", background: COLORS.navy2, border: `1px solid ${COLORS.line}`, borderRadius: 12,
          padding: "12px 14px", color: COLORS.white, fontSize: 15, textAlign: "center", boxSizing: "border-box" }} />
      <Button disabled={otp.length !== 4} onClick={() => navigate("subject")}>Verify & continue</Button>
      <div style={{ color: COLORS.midgrey, fontSize: 12, textAlign: "center", marginTop: 12 }}>
        Under 18? A parent/guardian consent step follows (POPIA).
      </div>
    </div>
  );
}
