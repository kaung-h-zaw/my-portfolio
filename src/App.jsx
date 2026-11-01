import { MotionConfig } from "framer-motion";
import { useState } from "react";
import WelcomeScreen from "./components/os/WelcomeScreen";
import Desktop from "./components/os/OSContainer";

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem("hasVisitedThisSession");
  });

  const handleWelcomeComplete = () => {
    sessionStorage.setItem("hasVisitedThisSession", "true");
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
