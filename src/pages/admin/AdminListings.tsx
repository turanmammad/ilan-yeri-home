import { Search, Filter, MoreHorizontal, Eye, Trash2, Ban, Clock } from "lucide-react";

const mockListings = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", category: "Elektronika", price: "2,800 AZN", user: "Əli Məmmədov", status: "active", views: 342, date: "12.03.2026" },
  { id: 2, title: "BMW 520d M Sport 2020", category: "Nəqliyyat", price: "45,000 AZN", user: "Rəşad Kərimov", status: "active", views: 1205, date: "11.03.2026" },
  { id: 3, title: "3 otaqlı mənzil, 90m²", category: "Daşınmaz əmlak", price: "185,000 AZN", user: "Leyla Hüseynova", status: "pending", views: 89, date: "11.03.2026" },
  { id: 4, title: "MacBook Pro M3 14\"", category: "Elektronika", price: "3,200 AZN", user: "Tural Abbasov", status: "rejected", views: 0, date: "10.03.2026" },
  { id: 5, title: "IKEA divan, ağ rəng", category: "Ev və bağ", price: "450 AZN", user: "Nigar Rəhimli", status: "active", views: 156, date: "10.03.2026" },
  { id: 6, title: "Uşaq velosipedi 16\"", category: "Uşaq aləmi", price: "120 AZN", user: "Kamran Vəliyev", status: "pending", views: 34, date: "09.03.2026" },
];

const statusBadge = (s: string) => {
  const map: Record<string, { cls: string; label: string }> = {
    active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
    pending: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Gözləyir" },
    rejected: { cls: "bg-destructive/10 text-destructive", label: "Rədd" },
  };
  const { cls, label } = map[s] || map.active;
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${cls}`}>{label}</span>;
};

const AdminListings = () => (
  <div className="space-y-5">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-foreground">Elanlar</h1>
        <p className="text-sm text-muted-foreground">Bütün elanları idarə edin</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Elan axtar..." className="h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="h-9 px-3 rounded-xl border border-input bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" /> Filter
        </button>
      </div>
    </div>

    {/* Tabs */}
    <div className="flex gap-1 bg-secondary/50 rounded-xl p-1 w-fit">
      {[{ l: "Hamısı", c: 24580 }, { l: "Aktiv", c: 18420 }, { l: "Gözləyir", c: 3240 }, { l: "Rədd", c: 2920 }].map((t, i) => (
        <button key={t.l} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${i === 0 ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          {t.l} <span className="text-muted-foreground ml-1">({t.c.toLocaleString()})</span>
        </button>
      ))}
    </div>

    {/* Table */}
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                <input type="checkbox" className="w-4 h-4 rounded border-input accent-primary" />
              </th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground">Elan</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Kateqoriya</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Qiymət</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">İstifadəçi</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {mockListings.map((l) => (
              <tr key={l.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                <td className="px-5 py-3"><input type="checkbox" className="w-4 h-4 rounded border-input accent-primary" /></td>
                <td className="px-3 py-3">
                  <p className="font-medium text-foreground truncate max-w-[200px]">{l.title}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                    <span className="sm:hidden">{l.price}</span>
                    <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{l.views}</span>
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{l.date}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground hidden md:table-cell">{l.category}</td>
                <td className="px-3 py-3 text-sm font-semibold text-foreground hidden sm:table-cell">{l.price}</td>
                <td className="px-3 py-3 text-xs text-muted-foreground hidden lg:table-cell">{l.user}</td>
                <td className="px-3 py-3 text-center">{statusBadge(l.status)}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Bax"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Sil"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">1-6 / 24,580 elan</p>
        <div className="flex gap-1">
          {[1, 2, 3, "...", 4096].map((p, i) => (
            <button key={i} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminListings;
