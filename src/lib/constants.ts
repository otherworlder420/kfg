// ============================================================
// DESIGN TOKENS & CONSTANTS
// ============================================================
// Centralized animation timing and easing values.
// These map to the design.md specification.
// ============================================================

/** Animation timing tokens (in seconds) */
export const TIMING = {
  fast: 0.2,      // Micro-interactions, color changes
  normal: 0.3,    // Hover states, toggles
  medium: 0.4,    // Card transitions, element reveals
  slow: 0.6,      // Section entrances, major transitions
  entrance: 0.8,  // Scroll-triggered reveals
  stagger: 0.12,  // Delay between staggered items
} as const;

/** GSAP easing definitions mapping design spec to GSAP eases */
export const EASINGS = {
  smooth: "power1.inOut",       // General transitions
  entrance: "power2.out",       // Elements entering viewport
  bounce: "back.out(1.7)",      // Playful elements (checkmarks, badges)
  easeOut: "power2.out",        // Modal openings
  easeInOut: "power1.inOut",    // Symmetric transitions
} as const;

/** Color tokens for reference in JS/TS */
export const COLORS = {
  gold: {
    100: "#F4E8C0",
    300: "#E6C95C",
    500: "#D4AF37",
    700: "#C19313",
    900: "#AA7C11",
  },
  dark: {
    100: "#F2F4F3",
    200: "#E8ECEA",
    300: "#B8C9BF",
    400: "#8A9E92",
    600: "#5C7368",
    700: "#3D5248",
    800: "#2B3A34",
    900: "#1E2A26",
    950: "#1A2421",
  },
  white: "#FFFFFF",
} as const;

/** Section spacing tokens (in pixels) */
export const SPACING = {
  sectionXL: 140,
  sectionL: 100,
  sectionM: 70,
  sectionS: 40,
  gapXL: 60,
  gapL: 40,
  gapM: 24,
  gapS: 16,
  gapXS: 8,
} as const;

/** Responsive breakpoints (in pixels) */
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;
