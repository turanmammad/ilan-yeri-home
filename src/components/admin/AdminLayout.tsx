import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, Flag, Settings, LogOut,
  ChevronLeft, ChevronRight, Bell, Search, Menu, X,
  TrendingUp, ShoppingBag, MessageCircle, Shield,
  User, KeyRound, Mail,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { CreditCard, Megaphone, Bot, Server, Crown, Sparkles, BarChart3 } from "lucide-react";

const navSections = [
  {
    label: "Əsas",
    items: [
      { icon: LayoutDashboard, label: "İdarə paneli", path: "/admin" },
      { icon: FileText, label: "Elanlar", path: "/admin/elanlar" },
      { icon: Users, label: "İstifadəçilər", path: "/admin/istifadeciler" },
      { icon: ShoppingBag, label: "Mağazalar", path: "/admin/magazalar" },
    ],
  },
  {
    label: "Moderasiya",
    items: [
      { icon: Flag, label: "Şikayətlər", path: "/admin/sikayetler" },
      { icon: MessageCircle, label: "Mesajlar", path: "/admin/mesajlar" },
      { icon: Shield, label: "Blok siyahısı", path: "/admin/blok" },
    ],
  },
  {
    label: "Maliyyə & Reklam",
    items: [
      { icon: CreditCard, label: "Ödənişlər", path: "/admin/odenisler" },
      { icon: Megaphone, label: "Kampaniyalar", path: "/admin/kampaniyalar" },
      { icon: Crown, label: "Premium & VIP", path: "/admin/premium" },
      { icon: Sparkles, label: "Sponsor & Reklam", path: "/admin/sponsor" },
    ],
  },
  {
    label: "Sistem",
    items: [
      { icon: TrendingUp, label: "Analitika", path: "/admin/analitika" },
      { icon: Crown, label: "Top İstifadəçilər", path: "/admin/top-istifadeciler" },
      { icon: Bot, label: "AI Düzəltmələr", path: "/admin/ai" },
      { icon: Server, label: "Sistem vəziyyəti", path: "/admin/sistem" },
      { icon: Settings, label: "Tənzimləmələr", path: "/admin/tenzimleme" },
    ],
  },
];

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-2 pl-2 border-l border-border ml-1">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">A</span>
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-foreground leading-tight">Admin</p>
          <p className="text-[10px] text-muted-foreground leading-tight">admin@ucuztap.az</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card rounded-xl border border-border shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">A</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">admin@ucuztap.az</p>
              </div>
            </div>
          </div>
          <div className="p-1.5">
            <Link to="/admin/tenzimleme?tab=profile" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
              <User className="w-4 h-4 text-muted-foreground" />
              Profil məlumatları
            </Link>
            <Link to="/admin/tenzimleme?tab=password" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
              <KeyRound className="w-4 h-4 text-muted-foreground" />
              Şifrə dəyişdir
            </Link>
            <Link to="/admin/tenzimleme?tab=notifications" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
              <Mail className="w-4 h-4 text-muted-foreground" />
              Bildiriş tənzimləmələri
            </Link>
            <Link to="/admin/tenzimleme?tab=platform" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
              <Settings className="w-4 h-4 text-muted-foreground" />
              Platform tənzimləmələri
            </Link>
          </div>
          <div className="p-1.5 border-t border-border">
            <Link to="/" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" />
              Çıxış
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) =>
    path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <span className="font-extrabold text-primary-foreground text-sm">U</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="font-extrabold text-base text-foreground whitespace-nowrap">UcuzTap</span>
            <span className="block text-[10px] text-muted-foreground -mt-0.5">Admin Panel</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      active
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                    } ${collapsed ? "justify-center" : ""}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="w-[18px] h-[18px] shrink-0" strokeWidth={active ? 2.2 : 1.5} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-3 space-y-1 shrink-0">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <Sun className="w-[18px] h-[18px] hidden dark:block" strokeWidth={1.5} />
          <Moon className="w-[18px] h-[18px] block dark:hidden" strokeWidth={1.5} />
          {!collapsed && <span>Tema dəyiş</span>}
        </button>
        <Link
          to="/"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-[18px] h-[18px]" strokeWidth={1.5} />
          {!collapsed && <span>Sayta qayıt</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-border bg-card shrink-0 transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex absolute bottom-20 -right-3 w-6 h-6 rounded-full border border-border bg-card items-center justify-center text-muted-foreground hover:text-foreground shadow-sm z-10 transition-colors"
          style={{ left: collapsed ? 56 : 228 }}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-[260px] h-full bg-card border-r border-border shadow-2xl animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-40 h-14 sm:h-16 border-b border-border bg-card/95 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6 gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-foreground/60 hover:bg-secondary transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Axtar..."
                className="h-9 pl-9 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-48 lg:w-64 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl text-foreground/60 hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <ProfileDropdown />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
