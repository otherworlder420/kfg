import React from "react";

interface DecoProps {
  className?: string;
  opacity?: number;
}

// Rice grain shape - premium gold tones
export const RiceGrain: React.FC<DecoProps> = ({ className = "", opacity = 0.06 }) => (
  <svg viewBox="0 0 40 100" fill="none" className={className} style={{ opacity }}>
    <path d="M20 2 C28 15, 32 40, 32 65 C32 85, 26 98, 20 98 C14 98, 8 85, 8 65 C8 40, 12 15, 20 2Z" fill="#C8A45C" />
    <path d="M20 15 L20 85" stroke="#9A7B3E" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

// Paddy leaf shape - premium gold tones
export const PaddyLeaf: React.FC<DecoProps> = ({ className = "", opacity = 0.05 }) => (
  <svg viewBox="0 0 120 200" fill="none" className={className} style={{ opacity }}>
    <path d="M60 5 C90 40, 110 90, 110 140 C110 170, 85 195, 60 195 C35 195, 10 170, 10 140 C10 90, 30 40, 60 5Z" fill="#C8A45C" />
    <path d="M60 20 L60 185" stroke="#9A7B3E" strokeWidth="1" opacity="0.3" />
    <path d="M60 60 L85 50 M60 90 L90 75 M60 120 L82 110" stroke="#9A7B3E" strokeWidth="0.8" opacity="0.2" />
  </svg>
);

// Angkor Wat silhouette - premium gold
export const AngkorWat: React.FC<DecoProps> = ({ className = "", opacity = 0.04 }) => (
  <svg viewBox="0 0 200 120" fill="none" className={className} style={{ opacity }}>
    <path d="M85 115 L85 50 L95 35 L100 30 L105 35 L115 50 L115 115Z" fill="#C8A45C" />
    <path d="M98 30 L98 15 L100 10 L102 15 L102 30" fill="#C8A45C" />
    <path d="M45 115 L45 70 L52 58 L57 53 L62 58 L70 70 L70 115Z" fill="#C8A45C" />
    <path d="M56 53 L56 42 L57 38 L58 42 L58 53" fill="#C8A45C" />
    <path d="M130 115 L130 70 L138 58 L143 53 L148 58 L155 70 L155 115Z" fill="#C8A45C" />
    <path d="M142 53 L142 42 L143 38 L144 42 L144 53" fill="#C8A45C" />
    <rect x="10" y="100" width="180" height="15" rx="2" fill="#C8A45C" />
    <rect x="5" y="112" width="190" height="6" rx="2" fill="#C8A45C" />
    <path d="M88 115 L88 95 Q100 88 112 95 L112 115Z" fill="#9A7B3E" opacity="0.5" />
  </svg>
);

// Farm hut / stilt house - premium gold tones
export const FarmHut: React.FC<DecoProps> = ({ className = "", opacity = 0.05 }) => (
  <svg viewBox="0 0 160 140" fill="none" className={className} style={{ opacity }}>
    <rect x="20" y="80" width="6" height="55" fill="#C8A45C" />
    <rect x="134" y="80" width="6" height="55" fill="#C8A45C" />
    <rect x="50" y="85" width="5" height="50" fill="#C8A45C" />
    <rect x="105" y="85" width="5" height="50" fill="#C8A45C" />
    <rect x="15" y="50" width="130" height="35" rx="3" fill="#C8A45C" />
    <path d="M5 52 L80 10 L155 52" fill="#C8A45C" />
    <path d="M10 50 L80 12 L150 50" stroke="#9A7B3E" strokeWidth="1" opacity="0.3" />
    <rect x="68" y="65" width="24" height="20" rx="2" fill="#9A7B3E" opacity="0.4" />
    <rect x="30" y="60" width="20" height="15" rx="2" fill="#9A7B3E" opacity="0.3" />
    <rect x="110" y="60" width="20" height="15" rx="2" fill="#9A7B3E" opacity="0.3" />
  </svg>
);

// Scattered decoration component for sections
export const SectionDecoration: React.FC<{ variant?: "rice" | "paddy" | "angkor" | "farm" | "mixed" }> = ({ variant = "mixed" }) => {
  const decorations = [];

  if (variant === "rice" || variant === "mixed") {
    decorations.push(
      <RiceGrain key="rg1" className="absolute top-[10%] right-[5%] w-8 h-20 rotate-12" />,
      <RiceGrain key="rg2" className="absolute top-[40%] left-[3%] w-6 h-16 -rotate-6" opacity={0.04} />,
      <RiceGrain key="rg3" className="absolute bottom-[20%] right-[8%] w-5 h-14 rotate-45" opacity={0.05} />,
    );
  }

  if (variant === "paddy" || variant === "mixed") {
    decorations.push(
      <PaddyLeaf key="pl1" className="absolute top-[5%] left-[8%] w-16 h-28 -rotate-15" />,
      <PaddyLeaf key="pl2" className="absolute bottom-[10%] right-[12%] w-12 h-20 rotate-20" opacity={0.04} />,
    );
  }

  if (variant === "angkor" || variant === "mixed") {
    decorations.push(
      <AngkorWat key="aw1" className="absolute top-[15%] right-[2%] w-32 h-20" />,
      <AngkorWat key="aw2" className="absolute bottom-[5%] left-[5%] w-24 h-14" opacity={0.03} />,
    );
  }

  if (variant === "farm" || variant === "mixed") {
    decorations.push(
      <FarmHut key="fh1" className="absolute top-[60%] right-[3%] w-20 h-18" />,
      <FarmHut key="fh2" className="absolute bottom-[30%] left-[2%] w-16 h-14" opacity={0.04} />,
    );
  }

  return <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">{decorations}</div>;
};

// Botanical rice illustration component for use in sections
export const BotanicalRice: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`${className}`}>
    <img
      src="/images/botanical-rice.jpg"
      alt="Hand-drawn botanical illustration of Oryza sativa"
      className="w-full h-full object-contain rounded-lg opacity-90"
      loading="lazy"
    />
  </div>
);

export default SectionDecoration;
