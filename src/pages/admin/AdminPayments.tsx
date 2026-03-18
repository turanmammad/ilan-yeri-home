import { useState } from "react";
import { CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Receipt, Clock, CheckCircle, XCircle, Eye, MoreHorizontal, Download, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const stats = [
  { label: "Aylıq gəlir", value: "₼12,450", change: "+18.2%", up: true, icon: DollarSign, color: "text-emerald-500" },
  { label: "Uğurlu ödənişlər", value: "342", change: "+12.5%", up: true, icon: CheckCircle, color: "text-primary" },
  { label: "Gözləyən ödənişlər", value: "18", change: "-5.3%", up: false, icon: Clock, color: "text-amber-500" },
  { label: "Ləğv edilən", value: "7", change: "+2.1%", up: true, icon: XCircle, color: "text-destructive" },
];

const transactions = [
  { id: "TXN-001", user: "Əli Həsənov", type: "VIP Elan", amount: "₼25.00", status: "success", date: "18.03.2026", method: "Visa •••• 4242" },
  { id: "TXN-002", user: "Leyla Məmmədova", type: "Premium Paket", amount: "₼49.00", status: "success", date: "18.03.2026", method: "Mastercard •••• 8831" },
  { id: "TXN-003", user: "Rəşad Əliyev", type: "İrəli çəkmə", amount: "₼5.00", status: "pending", date: "17.03.2026", method: "Visa •••• 1234" },
  { id: "TXN-004", user: "Nigar Quliyeva", type: "Mağaza açılış", amount: "₼99.00", status: "success", date: "17.03.2026", method: "Visa •••• 5678" },
  { id: "TXN-005", user: "Tural Babayev", type: "VIP Elan", amount: "₼25.00", status: "failed", date: "16.03.2026", method: "Mastercard •••• 9012" },
  { id: "TXN-006", user: "Günel Hüseynova", type: "Premium Paket", amount: "₼49.00", status: "refunded", date: "16.03.2026", method: "Visa •••• 3456" },
  { id: "TXN-007", user: "Kamran Nəsibov", type: "İrəli çəkmə", amount: "₼5.00", status: "success", date: "15.03.2026", method: "Visa •••• 7890" },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  success: { label: "Uğurlu", variant: "default" },
  pending: { label: "Gözləyir", variant: "secondary" },
  failed: { label: "Uğursuz", variant: "destructive" },
  refunded: { label: "Geri qaytarılıb", variant: "outline" },
};

const AdminPayments = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = transactions.filter((t) => {
    const matchSearch = t.user.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchSearch;
    return matchSearch && t.status === tab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ödənişlər</h1>
          <p className="text-sm text-muted-foreground">Bütün ödəniş əməliyyatlarını idarə edin</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" /> Hesabat yüklə
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
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-emerald-500" : "text-destructive"}`}>
                  {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {s.change}
                </span>
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
            <CardTitle className="text-base">Əməliyyatlar</CardTitle>
            <div className="flex items-center gap-2">
              <Input placeholder="Axtar..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-48" />
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-36">
                  <SelectValue placeholder="Növ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Bütün növlər</SelectItem>
                  <SelectItem value="vip">VIP Elan</SelectItem>
                  <SelectItem value="premium">Premium Paket</SelectItem>
                  <SelectItem value="boost">İrəli çəkmə</SelectItem>
                  <SelectItem value="shop">Mağaza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="px-4">
              <TabsList className="h-9">
                <TabsTrigger value="all" className="text-xs">Hamısı</TabsTrigger>
                <TabsTrigger value="success" className="text-xs">Uğurlu</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs">Gözləyən</TabsTrigger>
                <TabsTrigger value="failed" className="text-xs">Uğursuz</TabsTrigger>
                <TabsTrigger value="refunded" className="text-xs">Qaytarılıb</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={tab} className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>İstifadəçi</TableHead>
                    <TableHead className="hidden sm:table-cell">Növ</TableHead>
                    <TableHead>Məbləğ</TableHead>
                    <TableHead className="hidden md:table-cell">Metod</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Tarix</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{t.id}</TableCell>
                      <TableCell className="font-medium text-sm">{t.user}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{t.type}</TableCell>
                      <TableCell className="font-semibold text-sm">{t.amount}</TableCell>
                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{t.method}</TableCell>
                      <TableCell>
                        <Badge variant={statusMap[t.status].variant} className="text-[10px]">
                          {statusMap[t.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{t.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
