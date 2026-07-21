import { useState } from "react";
import { COLORS } from "../theme/tokens";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";

const PLANS = [
  { id: "starter", name: "Starter", price: "Free", features: ["Selected free lessons", "Daily challenge", "Community access"] },
  { id: "bachelor", name: "Bachelor Pass", price: "R149/month", popular: true, features: ["All video lessons", "Past papers and walkthroughs", "Offline downloads", "Study planner"] },
  { id: "elite", name: "Elite", price: "R249/month", features: ["Everything in Bachelor Pass", "Tutor priority responses", "Advanced exam analytics"] },
];
export default function SubscriptionScreen() {
  const [selected, setSelected] = useState("bachelor");
  return <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}><ScreenHeader title="Subscription Plans" subtitle="Prototype pricing — no payment is processed"/>
    {PLANS.map((plan) => <Card key={plan.id} gold={plan.popular} onClick={() => setSelected(plan.id)} style={{ borderColor: selected === plan.id ? COLORS.gold : undefined }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ color: COLORS.white, fontWeight: 900, fontSize: 16 }}>{plan.name}</div><div style={{ color: COLORS.gold, fontWeight: 800, marginTop: 3 }}>{plan.price}</div></div>{plan.popular && <Badge color={COLORS.gold}>Most popular</Badge>}</div>
      <div style={{ marginTop: 10 }}>{plan.features.map((f) => <div key={f} style={{ color: COLORS.soft, fontSize: 11, margin: "6px 0" }}>✓ {f}</div>)}</div>
      {selected === plan.id && <div style={{ color: COLORS.green, fontSize: 10, fontWeight: 800, marginTop: 8 }}>Selected for demo</div>}
    </Card>)}
    <Button onClick={() => window.alert("Payment is not connected in this prototype.")}>Continue with selected plan</Button>
  </div>;
}
