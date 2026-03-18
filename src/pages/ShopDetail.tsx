import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, Star, Shield, Store, Heart, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const shop = {
  id: 1,
  name: "TechStore Bakı",
  description: "Orijinal elektronika məhsulları. Rəsmi zəmanət ilə Apple, Samsung, Sony və digər brendlər. 2020-ci ildən fəaliyyətdə.",
  rating: 4.8,
  reviews: 156,
  totalListings: 234,
  location: "Bakı, 28 May",
  memberSince: "2020",
  verified: true,
};

const shopListings = [
  { id: 10, title: "iPhone 15 Pro Max 256GB", price: "2,100 ₼", img: "/placeholder.svg", time: "2 saat əvvəl", vip: true },
  { id: 11, title: "Samsung Galaxy S24 Ultra", price: "1,850 ₼", img: "/placeholder.svg", time: "1 gün əvvəl", vip: false },
  { id: 12, title: "MacBook Pro M3 14 inch", price: "3,800 ₼", img: "/placeholder.svg", time: "2 gün əvvəl", vip: true },
  { id: 13, title: "AirPods Pro 2nd Gen", price: "320 ₼", img: "/placeholder.svg", time: "3 gün əvvəl", vip: false },
  { id: 14, title: "iPad Air M2 256GB", price: "1,200 ₼", img: "/placeholder.svg", time: "4 gün əvvəl", vip: false },
  { id: 15, title: "Apple Watch Ultra 2", price: "1,500 ₼", img: "/placeholder.svg", time: "5 gün əvvəl", vip: false },
  { id: 16, title: "Sony WH-1000XM5", price: "450 ₼", img: "/placeholder.svg", time: "1 həftə əvvəl", vip: false },
  { id: 17, title: "PlayStation 5 Slim", price: "900 ₼", img: "/placeholder.svg", time: "1 həftə əvvəl", vip: false },
];

const ShopDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="container py-6 flex-1">
        {/* Shop header */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
              <Store className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-foreground">{shop.name}</h1>
                {shop.verified && (
                  <span className="text-xs font-semibold bg-primary/15 text-primary px-2 py-0.5 rounded-lg">✓ Təsdiqlənmiş</span>
                )}
              </div>
              <p className="text-sm text-foreground/70 mb-3">{shop.description}</p>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-primary fill-primary" /> <span className="font-medium text-foreground">{shop.rating}</span> ({shop.reviews} rəy)</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{shop.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{shop.memberSince}-dən bəri</span>
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" />{shop.totalListings} elan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Bütün elanlar ({shop.totalListings})</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {shopListings.map((item) => (
            <Link
              key={item.id}
              to={`/elan/${item.id}`}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {item.vip && (
                  <span className="absolute top-2 left-2 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-md flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-current" /> VIP
                  </span>
                )}
                <button
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-destructive transition-colors"
                >
                  <Heart className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
                <p className="text-base font-bold text-foreground mt-1">{item.price}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopDetail;
