import { Heart, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const favorites = [
  { id: 1, title: "Mercedes-Benz E 220 d", price: "45,000 ₼", location: "Bakı", img: "/placeholder.svg", seller: "AvtoLux" },
  { id: 2, title: "3 otaqlı mənzil, 120 m²", price: "185,000 ₼", location: "Bakı, Yasamal", img: "/placeholder.svg", seller: "Əhməd M." },
  { id: 3, title: "MacBook Pro M3 14 inch", price: "3,800 ₼", location: "Bakı", img: "/placeholder.svg", seller: "TechStore" },
  { id: 4, title: "Yeni divan dəsti", price: "850 ₼", location: "Bakı", img: "/placeholder.svg", seller: "HomeStyle" },
  { id: 5, title: "Toyota Camry 2.5", price: "32,000 ₼", location: "Bakı", img: "/placeholder.svg", seller: "Rəşad K." },
];

const Favorites = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-foreground">Seçilmişlər</h2>
      <p className="text-sm text-muted-foreground mt-0.5">{favorites.length} elan seçilmişlərdə</p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((item) => (
        <div key={item.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
          <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <button className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-destructive hover:bg-card transition-colors">
              <Heart className="w-4 h-4 fill-current" />
            </button>
          </div>
          <div className="p-4">
            <Link to={`/elan/${item.id}`} className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
              {item.title}
            </Link>
            <p className="text-base font-bold text-foreground mt-1">{item.price}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />{item.location}
              </span>
              <span className="text-xs text-muted-foreground">{item.seller}</span>
            </div>
            <button className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-input text-sm font-medium text-foreground/70 hover:text-destructive hover:border-destructive/30 transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Favorites;
