import { useState } from "react";
import { Bell, Globe, Shield, Database, Save, Check, User, KeyRound, Camera, Eye, EyeOff, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";

const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`w-11 h-6 rounded-full relative transition-colors ${enabled ? "bg-primary" : "bg-secondary"}`}
  >
    <div
      className={`absolute top-0.5 w-5 h-5 rounded-full shadow-sm transition-transform ${
        enabled ? "right-0.5 bg-primary-foreground" : "left-0.5 bg-card border border-border"
      }`}
    />
  </button>
);

const tabs = [
  { id: "profile", label: "Profil", icon: User },
  { id: "password", label: "Şifrə", icon: KeyRound },
  { id: "notifications", label: "Bildirişlər", icon: Bell },
  { id: "platform", label: "Platform", icon: Globe },
  { id: "security", label: "Təhlükəsizlik", icon: Shield },
] as const;

type TabId = (typeof tabs)[number]["id"];

// ── Profile Tab ──
const ProfileTab = () => {
  const [profile, setProfile] = useState({
    fullName: "Admin İstifadəçi",
    email: "admin@ucuztap.az",
    phone: "+994 50 123 45 67",
    role: "Super Admin",
    bio: "UcuzTap platformasının baş administratoru",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    toast.success("Profil məlumatları yeniləndi!");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">A</span>
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:brightness-90 transition">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <p className="font-semibold text-foreground">{profile.fullName}</p>
          <p className="text-xs text-muted-foreground">{profile.role}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Son giriş: Bu gün, 14:32</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Ad və Soyad</label>
          <input value={profile.fullName} onChange={(e) => setProfile(p => ({ ...p, fullName: e.target.value }))}
            className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt</label>
            <input value={profile.email} onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
            <input value={profile.phone} onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Haqqında</label>
          <textarea value={profile.bio} onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))} rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Rol</label>
          <input value={profile.role} disabled
            className="w-full h-10 px-4 rounded-xl border border-input bg-muted text-sm text-muted-foreground cursor-not-allowed" />
        </div>
      </div>

      <button onClick={handleSave}
        className={`flex items-center justify-center gap-2 w-full h-11 font-semibold rounded-xl text-sm transition-all active:scale-[0.98] ${
          saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
        }`}>
        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? "Yadda saxlanıldı!" : "Profili yenilə"}
      </button>
    </div>
  );
};

// ── Password Tab ──
const PasswordTab = () => {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!form.current || !form.newPass || !form.confirm) {
      toast.error("Bütün sahələri doldurun!");
      return;
    }
    if (form.newPass.length < 8) {
      toast.error("Yeni şifrə ən azı 8 simvol olmalıdır!");
      return;
    }
    if (form.newPass !== form.confirm) {
      toast.error("Yeni şifrələr uyğun gəlmir!");
      return;
    }
    setSaved(true);
    toast.success("Şifrə uğurla dəyişdirildi!");
    setForm({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setSaved(false), 2000);
  };

  const strength = form.newPass.length === 0 ? 0 : form.newPass.length < 6 ? 1 : form.newPass.length < 10 ? 2 : /[A-Z]/.test(form.newPass) && /\d/.test(form.newPass) && /[^A-Za-z0-9]/.test(form.newPass) ? 4 : 3;
  const strengthLabels = ["", "Zəif", "Orta", "Güclü", "Çox güclü"];
  const strengthColors = ["", "bg-destructive", "bg-orange-400", "bg-yellow-400", "bg-emerald-500"];

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-sm text-foreground font-medium">🔒 Şifrə tələbləri</p>
        <ul className="text-xs text-muted-foreground mt-1.5 space-y-0.5 list-disc list-inside">
          <li>Ən azı 8 simvol</li>
          <li>Böyük və kiçik hərflər</li>
          <li>Ən azı 1 rəqəm və xüsusi simvol</li>
        </ul>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Cari şifrə</label>
          <div className="relative">
            <input type={showCurrent ? "text" : "password"} value={form.current}
              onChange={(e) => setForm(f => ({ ...f, current: e.target.value }))}
              className="w-full h-10 px-4 pr-10 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <button type="button" onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Yeni şifrə</label>
          <div className="relative">
            <input type={showNew ? "text" : "password"} value={form.newPass}
              onChange={(e) => setForm(f => ({ ...f, newPass: e.target.value }))}
              className="w-full h-10 px-4 pr-10 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <button type="button" onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.newPass && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColors[strength] : "bg-secondary"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{strengthLabels[strength]}</p>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Yeni şifrəni təkrarla</label>
          <input type="password" value={form.confirm}
            onChange={(e) => setForm(f => ({ ...f, confirm: e.target.value }))}
            className={`w-full h-10 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring ${
              form.confirm && form.confirm !== form.newPass ? "border-destructive" : "border-input"
            }`} />
          {form.confirm && form.confirm !== form.newPass && (
            <p className="text-xs text-destructive mt-1">Şifrələr uyğun gəlmir</p>
          )}
        </div>
      </div>

      <button onClick={handleSave}
        className={`flex items-center justify-center gap-2 w-full h-11 font-semibold rounded-xl text-sm transition-all active:scale-[0.98] ${
          saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
        }`}>
        {saved ? <Check className="w-4 h-4" /> : <KeyRound className="w-4 h-4" />}
        {saved ? "Dəyişdirildi!" : "Şifrəni dəyişdir"}
      </button>
    </div>
  );
};

