import { Search, Filter, Eye, Ban, Mail, MoreHorizontal, Shield, Clock } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Əli Məmmədov", email: "ali@mail.az", phone: "+994 50 123 45 67", listings: 12, status: "active", joined: "15.01.2025", avatar: "ƏM" },
  { id: 2, name: "Leyla Hüseynova", email: "leyla@mail.az", phone: "+994 55 234 56 78", listings: 8, status: "active", joined: "22.02.2025", avatar: "LH" },
  { id: 3, name: "Rəşad Kərimov", email: "reshad@mail.az", phone: "+994 70 345 67 89", listings: 45, status: "active", joined: "03.06.2024", avatar: "RK" },
  { id: 4, name: "Nigar Rəhimli", email: "nigar@mail.az", phone: "+994 51 456 78 90", listings: 3, status: "blocked", joined: "10.11.2025", avatar: "NR" },
  { id: 5, name: "Tural Abbasov", email: "tural@mail.az", phone: "+994 77 567 89 01", listings: 21, status: "active", joined: "28.08.2024", avatar: "TA" },
  { id: 6, name: "Kamran Vəliyev", email: "kamran@mail.az", phone: "+994 50 678 90 12", listings: 0, status: "suspended", joined: "05.03.2026", avatar: "KV" },
];

const statusBadge = (s: string) => {
  const map: Record<string, { cls: string; label: string }> = {
    active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
    blocked: { cls: "bg-destructive/10 text-destructive", label: "Bloklanıb" },
    suspended: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Dayandırılıb" },
  };
  const { cls, label } = map[s] || map.active;
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${cls}`}>{label}</span>;
};

const AdminUsers = () => (
  <div className="space-y-5">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-foreground">İstifadəçilər</h1>
        <p className="text-sm text-muted-foreground">Bütün istifadəçiləri idarə edin</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="İstifadəçi axtar..." className="h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="h-9 px-3 rounded-xl border border-input bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" /> Filter
        </button>
      </div>
    </div>

    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">İstifadəçi</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">E-poçt</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Telefon</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Elanlar</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((u) => (
              <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{u.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{u.name}</p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 md:hidden">
                        {u.email}
                      </p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />{u.joined}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground hidden md:table-cell">{u.email}</td>
                <td className="px-3 py-3 text-xs text-muted-foreground hidden lg:table-cell">{u.phone}</td>
                <td className="px-3 py-3 text-center text-sm font-semibold text-foreground hidden sm:table-cell">{u.listings}</td>
                <td className="px-3 py-3 text-center">{statusBadge(u.status)}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Profil"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Mesaj"><Mail className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Blokla"><Ban className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">1-6 / 8,432 istifadəçi</p>
        <div className="flex gap-1">
          {[1, 2, 3, "...", 1406].map((p, i) => (
            <button key={i} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminUsers;
