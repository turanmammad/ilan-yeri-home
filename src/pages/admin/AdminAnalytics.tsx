import { useState, useMemo } from "react";
import { TrendingUp, Users, Eye, FileText, ArrowUpRight, ArrowDownRight, Calendar, Download, BarChart3, PieChart } from "lucide-react";

type Period = "7d" | "30d" | "90d" | "1y";

const dataByPeriod: Record<Period, {
  overview: { views: string; viewsChange: string; viewsUp: boolean; listings: string; listingsChange: string; listingsUp: boolean; users: string; usersChange: string; usersUp: boolean; conversion: string; conversionChange: string; conversionUp: boolean };
  daily: { day: string; listings: number; users: number; views: string }[];
  categories: { name: string; listings: number; pct: number; trend: string }[];
  cities: { name: string; users: number; pct: number }[];
}> = {
  "7d": {
    overview: { views: "167.2K", viewsChange: "+12.5%", viewsUp: true, listings: "2,262", listingsChange: "+8.2%", listingsUp: true, users: "601", usersChange: "+15.3%", usersUp: true, conversion: "3.2%", conversionChange: "-0.4%", conversionUp: false },
    daily: [
      { day: "Baz.ertəsi", listings: 342, users: 89, views: "24.1K" },
      { day: "Çərşənbə ax.", listings: 298, users: 76, views: "21.8K" },
      { day: "Çərşənbə", listings: 367, users: 102, views: "28.3K" },
      { day: "Cümə ax.", listings: 412, users: 118, views: "31.5K" },
      { day: "Cümə", listings: 389, users: 95, views: "26.9K" },
      { day: "Şənbə", listings: 256, users: 67, views: "19.4K" },
      { day: "Bazar", listings: 198, users: 54, views: "15.2K" },
    ],
    categories: [
      { name: "Nəqliyyat", listings: 7845, pct: 32, trend: "+5.2%" },
      { name: "Daşınmaz əmlak", listings: 5892, pct: 24, trend: "+3.8%" },
      { name: "Elektronika", listings: 4416, pct: 18, trend: "+8.1%" },
      { name: "Ev və bağ", listings: 2944, pct: 12, trend: "-1.2%" },
      { name: "Geyim", listings: 1962, pct: 8, trend: "+2.4%" },
      { name: "Digər", listings: 1521, pct: 6, trend: "+0.9%" },
    ],
    cities: [
      { name: "Bakı", users: 5210, pct: 62 },
      { name: "Gəncə", users: 890, pct: 11 },
      { name: "Sumqayıt", users: 720, pct: 9 },
      { name: "Lənkəran", users: 340, pct: 4 },
      { name: "Şəki", users: 280, pct: 3 },
      { name: "Digər", users: 992, pct: 11 },
    ],
  },
  "30d": {
    overview: { views: "682.4K", viewsChange: "+18.1%", viewsUp: true, listings: "9,840", listingsChange: "+11.4%", listingsUp: true, users: "2,430", usersChange: "+22.7%", usersUp: true, conversion: "3.5%", conversionChange: "+0.3%", conversionUp: true },
    daily: [
      { day: "Həftə 1", listings: 2100, users: 540, views: "148K" },
      { day: "Həftə 2", listings: 2450, users: 620, views: "172K" },
      { day: "Həftə 3", listings: 2680, users: 680, views: "189K" },
      { day: "Həftə 4", listings: 2610, users: 590, views: "173K" },
    ],
    categories: [
      { name: "Nəqliyyat", listings: 32450, pct: 33, trend: "+6.1%" },
      { name: "Daşınmaz əmlak", listings: 23520, pct: 24, trend: "+4.2%" },
      { name: "Elektronika", listings: 18640, pct: 19, trend: "+9.5%" },
      { name: "Ev və bağ", listings: 11780, pct: 12, trend: "-0.8%" },
      { name: "Geyim", listings: 7840, pct: 8, trend: "+3.1%" },
      { name: "Digər", listings: 3920, pct: 4, trend: "+1.2%" },
    ],
    cities: [
      { name: "Bakı", users: 21400, pct: 60 },
      { name: "Gəncə", users: 3920, pct: 11 },
      { name: "Sumqayıt", users: 3210, pct: 9 },
      { name: "Lənkəran", users: 1780, pct: 5 },
      { name: "Şəki", users: 1420, pct: 4 },
      { name: "Digər", users: 3920, pct: 11 },
    ],
  },
  "90d": {
    overview: { views: "2.1M", viewsChange: "+24.3%", viewsUp: true, listings: "31,200", listingsChange: "+14.8%", listingsUp: true, users: "7,890", usersChange: "+28.1%", usersUp: true, conversion: "3.8%", conversionChange: "+0.6%", conversionUp: true },
    daily: [
      { day: "Ay 1", listings: 9200, users: 2340, views: "620K" },
      { day: "Ay 2", listings: 10800, users: 2650, views: "740K" },
      { day: "Ay 3", listings: 11200, users: 2900, views: "780K" },
    ],
    categories: [
      { name: "Nəqliyyat", listings: 98400, pct: 31, trend: "+7.8%" },
      { name: "Daşınmaz əmlak", listings: 76200, pct: 24, trend: "+5.1%" },
      { name: "Elektronika", listings: 60400, pct: 19, trend: "+12.3%" },
      { name: "Ev və bağ", listings: 38100, pct: 12, trend: "+1.5%" },
      { name: "Geyim", listings: 25400, pct: 8, trend: "+4.2%" },
      { name: "Digər", listings: 19000, pct: 6, trend: "+2.1%" },
    ],
    cities: [
      { name: "Bakı", users: 64200, pct: 58 },
      { name: "Gəncə", users: 13400, pct: 12 },
      { name: "Sumqayıt", users: 10200, pct: 9 },
      { name: "Lənkəran", users: 5600, pct: 5 },
      { name: "Şəki", users: 4500, pct: 4 },
      { name: "Digər", users: 13400, pct: 12 },
    ],
  },
  "1y": {
    overview: { views: "8.4M", viewsChange: "+42.1%", viewsUp: true, listings: "124,800", listingsChange: "+31.2%", listingsUp: true, users: "34,200", usersChange: "+56.8%", usersUp: true, conversion: "4.1%", conversionChange: "+0.9%", conversionUp: true },
    daily: [
      { day: "R1", listings: 8400, users: 2100, views: "540K" },
      { day: "R2", listings: 9200, users: 2400, views: "620K" },
      { day: "R3", listings: 10800, users: 2800, views: "740K" },
      { day: "R4", listings: 11200, users: 3100, views: "780K" },
    ],
    categories: [
      { name: "Nəqliyyat", listings: 412000, pct: 33, trend: "+11.2%" },
      { name: "Daşınmaz əmlak", listings: 312000, pct: 25, trend: "+8.4%" },
      { name: "Elektronika", listings: 237000, pct: 19, trend: "+18.6%" },
      { name: "Ev və bağ", listings: 137000, pct: 11, trend: "+3.2%" },
      { name: "Geyim", listings: 87000, pct: 7, trend: "+6.8%" },
      { name: "Digər", listings: 62000, pct: 5, trend: "+4.1%" },
    ],
    cities: [
      { name: "Bakı", users: 245000, pct: 56 },
      { name: "Gəncə", users: 52400, pct: 12 },
      { name: "Sumqayıt", users: 43700, pct: 10 },
      { name: "Lənkəran", users: 21800, pct: 5 },
      { name: "Şəki", users: 17500, pct: 4 },
      { name: "Digər", users: 56800, pct: 13 },
    ],
  },
};

