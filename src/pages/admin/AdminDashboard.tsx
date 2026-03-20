import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { format, subDays, eachDayOfInterval, isWithinInterval } from "date-fns";
import {
  FileText, Users, ShoppingBag, TrendingUp, Eye, Clock, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Crown, Star, Zap, Megaphone, CalendarIcon,
  Activity, BarChart3, PieChart, Layers, RefreshCw, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend,
} from "recharts";

// --- Mock Data Generator ---
const generateDailyData = (days: number) => {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const base = Math.sin(i * 0.3) * 20 + 60;
    data.push({
      date: format(date, "dd.MM"),
      fullDate: date,
      elanlar: Math.round(base + Math.random() * 40 + 80),
      istifadeciler: Math.round(base * 0.6 + Math.random() * 30 + 40),
      magazalar: Math.round(Math.random() * 8 + 2),
      vip: Math.round(Math.random() * 25 + 10),
      premium: Math.round(Math.random() * 35 + 15),
      ireliCekme: Math.round(Math.random() * 50 + 20),
      reklamlar: Math.round(Math.random() * 12 + 3),
      baxis: Math.round(base * 100 + Math.random() * 5000 + 10000),
      gelir: Math.round(Math.random() * 800 + 200),
    });
  }
  return data;
};

const allDailyData = generateDailyData(90);

const categoryData = [
  { name: "Nəqliyyat", value: 32, color: "hsl(var(--primary))" },
  { name: "Daşınmaz əmlak", value: 24, color: "hsl(210, 70%, 55%)" },
  { name: "Elektronika", value: 18, color: "hsl(260, 60%, 55%)" },
  { name: "Ev və bağ", value: 12, color: "hsl(40, 90%, 55%)" },
  { name: "Xidmətlər", value: 8, color: "hsl(160, 60%, 45%)" },
  { name: "Digər", value: 6, color: "hsl(var(--muted-foreground))" },
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

const topServices = [
  { label: "VIP elanlar", today: 34, total: 2840, icon: Crown, color: "text-amber-500 bg-amber-500/10", revenue: "₼4,260" },
  { label: "Premium elanlar", today: 52, total: 5120, icon: Star, color: "text-violet-500 bg-violet-500/10", revenue: "₼7,680" },
  { label: "İrəli çəkmə", today: 78, total: 8940, icon: Zap, color: "text-blue-500 bg-blue-500/10", revenue: "₼4,470" },
  { label: "Aktiv reklamlar", today: 8, total: 186, icon: Megaphone, color: "text-emerald-500 bg-emerald-500/10", revenue: "₼12,400" },
];

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    rejected: "bg-destructive/10 text-destructive",
  };
  const labels: Record<string, string> = { active: "Aktiv", pending: "Gözləyir", rejected: "Rədd" };
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${styles[status]}`}>{labels[status]}</span>;
};

const priorityBadge = (p: string) => {
  const styles: Record<string, string> = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    low: "bg-secondary text-muted-foreground",
  };
  const labels: Record<string, string> = { high: "Yüksək", medium: "Orta", low: "Aşağı" };
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${styles[p]}`}>{labels[p]}</span>;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-xs">
      <p className="font-bold text-foreground mb-1.5">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

type DateRange = { from: Date; to: Date };

