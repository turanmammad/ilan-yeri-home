import { Heart, MessageCircle, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <span className="font-extrabold text-primary-foreground text-base">U</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-foreground">
            UcuzTap
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/elanlar" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Bütün elanlar</Link>
          <Link to="/magazalar" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Mağazalar</Link>
          <Link to="/xidmetler" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Xidmətlər</Link>
        </nav>

        <nav className="flex items-center gap-1">
          <Link
            to="/hesab/secilmisler"
            className="relative p-2.5 rounded-xl text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
            title="Seçilmişlər"
          >
            <Heart className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link
            to="/hesab/mesajlar"
            className="relative p-2.5 rounded-xl text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
            title="Mesajlar"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link
            to="/giris"
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            <User className="w-5 h-5" strokeWidth={1.5} />
            Daxil ol
          </Link>
          <Link to="/elan-yerleshdir" className="ml-2 flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-xl text-sm hover:brightness-95 active:scale-95 transition-all border-2 border-primary">
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Elan yerləşdir</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
