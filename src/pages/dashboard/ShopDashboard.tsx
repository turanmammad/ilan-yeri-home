import { Store, TrendingUp, Eye, ShoppingBag, Star, CreditCard, BarChart3, Package, Clock, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";

const shopStats = [
  { label: "Ümumi satış", value: "₼12,450", change: "+18%", up: true, icon: CreditCard, color: "bg-emerald-500/15 text-emerald-600" },
  { label: "Aktiv elanlar", value: "48", change: "+5", up: true, icon: Package, color: "bg-primary/15 text-primary" },
  { label: "Mağaza baxışı", value: "8,234", change: "+24%", up: true, icon: Eye, color: "bg-blue-500/15 text-blue-600" },
  { label: "Orta reytinq", value: "4.8", change: "+0.1", up: true, icon: Star, color: "bg-amber-500/15 text-amber-600" },
];

const topProducts = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", price: "2,100 ₼", views: 342, sales: 12, img: "/placeholder.svg" },
  { id: 2, title: "Samsung Galaxy S24 Ultra", price: "1,850 ₼", views: 218, sales: 8, img: "/placeholder.svg" },
  { id: 3, title: "MacBook Pro M3 14 inch", price: "3,800 ₼", views: 156, sales: 5, img: "/placeholder.svg" },
  { id: 4, title: "AirPods Pro 2nd Gen", price: "320 ₼", views: 97, sales: 23, img: "/placeholder.svg" },
];

const recentOrders = [
  { id: "#ORD-1234", product: "iPhone 15 Pro Max", buyer: "Məhəmməd H.", amount: "2,100 ₼", status: "completed", date: "18.03.2026" },
  { id: "#ORD-1233", product: "AirPods Pro 2nd Gen", buyer: "Leyla A.", amount: "320 ₼", status: "shipping", date: "17.03.2026" },
  { id: "#ORD-1232", product: "MacBook Pro M3", buyer: "Tural M.", amount: "3,800 ₼", status: "pending", date: "16.03.2026" },
  { id: "#ORD-1231", product: "Samsung Galaxy S24", buyer: "Nigar R.", amount: "1,850 ₼", status: "completed", date: "15.03.2026" },
];

const orderStatusStyles: Record<string, string> = {
  completed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  shipping: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  cancelled: "bg-destructive/15 text-destructive",
};
const orderStatusLabels: Record<string, string> = {
  completed: "Tamamlandı",
  shipping: "Göndərilir",
  pending: "Gözləmədə",
  cancelled: "Ləğv edildi",
};

const weeklyData = [
  { day: "Baz.e", views: 120, orders: 3 },
  { day: "Ç.ax", views: 180, orders: 5 },
  { day: "Çər", views: 150, orders: 2 },
  { day: "C.ax", views: 220, orders: 7 },
  { day: "Cümə", views: 310, orders: 9 },
  { day: "Şən", views: 280, orders: 6 },
  { day: "Baz", views: 190, orders: 4 },
];

const ShopDashboard = () => (
  <div className="space-y-6">
    {/* Shop info bar */}
    <div className="bg-card rounded-2xl border border-border p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
          <Store className="w-7 h-7 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">TechStore Bakı</h2>
            <span className="text-[10px] font-semibold bg-primary/15 text-primary px-2 py-0.5 rounded-lg">✓ Təsdiqlənmiş</span>
          </div>
          <p className="text-sm text-muted-foreground">Elektronika · Bakı, 28 May · 2020-dən bəri</p>
        </div>
      </div>
      <Link to="/magaza/1" className="text-sm font-medium text-primary hover:underline flex items-center gap-1 shrink-0">
        Mağazaya bax <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {shopStats.map((stat) => (
        <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? "text-emerald-600" : "text-destructive"}`}>
              {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {stat.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>

    {/* Weekly chart (simple bar) */}
    <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" /> Həftəlik baxış statistikası
        </h3>
      </div>
      <div className="flex items-end justify-between gap-2 h-32">
        {weeklyData.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col items-center gap-0.5">
              <span className="text-[10px] font-medium text-foreground">{d.views}</span>
              <div className="w-full max-w-[32px] bg-primary/20 rounded-t-md relative" style={{ height: `${(d.views / 310) * 80}px` }}>
                <div className="absolute inset-0 bg-primary rounded-t-md" style={{ height: `${(d.orders / 9) * 100}%` }} />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-3 justify-center">
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-primary/20" />Baxış</span>
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-primary" />Sifariş</span>
      </div>
    </div>

    <div className="grid lg:grid-cols-5 gap-6">
      {/* Top products */}
      <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="font-bold text-foreground">Ən çox satılan məhsullar</h3>
          <Link to="/hesab/elanlar" className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5">
            Hamısı <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {topProducts.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/40 transition-colors">
              <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
              <div className="w-12 h-12 rounded-xl bg-secondary overflow-hidden shrink-0">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.views} baxış · {p.sales} satış</p>
              </div>
              <span className="text-sm font-bold text-foreground shrink-0">{p.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="font-bold text-foreground">Son sifarişlər</h3>
          <Link to="/hesab/magazam/sifarisler" className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5">
            Hamısı <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentOrders.map((o) => (
            <div key={o.id} className="px-5 py-3.5 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-muted-foreground">{o.id}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${orderStatusStyles[o.status]}`}>
                  {orderStatusLabels[o.status]}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">{o.product}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">{o.buyer} · {o.date}</span>
                <span className="text-sm font-bold text-foreground">{o.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ShopDashboard;
