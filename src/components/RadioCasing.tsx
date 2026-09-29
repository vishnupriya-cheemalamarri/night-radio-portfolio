import type { ReactNode } from "react";

type RadioCasingProps = {
  strength: number;
  children: ReactNode; // the Dial goes here
};

export default function RadioCasing({ strength, children }: RadioCasingProps) {
  return (
    <div
      className="relative rounded-2xl p-6 w-full max-w-[680px] mx-auto"
      style={{
        background: "linear-gradient(160deg, #2b2018 0%, #1a130d 60%, #120d09 100%)",
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Two decorative knobs */}
      <div className="flex justify-between px-2 mb-4">
        <div
          className="w-8 h-8 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, #4a3626, #1a130d)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        />
        <div
          className="w-8 h-8 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, #4a3626, #1a130d)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      {/* Dial window — glowing "glass" panel */}
      <div
        className="rounded-lg p-3 mb-5 transition-shadow duration-300"
        style={{
          background: "#0a0806",
          boxShadow: `inset 0 2px 6px rgba(0,0,0,0.8), 0 0 ${
            10 + strength * 30
          }px ${strength * 8}px rgba(251,191,36,${0.15 + strength * 0.35})`,
        }}
      >
        {children}
      </div>

      {/* Speaker grille */}
      <div className="grid grid-cols-12 gap-1.5 px-2 pb-1">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-opacity duration-150"
            style={{
              background: "#050403",
              opacity: 0.5 + Math.random() * strength * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}