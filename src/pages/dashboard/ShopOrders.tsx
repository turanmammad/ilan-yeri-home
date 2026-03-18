import { useState } from "react";
import { Search, Eye, Package, Truck, Check, X, Clock, ChevronDown } from "lucide-react";

const orders = [
  { id: "#ORD-1234", product: "iPhone 15 Pro Max 256GB", buyer: "Məhəmməd Həsənli", buyerPhone: "+994 50 111 22 33", amount: "2,100 ₼", status: "completed", date: "18.03.2026", address: "Bakı, Nəsimi r." },
  { id: "#ORD-1233", product: "AirPods Pro 2nd Gen", buyer: "Leyla Axundova", buyerPhone: "+994 55 444 55 66", amount: "320 ₼", status: "shipping", date: "17.03.2026", address: "Bakı, Yasamal r." },
  { id: "#ORD-1232", product: "MacBook Pro M3 14 inch", buyer: "Tural Məmmədov", buyerPhone: "+994 70 777 88 99", amount: "3,800 ₼", status: "pending", date: "16.03.2026", address: "Gəncə" },
  { id: "#ORD-1231", product: "Samsung Galaxy S24 Ultra", buyer: "Nigar Rüstəmova", buyerPhone: "+994 51 222 33 44", amount: "1,850 ₼", status: "completed", date: "15.03.2026", address: "Bakı, Xətai r." },
  { id: "#ORD-1230", product: "PlayStation 5 Slim", buyer: "Rəşad İsmayılov", buyerPhone: "+994 50 999 00 11", amount: "900 ₼", status: "cancelled", date: "14.03.2026", address: "Sumqayıt" },
  { id: "#ORD-1229", product: "iPad Air M2 256GB", buyer: "Aynur Əliyeva", buyerPhone: "+994 55 666 77 88", amount: "1,200 ₼", status: "completed", date: "13.03.2026", address: "Bakı, Səbail r." },
];

const statusConfig: Record<string, { label: string; style: string; icon: any }> = {
  completed: { label: "Tamamlandı", style: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400", icon: Check },
  shipping: { label: "Göndərilir", style: "bg-blue-500/15 text-blue-700 dark:text-blue-400", icon: Truck },
  pending: { label: "Gözləmədə", style: "bg-amber-500/15 text-amber-700 dark:text-amber-400", icon: Clock },
  cancelled: { label: "Ləğv edildi", style: "bg-destructive/15 text-destructive", icon: X },
};

const ShopOrders = () => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const stats = [
    { label: "Ümumi", value: orders.length, color: "text-foreground" },
    { label: "Tamamlandı", value: orders.filter((o) => o.status === "completed").length, color: "text-emerald-600" },
    { label: "Göndərilir", value: orders.filter((o) => o.status === "shipping").length, color: "text-blue-600" },
    { label: "Gözləmədə", value: orders.filter((o) => o.status === "pending").length, color: "text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Sifarişlər</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Müştəri sifarişlərini idarə edin</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Sifariş axtar..." className="h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      {/* Stats mini */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border px-4 py-3 shrink-0 min-w-[100px]">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { id: "all", label: "Hamısı" },
          { id: "pending", label: "Gözləmədə" },
          { id: "shipping", label: "Göndərilir" },
          { id: "completed", label: "Tamamlandı" },
          { id: "cancelled", label: "Ləğv edildi" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
              filter === tab.id ? "bg-foreground text-card" : "bg-secondary text-foreground/70 hover:bg-secondary/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const sc = statusConfig[order.status];
          return (
            <div key={order.id} className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${sc.style}`}>
                      <sc.icon className="w-3 h-3" /> {sc.label}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-foreground">{order.product}</p>
                </div>
                <span className="text-base font-bold text-foreground shrink-0">{order.amount}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>Alıcı: <span className="text-foreground font-medium">{order.buyer}</span></span>
                <span>{order.buyerPhone}</span>
                <span>{order.address}</span>
                <span>{order.date}</span>
              </div>
              {order.status === "pending" && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-medium hover:bg-emerald-500/25 transition-colors">
                    <Check className="w-3 h-3" /> Təsdiqlə
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-colors">
                    <X className="w-3 h-3" /> Ləğv et
                  </button>
                </div>
              )}
              {order.status === "shipping" && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-medium hover:bg-emerald-500/25 transition-colors">
                    <Check className="w-3 h-3" /> Çatdırıldı
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopOrders;
