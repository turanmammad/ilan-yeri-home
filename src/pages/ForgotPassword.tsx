import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center h-14 gap-4">
          <Link to="/giris" className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Geri</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="font-extrabold text-primary-foreground text-lg">U</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-foreground">UcuzTap</span>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
            {!sent ? (
              <>
                <h1 className="text-2xl font-bold text-foreground text-center mb-1">Şifrəni sıfırla</h1>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Hesabınıza bağlı e-poçt və ya telefon nömrənizi daxil edin
                </p>

                {/* Tabs */}
                <div className="flex bg-secondary rounded-xl p-1 mb-6">
                  <button
                    onClick={() => setTab("email")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      tab === "email"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    E-poçt
                  </button>
                  <button
                    onClick={() => setTab("phone")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      tab === "phone"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Telefon
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  {tab === "email" ? (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt ünvanı</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nümunə@email.com"
                        className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                        required
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Telefon nömrəsi</label>
                      <div className="flex gap-2">
                        <div className="h-11 px-3 rounded-xl border border-input bg-secondary flex items-center text-sm font-medium text-foreground shrink-0">
                          +994
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="50 123 45 67"
                          className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-[0.98] transition-all"
                  >
                    Sıfırlama linki göndər
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Link göndərildi!</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {tab === "email"
                    ? `Şifrə sıfırlama linki ${email || "e-poçt ünvanınıza"} göndərildi. Zəhmət olmasa poçtunuzu yoxlayın.`
                    : `SMS kodunuz ${phone ? `+994 ${phone}` : "telefon nömrənizə"} göndərildi.`}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Yenidən göndər
                </button>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Şifrənizi xatırlayırsınız?{" "}
            <Link to="/giris" className="font-semibold text-primary hover:underline">
              Daxil ol
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
