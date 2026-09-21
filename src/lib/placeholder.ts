/**
 * Deterministic visual fallback system: while a business/town has no real
 * photography yet, every image slot renders a generated seaside gradient
 * scene with the initials of the place, instead of a broken image or a
 * generic grey box.
 */

const PALETTES: Array<{ from: string; to: string; sun: string }> = [
  { from: "#1B3A4B", to: "#2C5268", sun: "#DDA24B" },
  { from: "#B5542C", to: "#DDA24B", sun: "#F2E8D8" },
  { from: "#2A2420", to: "#1B3A4B", sun: "#CC7048" },
  { from: "#0F2A38", to: "#B5542C", sun: "#F0C98A" },
  { from: "#1B3A4B", to: "#B5542C", sun: "#DDA24B" },
];

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function paletteFor(seed: string) {
  const hash = hashSeed(seed);
  return PALETTES[hash % PALETTES.length];
}

/** Sun/moon horizontal position + wave phase, purely decorative variation. */
export function sceneVariantFor(seed: string) {
  const hash = hashSeed(seed);
  return {
    sunX: 25 + (hash % 50),
    waveOffset: hash % 40,
  };
}

export function getInitials(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
