import { StarIcon } from "../Icons";
export default function Stars({ rating, size = 14, className = "" }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (<StarIcon key={i} width={size} height={size} className={i <= Math.round(rating) ? "text-gold" : "text-sand"} />))}
    </span>
  );
}
