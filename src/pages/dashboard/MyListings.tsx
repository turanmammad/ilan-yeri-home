import { Link } from "react-router-dom";
import { Edit, Trash2, Eye, MoreVertical, Plus } from "lucide-react";

const listings = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", price: "2,100 ₼", views: 342, status: "active", date: "12.03.2026", img: "/placeholder.svg" },
  { id: 2, title: "Samsung Galaxy S24 Ultra", price: "1,850 ₼", views: 218, status: "active", date: "07.03.2026", img: "/placeholder.svg" },
  { id: 3, title: "MacBook Air M2 2023", price: "1,600 ₼", views: 156, status: "pending", date: "01.03.2026", img: "/placeholder.svg" },
  { id: 4, title: "AirPods Pro 2nd Gen", price: "320 ₼", views: 97, status: "expired", date: "15.02.2026", img: "/placeholder.svg" },
  { id: 5, title: "PlayStation 5 Slim", price: "900 ₼", views: 64, status: "active", date: "10.03.2026", img: "/placeholder.svg" },
  { id: 6, title: "Nike Air Max 90", price: "120 ₼", views: 43, status: "expired", date: "01.02.2026", img: "/placeholder.svg" },
];

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-700",
  pending: "bg-amber-500/15 text-amber-700",
  expired: "bg-muted/40 text-muted-foreground",
};
const statusLabels: Record<string, string> = {
  active: "Aktiv",
  pending: "Gözləmədə",
  expired: "Bitib",
};

const MyListings = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-foreground">Elanlarım</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{listings.length} elan</p>
      </div>
      <Link
        to="/elan-yerleshdir"
        className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2.5 rounded-xl text-sm hover:brightness-95 active:scale-95 transition-all"
      >
        <Plus className="w-4 h-4" /> Yeni elan
      </Link>
    </div>

    {/* Filter tabs */}
    <div className="flex gap-2">
      {["Hamısı", "Aktiv", "Gözləmədə", "Bitib"].map((tab, i) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            i === 0 ? "bg-foreground text-card" : "bg-secondary text-foreground/70 hover:bg-secondary/80"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    <div className="space-y-3">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="bg-card rounded-2xl border border-border p-4 shadow-card hover:shadow-card-hover transition-shadow flex gap-4"
        >
          <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-xl bg-secondary overflow-hidden shrink-0">
            <img src={listing.img} alt={listing.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <Link to={`/elan/${listing.id}`} className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate">
                  {listing.title}
                </Link>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${statusStyles[listing.status]}`}>
                  {statusLabels[listing.status]}
                </span>
              </div>
              <p className="text-lg font-bold text-foreground mt-1">{listing.price}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{listing.views}</span>
                <span>{listing.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors" title="Redaktə et">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors" title="Sil">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MyListings;
