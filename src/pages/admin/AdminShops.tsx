import { useState, useMemo } from "react";
import { Search, Filter, Eye, Ban, Star, Clock, ExternalLink, ShoppingBag, TrendingUp, UserCheck, ShieldAlert } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { toast } from "sonner";

type ShopStatus = "active" | "suspended" | "pending";

interface Shop {
  id: number;
  name: string;
  owner: string;
  category: string;
  listings: number;
  rating: number;
  views: string;
  status: ShopStatus;
  joined: string;
  avatar: string;
}

const initialShops: Shop[] = [
  { id: 1, name: "TechStore Baku", owner: "Əli Məmmədov", category: "Elektronika", listings: 156, rating: 4.8, views: "12.4K", status: "active", joined: "15.01.2024", avatar: "TS" },
  { id: 2, name: "AutoParts AZ", owner: "Rəşad Kərimov", category: "Nəqliyyat", listings: 342, rating: 4.5, views: "28.1K", status: "active", joined: "03.06.2023", avatar: "AP" },
  { id: 3, name: "FashionHub", owner: "Nigar Rəhimli", category: "Geyim", listings: 89, rating: 4.2, views: "5.6K", status: "active", joined: "22.09.2024", avatar: "FH" },
  { id: 4, name: "HomeDecor Plus", owner: "Leyla Hüseynova", category: "Ev və bağ", listings: 64, rating: 3.9, views: "3.2K", status: "suspended", joined: "10.11.2024", avatar: "HD" },
  { id: 5, name: "KidsWorld", owner: "Səbinə Muradova", category: "Uşaq aləmi", listings: 45, rating: 4.7, views: "8.9K", status: "active", joined: "28.03.2024", avatar: "KW" },
  { id: 6, name: "SportZone AZ", owner: "Tural Abbasov", category: "İdman", listings: 78, rating: 4.1, views: "6.3K", status: "pending", joined: "05.02.2025", avatar: "SZ" },
];

const statusConfig: Record<ShopStatus, { cls: string; label: string }> = {
  active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
  suspended: { cls: "bg-destructive/10 text-destructive", label: "Dayandırılıb" },
  pending: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Gözləyir" },
};

const statusBadge = (s: ShopStatus) => {
  const { cls, label } = statusConfig[s];
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${cls}`}>{label}</span>;
};

const shopCategories = ["Hamısı", "Elektronika", "Nəqliyyat", "Geyim", "Ev və bağ", "Uşaq aləmi", "İdman"];

const AdminShops = () => {
  const [shops, setShops] = useState<Shop[]>(initialShops);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | ShopStatus>("all");
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");
  const [showFilters, setShowFilters] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: "suspend" | "activate"; id: number; name: string } | null>(null);

  const filtered = useMemo(() => {
    return shops.filter((s) => {
      const matchesTab = activeTab === "all" || s.status === activeTab;
      const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.owner.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "Hamısı" || s.category === selectedCategory;
      return matchesTab && matchesSearch && matchesCategory;
    });
  }, [shops, search, activeTab, selectedCategory]);

  const counts = useMemo(() => ({
    all: shops.length,
    active: shops.filter((s) => s.status === "active").length,
    suspended: shops.filter((s) => s.status === "suspended").length,
    pending: shops.filter((s) => s.status === "pending").length,
  }), [shops]);

  const changeStatus = (id: number, newStatus: ShopStatus) => {
    setShops((prev) => prev.map((s) => s.id === id ? { ...s, status: newStatus } : s));
    const labels: Record<ShopStatus, string> = { active: "Aktiv", suspended: "Dayandırılıb", pending: "Gözləyir" };
    toast.success(`Mağaza statusu "${labels[newStatus]}" olaraq dəyişdirildi`);
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    changeStatus(confirmAction.id, confirmAction.type === "suspend" ? "suspended" : "active");
    setConfirmAction(null);
  };

  const tabs: { key: "all" | ShopStatus; label: string }[] = [
    { key: "all", label: "Hamısı" },
    { key: "active", label: "Aktiv" },
    { key: "pending", label: "Gözləyir" },
    { key: "suspended", label: "Dayandırılıb" },
  ];

  const avgRating = shops.length ? (shops.reduce((a, s) => a + s.rating, 0) / shops.length).toFixed(1) : "0";

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Mağazalar</h1>
          <p className="text-sm text-muted-foreground">Bütün mağazaları idarə edin</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Mağaza axtar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-9 px-3 rounded-xl border border-input text-sm font-medium transition-colors flex items-center gap-1.5 ${showFilters ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"}`}
          >
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>
      </div>

      {/* Category Filter */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 p-3 bg-card rounded-xl border border-border">
          <span className="text-xs font-semibold text-muted-foreground self-center mr-2">Kateqoriya:</span>
          {shopCategories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCategory === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Ümumi mağazalar", value: String(counts.all), icon: ShoppingBag, color: "text-violet-500 bg-violet-500/10" },
          { label: "Aktiv", value: String(counts.active), icon: TrendingUp, color: "text-emerald-500 bg-emerald-500/10" },
          { label: "Gözləyir", value: String(counts.pending), icon: Clock, color: "text-amber-500 bg-amber-500/10" },
          { label: "Ort. reytinq", value: avgRating, icon: Star, color: "text-primary bg-primary/10" },
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
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === t.key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t.label} <span className="text-muted-foreground ml-1">({counts[t.key]})</span>
          </button>
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
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-muted-foreground text-sm">Nəticə tapılmadı</td></tr>
              ) : (
                filtered.map((s) => (
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
                        {s.status !== "active" && (
                          <button onClick={() => changeStatus(s.id, "active")} className="p-1.5 rounded-lg hover:bg-emerald-500/10 transition-colors text-muted-foreground hover:text-emerald-600" title="Aktiv et">
                            <UserCheck className="w-4 h-4" />
                          </button>
                        )}
                        {s.status !== "suspended" && (
                          <button onClick={() => setConfirmAction({ type: "suspend", id: s.id, name: s.name })} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Dayandır">
                            <ShieldAlert className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Bax"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Sayta keç"><ExternalLink className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">{filtered.length} mağaza göstərilir</p>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title={confirmAction?.type === "suspend" ? "Mağazanı dayandırmaq istəyirsiniz?" : "Mağazanı aktiv etmək istəyirsiniz?"}
        description={`"${confirmAction?.name}" ${
          confirmAction?.type === "suspend" ? "adlı mağaza dayandırılacaq və elanları gizlədiləcək." : "adlı mağaza yenidən aktiv ediləcək."
        }`}
        confirmLabel={confirmAction?.type === "suspend" ? "Dayandır" : "Aktiv et"}
        variant={confirmAction?.type === "suspend" ? "destructive" : "default"}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default AdminShops;
