import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, MapPin, Heart, ChevronRight, Grid3X3 } from "lucide-react";
import {
  Car, Smartphone, Home, Shirt, Sofa, Briefcase, Baby, Dumbbell,
  Wrench, PawPrint, Monitor, Sparkles, type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingFilters, { type ListingFiltersState } from "@/components/ListingFilters";
import { AdBanner, InFeedAd, SponsoredBadge, mockBannerAds, mockSponsoredListings } from "@/components/ads/AdSystem";
import usePageTitle from "@/hooks/usePageTitle";

// ─── Subcategory map ───
const categorySubcategories: Record<string, { icon: LucideIcon; subs: { label: string; count: string }[] }> = {
  "Nəqliyyat": {
    icon: Car,
    subs: [
      { label: "Avtomobillər", count: "32,456" },
      { label: "Motosikletlər", count: "2,341" },
      { label: "Ehtiyat hissələri", count: "8,123" },
      { label: "Su nəqliyyatı", count: "456" },
      { label: "Ağır texnika", count: "1,855" },
    ],
  },
  "Daşınmaz əmlak": {
    icon: Home,
    subs: [
      { label: "Mənzillər", count: "14,567" },
      { label: "Evlər / Villalar", count: "3,234" },
      { label: "Torpaq", count: "2,890" },
      { label: "Qarajlar", count: "1,123" },
      { label: "Obyektlər", count: "1,642" },
    ],
  },
  "Elektronika": {
    icon: Smartphone,
    subs: [
      { label: "Telefonlar", count: "18,234" },
      { label: "Planşetlər", count: "2,456" },
      { label: "Noutbuklar", count: "4,567" },
      { label: "Foto / Video", count: "1,890" },
      { label: "TV / Audio", count: "3,234" },
      { label: "Aksessuarlar", count: "5,678" },
    ],
  },
  "İş elanları": {
    icon: Briefcase,
    subs: [
      { label: "Tam iş günü", count: "6,789" },
      { label: "Yarım iş günü", count: "2,345" },
      { label: "Uzaqdan iş", count: "1,234" },
      { label: "Staj", count: "890" },
      { label: "Biznes təklifləri", count: "1,309" },
    ],
  },
  "Geyim": {
    icon: Shirt,
    subs: [
      { label: "Kişi geyimləri", count: "7,890" },
      { label: "Qadın geyimləri", count: "8,456" },
      { label: "Ayaqqabı", count: "3,456" },
      { label: "Aksessuarlar", count: "2,123" },
    ],
  },
  "Ev və bağ": {
    icon: Sofa,
    subs: [
      { label: "Mebel", count: "4,567" },
      { label: "Məişət texnikası", count: "3,210" },
      { label: "Bağ avadanlığı", count: "1,234" },
      { label: "Dekor", count: "890" },
    ],
  },
  "Uşaq aləmi": {
    icon: Baby,
    subs: [
      { label: "Uşaq geyimləri", count: "3,456" },
      { label: "Oyuncaqlar", count: "2,345" },
      { label: "Uşaq arabaları", count: "890" },
      { label: "Məktəb ləvazimatları", count: "1,234" },
    ],
  },
  "Hobbi və idman": {
    icon: Dumbbell,
    subs: [
      { label: "İdman avadanlığı", count: "2,345" },
      { label: "Musiqi alətləri", count: "1,234" },
      { label: "Kitablar", count: "890" },
      { label: "Turizm", count: "678" },
    ],
  },
  "Xidmətlər": {
    icon: Wrench,
    subs: [
      { label: "Təmir xidmətləri", count: "3,456" },
      { label: "Təmizlik", count: "1,234" },
      { label: "Kuryer", count: "890" },
      { label: "Repetitor", count: "2,345" },
    ],
  },
  "Heyvanlar": {
    icon: PawPrint,
    subs: [
      { label: "İtlər", count: "1,234" },
      { label: "Pişiklər", count: "890" },
      { label: "Quşlar", count: "456" },
      { label: "Digər", count: "630" },
    ],
  },
  "Kompüter": {
    icon: Monitor,
    subs: [
      { label: "Noutbuklar", count: "5,678" },
      { label: "Masaüstü", count: "3,456" },
      { label: "Monitorlar", count: "1,234" },
      { label: "Aksessuarlar", count: "3,953" },
    ],
  },
  "Gözəllik": {
    icon: Sparkles,
    subs: [
      { label: "Makiyaj", count: "2,345" },
      { label: "Saç baxımı", count: "1,234" },
      { label: "Ətir", count: "1,890" },
      { label: "Dəri baxımı", count: "1,320" },
    ],
  },
};

const allListings = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", price: 2100, priceLabel: "2,100 ₼", location: "Bakı", time: "2 saat əvvəl", img: "/placeholder.svg", vip: true, category: "Elektronika", sub: "Telefonlar" },
  { id: 2, title: "Samsung Galaxy S24 Ultra", price: 1850, priceLabel: "1,850 ₼", location: "Bakı", time: "3 saat əvvəl", img: "/placeholder.svg", vip: false, category: "Elektronika", sub: "Telefonlar" },
  { id: 3, title: "MacBook Air M2 2023", price: 1600, priceLabel: "1,600 ₼", location: "Gəncə", time: "5 saat əvvəl", img: "/placeholder.svg", vip: true, category: "Kompüter", sub: "Noutbuklar" },
  { id: 4, title: "Toyota Camry 2020", price: 32000, priceLabel: "32,000 ₼", location: "Bakı", time: "1 gün əvvəl", img: "/placeholder.svg", vip: false, category: "Nəqliyyat", sub: "Avtomobillər" },
  { id: 5, title: "2 otaqlı mənzil, 28 May", price: 850, priceLabel: "850 ₼/ay", location: "Bakı", time: "1 gün əvvəl", img: "/placeholder.svg", vip: false, category: "Daşınmaz əmlak", sub: "Mənzillər" },
  { id: 6, title: "Nike Air Max 90", price: 120, priceLabel: "120 ₼", location: "Sumqayıt", time: "2 gün əvvəl", img: "/placeholder.svg", vip: false, category: "Geyim", sub: "Ayaqqabı" },
  { id: 7, title: "PlayStation 5 Slim", price: 900, priceLabel: "900 ₼", location: "Bakı", time: "2 gün əvvəl", img: "/placeholder.svg", vip: false, category: "Elektronika", sub: "TV / Audio" },
  { id: 8, title: "Dyson V15 tozsoran", price: 450, priceLabel: "450 ₼", location: "Bakı", time: "3 gün əvvəl", img: "/placeholder.svg", vip: false, category: "Ev və bağ", sub: "Məişət texnikası" },
];

