import { Search, Filter, Eye, CheckCircle, XCircle, MessageCircle, AlertTriangle, Flag, Clock } from "lucide-react";

const mockReports = [
  { id: 1, reason: "Saxta elan — mövcud olmayan məhsul", listing: "iPhone 14 Pro 128GB", listingId: 4521, reporter: "Kamran Vəliyev", reported: "FakeUser123", priority: "high", status: "open", date: "18.03.2026, 14:23" },
  { id: 2, reason: "Yanlış qiymət göstərilib", listing: "Toyota Camry 2022 Hybrid", listingId: 3892, reporter: "Səbinə Muradova", reported: "AutoDeal_Baku", priority: "medium", status: "open", date: "18.03.2026, 11:45" },
  { id: 3, reason: "Təkrar elan — eyni məhsul 3 dəfə", listing: "2 otaqlı mənzil Nərimanov", listingId: 5103, reporter: "Orxan İsmayılov", reported: "Leyla_H", priority: "low", status: "reviewing", date: "17.03.2026, 22:10" },
  { id: 4, reason: "Təhqiramiz məzmun — şəkillərdə uyğunsuz yazı", listing: "Geyim satışı topdan", listingId: 4890, reporter: "Aynur Əliyeva", reported: "ShopMaster", priority: "high", status: "open", date: "17.03.2026, 18:34" },
  { id: 5, reason: "Qanunə zidd — lisenziyasız dərman satışı", listing: "Təbii müalicə vasitələri", listingId: 5210, reporter: "Elçin Həsənov", reported: "NaturalCure", priority: "high", status: "resolved", date: "17.03.2026, 09:15" },
  { id: 6, reason: "Spam — eyni mesaj 10+ istifadəçiyə", listing: "-", listingId: 0, reporter: "Sistem", reported: "SpamBot99", priority: "medium", status: "resolved", date: "16.03.2026, 20:05" },
];

const priorityBadge = (p: string) => {
  const map: Record<string, { cls: string; label: string }> = {
    high: { cls: "bg-destructive/10 text-destructive", label: "Yüksək" },
    medium: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Orta" },
    low: { cls: "bg-secondary text-muted-foreground", label: "Aşağı" },
  };
  const { cls, label } = map[p] || map.low;
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${cls}`}>{label}</span>;
};

const statusBadge = (s: string) => {
  const map: Record<string, { cls: string; label: string }> = {
    open: { cls: "bg-destructive/10 text-destructive", label: "Açıq" },
    reviewing: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Araşdırılır" },
    resolved: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Həll edilib" },
  };
  const { cls, label } = map[s] || map.open;
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${cls}`}>{label}</span>;
};

const AdminReports = () => (
  <div className="space-y-5">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-foreground">Şikayətlər</h1>
        <p className="text-sm text-muted-foreground">İstifadəçi şikayətlərini nəzərdən keçirin</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Şikayət axtar..." className="h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="h-9 px-3 rounded-xl border border-input bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" /> Filter
        </button>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Açıq şikayətlər", value: "47", icon: Flag, color: "text-destructive bg-destructive/10" },
        { label: "Araşdırılır", value: "12", icon: Clock, color: "text-amber-500 bg-amber-500/10" },
        { label: "Həll edilib (bu ay)", value: "189", icon: CheckCircle, color: "text-emerald-500 bg-emerald-500/10" },
        { label: "Ort. cavab müddəti", value: "2.4 saat", icon: AlertTriangle, color: "text-violet-500 bg-violet-500/10" },
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

    {/* Tabs */}
    <div className="flex gap-1 bg-secondary/50 rounded-xl p-1 w-fit">
      {[{ l: "Hamısı", c: 248 }, { l: "Açıq", c: 47 }, { l: "Araşdırılır", c: 12 }, { l: "Həll edilib", c: 189 }].map((t, i) => (
        <button key={t.l} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${i === 0 ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          {t.l} <span className="text-muted-foreground ml-1">({t.c})</span>
        </button>
      ))}
    </div>

    {/* Reports list */}
    <div className="space-y-3">
      {mockReports.map((r) => (
        <div key={r.id} className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                {priorityBadge(r.priority)}
                {statusBadge(r.status)}
                <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{r.date}</span>
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">{r.reason}</p>
              {r.listingId > 0 && (
                <p className="text-xs text-muted-foreground mb-2">
                  Elan: <span className="text-foreground font-medium">{r.listing}</span> <span className="text-muted-foreground">#{r.listingId}</span>
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Şikayətçi: <span className="text-foreground">{r.reporter}</span></span>
                <span>Şikayət olunan: <span className="text-foreground">{r.reported}</span></span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {r.listingId > 0 && (
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Elanı bax"><Eye className="w-4 h-4" /></button>
              )}
              <button className="p-2 rounded-lg hover:bg-emerald-500/10 transition-colors text-muted-foreground hover:text-emerald-600" title="Həll et"><CheckCircle className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Rədd et"><XCircle className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Pagination */}
    <div className="flex items-center justify-between">
      <p className="text-xs text-muted-foreground">1-6 / 248 şikayət</p>
      <div className="flex gap-1">
        {[1, 2, 3, "...", 42].map((p, i) => (
          <button key={i} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>{p}</button>
        ))}
      </div>
    </div>
  </div>
);

export default AdminReports;
