import {
  LayoutDashboard,
  FileText,
  Heart,
  MessageCircle,
  Settings,
  LogOut,
  Eye,
  Phone,
  TrendingUp,
  Clock,
  ChevronRight,
  Star,
  Plus,
  Bell,
  User,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "İdarə paneli", url: "/hesab", icon: LayoutDashboard },
  { title: "Elanlarım", url: "/hesab/elanlar", icon: FileText },
  { title: "Seçilmişlər", url: "/hesab/secilmisler", icon: Heart },
  { title: "Mesajlar", url: "/hesab/mesajlar", icon: MessageCircle },
  { title: "Bildirişlər", url: "/hesab/bildirisler", icon: Bell },
  { title: "Tənzimləmələr", url: "/hesab/tenzimleme", icon: Settings },
];

const stats = [
  { label: "Aktiv elanlar", value: "12", icon: FileText, color: "bg-primary/15 text-primary" },
  { label: "Ümumi baxış", value: "2,847", icon: Eye, color: "bg-emerald-500/15 text-emerald-600" },
  { label: "Zənglər", value: "34", icon: Phone, color: "bg-blue-500/15 text-blue-600" },
  { label: "Seçilmişlər", value: "89", icon: Heart, color: "bg-rose-500/15 text-rose-600" },
];

const recentListings = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", price: "2,100 ₼", views: 342, status: "active", date: "2 gün əvvəl" },
  { id: 2, title: "Samsung Galaxy S24 Ultra", price: "1,850 ₼", views: 218, status: "active", date: "5 gün əvvəl" },
  { id: 3, title: "MacBook Air M2 2023", price: "1,600 ₼", views: 156, status: "pending", date: "1 həftə əvvəl" },
  { id: 4, title: "AirPods Pro 2nd Gen", price: "320 ₼", views: 97, status: "expired", date: "2 həftə əvvəl" },
];

const activities = [
  { text: "iPhone 15 Pro Max elanınıza yeni mesaj gəldi", time: "15 dəq əvvəl", icon: MessageCircle },
  { text: "Samsung Galaxy elanınız 50 dəfə baxıldı", time: "1 saat əvvəl", icon: Eye },
  { text: "MacBook Air elanınız təsdiqləndi", time: "3 saat əvvəl", icon: Star },
  { text: "AirPods Pro elanınızın müddəti bitdi", time: "1 gün əvvəl", icon: Clock },
  { text: "Yeni zəng: iPhone 15 Pro Max", time: "2 gün əvvəl", icon: Phone },
];

function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="pt-4">
        {/* User info */}
        {!collapsed && (
          <div className="px-4 pb-4 mb-2 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Əli Həsənov</p>
                <p className="text-xs text-muted-foreground truncate">ali@email.com</p>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-secondary/80"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto pb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" className="hover:bg-secondary/80 text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Çıxış</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    expired: "bg-muted/40 text-muted-foreground",
  };
  const labels: Record<string, string> = {
    active: "Aktiv",
    pending: "Gözləmədə",
    expired: "Bitib",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[status] || ""}`}>
      {labels[status] || status}
    </span>
  );
}

function DashboardContent() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      {/* Top bar */}
      <header className="h-14 flex items-center justify-between border-b border-border bg-card px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h2 className="text-lg font-bold text-foreground">İdarə paneli</h2>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-xl text-sm hover:brightness-95 active:scale-95 transition-all">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Yeni elan</span>
        </button>
      </header>

      <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Recent listings */}
          <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-card">
            <div className="flex items-center justify-between p-5 pb-3">
              <h3 className="font-bold text-foreground">Son elanlar</h3>
              <a href="#" className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5">
                Hamısı <ChevronRight className="w-3 h-3" />
              </a>
            </div>
            <div className="divide-y divide-border">
              {recentListings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/40 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{listing.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {listing.views} baxış · {listing.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <StatusBadge status={listing.status} />
                    <span className="text-sm font-bold text-foreground">{listing.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-card">
            <div className="p-5 pb-3">
              <h3 className="font-bold text-foreground">Son aktivlik</h3>
            </div>
            <div className="divide-y divide-border">
              {activities.map((act, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <act.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-foreground leading-snug">{act.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const Dashboard = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <DashboardSidebar />
      <DashboardContent />
    </div>
  </SidebarProvider>
);

export default Dashboard;
