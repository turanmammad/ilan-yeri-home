import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Wrench, MapPin, Star, Search, Shield, Clock, ChevronRight,
  Hammer, Paintbrush, Truck, GraduationCap, Camera, Scissors,
  Monitor, Stethoscope, Scale, Sparkles, Grid3X3,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AdBanner, SponsoredBadge, mockBannerAds } from "@/components/ads/AdSystem";

// ─── Service Categories ───
interface ServiceCategory {
  icon: LucideIcon;
  label: string;
  count: string;
  color: string;
}

const serviceCategories: ServiceCategory[] = [
  { icon: Hammer, label: "Təmir xidmətləri", count: "3,456", color: "bg-orange-100 text-orange-600" },
  { icon: Sparkles, label: "Təmizlik", count: "1,890", color: "bg-cyan-100 text-cyan-600" },
  { icon: Truck, label: "Daşınma / Kuryer", count: "1,234", color: "bg-blue-100 text-blue-600" },
  { icon: GraduationCap, label: "Təhsil / Repetitor", count: "2,567", color: "bg-purple-100 text-purple-600" },
  { icon: Camera, label: "Foto / Video", count: "890", color: "bg-pink-100 text-pink-600" },
  { icon: Monitor, label: "IT xidmətlər", count: "1,678", color: "bg-indigo-100 text-indigo-600" },
  { icon: Scissors, label: "Gözəllik", count: "2,345", color: "bg-rose-100 text-rose-600" },
  { icon: Stethoscope, label: "Sağlamlıq", count: "678", color: "bg-green-100 text-green-600" },
  { icon: Paintbrush, label: "Dizayn / İnteryer", count: "456", color: "bg-amber-100 text-amber-600" },
  { icon: Scale, label: "Hüquqi xidmətlər", count: "345", color: "bg-teal-100 text-teal-600" },
  { icon: Wrench, label: "Santexnika", count: "1,123", color: "bg-emerald-100 text-emerald-600" },
  { icon: Wrench, label: "Elektrik", count: "987", color: "bg-yellow-100 text-yellow-600" },
];

// ─── Service Providers (mock) ───
interface ServiceProvider {
  id: number;
  name: string;
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  price: string;
  location: string;
  verified: boolean;
  responseTime: string;
  completedJobs: number;
  description: string;
  featured: boolean;
}

