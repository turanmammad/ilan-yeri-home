import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, Check, ImagePlus, X, MapPin } from "lucide-react";
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

export const ListingEditDialog = ({ listing, open, onOpenChange, onSave, isAdmin }: ListingEditDialogProps) => {
  const [form, setForm] = useState<EditableListing>({
    id: 0, title: "", price: "", category: "", description: "", location: "", phone: "",
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
      });
      setSaved(false);
    }
  }, [listing]);

  if (!listing) return null;

  const update = (key: keyof EditableListing, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error("Elan başlığı boş ola bilməz!"); return; }
    if (!form.price.trim()) { toast.error("Qiymət göstərilməlidir!"); return; }
    setSaved(true);
    onSave(form);
    toast.success("Elan uğurla yeniləndi!");
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
