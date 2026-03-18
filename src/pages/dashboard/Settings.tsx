import { useState, useRef } from "react";
import { User, Mail, Phone, MapPin, Camera, Save, Check, X, Upload, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Toggle = ({ enabled, onToggle, label, desc }: { enabled: boolean; onToggle: () => void; label: string; desc: string }) => (
  <label className="flex items-center justify-between cursor-pointer">
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
    <button onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition-colors ${enabled ? "bg-primary" : "bg-secondary"}`}>
      <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow-sm transition-transform ${
        enabled ? "right-0.5 bg-primary-foreground" : "left-0.5 bg-card border border-border"
      }`} />
    </button>
  </label>
);

const Settings = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("+994 50 123 45 67");
  const [showPhone, setShowPhone] = useState(true);
  const [saved, setSaved] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  const [notifs, setNotifs] = useState({
    newMessage: true,
    viewStats: true,
    priceChange: true,
    campaigns: false,
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Fayl 5MB-dan böyük ola bilməz!"); return; }
    if (!file.type.startsWith("image/")) { toast.error("Yalnız şəkil faylları!"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Tənzimləmələr yadda saxlanıldı!");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
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
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-primary" />
              )}
            </div>
            <button onClick={() => avatarRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm hover:brightness-95 transition-all">
              <Camera className="w-4 h-4" />
            </button>
            {avatar && (
              <button onClick={() => setAvatar(null)}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center">
                <X className="w-3 h-3" />
              </button>
            )}
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">Əli Həsənov</p>
            <p className="text-sm text-muted-foreground">Üzv: Mart 2026-dan</p>
            <button onClick={() => avatarRef.current?.click()} className="mt-1 text-xs font-medium text-primary hover:underline flex items-center gap-1">
              <Upload className="w-3 h-3" /> Şəkil yüklə
            </button>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Ad</label>
              <input type="text" defaultValue="Əli"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Soyad</label>
              <input type="text" defaultValue="Həsənov"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="email" defaultValue="ali@email.com"
                className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="tel" defaultValue="+994 50 123 45 67"
                className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Şəhər</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" defaultValue="Bakı"
                className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
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

      {/* WhatsApp Settings */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <h3 className="font-bold text-foreground">WhatsApp tənzimləmələri</h3>
        </div>

        <Toggle
          enabled={whatsappEnabled}
          onToggle={() => setWhatsappEnabled(!whatsappEnabled)}
          label="WhatsApp-ı aktiv et"
          desc="Elanlarınızda WhatsApp düyməsi görünsün"
        />

        {whatsappEnabled && (
          <div className="space-y-3 pl-0 pt-2 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">WhatsApp nömrəsi</label>
              <div className="relative">
                <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <input type="tel" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+994 XX XXX XX XX"
                  className="w-full h-11 px-4 pl-10 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Beynəlxalq format: +994XXXXXXXXX</p>
            </div>

            <Toggle
              enabled={showPhone}
              onToggle={() => setShowPhone(!showPhone)}
              label="Telefon nömrəsini göstər"
              desc="Elanda telefon nömrəniz görünsün"
            />

            {/* WhatsApp preview */}
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-xs font-medium text-foreground mb-2">Elanda belə görünəcək:</p>
              <div className="flex gap-2">
                <button className="flex-1 h-9 rounded-lg bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </button>
                {showPhone && (
                  <button className="flex-1 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Zəng et
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <button onClick={handleSave}
          className={`flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98] ${
            saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:brightness-95"
          }`}>
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Yadda saxlanıldı!" : "Yadda saxla"}
        </button>
      </div>

      {/* Password */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <h3 className="font-bold text-foreground mb-5">Şifrəni dəyiş</h3>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Hazırkı şifrə</label>
            <input type="password" placeholder="••••••••"
              className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Yeni şifrə</label>
              <input type="password" placeholder="Ən az 6 simvol"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Yeni şifrə (təkrar)</label>
              <input type="password" placeholder="••••••••"
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <button type="submit"
            className="flex items-center gap-2 border border-input bg-card text-foreground font-medium px-6 py-2.5 rounded-xl text-sm hover:bg-secondary transition-colors">
            Şifrəni yenilə
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
        <h3 className="font-bold text-foreground mb-3">Bildiriş tənzimləmələri</h3>
        <Toggle enabled={notifs.newMessage} onToggle={() => setNotifs(n => ({ ...n, newMessage: !n.newMessage }))}
          label="Yeni mesaj bildirişi" desc="Elanlarınıza gələn mesajlar haqqında" />
        <Toggle enabled={notifs.viewStats} onToggle={() => setNotifs(n => ({ ...n, viewStats: !n.viewStats }))}
          label="Elan baxış statistikası" desc="Elanınız müəyyən sayda baxıldığında" />
        <Toggle enabled={notifs.priceChange} onToggle={() => setNotifs(n => ({ ...n, priceChange: !n.priceChange }))}
          label="Qiymət dəyişikliyi" desc="Seçilmiş elanlarda qiymət dəyişdikdə" />
        <Toggle enabled={notifs.campaigns} onToggle={() => setNotifs(n => ({ ...n, campaigns: !n.campaigns }))}
          label="Kampaniya və yeniliklər" desc="Endirimli paketlər və yeniliklər" />
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
};

export default Settings;
