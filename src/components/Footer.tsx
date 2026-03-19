import { Facebook, Instagram, Youtube, Send, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  categories: [
    { label: "Nəqliyyat", to: "/elanlar?category=Nəqliyyat" },
    { label: "Daşınmaz əmlak", to: "/elanlar?category=Daşınmaz əmlak" },
    { label: "Elektronika", to: "/elanlar?category=Elektronika" },
    { label: "Ev və bağ", to: "/elanlar?category=Ev və bağ" },
    { label: "Geyim və aksesuar", to: "/elanlar?category=Geyim" },
    { label: "İş elanları", to: "/elanlar?category=İş elanları" },
    { label: "Xidmətlər", to: "/elanlar?category=Xidmətlər" },
  ],
  company: [
    { label: "Haqqımızda", to: "/haqqimizda" },
    { label: "Əlaqə", to: "/elaqe" },
    { label: "Tərəfdaşlıq", to: "/terefdashlik" },
    { label: "Reklam", to: "/reklam" },
    { label: "Karyera", to: "/karyera" },
  ],
  support: [
    { label: "Yardım mərkəzi", to: "/yardim" },
    { label: "İstifadə qaydaları", to: "/qaydalar" },
    { label: "Məxfilik siyasəti", to: "/tehlukesizlik" },
    { label: "Şikayət bildirin", to: "/sikayat" },
    { label: "Mağaza açın", to: "/magazalar" },
  ],
};

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
];

const stats = [
  { value: "1M+", label: "Aktiv elan" },
  { value: "500K+", label: "İstifadəçi" },
  { value: "50+", label: "Şəhər" },
  { value: "24/7", label: "Dəstək" },
];

const FooterLinkGroup = ({ title, links }: { title: string; links: { label: string; to: string }[] }) => (
  <div>
    <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">{title}</h4>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
          >
            {link.label}
            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="bg-foreground text-background pb-20 md:pb-0" itemScope itemType="https://schema.org/Organization">
    {/* Stats */}
    <div className="border-b border-background/10">
      <div className="container py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">{s.value}</p>
              <p className="text-xs text-background/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Main */}
    <div className="container py-10 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-5" aria-label="UcuzTap ana səhifə">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="font-extrabold text-primary-foreground text-base">U</span>
            </div>
            <span className="font-extrabold text-xl text-background" itemProp="name">UcuzTap</span>
          </Link>
          <p className="text-sm text-background/60 leading-relaxed mb-6 max-w-xs" itemProp="description">
            Azərbaycanın ən böyük pulsuz elan platforması. Hər gün minlərlə yeni elan, etibarlı satıcılar və sərfəli qiymətlər.
          </p>
          <div className="space-y-2.5 text-sm text-background/60">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span itemProp="address">Bakı, Azərbaycan</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <a href="tel:+994501234567" className="hover:text-background transition-colors" itemProp="telephone">+994 50 123 45 67</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a href="mailto:info@ucuztap.az" className="hover:text-background transition-colors" itemProp="email">info@ucuztap.az</a>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2.5 mt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center text-background/60 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <FooterLinkGroup title="Kateqoriyalar" links={footerLinks.categories} />
          <FooterLinkGroup title="Şirkət" links={footerLinks.company} />
          <FooterLinkGroup title="Dəstək" links={footerLinks.support} />
        </div>
      </div>
    </div>

    {/* SEO block */}
    <div className="border-t border-background/10">
      <div className="container py-6">
        <h2 className="text-xs font-semibold text-background/70 mb-1.5">Azərbaycanda Pulsuz Elan Platforması — UcuzTap</h2>
        <p className="text-[11px] text-background/40 leading-relaxed max-w-4xl">
          UcuzTap Azərbaycanın ən populyar pulsuz elan saytıdır. Nəqliyyat, daşınmaz əmlak, elektronika, ev əşyaları, geyim, 
          iş elanları və xidmətlər kateqoriyalarında hər gün minlərlə yeni elan yerləşdirilir. Bakı, Gəncə, Sumqayıt, Lənkəran, 
          Şəki və digər şəhərlərdə elan axtarın və ya pulsuz elan yerləşdirin.
        </p>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-background/10">
      <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-background/40">
          © {new Date().getFullYear()} UcuzTap. Bütün hüquqlar qorunur.
        </p>
        <div className="flex items-center gap-5 text-xs text-background/40">
          <Link to="/qaydalar" className="hover:text-background/70 transition-colors">Şərtlər</Link>
          <Link to="/tehlukesizlik" className="hover:text-background/70 transition-colors">Məxfilik</Link>
          <Link to="/sitemap" className="hover:text-background/70 transition-colors">Sayt xəritəsi</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
