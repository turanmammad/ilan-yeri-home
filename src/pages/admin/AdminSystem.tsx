import { useState } from "react";
import { Server, HardDrive, Cpu, MemoryStick, Wifi, Database, Clock, CheckCircle, AlertTriangle, XCircle, RefreshCw, Activity, Globe, Shield, Zap, Trash2, Archive, Image, FileText, Code, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const systemMetrics = [
  { label: "CPU istifadəsi", value: 34, max: 100, unit: "%", icon: Cpu, status: "good" as const },
  { label: "RAM istifadəsi", value: 6.2, max: 16, unit: "GB", icon: MemoryStick, status: "good" as const },
  { label: "Disk istifadəsi", value: 124, max: 500, unit: "GB", icon: HardDrive, status: "good" as const },
  { label: "Şəbəkə yükü", value: 72, max: 100, unit: "Mbps", icon: Wifi, status: "warning" as const },
];

const services = [
  { name: "Veb Server (Nginx)", status: "online", uptime: "45 gün 12 saat", response: "12ms" },
  { name: "API Server (Node.js)", status: "online", uptime: "45 gün 12 saat", response: "28ms" },
  { name: "PostgreSQL", status: "online", uptime: "45 gün 12 saat", response: "5ms" },
  { name: "Redis Cache", status: "online", uptime: "30 gün 8 saat", response: "1ms" },
  { name: "Elasticsearch", status: "warning", uptime: "12 gün 3 saat", response: "145ms" },
  { name: "Email Server (SMTP)", status: "online", uptime: "45 gün 12 saat", response: "320ms" },
  { name: "CDN (CloudFlare)", status: "online", uptime: "99.99%", response: "8ms" },
  { name: "AI Model API", status: "online", uptime: "20 gün 6 saat", response: "450ms" },
  { name: "Ödəniş Gateway", status: "offline", uptime: "Bağlıdır", response: "—" },
];

const statusConfig = {
  online: { label: "Aktiv", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  warning: { label: "Xəbərdarlıq", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
  offline: { label: "Offline", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
};

const recentEvents = [
  { time: "14:45", type: "info", message: "Avtomatik yedəkləmə tamamlandı" },
  { time: "13:20", type: "warning", message: "Elasticsearch cavab müddəti yüksəkdir (>100ms)" },
  { time: "12:00", type: "info", message: "SSL sertifikat yeniləndi" },
  { time: "10:15", type: "error", message: "Ödəniş gateway bağlantısı kəsildi" },
  { time: "09:30", type: "info", message: "Sistem yeniləməsi tətbiq edildi (v2.4.1)" },
  { time: "08:00", type: "info", message: "Günlük cron job icra edildi" },
];

const eventTypeStyle = {
  info: "bg-blue-500",
  warning: "bg-amber-500",
  error: "bg-destructive",
};

interface CacheItem {
  id: string;
  name: string;
  icon: typeof Database;
  size: string;
  items: number;
  lastCleared: string;
  description: string;
}

const initialCacheItems: CacheItem[] = [
  { id: "redis", name: "Redis Cache", icon: Database, size: "248 MB", items: 12450, lastCleared: "3 gün əvvəl", description: "API cavabları və sessiya məlumatları" },
  { id: "cdn", name: "CDN Cache", icon: Globe, size: "1.8 GB", items: 34200, lastCleared: "7 gün əvvəl", description: "Statik fayllar, şəkillər və CSS/JS" },
  { id: "images", name: "Şəkil Cache", icon: Image, size: "3.2 GB", items: 18900, lastCleared: "14 gün əvvəl", description: "Thumbnail və optimizasiya edilmiş şəkillər" },
  { id: "search", name: "Axtarış İndeksi", icon: FileText, size: "512 MB", items: 24580, lastCleared: "5 gün əvvəl", description: "Elasticsearch indeks cache" },
  { id: "views", name: "Baxış Sayğacı", icon: Activity, size: "64 MB", items: 156000, lastCleared: "1 gün əvvəl", description: "Elan və mağaza baxış statistikası" },
  { id: "templates", name: "Şablon Cache", icon: Code, size: "32 MB", items: 890, lastCleared: "10 gün əvvəl", description: "Server-side render şablonları" },
  { id: "sessions", name: "Sessiya Cache", icon: Shield, size: "128 MB", items: 8432, lastCleared: "Bu gün", description: "İstifadəçi sessiya məlumatları" },
  { id: "api", name: "API Response Cache", icon: Zap, size: "96 MB", items: 5670, lastCleared: "2 gün əvvəl", description: "Xarici API cavab cache-ləri" },
];

const CacheManager = () => {
  const [cacheItems, setCacheItems] = useState(initialCacheItems);
  const [clearingId, setClearingId] = useState<string | null>(null);
  const [clearingAll, setClearingAll] = useState(false);

  const totalSize = "6.1 GB";
  const totalItems = cacheItems.reduce((a, c) => a + c.items, 0);

  const clearSingle = (id: string) => {
    setClearingId(id);
    setTimeout(() => {
      setCacheItems(prev => prev.map(c => c.id === id ? { ...c, size: "0 MB", items: 0, lastCleared: "İndi" } : c));
      setClearingId(null);
      const item = cacheItems.find(c => c.id === id);
      toast.success(`${item?.name} uğurla təmizləndi!`);
    }, 1500);
  };

  const clearAll = () => {
    setClearingAll(true);
    setTimeout(() => {
      setCacheItems(prev => prev.map(c => ({ ...c, size: "0 MB", items: 0, lastCleared: "İndi" })));
      setClearingAll(false);
      toast.success("Bütün cache uğurla təmizləndi!");
    }, 2500);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Archive className="w-4 h-4 text-primary" /> Cache İdarəetməsi
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Ümumi: {totalSize} · {totalItems.toLocaleString()} element</p>
          </div>
          <Button variant="destructive" size="sm" className="gap-2" onClick={clearAll} disabled={clearingAll}>
            {clearingAll ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            {clearingAll ? "Təmizlənir..." : "Hamısını təmizlə"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {cacheItems.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/10 shrink-0">
                  <c.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{c.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-foreground">{c.size}</p>
                  <p className="text-[10px] text-muted-foreground">{c.items.toLocaleString()} element</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-[10px] text-muted-foreground">Son təmizləmə</p>
                  <p className="text-xs text-foreground">{c.lastCleared}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => clearSingle(c.id)}
                  disabled={clearingId === c.id || c.items === 0}
                >
                  {clearingId === c.id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Trash2 className="w-3 h-3" />
                  )}
                  {clearingId === c.id ? "..." : "Təmizlə"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const AdminSystem = () => {
  const onlineCount = services.filter((s) => s.status === "online").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Server className="w-6 h-6 text-primary" /> Sistem vəziyyəti
          </h1>
          <p className="text-sm text-muted-foreground">Server resursları, servis statusu və cache idarəetməsi</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {onlineCount}/{services.length} servis aktiv
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Yenilə
          </Button>
        </div>
      </div>

      {/* Resource meters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((m) => {
          const pct = (m.value / m.max) * 100;
          return (
            <Card key={m.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-primary">
                    <m.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold ${pct > 80 ? "text-destructive" : pct > 60 ? "text-amber-500" : "text-emerald-500"}`}>
                    {m.value}{m.unit}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1.5">{m.label}</p>
                <Progress value={pct} className="h-2" />
                <p className="text-[10px] text-muted-foreground mt-1 text-right">{m.value} / {m.max} {m.unit}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cache Manager */}
      <CacheManager />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Servislər
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {services.map((s) => {
                const cfg = statusConfig[s.status as keyof typeof statusConfig];
                return (
                  <div key={s.name} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.bg}`}>
                        <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{s.name}</p>
                        <p className="text-[10px] text-muted-foreground">{s.uptime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground hidden sm:block">{s.response}</span>
                      <Badge variant={s.status === "online" ? "default" : s.status === "warning" ? "secondary" : "destructive"} className="text-[10px]">
                        {cfg.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Events log */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Son hadisələr
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentEvents.map((e, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <div className="mt-1.5">
                    <span className={`block w-2 h-2 rounded-full ${eventTypeStyle[e.type as keyof typeof eventTypeStyle]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{e.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Globe className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Domain</p>
              <p className="text-sm font-semibold text-foreground">ucuztap.az</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-xs text-muted-foreground">SSL</p>
              <p className="text-sm font-semibold text-foreground">Aktiv (Let's Encrypt)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Database className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">DB versiya</p>
              <p className="text-sm font-semibold text-foreground">PostgreSQL 16</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-xs text-muted-foreground">Versiya</p>
              <p className="text-sm font-semibold text-foreground">v2.4.1</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSystem;
