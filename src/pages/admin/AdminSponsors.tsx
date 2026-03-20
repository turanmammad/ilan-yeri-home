import { useState } from "react";
import { Megaphone, Eye, MousePointerClick, TrendingUp, Plus, Pause, Play, X, Sparkles, Loader2, Monitor, Smartphone, Info, Wand2, Check, Pencil } from "lucide-react";
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
  adText?: string;
}

const placementConfig: Record<AdPlacement, { label: string; size: string; desc: string; width: number; height: number }> = {
  banner: { label: "Ana Banner", size: "1200×300 px", desc: "Səhifənin yuxarısında tam genişlikdə görünür", width: 1200, height: 300 },
  sidebar: { label: "Yan Panel", size: "300×600 px", desc: "Sağ tərəfdə elanların yanında görünür", width: 300, height: 600 },
  listing: { label: "Elan Arası", size: "728×90 px", desc: "Elanlar arasında sətir halında görünür", width: 728, height: 90 },
  popup: { label: "Popup Reklam", size: "500×400 px", desc: "Səhifə açılanda modal olaraq görünür", width: 500, height: 400 },
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

// AI-generated ad text templates
const generateAdText = (name: string, advertiser: string, placement: AdPlacement): string => {
  const templates: Record<AdPlacement, string[]> = {
    banner: [
      `🔥 ${advertiser} — Ən sərfəli qiymətlər burada! ${name} kampaniyası ilə xüsusi endirimlər. İndi alış-veriş edin →`,
      `✨ ${advertiser}-da böyük endirim mövsümü! ${name} — Keyfiyyətli məhsullar, əlverişli qiymətlər. Qaçırmayın!`,
      `🎯 ${name} | ${advertiser} — Seçilmiş məhsullarda 50%-dək endirim. Məhdud sayda! Tələsin →`,
    ],
    sidebar: [
      `${advertiser}\n${name}\n\nXüsusi təkliflər\nsizi gözləyir!\n\n👉 Ətraflı bax`,
      `${advertiser}\n\n🎁 ${name}\n\nEndirimlər\nburada başlayır\n\n→ Keçid et`,
    ],
    listing: [
      `📢 ${advertiser} — ${name} | Xüsusi endirimlərdən yararlanın! →`,
      `⭐ Reklam: ${advertiser} ${name} kampaniyası davam edir!`,
    ],
    popup: [
      `🎉 Xoş gəlmisiniz!\n\n${advertiser} ${name} kampaniyası çərçivəsində bütün məhsullarda xüsusi endirimlər təqdim edir!\n\nİlk sifarişinizə 15% endirim kodu:\nUCUZTAP15\n\n✅ İndi yararlan`,
      `💥 ${name}\n\n${advertiser} sizə xüsusi təklif edir!\n\nSeçilmiş kateqoriyalarda\n🔥 30%-dək endirim\n🚚 Pulsuz çatdırılma\n\n→ Kampaniyaya bax`,
    ],
  };
  const arr = templates[placement];
  return arr[Math.floor(Math.random() * arr.length)];
};

// Placement preview component
const PlacementPreview = ({ placement, adText, advertiser }: { placement: AdPlacement; adText: string; advertiser: string }) => {
  const config = placementConfig[placement];

  if (placement === "banner") {
    return (
      <div className="rounded-xl border border-border overflow-hidden bg-secondary/30">
        <div className="text-[9px] text-muted-foreground px-2 py-0.5 bg-secondary/50 flex items-center gap-1">
          <Monitor className="w-2.5 h-2.5" /> Desktop görünüşü · {config.size}
        </div>
        {/* Mini site mockup */}
        <div className="p-2 space-y-1.5">
          {/* Header */}
          <div className="h-5 rounded bg-card border border-border flex items-center px-2">
            <div className="w-10 h-2.5 rounded bg-primary/30" />
            <div className="flex gap-1.5 ml-auto">
              <div className="w-6 h-1.5 rounded bg-muted-foreground/20" />
              <div className="w-6 h-1.5 rounded bg-muted-foreground/20" />
              <div className="w-6 h-1.5 rounded bg-muted-foreground/20" />
            </div>
          </div>
          {/* Banner ad */}
          <div className="rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 border-2 border-primary/40 p-3 relative">
            <div className="absolute top-1 right-1 text-[7px] bg-primary/20 text-primary px-1 rounded">REKLAM</div>
            <p className="text-[10px] text-foreground font-medium leading-relaxed whitespace-pre-wrap">{adText || `${advertiser} reklam banneri burada görünəcək`}</p>
          </div>
          {/* Content below */}
          <div className="grid grid-cols-3 gap-1.5">
            {[1,2,3].map(i => <div key={i} className="h-8 rounded bg-card border border-border/50" />)}
          </div>
        </div>
      </div>
    );
  }

  if (placement === "sidebar") {
    return (
      <div className="rounded-xl border border-border overflow-hidden bg-secondary/30">
        <div className="text-[9px] text-muted-foreground px-2 py-0.5 bg-secondary/50 flex items-center gap-1">
          <Monitor className="w-2.5 h-2.5" /> Desktop görünüşü · {config.size}
        </div>
        <div className="p-2">
          <div className="h-5 rounded bg-card border border-border mb-1.5 flex items-center px-2">
            <div className="w-10 h-2.5 rounded bg-primary/30" />
          </div>
          <div className="flex gap-1.5">
            {/* Content */}
            <div className="flex-1 space-y-1.5">
              {[1,2,3,4].map(i => <div key={i} className="h-6 rounded bg-card border border-border/50" />)}
            </div>
            {/* Sidebar ad */}
            <div className="w-24 rounded-lg bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary/40 p-2 relative shrink-0">
              <div className="absolute top-0.5 right-0.5 text-[6px] bg-primary/20 text-primary px-0.5 rounded">AD</div>
              <p className="text-[8px] text-foreground font-medium leading-relaxed whitespace-pre-wrap mt-2">{adText || `${advertiser}\nreklam`}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (placement === "listing") {
    return (
      <div className="rounded-xl border border-border overflow-hidden bg-secondary/30">
        <div className="text-[9px] text-muted-foreground px-2 py-0.5 bg-secondary/50 flex items-center gap-1">
          <Smartphone className="w-2.5 h-2.5" /> Mobil + Desktop · {config.size}
        </div>
        <div className="p-2 space-y-1.5">
          <div className="h-5 rounded bg-card border border-border" />
          <div className="h-6 rounded bg-card border border-border/50" />
          <div className="h-6 rounded bg-card border border-border/50" />
          {/* Listing ad */}
          <div className="rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 border-2 border-primary/40 px-3 py-2 relative">
            <div className="absolute top-0.5 right-1 text-[7px] bg-primary/20 text-primary px-1 rounded">REKLAM</div>
            <p className="text-[9px] text-foreground font-medium whitespace-pre-wrap">{adText || `${advertiser} — Elan arası reklam`}</p>
          </div>
          <div className="h-6 rounded bg-card border border-border/50" />
          <div className="h-6 rounded bg-card border border-border/50" />
        </div>
      </div>
    );
  }

  // popup
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-secondary/30">
      <div className="text-[9px] text-muted-foreground px-2 py-0.5 bg-secondary/50 flex items-center gap-1">
        <Monitor className="w-2.5 h-2.5" /> Popup görünüşü · {config.size}
      </div>
      <div className="p-2 relative">
        {/* Dimmed background */}
        <div className="space-y-1 opacity-30">
          <div className="h-4 rounded bg-card border border-border" />
          <div className="h-12 rounded bg-card border border-border" />
          <div className="grid grid-cols-3 gap-1">
            {[1,2,3].map(i => <div key={i} className="h-6 rounded bg-card border border-border/50" />)}
          </div>
        </div>
        {/* Popup overlay */}
        <div className="absolute inset-4 rounded-xl bg-card border-2 border-primary/40 shadow-xl p-3 flex flex-col items-center justify-center">
          <div className="absolute top-1 right-1.5 w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
            <X className="w-2.5 h-2.5 text-muted-foreground" />
          </div>
          <p className="text-[9px] text-foreground font-medium text-center whitespace-pre-wrap leading-relaxed">{adText || `${advertiser}\nPopup reklam`}</p>
        </div>
      </div>
    </div>
  );
};

const AdminSponsors = () => {
  const [ads, setAds] = useState<AdCampaign[]>(initialAds);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdCampaign | null>(null);
  const [newAd, setNewAd] = useState({ name: "", advertiser: "", placement: "banner" as AdPlacement, budget: "", days: "30" });
  const [editForm, setEditForm] = useState({ name: "", advertiser: "", placement: "banner" as AdPlacement, budget: "", days: "30" });
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const toggleStatus = (id: number) => {
    setAds(prev => prev.map(a => {
      if (a.id !== id || a.status === "ended") return a;
      return { ...a, status: a.status === "active" ? "paused" : "active" };
    }));
    toast.success("Reklam statusu dəyişdirildi");
  };

  const removeAd = (id: number) => {
    setAds(prev => prev.filter(a => a.id !== id));
    toast.success("Reklam silindi");
  };

  const handleAIGenerate = () => {
    const form = editDialogOpen ? editForm : newAd;
    if (!form.name || !form.advertiser) {
      toast.error("Əvvəlcə kampaniya adı və reklamçı daxil edin");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const text = generateAdText(form.name, form.advertiser, form.placement);
      setGeneratedText(text);
      setIsGenerating(false);
      toast.success("AI reklam mətni yaradıldı!");
    }, 1800);
  };

  const handleRegenerate = () => {
    const form = editDialogOpen ? editForm : newAd;
    setIsGenerating(true);
    setTimeout(() => {
      const text = generateAdText(form.name, form.advertiser, form.placement);
      setGeneratedText(text);
      setIsGenerating(false);
    }, 1200);
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
      startDate: "20.03.2026",
      endDate: `${parseInt(newAd.days) || 30} gün sonra`,
      adText: generatedText,
    };
    setAds(prev => [ad, ...prev]);
    setCreateDialogOpen(false);
    resetForm();
    toast.success("Yeni reklam kampaniyası yaradıldı!");
  };

  const resetForm = () => {
    setNewAd({ name: "", advertiser: "", placement: "banner", budget: "", days: "30" });
    setGeneratedText("");
    setStep(1);
  };

  const openDialog = () => {
    resetForm();
    setCreateDialogOpen(true);
  };

  const openEditDialog = (ad: AdCampaign) => {
    setEditingAd(ad);
    const budgetNum = ad.budget.replace(/[^\d]/g, "");
    setEditForm({ name: ad.name, advertiser: ad.advertiser, placement: ad.placement, budget: budgetNum, days: "30" });
    setGeneratedText(ad.adText || "");
    setStep(1);
    setEditDialogOpen(true);
  };

  const saveEdit = () => {
    if (!editingAd || !editForm.name || !editForm.advertiser || !editForm.budget) {
      toast.error("Bütün sahələri doldurun");
      return;
    }
    setAds(prev => prev.map(a => {
      if (a.id !== editingAd.id) return a;
      return { ...a, name: editForm.name, advertiser: editForm.advertiser, placement: editForm.placement, budget: `${editForm.budget} AZN`, adText: generatedText };
    }));
    setEditDialogOpen(false);
    setEditingAd(null);
    resetForm();
    toast.success("Kampaniya yeniləndi!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Sponsor & Reklam</h1>
          <p className="text-sm text-muted-foreground">Reklam kampaniyalarını idarə edin və gəlir əldə edin</p>
        </div>
        <button onClick={openDialog}
          className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-95 transition-all flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" /> Yeni reklam
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Ümumi göstərim", value: "673K", icon: Eye, color: "text-blue-500 bg-blue-500/10" },
          { label: "Ümumi klik", value: "32.3K", icon: MousePointerClick, color: "text-emerald-500 bg-emerald-500/10" },
          { label: "Orta CTR", value: "4.8%", icon: TrendingUp, color: "text-violet-500 bg-violet-500/10" },
          { label: "Ümumi gəlir", value: "922 AZN", icon: Megaphone, color: "text-amber-500 bg-amber-500/10" },
        ].map(s => (
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

      {/* Pricing Plans */}
      <div>
        <h2 className="text-sm font-bold text-foreground mb-3">Reklam paketləri</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {pricingPlans.map(plan => (
            <div key={plan.name} className={`bg-card rounded-2xl border-2 p-5 shadow-sm relative ${plan.color}`}>
              {plan.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">Populyar</span>
              )}
              <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
              <p className="text-xl font-extrabold text-primary mt-1">{plan.price}</p>
              <ul className="mt-3 space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Campaigns table */}
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
              {ads.map(a => {
                const st = statusConfig[a.status];
                return (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground text-sm">{a.name}</p>
                      <p className="text-[11px] text-muted-foreground">{a.advertiser} · {a.startDate} - {a.endDate}</p>
                    </td>
                    <td className="px-3 py-3 text-center hidden sm:table-cell">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-secondary text-foreground">{placementConfig[a.placement].label}</span>
                    </td>
                    <td className="px-3 py-3 text-center text-sm font-semibold text-foreground hidden md:table-cell">{a.impressions}</td>
                    <td className="px-3 py-3 text-center text-xs text-muted-foreground hidden md:table-cell">{a.ctr}</td>
                    <td className="px-3 py-3 text-center text-xs hidden lg:table-cell">
                      <p className="font-semibold text-foreground">{a.spent}</p>
                      <p className="text-[10px] text-muted-foreground">/ {a.budget}</p>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${st.cls}`}>{st.label}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {a.status !== "ended" && (
                          <button onClick={() => toggleStatus(a.id)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                            {a.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                        )}
                        <button onClick={() => openEditDialog(a)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Düzəliş et">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => removeAd(a.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
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

      {/* Create Ad Dialog - Enhanced with AI */}
      <Dialog open={createDialogOpen} onOpenChange={(o) => { setCreateDialogOpen(o); if (!o) resetForm(); }}>
        <DialogContent className="rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Yeni reklam kampaniyası
            </DialogTitle>
          </DialogHeader>

          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${step === 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              1. Məlumatlar
            </div>
            <div className="w-4 h-px bg-border" />
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${step === 2 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              2. AI Mətn & Önizləmə
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Kampaniya adı</label>
                <input value={newAd.name} onChange={e => setNewAd({ ...newAd, name: e.target.value })}
                  placeholder="Məs: Yaz Kampaniyası" className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Reklamçı</label>
                <input value={newAd.advertiser} onChange={e => setNewAd({ ...newAd, advertiser: e.target.value })}
                  placeholder="Şirkət və ya mağaza adı" className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>

              {/* Placement selection with visual cards */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Yerləşdirmə növü</label>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.entries(placementConfig) as [AdPlacement, typeof placementConfig["banner"]][]).map(([key, cfg]) => (
                    <button key={key} onClick={() => setNewAd({ ...newAd, placement: key })}
                      className={`text-left p-3 rounded-xl border-2 transition-all ${
                        newAd.placement === key ? "border-primary bg-primary/5" : "border-input hover:border-primary/30"
                      }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-foreground">{cfg.label}</span>
                        {newAd.placement === key && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-[11px] font-mono text-primary">{cfg.size}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{cfg.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Büdcə (AZN)</label>
                  <input type="number" value={newAd.budget} onChange={e => setNewAd({ ...newAd, budget: e.target.value })}
                    placeholder="300" className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Müddət (gün)</label>
                  <input type="number" value={newAd.days} onChange={e => setNewAd({ ...newAd, days: e.target.value })}
                    className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>

              <button onClick={() => { if (!newAd.name || !newAd.advertiser || !newAd.budget) { toast.error("Bütün sahələri doldurun"); return; } setStep(2); }}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-95 transition-all active:scale-[0.98]">
                Davam et — AI Mətn Yaradın →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* AI generation section */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">AI Reklam Mətni Generatoru</h4>
                    <p className="text-[10px] text-muted-foreground">AI avtomatik olaraq kampaniya məlumatlarına uyğun reklam mətni yaradacaq</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-secondary/50 rounded-lg px-3 py-1.5">
                  <Info className="w-3 h-3 shrink-0" />
                  <span>
                    <strong className="text-foreground">{placementConfig[newAd.placement].label}</strong> üçün optimal mətn — {placementConfig[newAd.placement].size}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button onClick={generatedText ? handleRegenerate : handleAIGenerate} disabled={isGenerating}
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:brightness-95 transition-all disabled:opacity-60">
                    {isGenerating ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Yaradılır...</>
                    ) : generatedText ? (
                      <><Wand2 className="w-4 h-4" /> Yenidən yarat</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> AI ilə mətn yarat</>
                    )}
                  </button>
                </div>
              </div>

              {/* Generated text editor */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Reklam mətni
                  {generatedText && <span className="text-[10px] text-primary ml-2">✨ AI tərəfindən yaradılıb</span>}
                </label>
                <textarea
                  value={generatedText}
                  onChange={e => setGeneratedText(e.target.value)}
                  rows={4}
                  placeholder="AI ilə yaradın və ya özünüz yazın..."
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none text-foreground"
                />
              </div>

              {/* Live placement preview */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  Baner önizləməsi — {placementConfig[newAd.placement].label}
                  <span className="text-[10px] text-muted-foreground font-normal">({placementConfig[newAd.placement].size})</span>
                </label>
                <PlacementPreview placement={newAd.placement} adText={generatedText} advertiser={newAd.advertiser} />
              </div>

              {/* Summary */}
              <div className="rounded-xl bg-secondary/50 p-3 space-y-1.5">
                <p className="text-xs font-bold text-foreground">Kampaniya xülasəsi</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                  <span className="text-muted-foreground">Kampaniya:</span><span className="text-foreground font-medium">{newAd.name}</span>
                  <span className="text-muted-foreground">Reklamçı:</span><span className="text-foreground font-medium">{newAd.advertiser}</span>
                  <span className="text-muted-foreground">Yerləşdirmə:</span><span className="text-foreground font-medium">{placementConfig[newAd.placement].label} ({placementConfig[newAd.placement].size})</span>
                  <span className="text-muted-foreground">Büdcə:</span><span className="text-foreground font-medium">{newAd.budget} AZN / {newAd.days} gün</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(1)}
                  className="h-11 px-5 rounded-xl border border-input text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                  ← Geri
                </button>
                <button onClick={createAd}
                  className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-95 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Kampaniya yarat
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSponsors;
