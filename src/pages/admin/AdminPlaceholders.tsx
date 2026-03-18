const AdminPlaceholder = ({ title, description }: { title: string; description: string }) => (
  <div className="space-y-5">
    <div>
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="bg-card rounded-2xl border border-border p-12 shadow-sm flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🚧</span>
        </div>
        <p className="text-sm font-medium text-foreground mb-1">Tezliklə</p>
        <p className="text-xs text-muted-foreground max-w-xs">
          Bu bölmə backend qoşulduqdan sonra tam funksional olacaq
        </p>
      </div>
    </div>
  </div>
);

export const AdminShops = () => <AdminPlaceholder title="Mağazalar" description="Mağazaları idarə edin" />;
export const AdminReports = () => <AdminPlaceholder title="Şikayətlər" description="İstifadəçi şikayətlərini nəzərdən keçirin" />;
export const AdminMessages = () => <AdminPlaceholder title="Mesajlar" description="Sistem mesajlarını idarə edin" />;
export const AdminBlocklist = () => <AdminPlaceholder title="Blok siyahısı" description="Bloklanmış istifadəçilər və IP-lər" />;
export const AdminAnalytics = () => <AdminPlaceholder title="Analitika" description="Platform statistikaları və hesabatlar" />;
