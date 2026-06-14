import { useState, useEffect, useCallback, useRef } from "react";

export const LANGUAGE_MAP: Record<string, string> = {
  km: "KM",
  en: "EN",
  "zh-CN": "CN",
  "zh-TW": "TW",
  tl: "TL",
  ms: "MS",
  id: "ID",
  ar: "AR",
  de: "DE",
  fr: "FR",
  it: "IT",
  es: "ES",
  pt: "PT",
  nl: "NL",
  pl: "PL",
  ro: "RO",
  el: "EL",
  cs: "CS",
  hu: "HU",
  sv: "SV",
  bg: "BG",
  da: "DA",
  fi: "FI",
  sk: "SK",
  lt: "LT",
  lv: "LV",
  sl: "SL",
  et: "ET",
  ga: "GA",
  mt: "MT",
  hr: "HR",
};

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^|;)\\s*" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function getLangFromCookie(): string {
  const val = readCookie("googtrans");
  if (!val) return "en";
  const parts = val.split("/");
  const lang = parts[parts.length - 1] || "en";
  return lang === "zh-CN" || lang === "zh-TW" ? lang : lang.split("-")[0];
}

function setTransCookie(lang: string) {
  const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
  const value = lang === "en" ? "" : `/en/${lang}`;
  const host = window.location.hostname;
  // Clear first
  document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `googtrans=;path=/;domain=${host};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  if (lang !== "en") {
    document.cookie = `googtrans=${value};path=/;expires=${expires}`;
    document.cookie = `googtrans=${value};path=/;domain=${host};expires=${expires}`;
  }
}

// Load Google Translate script once
let scriptLoaded = false;
function loadGTScript(): Promise<void> {
  return new Promise((resolve) => {
    if (scriptLoaded || (window as any).google?.translate?.TranslateElement) {
      resolve();
      return;
    }
    (window as any).googleTranslateElementInit = () => {
      scriptLoaded = true;
      resolve();
    };
    const existing = document.querySelector('script[src*="translate.google.com"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&hl=en&layout=none";
      script.async = true;
      document.body.appendChild(script);
    }
    // Timeout fallback
    setTimeout(resolve, 3000);
  });
}

interface UseGoogleTranslateOptions {
  loadOnMount?: boolean;
}

export function useGoogleTranslate(options: UseGoogleTranslateOptions = {}) {
  const { loadOnMount = false } = options;
  const [currentLang, setCurrentLang] = useState(getLangFromCookie);
  const [isLoaded, setIsLoaded] = useState(false);
  const comboRef = useRef<HTMLSelectElement | null>(null);

  const initialize = useCallback(async () => {
    if (isLoaded) return;

    await loadGTScript();
    const gt = (window as any).google?.translate;
    if (!gt?.TranslateElement) return;

    // Create hidden container
    let hiddenDiv = document.getElementById("gt_hidden_container");
    if (!hiddenDiv) {
      hiddenDiv = document.createElement("div");
      hiddenDiv.id = "gt_hidden_container";
      hiddenDiv.style.display = "none";
      document.body.appendChild(hiddenDiv);
    }

    // Initialize if not already
    if (!hiddenDiv.dataset.initialized) {
      new gt.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: Object.keys(LANGUAGE_MAP).join(","),
          layout: gt.TranslateElement.InlineLayout.NONE,
        },
        hiddenDiv
      );
      hiddenDiv.dataset.initialized = "true";
    }

    // Find the select element
    const waitForCombo = () => {
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (combo) {
        comboRef.current = combo;
        // Restore translation from cookie
        const savedLang = getLangFromCookie();
        if (savedLang !== "en" && combo.value !== savedLang) {
          combo.value = savedLang;
          combo.dispatchEvent(new Event("change"));
          setCurrentLang(savedLang);
        }
      } else {
        setTimeout(waitForCombo, 200);
      }
    };
    waitForCombo();

    setIsLoaded(true);
  }, [isLoaded]);

  // Load on mount only when requested (e.g. inside the language dropdown)
  useEffect(() => {
    if (loadOnMount) {
      initialize();
    }
  }, [loadOnMount, initialize]);

  // Poll cookie for changes (from other tabs, etc.)
  useEffect(() => {
    let last = readCookie("googtrans");
    const interval = setInterval(() => {
      const now = readCookie("googtrans");
      if (now !== last) {
        last = now;
        const lang = getLangFromCookie();
        setCurrentLang(lang);
        // Sync combo if needed
        if (comboRef.current && comboRef.current.value !== lang) {
          comboRef.current.value = lang;
          comboRef.current.dispatchEvent(new Event("change"));
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const translate = useCallback((lang: string) => {
    setCurrentLang(lang);

    if (lang === "en") {
      // Try Google's native restore() first
      const gt = (window as any).google?.translate;
      if (gt?.TranslateElement) {
        const Telem = gt.TranslateElement;
        if (Telem?.instances) {
          for (const key in Telem.instances) {
            const inst = Telem.instances[key];
            if (typeof inst?.restore === "function") {
              inst.restore();
              setTransCookie("en");
              return;
            }
          }
        }
        if (typeof Telem?.restore === "function") {
          Telem.restore();
          setTransCookie("en");
          return;
        }
      }
      // Fallback: use combo
      setTransCookie("en");
      const restoreCombo = () => {
        const combo = comboRef.current || document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (combo) {
          comboRef.current = combo;
          combo.value = "";
          combo.dispatchEvent(new Event("change"));
        } else {
          setTimeout(restoreCombo, 300);
        }
      };
      restoreCombo();
      return;
    }

    // Other languages: set cookie + use combo
    setTransCookie(lang);
    const trigger = () => {
      const combo = comboRef.current || document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (combo) {
        comboRef.current = combo;
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
      } else {
        setTimeout(trigger, 300);
      }
    };
    trigger();
  }, []);

  const displayCode = LANGUAGE_MAP[currentLang] || "EN";

  return { currentLang, displayCode, translate, isLoaded, initialize };
}
