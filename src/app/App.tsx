import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { HomePage } from "@/pages/home";
import { PetsPage } from "@/pages/pets";
import { NotFoundPage } from "@/pages/not-found";
import { ErrorBoundary } from "./ui/ErrorBoundary";
import { ScrollManager } from "./router/ScrollManager";

function AppContent() {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary key={pathname}>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </ErrorBoundary>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
