import { FileText } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function FloatingInquiry() {
  const { openQuoteModal } = useApp();

  return (
    <button
      onClick={openQuoteModal}
      className="fixed bottom-6 right-6 z-floating flex items-center gap-2 bg-gold-400 text-white px-5 py-3 rounded-full shadow-gold hover:bg-gold-600 hover:scale-[1.05] active:scale-[0.95] transition-all duration-300"
      aria-label="Send Inquiry"
    >
      <FileText size={20} />
      <span className="text-sm font-medium">Send Inquiry</span>
    </button>
  );
}
