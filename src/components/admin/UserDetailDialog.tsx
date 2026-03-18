import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Mail, Phone, FileText, MapPin, Calendar, Shield } from "lucide-react";

interface UserItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  listings: number;
  status: string;
  joined: string;
  avatar: string;
}

const statusConfig: Record<string, { cls: string; label: string }> = {
  active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
  blocked: { cls: "bg-destructive/10 text-destructive", label: "Bloklanıb" },
  suspended: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Dayandırılıb" },
};

interface UserDetailDialogProps {
  user: UserItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserDetailDialog = ({ user, open, onOpenChange }: UserDetailDialogProps) => {
  if (!user) return null;
  const status = statusConfig[user.status] || statusConfig.active;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">İstifadəçi profili</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">{user.avatar}</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">{user.name}</h3>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${status.cls}`}>{status.label}</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">E-poçt</p>
                <p className="text-sm font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Telefon</p>
                <p className="text-sm font-medium text-foreground">{user.phone}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Elanlar</p>
                  <p className="text-sm font-bold text-foreground">{user.listings}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Qoşulub</p>
                  <p className="text-sm font-medium text-foreground">{user.joined}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Son aktivlik</h4>
            <div className="space-y-2">
              {[
                { text: "Yeni elan əlavə etdi", time: "2 saat əvvəl" },
                { text: "Profil məlumatlarını yenilədi", time: "1 gün əvvəl" },
                { text: "Mesaj göndərdi", time: "3 gün əvvəl" },
              ].map((a, i) => (
                <div key={i} className="flex items-center justify-between py-1.5">
                  <p className="text-sm text-foreground">{a.text}</p>
                  <p className="text-[11px] text-muted-foreground">{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
