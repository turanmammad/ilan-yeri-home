import { Bell, Globe, Shield, Database, Mail, Save } from "lucide-react";

const AdminSettings = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-xl font-bold text-foreground">Tənzimləmələr</h1>
      <p className="text-sm text-muted-foreground">Platform parametrlərini idarə edin</p>
    </div>

    {/* General */}
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-foreground">Ümumi parametrlər</h2>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Sayt adı</label>
          <input defaultValue="UcuzTap" className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Sayt təsviri</label>
          <textarea defaultValue="Azərbaycanın ən böyük pulsuz elan platforması" rows={2} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Əlaqə e-poçt</label>
            <input defaultValue="info@ucuztap.az" className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Dil</label>
            <select className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Azərbaycan dili</option>
              <option>Русский</option>
              <option>English</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* Listings */}
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Database className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-foreground">Elan parametrləri</h2>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Avtomatik təsdiq</p>
            <p className="text-xs text-muted-foreground">Elanlar avtomatik yayımlansın</p>
          </div>
          <button className="w-11 h-6 rounded-full bg-primary relative transition-colors">
            <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-primary-foreground shadow-sm transition-transform" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Şəkil limiti</p>
            <p className="text-xs text-muted-foreground">Hər elan üçün max şəkil sayı</p>
          </div>
          <input type="number" defaultValue={8} className="w-16 h-9 px-3 rounded-xl border border-input bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Elan müddəti</p>
            <p className="text-xs text-muted-foreground">Elanın aktiv qalma müddəti (gün)</p>
          </div>
          <input type="number" defaultValue={30} className="w-16 h-9 px-3 rounded-xl border border-input bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
    </div>

    {/* Notifications */}
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Bell className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-foreground">Bildiriş parametrləri</h2>
      </div>
      <div className="space-y-3">
        {["Yeni elan bildirişi", "Şikayət bildirişi", "Yeni istifadəçi bildirişi"].map((item) => (
          <div key={item} className="flex items-center justify-between">
            <p className="text-sm text-foreground">{item}</p>
            <button className="w-11 h-6 rounded-full bg-primary relative transition-colors">
              <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-primary-foreground shadow-sm" />
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Security */}
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-foreground">Təhlükəsizlik</h2>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">İki addımlı doğrulama</p>
            <p className="text-xs text-muted-foreground">Admin girişi üçün 2FA tələb et</p>
          </div>
          <button className="w-11 h-6 rounded-full bg-secondary relative transition-colors">
            <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-card shadow-sm border border-border" />
          </button>
        </div>
      </div>
    </div>

    <button className="flex items-center justify-center gap-2 w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all">
      <Save className="w-4 h-4" />
      Dəyişiklikləri yadda saxla
    </button>
  </div>
);

export default AdminSettings;
