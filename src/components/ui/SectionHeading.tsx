export default function SectionHeading({ eyebrow, title, description, align = "center", as: Tag = "h2" }: { eyebrow: string; title: string; description?: string; align?: "center" | "left"; as?: "h1" | "h2" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <Tag className="h-section mt-3">{title}</Tag>
      {description && <p className="lead mt-4">{description}</p>}
    </div>
  );
}
