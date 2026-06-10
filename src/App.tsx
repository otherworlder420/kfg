import { HashRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Layout from "@/components/Layout";
import FloatingInquiry from "@/components/FloatingInquiry";
import VideoModal from "@/components/VideoModal";
import HomePage from "@/pages/HomePage";
import RiceVarietiesPage from "@/pages/RiceVarietiesPage";
import ProductDetailPage from "@/pages/products/ProductDetailPage";
import ProcessPage from "@/pages/ProcessPage";
import GlobalReachPage from "@/pages/GlobalReachPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import NewsPage from "@/pages/NewsPage";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
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
        </Layout>
        <FloatingInquiry />
        <VideoModal />
      </HashRouter>
    </AppProvider>
  );
}
