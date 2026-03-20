import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { format, subDays, isWithinInterval } from "date-fns";
import {
  FileText, Users, ShoppingBag, Eye, Clock, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Crown, Star, Zap, Megaphone,
  CalendarIcon, BarChart3, TrendingUp, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// --- Data ---
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
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[status]}`}>{labels[status]}</span>;
};

const priorityDot: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-amber-500",
  low: "bg-muted-foreground/40",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-xl px-3 py-2.5 shadow-xl text-xs backdrop-blur-sm">
      <p className="font-bold text-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground">{p.name}</span>
          <span className="font-bold text-foreground ml-auto">{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

type DateRange = { from: Date; to: Date };

const presetRanges = [
  { label: "7G", days: 7 },
  { label: "30G", days: 30 },
  { label: "90G", days: 90 },
];

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [activeChart, setActiveChart] = useState<"overview" | "services">("overview");

  const filteredData = useMemo(() =>
    allDailyData.filter(d => isWithinInterval(d.fullDate, { start: dateRange.from, end: dateRange.to })),
    [dateRange]
  );

  const totals = useMemo(() => {
    const sum = (key: string) => filteredData.reduce((a, d) => a + (d as any)[key], 0);
    return {
      elanlar: sum("elanlar"), istifadeciler: sum("istifadeciler"), magazalar: sum("magazalar"),
      vip: sum("vip"), premium: sum("premium"), ireliCekme: sum("ireliCekme"),
      reklamlar: sum("reklamlar"), baxis: sum("baxis"), gelir: sum("gelir"),
    };
  }, [filteredData]);

  const fmtNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toLocaleString();

  const setPreset = (days: number) => setDateRange({ from: subDays(new Date(), days - 1), to: new Date() });

  const allStats = [
    { label: "Elanlar", value: fmtNum(totals.elanlar), icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10", link: "/admin/elanlar" },
    { label: "İstifadəçilər", value: fmtNum(totals.istifadeciler), icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10", link: "/admin/istifadeciler" },
    { label: "Mağazalar", value: fmtNum(totals.magazalar), icon: ShoppingBag, color: "text-violet-500", bg: "bg-violet-500/10", link: "/admin/magazalar" },
    { label: "Baxış", value: fmtNum(totals.baxis), icon: Eye, color: "text-amber-500", bg: "bg-amber-500/10", link: "/admin/analitika" },
    { label: "VIP", value: fmtNum(totals.vip), icon: Crown, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Premium", value: fmtNum(totals.premium), icon: Star, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "İrəli çəkmə", value: fmtNum(totals.ireliCekme), icon: Zap, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Gəlir", value: `₼${fmtNum(totals.gelir)}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-primary tracking-widest uppercase mb-1">Ümumi baxış</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">İdarə paneli</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-secondary/50 overflow-hidden">
            {presetRanges.map(pr => {
              const diff = Math.round((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
              const isActive = Math.abs(diff - (pr.days - 1)) < 1;
              return (
                <button key={pr.days} onClick={() => setPreset(pr.days)}
                  className={cn(
                    "px-3 py-1.5 text-[11px] font-semibold transition-all",
                    isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}>
                  {pr.label}
                </button>
              );
            })}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-[11px] h-8 rounded-lg font-medium">
                <CalendarIcon className="w-3 h-3" />
                {format(dateRange.from, "dd MMM")} – {format(dateRange.to, "dd MMM")}
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

      {/* Stats Grid — 8 compact cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {allStats.map((s) => {
          const Inner = (
            <div className="bg-card rounded-xl border border-border p-3 hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.bg} ${s.color} group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-lg font-extrabold text-foreground leading-none">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1 font-medium">{s.label}</p>
            </div>
          );
          return s.link ? <Link to={s.link} key={s.label}>{Inner}</Link> : <div key={s.label}>{Inner}</div>;
        })}
      </div>

      {/* Chart */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Gündəlik trend</h2>
            <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full font-medium">{filteredData.length} gün</span>
          </div>
          <div className="flex items-center rounded-lg border border-border bg-secondary/50 overflow-hidden">
            {[
              { key: "overview" as const, label: "Elanlar" },
              { key: "services" as const, label: "Xidmətlər" },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveChart(t.key)}
                className={cn(
                  "px-3 py-1 text-[11px] font-semibold transition-all",
                  activeChart === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5">
          {activeChart === "overview" ? (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="gElan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gUser" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} width={35} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="elanlar" name="Elanlar" stroke="hsl(var(--primary))" fill="url(#gElan)" strokeWidth={2} />
                <Area type="monotone" dataKey="istifadeciler" name="İstifadəçilər" stroke="hsl(160, 60%, 45%)" fill="url(#gUser)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={filteredData} barGap={1} barSize={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} width={35} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="vip" name="VIP" fill="hsl(40, 90%, 55%)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="premium" name="Premium" fill="hsl(260, 60%, 55%)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="ireliCekme" name="İrəli çəkmə" fill="hsl(210, 70%, 55%)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Bottom: Recent listings + Reports */}
      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">Son elanlar</h2>
            <Link to="/admin/elanlar" className="text-[11px] text-primary font-semibold hover:underline">Hamısına bax →</Link>
          </div>
          <div className="divide-y divide-border/50">
            {recentListings.map((l) => (
              <Link to="/admin/elanlar" key={l.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{l.title}</p>
                  <p className="text-[11px] text-muted-foreground">{l.category} · {l.user}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {statusBadge(l.status)}
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />{l.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Şikayətlər
            </h2>
            <Link to="/admin/sikayetler" className="text-[11px] text-primary font-semibold hover:underline">Hamısı →</Link>
          </div>
          <div className="divide-y divide-border/50">
            {recentReports.map((r) => (
              <div key={r.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/30 transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[r.priority]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{r.reason}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{r.listing} · {r.reporter}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{r.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