const serviceProviders: ServiceProvider[] = [
  { id: 1, name: "ProBuild", title: "Ev təmiri və tikintisi", category: "Təmir xidmətləri", rating: 4.9, reviewCount: 234, price: "Razılaşma ilə", location: "Bakı", verified: true, responseTime: "< 30 dəq", completedJobs: 567, description: "Peşəkar ev təmiri, suvaq, boya, elektrik, santexnika işləri.", featured: true },
  { id: 2, name: "TechFix", title: "Kompüter və telefon təmiri", category: "IT xidmətlər", rating: 4.7, reviewCount: 189, price: "30 ₼-dan", location: "Bakı", verified: true, responseTime: "< 1 saat", completedJobs: 423, description: "Hər növ kompüter, noutbuk, telefon təmiri. Proqram yükləmə.", featured: true },
  { id: 3, name: "AvtoServis+", title: "Avtomobil təmiri", category: "Təmir xidmətləri", rating: 4.8, reviewCount: 312, price: "50 ₼-dan", location: "Sumqayıt", verified: true, responseTime: "< 2 saat", completedJobs: 890, description: "Mühərrik, kuzov, elektrik, diaqnostika, yağ dəyişmə.", featured: false },
  { id: 4, name: "LangAcademy", title: "İngilis dili kursları", category: "Təhsil / Repetitor", rating: 4.6, reviewCount: 156, price: "80 ₼/ay", location: "Bakı", verified: true, responseTime: "< 3 saat", completedJobs: 234, description: "IELTS, TOEFL hazırlığı. Native müəllimlərlə dərslər.", featured: false },
  { id: 5, name: "PhotoArt Studio", title: "Peşəkar fotosəssiya", category: "Foto / Video", rating: 4.9, reviewCount: 278, price: "100 ₼-dan", location: "Bakı", verified: true, responseTime: "< 1 saat", completedJobs: 456, description: "Toy, nişan, ad günü, portfolio, məhsul çəkilişi.", featured: true },
  { id: 6, name: "MoveIt", title: "Daşınma və yük daşıma", category: "Daşınma / Kuryer", rating: 4.5, reviewCount: 98, price: "40 ₼-dan", location: "Bakı", verified: false, responseTime: "< 30 dəq", completedJobs: 345, description: "Ev daşınması, ofis köçürülməsi, yük daşıma xidməti.", featured: false },
  { id: 7, name: "AquaFix", title: "Santexnika ustası", category: "Santexnika", rating: 4.4, reviewCount: 67, price: "25 ₼-dan", location: "Gəncə", verified: false, responseTime: "< 2 saat", completedJobs: 189, description: "Su kəməri, kanalizasiya, qaz sobası, kombi təmiri.", featured: false },
  { id: 8, name: "CleanPro", title: "Peşəkar təmizlik", category: "Təmizlik", rating: 4.8, reviewCount: 345, price: "50 ₼-dan", location: "Bakı", verified: true, responseTime: "< 1 saat", completedJobs: 678, description: "Ev təmizliyi, ofis təmizliyi, xalça yuma, pərdə yuma.", featured: true },
  { id: 9, name: "BeautyLine", title: "Makiyaj və saç düzümü", category: "Gözəllik", rating: 4.7, reviewCount: 201, price: "60 ₼-dan", location: "Bakı", verified: true, responseTime: "< 2 saat", completedJobs: 512, description: "Gəlin makiyajı, saç düzümü, manikür, pedikür.", featured: false },
  { id: 10, name: "CodeMaster", title: "Sayt və proqram hazırlanması", category: "IT xidmətlər", rating: 4.6, reviewCount: 89, price: "200 ₼-dan", location: "Bakı", verified: true, responseTime: "< 3 saat", completedJobs: 145, description: "Web sayt, mobil tətbiq, e-commerce, SEO optimizasiya.", featured: false },
  { id: 11, name: "LegalAZ", title: "Hüquqi məsləhət", category: "Hüquqi xidmətlər", rating: 4.5, reviewCount: 45, price: "100 ₼-dan", location: "Bakı", verified: true, responseTime: "< 4 saat", completedJobs: 234, description: "Əmlak, ailə, cinayət, əmək hüququ sahəsində məsləhət.", featured: false },
  { id: 12, name: "SparkElektrik", title: "Elektrik ustası", category: "Elektrik", rating: 4.3, reviewCount: 78, price: "20 ₼-dan", location: "Bakı", verified: false, responseTime: "< 1 saat", completedJobs: 267, description: "Elektrik xətti çəkmə, rozetka, açar, lüstr quraşdırma.", featured: false },
];

const cities = ["Hamısı", "Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Lənkəran"];
const sortOptions = [
  { value: "rating", label: "Reytinqə görə" },
  { value: "reviews", label: "Rəy sayına görə" },
  { value: "newest", label: "Ən yeni" },
];

