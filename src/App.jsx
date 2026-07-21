// ============================================================================
// App.jsx
// Root of the Achieva demo app. Responsibilities:
//   1. Wrap everything in <NavProvider> (our tiny router).
//   2. Map screen names -> screen components (SCREENS registry).
//   3. Render the current screen inside a phone frame.
//   4. Show the bottom tab bar only on the six existing top-level tab screens.
//
// To add a screen: create it in src/screens, import it, add it to SCREENS.
// Because each screen is its own file, teammates rarely touch this file at the
// same time — which keeps GitHub merges clean.
// ============================================================================

import { COLORS, FONT, GRADIENTS } from "./theme/tokens";
import { NavProvider, useNav } from "./navigation/NavContext";
import { ProgressProvider } from "./state/ProgressContext";
import { SubjectProvider } from "./state/SubjectContext";
import StatusBar from "./components/StatusBar";
import BottomNav from "./components/BottomNav";

// screens
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import OtpScreen from "./screens/OtpScreen";
import SubjectSelectScreen from "./screens/SubjectSelectScreen";
import HomeScreen from "./screens/HomeScreen";
import LearnScreen from "./screens/LearnScreen";
import VideoPlayerScreen from "./screens/VideoPlayerScreen";
import PracticeScreen from "./screens/PracticeScreen";
import QuizScreen from "./screens/QuizScreen";
import MockExamScreen from "./screens/MockExamScreen";
import PerformanceScreen from "./screens/PerformanceScreen";
import CommunityScreen from "./screens/CommunityScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import WellnessScreen from "./screens/WellnessScreen";
import DownloadManagerScreen from "./screens/DownloadManagerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import StudyPlannerScreen from "./screens/StudyPlannerScreen";
import RecentActivityScreen from "./screens/RecentActivityScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import NotesScreen from "./screens/NotesScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import WalkthroughScreen from "./screens/WalkthroughScreen";

// name -> component
const SCREENS = {
  welcome: WelcomeScreen,
  signup: SignUpScreen,
  otp: OtpScreen,
  subject: SubjectSelectScreen,
  home: HomeScreen,
  learn: LearnScreen,
  videoPlayer: VideoPlayerScreen,
  practice: PracticeScreen,
  quiz: QuizScreen,
  mockExam: MockExamScreen,
  performance: PerformanceScreen,
  community: CommunityScreen,
  leaderboard: LeaderboardScreen,
  wellness: WellnessScreen,
  downloads: DownloadManagerScreen,
  profile: ProfileScreen,
  studyPlanner: StudyPlannerScreen,
  recentActivity: RecentActivityScreen,
  notifications: NotificationsScreen,
  notes: NotesScreen,
  subscription: SubscriptionScreen,
  walkthrough: WalkthroughScreen,
};

// screens that show the bottom tab bar
const TAB_SCREENS = new Set(["home", "learn", "practice", "performance", "community", "profile"]);

function Shell() {
  const { screen } = useNav();
  const Screen = SCREENS[screen] || WelcomeScreen;
  const showTabs = TAB_SCREENS.has(screen);

  return (
    // grey backdrop centres the phone; delete the frame to ship full-bleed on device
    <div className="app-backdrop" style={{ fontFamily: FONT }}>
      <div className="phone-frame" style={{ background: GRADIENTS.screen,
        position: "relative", display: "flex", flexDirection: "column" }}>
        {/* soft gold glow behind the top of the screen (founder's radial accent) */}
        <div style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220,
          background: GRADIENTS.goldGlow, pointerEvents: "none", zIndex: 0 }} />
        {/* notch */}
        <div style={{ width: 120, height: 26, background: COLORS.navy, borderRadius: "0 0 18px 18px",
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 10 }} />
        <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <StatusBar />
          {/* the active screen */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Screen />
          </div>
          {showTabs && <BottomNav />}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NavProvider initial="welcome">
      <SubjectProvider>
        <ProgressProvider>
          <Shell />
        </ProgressProvider>
      </SubjectProvider>
    </NavProvider>
  );
}
