import { Search, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const popularTags = ["iPhone", "Mənzil", "Avtomobil", "İş", "Məişət texnikası"];

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
    <section className="relative bg-primary/15 py-12 sm:py-20">
      {focused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-foreground/20 z-30"
          onClick={() => setFocused(false)}
        />
      )}

      <div className="container relative z-40 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-2xl sm:text-4xl font-extrabold text-foreground mb-8"
        >
          Azərbaycanda pulsuz elanlar
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className={`flex items-center bg-card h-14 sm:h-16 rounded-2xl shadow-card transition-shadow ${focused ? 'shadow-card-hover ring-2 ring-primary' : ''}`}
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
          <span className="text-sm text-muted-foreground">Populyar:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleSearch(tag)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors hover:underline"
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
