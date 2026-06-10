// ============================================================
// SHARED GSAP ANIMATION PRESETS
// ============================================================
// Reusable animation configurations for consistent motion.
// All animations use GPU-accelerated properties (transform, opacity).
// ============================================================

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASINGS, TIMING } from "./constants";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- ScrollTrigger Reveal Animation ---

interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  stagger?: number;
  once?: boolean;
}

/**
 * Apply a scroll-triggered fade-in-up animation to elements.
 * @param targets - GSAP targets (selector string, Element, or Array)
 * @param options - Animation options
 */
export function scrollReveal(
  targets: gsap.TweenTarget,
  options: RevealOptions = {}
) {
  const {
    y = 30,
    duration = TIMING.entrance,
    delay = 0,
    ease = EASINGS.entrance,
    start = "top 85%",
    stagger = 0,
    once = true,
  } = options;

  const config: gsap.TweenVars = {
    opacity: 0,
    y,
    duration,
    delay,
    ease,
    stagger: stagger > 0 ? stagger : undefined,
    scrollTrigger: {
      trigger: stagger > 0 ? (targets as Element).parentElement || (targets as Element) : (targets as Element),
      start,
      once,
    },
  };

  return gsap.from(targets, config);
}

/**
 * Apply a scroll-triggered fade-in animation (no Y translation).
 */
export function scrollFadeIn(
  targets: gsap.TweenTarget,
  options: Omit<RevealOptions, "y"> = {}
) {
  const { duration = TIMING.entrance, delay = 0, ease = EASINGS.smooth, start = "top 85%", once = true } = options;

  return gsap.from(targets, {
    opacity: 0,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: targets as Element,
      start,
      once,
    },
  });
}

/**
 * Animate a number counting up from 0 to target value.
 * @param element - The DOM element to update
 * @param target - The final numeric value
 * @param options - Animation options
 */
export function countUp(
  element: HTMLElement,
  target: number,
  options: { duration?: number; suffix?: string; decimals?: number } = {}
) {
  const { duration = 2, suffix = "", decimals = 0 } = options;
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: target,
    duration,
    ease: "power1.out",
    snap: decimals === 0 ? { value: 1 } : undefined,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
    onUpdate: () => {
      if (element) {
        element.textContent =
          (decimals > 0 ? obj.value.toFixed(decimals) : Math.round(obj.value).toString()) + suffix;
      }
    },
  });
}

/**
 * Apply parallax effect to an element.
 * @param element - The element to parallax
 * @param speed - Parallax speed factor (0.5 = half speed, creating depth)
 */
export function parallax(element: HTMLElement, speed: number = 0.5) {
  return gsap.to(element, {
    yPercent: -30 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element.parentElement,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/**
 * Staggered reveal for a group of child elements.
 * @param parent - Parent container element
 * @param childSelector - Selector for children to animate
 * @param options - Animation options
 */
export function staggerReveal(
  parent: HTMLElement,
  childSelector: string,
  options: RevealOptions = {}
) {
  const {
    y = 30,
    duration = TIMING.entrance,
    stagger = TIMING.stagger,
    ease = EASINGS.entrance,
    start = "top 85%",
  } = options;

  const children = parent.querySelectorAll(childSelector);
  if (children.length === 0) return null;

  return gsap.from(children, {
    opacity: 0,
    y,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: parent,
      start,
      once: true,
    },
  });
}

/**
 * Create a GSAP timeline for the hero entrance sequence.
 * @param container - Hero container element
 */
export function heroEntranceTimeline(container: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: EASINGS.entrance } });

  const label = container.querySelector(".hero-label");
  const line = container.querySelector(".hero-line");
  const title = container.querySelector(".hero-title");
  const desc = container.querySelector(".hero-desc");
  const buttons = container.querySelectorAll(".hero-btn");
  const indicator = container.querySelector(".hero-indicator");

  tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.2)
    .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, 0.3)
    .fromTo(title, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0 }, 0.5)
    .fromTo(desc, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
    .fromTo(
      buttons,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      0.9
    );

  if (indicator) {
    tl.fromTo(indicator, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.5);
  }

  return tl;
}

/**
 * Create a timeline for opening the quote modal.
 * @param overlay - Overlay element
 * @param panel - Modal panel element
 * @param fields - Form field elements
 */
export function openModalTimeline(
  overlay: HTMLElement,
  panel: HTMLElement,
  fields: HTMLElement[]
) {
  const tl = gsap.timeline();

  tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    .fromTo(
      panel,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.5, ease: EASINGS.easeOut },
      "-=0.2"
    )
    .fromTo(
      fields,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
      "-=0.3"
    );

  return tl;
}

/**
 * Create a timeline for closing the quote modal.
 */
export function closeModalTimeline(
  overlay: HTMLElement,
  panel: HTMLElement
) {
  const tl = gsap.timeline();

  tl.to(panel, { opacity: 0, y: 40, duration: 0.3, ease: "power2.in" })
    .to(overlay, { opacity: 0, duration: 0.3 }, "-=0.15");

  return tl;
}

/**
 * Refresh all ScrollTrigger instances.
 * Call after dynamic content changes or window resize.
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTrigger instances.
 * Call on component unmount to prevent memory leaks.
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}
