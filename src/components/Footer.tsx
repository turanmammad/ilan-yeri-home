import { Apple, Play, Facebook, Instagram, Youtube, Send } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container py-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-foreground mb-4">Şirkət</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Haqqımızda</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Karyera</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Əlaqə</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Mətbuat</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-4">Dəstək</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Yardım mərkəzi</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Təhlükəsizlik</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Qaydalar</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Şikayət</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-4">Biznes üçün</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Reklam</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Mağaza aç</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Tərəfdaşlıq</a></li>
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-extrabold text-primary-foreground text-sm">U</span>
          </div>
          <span className="font-extrabold text-lg text-foreground">UcuzTap</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 UcuzTap. Bütün hüquqlar qorunur.
        </p>
        <div className="flex items-center gap-3">
          <a href="#" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Send className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
