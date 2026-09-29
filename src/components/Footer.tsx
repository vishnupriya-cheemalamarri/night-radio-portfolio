export default function Footer() {
  const shadow = { textShadow: "0 0 6px #000, 0 0 4px #000" };

  return (
    <div className="relative z-10 text-center pb-6 pt-2">
      <p className="text-amber-300 text-xs tracking-[0.3em] font-mono" style={shadow}>
        NIGHT RADIO — END OF TRANSMISSION
      </p>
      <p className="text-amber-100 text-xs mt-1 italic" style={shadow}>
        Thanks for staying on the frequency. Until next time.
      </p>
      <p className="text-amber-400 text-xs mt-2 font-mono" style={shadow}>
        ● SIGNAL STABLE
      </p>
    </div>
  );
}