import { useState } from "react";
import { Megaphone, Plus, Eye, Pause, Play, Trash2, TrendingUp, MousePointerClick, Users, DollarSign, ArrowUpRight, BarChart3, Calendar, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const stats = [
  { label: "Aktiv kampaniyalar", value: "12", icon: Megaphone, color: "text-primary" },
  { label: "Ümumi göstərimə", value: "248K", icon: Eye, color: "text-blue-500" },
  { label: "Klik sayı", value: "18.2K", icon: MousePointerClick, color: "text-emerald-500" },
  { label: "Reklam gəliri", value: "₼8,340", icon: DollarSign, color: "text-amber-500" },
];

const campaigns = [
  { id: 1, name: "Yaz endirimi - Banner", advertiser: "TechZone MMC", type: "Banner", status: "active", impressions: 45200, clicks: 3200, ctr: "7.1%", budget: "₼2,000", spent: "₼1,340", progress: 67, startDate: "01.03.2026", endDate: "31.03.2026" },
  { id: 2, name: "Premium elan paketi", advertiser: "UcuzTap (Daxili)", type: "Daxili", status: "active", impressions: 128000, clicks: 8400, ctr: "6.6%", budget: "₼500", spent: "₼380", progress: 76, startDate: "10.03.2026", endDate: "10.04.2026" },
  { id: 3, name: "Novruz kampaniyası", advertiser: "AzərSüd", type: "Banner", status: "paused", impressions: 32000, clicks: 1800, ctr: "5.6%", budget: "₼3,000", spent: "₼1,200", progress: 40, startDate: "15.03.2026", endDate: "25.03.2026" },
  { id: 4, name: "Mağaza açılış reklamı", advertiser: "Digital Store", type: "Sponsorlu", status: "active", impressions: 18500, clicks: 1100, ctr: "5.9%", budget: "₼800", spent: "₼520", progress: 65, startDate: "12.03.2026", endDate: "12.04.2026" },
  { id: 5, name: "Elektronika həftəsi", advertiser: "MegaElectro", type: "Banner", status: "completed", impressions: 95000, clicks: 7200, ctr: "7.6%", budget: "₼1,500", spent: "₼1,500", progress: 100, startDate: "01.02.2026", endDate: "28.02.2026" },
  { id: 6, name: "VIP elan tanıtımı", advertiser: "UcuzTap (Daxili)", type: "Daxili", status: "draft", impressions: 0, clicks: 0, ctr: "0%", budget: "₼1,000", spent: "₼0", progress: 0, startDate: "20.03.2026", endDate: "20.04.2026" },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Aktiv", variant: "default" },
  paused: { label: "Dayandırılıb", variant: "secondary" },
  completed: { label: "Tamamlanıb", variant: "outline" },
  draft: { label: "Qaralama", variant: "secondary" },
};

const AdminCampaigns = () => {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.advertiser.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchSearch;
    return matchSearch && c.status === tab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reklam & Kampaniyalar</h1>
          <p className="text-sm text-muted-foreground">Reklam kampaniyalarını idarə edin və analiz edin</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Yeni kampaniya
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-secondary ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">Kampaniyalar</CardTitle>
            <Input placeholder="Kampaniya axtar..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-48 sm:w-56" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="px-4">
              <TabsList className="h-9">
                <TabsTrigger value="all" className="text-xs">Hamısı ({campaigns.length})</TabsTrigger>
                <TabsTrigger value="active" className="text-xs">Aktiv</TabsTrigger>
                <TabsTrigger value="paused" className="text-xs">Dayandırılıb</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs">Tamamlanıb</TabsTrigger>
                <TabsTrigger value="draft" className="text-xs">Qaralama</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={tab} className="mt-0">
              <div className="divide-y divide-border">
                {filtered.map((c) => (
                  <div key={c.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm text-foreground truncate">{c.name}</h3>
                          <Badge variant={statusConfig[c.status].variant} className="text-[10px] shrink-0">
                            {statusConfig[c.status].label}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] shrink-0">{c.type}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Target className="w-3 h-3" />{c.advertiser}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{c.startDate} — {c.endDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {c.status === "active" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Dayandır">
                            <Pause className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        {c.status === "paused" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Davam et">
                            <Play className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <BarChart3 className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Göstərimə</p>
                        <p className="text-sm font-semibold text-foreground">{c.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Kliklər</p>
                        <p className="text-sm font-semibold text-foreground">{c.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">CTR</p>
                        <p className="text-sm font-semibold text-foreground">{c.ctr}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Büdcə</p>
                        <p className="text-sm font-semibold text-foreground">{c.spent} / {c.budget}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-[10px] text-muted-foreground mb-1">İstifadə</p>
                        <Progress value={c.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCampaigns;
