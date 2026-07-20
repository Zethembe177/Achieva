// ============================================================================
// theme/tokens.js
// Achieva look — navy + gold, upgraded to the founder's gradient scheme.
// Same primary colours; added depth via gradients + gold glows.
// Values taken directly from the founder's updated HTML :root variables.
// ============================================================================

export const COLORS = {
  navy: "#0A1628",      // base background
  navy2: "#152845",     // card top (lighter navy)  <- founder's new value
  navy3: "#1B2E4B",     // deeper navy for hero/gradients
  gold: "#C9A84C",      // Achieva Gold
  gold2: "#E8C56A",     // gold-bright (hover/gradient partner)
  white: "#FFFFFF",
  soft: "#E8EDF2",      // primary text
  midgrey: "#8A9AB5",   // muted text  <- founder's cooler muted
  green: "#2ECC71",     // success / high band
  amber: "#F39C12",     // warn / medium band  <- founder's warn
  red: "#E74C3C",       // error / weak band
  line: "rgba(201,168,76,0.18)",     // gold hairline border
  lineSoft: "rgba(255,255,255,0.06)",// neutral hairline
};

// ---- gradient system (the "polish" the founder asked for) ----
export const GRADIENTS = {
  card: "linear-gradient(160deg, #152845 0%, #0A1628 100%)",
  goldCard: "linear-gradient(160deg, rgba(201,168,76,0.14) 0%, rgba(21,40,69,0.65) 60%, rgba(10,22,40,0.9) 100%)",
  goldBtn: "linear-gradient(135deg, #E8C56A 0%, #C9A84C 100%)",
  screen: "linear-gradient(160deg, #0B1A30 0%, #0A1628 55%, #0A1628 100%)",
  goldGlow: "radial-gradient(circle at 30% 30%, rgba(201,168,76,0.20), transparent 70%)",
};

// Performance band colour for a percentage (Performance Tracker).
export function bandColor(pct) {
  if (pct >= 70) return COLORS.green;
  if (pct >= 50) return COLORS.amber;
  return COLORS.red;
}

export const RADIUS = { sm: 10, md: 12, lg: 16, pill: 20 };
export const SPACE = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
export const FONT = "'Inter', 'Segoe UI', Arial, sans-serif";
