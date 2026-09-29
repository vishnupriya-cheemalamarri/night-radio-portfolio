import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Dial from "./components/Dial";
import StaticNoise from "./components/StaticNoise";
import WelcomeScreen from "./components/WelcomeScreen";
import Footer from "./components/Footer";
import StatusLine from "./components/StatusLine";
import RadioCasing from "./components/RadioCasing";
import PlainView from "./components/PlainView";
import { stations } from "./data/stations";
import { getSignal } from "./utils/signal";
import { useAmbientAudio } from "./hooks/useAmbientAudio";

export default function App() {
  const [frequency, setFrequency] = useState(98.0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [justConnected, setJustConnected] = useState(false);
  const [plainMode, setPlainMode] = useState(false);
  const { station, strength } = getSignal(frequency, stations);
  const { start } = useAmbientAudio(strength);

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    start(); // kick off audio right as they "tune in" — same user gesture
    setJustConnected(true);
    setTimeout(() => setJustConnected(false), 2500);
  };

  if (plainMode) {
    return <PlainView onBackToRadio={() => setPlainMode(false)} />;
  }

  return (
    <div
      className="relative min-h-screen bg-black flex flex-col items-center justify-center gap-10 overflow-hidden"
      onPointerDown={start}
    >
      <WelcomeScreen visible={showWelcome} onDismiss={handleDismissWelcome} />

      <StaticNoise strength={strength} />

      <button
        onClick={() => setPlainMode(true)}
        className="absolute top-4 right-4 z-20 text-amber-300 text-xs underline underline-offset-4"
        style={{ textShadow: "0 0 6px #000, 0 0 6px #000" }}
      >
        Prefer a quick scroll? →
      </button>

      <div className="relative z-10 min-h-[12rem] flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {station ? (
            <motion.div
              key={station.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: strength }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ textShadow: "0 0 12px #fbbf24, 0 0 24px #fbbf2455" }}
            >
              {station.render()}
            </motion.div>
          ) : (
            <motion.p
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-amber-300 font-mono tracking-widest"
              style={{ textShadow: "0 0 8px #000, 0 0 4px #000" }}
            >
              …searching…
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 w-full px-4">
        <RadioCasing strength={strength}>
          <Dial frequency={frequency} onChange={setFrequency} />
        </RadioCasing>
        <StatusLine
          station={station}
          frequency={frequency}
          justConnected={justConnected}
        />
      </div>

      <Footer />
    </div>
  );
}