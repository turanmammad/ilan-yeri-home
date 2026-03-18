import { Apple, Play, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container py-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-foreground mb-4">UcuzTap</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/haqqimizda" className="hover:text-foreground transition-colors">Haqqımızda</Link></li>
            <li><Link to="/elaqe" className="hover:text-foreground transition-colors">Əlaqə</Link></li>
            <li><Link to="/qaydalar" className="hover:text-foreground transition-colors">İstifadə şərtləri</Link></li>
            <li><Link to="/tehlukesizlik" className="hover:text-foreground transition-colors">Məxfilik siyasəti</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-4">Kateqoriyalar</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/elanlar?category=Nəqliyyat" className="hover:text-foreground transition-colors">Nəqliyyat</Link></li>
            <li><Link to="/elanlar?category=Daşınmaz əmlak" className="hover:text-foreground transition-colors">Daşınmaz əmlak</Link></li>
            <li><Link to="/elanlar?category=Elektronika" className="hover:text-foreground transition-colors">Elektronika</Link></li>
            <li><Link to="/elanlar?category=İş elanları" className="hover:text-foreground transition-colors">İş elanları</Link></li>
            <li><Link to="/elanlar?category=Xidmətlər" className="hover:text-foreground transition-colors">Xidmətlər</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-4">Dəstək</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/yardim" className="hover:text-foreground transition-colors">Yardım mərkəzi</Link></li>
            <li><Link to="/tehlukesizlik" className="hover:text-foreground transition-colors">Təhlükəsizlik məsləhətləri</Link></li>
            <li><Link to="/sikayat" className="hover:text-foreground transition-colors">Şikayət bildirin</Link></li>
            <li><Link to="/reklam" className="hover:text-foreground transition-colors">Reklam və VIP paketlər</Link></li>
            <li><Link to="/magazalar" className="hover:text-foreground transition-colors">Mağaza açın</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-4">Mobil tətbiq</h4>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 bg-foreground text-card rounded-xl px-4 py-3 hover:bg-foreground/90 transition-colors">
              <Apple className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <div className="text-[10px] text-card/60 leading-tight">App Store</div>
                <div className="text-sm font-semibold leading-tight">iOS üçün</div>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 bg-foreground text-card rounded-xl px-4 py-3 hover:bg-foreground/90 transition-colors">
              <Play className="w-5 h-5 shrink-0" fill="currentColor" />
              <div className="text-left">
                <div className="text-[10px] text-card/60 leading-tight">Google Play</div>
                <div className="text-sm font-semibold leading-tight">Android üçün</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-border">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-extrabold text-primary-foreground text-sm">U</span>
          </div>
          <span className="font-extrabold text-lg text-foreground">UcuzTap</span>
        </Link>
        <p className="text-sm text-muted-foreground">
          © 2026 UcuzTap. Azərbaycanda pulsuz elan platforması. Bütün hüquqlar qorunur.
        </p>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
          <a href="#" aria-label="Telegram" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Send className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
