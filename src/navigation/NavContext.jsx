// ============================================================================
// navigation/NavContext.jsx
// A tiny navigation layer so each screen can move to another screen by name
// WITHOUT pulling in react-router. Kept deliberately small so screens stay
// independent files (easy for the team to work on in parallel on GitHub).
//
// Usage inside any screen:
//   const { navigate, goBack, params } = useNav();
//   navigate("videoPlayer", { lessonId: 3 });
// ============================================================================

import { createContext, useContext, useState, useCallback } from "react";

const NavContext = createContext(null);

export function NavProvider({ initial = "welcome", children }) {
  // history is a stack of { screen, params } so goBack() works naturally.
  const [history, setHistory] = useState([{ screen: initial, params: {} }]);
  const current = history[history.length - 1];

  const navigate = useCallback((screen, params = {}) => {
    setHistory((h) => [...h, { screen, params }]);
  }, []);

  const goBack = useCallback(() => {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  }, []);

  // switchTab replaces the current view (used by the bottom nav) so tabs don't
  // pile up in the back stack.
  const switchTab = useCallback((screen) => {
    setHistory([{ screen, params: {} }]);
  }, []);

  const value = {
    screen: current.screen,
    params: current.params,
    navigate,
    goBack,
    switchTab,
    canGoBack: history.length > 1,
  };
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside <NavProvider>");
  return ctx;
}
