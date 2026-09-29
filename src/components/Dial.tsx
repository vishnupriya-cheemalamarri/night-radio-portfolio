import { useRef, useState, useCallback } from "react";
import { stations } from "../data/stations";

const MIN_FREQ = 88;
const MAX_FREQ = 108;

type DialProps = {
  frequency: number;
  onChange: (freq: number) => void;
};

export default function Dial({ frequency, onChange }: DialProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const updateFromPointer = useCallback(
    (e: React.PointerEvent) => {
      const band = bandRef.current;
      if (!band) return;
      const rect = band.getBoundingClientRect();
      let percent = (e.clientX - rect.left) / rect.width;
      percent = Math.min(1, Math.max(0, percent));
      const freq = MIN_FREQ + percent * (MAX_FREQ - MIN_FREQ);
      onChange(Math.round(freq * 10) / 10);
    },
    [onChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromPointer(e);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    (e.target as Element).releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  const needlePercent = ((frequency - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * 100;

  return (
    <div
      ref={bandRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative h-14 w-full max-w-[600px] bg-neutral-950 rounded-sm cursor-pointer select-none touch-none"
    >
      {/* Tick marks for visible stations only */}
      {stations
        .filter((s) => !s.secret)
        .map((s) => {
          const tickPercent = ((s.freq - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * 100;
          return (
            <div
              key={s.name}
              className="absolute top-0 h-full w-px bg-amber-500/30"
              style={{ left: `${tickPercent}%` }}
            />
          );
        })}

      {/* Needle */}
      <div
        className="absolute top-0 h-full w-1 bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.7)]"
        style={{ left: `${needlePercent}%` }}
      />
    </div>
  );
}