const presetRanges = [
  { label: "Bugün", days: 1 },
  { label: "Son 7 gün", days: 7 },
  { label: "Son 30 gün", days: 30 },
  { label: "Son 90 gün", days: 90 },
];

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [chartTab, setChartTab] = useState("overview");

  const filteredData = useMemo(() =>
    allDailyData.filter(d => isWithinInterval(d.fullDate, { start: dateRange.from, end: dateRange.to })),
    [dateRange]
  );

  const totals = useMemo(() => {
    const sum = (key: string) => filteredData.reduce((a, d) => a + (d as any)[key], 0);
    return {
      elanlar: sum("elanlar"),
      istifadeciler: sum("istifadeciler"),
      magazalar: sum("magazalar"),
      vip: sum("vip"),
      premium: sum("premium"),
      ireliCekme: sum("ireliCekme"),
      reklamlar: sum("reklamlar"),
      baxis: sum("baxis"),
      gelir: sum("gelir"),
    };
  }, [filteredData]);

  const prevPeriodLength = filteredData.length;
  const prevData = allDailyData.slice(
    Math.max(0, allDailyData.length - prevPeriodLength * 2 - (allDailyData.length - allDailyData.indexOf(filteredData[0] || allDailyData[0]))),
    allDailyData.length - (allDailyData.length - allDailyData.indexOf(filteredData[0] || allDailyData[0]))
  );
  const prevSum = (key: string) => prevData.reduce((a, d) => a + (d as any)[key], 0);
  const getChange = (key: string, current: number) => {
    const prev = prevSum(key);
    if (!prev) return { pct: "+0%", up: true };
    const diff = ((current - prev) / prev) * 100;
    return { pct: `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`, up: diff >= 0 };
  };

  const mainStats = [
    { label: "Ümumi elanlar", value: totals.elanlar.toLocaleString(), ...getChange("elanlar", totals.elanlar), icon: FileText, color: "text-blue-500 bg-blue-500/10", link: "/admin/elanlar" },
    { label: "İstifadəçilər", value: totals.istifadeciler.toLocaleString(), ...getChange("istifadeciler", totals.istifadeciler), icon: Users, color: "text-emerald-500 bg-emerald-500/10", link: "/admin/istifadeciler" },
    { label: "Mağazalar", value: totals.magazalar.toLocaleString(), ...getChange("magazalar", totals.magazalar), icon: ShoppingBag, color: "text-violet-500 bg-violet-500/10", link: "/admin/magazalar" },
    { label: "Gündəlik baxış", value: totals.baxis >= 1000 ? `${(totals.baxis / 1000).toFixed(0)}K` : totals.baxis.toLocaleString(), ...getChange("baxis", totals.baxis), icon: Eye, color: "text-amber-500 bg-amber-500/10", link: "/admin/analitika" },
  ];

  const serviceStats = [
    { label: "VIP elanlar", value: totals.vip.toLocaleString(), ...getChange("vip", totals.vip), icon: Crown, color: "text-amber-500 bg-amber-500/10" },
    { label: "Premium elanlar", value: totals.premium.toLocaleString(), ...getChange("premium", totals.premium), icon: Star, color: "text-violet-500 bg-violet-500/10" },
    { label: "İrəli çəkmə", value: totals.ireliCekme.toLocaleString(), ...getChange("ireliCekme", totals.ireliCekme), icon: Zap, color: "text-blue-500 bg-blue-500/10" },
    { label: "Reklamlar", value: totals.reklamlar.toLocaleString(), ...getChange("reklamlar", totals.reklamlar), icon: Megaphone, color: "text-emerald-500 bg-emerald-500/10" },
  ];

  const setPreset = (days: number) => {
    setDateRange({ from: subDays(new Date(), days - 1), to: new Date() });
  };

  return (
    <div className="space-y-5">
      {/* Header with Date Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            İdarə paneli
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Platformanın real-time analitikası</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Preset range buttons */}
          <div className="flex items-center rounded-xl border border-input bg-card overflow-hidden">
            {presetRanges.map(pr => {
              const isActive = Math.abs(
                (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24) - (pr.days - 1)
              ) < 1;
              return (
                <button key={pr.days} onClick={() => setPreset(pr.days)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}>
                  {pr.label}
                </button>
              );
            })}
          </div>

          {/* Custom date picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 rounded-xl text-xs h-8">
                <CalendarIcon className="w-3.5 h-3.5" />
                {format(dateRange.from, "dd.MM.yy")} — {format(dateRange.to, "dd.MM.yy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) setDateRange({ from: range.from, to: range.to });
                  else if (range?.from) setDateRange({ from: range.from, to: range.from });
                }}
                numberOfMonths={2}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {mainStats.map((s) => (
          <Link to={s.link} key={s.label}
            className="bg-card rounded-2xl border border-border p-4 shadow-sm hover:shadow-md transition-all hover:border-primary/20 group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color} group-hover:scale-110 transition-transform`}>
                <s.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-semibold ${s.up ? "text-emerald-500" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {s.pct}
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Service Stats Row (VIP, Premium, İrəli çəkmə, Reklam) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {serviceStats.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${s.up ? "text-emerald-500" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.pct}
              </div>
            </div>
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Gündəlik statistika</h2>
            <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">{filteredData.length} gün</span>
          </div>
          <Tabs value={chartTab} onValueChange={setChartTab}>
            <TabsList className="h-8">
              <TabsTrigger value="overview" className="text-[11px] px-3 h-6">Ümumi baxış</TabsTrigger>
              <TabsTrigger value="services" className="text-[11px] px-3 h-6">Xidmətlər</TabsTrigger>
              <TabsTrigger value="revenue" className="text-[11px] px-3 h-6">Gəlir</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="p-5">
          {chartTab === "overview" && (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="gradElan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUser" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="elanlar" name="Elanlar" stroke="hsl(var(--primary))" fill="url(#gradElan)" strokeWidth={2} />
                <Area type="monotone" dataKey="istifadeciler" name="İstifadəçilər" stroke="hsl(160, 60%, 45%)" fill="url(#gradUser)" strokeWidth={2} />
                <Area type="monotone" dataKey="magazalar" name="Mağazalar" stroke="hsl(260, 60%, 55%)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          )}
          {chartTab === "services" && (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={filteredData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="vip" name="VIP" fill="hsl(40, 90%, 55%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="premium" name="Premium" fill="hsl(260, 60%, 55%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="ireliCekme" name="İrəli çəkmə" fill="hsl(210, 70%, 55%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="reklamlar" name="Reklamlar" fill="hsl(160, 60%, 45%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
          {chartTab === "revenue" && (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="gelir" name="Gəlir (₼)" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Middle row: Category + Paid Services */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Category pie */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Kateqoriya paylanması</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RePieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-muted-foreground truncate">{c.name}</span>
                <span className="font-semibold text-foreground ml-auto">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Paid services summary */}
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Pullu xidmətlər</h2>
          </div>
          <div className="divide-y divide-border/50">
            {topServices.map(s => (
              <div key={s.label} className="flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/20 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                  <s.icon className="w-[18px] h-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{s.label}</p>
                  <p className="text-[11px] text-muted-foreground">Bu gün: <span className="font-semibold text-foreground">{s.today}</span> · Ümumi: <span className="font-semibold text-foreground">{s.total.toLocaleString()}</span></p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">{s.revenue}</p>
                  <p className="text-[10px] text-muted-foreground">ümumi gəlir</p>
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
                  <tr key={l.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => window.location.href = `/admin/elanlar`}>
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
            <Link to="/admin/sikayetler" className="text-xs text-primary font-semibold hover:underline">Hamısı</Link>
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
};

export default AdminDashboard;
