import { User, Mail, Phone, MapPin, Camera, Save } from "lucide-react";

const Settings = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-foreground">Tənzimləmələr</h2>
      <p className="text-sm text-muted-foreground mt-0.5">Hesab məlumatlarınızı idarə edin</p>
    </div>

    {/* Profile */}
    <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
      <h3 className="font-bold text-foreground mb-5">Profil məlumatları</h3>

      <div className="flex items-center gap-5 mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm hover:brightness-95 transition-all">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">Əli Həsənov</p>
          <p className="text-sm text-muted-foreground">Üzv: Mart 2026-dan</p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Ad</label>
            <input
              type="text"
              defaultValue="Əli"
              className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Soyad</label>
            <input
              type="text"
              defaultValue="Həsənov"
              className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              defaultValue="ali@email.com"
              className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              defaultValue="+994 50 123 45 67"
              className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Şəhər</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              defaultValue="Bakı"
              className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all"
        >
          <Save className="w-4 h-4" /> Yadda saxla
        </button>
      </form>
    </div>

    {/* Password */}
    <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
      <h3 className="font-bold text-foreground mb-5">Şifrəni dəyiş</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Hazırkı şifrə</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Yeni şifrə</label>
            <input
              type="password"
              placeholder="Ən az 6 simvol"
              className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Yeni şifrə (təkrar)</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 border border-input bg-card text-foreground font-medium px-6 py-2.5 rounded-xl text-sm hover:bg-secondary transition-colors"
        >
          Şifrəni yenilə
        </button>
      </form>
    </div>

    {/* Notifications settings */}
    <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
      <h3 className="font-bold text-foreground mb-5">Bildiriş tənzimləmələri</h3>
      <div className="space-y-4">
        {[
          { label: "Yeni mesaj bildirişi", desc: "Elanlarınıza gələn mesajlar haqqında" },
          { label: "Elan baxış statistikası", desc: "Elanınız müəyyən sayda baxıldığında" },
          { label: "Qiymət dəyişikliyi", desc: "Seçilmiş elanlarda qiymət dəyişdikdə" },
          { label: "Kampaniya və yeniliklər", desc: "Endirimli paketlər və yeniliklər" },
        ].map((item) => (
          <label key={item.label} className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-input accent-primary" />
          </label>
        ))}
      </div>
    </div>

    {/* Danger zone */}
    <div className="bg-card rounded-2xl border border-destructive/30 p-6 shadow-card">
      <h3 className="font-bold text-destructive mb-2">Təhlükə zonası</h3>
      <p className="text-sm text-muted-foreground mb-4">Hesabınızı silmək geri qaytarıla bilməz</p>
      <button className="px-5 py-2.5 rounded-xl border border-destructive text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors">
        Hesabı sil
      </button>
    </div>
  </div>
);

export default Settings;
