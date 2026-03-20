import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, Star, Shield, Store, Heart, Phone, MessageCircle, Globe, Share2, ChevronRight, Grid3X3, Search, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

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
  phone: "+994 50 123 45 67",
  email: "info@techstore.az",
  website: "https://techstore.az",
  workHours: "Hər gün 09:00 - 20:00",
  followers: 1240,
  responseRate: "98%",
  responseTime: "< 1 saat",
  categories: ["Telefonlar", "Noutbuklar", "Aksesuarlar", "Planşetlər", "Qulaqlıqlar"],
};

const shopListings = [
  { id: 10, title: "iPhone 15 Pro Max 256GB", price: "2,100 ₼", img: "/placeholder.svg", time: "2 saat əvvəl", vip: true, views: 342 },
  { id: 11, title: "Samsung Galaxy S24 Ultra", price: "1,850 ₼", img: "/placeholder.svg", time: "1 gün əvvəl", vip: false, views: 218 },
  { id: 12, title: "MacBook Pro M3 14 inch", price: "3,800 ₼", img: "/placeholder.svg", time: "2 gün əvvəl", vip: true, views: 156 },
  { id: 13, title: "AirPods Pro 2nd Gen", price: "320 ₼", img: "/placeholder.svg", time: "3 gün əvvəl", vip: false, views: 97 },
  { id: 14, title: "iPad Air M2 256GB", price: "1,200 ₼", img: "/placeholder.svg", time: "4 gün əvvəl", vip: false, views: 85 },
  { id: 15, title: "Apple Watch Ultra 2", price: "1,500 ₼", img: "/placeholder.svg", time: "5 gün əvvəl", vip: false, views: 64 },
  { id: 16, title: "Sony WH-1000XM5", price: "450 ₼", img: "/placeholder.svg", time: "1 həftə əvvəl", vip: false, views: 53 },
  { id: 17, title: "PlayStation 5 Slim", price: "900 ₼", img: "/placeholder.svg", time: "1 həftə əvvəl", vip: false, views: 128 },
];

const shopReviews = [
  { id: 1, author: "Məhəmməd H.", rating: 5, text: "Əla xidmət, məhsul orijinaldır. Tövsiyə edirəm!", date: "17.03.2026" },
  { id: 2, author: "Leyla A.", rating: 4, text: "Keyfiyyətli məhsul, çatdırılma bir az gecikdi.", date: "15.03.2026" },
  { id: 3, author: "Tural M.", rating: 5, text: "MacBook Pro mükəmməl gəldi. Çox razıyam!", date: "12.03.2026" },
];

const ShopDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("listings");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = searchQuery
    ? shopListings.filter((l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : shopListings;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Cover image */}
      <div className="h-32 sm:h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <main className="container -mt-12 sm:-mt-16 relative z-10 flex-1 pb-8">
        {/* Shop header card */}
        <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card mb-6">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0 border-4 border-card -mt-12 sm:-mt-14">
              <Store className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">{shop.name}</h1>
                    {shop.verified && (
                      <span className="text-xs font-semibold bg-primary/15 text-primary px-2 py-0.5 rounded-lg">✓ Təsdiqlənmiş</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/70 mb-3 max-w-xl">{shop.description}</p>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                      <span className="font-semibold text-foreground">{shop.rating}</span> ({shop.reviews} rəy)
                    </span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{shop.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{shop.memberSince}-dən bəri</span>
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" />{shop.totalListings} elan</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{shop.followers} izləyici</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 shrink-0">
                  <a href={`https://wa.me/994501234567?text=${encodeURIComponent(`Salam, "${shop.name}" mağazası ilə maraqlanıram.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="h-10 px-4 bg-[#25D366] text-white font-semibold rounded-xl text-sm hover:brightness-95 active:scale-95 transition-all flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    WhatsApp
                  </a>
                  <a href={`tel:${shop.phone}`}
                    className="h-10 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-95 transition-all flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Zəng et
                  </a>
                  <button className="h-10 px-4 border border-input bg-card text-foreground font-medium rounded-xl text-sm hover:bg-secondary transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Mesaj
                  </button>
                  <button className="w-10 h-10 border border-input rounded-xl flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-border">
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-foreground">{shop.responseRate}</p>
              <p className="text-[11px] text-muted-foreground">Cavab nisbəti</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-foreground">{shop.responseTime}</p>
              <p className="text-[11px] text-muted-foreground">Cavab müddəti</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-foreground">{shop.workHours.split(" ")[0]}</p>
              <p className="text-[11px] text-muted-foreground">{shop.workHours.split(" ").slice(1).join(" ")}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              {shop.website && (
                <a href={shop.website} className="text-sm font-medium text-primary hover:underline flex items-center justify-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> Sayt
                </a>
              )}
              <p className="text-[11px] text-muted-foreground mt-0.5">{shop.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { id: "listings", label: `Elanlar (${shop.totalListings})`, icon: Grid3X3 },
            { id: "reviews", label: `Rəylər (${shop.reviews})`, icon: Star },
            { id: "about", label: "Haqqında", icon: Store },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 ${
                activeTab === tab.id ? "bg-foreground text-card" : "bg-secondary text-foreground/70 hover:bg-secondary/80"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Listings tab */}
        {activeTab === "listings" && (
          <>
            {/* Search within shop */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 flex items-center bg-secondary h-10 rounded-xl px-4 gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mağazada axtar..."
                  className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Category chips */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
              <button className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium bg-foreground text-card">Hamısı</button>
              {shop.categories.map((cat) => (
                <button key={cat} className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium bg-secondary text-foreground/70 hover:bg-secondary/80 transition-colors">
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-4">{filteredListings.length} elan</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredListings.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                >
                  <Link
                    to={`/elan/${item.id}`}
                    className="block bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {item.vip && (
                        <span className="absolute top-2 left-2 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-current" /> VIP
                        </span>
                      )}
                      <button onClick={(e) => e.preventDefault()} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-destructive transition-colors">
                        <Heart className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
                      <p className="text-base font-bold text-foreground mt-1">{item.price}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">{item.views} baxış</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Reviews tab */}
        {activeTab === "reviews" && (
          <div className="space-y-4">
            {/* Rating summary */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-foreground">{shop.rating}</p>
                <div className="flex gap-0.5 mt-2 justify-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-primary fill-primary" : "text-primary/40 fill-primary/40"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{shop.reviews} rəy</p>
              </div>
              <div className="flex-1 w-full space-y-1.5">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-xs w-3 text-muted-foreground">{stars}</span>
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${stars === 5 ? 63 : stars === 4 ? 22 : stars === 3 ? 10 : stars === 2 ? 3 : 2}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {shopReviews.map((review) => (
              <div key={review.id} className="bg-card rounded-2xl border border-border p-5 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-bold text-muted-foreground">{review.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.author}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground/80">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* About tab */}
        {activeTab === "about" && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
              <h3 className="font-bold text-foreground">Mağaza haqqında</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{shop.description}</p>
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{shop.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{shop.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{shop.workHours}</span>
                </div>
                {shop.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={shop.website} className="text-primary hover:underline">{shop.website}</a>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
              <h3 className="font-bold text-foreground">Kateqoriyalar</h3>
              <div className="flex flex-wrap gap-2">
                {shop.categories.map((cat) => (
                  <span key={cat} className="px-3 py-1.5 bg-secondary rounded-xl text-xs font-medium text-foreground">{cat}</span>
                ))}
              </div>
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cavab nisbəti</span>
                  <span className="font-semibold text-foreground">{shop.responseRate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cavab müddəti</span>
                  <span className="font-semibold text-foreground">{shop.responseTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">İzləyici</span>
                  <span className="font-semibold text-foreground">{shop.followers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Üzv olduğu tarix</span>
                  <span className="font-semibold text-foreground">{shop.memberSince}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShopDetail;
