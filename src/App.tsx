import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieNotice from "@/components/site/CookieNotice";
import MetrikaPageView from "@/components/MetrikaPageView";
import { initPhoneTracking } from "@/lib/metrika";
import { ROUTES, NOT_FOUND } from "@/routes";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initPhoneTracking();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MetrikaPageView />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            {/* Список страниц — в src/routes.tsx: он общий для браузера и пререндера */}
            {ROUTES.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<NOT_FOUND.Component />} />
          </Routes>
        </Suspense>
        <CookieNotice />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;