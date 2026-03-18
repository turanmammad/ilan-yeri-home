import { Search, Filter, Ban, Unlock, Globe, User, Clock, Shield, AlertTriangle } from "lucide-react";

const mockBlocked = [
  { id: 1, type: "user", target: "SpamBot99", reason: "Toplu spam mesaj göndərmə", blockedBy: "Sistem (avtomatik)", date: "18.03.2026, 14:00", expires: "Həmişəlik" },
  { id: 2, type: "user", target: "FakeUser123", reason: "Saxta elan yerləşdirmə (3+ dəfə)", blockedBy: "Admin", date: "17.03.2026, 16:30", expires: "30 gün" },
  { id: 3, type: "ip", target: "185.23.xx.xx", reason: "DDoS hücumu cəhdi", blockedBy: "Firewall", date: "16.03.2026, 03:15", expires: "Həmişəlik" },
  { id: 4, type: "user", target: "ScamSeller_AZ", reason: "Dələduzluq — ödəniş alıb məhsul göndərməmə", blockedBy: "Admin", date: "15.03.2026, 11:20", expires: "Həmişəlik" },
  { id: 5, type: "ip", target: "92.45.xx.xx", reason: "Brute-force giriş cəhdi", blockedBy: "Firewall", date: "14.03.2026, 22:40", expires: "7 gün" },
  { id: 6, type: "user", target: "HateSpeech_User", reason: "Təhqiramiz məzmun paylaşma", blockedBy: "Admin", date: "13.03.2026, 09:10", expires: "90 gün" },
];

const typeBadge = (t: string) => {
  if (t === "user") return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center gap-1"><User className="w-3 h-3" />İstifadəçi</span>;
  return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center gap-1"><Globe className="w-3 h-3" />IP</span>;
};

const AdminBlocklist = () => (
  <div className="space-y-5">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-foreground">Blok siyahısı</h1>
        <p className="text-sm text-muted-foreground">Bloklanmış istifadəçilər və IP ünvanları</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Axtar..." className="h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="h-9 px-3 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors flex items-center gap-1.5">
          <Ban className="w-3.5 h-3.5" /> Yeni blok
        </button>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Bloklanmış istifadəçilər", value: "156", icon: User, color: "text-destructive bg-destructive/10" },
        { label: "Bloklanmış IP-lər", value: "42", icon: Globe, color: "text-violet-500 bg-violet-500/10" },
        { label: "Bu ay əlavə edilən", value: "23", icon: Shield, color: "text-amber-500 bg-amber-500/10" },
        { label: "Avtomatik blok", value: "67", icon: AlertTriangle, color: "text-blue-500 bg-blue-500/10" },
      ].map((s) => (
        <div key={s.label} className="bg-card rounded-xl border border-border p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.color}`}><s.icon className="w-3.5 h-3.5" /></div>
          </div>
          <p className="text-lg font-bold text-foreground">{s.value}</p>
          <p className="text-[11px] text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>

    {/* List */}
    <div className="space-y-3">
      {mockBlocked.map((b) => (
        <div key={b.id} className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                {typeBadge(b.type)}
                <span className="text-sm font-bold text-foreground">{b.target}</span>
              </div>
              <p className="text-sm text-foreground/80 mb-2">{b.reason}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" />{b.blockedBy}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.date}</span>
                <span className={`font-semibold ${b.expires === "Həmişəlik" ? "text-destructive" : "text-amber-600 dark:text-amber-400"}`}>
                  Müddət: {b.expires}
                </span>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-emerald-500/10 transition-colors text-muted-foreground hover:text-emerald-600 shrink-0" title="Bloku aç">
              <Unlock className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminBlocklist;
