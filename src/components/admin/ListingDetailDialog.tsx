import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Clock, User, Tag, Bot, ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface Listing {
  id: number;
  title: string;
  category: string;
  price: string;
  user: string;
  status: string;
  views: number;
  date: string;
  aiScore?: number;
  aiFlags?: string[];
}

const statusConfig: Record<string, { cls: string; label: string }> = {
  active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
  pending: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Gözləyir" },
  rejected: { cls: "bg-destructive/10 text-destructive", label: "Rədd" },
};

interface ListingDetailDialogProps {
  listing: Listing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

export const ListingDetailDialog = ({ listing, open, onOpenChange, onApprove, onReject }: ListingDetailDialogProps) => {
  if (!listing) return null;
  const status = statusConfig[listing.status] || statusConfig.pending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">Elan detalları</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          {/* Title & Status */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-foreground">{listing.title}</h3>
              <p className="text-lg font-bold text-primary mt-1">{listing.price}</p>
            </div>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${status.cls}`}>{status.label}</span>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Kateqoriya</p>
                <p className="text-sm font-medium text-foreground">{listing.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <User className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">İstifadəçi</p>
                <p className="text-sm font-medium text-foreground">{listing.user}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <Eye className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Baxış sayı</p>
                <p className="text-sm font-bold text-foreground">{listing.views.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Tarix</p>
                <p className="text-sm font-medium text-foreground">{listing.date}</p>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          {listing.aiScore !== undefined && (
            <div className="p-4 rounded-xl border border-border bg-secondary/20">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-bold text-foreground">AI Analiz Nəticəsi</h4>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Təhlükəsizlik skoru</span>
                    <span className={`font-bold ${listing.aiScore >= 80 ? "text-emerald-500" : listing.aiScore >= 50 ? "text-amber-500" : "text-destructive"}`}>
                      {listing.aiScore}/100
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${listing.aiScore >= 80 ? "bg-emerald-500" : listing.aiScore >= 50 ? "bg-amber-500" : "bg-destructive"}`}
                      style={{ width: `${listing.aiScore}%` }}
                    />
                  </div>
                </div>
                {listing.aiScore >= 80 ? (
                  <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                ) : listing.aiScore >= 50 ? (
                  <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
                )}
              </div>
              {listing.aiFlags && listing.aiFlags.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase">Aşkar edilən problemlər:</p>
                  {listing.aiFlags.map((flag, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground">
                      <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                      {flag}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Actions for pending */}
          {listing.status === "pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => { onApprove?.(listing.id); onOpenChange(false); }}
                className="flex-1 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Təsdiq et
              </button>
              <button
                onClick={() => { onReject?.(listing.id); onOpenChange(false); }}
                className="flex-1 h-10 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" /> Rədd et
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
