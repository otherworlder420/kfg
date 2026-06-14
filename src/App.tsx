import { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Layout from "@/components/Layout";
import FloatingInquiry from "@/components/FloatingInquiry";
import VideoModal from "@/components/VideoModal";

// Eagerly load the home page for fastest first paint
import HomePage from "@/pages/HomePage";

// Lazy load secondary routes to reduce initial bundle
const RiceVarietiesPage = lazy(() => import("@/pages/RiceVarietiesPage"));
const ProductDetailPage = lazy(() => import("@/pages/products/ProductDetailPage"));
const ProcessPage = lazy(() => import("@/pages/ProcessPage"));
const GlobalReachPage = lazy(() => import("@/pages/GlobalReachPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NewsPage = lazy(() => import("@/pages/NewsPage"));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rice-varieties" element={<RiceVarietiesPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/global-reach" element={<GlobalReachPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </Layout>
        <FloatingInquiry />
        <VideoModal />
      </HashRouter>
    </AppProvider>
  );
}
