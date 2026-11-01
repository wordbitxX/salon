import type { ReactNode } from "react";

/** Keep content visible even when JavaScript or viewport observers are unavailable. */
export default function Reveal({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "article" }) {
  return <Tag className={className}>{children}</Tag>;
}
