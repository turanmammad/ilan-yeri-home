import { Search, Filter, Eye, Ban, Star, Clock, ExternalLink, MoreHorizontal, ShoppingBag, TrendingUp } from "lucide-react";

const mockShops = [
  { id: 1, name: "TechStore Baku", owner: "Əli Məmmədov", category: "Elektronika", listings: 156, rating: 4.8, views: "12.4K", status: "active", joined: "15.01.2024", avatar: "TS" },
  { id: 2, name: "AutoParts AZ", owner: "Rəşad Kərimov", category: "Nəqliyyat", listings: 342, rating: 4.5, views: "28.1K", status: "active", joined: "03.06.2023", avatar: "AP" },
  { id: 3, name: "FashionHub", owner: "Nigar Rəhimli", category: "Geyim", listings: 89, rating: 4.2, views: "5.6K", status: "active", joined: "22.09.2024", avatar: "FH" },
  { id: 4, name: "HomeDecor Plus", owner: "Leyla Hüseynova", category: "Ev və bağ", listings: 64, rating: 3.9, views: "3.2K", status: "suspended", joined: "10.11.2024", avatar: "HD" },
  { id: 5, name: "KidsWorld", owner: "Səbinə Muradova", category: "Uşaq aləmi", listings: 45, rating: 4.7, views: "8.9K", status: "active", joined: "28.03.2024", avatar: "KW" },
  { id: 6, name: "SportZone AZ", owner: "Tural Abbasov", category: "İdman", listings: 78, rating: 4.1, views: "6.3K", status: "pending", joined: "05.02.2025", avatar: "SZ" },
];

const statusBadge = (s: string) => {
  const map: Record<string, { cls: string; label: string }> = {
    active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
    suspended: { cls: "bg-destructive/10 text-destructive", label: "Dayandırılıb" },
    pending: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Gözləyir" },
  };
  const { cls, label } = map[s] || map.active;
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${cls}`}>{label}</span>;
};

const AdminShops = () => (
  <div className="space-y-5">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-foreground">Mağazalar</h1>
        <p className="text-sm text-muted-foreground">Bütün mağazaları idarə edin</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Mağaza axtar..." className="h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="h-9 px-3 rounded-xl border border-input bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" /> Filter
        </button>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Ümumi mağazalar", value: "342", icon: ShoppingBag, color: "text-violet-500 bg-violet-500/10" },
        { label: "Aktiv", value: "298", icon: TrendingUp, color: "text-emerald-500 bg-emerald-500/10" },
        { label: "Gözləyir", value: "31", icon: Clock, color: "text-amber-500 bg-amber-500/10" },
        { label: "Ort. reytinq", value: "4.4", icon: Star, color: "text-primary bg-primary/10" },
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

    {/* Table */}
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Mağaza</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Kateqoriya</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Elanlar</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Baxış</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Reytinq</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {mockShops.map((s) => (
              <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{s.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{s.name}</p>
                      <p className="text-[11px] text-muted-foreground">{s.owner} · {s.joined}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground hidden md:table-cell">{s.category}</td>
                <td className="px-3 py-3 text-center text-sm font-semibold text-foreground hidden sm:table-cell">{s.listings}</td>
                <td className="px-3 py-3 text-center text-xs text-muted-foreground hidden lg:table-cell">{s.views}</td>
                <td className="px-3 py-3 text-center hidden sm:table-cell">
                  <span className="flex items-center justify-center gap-1 text-xs font-semibold text-foreground">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />{s.rating}
                  </span>
                </td>
                <td className="px-3 py-3 text-center">{statusBadge(s.status)}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Bax"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Sayta keç"><ExternalLink className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Dayandır"><Ban className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">1-6 / 342 mağaza</p>
        <div className="flex gap-1">
          {[1, 2, 3, "...", 57].map((p, i) => (
            <button key={i} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminShops;
