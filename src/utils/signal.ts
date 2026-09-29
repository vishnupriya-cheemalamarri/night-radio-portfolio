import type { Station } from "../data/stations";

const RANGE = 1.0;
const SECRET_RANGE = 0.3; // much tighter — must be nearly exact

export function getSignal(frequency: number, stations: Station[]) {
  let nearest: Station | null = null;
  let minDistance = Infinity;

  for (const station of stations) {
    const distance = Math.abs(frequency - station.freq);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = station;
    }
  }

  if (!nearest) return { station: null, strength: 0 };

  const range = nearest.secret ? SECRET_RANGE : RANGE;
  let strength = 1 - minDistance / range;
  strength = Math.min(1, Math.max(0, strength));

  // Secret stations flicker instead of holding steady
  if (nearest.secret && strength > 0) {
    strength *= 0.7 + Math.random() * 0.3;
  }

  return { station: strength > 0 ? nearest : null, strength };
}