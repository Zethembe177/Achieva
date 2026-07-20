// ============================================================================
// components/icons.jsx
// Small hand-rolled SVG icons. We avoid an icon library so `npm install` stays
// tiny and the app has zero extra runtime dependencies. Each icon takes a
// `size` and `color` prop and inherits colour by default.
// ============================================================================

const S = ({ children, size = 22, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

export const HomeIcon = (p) => <S {...p}><path d="M3 9.5 12 3l9 6.5" /><path d="M5 10v10h14V10" /></S>;
export const LearnIcon = (p) => <S {...p}><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2Z" /><path d="M8 3v18" /></S>;
export const PracticeIcon = (p) => <S {...p}><path d="m9 11 3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></S>;
export const ChartIcon = (p) => <S {...p}><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" /></S>;
export const CommunityIcon = (p) => <S {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 6a3 3 0 0 1 0 6" /><path d="M21 20a6 6 0 0 0-4-5.6" /></S>;
export const PlayIcon = (p) => <S {...p} fill={p.color || "currentColor"}><path d="M6 4v16l14-8Z" /></S>;
export const BackIcon = (p) => <S {...p}><path d="m15 18-6-6 6-6" /></S>;
export const FlameIcon = (p) => <S {...p}><path d="M12 2c2 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3 .5 2 2 2 3 3 0-3-1-5 0-8Z" /></S>;
export const CheckIcon = (p) => <S {...p}><path d="M20 6 9 17l-5-5" /></S>;
export const TrophyIcon = (p) => <S {...p}><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v4a5 5 0 0 1-10 0Z" /><path d="M17 5h3v2a3 3 0 0 1-3 3" /><path d="M7 5H4v2a3 3 0 0 0 3 3" /></S>;
export const HeartIcon = (p) => <S {...p}><path d="M12 21s-7-4.5-9.5-8.5C1 9 3 5 7 5c2 0 3 1 5 3 2-2 3-3 5-3 4 0 6 4 4.5 7.5C19 16.5 12 21 12 21Z" /></S>;
export const DownloadIcon = (p) => <S {...p}><path d="M12 3v12" /><path d="m7 12 5 5 5-5" /><path d="M5 21h14" /></S>;
export const ClockIcon = (p) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>;
export const TrashIcon = (p) => <S {...p}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></S>;
export const UserIcon = (p) => <S {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></S>;
