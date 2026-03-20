import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, Check, MapPin } from "lucide-react";
import { toast } from "sonner";

export interface EditableShop {
  id: number;
  name: string;
  owner: string;
  category: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
}

interface ShopEditDialogProps {
  shop: EditableShop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: EditableShop) => void;
}

const shopCategories = ["Elektronika", "Nəqliyyat", "Geyim", "Ev və bağ", "Uşaq aləmi", "İdman", "Gözəllik", "Xidmətlər"];

export const ShopEditDialog = ({ shop, open, onOpenChange, onSave }: ShopEditDialogProps) => {
  const [form, setForm] = useState<EditableShop>({ id: 0, name: "", owner: "", category: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (shop) {
      setForm({
        id: shop.id,
        name: shop.name,
        owner: shop.owner,
        category: shop.category,
        phone: shop.phone || "+994 50 123 45 67",
        email: shop.email || "shop@mail.az",
        address: shop.address || "Bakı",
        description: shop.description || "Mağaza haqqında məlumat",
      });
      setSaved(false);
    }
  }, [shop]);

  if (!shop) return null;

  const update = (key: keyof EditableShop, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error("Mağaza adı boş ola bilməz!"); return; }
    setSaved(true);
    onSave(form);
    toast.success("Mağaza uğurla yeniləndi!");
    setTimeout(() => { onOpenChange(false); setSaved(false); }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Mağazanı redaktə et (Admin)</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Mağaza adı</label>
            <input value={form.name} onChange={(e) => update("name", e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Sahib</label>
              <input value={form.owner} onChange={(e) => update("owner", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Kateqoriya</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {shopCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Təsvir</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt</label>
              <input value={form.email} onChange={(e) => update("email", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <MapPin className="w-3.5 h-3.5 inline mr-1" />Ünvan
            </label>
            <input value={form.address} onChange={(e) => update("address", e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground">⚠️ Admin olaraq düzəliş edirsiniz. Dəyişikliklər birbaşa tətbiq olunacaq.</p>
          </div>
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
