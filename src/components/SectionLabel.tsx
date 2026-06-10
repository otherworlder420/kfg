interface SectionLabelProps {
  label: string;
  light?: boolean;
}

export default function SectionLabel({ label, light = false }: SectionLabelProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className={`w-2 h-2 ${light ? "bg-gold-400" : "bg-gold-400"}`} />
      <span
        className={`text-xs font-medium uppercase tracking-[0.1em] ${
          light ? "text-gold-400" : "text-gold-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
