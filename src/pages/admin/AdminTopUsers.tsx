import { useState } from "react";
import { Crown, FileText, Star, Zap, ArrowUp, Eye, TrendingUp, Medal, User, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

type TabKey = "listings" | "premium" | "vip" | "bump" | "active";

const tabs: { key: TabKey; label: string; icon: typeof Crown; color: string }[] = [
  { key: "listings", label: "Ən çox elan", icon: FileText, color: "text-blue-500 bg-blue-500/10" },
  { key: "premium", label: "Ən çox Premium", icon: Crown, color: "text-amber-500 bg-amber-500/10" },
  { key: "vip", label: "Ən çox VIP", icon: Star, color: "text-violet-500 bg-violet-500/10" },
  { key: "bump", label: "Ən çox İrəli çək", icon: ArrowUp, color: "text-emerald-500 bg-emerald-500/10" },
  { key: "active", label: "Ən aktiv", icon: Zap, color: "text-rose-500 bg-rose-500/10" },
];

interface TopUser {
  id: number;
  name: string;
  avatar: string;
  city: string;
  joined: string;
  listings: number;
  premium: number;
  vip: number;
  bump: number;
  views: string;
  activity: number; // score
  totalSpent: string;
  lastActive: string;
}

const topUsers: TopUser[] = [
  { id: 1, name: "Əli Məmmədov", avatar: "ƏM", city: "Bakı", joined: "2022", listings: 342, premium: 86, vip: 42, bump: 128, views: "245K", activity: 98, totalSpent: "4,820 ₼", lastActive: "2 dəq əvvəl" },
  { id: 2, name: "Rəşad Kərimov", avatar: "RK", city: "Bakı", joined: "2021", listings: 287, premium: 124, vip: 67, bump: 95, views: "198K", activity: 95, totalSpent: "6,340 ₼", lastActive: "5 dəq əvvəl" },
  { id: 3, name: "Nigar Rəhimli", avatar: "NR", city: "Gəncə", joined: "2023", listings: 198, premium: 45, vip: 89, bump: 156, views: "156K", activity: 92, totalSpent: "3,210 ₼", lastActive: "12 dəq əvvəl" },
  { id: 4, name: "Tural Abbasov", avatar: "TA", city: "Sumqayıt", joined: "2022", listings: 176, premium: 98, vip: 34, bump: 87, views: "132K", activity: 88, totalSpent: "5,120 ₼", lastActive: "30 dəq əvvəl" },
  { id: 5, name: "Leyla Hüseynova", avatar: "LH", city: "Bakı", joined: "2023", listings: 156, premium: 67, vip: 56, bump: 112, views: "118K", activity: 85, totalSpent: "2,890 ₼", lastActive: "1 saat əvvəl" },
  { id: 6, name: "Kamran Vəliyev", avatar: "KV", city: "Bakı", joined: "2021", listings: 145, premium: 112, vip: 78, bump: 64, views: "167K", activity: 82, totalSpent: "7,450 ₼", lastActive: "2 saat əvvəl" },
  { id: 7, name: "Səbinə Muradova", avatar: "SM", city: "Lənkəran", joined: "2024", listings: 134, premium: 34, vip: 23, bump: 178, views: "89K", activity: 79, totalSpent: "1,560 ₼", lastActive: "3 saat əvvəl" },
  { id: 8, name: "Orxan İsmayılov", avatar: "Oİ", city: "Bakı", joined: "2022", listings: 128, premium: 78, vip: 45, bump: 92, views: "104K", activity: 76, totalSpent: "3,780 ₼", lastActive: "4 saat əvvəl" },
  { id: 9, name: "Günel Əliyeva", avatar: "GƏ", city: "Mingəçevir", joined: "2023", listings: 112, premium: 56, vip: 98, bump: 45, views: "95K", activity: 73, totalSpent: "4,120 ₼", lastActive: "5 saat əvvəl" },
  { id: 10, name: "Farid Nəsirov", avatar: "FN", city: "Bakı", joined: "2024", listings: 98, premium: 89, vip: 12, bump: 67, views: "72K", activity: 70, totalSpent: "2,340 ₼", lastActive: "6 saat əvvəl" },
  { id: 11, name: "Aygün Həsənova", avatar: "AH", city: "Şəki", joined: "2023", listings: 87, premium: 23, vip: 34, bump: 145, views: "68K", activity: 67, totalSpent: "1,230 ₼", lastActive: "8 saat əvvəl" },
  { id: 12, name: "Cavid Rzayev", avatar: "CR", city: "Bakı", joined: "2022", listings: 76, premium: 145, vip: 56, bump: 34, views: "112K", activity: 64, totalSpent: "8,900 ₼", lastActive: "10 saat əvvəl" },
  { id: 13, name: "Nərmin Quliyeva", avatar: "NQ", city: "Gəncə", joined: "2024", listings: 65, premium: 12, vip: 8, bump: 198, views: "45K", activity: 61, totalSpent: "890 ₼", lastActive: "12 saat əvvəl" },
  { id: 14, name: "Elçin Babayev", avatar: "EB", city: "Bakı", joined: "2021", listings: 234, premium: 67, vip: 112, bump: 56, views: "189K", activity: 58, totalSpent: "5,670 ₼", lastActive: "1 gün əvvəl" },
  { id: 15, name: "Zəhra Sadıqova", avatar: "ZS", city: "Sumqayıt", joined: "2023", listings: 54, premium: 34, vip: 23, bump: 87, views: "38K", activity: 55, totalSpent: "1,780 ₼", lastActive: "1 gün əvvəl" },
];

const sortByTab = (users: TopUser[], tab: TabKey): TopUser[] => {
  const sorted = [...users];
  switch (tab) {
    case "listings": return sorted.sort((a, b) => b.listings - a.listings);
    case "premium": return sorted.sort((a, b) => b.premium - a.premium);
    case "vip": return sorted.sort((a, b) => b.vip - a.vip);
    case "bump": return sorted.sort((a, b) => b.bump - a.bump);
    case "active": return sorted.sort((a, b) => b.activity - a.activity);
  }
};

const getValueByTab = (user: TopUser, tab: TabKey): string | number => {
  switch (tab) {
    case "listings": return user.listings;
    case "premium": return user.premium;
    case "vip": return user.vip;
    case "bump": return user.bump;
    case "active": return user.activity + " xal";
  }
};

const medalColors = ["text-amber-500", "text-gray-400", "text-orange-600"];

const AdminTopUsers = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("listings");
  const sorted = sortByTab(topUsers, activeTab);
  const currentTabConfig = tabs.find(t => t.key === activeTab)!;

  // Stats for the active tab
  const top3 = sorted.slice(0, 3);
  const totalByTab: Record<TabKey, number> = {
    listings: topUsers.reduce((a, u) => a + u.listings, 0),
    premium: topUsers.reduce((a, u) => a + u.premium, 0),
    vip: topUsers.reduce((a, u) => a + u.vip, 0),
    bump: topUsers.reduce((a, u) => a + u.bump, 0),
    active: topUsers.reduce((a, u) => a + u.activity, 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" /> Top İstifadəçilər
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Ən aktiv və ən çox xidmət istifadə edən istifadəçilər</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 ${
              activeTab === tab.key
                ? "bg-foreground text-background shadow-sm"
                : "bg-secondary text-foreground/70 hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Ümumi ({currentTabConfig.label})</p>
          <p className="text-2xl font-bold text-foreground mt-1">{totalByTab[activeTab].toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Top 1 istifadəçi</p>
          <p className="text-lg font-bold text-foreground mt-1">{top3[0]?.name}</p>
          <p className="text-xs text-primary font-semibold">{getValueByTab(top3[0], activeTab)}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Orta (istifadəçi başına)</p>
          <p className="text-2xl font-bold text-foreground mt-1">{Math.round(totalByTab[activeTab] / topUsers.length)}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Ümumi xərc (Top 15)</p>
          <p className="text-2xl font-bold text-foreground mt-1">60,150 ₼</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <Medal className="w-4 h-4 text-amber-500" /> Top 3
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[1, 0, 2].map((rank, idx) => {
            const user = top3[rank];
            if (!user) return null;
            return (
              <div key={user.id} className={`text-center ${idx === 1 ? "order-first sm:order-none" : ""}`}>
                <div className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-bold ${
                  rank === 0 ? "bg-amber-500/15 text-amber-600 ring-2 ring-amber-400" :
                  rank === 1 ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300" :
                  "bg-orange-500/15 text-orange-600"
                }`}>
                  {user.avatar}
                </div>
                <div className="mt-2">
                  <Medal className={`w-5 h-5 mx-auto ${medalColors[rank]}`} />
                  <p className="text-sm font-bold text-foreground mt-1 truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.city}</p>
                  <p className={`text-sm font-bold mt-1 ${currentTabConfig.color.split(" ")[0]}`}>
                    {getValueByTab(user, activeTab)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full ranking table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">Tam sıralama</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground w-10">#</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">İstifadəçi</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">Elanlar</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Premium</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden sm:table-cell">VIP</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden md:table-cell">İrəli çək</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden md:table-cell">Baxış</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Xərc</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Aktivlik</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground">Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((user, i) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    {i < 3 ? (
                      <Medal className={`w-5 h-5 ${medalColors[i]}`} />
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">{i + 1}</span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {user.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground">{user.city} · {user.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`text-sm font-bold ${activeTab === "listings" ? "text-primary" : "text-foreground"}`}>{user.listings}</span>
                  </td>
                  <td className="px-3 py-3 text-center hidden sm:table-cell">
                    <span className={`text-sm font-bold ${activeTab === "premium" ? "text-amber-500" : "text-foreground"}`}>{user.premium}</span>
                  </td>
                  <td className="px-3 py-3 text-center hidden sm:table-cell">
                    <span className={`text-sm font-bold ${activeTab === "vip" ? "text-violet-500" : "text-foreground"}`}>{user.vip}</span>
                  </td>
                  <td className="px-3 py-3 text-center hidden md:table-cell">
                    <span className={`text-sm font-bold ${activeTab === "bump" ? "text-emerald-500" : "text-foreground"}`}>{user.bump}</span>
                  </td>
                  <td className="px-3 py-3 text-center hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{user.views}</span>
                  </td>
                  <td className="px-3 py-3 text-center hidden lg:table-cell">
                    <span className="text-sm font-semibold text-foreground">{user.totalSpent}</span>
                  </td>
                  <td className="px-3 py-3 text-center hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${user.activity}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{user.activity}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/istifadeciler`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      <Eye className="w-3 h-3" /> Bax
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTopUsers;
