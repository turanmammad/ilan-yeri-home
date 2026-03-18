import { useState, useMemo } from "react";
import { Search, Filter, Eye, Trash2, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { toast } from "sonner";

type ListingStatus = "active" | "pending" | "rejected";

interface Listing {
  id: number;
  title: string;
  category: string;
  price: string;
  user: string;
  status: ListingStatus;
  views: number;
  date: string;
}

const initialListings: Listing[] = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", category: "Elektronika", price: "2,800 AZN", user: "Əli Məmmədov", status: "active", views: 342, date: "12.03.2026" },
  { id: 2, title: "BMW 520d M Sport 2020", category: "Nəqliyyat", price: "45,000 AZN", user: "Rəşad Kərimov", status: "active", views: 1205, date: "11.03.2026" },
  { id: 3, title: "3 otaqlı mənzil, 90m²", category: "Daşınmaz əmlak", price: "185,000 AZN", user: "Leyla Hüseynova", status: "pending", views: 89, date: "11.03.2026" },
  { id: 4, title: "MacBook Pro M3 14\"", category: "Elektronika", price: "3,200 AZN", user: "Tural Abbasov", status: "rejected", views: 0, date: "10.03.2026" },
  { id: 5, title: "IKEA divan, ağ rəng", category: "Ev və bağ", price: "450 AZN", user: "Nigar Rəhimli", status: "active", views: 156, date: "10.03.2026" },
  { id: 6, title: "Uşaq velosipedi 16\"", category: "Uşaq aləmi", price: "120 AZN", user: "Kamran Vəliyev", status: "pending", views: 34, date: "09.03.2026" },
  { id: 7, title: "Samsung Galaxy S24 Ultra", category: "Elektronika", price: "2,100 AZN", user: "Fərid Əliyev", status: "active", views: 523, date: "08.03.2026" },
  { id: 8, title: "Toyota Camry 2022", category: "Nəqliyyat", price: "52,000 AZN", user: "Orxan Həsənov", status: "rejected", views: 12, date: "07.03.2026" },
];

const statusConfig: Record<ListingStatus, { cls: string; label: string }> = {
  active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
  pending: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Gözləyir" },
  rejected: { cls: "bg-destructive/10 text-destructive", label: "Rədd" },
};

const statusBadge = (s: ListingStatus) => {
  const { cls, label } = statusConfig[s];
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${cls}`}>{label}</span>;
};

const categories = ["Hamısı", "Elektronika", "Nəqliyyat", "Daşınmaz əmlak", "Ev və bağ", "Uşaq aləmi"];

const AdminListings = () => {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | ListingStatus>("all");
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");
  const [confirmAction, setConfirmAction] = useState<{ type: "delete" | "reject" | "pending"; id: number; title: string } | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchesTab = activeTab === "all" || l.status === activeTab;
      const matchesSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "Hamısı" || l.category === selectedCategory;
      return matchesTab && matchesSearch && matchesCategory;
    });
  }, [listings, search, activeTab, selectedCategory]);

  const counts = useMemo(() => ({
    all: listings.length,
    active: listings.filter((l) => l.status === "active").length,
    pending: listings.filter((l) => l.status === "pending").length,
    rejected: listings.filter((l) => l.status === "rejected").length,
  }), [listings]);

  const changeStatus = (id: number, newStatus: ListingStatus) => {
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, status: newStatus } : l));
    const statusLabels: Record<ListingStatus, string> = { active: "Aktiv", pending: "Gözləyir", rejected: "Rədd" };
    toast.success(`Elan statusu "${statusLabels[newStatus]}" olaraq dəyişdirildi`);
  };

  const deleteListing = (id: number) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    toast.success("Elan uğurla silindi");
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    if (confirmAction.type === "delete") deleteListing(confirmAction.id);
    else if (confirmAction.type === "reject") changeStatus(confirmAction.id, "rejected");
    else if (confirmAction.type === "pending") changeStatus(confirmAction.id, "pending");
    setConfirmAction(null);
  };

  const tabs: { key: "all" | ListingStatus; label: string }[] = [
    { key: "all", label: "Hamısı" },
    { key: "active", label: "Aktiv" },
    { key: "pending", label: "Gözləyir" },
    { key: "rejected", label: "Rədd" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Elanlar</h1>
          <p className="text-sm text-muted-foreground">Bütün elanları idarə edin</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Elan axtar..."
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
          {categories.map((c) => (
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
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Elan</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Kateqoriya</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Qiymət</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">İstifadəçi</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-muted-foreground text-sm">Nəticə tapılmadı</td></tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-5 py-3">
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
                        {l.status !== "active" && (
                          <button onClick={() => changeStatus(l.id, "active")} className="p-1.5 rounded-lg hover:bg-emerald-500/10 transition-colors text-muted-foreground hover:text-emerald-600" title="Təsdiq et">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {l.status !== "rejected" && (
                          <button onClick={() => changeStatus(l.id, "rejected")} className="p-1.5 rounded-lg hover:bg-amber-500/10 transition-colors text-muted-foreground hover:text-amber-600" title="Rədd et">
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        {l.status === "active" && (
                          <button onClick={() => changeStatus(l.id, "pending")} className="p-1.5 rounded-lg hover:bg-amber-500/10 transition-colors text-muted-foreground hover:text-amber-500" title="Gözləməyə al">
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Bax"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => deleteListing(l.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Sil"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">{filtered.length} elan göstərilir</p>
        </div>
      </div>
    </div>
  );
};

export default AdminListings;
