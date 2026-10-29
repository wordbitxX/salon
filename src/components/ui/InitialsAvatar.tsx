const TONES = [
  "from-[#f6efe6] via-[#eadfd2] to-[#d9c7b3]",
  "from-[#f7ece7] via-[#efd8cf] to-[#e0bcb0]",
  "from-[#f4f0e7] via-[#e6dcc9] to-[#cdbaa0]",
  "from-[#f6eff0] via-[#ead9dc] to-[#d8b9bf]",
  "from-[#f2f0ea] via-[#e2ddca] to-[#c9c3a6]",
];

const hash = (value: string) => [...value].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 99991, 7);

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

/**
 * Elegant monogram used instead of stock head-shots for the team and client
 * testimonials — no external portraits to break, and it keeps faces off a demo.
 */
export default function InitialsAvatar({
  name,
  className = "",
  textClassName = "text-3xl",
  decorative = false,
}: {
  name: string;
  className?: string;
  textClassName?: string;
  decorative?: boolean;
}) {
  const tone = TONES[hash(name) % TONES.length];
  return (
    <span
      aria-hidden={decorative || undefined}
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-br ${tone} ${className}`}
    >
      <span className={`pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full border border-white/40`} />
      <span className={`pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full border border-white/30`} />
      <span className={`relative font-serif tracking-[0.06em] text-ink/70 ${textClassName}`}>{initialsOf(name)}</span>
    </span>
  );
}
