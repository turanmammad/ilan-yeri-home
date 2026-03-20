import { Search, MapPin, ChevronDown, Car, Home, Smartphone, Briefcase, Shirt, Sofa, Baby, Dumbbell, Wrench, PawPrint, Monitor, Sparkles, Camera, Tag, ShoppingBag, Heart, Clock, TrendingUp } from "lucide-react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const popularTags = ["iPhone", "Mənzil", "Avtomobil", "İş", "Məişət texnikası"];

const cities = [
  "Bütün Azərbaycan", "Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Şirvan",
  "Lənkəran", "Şəki", "Naxçıvan", "Quba", "Qusar", "Zaqatala", "Bərdə",
  "Göyçay", "Xaçmaz", "Masallı", "Sabirabad", "Salyan", "İsmayıllı",
];

// Search suggestion data for elastic-like search
const searchSuggestions = [
  { text: "iPhone 15 Pro Max", category: "Elektronika", count: 234 },
  { text: "iPhone 14", category: "Elektronika", count: 189 },
  { text: "iPhone SE", category: "Elektronika", count: 45 },
  { text: "Samsung Galaxy S24", category: "Elektronika", count: 312 },
  { text: "Samsung televizor", category: "Elektronika", count: 156 },
  { text: "MacBook Pro", category: "Kompüter", count: 87 },
  { text: "MacBook Air", category: "Kompüter", count: 134 },
  { text: "BMW 520", category: "Nəqliyyat", count: 423 },
  { text: "BMW X5", category: "Nəqliyyat", count: 267 },
  { text: "Mercedes E-class", category: "Nəqliyyat", count: 345 },
  { text: "Toyota Camry", category: "Nəqliyyat", count: 198 },
  { text: "3 otaqlı mənzil", category: "Daşınmaz əmlak", count: 1243 },
  { text: "2 otaqlı mənzil kirayə", category: "Daşınmaz əmlak", count: 876 },
  { text: "1 otaqlı mənzil", category: "Daşınmaz əmlak", count: 654 },
  { text: "Həyət evi", category: "Daşınmaz əmlak", count: 432 },
  { text: "PlayStation 5", category: "Elektronika", count: 167 },
  { text: "AirPods Pro", category: "Elektronika", count: 234 },
  { text: "Uşaq arabası", category: "Uşaq aləmi", count: 89 },
  { text: "Divan", category: "Ev və bağ", count: 345 },
  { text: "Velosiped", category: "Hobbi və idman", count: 123 },
  { text: "Mühasib", category: "İş elanları", count: 78 },
  { text: "Proqramçı", category: "İş elanları", count: 156 },
  { text: "Sürücü", category: "İş elanları", count: 234 },
];

const recentSearches = ["iPhone 15", "Mənzil kirayə Bakı", "BMW", "Velosiped"];

const trendingSearches = ["iPhone 15 Pro", "3 otaqlı mənzil", "Mercedes", "PlayStation 5", "Divan"];

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

const CityDropdown = ({ city, setCity, cityOpen, setCityOpen }: {
  city: string; setCity: (c: string) => void; cityOpen: boolean; setCityOpen: (o: boolean) => void;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const updatePos = useCallback(() => {
    if (btnRef.current && cityOpen) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 8, left: rect.left });
    }
  }, [cityOpen]);

  useEffect(() => {
    updatePos();
    if (cityOpen) {
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
      return () => {
        window.removeEventListener("scroll", updatePos, true);
        window.removeEventListener("resize", updatePos);
      };
    }
  }, [cityOpen, updatePos]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setCityOpen(!cityOpen)}
        className="flex items-center gap-2 px-4 border-r border-border h-14 sm:h-16 shrink-0 cursor-pointer hover:bg-secondary/50 transition-colors rounded-l-2xl"
      >
        <MapPin className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        <span className="text-sm font-medium text-foreground hidden sm:inline max-w-[100px] truncate">{city}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${cityOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
      </button>
      {cityOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setCityOpen(false)} />
          <div
            className="fixed w-56 max-h-64 overflow-y-auto bg-card rounded-xl border border-border shadow-xl z-[70] py-1 animate-in fade-in slide-in-from-top-2 duration-150"
            style={{ top: pos.top, left: pos.left }}
          >
            {cities.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => { setCity(c); setCityOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  city === c
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SearchHero = () => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Bakı");
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Elastic-like filtering
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchSuggestions
      .filter(s => s.text.toLowerCase().includes(q))
      .sort((a, b) => {
        // Prioritize starts-with matches
        const aStarts = a.text.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.text.toLowerCase().startsWith(q) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return b.count - a.count;
      })
      .slice(0, 8);
  }, [query]);

  const showDropdown = focused && (query.trim() ? suggestions.length > 0 : true);

  const handleSearch = (q?: string) => {
    const searchQuery = q || query;
    setFocused(false);
    if (searchQuery.trim()) {
      navigate(`/elanlar?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/elanlar");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = query.trim() ? suggestions : [];
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && items[selectedIndex]) {
      e.preventDefault();
      handleSearch(items[selectedIndex].text);
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  };

  // Reset selected index when query changes
  useEffect(() => { setSelectedIndex(-1); }, [query]);

  // Highlight matching text
  const highlightMatch = (text: string, q: string) => {
    if (!q.trim()) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-bold text-foreground">{text.slice(idx, idx + q.length)}</span>
        {text.slice(idx + q.length)}
      </>
    );
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
          className="max-w-2xl mx-auto relative"
        >
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className={`flex items-center bg-card h-14 sm:h-16 rounded-2xl shadow-lg transition-shadow ${focused ? 'shadow-xl ring-2 ring-card' : ''}`}
          >
            <CityDropdown city={city} setCity={setCity} cityOpen={cityOpen} setCityOpen={setCityOpen} />
            <div className="flex-1 flex items-center px-4">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nə axtarırsınız?"
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-foreground placeholder:text-muted-foreground"
                onFocus={() => setFocused(true)}
                autoComplete="off"
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

          {/* Search suggestions dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-2 bg-card rounded-2xl border border-border shadow-xl z-50 overflow-hidden"
              >
                {query.trim() ? (
                  /* Query-based suggestions */
                  <div className="py-1">
                    {suggestions.map((s, i) => (
                      <button
                        key={s.text}
                        type="button"
                        onClick={() => handleSearch(s.text)}
                        className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                          i === selectedIndex ? "bg-secondary" : "hover:bg-secondary/50"
                        }`}
                      >
                        <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground/80 truncate">{highlightMatch(s.text, query)}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground shrink-0">{s.category}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0">{s.count} elan</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Empty query - show recent + trending */
                  <div className="py-2">
                    {recentSearches.length > 0 && (
                      <div className="px-4 pb-2">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> Son axtarışlar
                        </p>
                        {recentSearches.map(s => (
                          <button key={s} type="button" onClick={() => handleSearch(s)}
                            className="w-full text-left px-2 py-1.5 text-sm text-foreground/80 hover:bg-secondary/50 rounded-lg transition-colors flex items-center gap-2">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="border-t border-border px-4 pt-2">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3" /> Trend axtarışlar
                      </p>
                      {trendingSearches.map(s => (
                        <button key={s} type="button" onClick={() => handleSearch(s)}
                          className="w-full text-left px-2 py-1.5 text-sm text-foreground/80 hover:bg-secondary/50 rounded-lg transition-colors flex items-center gap-2">
                          <TrendingUp className="w-3 h-3 text-primary" />
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
