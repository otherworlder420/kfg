export default function WorldMapSVG() {
  return (
    <svg
      viewBox="0 0 1000 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
    >
      {/* Simplified world map paths */}
      <g stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.6">
        {/* North America */}
        <path d="M120 80 Q180 60 250 90 Q300 110 320 160 Q310 200 270 220 Q220 230 180 210 Q140 190 130 150 Q110 110 120 80Z" />
        {/* South America */}
        <path d="M220 260 Q260 250 290 280 Q310 320 300 370 Q280 420 250 440 Q220 430 210 380 Q200 330 210 290 Q215 270 220 260Z" />
        {/* Europe */}
        <path d="M450 70 Q500 55 550 75 Q580 95 570 130 Q550 150 510 145 Q470 140 450 110 Q440 90 450 70Z" />
        {/* Africa */}
        <path d="M460 170 Q520 155 570 190 Q600 240 590 300 Q570 370 530 390 Q490 380 470 330 Q450 280 450 230 Q455 190 460 170Z" />
        {/* Asia */}
        <path d="M600 60 Q700 40 800 80 Q880 120 860 180 Q820 220 750 200 Q680 180 640 150 Q600 120 590 90 Q595 70 600 60Z" />
        {/* India */}
        <path d="M640 160 Q680 150 700 180 Q710 220 690 260 Q660 270 640 240 Q630 200 640 160Z" />
        {/* Southeast Asia / Oceania */}
        <path d="M720 220 Q780 210 830 250 Q860 290 840 340 Q800 370 750 350 Q710 320 710 270Q715 240 720 220Z" />
        {/* Australia */}
        <path d="M780 360 Q850 340 900 370 Q920 410 890 440 Q840 460 790 440 Q760 410 770 380Q778 365 780 360Z" />
      </g>

      {/* Export route dotted lines */}
      <g stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4">
        {/* Route to Middle East */}
        <path d="M660 200 Q620 180 560 160 Q520 140 500 120">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
        </path>
        {/* Route to Europe */}
        <path d="M660 180 Q600 150 540 110 Q510 90 490 85">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.5s" repeatCount="indefinite" />
        </path>
        {/* Route to Africa */}
        <path d="M660 220 Q610 240 560 280 Q530 310 520 330">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.2s" repeatCount="indefinite" />
        </path>
        {/* Route to Southeast Asia */}
        <path d="M700 200 Q740 210 780 230 Q820 250 840 270">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.8s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Destination dots */}
      <g fill="#D4AF37">
        <circle cx="500" cy="120" r="4" opacity="0.8">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="490" cy="85" r="4" opacity="0.8">
          <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="520" cy="330" r="4" opacity="0.8">
          <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="840" cy="270" r="4" opacity="0.8">
          <animate attributeName="r" values="4;6;4" dur="1.8s" repeatCount="indefinite" />
        </circle>
        {/* Origin dot */}
        <circle cx="660" cy="200" r="5" opacity="1">
          <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