const Services = () => {
  usePageTitle("Xidmətlər", "UcuzTap-da peşəkar xidmət göstəriciləri tapın");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "";
  const initialCity = searchParams.get("city") || "Hamısı";
  const initialQuery = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [sort, setSort] = useState("rating");

  const syncUrl = (cat: string, q: string, c: string) => {
    const p = new URLSearchParams();
    if (cat) p.set("category", cat);
    if (q) p.set("q", q);
    if (c !== "Hamısı") p.set("city", c);
    setSearchParams(p, { replace: true });
  };

  const handleCategorySelect = (label: string) => {
    const next = activeCategory === label ? "" : label;
    setActiveCategory(next);
    syncUrl(next, searchQuery, city);
  };

  let filtered = serviceProviders;
  if (activeCategory) filtered = filtered.filter((s) => s.category === activeCategory);
  if (searchQuery) filtered = filtered.filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  if (city !== "Hamısı") filtered = filtered.filter((s) => s.location === city);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === "reviews") filtered = [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);

  const featuredProviders = filtered.filter((s) => s.featured);
  const regularProviders = filtered.filter((s) => !s.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Search bar */}
      <div className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[200px] flex items-center bg-secondary h-11 rounded-xl px-4 gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); syncUrl(activeCategory, e.target.value, city); }}
                placeholder="Xidmət axtar..."
                className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <select
              value={city}
              onChange={(e) => { setCity(e.target.value); syncUrl(activeCategory, searchQuery, e.target.value); }}
              className="h-11 px-4 pr-8 rounded-xl border border-input bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 px-4 pr-8 rounded-xl border border-input bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <main className="container py-6 flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Xidmətlər</h1>
        <p className="text-sm text-muted-foreground mb-6">Peşəkar xidmət göstəriciləri tapın</p>

        {/* Categories grid */}
        {!activeCategory && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Grid3X3 className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">Xidmət kateqoriyaları</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {serviceCategories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleCategorySelect(cat.label)}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-border bg-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <cat.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-foreground block leading-tight">{cat.label}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">{cat.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active category breadcrumb */}
        {activeCategory && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <button onClick={() => handleCategorySelect("")} className="text-sm text-primary hover:underline font-medium">
              Bütün xidmətlər
            </button>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm text-foreground font-semibold">{activeCategory}</span>
            <div className="ml-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {serviceCategories.filter((c) => c.label !== activeCategory).slice(0, 5).map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleCategorySelect(cat.label)}
                  className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground/70 hover:bg-secondary/80 transition-colors"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Featured providers */}
        {featuredProviders.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <SponsoredBadge />
              <span className="text-xs text-muted-foreground">Öne çıxan xidmətlər</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {featuredProviders.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                >
                  <Link
                    to={`/xidmet/${svc.id}`}
                    className="block bg-card rounded-2xl border-2 border-primary/20 p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-primary/10 to-transparent w-24 h-24 pointer-events-none" />
                    <div className="absolute top-3 right-3"><SponsoredBadge /></div>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                        <Wrench className="w-7 h-7 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-foreground truncate">{svc.name}</h3>
                          {svc.verified && <Shield className="w-3.5 h-3.5 text-primary shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{svc.title}</p>
                        <p className="text-xs text-foreground/60 mt-1.5 line-clamp-2">{svc.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                        <span className="font-medium text-foreground">{svc.rating}</span>
                        <span>({svc.reviewCount})</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{svc.price}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{svc.location}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} xidmət tapıldı
            {activeCategory && <span className="font-medium text-foreground"> · {activeCategory}</span>}
          </p>
        </div>

        {/* Service providers grid */}
        {regularProviders.length === 0 && featuredProviders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-foreground mb-1">Heç bir xidmət tapılmadı</p>
            <p className="text-sm text-muted-foreground">Filtrləri dəyişdirməyi sınayın</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularProviders.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <Link
                  to={`/xidmet/${svc.id}`}
                  className="block bg-card rounded-2xl border border-border p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Wrench className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-foreground truncate">{svc.name}</h3>
                        {svc.verified && <Shield className="w-3.5 h-3.5 text-primary shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{svc.title}</p>
                    </div>
                  </div>

                  <p className="text-xs text-foreground/60 mb-3 line-clamp-2">{svc.description}</p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{svc.responseTime}
                    </span>
                    <span>{svc.completedJobs} iş</span>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                      <span className="font-medium text-foreground">{svc.rating}</span>
                      <span>({svc.reviewCount})</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{svc.price}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{svc.location}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <AdBanner ad={mockBannerAds.footerTop} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
