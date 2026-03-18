import { useState } from "react";
import { Crown, Zap, ArrowUp, Search, CheckCircle, Clock, Eye, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

type BoostType = "premium" | "vip" | "ireli";

interface ListingItem {
  id: number;
  title: string;
  category: string;
  price: string;
  user: string;
  views: number;
  date: string;
}

const allListings: ListingItem[] = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", category: "Elektronika", price: "2,800 AZN", user: "Əli Məmmədov", views: 342, date: "12.03.2026" },
  { id: 2, title: "BMW 520d M Sport 2020", category: "Nəqliyyat", price: "45,000 AZN", user: "Rəşad Kərimov", views: 1205, date: "11.03.2026" },
  { id: 3, title: "3 otaqlı mənzil, 90m²", category: "Daşınmaz əmlak", price: "185,000 AZN", user: "Leyla Hüseynova", views: 89, date: "11.03.2026" },
  { id: 4, title: "IKEA divan, ağ rəng", category: "Ev və bağ", price: "450 AZN", user: "Nigar Rəhimli", views: 156, date: "10.03.2026" },
  { id: 5, title: "Samsung Galaxy S24 Ultra", category: "Elektronika", price: "2,100 AZN", user: "Fərid Əliyev", views: 523, date: "08.03.2026" },
  { id: 6, title: "2 otaqlı kirayə mənzil", category: "Daşınmaz əmlak", price: "600 AZN/ay", user: "Aynur Quliyeva", views: 67, date: "11.03.2026" },
  { id: 7, title: "Toyota Corolla 2023", category: "Nəqliyyat", price: "38,000 AZN", user: "Tural Abbasov", views: 890, date: "09.03.2026" },
  { id: 8, title: "Uşaq velosipedi 16\"", category: "Uşaq aləmi", price: "120 AZN", user: "Kamran Vəliyev", views: 34, date: "09.03.2026" },
];

const boostConfig: Record<BoostType, { label: string; icon: typeof Crown; color: string; bgColor: string; description: string; price: string; duration: string }> = {
  premium: {
    label: "Premium Elan",
    icon: Crown,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10 border-amber-500/20",
    description: "Elan axtarış nəticələrində ən yuxarıda, xüsusi çərçivə ilə göstərilir. Ən çox baxış toplayan paket.",
    price: "5 AZN / gün",
    duration: "7, 14 və ya 30 gün",
  },
  vip: {
    label: "VIP Elan",
    icon: Zap,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10 border-violet-500/20",
    description: "Ana səhifədə VIP bölməsində göstərilir. Premium çərçivə + VIP badge ilə fərqlənir.",
    price: "10 AZN / gün",
    duration: "3, 7 və ya 14 gün",
  },
  ireli: {
    label: "İrəli Çəkmə",
    icon: ArrowUp,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    description: "Elan kateqoriyasında birinci yerə çıxır. Bir dəfəlik əməliyyat.",
    price: "2 AZN",
    duration: "Bir dəfəlik",
  },
};

interface BoostedListing {
  listing: ListingItem;
  type: BoostType;
  startDate: string;
  endDate: string;
  status: "active" | "expired";
}

