import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, MapPin, Clock, Phone, MessageCircle, Shield, Eye, Store, ChevronRight, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SidebarAd, AdBanner, SponsoredBadge, mockBannerAds, mockSponsoredListings } from "@/components/ads/AdSystem";

const listing = {
  id: 1,
  title: "iPhone 15 Pro Max 256GB",
  price: "2,100 ₼",
  description: "iPhone 15 Pro Max 256GB, Natural Titanium rəng. Qutu, adapter və kabel daxildir. Cızıqsız, ideal vəziyyətdə. Zəmanət müddəti hələ davam edir. Barter yoxdur, son qiymətdir.",
  location: "Bakı, Nəsimi rayonu",
  time: "2 saat əvvəl",
  views: 342,
  seller: {
    id: 1,
    name: "TechStore Bakı",
    isShop: true,
    avatar: "T",
    rating: 4.8,
    listingsCount: 234,
    memberSince: "2024",
    verified: true,
  },
  phone: "+994 50 123 45 67",
  whatsapp: "+994501234567",
  images: ["/placeholder.svg"],
};

const sellerOtherListings = [
  { id: 10, title: "Samsung Galaxy S24 Ultra", price: "1,850 ₼", img: "/placeholder.svg", time: "1 gün əvvəl" },
  { id: 11, title: "AirPods Pro 2nd Gen", price: "320 ₼", img: "/placeholder.svg", time: "2 gün əvvəl" },
  { id: 12, title: "MacBook Pro M3 14 inch", price: "3,800 ₼", img: "/placeholder.svg", time: "3 gün əvvəl" },
  { id: 13, title: "iPad Air M2 256GB", price: "1,200 ₼", img: "/placeholder.svg", time: "5 gün əvvəl" },
];

const similar = [
  { id: 2, title: "Samsung Galaxy S24 Ultra", price: "1,850 ₼", img: "/placeholder.svg" },
  { id: 3, title: "iPhone 14 Pro 128GB", price: "1,400 ₼", img: "/placeholder.svg" },
  { id: 4, title: "Google Pixel 8 Pro", price: "1,200 ₼", img: "/placeholder.svg" },
  { id: 5, title: "OnePlus 12", price: "1,100 ₼", img: "/placeholder.svg" },
];

const ListingDetail = () => {
  const { id } = useParams();
  const seller = listing.seller;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="container py-6 flex-1">
        <Link to="/elanlar" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Geri
        </Link>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Images */}
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-border">
              <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-xl font-bold text-foreground">{listing.title}</h1>
                <div className="flex gap-2 shrink-0">
                  <button className="w-9 h-9 rounded-xl border border-input flex items-center justify-center text-foreground/60 hover:text-destructive transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-xl border border-input flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-2xl font-extrabold text-foreground mb-4">{listing.price}</p>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{listing.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{listing.time}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{listing.views} baxış</span>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <button className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Zəng et
                </button>
                <button className="w-full h-11 border border-input bg-card text-foreground font-medium rounded-xl text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Mesaj yaz
                </button>
              </div>
            </div>

            {/* Seller card */}
            <Link
              to={seller.isShop ? `/magaza/${seller.id}` : `/istifadeci/${seller.id}`}
              className="block bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${seller.isShop ? "bg-primary/15" : "bg-secondary"}`}>
                    {seller.isShop ? <Store className="w-6 h-6 text-primary" /> : <span className="text-lg font-bold text-primary">{seller.avatar}</span>}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{seller.name}</p>
                      {seller.verified && <span className="text-[10px] font-semibold bg-primary/15 text-primary px-1.5 py-0.5 rounded-md">✓</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {seller.isShop && <span className="text-xs text-muted-foreground flex items-center gap-0.5"><Star className="w-3 h-3 text-primary fill-primary" /> {seller.rating}</span>}
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Shield className="w-3 h-3" />{seller.isShop ? "Mağaza" : "Təsdiqlənmiş"}</span>
                      <span className="text-xs text-muted-foreground">{seller.listingsCount} elan</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>

            {/* Sidebar reklam */}
            <div className="hidden lg:block">
              <SidebarAd ad={mockBannerAds.listingSidebar} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card mt-6">
          <h2 className="font-bold text-foreground mb-3">Təsvir</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">{listing.description}</p>
        </div>

        {/* Mobile sidebar ad */}
        <div className="lg:hidden mt-4">
          <SidebarAd ad={mockBannerAds.listingSidebar} />
        </div>

        {/* Sponsorlu elanlar — description altında */}
        {mockSponsoredListings.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <SponsoredBadge />
              <span className="text-sm font-bold text-foreground">Sizə maraqlı ola bilər</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mockSponsoredListings.map((sl) => (
                <Link
                  key={sl.id}
                  to={sl.ctaLink}
                  className="bg-card rounded-2xl border-2 border-primary/20 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group relative"
                >
                  <div className="absolute top-2 left-2 z-10"><SponsoredBadge /></div>
                  <div className="aspect-[4/3] bg-secondary overflow-hidden">
                    <img src={sl.img} alt={sl.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-foreground truncate">{sl.title}</h3>
                    <p className="text-sm font-bold text-foreground mt-1">{sl.price}</p>
                    <span className="text-[10px] text-muted-foreground">{sl.advertiser}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Seller's other listings */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">
              {seller.isShop ? `${seller.name} — digər elanlar` : `${seller.name} — digər elanları`}
            </h2>
            <Link to={seller.isShop ? `/magaza/${seller.id}` : `/istifadeci/${seller.id}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-0.5">
              Hamısına bax <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {sellerOtherListings.map((item) => (
              <Link key={item.id} to={`/elan/${item.id}`} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
                  <p className="text-sm font-bold text-foreground mt-1">{item.price}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Similar listings */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Oxşar elanlar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similar.map((item) => (
              <Link key={item.id} to={`/elan/${item.id}`} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
                  <p className="text-sm font-bold text-foreground mt-1">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-8">
          <AdBanner ad={mockBannerAds.categoriesBottom} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListingDetail;
