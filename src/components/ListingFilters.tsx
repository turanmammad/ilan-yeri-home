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

// Category-specific filter definitions
const categoryFilters: Record<string, { key: string; label: string; type: "select" | "checkbox"; options?: string[] }[]> = {
  "Nəqliyyat": [
    { key: "brand", label: "Marka", type: "select", options: ["Hamısı", "BMW", "Mercedes", "Toyota", "Hyundai", "Kia", "Lexus", "Nissan", "Chevrolet", "VAZ"] },
    { key: "fuelType", label: "Yanacaq növü", type: "select", options: ["Hamısı", "Benzin", "Dizel", "Qaz", "Hibrid", "Elektrik"] },
    { key: "yearMin", label: "İl (min)", type: "select", options: ["Hamısı", "2024", "2023", "2022", "2020", "2018", "2015", "2010", "2005", "2000"] },
    { key: "gearbox", label: "Sürətlər qutusu", type: "select", options: ["Hamısı", "Avtomat", "Mexaniki", "Robotlaşdırılmış"] },
  ],
  "Daşınmaz əmlak": [
    { key: "rooms", label: "Otaq sayı", type: "select", options: ["Hamısı", "1", "2", "3", "4", "5+"] },
    { key: "area", label: "Sahə (m²)", type: "select", options: ["Hamısı", "0-50", "50-100", "100-150", "150-200", "200+"] },
    { key: "propertyType", label: "Əmlak növü", type: "select", options: ["Hamısı", "Mənzil", "Ev / Villa", "Torpaq", "Ofis", "Qaraj"] },
    { key: "dealType", label: "Əməliyyat növü", type: "select", options: ["Hamısı", "Satış", "Kirayə", "Günlük kirayə"] },
  ],
  "Elektronika": [
    { key: "condition", label: "Vəziyyəti", type: "select", options: ["Hamısı", "Yeni", "İşlənmiş", "Ehtiyat hissə"] },
    { key: "brand", label: "Marka", type: "select", options: ["Hamısı", "Apple", "Samsung", "Xiaomi", "Huawei", "Sony", "LG", "Lenovo", "HP", "Dell"] },
  ],
  "İş elanları": [
    { key: "jobType", label: "İş növü", type: "select", options: ["Hamısı", "Tam ştat", "Yarım ştat", "Freelance", "Staj"] },
    { key: "experience", label: "Təcrübə", type: "select", options: ["Hamısı", "Təcrübəsiz", "1-3 il", "3-5 il", "5+ il"] },
    { key: "education", label: "Təhsil", type: "select", options: ["Hamısı", "Orta", "Ali", "Magistr", "Fərqi yoxdur"] },
  ],
  "Geyim": [
    { key: "gender", label: "Cins", type: "select", options: ["Hamısı", "Kişi", "Qadın", "Uşaq", "Uniseks"] },
    { key: "size", label: "Ölçü", type: "select", options: ["Hamısı", "XS", "S", "M", "L", "XL", "XXL"] },
    { key: "condition", label: "Vəziyyəti", type: "select", options: ["Hamısı", "Yeni", "İşlənmiş"] },
  ],
  "Ev və bağ": [
    { key: "subcategory", label: "Alt kateqoriya", type: "select", options: ["Hamısı", "Mebel", "Məişət texnikası", "Bağ alətləri", "Dekor", "Təmir"] },
    { key: "condition", label: "Vəziyyəti", type: "select", options: ["Hamısı", "Yeni", "İşlənmiş"] },
  ],
  "Uşaq aləmi": [
    { key: "ageGroup", label: "Yaş qrupu", type: "select", options: ["Hamısı", "0-1", "1-3", "3-6", "6-12", "12+"] },
    { key: "subcategory", label: "Alt kateqoriya", type: "select", options: ["Hamısı", "Geyim", "Oyuncaq", "Araba / Çarpayı", "Dərs ləvazimatı"] },
  ],
  "Xidmətlər": [
    { key: "serviceType", label: "Xidmət növü", type: "select", options: ["Hamısı", "Təmir", "Təmizlik", "Nəqliyyat", "Təhsil", "Sağlamlıq", "IT xidmət"] },
  ],
  "Heyvanlar": [
    { key: "animalType", label: "Heyvan növü", type: "select", options: ["Hamısı", "İt", "Pişik", "Quş", "Balıq", "Digər"] },
    { key: "purpose", label: "Məqsəd", type: "select", options: ["Hamısı", "Satış", "Hədiyyə", "Cütləşdirmə"] },
  ],
  "Kompüter": [
    { key: "pcType", label: "Növ", type: "select", options: ["Hamısı", "Noutbuk", "Masaüstü", "Aksesuar", "Ehtiyat hissə", "Monitor"] },
    { key: "brand", label: "Marka", type: "select", options: ["Hamısı", "Apple", "Lenovo", "HP", "Dell", "Asus", "Acer", "MSI"] },
    { key: "condition", label: "Vəziyyəti", type: "select", options: ["Hamısı", "Yeni", "İşlənmiş"] },
  ],
  "Gözəllik": [
    { key: "subcategory", label: "Alt kateqoriya", type: "select", options: ["Hamısı", "Makiyaj", "Saç baxımı", "Dəri baxımı", "Ətir", "Xidmət"] },
  ],
  "Hobbi və idman": [
    { key: "subcategory", label: "Alt kateqoriya", type: "select", options: ["Hamısı", "İdman avadanlığı", "Musiqi alətləri", "Kitab", "Kolleksiya", "Turizm"] },
    { key: "condition", label: "Vəziyyəti", type: "select", options: ["Hamısı", "Yeni", "İşlənmiş"] },
  ],
};

export interface ListingFiltersState {
  city: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  vipOnly: boolean;
  [key: string]: string | boolean;
}

interface ListingFiltersProps {
  open: boolean;
  onToggle: () => void;
  filters: ListingFiltersState;
  onChange: (filters: ListingFiltersState) => void;
  onReset: () => void;
  activeCategory?: string;
}

const ListingFilters = ({ open, onToggle, filters, onChange, onReset, activeCategory = "Hamısı" }: ListingFiltersProps) => {
  const extraFilters = activeCategory !== "Hamısı" ? (categoryFilters[activeCategory] || []) : [];

  const activeCount = [
    filters.city !== "Hamısı",
    filters.minPrice,
    filters.maxPrice,
    filters.sort !== "newest",
    filters.vipOnly,
    ...extraFilters.map((f) => {
      const val = filters[f.key];
      return val && val !== "Hamısı" && val !== false;
    }),
  ].filter(Boolean).length;

  const update = (key: string, value: string | boolean) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <>
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
                <h3 className="text-sm font-bold text-foreground">
                  Filtrlər
                  {activeCategory !== "Hamısı" && (
                    <span className="ml-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {activeCategory}
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  {activeCount > 0 && (
                    <button onClick={onReset} className="text-xs text-destructive hover:underline font-medium">
                      Sıfırla
                    </button>
                  )}
                  <button onClick={onToggle} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Common filters */}
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

              {/* Category-specific filters */}
              {extraFilters.length > 0 && (
                <>
                  <div className="border-t border-border mt-4 pt-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-3">
                      {activeCategory} filterləri
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {extraFilters.map((f) => (
                        <div key={f.key}>
                          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{f.label}</label>
                          {f.type === "select" && f.options && (
                            <div className="relative">
                              <select
                                value={(filters[f.key] as string) || "Hamısı"}
                                onChange={(e) => update(f.key, e.target.value)}
                                className="w-full h-10 px-3 pr-8 rounded-xl border border-input bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
                              >
                                {f.options.map((opt) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ListingFilters;
