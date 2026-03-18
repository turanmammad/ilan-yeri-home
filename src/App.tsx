import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ScrollToTop } from "@/components/ScrollToTop";
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
import ServiceDetail from "./pages/ServiceDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminListings from "./pages/admin/AdminListings.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import AdminShops from "./pages/admin/AdminShops.tsx";
import AdminReports from "./pages/admin/AdminReports.tsx";
import AdminMessages from "./pages/admin/AdminMessages.tsx";
import AdminBlocklist from "./pages/admin/AdminBlocklist.tsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.tsx";
import AdminPayments from "./pages/admin/AdminPayments.tsx";
import AdminCampaigns from "./pages/admin/AdminCampaigns.tsx";
import AdminAI from "./pages/admin/AdminAI.tsx";
import AdminSystem from "./pages/admin/AdminSystem.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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

            {/* Admin panel */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="elanlar" element={<AdminListings />} />
              <Route path="istifadeciler" element={<AdminUsers />} />
              <Route path="magazalar" element={<AdminShops />} />
              <Route path="sikayetler" element={<AdminReports />} />
              <Route path="mesajlar" element={<AdminMessages />} />
              <Route path="blok" element={<AdminBlocklist />} />
              <Route path="analitika" element={<AdminAnalytics />} />
              <Route path="odenisler" element={<AdminPayments />} />
              <Route path="kampaniyalar" element={<AdminCampaigns />} />
              <Route path="ai" element={<AdminAI />} />
              <Route path="sistem" element={<AdminSystem />} />
              <Route path="tenzimleme" element={<AdminSettings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileBottomNav />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
