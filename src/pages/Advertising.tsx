import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, Eye, Zap, Star, Check } from "lucide-react";

const plans = [
  {
    name: "Standart",
    price: "Pulsuz",
    features: ["1 elan yerləşdir", "30 gün müddət", "Əsas statistika"],
    highlight: false,
  },
  {
    name: "VIP",
    price: "5 ₼",
    features: ["Axtarışda üstdə göstərilir", "VIP nişanı", "60 gün müddət", "Ətraflı statistika"],
    highlight: true,
  },
  {
    name: "Premium",
    price: "15 ₼",
    features: ["Ən üst sırada göstərilir", "Premium nişanı", "90 gün müddət", "Tam statistika", "Sosial mediada paylaşım"],
    highlight: false,
  },
];

const Advertising = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="container py-10 flex-1">
      <div className="text-center mb-10 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Reklam & Paketlər</h1>
        <p className="text-sm text-muted-foreground">Elanınızı daha çox insana çatdırın</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-card rounded-2xl border p-6 shadow-card relative ${
              plan.highlight ? "border-primary ring-2 ring-primary/20" : "border-border"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                Populyar
              </span>
            )}
            <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
            <p className="text-3xl font-extrabold text-foreground mb-5">{plan.price}</p>
            <ul className="space-y-2.5 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-primary shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full h-11 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                plan.highlight
                  ? "bg-primary text-primary-foreground hover:brightness-95"
                  : "border border-input bg-card text-foreground hover:bg-secondary"
              }`}
            >
              Seç
            </button>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {[
          { icon: Zap, value: "5x", label: "Daha sürətli satış" },
          { icon: Eye, value: "10x", label: "Daha çox baxış" },
          { icon: TrendingUp, value: "Top", label: "Axtarışda birinci" },
        ].map((s) => (
          <div key={s.value} className="bg-card rounded-2xl border border-border p-5 text-center shadow-card">
            <s.icon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Advertising;
