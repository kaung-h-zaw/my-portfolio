import { MotionConfig } from "framer-motion";
import { useState } from "react";
import WelcomeScreen from "./components/os/WelcomeScreen";
import Desktop from "./components/os/OSContainer";
import { readRoute } from "./lib/navigation";

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    if (readRoute().appId) return false;
    try {
      return !sessionStorage.getItem("hasVisitedThisSession");
    } catch {
      return true;
    }
  });

  const handleWelcomeComplete = () => {
    try {
      sessionStorage.setItem("hasVisitedThisSession", "true");
    } catch {
      // Storage can be disabled; entering the portfolio should still work.
    }
    setShowWelcome(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      {!showWelcome && <Desktop />}
    </MotionConfig>
  );
}

export default App;
