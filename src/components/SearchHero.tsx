import { Search, MapPin, ChevronDown, Car, Home, Smartphone, Briefcase, Shirt, Sofa, Baby, Dumbbell, Wrench, PawPrint, Monitor, Sparkles, Camera, Tag, ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const popularTags = ["iPhone", "Mənzil", "Avtomobil", "İş", "Məişət texnikası"];

const cities = [
  "Bütün Azərbaycan", "Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Şirvan",
  "Lənkəran", "Şəki", "Naxçıvan", "Quba", "Qusar", "Zaqatala", "Bərdə",
  "Göyçay", "Xaçmaz", "Masallı", "Sabirabad", "Salyan", "İsmayıllı",
];

const floatingIcons = [
  { icon: Car, x: "8%", y: "18%", size: 28, delay: 0, rotate: -12 },
  { icon: Home, x: "85%", y: "15%", size: 32, delay: 0.3, rotate: 8 },
  { icon: Smartphone, x: "15%", y: "72%", size: 24, delay: 0.6, rotate: 15 },
  { icon: Briefcase, x: "90%", y: "68%", size: 26, delay: 0.2, rotate: -8 },
  { icon: Shirt, x: "5%", y: "45%", size: 22, delay: 0.8, rotate: 20 },
  { icon: Camera, x: "92%", y: "42%", size: 24, delay: 0.5, rotate: -15 },
  { icon: Tag, x: "22%", y: "12%", size: 20, delay: 1.0, rotate: 10 },
  { icon: ShoppingBag, x: "78%", y: "80%", size: 22, delay: 0.4, rotate: -20 },
  { icon: Heart, x: "75%", y: "22%", size: 20, delay: 0.7, rotate: 12 },
  { icon: Sofa, x: "18%", y: "85%", size: 26, delay: 0.9, rotate: -6 },
  { icon: PawPrint, x: "70%", y: "55%", size: 20, delay: 1.1, rotate: 18 },
  { icon: Monitor, x: "30%", y: "78%", size: 22, delay: 0.15, rotate: -10 },
];

const SearchHero = () => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (q?: string) => {
    const searchQuery = q || query;
    if (searchQuery.trim()) {
      navigate(`/elanlar?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/elanlar");
    }
  };

  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Floating icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.12, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: item.delay },
            scale: { duration: 0.8, delay: item.delay },
            y: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: item.delay },
          }}
          className="absolute text-primary-foreground pointer-events-none"
          style={{ left: item.x, top: item.y, rotate: `${item.rotate}deg` }}
        >
          <item.icon style={{ width: item.size, height: item.size }} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary-foreground/5 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-primary-foreground/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-primary-foreground/[0.03] pointer-events-none" />

      {focused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-foreground/20 z-30"
          onClick={() => setFocused(false)}
        />
      )}

      <div className="container relative z-40 text-center py-14 sm:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-2xl sm:text-4xl font-extrabold text-primary-foreground mb-3"
        >
          Azərbaycanda pulsuz elanlar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-primary-foreground/70 text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          Al, sat, dəyiş — hər şey bir yerdə
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className={`flex items-center bg-card h-14 sm:h-16 rounded-2xl shadow-lg transition-shadow ${focused ? 'shadow-xl ring-2 ring-card' : ''}`}
          >
            <div className="flex items-center gap-2 px-4 border-r border-border h-8 shrink-0 cursor-pointer hover:bg-secondary/50 transition-colors rounded-l-2xl">
              <MapPin className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-sm font-medium text-foreground hidden sm:inline">Bakı</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div className="flex-1 flex items-center px-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nə axtarırsınız?"
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-foreground placeholder:text-muted-foreground"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </div>
            <button
              type="submit"
              className="h-10 sm:h-12 px-5 sm:px-7 bg-foreground text-card font-semibold rounded-xl mr-1.5 sm:mr-2 text-sm hover:bg-foreground/90 active:scale-95 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" strokeWidth={2} />
              Axtar
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mt-5 flex-wrap"
        >
          <span className="text-sm text-primary-foreground/50">Populyar:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleSearch(tag)}
              className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors hover:underline"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SearchHero;
