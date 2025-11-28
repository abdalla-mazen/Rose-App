export default function getUniqueColor(name: string) {
  // Generate a hue based on the first character's char code (modulo 360 for valid HSL)
  const hue = (name.charCodeAt(0) * 137.5) % 360; // 137.5 is a prime-ish number for better distribution
  return `hsl(${hue}, 70%, 50%)`; // Fixed saturation and lightness for consistency
}
