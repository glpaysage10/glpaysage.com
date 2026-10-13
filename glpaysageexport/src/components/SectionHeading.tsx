type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          {eyebrow}
        </span>
      )}
      <Heading className="text-3xl font-semibold text-stone-900 sm:text-4xl">{title}</Heading>
      {description && <p className="text-base text-stone-600 sm:text-lg">{description}</p>}
    </div>
  );
}
