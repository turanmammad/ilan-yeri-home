import { Search, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const SearchHero = () => {
  const [focused, setFocused] = useState(false);

  return (
    <section className="relative bg-secondary py-10 sm:py-16">
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
          className="text-2xl sm:text-4xl font-extrabold text-foreground mb-2"
        >
          Axtardığın hər şey, tapmaq istədiyin qiymətə.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-sm sm:text-base mb-8"
        >
          48,291 yeni elan bu gün əlavə edildi
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className={`flex items-center bg-card h-14 sm:h-16 rounded-2xl shadow-card transition-shadow ${focused ? 'shadow-card-hover ring-2 ring-primary' : ''}`}>
            <div className="flex items-center gap-2 px-4 border-r border-border h-8 shrink-0">
              <MapPin className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-sm text-foreground hidden sm:inline">Bakı</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div className="flex-1 flex items-center px-4">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Məhsul, kateqoriya və ya marka axtar..."
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-foreground placeholder:text-muted-foreground ml-3"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </div>
            <button className="h-10 sm:h-12 px-5 sm:px-8 bg-primary text-primary-foreground font-semibold rounded-xl mr-1.5 sm:mr-2 text-sm hover:brightness-95 active:scale-95 transition-all">
              Axtar
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchHero;
