import { Link } from "react-router-dom";
import {
  FileText, Users, ShoppingBag, TrendingUp, Eye, Clock, AlertTriangle,
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
} from "lucide-react";

const stats = [
  { label: "Ümumi elanlar", value: "24,580", change: "+12.5%", up: true, icon: FileText, color: "text-blue-500 bg-blue-500/10" },
  { label: "Aktiv istifadəçilər", value: "8,432", change: "+8.2%", up: true, icon: Users, color: "text-emerald-500 bg-emerald-500/10" },
  { label: "Mağazalar", value: "342", change: "+3.1%", up: true, icon: ShoppingBag, color: "text-violet-500 bg-violet-500/10" },
  { label: "Gündəlik baxış", value: "156K", change: "-2.4%", up: false, icon: Eye, color: "text-amber-500 bg-amber-500/10" },
];

const recentListings = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", category: "Elektronika", user: "Əli M.", status: "active", date: "2 dəq əvvəl" },
  { id: 2, title: "BMW 520d 2020", category: "Nəqliyyat", user: "Rəşad K.", status: "pending", date: "15 dəq əvvəl" },
  { id: 3, title: "3 otaqlı mənzil, Nərimanov", category: "Daşınmaz əmlak", user: "Leyla H.", status: "active", date: "32 dəq əvvəl" },
  { id: 4, title: "Samsung Galaxy S24 Ultra", category: "Elektronika", user: "Tural A.", status: "rejected", date: "1 saat əvvəl" },
  { id: 5, title: "Uşaq arabası Cybex", category: "Uşaq aləmi", user: "Nigar R.", status: "pending", date: "2 saat əvvəl" },
];

const recentReports = [
  { id: 1, reason: "Saxta elan", listing: "iPhone 14 Pro", reporter: "Kamran V.", date: "5 dəq əvvəl", priority: "high" },
  { id: 2, reason: "Yanlış qiymət", listing: "Toyota Camry 2022", reporter: "Səbinə M.", date: "1 saat əvvəl", priority: "medium" },
  { id: 3, reason: "Təkrar elan", listing: "2 otaqlı mənzil", reporter: "Orxan İ.", date: "3 saat əvvəl", priority: "low" },
];

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    rejected: "bg-destructive/10 text-destructive",
  };
  const labels: Record<string, string> = { active: "Aktiv", pending: "Gözləyir", rejected: "Rədd" };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const priorityBadge = (p: string) => {
  const styles: Record<string, string> = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    low: "bg-secondary text-muted-foreground",
  };
  const labels: Record<string, string> = { high: "Yüksək", medium: "Orta", low: "Aşağı" };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${styles[p]}`}>
      {labels[p]}
    </span>
  );
};

const AdminDashboard = () => (
  <div className="space-y-6">
    {/* Header */}
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-foreground">İdarə paneli</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Platformanın ümumi görünüşü</p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
            </div>
            <div className={`flex items-center gap-0.5 text-xs font-semibold ${s.up ? "text-emerald-500" : "text-destructive"}`}>
              {s.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {s.change}
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-foreground">{s.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Charts placeholder */}
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground">Elan statistikası</h2>
          <select className="text-xs border border-input rounded-lg px-2 py-1 bg-background text-foreground">
            <option>Son 7 gün</option>
            <option>Son 30 gün</option>
            <option>Son 90 gün</option>
          </select>
        </div>
        <div className="h-48 sm:h-56 flex items-center justify-center rounded-xl bg-secondary/50 border border-border/50">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Backend qoşulduqda qrafik burada görünəcək</p>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-4">Kateqoriya paylanması</h2>
        <div className="space-y-3">
          {[
            { name: "Nəqliyyat", pct: 32, color: "bg-blue-500" },
            { name: "Daşınmaz əmlak", pct: 24, color: "bg-emerald-500" },
            { name: "Elektronika", pct: 18, color: "bg-violet-500" },
            { name: "Ev və bağ", pct: 12, color: "bg-amber-500" },
            { name: "Digər", pct: 14, color: "bg-secondary" },
          ].map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground/80">{c.name}</span>
                <span className="font-semibold text-foreground">{c.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Tables */}
    <div className="grid lg:grid-cols-5 gap-4">
      {/* Recent listings */}
      <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-bold text-foreground">Son elanlar</h2>
          <Link to="/admin/elanlar" className="text-xs text-primary font-semibold hover:underline">Hamısına bax</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground">Elan</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Kateqoriya</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden md:table-cell">İstifadəçi</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="text-right px-5 py-2.5 text-xs font-semibold text-muted-foreground">Vaxt</th>
              </tr>
            </thead>
            <tbody>
              {recentListings.map((l) => (
                <tr key={l.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground text-sm truncate max-w-[180px]">{l.title}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">{l.category}</p>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground text-xs hidden sm:table-cell">{l.category}</td>
                  <td className="px-3 py-3 text-muted-foreground text-xs hidden md:table-cell">{l.user}</td>
                  <td className="px-3 py-3 text-center">{statusBadge(l.status)}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3" />{l.date}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent reports */}
      <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Son şikayətlər
          </h2>
          <button className="text-xs text-primary font-semibold hover:underline">Hamısı</button>
        </div>
        <div className="divide-y divide-border/50">
          {recentReports.map((r) => (
            <div key={r.id} className="px-5 py-3.5 hover:bg-secondary/20 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{r.reason}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{r.listing} · {r.reporter}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {priorityBadge(r.priority)}
                  <span className="text-[10px] text-muted-foreground">{r.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
