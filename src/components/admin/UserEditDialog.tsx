import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, Check, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

export interface EditableUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role?: string;
  note?: string;
}

interface UserEditDialogProps {
  user: EditableUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: EditableUser) => void;
}

const roles = ["İstifadəçi", "Mağaza sahibi", "Moderator", "Admin"];

export const UserEditDialog = ({ user, open, onOpenChange, onSave }: UserEditDialogProps) => {
  const [form, setForm] = useState<EditableUser>({ id: 0, name: "", email: "", phone: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role || "İstifadəçi",
        note: user.note || "",
      });
      setSaved(false);
    }
  }, [user]);

  if (!user) return null;

  const update = (key: keyof EditableUser, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error("Ad boş ola bilməz!"); return; }
    if (!form.email.trim()) { toast.error("E-poçt boş ola bilməz!"); return; }
    setSaved(true);
    onSave(form);
    toast.success("İstifadəçi uğurla yeniləndi!");
    setTimeout(() => { onOpenChange(false); setSaved(false); }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">İstifadəçini redaktə et (Admin)</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Ad Soyad</label>
            <input value={form.name} onChange={(e) => update("name", e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                <Mail className="w-3.5 h-3.5 inline mr-1" />E-poçt
              </label>
              <input value={form.email} onChange={(e) => update("email", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                <Phone className="w-3.5 h-3.5 inline mr-1" />Telefon
              </label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Rol</label>
            <select value={form.role} onChange={(e) => update("role", e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Admin qeydi</label>
            <textarea value={form.note} onChange={(e) => update("note", e.target.value)} rows={3}
              placeholder="Bu istifadəçi haqqında daxili qeyd..."
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
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
