import { MessageCircle, Eye, Star, Clock, Bell, Check, Phone } from "lucide-react";

const notifications = [
  { id: 1, text: "iPhone 15 Pro Max elanınıza yeni mesaj gəldi", time: "15 dəq əvvəl", icon: MessageCircle, read: false },
  { id: 2, text: "Samsung Galaxy elanınız bu gün 50 dəfə baxıldı", time: "1 saat əvvəl", icon: Eye, read: false },
  { id: 3, text: "MacBook Air elanınız uğurla təsdiqləndi", time: "3 saat əvvəl", icon: Star, read: false },
  { id: 4, text: "AirPods Pro elanınızın müddəti 3 gün sonra bitəcək", time: "5 saat əvvəl", icon: Clock, read: true },
  { id: 5, text: "Yeni zəng gəldi: iPhone 15 Pro Max", time: "1 gün əvvəl", icon: Phone, read: true },
  { id: 6, text: "PlayStation 5 elanınıza yeni mesaj", time: "1 gün əvvəl", icon: MessageCircle, read: true },
  { id: 7, text: "Hesabınız uğurla təsdiqləndi", time: "2 gün əvvəl", icon: Check, read: true },
  { id: 8, text: "VIP paketiniz aktivləşdirildi", time: "3 gün əvvəl", icon: Star, read: true },
  { id: 9, text: "Yeni kampaniya: 50% endirimli VIP paket", time: "1 həftə əvvəl", icon: Bell, read: true },
];

const Notifications = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-foreground">Bildirişlər</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{notifications.filter((n) => !n.read).length} oxunmamış</p>
      </div>
      <button className="text-sm font-medium text-primary hover:underline">
        Hamısını oxunmuş et
      </button>
    </div>

    <div className="bg-card rounded-2xl border border-border shadow-card divide-y divide-border overflow-hidden">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`flex items-start gap-3 px-5 py-4 transition-colors hover:bg-secondary/40 ${
            !notif.read ? "bg-primary/5" : ""
          }`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
            !notif.read ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
          }`}>
            <notif.icon className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className={`text-sm leading-snug ${!notif.read ? "text-foreground font-medium" : "text-foreground/80"}`}>
              {notif.text}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
          </div>
          {!notif.read && (
            <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Notifications;