// ── Notifications Tab ──
const NotificationsTab = () => {
  const [notifs, setNotifs] = useState({
    emailNewListing: true, emailComplaint: true, emailNewUser: true, emailSystem: false,
    pushNewListing: true, pushComplaint: true, pushNewUser: false, pushSystem: true,
    dailyDigest: true, weeklyReport: true,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof notifs) => {
    setNotifs(n => ({ ...n, [key]: !n[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Bildiriş tənzimləmələri yadda saxlanıldı!");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-foreground">📧 E-poçt bildirişləri</h3>
        {([
          { key: "emailNewListing" as const, label: "Yeni elan", desc: "Yeni elan yerləşdirildikdə" },
          { key: "emailComplaint" as const, label: "Şikayət", desc: "Yeni şikayət daxil olduqda" },
          { key: "emailNewUser" as const, label: "Yeni istifadəçi", desc: "Yeni qeydiyyat olduqda" },
          { key: "emailSystem" as const, label: "Sistem xəbərləri", desc: "Sistem yenilikləri və xətalar" },
        ]).map(item => (
          <div key={item.key} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Toggle enabled={notifs[item.key]} onToggle={() => toggle(item.key)} />
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-foreground">🔔 Push bildirişləri</h3>
        {([
          { key: "pushNewListing" as const, label: "Yeni elan", desc: "Brauzerdə bildiriş göstər" },
          { key: "pushComplaint" as const, label: "Şikayət", desc: "Təcili şikayətlər üçün" },
          { key: "pushNewUser" as const, label: "Yeni istifadəçi", desc: "Qeydiyyat bildirişi" },
          { key: "pushSystem" as const, label: "Sistem", desc: "Sistem xəbərdarlıqları" },
        ]).map(item => (
          <div key={item.key} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Toggle enabled={notifs[item.key]} onToggle={() => toggle(item.key)} />
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-foreground">📊 Hesabatlar</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Gündəlik xülasə</p>
            <p className="text-xs text-muted-foreground">Hər gün saat 09:00-da</p>
          </div>
          <Toggle enabled={notifs.dailyDigest} onToggle={() => toggle("dailyDigest")} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Həftəlik hesabat</p>
            <p className="text-xs text-muted-foreground">Hər bazar ertəsi</p>
          </div>
          <Toggle enabled={notifs.weeklyReport} onToggle={() => toggle("weeklyReport")} />
        </div>
      </div>

      <button onClick={handleSave}
        className={`flex items-center justify-center gap-2 w-full h-11 font-semibold rounded-xl text-sm transition-all active:scale-[0.98] ${
          saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
        }`}>
        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? "Yadda saxlanıldı!" : "Bildiriş tənzimləmələrini yadda saxla"}
      </button>
    </div>
  );
};

// ── Platform Tab ──
const PlatformTab = () => {
  const [settings, setSettings] = useState({
    siteName: "UcuzTap",
    siteDescription: "Azərbaycanın ən böyük pulsuz elan platforması",
    contactEmail: "info@ucuztap.az",
    language: "az",
    autoApprove: true,
    imageLimit: 8,
    listingDuration: 30,
  });
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    setSettings(s => ({ ...s, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Platform parametrləri yadda saxlanıldı!");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Ümumi parametrlər</h3>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Sayt adı</label>
          <input value={settings.siteName} onChange={(e) => update("siteName", e.target.value)}
            className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Sayt təsviri</label>
          <textarea value={settings.siteDescription} onChange={(e) => update("siteDescription", e.target.value)} rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Əlaqə e-poçt</label>
            <input value={settings.contactEmail} onChange={(e) => update("contactEmail", e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Dil</label>
            <select value={settings.language} onChange={(e) => update("language", e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="az">Azərbaycan dili</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Elan parametrləri</h3>
        </div>
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
            <p className="text-xs text-muted-foreground">Hər elan üçün max şəkil</p>
          </div>
          <input type="number" value={settings.imageLimit} onChange={(e) => update("imageLimit", Number(e.target.value))}
            min={1} max={20}
            className="w-16 h-9 px-3 rounded-xl border border-input bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Elan müddəti (gün)</p>
            <p className="text-xs text-muted-foreground">Elanın aktiv qalma müddəti</p>
          </div>
          <input type="number" value={settings.listingDuration} onChange={(e) => update("listingDuration", Number(e.target.value))}
            min={1} max={365}
            className="w-16 h-9 px-3 rounded-xl border border-input bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <button onClick={handleSave}
        className={`flex items-center justify-center gap-2 w-full h-11 font-semibold rounded-xl text-sm transition-all active:scale-[0.98] ${
          saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
        }`}>
        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? "Yadda saxlanıldı!" : "Platform parametrlərini yadda saxla"}
      </button>
    </div>
  );
};

// ── Security Tab ──
const SecurityTab = () => {
  const [sec, setSec] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    ipWhitelist: "",
  });
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const sessions = [
    { device: "Chrome - Windows", ip: "192.168.1.1", time: "İndi aktiv", current: true },
    { device: "Safari - iPhone", ip: "10.0.0.5", time: "2 saat əvvəl", current: false },
    { device: "Firefox - MacOS", ip: "172.16.0.3", time: "Dünən", current: false },
  ];

  const handleSave = () => {
    setSaved(true);
    toast.success("Təhlükəsizlik tənzimləmələri yadda saxlanıldı!");
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogoutAll = () => {
    toast.success("Bütün sessiyalar bağlandı!");
  };

  const handleLogout = () => {
    toast.success("Hesabdan çıxış edildi!");
    navigate("/");
  };

  return (
    <div className="space-y-5">
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-foreground">🔐 Təhlükəsizlik parametrləri</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">İki addımlı doğrulama (2FA)</p>
            <p className="text-xs text-muted-foreground">Admin girişi üçün əlavə təsdiq</p>
          </div>
          <Toggle enabled={sec.twoFactorAuth} onToggle={() => setSec(s => ({ ...s, twoFactorAuth: !s.twoFactorAuth }))} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Giriş xəbərdarlıqları</p>
            <p className="text-xs text-muted-foreground">Yeni cihazdan girişdə e-poçt göndər</p>
          </div>
          <Toggle enabled={sec.loginAlerts} onToggle={() => setSec(s => ({ ...s, loginAlerts: !s.loginAlerts }))} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Sessiya müddəti (dəq)</p>
            <p className="text-xs text-muted-foreground">Hərəkətsizlik müddəti</p>
          </div>
          <input type="number" value={sec.sessionTimeout}
            onChange={(e) => setSec(s => ({ ...s, sessionTimeout: Number(e.target.value) }))}
            min={5} max={120}
            className="w-16 h-9 px-3 rounded-xl border border-input bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">📱 Aktiv sessiyalar</h3>
          <button onClick={handleLogoutAll} className="text-xs text-destructive hover:underline">
            Hamısını bağla
          </button>
        </div>
        {sessions.map((s, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <div>
              <p className="text-sm text-foreground">{s.device}</p>
              <p className="text-xs text-muted-foreground">{s.ip} · {s.time}</p>
            </div>
            {s.current ? (
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Cari</span>
            ) : (
              <button className="text-xs text-destructive hover:underline">Bağla</button>
            )}
          </div>
        ))}
      </div>

      <button onClick={handleSave}
        className={`flex items-center justify-center gap-2 w-full h-11 font-semibold rounded-xl text-sm transition-all active:scale-[0.98] ${
          saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
        }`}>
        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? "Yadda saxlanıldı!" : "Təhlükəsizlik parametrlərini yadda saxla"}
      </button>

      <button onClick={handleLogout}
        className="flex items-center justify-center gap-2 w-full h-11 font-semibold rounded-xl text-sm border border-destructive text-destructive hover:bg-destructive/10 transition-all active:scale-[0.98]">
        <LogOut className="w-4 h-4" />
        Hesabdan çıxış et
      </button>
    </div>
  );
};

// ── Main Settings Page ──
const AdminSettings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as TabId) || "profile";

  const setTab = (tab: TabId) => setSearchParams({ tab });

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Tənzimləmələr</h1>
        <p className="text-sm text-muted-foreground">Profil, şifrə, bildiriş və platform parametrləri</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/50 p-1 rounded-xl overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}>
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "password" && <PasswordTab />}
      {activeTab === "notifications" && <NotificationsTab />}
      {activeTab === "platform" && <PlatformTab />}
      {activeTab === "security" && <SecurityTab />}
    </div>
  );
};

export default AdminSettings;