const periodLabels: Record<Period, string> = { "7d": "7 gün", "30d": "30 gün", "90d": "90 gün", "1y": "1 il" };

type ChartMode = "listings" | "users";

const AdminAnalytics = () => {
  const [period, setPeriod] = useState<Period>("7d");
  const [chartMode, setChartMode] = useState<ChartMode>("listings");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const data = dataByPeriod[period];

  const overviewCards = [
    { label: "Ümumi baxış", value: data.overview.views, change: data.overview.viewsChange, up: data.overview.viewsUp, icon: Eye, color: "text-blue-500 bg-blue-500/10" },
    { label: "Yeni elanlar", value: data.overview.listings, change: data.overview.listingsChange, up: data.overview.listingsUp, icon: FileText, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Yeni istifadəçilər", value: data.overview.users, change: data.overview.usersChange, up: data.overview.usersUp, icon: Users, color: "text-violet-500 bg-violet-500/10" },
    { label: "Konversiya", value: data.overview.conversion, change: data.overview.conversionChange, up: data.overview.conversionUp, icon: TrendingUp, color: "text-amber-500 bg-amber-500/10" },
  ];

  const chartData = data.daily.map((d) => chartMode === "listings" ? d.listings : d.users);
  const maxVal = Math.max(...chartData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Analitika</h1>
          <p className="text-sm text-muted-foreground">Platform statistikaları və hesabatlar</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary/50 rounded-xl p-1">
            {(Object.keys(periodLabels) as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${period === p ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {periodLabels[p]}
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
        {overviewCards.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
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
        {/* Bar chart */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              {period === "7d" ? "Gündəlik" : period === "30d" ? "Həftəlik" : period === "90d" ? "Aylıq" : "Rüblük"} aktivlik
            </h2>
            <div className="flex gap-1 bg-secondary/50 rounded-lg p-0.5">
              <button
                onClick={() => setChartMode("listings")}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors ${chartMode === "listings" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
              >
                Elanlar
              </button>
              <button
                onClick={() => setChartMode("users")}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors ${chartMode === "users" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
              >
                İstifadəçilər
              </button>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2 px-2">
            {data.daily.map((d, i) => {
              const val = chartMode === "listings" ? d.listings : d.users;
              const h = maxVal > 0 ? (val / maxVal) * 100 : 0;
              const isHovered = hoveredBar === i;
              return (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-1 relative"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {isHovered && (
                    <div className="absolute -top-10 bg-foreground text-background text-[10px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap z-10">
                      {val.toLocaleString()} {chartMode === "listings" ? "elan" : "istifadəçi"}
                      <br />
                      <span className="text-muted">{d.views} baxış</span>
                    </div>
                  )}
                  <span className="text-[10px] font-semibold text-foreground">{val}</span>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-200 ${isHovered ? "bg-primary" : "bg-primary/70"}`}
                    style={{ height: `${h}%`, minHeight: "4px" }}
                  />
                  <span className="text-[10px] text-muted-foreground truncate max-w-full">{d.day.slice(0, 5)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              {period === "7d" ? "Həftəlik" : period === "30d" ? "Aylıq" : period === "90d" ? "Rüblük" : "İllik"} icmal
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground">Dövr</th>
                  <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">Elanlar</th>
                  <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">İstifadəçilər</th>
                  <th className="text-right px-5 py-2.5 text-xs font-semibold text-muted-foreground">Baxışlar</th>
                </tr>
              </thead>
              <tbody>
                {data.daily.map((d) => (
                  <tr key={d.day} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-5 py-2.5 text-sm font-medium text-foreground">{d.day}</td>
                    <td className="px-3 py-2.5 text-center text-sm text-foreground">{d.listings.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-center text-sm text-foreground">{d.users.toLocaleString()}</td>
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
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-primary" />
            Ən populyar kateqoriyalar
          </h2>
          <div className="space-y-3">
            {data.categories.map((c) => (
              <div key={c.name} className="flex items-center gap-3 group">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground font-medium">{c.name}</span>
                    <span className="text-muted-foreground">{c.listings.toLocaleString()} elan · {c.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-primary/70 group-hover:bg-primary transition-colors" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
                <span className={`text-[11px] font-semibold shrink-0 ${c.trend.startsWith("+") ? "text-emerald-500" : "text-destructive"}`}>{c.trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top cities */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Ən aktiv şəhərlər
          </h2>
          <div className="space-y-3">
            {data.cities.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3 group">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground font-medium">{c.name}</span>
                    <span className="text-muted-foreground">{c.users.toLocaleString()} istifadəçi · {c.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500/70 group-hover:bg-emerald-500 transition-colors" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