const AdminPromotions = () => {
  const [activeBoosts, setActiveBoosts] = useState<BoostedListing[]>([
    { listing: allListings[0], type: "premium", startDate: "10.03.2026", endDate: "17.03.2026", status: "active" },
    { listing: allListings[1], type: "vip", startDate: "08.03.2026", endDate: "15.03.2026", status: "active" },
    { listing: allListings[4], type: "ireli", startDate: "12.03.2026", endDate: "12.03.2026", status: "active" },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<BoostType>("premium");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListings, setSelectedListings] = useState<number[]>([]);
  const [selectedDuration, setSelectedDuration] = useState("7");

  const filteredListings = allListings.filter(
    (l) => !activeBoosts.some((b) => b.listing.id === l.id && b.type === selectedType) &&
      (!searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.user.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openBoostDialog = (type: BoostType) => {
    setSelectedType(type);
    setSelectedListings([]);
    setSearchQuery("");
    setDialogOpen(true);
  };

  const toggleListing = (id: number) => {
    setSelectedListings((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const applyBoost = () => {
    const now = "18.03.2026";
    const newBoosts: BoostedListing[] = selectedListings.map((id) => {
      const listing = allListings.find((l) => l.id === id)!;
      return { listing, type: selectedType, startDate: now, endDate: `${parseInt(selectedDuration) > 1 ? parseInt(selectedDuration) : 1} gün sonra`, status: "active" as const };
    });
    setActiveBoosts((prev) => [...prev, ...newBoosts]);
    setDialogOpen(false);
    toast.success(`${selectedListings.length} elan ${boostConfig[selectedType].label} olaraq təyin edildi`);
  };

  const removeBoost = (listingId: number, type: BoostType) => {
    setActiveBoosts((prev) => prev.filter((b) => !(b.listing.id === listingId && b.type === type)));
    toast.success("Boost ləğv edildi");
  };

  const config = boostConfig[selectedType];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Premium & VIP Elanlar</h1>
        <p className="text-sm text-muted-foreground">Elanları premium, VIP və irəli çəkmə ilə tanıdın</p>
      </div>

      {/* Boost Type Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {(Object.entries(boostConfig) as [BoostType, typeof boostConfig.premium][]).map(([type, cfg]) => {
          const count = activeBoosts.filter((b) => b.type === type && b.status === "active").length;
          return (
            <div key={type} className={`rounded-2xl border p-5 shadow-sm ${cfg.bgColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.color} bg-background/50`}>
                  <cfg.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{cfg.label}</h3>
                  <p className="text-[11px] text-muted-foreground">{cfg.price}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{cfg.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">{count} aktiv elan</span>
                <button
                  onClick={() => openBoostDialog(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${cfg.color} bg-background hover:opacity-80`}
                >
                  + Əlavə et
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Boosts Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Aktiv boost-lar</h2>
          <span className="text-xs text-muted-foreground">{activeBoosts.length} boost</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Elan</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">Tip</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Başlanğıc</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Bitmə</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {activeBoosts.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground text-sm">Aktiv boost yoxdur</td></tr>
              ) : (
                activeBoosts.map((b, i) => {
                  const cfg = boostConfig[b.type];
                  return (
                    <tr key={`${b.listing.id}-${b.type}-${i}`} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-medium text-foreground text-sm">{b.listing.title}</p>
                        <p className="text-[11px] text-muted-foreground">{b.listing.user} · {b.listing.price}</p>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${cfg.bgColor} ${cfg.color}`}>
                          <cfg.icon className="w-3 h-3" /> {cfg.label}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center text-xs text-muted-foreground hidden sm:table-cell">{b.startDate}</td>
                      <td className="px-3 py-3 text-center text-xs text-muted-foreground hidden sm:table-cell">{b.endDate}</td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => removeBoost(b.listing.id, b.type)}
                          className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                          title="Ləğv et"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Listing Selection Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-2xl max-w-lg max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <config.icon className={`w-5 h-5 ${config.color}`} />
              {config.label} — Elan seçin
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
            {/* Duration selection */}
            {selectedType !== "ireli" && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Müddət:</p>
                <div className="flex gap-2">
                  {(selectedType === "premium" ? ["7", "14", "30"] : ["3", "7", "14"]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${selectedDuration === d ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                    >
                      {d} gün
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Elan axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Listing List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0">
              {filteredListings.map((l) => {
                const selected = selectedListings.includes(l.id);
                return (
                  <button
                    key={l.id}
                    onClick={() => toggleListing(l.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                      selected ? "bg-primary/10 border border-primary/30" : "bg-secondary/30 border border-transparent hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                      selected ? "border-primary bg-primary" : "border-input"
                    }`}>
                      {selected && <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{l.title}</p>
                      <p className="text-[11px] text-muted-foreground">{l.user} · {l.price} · <Eye className="w-3 h-3 inline" /> {l.views}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0">{l.category}</span>
                  </button>
                );
              })}
              {filteredListings.length === 0 && (
                <p className="text-center py-6 text-sm text-muted-foreground">Elan tapılmadı</p>
              )}
            </div>

            {/* Apply */}
            <button
              onClick={applyBoost}
              disabled={selectedListings.length === 0}
              className={`w-full h-11 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                selectedListings.length > 0
                  ? "bg-primary text-primary-foreground hover:brightness-95 active:scale-[0.98]"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
              }`}
            >
              <config.icon className="w-4 h-4" />
              {selectedListings.length > 0
                ? `${selectedListings.length} elan ${config.label} et`
                : "Elan seçin"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPromotions;
