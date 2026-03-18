import { useState } from "react";
import { X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cities = ["Hamısı", "Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Lənkəran", "Şəki", "Şirvan", "Naxçıvan"];

const sortOptions = [
  { value: "newest", label: "Ən yeni" },
  { value: "oldest", label: "Ən köhnə" },
  { value: "price_asc", label: "Ucuzdan bahaya" },
  { value: "price_desc", label: "Bahadan ucuza" },
];

interface ListingFiltersProps {
  open: boolean;
  onToggle: () => void;
  filters: {
    city: string;
    minPrice: string;
    maxPrice: string;
    sort: string;
    vipOnly: boolean;
  };
  onChange: (filters: ListingFiltersProps["filters"]) => void;
  onReset: () => void;
}

const ListingFilters = ({ open, onToggle, filters, onChange, onReset }: ListingFiltersProps) => {
  const activeCount = [
    filters.city !== "Hamısı",
    filters.minPrice,
    filters.maxPrice,
    filters.sort !== "newest",
    filters.vipOnly,
  ].filter(Boolean).length;

  const update = (key: string, value: string | boolean) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <>
      {/* Filter toggle button */}
      <button
        onClick={onToggle}
        className="h-11 px-4 rounded-xl border border-input bg-card text-foreground flex items-center gap-2 text-sm font-medium hover:bg-secondary transition-colors relative"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="hidden sm:inline">Filtr</span>
        {activeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Filter panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden col-span-full"
          >
            <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 mt-3 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground">Filtrlər</h3>
                <div className="flex items-center gap-2">
                  {activeCount > 0 && (
                    <button
                      onClick={onReset}
                      className="text-xs text-destructive hover:underline font-medium"
                    >
                      Sıfırla
                    </button>
                  )}
                  <button onClick={onToggle} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* City */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Şəhər</label>
                  <div className="relative">
                    <select
                      value={filters.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="w-full h-10 px-3 pr-8 rounded-xl border border-input bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Qiymət aralığı</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => update("minPrice", e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <span className="text-muted-foreground text-xs">—</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => update("maxPrice", e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Sıralama</label>
                  <div className="relative">
                    <select
                      value={filters.sort}
                      onChange={(e) => update("sort", e.target.value)}
                      className="w-full h-10 px-3 pr-8 rounded-xl border border-input bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {sortOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* VIP only */}
                <div className="flex items-end">
                  <label className="flex items-center gap-2.5 h-10 px-3 rounded-xl border border-input bg-background cursor-pointer w-full hover:bg-secondary/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={filters.vipOnly}
                      onChange={(e) => update("vipOnly", e.target.checked)}
                      className="w-4 h-4 rounded border-input text-primary accent-primary"
                    />
                    <span className="text-sm text-foreground font-medium">Yalnız VIP</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ListingFilters;
