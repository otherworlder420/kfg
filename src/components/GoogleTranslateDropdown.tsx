import { Check } from "lucide-react";
import { useGoogleTranslate } from "@/hooks/useGoogleTranslate";

interface Props {
  onSelect?: () => void;
}

const LANGUAGES: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "km", label: "ខ្មែរ" },
  { code: "zh-CN", label: "中文（简体）" },
  { code: "zh-TW", label: "中文（繁體）" },
  { code: "tl", label: "Filipino" },
  { code: "ms", label: "Melayu" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ar", label: "العربية" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "nl", label: "Nederlands" },
  { code: "pl", label: "Polski" },
  { code: "ro", label: "Română" },
  { code: "el", label: "Ελληνικά" },
  { code: "cs", label: "Čeština" },
  { code: "hu", label: "Magyar" },
  { code: "sv", label: "Svenska" },
  { code: "bg", label: "Български" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Suomi" },
  { code: "sk", label: "Slovenčina" },
  { code: "lt", label: "Lietuvių" },
  { code: "lv", label: "Latviešu" },
  { code: "sl", label: "Slovenščina" },
  { code: "et", label: "Eesti" },
  { code: "ga", label: "Gaeilge" },
  { code: "mt", label: "Malti" },
  { code: "hr", label: "Hrvatski" },
];

export default function GoogleTranslateDropdown({ onSelect }: Props) {
  const { currentLang, translate } = useGoogleTranslate();

  const handleClick = (code: string) => {
    if (code === "en") {
      // Method 1: Try Google Translate's native restore() API
      const gt = (window as any).google?.translate;
      if (gt?.TranslateElement) {
        // Try to find and call restore on the widget instance
        const Telem = gt.TranslateElement;
        if (Telem?.instances) {
          for (const key in Telem.instances) {
            const inst = Telem.instances[key];
            if (typeof inst?.restore === "function") {
              inst.restore();
              // Also clear cookies so it stays on next page
              document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
              document.cookie = `googtrans=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
              document.cookie = `googtrans=;path=/;domain=.${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
              onSelect?.();
              return;
            }
          }
        }
        // Try the static restore method
        if (typeof Telem?.restore === "function") {
          Telem.restore();
          document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie = `googtrans=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          document.cookie = `googtrans=;path=/;domain=.${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          onSelect?.();
          return;
        }
      }

      // Method 2: Use the combo select to trigger restore
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (combo) {
        combo.value = "en";
        combo.dispatchEvent(new Event("change"));
        // Clear cookies so it doesn't re-translate on next page
        document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = `googtrans=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `googtrans=;path=/;domain=.${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        onSelect?.();
        return;
      }

      // Method 3: Full cookie cleanup + reload (fallback)
      const host = window.location.hostname;
      document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = `googtrans=;path=/;domain=${host};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `googtrans=;path=/;domain=.${host};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      localStorage.removeItem("googtrans");
      sessionStorage.removeItem("googtrans");
      window.location.reload();
      return;
    }
    translate(code);
    onSelect?.();
  };

  return (
    <div className="notranslate" translate="no">
      <p className="text-xs text-dark-500 mb-3 font-medium">Select language:</p>
      <div className="max-h-64 overflow-y-auto pr-1">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleClick(lang.code)}
            className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              currentLang === lang.code || (currentLang === "zh" && (lang.code === "zh-CN" || lang.code === "zh-TW"))
                ? "bg-gold-50 text-gold-600 font-medium"
                : "text-dark-700 hover:bg-cream-200"
            }`}
          >
            <span>{lang.label}</span>
            {currentLang === lang.code && <Check size={14} className="text-gold-500" />}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-dark-400 mt-3 pt-2 border-t border-dark-200 leading-relaxed">
        Translated automatically by Google Translate. May not be 100% accurate.
      </p>
    </div>
  );
}
