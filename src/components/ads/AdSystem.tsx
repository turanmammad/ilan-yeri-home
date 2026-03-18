import { ExternalLink, X } from "lucide-react";
import { useState } from "react";

// ==========================================
// AD DATA TYPES
// ==========================================
export interface AdBannerData {
  id: string;
  imageUrl?: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaLink: string;
  advertiser: string;
  size: "leaderboard" | "banner" | "sidebar" | "mobile" | "infeed";
  bgColor?: string;
}

export interface SponsoredListingData {
  id: number;
  title: string;
  price: string;
  location: string;
  img: string;
  advertiser: string;
  ctaLink: string;
}

export interface SponsoredShopData {
  id: number;
  name: string;
  category: string;
  rating: number;
  listings: number;
  location: string;
  advertiser: string;
}

// ==========================================
// MOCK AD DATA
// ==========================================
export const mockBannerAds: Record<string, AdBannerData> = {
  heroBottom: {
    id: "hero-bottom",
    title: "Yeni iPhone 16 Pro — Sifariş et!",
    description: "Rəsmi zəmanət ilə ən sərfəli qiymət. Pulsuz çatdırılma.",
    ctaText: "Sifariş et",
    ctaLink: "/magaza/1",
    advertiser: "TechStore Bakı",
    size: "leaderboard",
    bgColor: "from-primary/10 via-primary/5 to-transparent",
  },
  categoriesBottom: {
    id: "categories-bottom",
    title: "Kredit ilə avtomobil al — 0% ilkin ödəniş",
    description: "200+ avtomobil seçimi. Online müraciət.",
    ctaText: "Kəşf et",
    ctaLink: "/magaza/2",
    advertiser: "AvtoLux",
    size: "banner",
  },
  footerTop: {
    id: "footer-top",
    title: "Mağazanızı UcuzTap-da açın — ilk ay pulsuz!",
    description: "Minlərlə müştəriyə çatın. Premium mağaza paketləri.",
    ctaText: "Başla",
    ctaLink: "/reklam",
    advertiser: "UcuzTap",
    size: "leaderboard",
  },
  listingSidebar: {
    id: "listing-sidebar",
    title: "Elanınızı VIP edin",
    description: "10x daha çox baxış alın",
    ctaText: "VIP et",
    ctaLink: "/reklam",
    advertiser: "UcuzTap",
    size: "sidebar",
  },
  listingInfeed1: {
    id: "listing-infeed-1",
    title: "Samsung Galaxy S24 Ultra — Endirim!",
    description: "Rəsmi distribütor. 2 il zəmanət.",
    ctaText: "Al",
    ctaLink: "/magaza/1",
    advertiser: "TechStore Bakı",
    size: "infeed",
  },
  listingInfeed2: {
    id: "listing-infeed-2",
    title: "Ev əşyaları — 50% endirim",
    description: "Mebel, dekor və daha çox.",
    ctaText: "Bax",
    ctaLink: "/magaza/4",
    advertiser: "HomeStyle",
    size: "infeed",
  },
};

export const mockSponsoredListings: SponsoredListingData[] = [
  { id: 901, title: "iPhone 16 Pro Max 512GB — Rəsmi", price: "3,200 ₼", location: "Bakı", img: "/placeholder.svg", advertiser: "TechStore Bakı", ctaLink: "/elan/901" },
  { id: 902, title: "Toyota Corolla 2025 — 0 km", price: "48,000 ₼", location: "Bakı", img: "/placeholder.svg", advertiser: "AvtoLux", ctaLink: "/elan/902" },
];

export const mockSponsoredShops: SponsoredShopData[] = [
  { id: 801, name: "MegaTech", category: "Elektronika", rating: 4.9, listings: 450, location: "Bakı", advertiser: "MegaTech MMC" },
  { id: 802, name: "LuxHome", category: "Ev və bağ", rating: 4.7, listings: 320, location: "Bakı", advertiser: "LuxHome MMC" },
];

// ==========================================
// AD BANNER COMPONENT
// ==========================================
export const AdBanner = ({ ad, className = "" }: { ad: AdBannerData; className?: string }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const sizeClasses: Record<string, string> = {
    leaderboard: "py-5 sm:py-6 px-6 sm:px-8",
    banner: "py-4 px-5 sm:px-6",
    sidebar: "py-4 px-4",
    mobile: "py-3 px-4",
    infeed: "py-4 px-5",
  };

  const isLarge = ad.size === "leaderboard";

  return (
    <div className={`relative bg-card border border-border rounded-2xl overflow-hidden group ${sizeClasses[ad.size]} ${className}`}>
      {/* Gradient accent */}
      <div className={`absolute inset-0 bg-gradient-to-r ${ad.bgColor || "from-primary/5 to-transparent"} pointer-events-none`} />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
              Reklam
            </span>
            <span className="text-[10px] text-muted-foreground">{ad.advertiser}</span>
          </div>
          <h3 className={`font-bold text-foreground truncate ${isLarge ? "text-base sm:text-lg" : "text-sm"}`}>
            {ad.title}
          </h3>
          {ad.description && (
            <p className={`text-muted-foreground mt-0.5 truncate ${isLarge ? "text-sm" : "text-xs"}`}>
              {ad.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {ad.ctaText && (
            <a
              href={ad.ctaLink}
              className={`bg-primary text-primary-foreground font-semibold rounded-xl hover:brightness-95 active:scale-95 transition-all flex items-center gap-1.5 ${
                isLarge ? "px-5 py-2.5 text-sm" : "px-3.5 py-2 text-xs"
              }`}
            >
              {ad.ctaText}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
            title="Reklamı gizlət"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SPONSORED BADGE
// ==========================================
export const SponsoredBadge = ({ className = "" }: { className?: string }) => (
  <span className={`text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded ${className}`}>
    Sponsorlu
  </span>
);

// ==========================================
// IN-FEED AD (between listing cards)
// ==========================================
export const InFeedAd = ({ ad }: { ad: AdBannerData }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="col-span-2 sm:col-span-3 lg:col-span-4">
      <div className="relative bg-card border border-dashed border-primary/30 rounded-2xl p-4 sm:p-5 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-primary/10 px-1.5 py-0.5 rounded">
                Reklam
              </span>
              <span className="text-[10px] text-muted-foreground">{ad.advertiser}</span>
            </div>
            <h3 className="text-sm font-bold text-foreground">{ad.title}</h3>
            {ad.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{ad.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={ad.ctaLink}
              className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-xl text-xs hover:brightness-95 active:scale-95 transition-all flex items-center gap-1.5"
            >
              {ad.ctaText || "Bax"}
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SIDEBAR AD
// ==========================================
export const SidebarAd = ({ ad }: { ad: AdBannerData }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-card relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
            Reklam
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        <div className="aspect-[4/3] bg-secondary rounded-xl mb-3 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">300×250</span>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-1">{ad.title}</h3>
        {ad.description && (
          <p className="text-xs text-muted-foreground mb-3">{ad.description}</p>
        )}
        <a
          href={ad.ctaLink}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-xl text-xs hover:brightness-95 active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          {ad.ctaText || "Ətraflı"}
          <ExternalLink className="w-3 h-3" />
        </a>
        <p className="text-[10px] text-muted-foreground text-center mt-2">{ad.advertiser}</p>
      </div>
    </div>
  );
};
