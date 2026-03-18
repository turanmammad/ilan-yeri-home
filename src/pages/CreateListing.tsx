import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ImagePlus, X, MapPin, ChevronDown, ChevronRight,
  Car, Smartphone, Home, Shirt, Sofa, Briefcase, Baby, Dumbbell,
  Wrench, PawPrint, Monitor, Sparkles, Camera, Info, Wand2, Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Category Data ───
const mainCategories = [
  {
    icon: Car, label: "Nəqliyyat", slug: "transport",
    subs: ["Avtomobillər", "Motosikletlər", "Ehtiyat hissələri", "Su nəqliyyatı", "Ağır texnika"],
  },
  {
    icon: Home, label: "Daşınmaz əmlak", slug: "realestate",
    subs: ["Mənzillər", "Evlər / Villalar", "Torpaq", "Qarajlar", "Obyektlər"],
  },
  {
    icon: Smartphone, label: "Elektronika", slug: "electronics",
    subs: ["Telefonlar", "Planşetlər", "Noutbuklar", "Kompüterlər", "Foto / Video", "TV / Audio"],
  },
  {
    icon: Briefcase, label: "İş və biznes", slug: "jobs",
    subs: ["Tam iş günü", "Yarım iş günü", "Uzaqdan iş", "Staj", "Biznes təklifləri"],
  },
  {
    icon: Shirt, label: "Şəxsi əşyalar", slug: "personal",
    subs: ["Geyim", "Ayaqqabı", "Aksessuarlar", "Saatlar", "Zərgərlik"],
  },
  {
    icon: Sofa, label: "Ev və bağ", slug: "home",
    subs: ["Mebel", "Məişət texnikası", "Bağ avadanlığı", "Təmir", "Dekor"],
  },
  {
    icon: Baby, label: "Uşaq aləmi", slug: "kids",
    subs: ["Uşaq geyimləri", "Oyuncaqlar", "Uşaq arabaları", "Uşaq mebeli", "Məktəb ləvazimatları"],
  },
  {
    icon: Dumbbell, label: "Hobbi, idman və istirahət", slug: "hobby",
    subs: ["İdman avadanlığı", "Musiqi alətləri", "Kitablar", "Kolleksiya", "Turizm"],
  },
  {
    icon: PawPrint, label: "Heyvanlar", slug: "animals",
    subs: ["Itlər", "Pişiklər", "Quşlar", "Balıqlar", "Digər heyvanlar"],
  },
  {
    icon: Wrench, label: "Xidmətlər", slug: "services",
    subs: ["Təmir xidmətləri", "Kuryer", "Təmizlik", "Repetitor", "Digər xidmətlər"],
  },
];

const cities = [
  "Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Lənkəran", "Şəki",
  "Şirvan", "Naxçıvan", "Quba", "Zaqatala", "Bərdə", "Şamaxı",
];

const bakuDistricts = [
  "28 May", "Binəqədi", "Xətai", "Xəzər", "Nərimanov", "Nəsimi",
  "Nizami", "Pirallahı", "Qaradağ", "Sabail", "Sabunçu", "Suraxanı", "Yasamal",
];

