import { useState, useRef } from "react";
import { Store, Camera, Save, MapPin, Mail, Phone, Globe, Clock, FileText, Image, Palette, X, Upload, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

const themeColors = [
  { name: "Narıncı", value: "#F5A623" },
  { name: "Mavi", value: "#4A90D9" },
  { name: "Bənövşəyi", value: "#7B68EE" },
  { name: "Yaşıl", value: "#50C878" },
  { name: "Qırmızı", value: "#FF6B6B" },
  { name: "Tünd", value: "#1A1F36" },
  { name: "Çəhrayı", value: "#E91E8C" },
  { name: "Firuzəyi", value: "#00BCD4" },
];

const ShopSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [logo, setLogo] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#4A90D9");
  const [customColor, setCustomColor] = useState("#4A90D9");
  const [saved, setSaved] = useState(false);

  const logoRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string | null) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Fayl ölçüsü 5MB-dan çox ola bilməz!");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Yalnız şəkil faylları yüklənə bilər!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setter(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Mağaza tənzimləmələri yadda saxlanıldı!");
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "general", label: "Ümumi", icon: Store },
    { id: "appearance", label: "Görünüş", icon: Palette },
    { id: "contact", label: "Əlaqə", icon: Phone },
    { id: "policies", label: "Qaydalar", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Mağaza tənzimləmələri</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Mağazanızın məlumatlarını idarə edin</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 ${
              activeTab === tab.id ? "bg-foreground text-card" : "bg-secondary text-foreground/70 hover:bg-secondary/80"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "general" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-6">
          <h3 className="font-bold text-foreground">Mağaza məlumatları</h3>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mağaza logosu</label>
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-border bg-secondary/50 flex items-center justify-center overflow-hidden">
                  {logo ? (
                    <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Store className="w-10 h-10 text-muted-foreground" />
                  )}
                </div>
                <button
                  onClick={() => logoRef.current?.click()}
                  className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:brightness-90 transition"
                >
                  <Camera className="w-4 h-4" />
                </button>
                {logo && (
                  <button
                    onClick={() => setLogo(null)}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center shadow-md"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setLogo)} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Logo yüklə</p>
                <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WEBP — max 5MB</p>
                <p className="text-xs text-muted-foreground">Kvadrat format tövsiyə edilir (200×200px)</p>
                <button onClick={() => logoRef.current?.click()} className="mt-2 text-xs font-medium text-primary hover:underline flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Fayl seç
                </button>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Mağaza adı</label>
              <input type="text" defaultValue="TechStore Bakı" className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Təsvir</label>
              <textarea defaultValue="Orijinal elektronika məhsulları. Rəsmi zəmanət ilə Apple, Samsung, Sony və digər brendlər." rows={3} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Kateqoriya</label>
                <select className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Elektronika</option>
                  <option>Geyim</option>
                  <option>Ev və bağ</option>
                  <option>Nəqliyyat</option>
                  <option>Uşaq aləmi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Ünvan</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" defaultValue="Bakı, 28 May" className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">İş saatları</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" defaultValue="Hər gün 09:00 - 20:00" className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <button type="submit"
              className={`flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98] ${
                saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
              }`}>
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Yadda saxlanıldı!" : "Yadda saxla"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "appearance" && (
        <div className="space-y-6">
          {/* Banner Upload */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
            <h3 className="font-bold text-foreground">Baner şəkli</h3>
            <p className="text-xs text-muted-foreground">Mağaza səhifənizin yuxarısında görünəcək örtük şəkli. 1200×400px tövsiyə edilir.</p>

            <div className="relative">
              <div
                className="aspect-[3/1] rounded-2xl border-2 border-dashed border-border overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => bannerRef.current?.click()}
              >
                {banner ? (
                  <img src={banner} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-secondary/50 flex flex-col items-center justify-center gap-2">
                    <Image className="w-10 h-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Baner şəkli yükləyin</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG — max 5MB</p>
                  </div>
                )}
              </div>
              {banner && (
                <div className="absolute top-3 right-3 flex gap-2">
                  <button onClick={() => bannerRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-xs font-medium text-foreground hover:bg-card transition-colors flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Dəyişdir
                  </button>
                  <button onClick={() => setBanner(null)}
                    className="px-3 py-1.5 rounded-lg bg-destructive/90 backdrop-blur-sm text-xs font-medium text-white hover:bg-destructive transition-colors flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Sil
                  </button>
                </div>
              )}
              <input ref={bannerRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setBanner)} />
            </div>
          </div>

          {/* Theme Color */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
            <h3 className="font-bold text-foreground">Mağaza rəngi</h3>
            <p className="text-xs text-muted-foreground">Mağazanızın tema rəngini seçin. Bu rəng mağaza səhifənizdə istifadə olunacaq.</p>

            <div className="flex flex-wrap gap-3">
              {themeColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => { setSelectedColor(color.value); setCustomColor(color.value); }}
                  className={`w-12 h-12 rounded-xl border-2 transition-all hover:scale-110 flex items-center justify-center ${
                    selectedColor === color.value ? "border-foreground scale-110 shadow-lg" : "border-border"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor === color.value && <Check className="w-5 h-5 text-white drop-shadow-md" />}
                </button>
              ))}
            </div>

            {/* Custom color picker */}
            <div className="flex items-center gap-3 pt-2">
              <label className="text-sm font-medium text-foreground">Xüsusi rəng:</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => { setCustomColor(e.target.value); setSelectedColor(e.target.value); }}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setSelectedColor(e.target.value);
                  }}
                  className="w-28 h-10 px-3 rounded-xl border border-input bg-background text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-3">Önizləmə</p>
              <div className="rounded-xl overflow-hidden border border-border">
                <div className="h-16" style={{ backgroundColor: selectedColor }} />
                <div className="p-3 bg-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-card -mt-6 bg-secondary flex items-center justify-center" style={{ borderColor: selectedColor }}>
                    {logo ? (
                      <img src={logo} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Store className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">TechStore Bakı</p>
                    <p className="text-[10px] text-muted-foreground">Elektronika · Bakı</p>
                  </div>
                  <button className="ml-auto px-3 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: selectedColor }}>
                    İzlə
                  </button>
                </div>
              </div>
            </div>
          </div>


          <button onClick={handleSave}
            className={`flex items-center justify-center gap-2 w-full h-11 font-semibold rounded-xl text-sm transition-all active:scale-[0.98] ${
              saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
            }`}>
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Yadda saxlanıldı!" : "Görünüş tənzimləmələrini yadda saxla"}
          </button>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
          <h3 className="font-bold text-foreground">Əlaqə məlumatları</h3>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="tel" defaultValue="+994 50 123 45 67" className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" defaultValue="info@techstore.az" className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Veb sayt</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="url" defaultValue="https://techstore.az" className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <button type="submit"
              className={`flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98] ${
                saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
              }`}>
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Yadda saxlanıldı!" : "Yadda saxla"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "policies" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
          <h3 className="font-bold text-foreground">Mağaza qaydaları</h3>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Geri qaytarma siyasəti</label>
              <textarea rows={4} defaultValue="Məhsullar alındığı gündən 14 gün ərzində geri qaytarıla bilər. Məhsul orijinal qablaşdırmasında olmalıdır." className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Çatdırılma şərtləri</label>
              <textarea rows={4} defaultValue="Bakı daxili pulsuz çatdırılma. Regionlara çatdırılma 5-10 ₼ arası. Sifariş 1-3 iş günü ərzində çatdırılır." className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <button type="submit"
              className={`flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98] ${
                saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
              }`}>
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Yadda saxlanıldı!" : "Yadda saxla"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShopSettings;
