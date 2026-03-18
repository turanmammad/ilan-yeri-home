import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Clock, Eye, FileText, ExternalLink, MapPin } from "lucide-react";

interface Shop {
  id: number;
  name: string;
  owner: string;
  category: string;
  listings: number;
  rating: number;
  views: string;
  status: string;
  joined: string;
  avatar: string;
}

const statusConfig: Record<string, { cls: string; label: string }> = {
  active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
  suspended: { cls: "bg-destructive/10 text-destructive", label: "Dayandırılıb" },
  pending: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Gözləyir" },
};

interface ShopDetailDialogProps {
  shop: Shop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShopDetailDialog = ({ shop, open, onOpenChange }: ShopDetailDialogProps) => {
  if (!shop) return null;
  const status = statusConfig[shop.status] || statusConfig.active;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Mağaza detalları</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">{shop.avatar}</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">{shop.name}</h3>
              <p className="text-xs text-muted-foreground">{shop.owner}</p>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${status.cls}`}>{status.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Elanlar</p>
                <p className="text-sm font-bold text-foreground">{shop.listings}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Reytinq</p>
                <p className="text-sm font-bold text-foreground">{shop.rating}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <Eye className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Baxış</p>
                <p className="text-sm font-bold text-foreground">{shop.views}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Qoşulub</p>
                <p className="text-sm font-medium text-foreground">{shop.joined}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-[11px] text-muted-foreground">Kateqoriya</p>
              <p className="text-sm font-medium text-foreground">{shop.category}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Son elanları</h4>
            <div className="space-y-2">
              {["iPhone 15 Pro Max - 2,800 AZN", "Samsung Galaxy S24 - 2,100 AZN", "MacBook Air M2 - 2,400 AZN"].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <p className="text-sm text-foreground">{item}</p>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
