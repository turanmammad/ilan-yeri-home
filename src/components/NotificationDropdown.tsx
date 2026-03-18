import { useState, useRef, useEffect } from "react";
import { Bell, Check, MessageCircle, Heart, ShoppingBag, AlertTriangle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const mockNotifications = [
  {
    id: 1,
    type: "message",
    title: "Yeni mesaj",
    body: "Əli sizin elanınıza mesaj göndərdi",
    time: "2 dəq əvvəl",
    read: false,
    icon: MessageCircle,
    color: "text-blue-500 bg-blue-500/10",
    link: "/hesab/mesajlar",
  },
  {
    id: 2,
    type: "favorite",
    title: "Seçilmişlərə əlavə edildi",
    body: "iPhone 15 Pro elanınız 5 nəfər tərəfindən seçilmişlərə əlavə edildi",
    time: "1 saat əvvəl",
    read: false,
    icon: Heart,
    color: "text-destructive bg-destructive/10",
    link: "/hesab/elanlarim",
  },
  {
    id: 3,
    type: "sale",
    title: "Elanınız VIP oldu",
    body: "MacBook Air elanınız VIP statusu aldı",
    time: "3 saat əvvəl",
    read: true,
    icon: ShoppingBag,
    color: "text-amber-500 bg-amber-500/10",
    link: "/hesab/elanlarim",
  },
  {
    id: 4,
    type: "system",
    title: "Hesab təhlükəsizliyi",
    body: "Yeni cihazdan giriş aşkar edildi",
    time: "1 gün əvvəl",
    read: true,
    icon: AlertTriangle,
    color: "text-orange-500 bg-orange-500/10",
    link: "/hesab/tenzimleme",
  },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 sm:p-2.5 rounded-xl text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors relative"
        title="Bildirişlər"
      >
        <Bell className="w-5 h-5" strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-[340px] sm:w-[380px] bg-card rounded-2xl border border-border shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-sm font-bold text-foreground">Bildirişlər</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Hamısını oxu
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.map((n) => (
                <Link
                  key={n.id}
                  to={n.link}
                  onClick={() => {
                    setNotifications((prev) =>
                      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
                    );
                    setOpen(false);
                  }}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-0 ${
                    !n.read ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                    <n.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${!n.read ? "font-semibold text-foreground" : "font-medium text-foreground/80"}`}>
                        {n.title}
                      </p>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.body}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-2">
              <Link
                to="/hesab/bildirisler"
                onClick={() => setOpen(false)}
                className="block text-center text-xs font-semibold text-primary hover:underline py-2 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                Bütün bildirişlərə bax
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
