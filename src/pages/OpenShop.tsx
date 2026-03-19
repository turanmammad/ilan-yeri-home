import { useState } from "react";
import { Link } from "react-router-dom";
import { Store, ShieldCheck, Megaphone, Users, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  "Elektronika",
  "Nəqliyyat",
  "Ev və bağ",
  "Geyim",
  "Uşaq aləmi",
  "Digər",
];

const OpenShop = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="container py-8 sm:py-10 flex-1">
        <section className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Mağaza açın</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
            UcuzTap-da mağaza yaradın, elanlarınızı bir yerdə idarə edin və daha çox alıcıya çatın.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <section className="lg:col-span-1 bg-card border border-border rounded-2xl p-5 sm:p-6 h-fit">
            <h2 className="text-sm font-semibold text-foreground mb-4">Nə əldə edəcəksiniz</h2>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2.5">
                <Store className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Brendiniz üçün ayrıca mağaza vitrini
              </li>
              <li className="flex items-start gap-2.5">
                <Megaphone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                VIP/Premium tanıtım imkanları
              </li>
              <li className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Müştərilərdən mesaj və sifariş axını
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Daha etibarlı satıcı görüntüsü
              </li>
            </ul>
          </section>

          <section className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 sm:p-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Mağaza adı</label>
                    <input
                      required
                      type="text"
                      placeholder="Məs: TechStore Bakı"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Kateqoriya</label>
                    <select
                      required
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      defaultValue=""
                    >
                      <option value="" disabled>Kateqoriya seçin</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Ad, soyad</label>
                    <input
                      required
                      type="text"
                      placeholder="Məs: Əli Məmmədov"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
                    <input
                      required
                      type="tel"
                      placeholder="50 123 45 67"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt</label>
                    <input
                      required
                      type="email"
                      placeholder="magaza@email.com"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Şəhər</label>
                    <input
                      required
                      type="text"
                      placeholder="Bakı"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Mağaza haqqında qısa məlumat</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Satdığınız məhsullar və xidmət haqqında qısa məlumat yazın..."
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto h-11 px-6 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all"
                >
                  Müraciət göndər
                </button>
              </form>
            ) : (
              <div className="py-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Müraciətiniz qəbul olundu</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Komandamız sizinlə qısa müddətdə əlaqə saxlayacaq və mağaza açılışını tamamlayacaq.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="h-10 px-4 rounded-xl border border-input bg-background text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    Yenidən doldur
                  </button>
                  <Link
                    to="/magazalar"
                    className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center hover:brightness-95"
                  >
                    Mağazalara bax
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OpenShop;
