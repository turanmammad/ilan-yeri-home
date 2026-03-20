import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Heart, Share2, MapPin, Clock, Phone, MessageCircle,
  Shield, Eye, Store, ChevronRight, ChevronLeft, Star, Flag,
  Calendar, Tag, Bookmark, ZoomIn, X, Info
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SidebarAd, AdBanner, SponsoredBadge, mockBannerAds, mockSponsoredListings } from "@/components/ads/AdSystem";

const maskPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 6) return phone;
  const visible = digits.slice(0, 6);
  const hidden = digits.slice(6).replace(/./g, "*");
  const full = visible + hidden;
  return `+${full.slice(0, 3)} ${full.slice(3, 5)} ${full.slice(5, 8)} ${full.slice(8, 10)} ${full.slice(10)}`;
};

const listing = {
  id: 1,
  title: "iPhone 15 Pro Max 256GB Natural Titanium",
  price: "2,100",
  currency: "₼",
  negotiable: true,
  category: "Elektronika",
  subcategory: "Telefonlar",
  description: "iPhone 15 Pro Max 256GB, Natural Titanium rəng. Qutu, adapter və kabel daxildir. Cızıqsız, ideal vəziyyətdə. Zəmanət müddəti hələ davam edir. Barter yoxdur, son qiymətdir.\n\nTelefon şəxsi istifadə olunub, heç bir problemi yoxdur. Face ID, kamera, dinamiklər — hamısı əla işləyir. Aksesuar kimi orijinal MagSafe case də verilir.",
  location: "Bakı, Nəsimi rayonu",
  time: "2 saat əvvəl",
  date: "19 mart 2026",
  views: 342,
  listingNumber: "AZ-0048291",
  specs: [
    { label: "Marka", value: "Apple" },
    { label: "Model", value: "iPhone 15 Pro Max" },
    { label: "Yaddaş", value: "256 GB" },
    { label: "Rəng", value: "Natural Titanium" },
    { label: "Vəziyyət", value: "İşlənmiş — Əla" },
    { label: "Zəmanət", value: "Var" },
    { label: "Qutu/Aksesuar", value: "Var" },
  ],
  seller: {
    id: 1,
    name: "TechStore Bakı",
    isShop: true,
    avatar: "T",
    rating: 4.8,
    reviewCount: 156,
    listingsCount: 234,
    memberSince: "2024",
    verified: true,
    responseTime: "~15 dəqiqə",
  },
  phone: "+994 50 123 45 67",
  whatsapp: "+994501234567",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
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

/* ─── Image Gallery ─── */
const ImageGallery = ({ images, title }: { images: string[]; title: string }) => {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setActive((i) => (i > 0 ? i - 1 : images.length - 1));
  const next = () => setActive((i) => (i < images.length - 1 ? i + 1 : 0));

  return (
    <>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-secondary border border-border group">
        <div className="aspect-[4/3] cursor-zoom-in" onClick={() => setLightbox(true)}>
          <img src={images[active]} alt={`${title} — şəkil ${active + 1}`} className="w-full h-full object-cover" />
        </div>
        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-foreground/70 text-background text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          {active + 1} / {images.length}
        </div>
        {/* Zoom hint */}
        <div className="absolute bottom-3 left-3 bg-foreground/70 text-background text-xs px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3 h-3" /> Böyüt
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                i === active ? "border-primary ring-1 ring-primary/30" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/30 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/30 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={images[active]}
            alt={title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/30 transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/20 text-background text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

/* ─── Mini listing card ─── */
const MiniListingCard = ({ item }: { item: { id: number; title: string; price: string; img: string; time?: string } }) => (
  <Link to={`/elan/${item.id}`} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group">
    <div className="aspect-[4/3] bg-secondary overflow-hidden">
      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-3">
      <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
      <p className="text-sm font-bold text-foreground mt-1">{item.price}</p>
      {item.time && <p className="text-[11px] text-muted-foreground mt-1">{item.time}</p>}
    </div>
  </Link>
);

/* ─── Main page ─── */
const ListingDetail = () => {
  const { id } = useParams();
  const seller = listing.seller;
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="container py-3">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-x-auto" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-foreground transition-colors shrink-0">Ana səhifə</Link>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <Link to="/elanlar" className="hover:text-foreground transition-colors shrink-0">Elanlar</Link>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <Link to={`/elanlar?category=${listing.category}`} className="hover:text-foreground transition-colors shrink-0">{listing.category}</Link>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span className="text-foreground font-medium truncate">{listing.subcategory}</span>
            </nav>
          </div>
        </div>

        <div className="container py-5 sm:py-8">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* ═══ LEFT COLUMN ═══ */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-5">
              {/* Image gallery */}
              <ImageGallery images={listing.images} title={listing.title} />

              {/* Title + price — mobile only */}
              <div className="lg:hidden">
                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-xl font-bold text-foreground leading-tight">{listing.title}</h1>
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => setSaved(!saved)}
                      className={`w-9 h-9 rounded-xl border border-input flex items-center justify-center transition-colors ${saved ? "text-destructive bg-destructive/10 border-destructive/30" : "text-muted-foreground hover:text-destructive"}`}
                    >
                      <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-9 h-9 rounded-xl border border-input flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      title="Paylaş"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-foreground mt-2">
                  {listing.price} <span className="text-lg">{listing.currency}</span>
                  {listing.negotiable && <span className="text-xs font-medium text-muted-foreground ml-2 align-middle">razılaşma var</span>}
                </p>
              </div>

              {/* Specs table */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Xüsusiyyətlər
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {listing.specs.map((spec, i) => (
                    <div key={i} className={`flex items-center text-sm px-5 py-3 ${i % 2 === 0 ? "bg-secondary/30" : ""}`}>
                      <span className="text-muted-foreground w-36 sm:w-44 shrink-0">{spec.label}</span>
                      <span className="text-foreground font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h2 className="text-sm font-bold text-foreground mb-3">Ətraflı təsvir</h2>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{listing.description}</p>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground px-1">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{listing.date}</span>
                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{listing.views} baxış</span>
                <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" />Elan №{listing.listingNumber}</span>
                <button className="flex items-center gap-1.5 text-destructive/70 hover:text-destructive transition-colors ml-auto">
                  <Flag className="w-3.5 h-3.5" /> Şikayət et
                </button>
              </div>

              {/* Mobile ad */}
              <div className="lg:hidden">
                <SidebarAd ad={mockBannerAds.listingSidebar} />
              </div>
            </div>

            {/* ═══ RIGHT COLUMN (sticky) ═══ */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-4 space-y-4">
                {/* Price card — desktop */}
                <div className="hidden lg:block bg-card rounded-2xl border border-border p-5 shadow-card">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h1 className="text-lg font-bold text-foreground leading-snug">{listing.title}</h1>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => setSaved(!saved)}
                        className={`w-9 h-9 rounded-xl border border-input flex items-center justify-center transition-colors ${saved ? "text-destructive bg-destructive/10 border-destructive/30" : "text-muted-foreground hover:text-destructive"}`}
                      >
                        <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                      </button>
                      <button className="w-9 h-9 rounded-xl border border-input flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-3xl font-extrabold text-foreground mt-2">
                    {listing.price} <span className="text-xl">{listing.currency}</span>
                  </p>
                  {listing.negotiable && (
                    <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-md mt-2">Razılaşma var</span>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" />{listing.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{listing.time}</span>
                  </div>
                </div>

                {/* Contact buttons */}
                <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-3">
                  <a
                    href={`https://wa.me/${listing.whatsapp}?text=${encodeURIComponent(`Salam, "${listing.title}" elanı ilə maraqlanıram.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 bg-[#25D366] text-white font-semibold rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp ilə yaz
                  </a>

                  {phoneRevealed ? (
                    <a href={`tel:${listing.phone}`} className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" /> {listing.phone}
                    </a>
                  ) : (
                    <button onClick={() => setPhoneRevealed(true)} className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" /> Nömrəni göstər {maskPhone(listing.phone).slice(-8)}
                    </button>
                  )}

                  <Link
                    to={`/hesab/mesajlar?seller=${encodeURIComponent(listing.seller.name)}&listing=${encodeURIComponent(listing.title)}`}
                    className="w-full h-12 border border-input bg-card text-foreground font-medium rounded-xl text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Mesaj yaz
                  </Link>
                </div>

                {/* Seller card */}
                <Link
                  to={seller.isShop ? `/magaza/${seller.id}` : `/istifadeci/${seller.id}`}
                  className="block bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${seller.isShop ? "bg-primary/10" : "bg-secondary"}`}>
                      {seller.isShop ? <Store className="w-7 h-7 text-primary" /> : <span className="text-xl font-bold text-primary">{seller.avatar}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">{seller.name}</p>
                        {seller.verified && (
                          <span className="shrink-0 w-5 h-5 bg-primary/15 text-primary rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {seller.isShop && (
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-primary fill-primary" /> {seller.rating}
                            <span className="text-muted-foreground/60">({seller.reviewCount})</span>
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">{seller.listingsCount} elan</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground shrink-0 transition-colors" />
                  </div>
                  <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span>{seller.isShop ? "Rəsmi mağaza" : "Təsdiqlənmiş"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Cavab: {seller.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{seller.memberSince}-dən bəri</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{seller.listingsCount} elan</span>
                    </div>
                  </div>
                </Link>

                {/* Safety tips */}
                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4">
                  <h3 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-primary" /> Təhlükəsizlik məsləhətləri
                  </h3>
                  <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                    <li>• Əvvəlcədən ödəniş etməyin</li>
                    <li>• Malı şəxsən yoxlayın</li>
                    <li>• İctimai yerlərdə görüşün</li>
                    <li>• Şübhəli elandan <Link to="/sikayat" className="text-primary hover:underline">şikayət edin</Link></li>
                  </ul>
                </div>

                {/* Desktop sidebar ad */}
                <div className="hidden lg:block">
                  <SidebarAd ad={mockBannerAds.listingSidebar} />
                </div>
              </div>
            </div>
          </div>

          {/* Sponsored */}
          {mockSponsoredListings.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <SponsoredBadge />
                <span className="text-sm font-bold text-foreground">Sizə maraqlı ola bilər</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mockSponsoredListings.map((sl) => (
                  <Link
                    key={sl.id}
                    to={sl.ctaLink}
                    className="bg-card rounded-xl border-2 border-primary/20 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group relative"
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
          <div className="mt-10">
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
                <MiniListingCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Similar */}
          <div className="mt-10">
            <h2 className="text-lg font-bold text-foreground mb-4">Oxşar elanlar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similar.map((item) => (
                <MiniListingCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Bottom banner */}
          <div className="mt-10">
            <AdBanner ad={mockBannerAds.categoriesBottom} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListingDetail;
