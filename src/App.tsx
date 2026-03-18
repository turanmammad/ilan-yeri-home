import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import CreateListing from "./pages/CreateListing.tsx";
import Listings from "./pages/Listings.tsx";
import ListingDetail from "./pages/ListingDetail.tsx";
import Shops from "./pages/Shops.tsx";
import Services from "./pages/Services.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Advertising from "./pages/Advertising.tsx";
import { Rules, Safety, Careers, HelpCenter, Complaint, Partnership, Press } from "./pages/StaticPages.tsx";
import ShopDetail from "./pages/ShopDetail.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/qeydiyyat" element={<Register />} />
          <Route path="/hesab/*" element={<Dashboard />} />
          <Route path="/elan-yerleshdir" element={<CreateListing />} />
          <Route path="/elanlar" element={<Listings />} />
          <Route path="/elan/:id" element={<ListingDetail />} />
          <Route path="/magazalar" element={<Shops />} />
          <Route path="/magaza/:id" element={<ShopDetail />} />
          <Route path="/istifadeci/:id" element={<UserProfile />} />
          <Route path="/xidmetler" element={<Services />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="/reklam" element={<Advertising />} />
          <Route path="/qaydalar" element={<Rules />} />
          <Route path="/tehlukesizlik" element={<Safety />} />
          <Route path="/karyera" element={<Careers />} />
          <Route path="/yardim" element={<HelpCenter />} />
          <Route path="/sikayat" element={<Complaint />} />
          <Route path="/terefdashlik" element={<Partnership />} />
          <Route path="/metbuat" element={<Press />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
