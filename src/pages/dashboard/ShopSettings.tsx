import { useState } from "react";
import { Store, Camera, Save, MapPin, Mail, Phone, Globe, Clock, FileText, Image, Palette } from "lucide-react";

const ShopSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

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

          {/* Logo */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center">
                <Store className="w-10 h-10 text-primary" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm hover:brightness-95 transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Mağaza logosu</p>
              <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG — max 2MB, 200×200px</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
            <button type="submit" className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all">
              <Save className="w-4 h-4" /> Yadda saxla
            </button>
          </form>
        </div>
      )}

      {activeTab === "appearance" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-6">
          <h3 className="font-bold text-foreground">Mağaza görünüşü</h3>

          {/* Cover image */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Örtük şəkli</label>
            <div className="aspect-[3/1] bg-secondary rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-secondary/80 transition-colors">
              <Image className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Şəkil yükləyin — 1200×400px tövsiyə edilir</p>
            </div>
          </div>

          {/* Theme colors */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mağaza rəngi</label>
            <div className="flex gap-3">
              {["#F5A623", "#4A90D9", "#7B68EE", "#50C878", "#FF6B6B", "#1A1F36"].map((color) => (
                <button
                  key={color}
                  className="w-10 h-10 rounded-xl border-2 border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all">
            <Save className="w-4 h-4" /> Yadda saxla
          </button>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
          <h3 className="font-bold text-foreground">Əlaqə məlumatları</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
            <button type="submit" className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all">
              <Save className="w-4 h-4" /> Yadda saxla
            </button>
          </form>
        </div>
      )}

      {activeTab === "policies" && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
          <h3 className="font-bold text-foreground">Mağaza qaydaları</h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Geri qaytarma siyasəti</label>
            <textarea rows={4} defaultValue="Məhsullar alındığı gündən 14 gün ərzində geri qaytarıla bilər. Məhsul orijinal qablaşdırmasında olmalıdır." className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Çatdırılma şərtləri</label>
            <textarea rows={4} defaultValue="Bakı daxili pulsuz çatdırılma. Regionlara çatdırılma 5-10 ₼ arası. Sifariş 1-3 iş günü ərzində çatdırılır." className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all">
            <Save className="w-4 h-4" /> Yadda saxla
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopSettings;
