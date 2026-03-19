import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("E-poçt və şifrə daxil edin");
      return;
    }
    // TODO: real auth ilə əvəz olunmalıdır
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center h-14 gap-4">
          <Link to="/" className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Sayta qayıt</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center">
              <Shield className="w-7 h-7 text-background" />
            </div>
            <div className="text-center">
              <span className="font-extrabold text-xl tracking-tight text-foreground block">UcuzTap Admin</span>
              <span className="text-xs text-muted-foreground">İdarəetmə paneli</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border p-7 shadow-card">
            <h1 className="text-lg font-bold text-foreground text-center mb-1">Admin girişi</h1>
            <p className="text-xs text-muted-foreground text-center mb-6">
              Davam etmək üçün admin hesabınıza daxil olun
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">E-poçt</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="admin@ucuztap.az"
                  className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Şifrə</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className="w-full h-11 px-4 pr-11 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-destructive font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full h-11 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 active:scale-[0.98] transition-all"
              >
                Daxil ol
              </button>
            </form>
          </div>

          <p className="text-center text-[11px] text-muted-foreground mt-6">
            Bu səhifə yalnız admin əməkdaşları üçündür.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
