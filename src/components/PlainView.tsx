import { stations } from "../data/stations";

type PlainViewProps = {
  onBackToRadio: () => void;
};

export default function PlainView({ onBackToRadio }: PlainViewProps) {
  const visibleStations = stations.filter((s) => !s.secret);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-16">
        <button
          onClick={onBackToRadio}
          className="text-amber-400/70 hover:text-amber-300 text-sm underline underline-offset-4"
        >
          ← Back to Night Radio
        </button>

        {visibleStations.map((station) => (
          <section key={station.name}>{station.render()}</section>
        ))}
      </div>
    </div>
  );
}