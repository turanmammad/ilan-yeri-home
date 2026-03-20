import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, Check, ImagePlus, X, MapPin, Star, Zap, Crown, Calendar } from "lucide-react";
import { toast } from "sonner";

export interface EditableListing {
  id: number;
  title: string;
  price: string;
  category?: string;
  description?: string;
  location?: string;
  phone?: string;
  images?: string[];
  promotion?: "none" | "vip" | "urgent" | "premium";
  promotionExpiry?: string;
}

interface ListingEditDialogProps {
  listing: EditableListing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: EditableListing) => void;
  isAdmin?: boolean;
}

const categories = [
  "Nəqliyyat", "Daşınmaz əmlak", "Elektronika", "İş və biznes",
  "Geyim", "Ev və bağ", "Uşaq aləmi", "Hobbi və idman",
  "Xidmətlər", "Heyvanlar", "Kompüter", "Gözəllik",
];

const cities = ["Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Şirvan", "Naxçıvan", "Lənkəran", "Şəki"];

const promotionOptions = [
  { key: "none" as const, label: "Heç biri", icon: X, desc: "Standart elan", cls: "border-border text-muted-foreground" },
  { key: "urgent" as const, label: "İrəli çək", icon: Zap, desc: "Elan siyahıda üstə çıxır", cls: "border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/5" },
  { key: "vip" as const, label: "VIP", icon: Star, desc: "VIP nişanı + üstə çıxma", cls: "border-primary/40 text-primary bg-primary/5" },
  { key: "premium" as const, label: "Premium", icon: Crown, desc: "Premium nişanı + maksimal görünürlük", cls: "border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/5" },
];

// Default expiry: 7 days from now
const defaultExpiry = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
};

export const ListingEditDialog = ({ listing, open, onOpenChange, onSave, isAdmin }: ListingEditDialogProps) => {
  const [form, setForm] = useState<EditableListing>({
    id: 0, title: "", price: "", category: "", description: "", location: "", phone: "", promotion: "none", promotionExpiry: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (listing) {
      setForm({
        id: listing.id,
        title: listing.title,
        price: listing.price,
        category: listing.category || "Elektronika",
        description: listing.description || "Bu elan üçün ətraflı təsvir mövcuddur. Məhsul yaxşı vəziyyətdədir.",
        location: listing.location || "Bakı",
        phone: listing.phone || "+994 50 123 45 67",
        images: listing.images || ["/placeholder.svg"],
        promotion: listing.promotion || "none",
        promotionExpiry: listing.promotionExpiry || "",
      });
      setSaved(false);
    }
  }, [listing]);

  if (!listing) return null;

  const update = (key: keyof EditableListing, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const setPromotion = (promo: "none" | "vip" | "urgent" | "premium") => {
    setForm(f => ({
      ...f,
      promotion: promo,
      promotionExpiry: promo === "none" ? "" : (f.promotionExpiry || defaultExpiry()),
    }));
    setSaved(false);
  };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error("Elan başlığı boş ola bilməz!"); return; }
    if (!form.price.trim()) { toast.error("Qiymət göstərilməlidir!"); return; }
    if (form.promotion !== "none" && !form.promotionExpiry) { toast.error("Promosyon tarixi seçilməlidir!"); return; }
    setSaved(true);
    onSave(form);
    const promoLabels: Record<string, string> = { none: "", vip: " (VIP)", urgent: " (İrəli çəkildi)", premium: " (Premium)" };
    toast.success(`Elan uğurla yeniləndi${promoLabels[form.promotion || "none"]}!`);
    setTimeout(() => {
      onOpenChange(false);
      setSaved(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isAdmin ? "Elanı redaktə et (Admin)" : "Elanı redaktə et"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image preview */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Şəkillər</label>
            <div className="flex gap-2 flex-wrap">
              {(form.images || ["/placeholder.svg"]).map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl bg-secondary overflow-hidden border border-border group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-destructive/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
                <ImagePlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Başlıq</label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Qiymət</label>
              <input value={form.price} onChange={(e) => update("price", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Kateqoriya</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Təsvir</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>

          {/* Location + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                <MapPin className="w-3.5 h-3.5 inline mr-1" />Şəhər
              </label>
              <select value={form.location} onChange={(e) => update("location", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          {/* Promotion section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">Elanı irəli çək / VIP / Premium</label>
            <div className="grid grid-cols-2 gap-2">
              {promotionOptions.map((opt) => {
                const active = form.promotion === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setPromotion(opt.key)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                      active ? opt.cls + " ring-1 ring-offset-1 ring-offset-background" : "border-border hover:bg-secondary/50"
                    } ${active && opt.key !== "none" ? "ring-current" : ""}`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      active && opt.key !== "none" ? "bg-current/10" : "bg-secondary"
                    }`}>
                      <opt.icon className={`w-4 h-4 ${active && opt.key !== "none" ? "" : "text-muted-foreground"}`} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold ${active ? "" : "text-foreground"}`}>{opt.label}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expiry date */}
            {form.promotion !== "none" && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Bitmə tarixi</label>
                  <input
                    type="date"
                    value={form.promotionExpiry}
                    onChange={(e) => update("promotionExpiry", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="text-right shrink-0">
                  <div className="flex gap-1">
                    {[3, 7, 14, 30].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          const date = new Date();
                          date.setDate(date.getDate() + d);
                          update("promotionExpiry", date.toISOString().split("T")[0]);
                        }}
                        className="px-2 py-1 rounded-md bg-secondary text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        {d}g
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Admin note */}
          {isAdmin && (
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-xs text-muted-foreground">
                ⚠️ Admin olaraq düzəliş edirsiniz. Dəyişikliklər birbaşa tətbiq olunacaq.
              </p>
            </div>
          )}

          {/* Save */}
          <button onClick={handleSave}
            className={`flex items-center justify-center gap-2 w-full h-11 font-semibold rounded-xl text-sm transition-all active:scale-[0.98] ${
              saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
            }`}>
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Yadda saxlanıldı!" : "Dəyişiklikləri yadda saxla"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
