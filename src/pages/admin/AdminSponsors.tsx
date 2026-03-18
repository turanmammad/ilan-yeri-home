import { useState } from "react";
import { Megaphone, Eye, MousePointerClick, TrendingUp, Plus, Calendar, ExternalLink, Pause, Play, X, Image, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

type AdStatus = "active" | "paused" | "ended";
type AdPlacement = "banner" | "sidebar" | "listing" | "popup";

interface AdCampaign {
  id: number;
  name: string;
  advertiser: string;
  placement: AdPlacement;
  status: AdStatus;
  impressions: string;
  clicks: string;
  ctr: string;
  budget: string;
  spent: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
}

const placementLabels: Record<AdPlacement, string> = {
  banner: "Ana Banner",
  sidebar: "Yan Panel",
  listing: "Elan Arası",
  popup: "Popup Reklam",
};

const statusConfig: Record<AdStatus, { cls: string; label: string }> = {
  active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
  paused: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Dayandırılıb" },
  ended: { cls: "bg-secondary text-muted-foreground", label: "Bitib" },
};

const initialAds: AdCampaign[] = [
  { id: 1, name: "Yaz Kampaniyası 2026", advertiser: "TechStore Baku", placement: "banner", status: "active", impressions: "245K", clicks: "12.4K", ctr: "5.1%", budget: "500 AZN", spent: "342 AZN", startDate: "01.03.2026", endDate: "31.03.2026" },
  { id: 2, name: "Avtomobil Satışı", advertiser: "AutoParts AZ", placement: "listing", status: "active", impressions: "180K", clicks: "8.9K", ctr: "4.9%", budget: "300 AZN", spent: "210 AZN", startDate: "05.03.2026", endDate: "20.03.2026" },
  { id: 3, name: "Moda Həftəsi", advertiser: "FashionHub", placement: "sidebar", status: "paused", impressions: "92K", clicks: "3.2K", ctr: "3.5%", budget: "200 AZN", spent: "120 AZN", startDate: "10.03.2026", endDate: "25.03.2026" },
  { id: 4, name: "Yeni Mağaza Açılışı", advertiser: "KidsWorld", placement: "popup", status: "ended", impressions: "156K", clicks: "7.8K", ctr: "5.0%", budget: "250 AZN", spent: "250 AZN", startDate: "01.02.2026", endDate: "28.02.2026" },
];

const pricingPlans = [
  { name: "Başlanğıc", price: "100 AZN/ay", features: ["Banner reklam (1 ədəd)", "Aylıq 50K göstərim", "Əsas statistika"], color: "border-border" },
  { name: "Biznes", price: "300 AZN/ay", features: ["Banner + Yan panel", "Aylıq 200K göstərim", "Ətraflı analitika", "A/B test"], color: "border-primary", popular: true },
  { name: "Premium", price: "500 AZN/ay", features: ["Bütün yerləşdirmə növləri", "Limitsiz göstərim", "Real-time analitika", "Prioritet dəstək", "Xüsusi dizayn"], color: "border-amber-500" },
];

const AdminSponsors = () => {
  const [ads, setAds] = useState<AdCampaign[]>(initialAds);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newAd, setNewAd] = useState({ name: "", advertiser: "", placement: "banner" as AdPlacement, budget: "", days: "30" });

  const toggleStatus = (id: number) => {
    setAds((prev) => prev.map((a) => {
      if (a.id !== id) return a;
      if (a.status === "ended") return a;
      const newStatus = a.status === "active" ? "paused" : "active";
      return { ...a, status: newStatus };
    }));
    toast.success("Reklam statusu dəyişdirildi");
  };

  const removeAd = (id: number) => {
    setAds((prev) => prev.filter((a) => a.id !== id));
    toast.success("Reklam silindi");
  };

  const createAd = () => {
    if (!newAd.name || !newAd.advertiser || !newAd.budget) {
      toast.error("Bütün sahələri doldurun");
      return;
    }
    const ad: AdCampaign = {
      id: Date.now(),
      name: newAd.name,
      advertiser: newAd.advertiser,
      placement: newAd.placement,
      status: "active",
      impressions: "0",
      clicks: "0",
      ctr: "0%",
      budget: `${newAd.budget} AZN`,
      spent: "0 AZN",
      startDate: "18.03.2026",
      endDate: `${parseInt(newAd.days)} gün sonra`,
    };
    setAds((prev) => [ad, ...prev]);
    setCreateDialogOpen(false);
    setNewAd({ name: "", advertiser: "", placement: "banner", budget: "", days: "30" });
    toast.success("Yeni reklam kampaniyası yaradıldı");
  };

  const totalImpressions = "673K";
  const totalClicks = "32.3K";
  const avgCTR = "4.8%";
  const totalRevenue = "922 AZN";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Sponsor & Reklam</h1>
          <p className="text-sm text-muted-foreground">Reklam kampaniyalarını idarə edin və gəlir əldə edin</p>
        </div>
        <button
          onClick={() => setCreateDialogOpen(true)}
          className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-95 transition-all flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" /> Yeni reklam
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Ümumi göstərim", value: totalImpressions, icon: Eye, color: "text-blue-500 bg-blue-500/10" },
          { label: "Ümumi klik", value: totalClicks, icon: MousePointerClick, color: "text-emerald-500 bg-emerald-500/10" },
          { label: "Orta CTR", value: avgCTR, icon: TrendingUp, color: "text-violet-500 bg-violet-500/10" },
          { label: "Ümumi gəlir", value: totalRevenue, icon: Megaphone, color: "text-amber-500 bg-amber-500/10" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Pricing Plans for advertisers */}
      <div>
        <h2 className="text-sm font-bold text-foreground mb-3">Reklam paketləri</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`bg-card rounded-2xl border-2 p-5 shadow-sm relative ${plan.color}`}>
              {plan.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  Populyar
                </span>
              )}
              <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
              <p className="text-xl font-extrabold text-primary mt-1">{plan.price}</p>
              <ul className="mt-3 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-bold text-foreground">Reklam kampaniyaları</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Kampaniya</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Yerləşdirmə</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Göstərim</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">CTR</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Büdcə</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((a) => {
                const st = statusConfig[a.status];
                return (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground text-sm">{a.name}</p>
                      <p className="text-[11px] text-muted-foreground">{a.advertiser} · {a.startDate} - {a.endDate}</p>
                    </td>
                    <td className="px-3 py-3 text-center hidden sm:table-cell">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-secondary text-foreground">{placementLabels[a.placement]}</span>
                    </td>
                    <td className="px-3 py-3 text-center text-sm font-semibold text-foreground hidden md:table-cell">{a.impressions}</td>
                    <td className="px-3 py-3 text-center text-xs text-muted-foreground hidden md:table-cell">{a.ctr}</td>
                    <td className="px-3 py-3 text-center text-xs text-muted-foreground hidden lg:table-cell">
                      <p className="font-semibold text-foreground">{a.spent}</p>
                      <p className="text-[10px]">/ {a.budget}</p>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${st.cls}`}>{st.label}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {a.status !== "ended" && (
                          <button onClick={() => toggleStatus(a.id)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title={a.status === "active" ? "Dayandır" : "Davam et"}>
                            {a.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                        )}
                        <button onClick={() => removeAd(a.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Sil">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Ad Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Yeni reklam kampaniyası</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Kampaniya adı</label>
              <input
                value={newAd.name}
                onChange={(e) => setNewAd({ ...newAd, name: e.target.value })}
                placeholder="Məs: Yaz Kampaniyası"
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Reklamçı</label>
              <input
                value={newAd.advertiser}
                onChange={(e) => setNewAd({ ...newAd, advertiser: e.target.value })}
                placeholder="Şirkət və ya mağaza adı"
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Yerləşdirmə</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(placementLabels) as [AdPlacement, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setNewAd({ ...newAd, placement: key })}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      newAd.placement === key ? "border-primary bg-primary/10 text-primary" : "border-input text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Büdcə (AZN)</label>
                <input
                  type="number"
                  value={newAd.budget}
                  onChange={(e) => setNewAd({ ...newAd, budget: e.target.value })}
                  placeholder="300"
                  className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Müddət (gün)</label>
                <input
                  type="number"
                  value={newAd.days}
                  onChange={(e) => setNewAd({ ...newAd, days: e.target.value })}
                  className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <button
              onClick={createAd}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-95 transition-all active:scale-[0.98]"
            >
              Kampaniya yarat
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSponsors;
