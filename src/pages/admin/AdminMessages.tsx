import { Search, Send, Inbox, Archive, Star, Clock, Paperclip, MoreHorizontal, ChevronRight } from "lucide-react";
import { useState } from "react";

const mockConversations = [
  { id: 1, user: "Əli Məmmədov", avatar: "ƏM", subject: "Elanım niyə silinib?", preview: "Salam, #4521 nömrəli elanım səbəbsiz silinib. Zəhmət olmasa yoxlayın...", date: "14:23", unread: true, priority: false },
  { id: 2, user: "Leyla Hüseynova", avatar: "LH", subject: "Mağaza açmaq istəyirəm", preview: "Xoş gün, mağaza açmaq üçün hansı sənədlər tələb olunur? Qiymətlər haqqında...", date: "11:45", unread: true, priority: true },
  { id: 3, user: "Rəşad Kərimov", avatar: "RK", subject: "Premium elan haqqında", preview: "Premium elanın qiyməti nə qədərdir? Neçə gün aktiv qalır?", date: "Dünən", unread: false, priority: false },
  { id: 4, user: "Nigar Rəhimli", avatar: "NR", subject: "Hesabım bloklanıb", preview: "Hesabım səhvən bloklanıb. ID: 8923. Zəhmət olmasa araşdırın...", date: "Dünən", unread: false, priority: true },
  { id: 5, user: "Tural Abbasov", avatar: "TA", subject: "Reklam əməkdaşlığı", preview: "Salam komanda, reklam əməkdaşlığı haqqında danışmaq istəyirik...", date: "15.03", unread: false, priority: false },
  { id: 6, user: "Kamran Vəliyev", avatar: "KV", subject: "Ödəniş problemi", preview: "Premium elan üçün ödəniş etdim amma aktivləşmədi. Çek əlavə edirəm.", date: "14.03", unread: false, priority: false },
];

const selectedMessage = {
  user: "Leyla Hüseynova",
  avatar: "LH",
  subject: "Mağaza açmaq istəyirəm",
  messages: [
    { from: "user", text: "Xoş gün, mağaza açmaq üçün hansı sənədlər tələb olunur? Qiymətlər haqqında məlumat verə bilərsiniz?", time: "11:45" },
    { from: "admin", text: "Salam Leyla xanım! Mağaza açmaq üçün VÖEN və şəxsiyyət vəsiqəsinin surəti tələb olunur. Aylıq ödəniş 29 AZN-dən başlayır.", time: "12:10" },
    { from: "user", text: "Təşəkkür edirəm. VÖEN olmadan da mümkündür? Fərdi sahibkarlıq sənədim var.", time: "12:22" },
  ],
};

const AdminMessages = () => {
  const [selected, setSelected] = useState<number | null>(2);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Mesajlar</h1>
        <p className="text-sm text-muted-foreground">İstifadəçi mesajlarını idarə edin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Oxunmamış", value: "12", icon: Inbox, color: "text-blue-500 bg-blue-500/10" },
          { label: "Bu gün cavab", value: "8", icon: Send, color: "text-emerald-500 bg-emerald-500/10" },
          { label: "Vacib", value: "3", icon: Star, color: "text-amber-500 bg-amber-500/10" },
          { label: "Ort. cavab müddəti", value: "25 dəq", icon: Clock, color: "text-violet-500 bg-violet-500/10" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.color}`}><s.icon className="w-3.5 h-3.5" /></div>
            </div>
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chat interface */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex" style={{ minHeight: 480 }}>
        {/* Conversation list */}
        <div className={`${selected !== null ? "hidden sm:block" : ""} w-full sm:w-80 border-r border-border shrink-0`}>
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Mesaj axtar..." className="w-full h-9 pl-9 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {mockConversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`w-full text-left px-4 py-3.5 hover:bg-secondary/50 transition-colors ${selected === c.id ? "bg-primary/5" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{c.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm truncate ${c.unread ? "font-bold text-foreground" : "font-medium text-foreground/80"}`}>{c.user}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{c.date}</span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${c.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>{c.subject}</p>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{c.preview}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-1">
                    {c.unread && <div className="w-2 h-2 rounded-full bg-primary" />}
                    {c.priority && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message detail */}
        <div className="flex-1 flex flex-col">
          {selected !== null ? (
            <>
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelected(null)} className="sm:hidden p-1 rounded-lg hover:bg-secondary"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{selectedMessage.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{selectedMessage.user}</p>
                    <p className="text-xs text-muted-foreground">{selectedMessage.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"><Star className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"><Archive className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {selectedMessage.messages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      m.from === "admin"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    }`}>
                      <p className="text-sm">{m.text}</p>
                      <p className={`text-[10px] mt-1 ${m.from === "admin" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border p-3 sm:p-4">
                <div className="flex items-end gap-2">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground shrink-0"><Paperclip className="w-4 h-4" /></button>
                  <textarea rows={1} placeholder="Mesaj yazın..." className="flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring min-h-[40px] max-h-[120px]" />
                  <button className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:brightness-95 transition-all shrink-0"><Send className="w-4 h-4" /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-8">
                <Inbox className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Mesaj seçin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
