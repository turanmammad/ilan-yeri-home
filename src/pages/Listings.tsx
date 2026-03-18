import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, MapPin, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingFilters from "@/components/ListingFilters";
import { AdBanner, InFeedAd, SponsoredBadge, mockBannerAds, mockSponsoredListings } from "@/components/ads/AdSystem";

const allListings = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", price: 2100, priceLabel: "2,100 ₼", location: "Bakı", time: "2 saat əvvəl", img: "/placeholder.svg", vip: true },
  { id: 2, title: "Samsung Galaxy S24 Ultra", price: 1850, priceLabel: "1,850 ₼", location: "Bakı", time: "3 saat əvvəl", img: "/placeholder.svg", vip: false },
  { id: 3, title: "MacBook Air M2 2023", price: 1600, priceLabel: "1,600 ₼", location: "Gəncə", time: "5 saat əvvəl", img: "/placeholder.svg", vip: true },
  { id: 4, title: "Toyota Camry 2020", price: 32000, priceLabel: "32,000 ₼", location: "Bakı", time: "1 gün əvvəl", img: "/placeholder.svg", vip: false },
  { id: 5, title: "2 otaqlı mənzil, 28 May", price: 850, priceLabel: "850 ₼/ay", location: "Bakı", time: "1 gün əvvəl", img: "/placeholder.svg", vip: false },
  { id: 6, title: "Nike Air Max 90", price: 120, priceLabel: "120 ₼", location: "Sumqayıt", time: "2 gün əvvəl", img: "/placeholder.svg", vip: false },
  { id: 7, title: "PlayStation 5 Slim", price: 900, priceLabel: "900 ₼", location: "Bakı", time: "2 gün əvvəl", img: "/placeholder.svg", vip: false },
  { id: 8, title: "Dyson V15 tozsoran", price: 450, priceLabel: "450 ₼", location: "Bakı", time: "3 gün əvvəl", img: "/placeholder.svg", vip: false },
];

const categories = [
  "Hamısı", "Nəqliyyat", "Daşınmaz əmlak", "Elektronika", "İş elanları",
  "Geyim", "Ev və bağ", "Uşaq aləmi", "Xidmətlər",
];

const defaultFilters = { city: "Hamısı", minPrice: "", maxPrice: "", sort: "newest", vipOnly: false };

const Listings = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "Hamısı";
  const [activeCategory, setActiveCategory] = useState(category);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  let filtered = allListings;
  if (query) filtered = filtered.filter((l) => l.title.toLowerCase().includes(query.toLowerCase()));
  if (filters.city !== "Hamısı") filtered = filtered.filter((l) => l.location === filters.city);
  if (filters.minPrice) filtered = filtered.filter((l) => l.price >= Number(filters.minPrice));
  if (filters.maxPrice) filtered = filtered.filter((l) => l.price <= Number(filters.maxPrice));
  if (filters.vipOnly) filtered = filtered.filter((l) => l.vip);
  if (filters.sort === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (filters.sort === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  // Insert in-feed ads at positions
  const AD_POSITIONS = [4]; // After 4th item

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
            <ListingFilters open={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} filters={filters} onChange={setFilters} onReset={() => setFilters(defaultFilters)} />
          </form>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-foreground text-card" : "bg-secondary text-foreground/70 hover:bg-secondary/80"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container py-6 flex-1">
        {/* Sponsorlu elanlar — üst sıra */}
        {mockSponsoredListings.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <SponsoredBadge />
              <span className="text-xs text-muted-foreground">Sponsorlu elanlar</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockSponsoredListings.map((sl) => (
                <Link
                  to={sl.ctaLink}
                  key={sl.id}
                  className="bg-card rounded-2xl border-2 border-primary/20 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group relative"
                >
                  <div className="absolute top-2 left-2 z-10">
                    <SponsoredBadge />
                  </div>
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
              <>
                {/* In-feed ad insertion */}
                {AD_POSITIONS.includes(index) && (
                  <InFeedAd key={`ad-${index}`} ad={mockBannerAds.listingInfeed1} />
                )}
                <Link
                  to={`/elan/${listing.id}`}
                  key={listing.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                    <img src={listing.img} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {listing.vip && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-md">VIP</span>
                    )}
                    <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-destructive transition-colors">
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
              </>
            ))}

            {/* Bottom in-feed ad */}
            {filtered.length > 4 && (
              <InFeedAd ad={mockBannerAds.listingInfeed2} />
            )}
          </div>
        )}

        {/* Banner ad at bottom of listings */}
        <div className="mt-8">
          <AdBanner ad={mockBannerAds.footerTop} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Listings;
