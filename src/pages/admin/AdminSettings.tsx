import { useState } from "react";
import { Bell, Globe, Shield, Database, Save, Check } from "lucide-react";
import { toast } from "sonner";

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  language: string;
  autoApprove: boolean;
  imageLimit: number;
  listingDuration: number;
  notifyNewListing: boolean;
  notifyComplaint: boolean;
  notifyNewUser: boolean;
  twoFactorAuth: boolean;
}

const defaultSettings: Settings = {
  siteName: "UcuzTap",
  siteDescription: "Azərbaycanın ən böyük pulsuz elan platforması",
  contactEmail: "info@ucuztap.az",
  language: "az",
  autoApprove: true,
  imageLimit: 8,
  listingDuration: 30,
  notifyNewListing: true,
  notifyComplaint: true,
  notifyNewUser: true,
  twoFactorAuth: false,
};

const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`w-11 h-6 rounded-full relative transition-colors ${enabled ? "bg-primary" : "bg-secondary"}`}
  >
    <div
      className={`absolute top-0.5 w-5 h-5 rounded-full shadow-sm transition-transform ${
        enabled
          ? "right-0.5 bg-primary-foreground"
          : "left-0.5 bg-card border border-border"
      }`}
    />
  </button>
);

const AdminSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Dəyişikliklər uğurla yadda saxlanıldı!");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
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
            <input
              value={settings.siteName}
              onChange={(e) => update("siteName", e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Sayt təsviri</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => update("siteDescription", e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Əlaqə e-poçt</label>
              <input
                value={settings.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Dil</label>
              <select
                value={settings.language}
                onChange={(e) => update("language", e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="az">Azərbaycan dili</option>
                <option value="ru">Русский</option>
                <option value="en">English</option>
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
            <Toggle enabled={settings.autoApprove} onToggle={() => update("autoApprove", !settings.autoApprove)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Şəkil limiti</p>
              <p className="text-xs text-muted-foreground">Hər elan üçün max şəkil sayı</p>
            </div>
            <input
              type="number"
              value={settings.imageLimit}
              onChange={(e) => update("imageLimit", Number(e.target.value))}
              min={1}
              max={20}
              className="w-16 h-9 px-3 rounded-xl border border-input bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Elan müddəti</p>
              <p className="text-xs text-muted-foreground">Elanın aktiv qalma müddəti (gün)</p>
            </div>
            <input
              type="number"
              value={settings.listingDuration}
              onChange={(e) => update("listingDuration", Number(e.target.value))}
              min={1}
              max={365}
              className="w-16 h-9 px-3 rounded-xl border border-input bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring"
            />
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
          {([
            { key: "notifyNewListing" as const, label: "Yeni elan bildirişi" },
            { key: "notifyComplaint" as const, label: "Şikayət bildirişi" },
            { key: "notifyNewUser" as const, label: "Yeni istifadəçi bildirişi" },
          ]).map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <p className="text-sm text-foreground">{item.label}</p>
              <Toggle enabled={settings[item.key]} onToggle={() => update(item.key, !settings[item.key])} />
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
            <Toggle enabled={settings.twoFactorAuth} onToggle={() => update("twoFactorAuth", !settings.twoFactorAuth)} />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`flex items-center justify-center gap-2 w-full h-12 font-semibold rounded-xl text-sm transition-all active:scale-[0.98] ${
          saved
            ? "bg-emerald-500 text-white"
            : "bg-primary text-primary-foreground hover:brightness-95"
        }`}
      >
        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? "Yadda saxlanıldı!" : "Dəyişiklikləri yadda saxla"}
      </button>
    </div>
  );
};

export default AdminSettings;
