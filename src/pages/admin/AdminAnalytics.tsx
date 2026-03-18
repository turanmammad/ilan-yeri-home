import { TrendingUp, Users, Eye, FileText, ArrowUpRight, ArrowDownRight, Calendar, Download } from "lucide-react";

const dailyStats = [
  { day: "Baz.ertəsi", listings: 342, users: 89, views: "24.1K" },
  { day: "Çərşənbə ax.", listings: 298, users: 76, views: "21.8K" },
  { day: "Çərşənbə", listings: 367, users: 102, views: "28.3K" },
  { day: "Cümə ax.", listings: 412, users: 118, views: "31.5K" },
  { day: "Cümə", listings: 389, users: 95, views: "26.9K" },
  { day: "Şənbə", listings: 256, users: 67, views: "19.4K" },
  { day: "Bazar", listings: 198, users: 54, views: "15.2K" },
];

const topCategories = [
  { name: "Nəqliyyat", listings: 7845, pct: 32, trend: "+5.2%" },
  { name: "Daşınmaz əmlak", listings: 5892, pct: 24, trend: "+3.8%" },
  { name: "Elektronika", listings: 4416, pct: 18, trend: "+8.1%" },
  { name: "Ev və bağ", listings: 2944, pct: 12, trend: "-1.2%" },
  { name: "Geyim", listings: 1962, pct: 8, trend: "+2.4%" },
  { name: "Digər", listings: 1521, pct: 6, trend: "+0.9%" },
];

const topCities = [
  { name: "Bakı", users: 5210, pct: 62 },
  { name: "Gəncə", users: 890, pct: 11 },
  { name: "Sumqayıt", users: 720, pct: 9 },
  { name: "Lənkəran", users: 340, pct: 4 },
  { name: "Şəki", users: 280, pct: 3 },
  { name: "Digər", users: 992, pct: 11 },
];

const AdminAnalytics = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-foreground">Analitika</h1>
        <p className="text-sm text-muted-foreground">Platform statistikaları və hesabatlar</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-secondary/50 rounded-xl p-1">
          {["7 gün", "30 gün", "90 gün", "1 il"].map((p, i) => (
            <button key={p} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${i === 0 ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
        <button className="h-9 px-3 rounded-xl border border-input bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>
    </div>

    {/* Overview stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {[
        { label: "Ümumi baxış", value: "167.2K", change: "+12.5%", up: true, icon: Eye, color: "text-blue-500 bg-blue-500/10" },
        { label: "Yeni elanlar", value: "2,262", change: "+8.2%", up: true, icon: FileText, color: "text-emerald-500 bg-emerald-500/10" },
        { label: "Yeni istifadəçilər", value: "601", change: "+15.3%", up: true, icon: Users, color: "text-violet-500 bg-violet-500/10" },
        { label: "Konversiya", value: "3.2%", change: "-0.4%", up: false, icon: TrendingUp, color: "text-amber-500 bg-amber-500/10" },
      ].map((s) => (
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

    {/* Charts area */}
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Daily activity chart placeholder */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-4">Gündəlik aktivlik</h2>
        <div className="h-48 flex items-end gap-2 px-2">
          {dailyStats.map((d) => {
            const maxListings = Math.max(...dailyStats.map((x) => x.listings));
            const h = (d.listings / maxListings) * 100;
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-foreground">{d.listings}</span>
                <div className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-colors" style={{ height: `${h}%` }} />
                <span className="text-[10px] text-muted-foreground truncate max-w-full">{d.day.slice(0, 3)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Həftəlik icmal
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground">Gün</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">Elanlar</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">İstifadəçilər</th>
                <th className="text-right px-5 py-2.5 text-xs font-semibold text-muted-foreground">Baxışlar</th>
              </tr>
            </thead>
            <tbody>
              {dailyStats.map((d) => (
                <tr key={d.day} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="px-5 py-2.5 text-sm font-medium text-foreground">{d.day}</td>
                  <td className="px-3 py-2.5 text-center text-sm text-foreground">{d.listings}</td>
                  <td className="px-3 py-2.5 text-center text-sm text-foreground">{d.users}</td>
                  <td className="px-5 py-2.5 text-right text-sm text-muted-foreground">{d.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Bottom row */}
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Top categories */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-4">Ən populyar kateqoriyalar</h2>
        <div className="space-y-3">
          {topCategories.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground font-medium">{c.name}</span>
                  <span className="text-muted-foreground">{c.listings.toLocaleString()} elan · {c.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary/70" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
              <span className={`text-[11px] font-semibold shrink-0 ${c.trend.startsWith("+") ? "text-emerald-500" : "text-destructive"}`}>{c.trend}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top cities */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-4">Ən aktiv şəhərlər</h2>
        <div className="space-y-3">
          {topCities.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 ${
                i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground font-medium">{c.name}</span>
                  <span className="text-muted-foreground">{c.users.toLocaleString()} istifadəçi · {c.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500/70" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminAnalytics;
