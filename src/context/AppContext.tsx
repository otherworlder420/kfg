import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface AppContextType {
  isQuoteModalOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
  isVideoModalOpen: boolean;
  openVideoModal: () => void;
  closeVideoModal: () => void;
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  isScrolled: boolean;
  setIsScrolled: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const openQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <AppContext.Provider
      value={{
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        isVideoModalOpen,
        openVideoModal,
        closeVideoModal,
        isMobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        isScrolled,
        setIsScrolled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
