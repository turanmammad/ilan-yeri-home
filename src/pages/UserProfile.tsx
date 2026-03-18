import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, Shield, Heart, Star, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const user = {
  id: 1,
  name: "Əli Həsənov",
  avatar: "Ə",
  location: "Bakı",
  memberSince: "2024",
  totalListings: 8,
  verified: true,
};

const userListings = [
  { id: 20, title: "iPhone 15 Pro Max 256GB", price: "2,100 ₼", img: "/placeholder.svg", time: "2 saat əvvəl" },
  { id: 21, title: "Nike Air Max 90", price: "120 ₼", img: "/placeholder.svg", time: "1 gün əvvəl" },
  { id: 22, title: "PlayStation 5 Slim", price: "900 ₼", img: "/placeholder.svg", time: "3 gün əvvəl" },
  { id: 23, title: "Dyson V15 tozsoran", price: "450 ₼", img: "/placeholder.svg", time: "1 həftə əvvəl" },
];

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="container py-6 flex-1">
        {/* User header */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary">{user.avatar}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
                {user.verified && (
                  <span className="text-xs font-semibold bg-primary/15 text-primary px-2 py-0.5 rounded-lg">✓</span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{user.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{user.memberSince}-dən üzv</span>
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" />{user.totalListings} elan</span>
              </div>
            </div>
          </div>
        </div>

        {/* User listings */}
        <h2 className="text-lg font-bold text-foreground mb-4">Bütün elanlar ({user.totalListings})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {userListings.map((item) => (
            <Link
              key={item.id}
              to={`/elan/${item.id}`}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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

export default UserProfile;
