import { useState, useMemo } from "react";
import { Search, Filter, Eye, Ban, Mail, Clock, ShieldAlert, UserCheck, Edit } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { UserDetailDialog } from "@/components/admin/UserDetailDialog";
import { UserEditDialog, EditableUser } from "@/components/admin/UserEditDialog";
import { toast } from "sonner";

type UserStatus = "active" | "blocked" | "suspended";

interface UserItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  listings: number;
  status: UserStatus;
  joined: string;
  avatar: string;
}

const initialUsers: UserItem[] = [
  { id: 1, name: "Əli Məmmədov", email: "ali@mail.az", phone: "+994 50 123 45 67", listings: 12, status: "active", joined: "15.01.2025", avatar: "ƏM" },
  { id: 2, name: "Leyla Hüseynova", email: "leyla@mail.az", phone: "+994 55 234 56 78", listings: 8, status: "active", joined: "22.02.2025", avatar: "LH" },
  { id: 3, name: "Rəşad Kərimov", email: "reshad@mail.az", phone: "+994 70 345 67 89", listings: 45, status: "active", joined: "03.06.2024", avatar: "RK" },
  { id: 4, name: "Nigar Rəhimli", email: "nigar@mail.az", phone: "+994 51 456 78 90", listings: 3, status: "blocked", joined: "10.11.2025", avatar: "NR" },
  { id: 5, name: "Tural Abbasov", email: "tural@mail.az", phone: "+994 77 567 89 01", listings: 21, status: "active", joined: "28.08.2024", avatar: "TA" },
  { id: 6, name: "Kamran Vəliyev", email: "kamran@mail.az", phone: "+994 50 678 90 12", listings: 0, status: "suspended", joined: "05.03.2026", avatar: "KV" },
  { id: 7, name: "Səbinə Muradova", email: "sabina@mail.az", phone: "+994 55 789 01 23", listings: 7, status: "active", joined: "12.04.2025", avatar: "SM" },
  { id: 8, name: "Fərid Əliyev", email: "ferid@mail.az", phone: "+994 70 890 12 34", listings: 15, status: "blocked", joined: "01.07.2024", avatar: "FƏ" },
];

const statusConfig: Record<UserStatus, { cls: string; label: string }> = {
  active: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Aktiv" },
  blocked: { cls: "bg-destructive/10 text-destructive", label: "Bloklanıb" },
  suspended: { cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Dayandırılıb" },
};

const statusBadge = (s: UserStatus) => {
  const { cls, label } = statusConfig[s];
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${cls}`}>{label}</span>;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | UserStatus>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: "block" | "suspend" | "activate"; id: number; name: string } | null>(null);
  const [detailUser, setDetailUser] = useState<UserItem | null>(null);
  const [editUser, setEditUser] = useState<EditableUser | null>(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesTab = activeTab === "all" || u.status === activeTab;
      const matchesSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [users, search, activeTab]);

  const counts = useMemo(() => ({
    all: users.length,
    active: users.filter((u) => u.status === "active").length,
    blocked: users.filter((u) => u.status === "blocked").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  }), [users]);

  const changeStatus = (id: number, newStatus: UserStatus) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: newStatus } : u));
    const labels: Record<UserStatus, string> = { active: "Aktiv", blocked: "Bloklanıb", suspended: "Dayandırılıb" };
    toast.success(`İstifadəçi statusu "${labels[newStatus]}" olaraq dəyişdirildi`);
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    const statusMap = { block: "blocked" as const, suspend: "suspended" as const, activate: "active" as const };
    changeStatus(confirmAction.id, statusMap[confirmAction.type]);
    setConfirmAction(null);
  };

  const tabs: { key: "all" | UserStatus; label: string }[] = [
    { key: "all", label: "Hamısı" },
    { key: "active", label: "Aktiv" },
    { key: "blocked", label: "Bloklanıb" },
    { key: "suspended", label: "Dayandırılıb" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">İstifadəçilər</h1>
          <p className="text-sm text-muted-foreground">Bütün istifadəçiləri idarə edin</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="İstifadəçi axtar..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`h-9 px-3 rounded-xl border border-input text-sm font-medium transition-colors flex items-center gap-1.5 ${showFilters ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"}`}>
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>
      </div>

      <div className="flex gap-1 bg-secondary/50 rounded-xl p-1 w-fit">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === t.key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {t.label} <span className="text-muted-foreground ml-1">({counts[t.key]})</span>
          </button>
        ))}
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
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-muted-foreground text-sm">Nəticə tapılmadı</td></tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => setDetailUser(u)}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">{u.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{u.name}</p>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1 md:hidden">{u.email}</p>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{u.joined}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground hidden md:table-cell">{u.email}</td>
                    <td className="px-3 py-3 text-xs text-muted-foreground hidden lg:table-cell">{u.phone}</td>
                    <td className="px-3 py-3 text-center text-sm font-semibold text-foreground hidden sm:table-cell">{u.listings}</td>
                    <td className="px-3 py-3 text-center">{statusBadge(u.status)}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        {u.status !== "active" && (
                          <button onClick={() => changeStatus(u.id, "active")} className="p-1.5 rounded-lg hover:bg-emerald-500/10 transition-colors text-muted-foreground hover:text-emerald-600" title="Aktiv et">
                            <UserCheck className="w-4 h-4" />
                          </button>
                        )}
                        {u.status !== "blocked" && (
                          <button onClick={() => setConfirmAction({ type: "block", id: u.id, name: u.name })} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Blokla">
                            <Ban className="w-4 h-4" />
                          </button>
                        )}
                        {u.status !== "suspended" && (
                          <button onClick={() => setConfirmAction({ type: "suspend", id: u.id, name: u.name })} className="p-1.5 rounded-lg hover:bg-amber-500/10 transition-colors text-muted-foreground hover:text-amber-500" title="Dayandır">
                            <ShieldAlert className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => setEditUser({ id: u.id, name: u.name, email: u.email, phone: u.phone })} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Redaktə et">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDetailUser(u)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Profil"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Mesaj"><Mail className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">{filtered.length} istifadəçi göstərilir</p>
        </div>
      </div>

      <UserDetailDialog user={detailUser} open={!!detailUser} onOpenChange={(open) => !open && setDetailUser(null)} />

      <UserEditDialog
        user={editUser}
        open={!!editUser}
        onOpenChange={(open) => !open && setEditUser(null)}
        onSave={(updated) => {
          setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, name: updated.name, email: updated.email, phone: updated.phone } : u));
        }}
      />

      <ConfirmDialog
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title={
          confirmAction?.type === "block" ? "İstifadəçini bloklamaq istəyirsiniz?" :
          confirmAction?.type === "suspend" ? "İstifadəçini dayandırmaq istəyirsiniz?" :
          "İstifadəçini aktiv etmək istəyirsiniz?"
        }
        description={`"${confirmAction?.name}" ${
          confirmAction?.type === "block" ? "adlı istifadəçi bloklanacaq və platformaya daxil ola bilməyəcək." :
          confirmAction?.type === "suspend" ? "adlı istifadəçinin hesabı müvəqqəti dayandırılacaq." :
          "adlı istifadəçinin hesabı yenidən aktiv ediləcək."
        }`}
        confirmLabel={confirmAction?.type === "block" ? "Blokla" : confirmAction?.type === "suspend" ? "Dayandır" : "Aktiv et"}
        variant={confirmAction?.type === "block" ? "destructive" : confirmAction?.type === "suspend" ? "warning" : "default"}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default AdminUsers;
