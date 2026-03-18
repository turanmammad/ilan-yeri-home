import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ImagePlus, X, MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "Elektronika", "Nəqliyyat", "Əmlak", "Ev və bağ", "Geyim", "Uşaq aləmi",
  "İdman və hobbi", "Heyvanlar", "İş və xidmətlər",
];

const cities = [
  "Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Lənkəran", "Şəki", "Şirvan", "Naxçıvan", "Quba", "Zaqatala",
];

const currencies = ["₼", "$", "€"];

const CreateListing = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currency, setCurrency] = useState("₼");

  const handleImageAdd = () => {
    // Placeholder - add a demo image
    if (images.length < 8) {
      setImages([...images, `/placeholder.svg`]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Geri</span>
          </Link>
          <h1 className="text-base font-bold text-foreground">Yeni elan</h1>
          <div className="w-16" />
        </div>
      </header>

      <div className="container max-w-2xl py-6 sm:py-10">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Images */}
          <section className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card">
            <h2 className="text-base font-bold text-foreground mb-1">Şəkillər</h2>
            <p className="text-xs text-muted-foreground mb-4">Ən az 1, ən çox 8 şəkil əlavə edin. İlk şəkil əsas şəkil olacaq.</p>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl border border-border overflow-hidden group bg-secondary">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-foreground/70 text-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 text-[10px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md">
                      Əsas
                    </span>
                  )}
                </div>
              ))}
              {images.length < 8 && (
                <button
                  type="button"
                  onClick={handleImageAdd}
                  className="aspect-square rounded-xl border-2 border-dashed border-input hover:border-primary/50 bg-secondary/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ImagePlus className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Əlavə et</span>
                </button>
              )}
            </div>
          </section>

          {/* Details */}
          <section className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-4">
            <h2 className="text-base font-bold text-foreground">Elan məlumatları</h2>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Başlıq</label>
              <input
                type="text"
                placeholder="Məsələn: iPhone 15 Pro Max 256GB"
                maxLength={80}
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Kateqoriya</label>
              <div className="relative">
                <select className="w-full h-11 px-4 pr-10 rounded-xl border border-input bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                  <option value="">Kateqoriya seçin</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Təsvir</label>
              <textarea
                rows={5}
                maxLength={4000}
                placeholder="Məhsul haqqında ətraflı məlumat yazın..."
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
              />
            </div>
          </section>

          {/* Price */}
          <section className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-4">
            <h2 className="text-base font-bold text-foreground">Qiymət</h2>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="0"
                min={0}
                className="flex-1 h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="flex bg-secondary rounded-xl p-1">
                {currencies.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currency === c
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-input accent-primary" />
              <span className="text-sm text-foreground">Razılaşma yolu ilə</span>
            </label>
          </section>

          {/* Location */}
          <section className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-4">
            <h2 className="text-base font-bold text-foreground">Lokasiya</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Şəhər</label>
              <div className="relative">
                <select className="w-full h-11 px-4 pl-10 pr-10 rounded-xl border border-input bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                  <option value="">Şəhər seçin</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-4">
            <h2 className="text-base font-bold text-foreground">Əlaqə</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefon nömrəsi</label>
              <div className="flex gap-2">
                <div className="h-11 px-3 rounded-xl border border-input bg-secondary flex items-center text-sm font-medium text-foreground shrink-0">
                  +994
                </div>
                <input
                  type="tel"
                  placeholder="50 123 45 67"
                  className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex gap-3 pb-8">
            <Link
              to="/"
              className="flex-1 h-12 flex items-center justify-center rounded-xl border border-input bg-card text-foreground font-medium text-sm hover:bg-secondary transition-colors"
            >
              Ləğv et
            </Link>
            <button
              type="submit"
              className="flex-[2] h-12 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all"
            >
              Elanı yerləşdir
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateListing;
