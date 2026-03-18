import { Home, Search, Plus, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Ana səhifə", path: "/" },
  { icon: Search, label: "Axtar", path: "/elanlar" },
  { icon: Plus, label: "Elan ver", path: "/elan-yerleshdir", isCenter: true },
  { icon: Heart, label: "Seçilmişlər", path: "/hesab/secilmisler" },
  { icon: User, label: "Hesab", path: "/giris" },
];

const MobileBottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-bottom">
      <div className="flex items-end justify-around px-2 pt-1.5 pb-1.5">
        {navItems.map((item) => {
          const active = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);

          if (item.isCenter) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center -mt-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition-transform">
                  <Plus className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-semibold text-primary mt-1">Elan ver</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={active ? 2.2 : 1.5} />
              <span className={`text-[10px] ${active ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
