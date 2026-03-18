import { Heart, MessageCircle, Plus, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm shadow-card">
      <div className="container flex items-center justify-between h-14 gap-4">
        <a href="/" className="flex items-center gap-1.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-extrabold text-primary-foreground text-sm">U</span>
          </div>
          <span className="font-extrabold text-lg tracking-tight text-foreground hidden sm:block">
            ucuztap
          </span>
        </a>

        <nav className="flex items-center gap-1">
          <NavIcon icon={<Heart className="w-5 h-5" strokeWidth={1.5} />} label="Seçilmişlər" />
          <NavIcon icon={<MessageCircle className="w-5 h-5" strokeWidth={1.5} />} label="Mesajlar" count={3} />
          <NavIcon icon={<User className="w-5 h-5" strokeWidth={1.5} />} label="Hesab" />
          <button className="ml-2 flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-xl text-sm hover:brightness-95 active:scale-95 transition-all">
            <Plus className="w-4 h-4" strokeWidth={2} />
            <span className="hidden sm:inline">Elan yerləşdir</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

const NavIcon = ({ icon, label, count }: { icon: React.ReactNode; label: string; count?: number }) => (
  <button
    className="relative p-2.5 rounded-xl text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
    title={label}
  >
    {icon}
    {count && (
      <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
        {count}
      </span>
    )}
  </button>
);

export default Header;
