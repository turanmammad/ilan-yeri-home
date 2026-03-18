import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Info, Users, Award, Mail, MapPin, Phone } from "lucide-react";

const About = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="container py-10 flex-1 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Haqqımızda</h1>
      <p className="text-sm text-foreground/80 leading-relaxed mb-6">
        UcuzTap — Azərbaycanın ən böyük pulsuz elan platformasıdır. 2024-cü ildən fəaliyyət göstərən platformamız
        istifadəçilərə asanlıqla elan yerləşdirmək, alış-veriş etmək və xidmətlər tapmaq imkanı yaradır.
      </p>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Users, label: "500K+", desc: "İstifadəçi" },
          { icon: Info, label: "1M+", desc: "Aktiv elan" },
          { icon: Award, label: "#1", desc: "Elan platforması" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-5 text-center shadow-card">
            <s.icon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
