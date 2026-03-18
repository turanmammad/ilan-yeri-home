import { Zap, Eye, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: Zap, value: "5x", label: "Daha sürətli satış" },
  { icon: Eye, value: "10x", label: "Daha çox baxış" },
  { icon: TrendingUp, value: "Top", label: "Axtarışda birinci" },
];

const PromoBanner = () => (
  <section className="container py-10">
    <div className="bg-foreground rounded-3xl px-8 sm:px-12 py-10 sm:py-14 text-card">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        Elanınızı daha çox insana çatdırın
      </h2>
      <p className="text-card/60 text-sm sm:text-base mb-8 max-w-lg">
        VIP və Premium paketləri ilə elanınız axtarış nəticələrində ön sıralarda göstərilir
      </p>

      <div className="flex flex-wrap gap-8 mb-8">
        {stats.map((stat) => (
          <div key={stat.value} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-primary" strokeWidth={2} />
            </div>
            <div>
              <span className="text-xl font-bold">{stat.value}</span>
              <p className="text-card/60 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:brightness-95 active:scale-95 transition-all">
        Paketlərə bax
      </button>
    </div>
  </section>
);

export default PromoBanner;
