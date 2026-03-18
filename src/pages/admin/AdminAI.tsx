import { useState } from "react";
import { Bot, Sparkles, Zap, ImageIcon, FileText, MessageSquare, ToggleLeft, RefreshCw, Settings2, Activity, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const aiModules = [
  {
    id: "content-mod",
    name: "Məzmun moderasiyası",
    description: "Elanları avtomatik yoxla: spam, uyğunsuz məzmun, dublikat",
    icon: FileText,
    enabled: true,
    accuracy: 94,
    processed: 12840,
    blocked: 342,
    model: "GPT-4o",
  },
  {
    id: "image-mod",
    name: "Şəkil analizi",
    description: "Elan şəkillərini AI ilə yoxla: keyfiyyət, uyğunluq, watermark",
    icon: ImageIcon,
    enabled: true,
    accuracy: 91,
    processed: 28400,
    blocked: 1205,
    model: "Vision AI",
  },
  {
    id: "chat-bot",
    name: "AI Dəstək chatbot",
    description: "İstifadəçi suallarına avtomatik cavab verən chatbot",
    icon: MessageSquare,
    enabled: false,
    accuracy: 87,
    processed: 5200,
    blocked: 0,
    model: "GPT-4o-mini",
  },
  {
    id: "price-ai",
    name: "Qiymət analizi",
    description: "Bazara uyğun qiymət təklifi və anomaliya aşkarlama",
    icon: TrendingUp,
    enabled: true,
    accuracy: 89,
    processed: 9600,
    blocked: 180,
    model: "Custom ML",
  },
  {
    id: "ad-gen",
    name: "Reklam AI generatoru",
    description: "Reklam banner və mətnlərini AI ilə avtomatik yarat",
    icon: Sparkles,
    enabled: false,
    accuracy: 82,
    processed: 450,
    blocked: 0,
    model: "DALL-E 3 + GPT-4o",
  },
];

const recentLogs = [
  { time: "14:32", module: "Məzmun mod.", action: "Spam elan blok edildi", status: "blocked", detail: "#ELN-28492" },
  { time: "14:28", module: "Şəkil analizi", action: "Keyfiyyətsiz şəkil rədd edildi", status: "blocked", detail: "#IMG-9213" },
  { time: "14:25", module: "Qiymət AI", action: "Anomal qiymət aşkarlandı", status: "warning", detail: "₼1 — iPhone 15" },
  { time: "14:20", module: "Məzmun mod.", action: "Elan təsdiqləndi", status: "approved", detail: "#ELN-28491" },
  { time: "14:18", module: "Reklam AI", action: "Banner yaradıldı", status: "approved", detail: "Kampaniya #12" },
  { time: "14:15", module: "Şəkil analizi", action: "Watermark aşkarlandı", status: "warning", detail: "#IMG-9210" },
  { time: "14:10", module: "Chatbot", action: "Sual cavablandırıldı", status: "approved", detail: "Çatdırılma haqqında" },
];

const statusIcon: Record<string, JSX.Element> = {
  blocked: <XCircle className="w-3.5 h-3.5 text-destructive" />,
  approved: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
  warning: <Clock className="w-3.5 h-3.5 text-amber-500" />,
};

const AdminAI = () => {
  const [modules, setModules] = useState(aiModules);

  const toggleModule = (id: string) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" /> AI Düzəltmələr
          </h1>
          <p className="text-sm text-muted-foreground">AI modullarını idarə edin və performansı izləyin</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 text-xs">
            <Activity className="w-3 h-3 text-emerald-500" /> Sistem aktiv
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Yenilə
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">56,490</p>
            <p className="text-xs text-muted-foreground">Ümumi işlənmiş</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-500">91.2%</p>
            <p className="text-xs text-muted-foreground">Orta dəqiqlik</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">1,727</p>
            <p className="text-xs text-muted-foreground">Blok edilmiş</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">3/5</p>
            <p className="text-xs text-muted-foreground">Aktiv modul</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules">
        <TabsList>
          <TabsTrigger value="modules">Modullar</TabsTrigger>
          <TabsTrigger value="logs">Son əməliyyatlar</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4 mt-4">
          {modules.map((m) => (
            <Card key={m.id} className={!m.enabled ? "opacity-60" : ""}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-secondary shrink-0 ${m.enabled ? "text-primary" : "text-muted-foreground"}`}>
                      <m.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-foreground">{m.name}</h3>
                        <Badge variant="outline" className="text-[10px]">{m.model}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div>
                          <p className="text-[10px] text-muted-foreground">Dəqiqlik</p>
                          <div className="flex items-center gap-2">
                            <Progress value={m.accuracy} className="h-1.5 w-20" />
                            <span className="text-xs font-semibold text-foreground">{m.accuracy}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">İşlənmiş</p>
                          <p className="text-xs font-semibold text-foreground">{m.processed.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">Blok</p>
                          <p className="text-xs font-semibold text-destructive">{m.blocked}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings2 className="w-4 h-4" />
                    </Button>
                    <Switch checked={m.enabled} onCheckedChange={() => toggleModule(m.id)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentLogs.map((log, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                    {statusIcon[log.status]}
                    <span className="text-xs text-muted-foreground w-10 shrink-0">{log.time}</span>
                    <Badge variant="outline" className="text-[10px] shrink-0">{log.module}</Badge>
                    <span className="text-sm text-foreground flex-1 truncate">{log.action}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{log.detail}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAI;