const categories = [
  "Hamısı", "Nəqliyyat", "Daşınmaz əmlak", "Elektronika", "İş elanları",
  "Geyim", "Ev və bağ", "Uşaq aləmi", "Hobbi və idman", "Xidmətlər",
  "Heyvanlar", "Kompüter", "Gözəllik",
];

const defaultFilters: ListingFiltersState = { city: "Hamısı", minPrice: "", maxPrice: "", sort: "newest", vipOnly: false };

const filtersFromParams = (params: URLSearchParams): { filters: ListingFiltersState; category: string; sub: string } => {
  const base: ListingFiltersState = {
    city: params.get("city") || "Hamısı",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
    sort: params.get("sort") || "newest",
    vipOnly: params.get("vip") === "1",
  };
  const knownKeys = new Set(["q", "category", "sub", "city", "minPrice", "maxPrice", "sort", "vip"]);
  params.forEach((val, key) => {
    if (!knownKeys.has(key)) base[key] = val;
  });
  return { filters: base, category: params.get("category") || "Hamısı", sub: params.get("sub") || "" };
};

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  usePageTitle(query ? `"${query}" axtarış nəticələri` : "Bütün elanlar", "UcuzTap-da elanlar arasında axtar");

  const [initial] = useState(() => filtersFromParams(searchParams));
  const [activeCategory, setActiveCategory] = useState(initial.category);
  const [activeSub, setActiveSub] = useState(initial.sub);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<ListingFiltersState>(initial.filters);

  const currentSubs = activeCategory !== "Hamısı" ? categorySubcategories[activeCategory] : null;

  const syncToUrl = (cat: string, sub: string, f: ListingFiltersState, q: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat !== "Hamısı") params.set("category", cat);
    if (sub) params.set("sub", sub);
    if (f.city !== "Hamısı") params.set("city", f.city);
    if (f.minPrice) params.set("minPrice", f.minPrice);
    if (f.maxPrice) params.set("maxPrice", f.maxPrice);
    if (f.sort !== "newest") params.set("sort", f.sort);
    if (f.vipOnly) params.set("vip", "1");
    const baseKeys = new Set(["city", "minPrice", "maxPrice", "sort", "vipOnly"]);
    Object.entries(f).forEach(([k, v]) => {
      if (!baseKeys.has(k) && v && v !== "Hamısı") params.set(k, String(v));
    });
    setSearchParams(params, { replace: true });
  };

  const handleFiltersChange = (newFilters: ListingFiltersState) => {
    setFilters(newFilters);
    syncToUrl(activeCategory, activeSub, newFilters, query);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveSub("");
    const base: ListingFiltersState = {
      city: filters.city, minPrice: filters.minPrice, maxPrice: filters.maxPrice,
      sort: filters.sort, vipOnly: filters.vipOnly,
    };
    setFilters(base);
    syncToUrl(cat, "", base, query);
  };

  const handleSubChange = (sub: string) => {
    const newSub = activeSub === sub ? "" : sub;
    setActiveSub(newSub);
    syncToUrl(activeCategory, newSub, filters, query);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    syncToUrl(activeCategory, activeSub, defaultFilters, query);
  };

  let filtered = allListings;
  if (activeCategory !== "Hamısı") filtered = filtered.filter((l) => l.category === activeCategory);
  if (activeSub) filtered = filtered.filter((l) => l.sub === activeSub);
  if (query) filtered = filtered.filter((l) => l.title.toLowerCase().includes(query.toLowerCase()));
  if (filters.city !== "Hamısı") filtered = filtered.filter((l) => l.location === filters.city);
  if (filters.minPrice) filtered = filtered.filter((l) => l.price >= Number(filters.minPrice));
  if (filters.maxPrice) filtered = filtered.filter((l) => l.price <= Number(filters.maxPrice));
  if (filters.vipOnly) filtered = filtered.filter((l) => l.vip);
  if (filters.sort === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (filters.sort === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  const AD_POSITIONS = [4];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="border-b border-border bg-card">
        <div className="container py-4">
          <form className="flex items-center gap-3 flex-wrap" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 min-w-[200px] flex items-center bg-secondary h-11 rounded-xl px-4 gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" defaultValue={query} placeholder="Elanlar arasında axtar..." className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground" />
            </div>
            <ListingFilters
              open={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
              filters={filters}
              onChange={handleFiltersChange}
              onReset={handleReset}
              activeCategory={activeCategory}
            />
          </form>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button key={cat} onClick={() => handleCategoryChange(cat)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-foreground text-card" : "bg-secondary text-foreground/70 hover:bg-secondary/80"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container py-6 flex-1">
        {/* Subcategories grid — shown when a category is selected */}
        {currentSubs && !activeSub && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Grid3X3 className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">Alt kateqoriyalar</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {currentSubs.subs.map((sub) => (
                <button
                  key={sub.label}
                  onClick={() => handleSubChange(sub.label)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-border bg-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <currentSubs.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-foreground block truncate">{sub.label}</span>
                    <span className="text-xs text-muted-foreground">{sub.count} elan</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active subcategory breadcrumb */}
        {activeSub && (
          <div className="flex items-center gap-2 mb-4 text-sm">
            <button onClick={() => handleSubChange("")} className="text-primary hover:underline font-medium">
              {activeCategory}
            </button>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-foreground font-semibold">{activeSub}</span>
            {currentSubs && (
              <div className="ml-4 flex gap-1.5 overflow-x-auto scrollbar-hide">
                {currentSubs.subs.filter((s) => s.label !== activeSub).map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => handleSubChange(sub.label)}
                    className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground/70 hover:bg-secondary/80 transition-colors"
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sponsored listings */}
        {mockSponsoredListings.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <SponsoredBadge />
              <span className="text-xs text-muted-foreground">Sponsorlu elanlar</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockSponsoredListings.map((sl) => (
                <Link to={sl.ctaLink} key={sl.id} className="bg-card rounded-2xl border-2 border-primary/20 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group relative">
                  <div className="absolute top-2 left-2 z-10"><SponsoredBadge /></div>
                  <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                    <img src={sl.img} alt={sl.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-foreground truncate">{sl.title}</h3>
                    <p className="text-base font-bold text-foreground mt-1">{sl.price}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{sl.location}</span>
                      <span className="text-[10px] text-muted-foreground">{sl.advertiser}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} elan tapıldı
            {activeCategory !== "Hamısı" && <span className="font-medium text-foreground"> · {activeCategory}</span>}
            {activeSub && <span className="font-medium text-foreground"> · {activeSub}</span>}
            {query && <span className="font-medium text-foreground"> "{query}"</span>}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-foreground mb-1">Heç bir elan tapılmadı</p>
            <p className="text-sm text-muted-foreground">Filtrləri dəyişdirməyi sınayın</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((listing, index) => (
              <React.Fragment key={listing.id}>
                {AD_POSITIONS.includes(index) && (
                  <InFeedAd ad={mockBannerAds.listingInfeed1} />
                )}
                <Link to={`/elan/${listing.id}`} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group">
                  <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                    <img src={listing.img} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    {listing.vip && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-md">VIP</span>
                    )}
                    <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-destructive transition-colors" aria-label="Seçilmişlərə əlavə et">
                      <Heart className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-foreground truncate">{listing.title}</h3>
                    <p className="text-base font-bold text-foreground mt-1">{listing.priceLabel}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.location}</span>
                      <span className="text-xs text-muted-foreground">{listing.time}</span>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            ))}
            {filtered.length > 4 && <InFeedAd ad={mockBannerAds.listingInfeed2} />}
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

export default Listings;
