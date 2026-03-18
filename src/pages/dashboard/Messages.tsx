import { Search, Check, CheckCheck } from "lucide-react";
import { useState } from "react";

const conversations = [
  { id: 1, name: "Əhməd Məmmədov", lastMsg: "Salam, elan hələ aktivdir?", time: "10 dəq", unread: 2, avatar: "Ə", listing: "iPhone 15 Pro Max" },
  { id: 2, name: "Leyla Həsənova", lastMsg: "Qiyməti aşağı sala bilərsiniz?", time: "1 saat", unread: 0, avatar: "L", listing: "Samsung Galaxy S24" },
  { id: 3, name: "Rəşad Quliyev", lastMsg: "Barter olar?", time: "3 saat", unread: 1, avatar: "R", listing: "MacBook Air M2" },
  { id: 4, name: "Nigar Əliyeva", lastMsg: "Çatdırılma var?", time: "Dünən", unread: 0, avatar: "N", listing: "AirPods Pro" },
  { id: 5, name: "Kamran İsmayılov", lastMsg: "Razılaşdıq, sabah gələrəm", time: "2 gün", unread: 0, avatar: "K", listing: "PlayStation 5" },
];

const chatMessages = [
  { id: 1, from: "other", text: "Salam, iPhone 15 Pro Max elanı hələ aktivdir?", time: "14:20" },
  { id: 2, from: "me", text: "Salam, bəli aktivdir", time: "14:22" },
  { id: 3, from: "other", text: "Qiyməti son qiymətdir? Bir az aşağı olar?", time: "14:23" },
  { id: 4, from: "me", text: "2,000 ₼-ya razılaşa bilərik", time: "14:25" },
  { id: 5, from: "other", text: "Yaxşı, harada görüşə bilərik?", time: "14:30" },
];

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  const activeConversation = conversations.find((c) => c.id === activeChat);

  return (
    <div className="space-y-0">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Mesajlar</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{conversations.length} söhbət</p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden flex" style={{ height: "calc(100vh - 200px)", minHeight: 400 }}>
        {/* Conversation list */}
        <div className="w-80 border-r border-border flex flex-col shrink-0 hidden sm:flex">
          <div className="p-3 border-b border-border">
            <div className="flex items-center bg-secondary rounded-xl px-3 h-9 gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Axtar..." className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full" />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv.id)}
                className={`w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-secondary/50 transition-colors border-b border-border/50 ${
                  activeChat === conv.id ? "bg-primary/5" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{conv.avatar}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground truncate">{conv.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMsg}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{conv.listing}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {activeConversation && (
            <>
              <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{activeConversation.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{activeConversation.name}</p>
                  <p className="text-[10px] text-muted-foreground">{activeConversation.listing}</p>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.from === "me"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    }`}>
                      <p>{msg.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                        <span className="text-[10px]">{msg.time}</span>
                        {msg.from === "me" && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-border">
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Mesaj yazın..."
                    className="flex-1 h-10 px-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  />
                  <button type="submit" className="h-10 px-5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:brightness-95 active:scale-95 transition-all">
                    Göndər
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