// ─── Component ───
const CreateListing = () => {
  const [step, setStep] = useState(1);
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aiTitleLoading, setAiTitleLoading] = useState(false);
  const [aiDescLoading, setAiDescLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{ titles?: string[]; descriptions?: string[] }>({});
  const navigate = useNavigate();

  // TODO: Backend əlavə edildikdən sonra bu funksiyaları real API çağırışları ilə əvəz edin
  const handleAiTitle = async () => {
    setAiTitleLoading(true);
    setAiSuggestions((prev) => ({ ...prev, titles: undefined }));
    try {
      // TODO: API call - POST /functions/v1/ai-listing-helper { type: "title", category: mainCat?.label, subcategory: selectedSub, currentTitle: title }
      // Placeholder: simulate delay
      await new Promise((r) => setTimeout(r, 1500));
      setAiSuggestions((prev) => ({
        ...prev,
        titles: [
          "AI tərəfindən yaradılmış başlıq 1",
          "AI tərəfindən yaradılmış başlıq 2",
          "AI tərəfindən yaradılmış başlıq 3",
        ],
      }));
    } catch {
      // TODO: handle error with toast
    } finally {
      setAiTitleLoading(false);
    }
  };

  const handleAiDescription = async () => {
    setAiDescLoading(true);
    setAiSuggestions((prev) => ({ ...prev, descriptions: undefined }));
    try {
      // TODO: API call - POST /functions/v1/ai-listing-helper { type: "description", category: mainCat?.label, subcategory: selectedSub, title, currentDescription: description }
      await new Promise((r) => setTimeout(r, 1500));
      setAiSuggestions((prev) => ({
        ...prev,
        descriptions: [
          "AI tərəfindən yaradılmış ətraflı təsvir. Məhsulun vəziyyəti, xüsusiyyətləri və çatdırılma şərtləri daxil edilmişdir.",
        ],
      }));
    } catch {
      // TODO: handle error with toast
    } finally {
      setAiDescLoading(false);
    }
  };

  const mainCat = mainCategories.find((c) => c.slug === selectedMain);

  const handleSelectMain = (slug: string) => {
    setSelectedMain(slug);
    setSelectedSub(null);
  };

  const handleSelectSub = (sub: string) => {
    setSelectedSub(sub);
    setStep(2);
  };

  const handleImageAdd = () => {
    if (images.length < 8) {
      setImages([...images, "/placeholder.svg"]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const breadcrumb = () => {
    const parts = ["Elan yerləşdir"];
    if (mainCat) parts.push(mainCat.label);
    if (selectedSub) parts.push(selectedSub);
    return parts;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="border-b border-border bg-card">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Ana səhifə</Link>
            {breadcrumb().map((part, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <span className={i === breadcrumb().length - 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
                  {part}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="container max-w-3xl py-6 sm:py-8 flex-1">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {s}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${
                step >= s ? "text-foreground" : "text-muted-foreground"
              }`}>
                {s === 1 ? "Kateqoriya" : "Elan məlumatları"}
              </span>
              {s < 2 && <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* STEP 1: Category Selection */}
        {step === 1 && (
          <div className="space-y-0">
            <h1 className="text-xl font-bold text-foreground mb-1">Kateqoriya seçin</h1>
            <p className="text-sm text-muted-foreground mb-5">Elanınız üçün uyğun kateqoriyanı seçin</p>

            <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden flex" style={{ minHeight: 420 }}>
              {/* Main categories */}
              <div className={`${selectedMain ? "hidden sm:block" : ""} w-full sm:w-64 border-r border-border shrink-0`}>
                {mainCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleSelectMain(cat.slug)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors border-b border-border/50 ${
                      selectedMain === cat.slug ? "bg-primary/5 border-l-2 border-l-primary" : ""
                    }`}
                  >
                    <cat.icon className={`w-5 h-5 shrink-0 ${selectedMain === cat.slug ? "text-primary" : "text-muted-foreground"}`} strokeWidth={1.5} />
                    <span className={`text-sm ${selectedMain === cat.slug ? "font-semibold text-foreground" : "text-foreground/80"}`}>
                      {cat.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </button>
                ))}
              </div>

              {/* Subcategories */}
              <div className="flex-1">
                {selectedMain && mainCat ? (
                  <div>
                    <div className="sm:hidden px-4 py-3 border-b border-border">
                      <button onClick={() => setSelectedMain(null)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Geri
                      </button>
                    </div>
                    <div className="px-4 py-3 border-b border-border bg-secondary/30">
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <mainCat.icon className="w-4 h-4 text-primary" />
                        {mainCat.label}
                      </h3>
                    </div>
                    {mainCat.subs.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSelectSub(sub)}
                        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-primary/5 transition-colors border-b border-border/50"
                      >
                        <span className="text-sm text-foreground/80">{sub}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center p-8">
                      <Info className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
                      <p className="text-sm">Soldakı siyahıdan kateqoriya seçin</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Listing Details */}
        {step === 2 && (
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Kateqoriyanı dəyiş
              </button>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm font-medium text-primary">{mainCat?.label} → {selectedSub}</span>
            </div>

            {/* Images */}
            <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
              <div className="flex items-center gap-2 mb-1">
                <Camera className="w-4 h-4 text-primary" />
                <h2 className="text-base font-bold text-foreground">Şəkillər</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                İlk şəkil əsas şəkil olacaq. Ən az 1, ən çox 8 şəkil əlavə edin.
              </p>

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
            </div>

            {/* Title & Description */}
            <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-4">
              <h2 className="text-base font-bold text-foreground">Elan məlumatları</h2>

              {/* Title */}
              <div>
                <label className="flex items-center justify-between text-sm font-medium text-foreground mb-1.5">
                  Başlıq <span className="text-xs text-muted-foreground font-normal">{title.length} / 80</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Məsələn: iPhone 15 Pro Max 256GB"
                  maxLength={80}
                  className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAiTitle}
                  disabled={aiTitleLoading}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-xs font-medium text-primary hover:from-primary/20 hover:to-accent/20 transition-all disabled:opacity-50"
                >
                  {aiTitleLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                  AI ilə başlıq yarat
                </button>
                {aiSuggestions.titles && (
                  <div className="mt-2 space-y-1.5">
                    {aiSuggestions.titles.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { setTitle(s); setAiSuggestions((prev) => ({ ...prev, titles: undefined })); }}
                        className="w-full text-left px-3 py-2 rounded-lg border border-primary/20 bg-primary/5 text-sm text-foreground hover:bg-primary/10 transition-colors flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center justify-between text-sm font-medium text-foreground mb-1.5">
                  Təsvir <span className="text-xs text-muted-foreground font-normal">{description.length} / 4000</span>
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={4000}
                  placeholder="Məhsul haqqında ətraflı məlumat yazın. Vəziyyəti, xüsusiyyətləri, çatdırılma şərtləri və s. qeyd edin."
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                />
                <button
                  type="button"
                  onClick={handleAiDescription}
                  disabled={aiDescLoading}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-xs font-medium text-primary hover:from-primary/20 hover:to-accent/20 transition-all disabled:opacity-50"
                >
                  {aiDescLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                  {description.length > 0 ? "AI ilə təsviri yaxşılaşdır" : "AI ilə təsvir yarat"}
                </button>
                {aiSuggestions.descriptions && (
                  <div className="mt-2 space-y-1.5">
                    {aiSuggestions.descriptions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { setDescription(s); setAiSuggestions((prev) => ({ ...prev, descriptions: undefined })); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg border border-primary/20 bg-primary/5 text-sm text-foreground hover:bg-primary/10 transition-colors flex items-start gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="line-clamp-3">{s}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-4">
              <h2 className="text-base font-bold text-foreground">Qiymət</h2>

              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Qiymət"
                    min={0}
                    className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="relative">
                  <select className="h-11 px-4 pr-9 rounded-xl border border-input bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                    <option>AZN</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-input accent-primary" />
                  <span className="text-sm text-foreground">Razılaşma yolu ilə</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-input accent-primary" />
                  <span className="text-sm text-foreground">Barter mümkündür</span>
                </label>
              </div>
            </div>

            {/* Location */}
            <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-4">
              <h2 className="text-base font-bold text-foreground">Lokasiya</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Şəhər / Rayon</label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-11 px-4 pl-10 pr-10 rounded-xl border border-input bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    >
                      <option value="">Seçin</option>
                      {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                {city === "Bakı" && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Rayon</label>
                    <div className="relative">
                      <select className="w-full h-11 px-4 pr-10 rounded-xl border border-input bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
                        <option value="">Seçin</option>
                        {bakuDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-4">
              <h2 className="text-base font-bold text-foreground">Əlaqə məlumatları</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Ad</label>
                  <input
                    type="text"
                    placeholder="Adınız"
                    className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt (istəyə bağlı)</label>
                <input
                  type="email"
                  placeholder="email@nümunə.com"
                  className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
              </div>
            </div>

            {/* Info box */}
            <div className="rounded-2xl bg-primary/10 border border-primary/20 px-5 py-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/80 space-y-1">
                <p className="font-medium text-foreground">Elan yerləşdirmə qaydaları</p>
                <ul className="list-disc list-inside text-xs space-y-0.5 text-muted-foreground">
                  <li>Saxta və ya yanıltıcı məlumat yerləşdirməyin</li>
                  <li>Şəkillər məhsula aid olmalıdır</li>
                  <li>Bir məhsul üçün bir elan yerləşdirin</li>
                  <li>Elan 30 gün aktiv qalacaq</li>
                </ul>
              </div>
            </div>

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
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CreateListing;
