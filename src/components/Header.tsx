import { Heart, MessageCircle, Moon, Plus, Sun, User, Menu, X, Home, Search, ShoppingBag, Wrench, Info, Phone as PhoneIcon, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const mobileMenuLinks = [
  { label: "Ana səhifə", path: "/", icon: Home },
  { label: "Bütün elanlar", path: "/elanlar", icon: Search },
  { label: "Mağazalar", path: "/magazalar", icon: ShoppingBag },
  { label: "Xidmətlər", path: "/xidmetler", icon: Wrench },
  { label: "Haqqımızda", path: "/haqqimizda", icon: Info },
  { label: "Əlaqə", path: "/elaqe", icon: PhoneIcon },
];

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="font-extrabold text-primary-foreground text-sm sm:text-base">U</span>
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground">
              UcuzTap
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/elanlar" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Bütün elanlar</Link>
            <Link to="/magazalar" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Mağazalar</Link>
            <Link to="/xidmetler" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Xidmətlər</Link>
          </nav>

          {/* Actions */}
          <nav className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 sm:p-2.5 rounded-xl text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
              title="Qaranlıq/İşıqlı rejim"
            >
              <Sun className="w-5 h-5 hidden dark:block" strokeWidth={1.5} />
              <Moon className="w-5 h-5 block dark:hidden" strokeWidth={1.5} />
            </button>
            <Link
              to="/hesab/secilmisler"
              className="hidden sm:flex relative p-2.5 rounded-xl text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
              title="Seçilmişlər"
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link
              to="/hesab/mesajlar"
              className="hidden sm:flex relative p-2.5 rounded-xl text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
              title="Mesajlar"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link
              to="/giris"
              className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
              Daxil ol
            </Link>
            <Link to="/elan-yerleshdir" className="hidden sm:flex ml-1 items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm hover:brightness-95 active:scale-95 transition-all border-2 border-primary">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden lg:inline">Elan yerləşdir</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors ml-0.5"
              aria-label="Menyu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* Panel */}
          <div className="relative ml-auto w-[280px] max-w-[80vw] h-full bg-card border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-bold text-foreground">Menyu</span>
              <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* User quick actions */}
            <div className="p-4 border-b border-border">
              <Link
                to="/giris"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Daxil ol / Qeydiyyat</p>
                  <p className="text-xs text-muted-foreground">Hesabınıza giriş edin</p>
                </div>
              </Link>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {mobileMenuLinks.map((link) => {
                const active = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                      active ? "bg-primary/10 text-primary font-semibold" : "text-foreground/80 hover:bg-secondary"
                    }`}
                  >
                    <link.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                    <span className="text-sm">{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </Link>
                );
              })}
            </div>

            {/* Messages shortcut */}
            <div className="p-4 border-t border-border space-y-2">
              <Link
                to="/hesab/mesajlar"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/80 hover:bg-secondary transition-colors"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">Mesajlar</span>
              </Link>
              <Link
                to="/elan-yerleshdir"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                Elan yerləşdir
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
