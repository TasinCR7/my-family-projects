import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Members from "@/pages/Members";
import Plans from "@/pages/Plans";
import SuccessTracker from "@/pages/SuccessTracker";
import Expenses from "@/pages/Expenses";
import LandManagement from "@/pages/LandManagement";
import FamilyTree from "@/pages/FamilyTree";
import ComingSoon from "@/pages/ComingSoon";
import Gallery from "@/pages/Gallery";
import Vault from "@/pages/Vault";
import Notices from "@/pages/Notices";
import Voting from "@/pages/Voting";
import Events from "@/pages/Events";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/success" element={<SuccessTracker />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/land" element={<LandManagement />} />
            <Route path="/family-tree" element={<FamilyTree />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/documents" element={<Vault />} />
            <Route path="/events" element={<Events />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/voting" element={<Voting />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
