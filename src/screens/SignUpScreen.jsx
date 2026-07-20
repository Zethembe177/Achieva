// screens/SignUpScreen.jsx
// SRS 3.1 Sign-Up: name, SA mobile, optional email, province, school, password.
// Client-side validation only; real submit would call the API then OTP (REQ-AUTH-1).
import { useState } from "react";
import { COLORS } from "../theme/tokens";
import { useNav } from "../navigation/NavContext";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
const field = { width: "100%", background: COLORS.navy2, border: `1px solid ${COLORS.line}`,
  borderRadius: 12, padding: "12px 14px", color: COLORS.white, fontSize: 14, marginTop: 10, outline: "none", boxSizing: "border-box" };
const PROVINCES = ["Gauteng","KwaZulu-Natal","Western Cape","Eastern Cape","Limpopo","Mpumalanga","North West","Free State","Northern Cape"];
export default function SignUpScreen() {
  const { navigate } = useNav();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", province: "", school: "", password: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const validMobile = /^0\d{9}$/.test(form.mobile);      // SA 10-digit
  const validPw = form.password.length >= 8;             // REQ-AUTH-3
  const ready = form.name && validMobile && form.province && form.school && validPw;
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <ScreenHeader title="Create your account" subtitle="Takes about a minute" />
      <input style={field} placeholder="Full name" value={form.name} onChange={set("name")} />
      <input style={field} placeholder="Mobile number (e.g. 0821234567)" value={form.mobile} onChange={set("mobile")} />
      {form.mobile && !validMobile && <div style={{ color: COLORS.red, fontSize: 11, marginTop: 4 }}>Enter a valid 10-digit SA number.</div>}
      <input style={field} placeholder="Email (optional)" value={form.email} onChange={set("email")} />
      <select style={field} value={form.province} onChange={set("province")}>
        <option value="">Select province</option>
        {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <input style={field} placeholder="Search your school" value={form.school} onChange={set("school")} />
      <input style={field} type="password" placeholder="Password (min 8 characters)" value={form.password} onChange={set("password")} />
      {form.password && !validPw && <div style={{ color: COLORS.red, fontSize: 11, marginTop: 4 }}>At least 8 characters.</div>}
      <Button disabled={!ready} onClick={() => navigate("otp", { mobile: form.mobile })}>Send OTP</Button>
      <Button variant="outline" onClick={() => navigate("subject")}>Sign up with Google</Button>
    </div>
  );
}
