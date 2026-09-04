
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/PageNotFound";
import BlogPage from "./pages/Blog";
import CatalogPage from "./pages/Catalog";
import AcousticsPage from "./pages/Acoustics";
import CeilingsPage from "./pages/Ceilings";
import BlogPostPage from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import CookieNotice from "@/components/site/CookieNotice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/acoustics" element={<AcousticsPage />} />
          <Route path="/ceilings" element={<CeilingsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieNotice />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;