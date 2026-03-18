import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="container py-10 flex-1 max-w-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Əlaqə</h1>
      <p className="text-sm text-muted-foreground mb-8">Bizimlə əlaqə saxlayın</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Phone, label: "+994 12 345 67 89", desc: "Telefon" },
          { icon: Mail, label: "info@ucuztap.az", desc: "E-poçt" },
          { icon: MapPin, label: "Bakı, Azərbaycan", desc: "Ünvan" },
        ].map((c) => (
          <div key={c.desc} className="bg-card rounded-2xl border border-border p-5 text-center shadow-card">
            <c.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">{c.desc}</p>
            <p className="text-sm font-medium text-foreground mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <form className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Ad</label>
          <input type="text" placeholder="Adınız" className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt</label>
          <input type="email" placeholder="email@nümunə.com" className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Mesaj</label>
          <textarea rows={4} placeholder="Mesajınız..." className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none" />
        </div>
        <button type="submit" className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Send className="w-4 h-4" /> Göndər
        </button>
      </form>
    </main>
    <Footer />
  </div>
);

export default Contact;
