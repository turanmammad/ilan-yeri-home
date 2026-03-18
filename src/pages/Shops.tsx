import { Link } from "react-router-dom";
import { Store, MapPin, Star, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const shops = [
  { id: 1, name: "TechStore Bakı", category: "Elektronika", rating: 4.8, listings: 234, location: "Bakı", verified: true },
  { id: 2, name: "AvtoLux", category: "Nəqliyyat", rating: 4.6, listings: 156, location: "Bakı", verified: true },
  { id: 3, name: "FashionAZ", category: "Geyim", rating: 4.5, listings: 312, location: "Gəncə", verified: false },
  { id: 4, name: "HomeStyle", category: "Ev və bağ", rating: 4.7, listings: 98, location: "Bakı", verified: true },
  { id: 5, name: "BabyWorld", category: "Uşaq aləmi", rating: 4.9, listings: 187, location: "Sumqayıt", verified: true },
  { id: 6, name: "SportMax", category: "İdman", rating: 4.4, listings: 76, location: "Bakı", verified: false },
  { id: 7, name: "GadgetHub", category: "Elektronika", rating: 4.3, listings: 143, location: "Bakı", verified: true },
  { id: 8, name: "EvTikinti", category: "Tikinti", rating: 4.6, listings: 210, location: "Bakı", verified: true },
];

const Shops = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />

    <div className="container py-8 flex-1">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Mağazalar</h1>
      <p className="text-sm text-muted-foreground mb-8">Etibarlı satıcılardan alış-veriş edin</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {shops.map((shop, i) => (
          <motion.div
            key={shop.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
          >
            <Link
              to={`/magaza/${shop.id}`}
              className="block bg-card rounded-2xl border border-border p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <Store className="w-7 h-7 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-foreground truncate">{shop.name}</h3>
                    {shop.verified && (
                      <span className="text-[10px] font-semibold bg-primary/15 text-primary px-1.5 py-0.5 rounded-md shrink-0">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{shop.category}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="font-medium text-foreground">{shop.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">{shop.listings} elan</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{shop.location}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>

    <Footer />
  </div>
);

export default Shops;
