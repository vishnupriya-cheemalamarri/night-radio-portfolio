import type { Station } from "../data/stations";

type StatusLineProps = {
  station: Station | null;
  frequency: number;
  justConnected: boolean;
};

export default function StatusLine({ station, frequency, justConnected }: StatusLineProps) {
  const freqLabel = frequency.toFixed(1);

  let text: string;
  let color = "text-amber-300";

  if (justConnected) {
    text = "● CONNECTED — NIGHT RADIO 91.5 FM";
  } else if (!station) {
    text = "● SEARCHING…";
  } else if (station.secret) {
    text = `⚠ SIGNAL UNIDENTIFIED — ${freqLabel} FM`;
    color = "text-purple-300";
  } else if (station.name === "Contact") {
    text = `● OPEN CHANNEL — ${freqLabel} FM`;
  } else {
    text = `● SIGNAL LOCKED — ${freqLabel} FM`;
  }

  return (
    <p
      className={`text-xs font-mono tracking-widest ${color}`}
      style={{ textShadow: "0 0 6px #000, 0 0 4px #000" }}
    >
      {text}
    </p>
  );
}