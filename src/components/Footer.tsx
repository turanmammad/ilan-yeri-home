import { Apple, Play, Facebook, Instagram, Youtube, Send, MapPin, Phone, Mail, Shield, Clock, Award, ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const FooterAccordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border md:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-full flex items-center justify-between py-3.5 px-1 text-sm font-bold text-foreground"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <h4 className="hidden md:block font-bold text-foreground mb-4 text-sm">{title}</h4>
      <div className={`${open ? "block" : "hidden"} md:block pb-3 md:pb-0`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-border bg-card pb-20 md:pb-0" itemScope itemType="https://schema.org/Organization">
    {/* Stats band */}
    <div className="bg-primary/5 border-b border-border">
      <div className="container py-5 sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-foreground">1M+</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">Aktiv elan</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-foreground">500K+</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">İstifadəçi</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-foreground">50+</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">Şəhər</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-foreground">24/7</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">Dəstək xidməti</p>
          </div>
        </div>
      </div>
    </div>

    {/* Main footer content */}
    <div className="container py-6 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-0 md:gap-8">
        {/* Brand + About */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 pb-4 md:pb-0 border-b border-border md:border-none">
          <Link to="/" className="flex items-center gap-2 mb-3 sm:mb-4" aria-label="UcuzTap ana səhifə">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="font-extrabold text-primary-foreground text-sm sm:text-base">U</span>
            </div>
            <span className="font-extrabold text-lg sm:text-xl text-foreground" itemProp="name">UcuzTap</span>
          </Link>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5 max-w-xs" itemProp="description">
            Azərbaycanın ən böyük pulsuz elan platforması. Hər gün minlərlə yeni elan, etibarlı satıcılar və sərfəli qiymətlər.
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span itemProp="address">Bakı, Azərbaycan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <a href="tel:+994501234567" className="hover:text-foreground transition-colors" itemProp="telephone">+994 50 123 45 67</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a href="mailto:info@ucuztap.az" className="hover:text-foreground transition-colors" itemProp="email">info@ucuztap.az</a>
            </div>
          </div>
        </div>

        {/* Popular categories - accordion on mobile */}
        <FooterAccordion title="Populyar kateqoriyalar">
          <nav aria-label="Populyar kateqoriyalar">
            <ul className="space-y-2 sm:space-y-2.5 text-sm text-muted-foreground pl-1 md:pl-0">
              <li><Link to="/elanlar?category=Nəqliyyat" className="hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" />Nəqliyyat</Link></li>
              <li><Link to="/elanlar?category=Daşınmaz əmlak" className="hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" />Daşınmaz əmlak</Link></li>
              <li><Link to="/elanlar?category=Elektronika" className="hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" />Elektronika</Link></li>
              <li><Link to="/elanlar?category=Ev və bağ" className="hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" />Ev və bağ</Link></li>
              <li><Link to="/elanlar?category=Geyim" className="hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" />Geyim və aksesuar</Link></li>
              <li><Link to="/elanlar?category=İş elanları" className="hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" />İş elanları</Link></li>
              <li><Link to="/elanlar?category=Xidmətlər" className="hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" />Xidmətlər</Link></li>
            </ul>
          </nav>
        </FooterAccordion>

        {/* Company */}
        <FooterAccordion title="Şirkət">
          <nav aria-label="Şirkət haqqında">
            <ul className="space-y-2 sm:space-y-2.5 text-sm text-muted-foreground pl-1 md:pl-0">
              <li><Link to="/haqqimizda" className="hover:text-foreground transition-colors">Haqqımızda</Link></li>
              <li><Link to="/elaqe" className="hover:text-foreground transition-colors">Əlaqə</Link></li>
              <li><Link to="/karyera" className="hover:text-foreground transition-colors">Karyera</Link></li>
              <li><Link to="/metbuat" className="hover:text-foreground transition-colors">Mətbuat</Link></li>
              <li><Link to="/terefdashlik" className="hover:text-foreground transition-colors">Tərəfdaşlıq</Link></li>
              <li><Link to="/reklam" className="hover:text-foreground transition-colors">Reklam</Link></li>
            </ul>
          </nav>
        </FooterAccordion>

        {/* Support */}
        <FooterAccordion title="Dəstək">
          <nav aria-label="Dəstək">
            <ul className="space-y-2 sm:space-y-2.5 text-sm text-muted-foreground pl-1 md:pl-0">
              <li><Link to="/yardim" className="hover:text-foreground transition-colors">Yardım mərkəzi</Link></li>
              <li><Link to="/qaydalar" className="hover:text-foreground transition-colors">İstifadə qaydaları</Link></li>
              <li><Link to="/tehlukesizlik" className="hover:text-foreground transition-colors">Məxfilik siyasəti</Link></li>
              <li><Link to="/tehlukesizlik" className="hover:text-foreground transition-colors">Təhlükəsizlik</Link></li>
              <li><Link to="/sikayat" className="hover:text-foreground transition-colors">Şikayət bildirin</Link></li>
              <li><Link to="/magazalar" className="hover:text-foreground transition-colors">Mağaza açın</Link></li>
            </ul>
          </nav>
        </FooterAccordion>

        {/* Mobile app + Trust */}
        <div className="pt-4 md:pt-0">
          <h4 className="font-bold text-foreground mb-3 sm:mb-4 text-sm">Mobil tətbiq</h4>
          <div className="flex sm:flex-col gap-2 sm:gap-2.5">
            <a href="#" className="flex-1 sm:flex-none flex items-center gap-2 sm:gap-3 bg-foreground text-card rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-foreground/90 transition-colors" aria-label="App Store-dan yüklə">
              <Apple className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <div className="text-left">
                <div className="text-[9px] sm:text-[10px] text-card/60 leading-tight">App Store</div>
                <div className="text-[11px] sm:text-xs font-semibold leading-tight">iOS üçün</div>
              </div>
            </a>
            <a href="#" className="flex-1 sm:flex-none flex items-center gap-2 sm:gap-3 bg-foreground text-card rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-foreground/90 transition-colors" aria-label="Google Play-dən yüklə">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="currentColor" />
              <div className="text-left">
                <div className="text-[9px] sm:text-[10px] text-card/60 leading-tight">Google Play</div>
                <div className="text-[11px] sm:text-xs font-semibold leading-tight">Android üçün</div>
              </div>
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-5 sm:mt-6 space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Təhlükəsiz alış-veriş</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>7/24 dəstək xidməti</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span>Etibarlı platforma</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* SEO text block */}
    <div className="border-t border-border">
      <div className="container py-5 sm:py-6">
        <h2 className="text-xs sm:text-sm font-bold text-foreground mb-2">Azərbaycanda Pulsuz Elan Platforması — UcuzTap</h2>
        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed max-w-4xl">
          UcuzTap Azərbaycanın ən populyar pulsuz elan saytıdır. Nəqliyyat, daşınmaz əmlak, elektronika, ev əşyaları, geyim, 
          iş elanları və xidmətlər kateqoriyalarında hər gün minlərlə yeni elan yerləşdirilir. Bakı, Gəncə, Sumqayıt, Lənkəran, 
          Şəki və digər şəhərlərdə elan axtarın və ya pulsuz elan yerləşdirin.
        </p>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-border">
      <div className="container py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <p className="text-[11px] sm:text-xs text-muted-foreground">
          © {new Date().getFullYear()} UcuzTap. Bütün hüquqlar qorunur.
        </p>
        <div className="flex items-center gap-4 sm:gap-5 text-[11px] sm:text-xs text-muted-foreground">
          <Link to="/qaydalar" className="hover:text-foreground transition-colors">Şərtlər</Link>
          <Link to="/tehlukesizlik" className="hover:text-foreground transition-colors">Məxfilik</Link>
          <Link to="/sitemap" className="hover:text-foreground transition-colors">Sayt xəritəsi</Link>
        </div>
        <div className="flex items-center gap-2" aria-label="Sosial media">
          <a href="#" aria-label="Facebook" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a href="#" aria-label="Instagram" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a href="#" aria-label="YouTube" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <Youtube className="w-3.5 h-3.5" />
          </a>
          <a href="#" aria-label="Telegram" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <Send className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
