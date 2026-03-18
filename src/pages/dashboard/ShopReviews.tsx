import { useState } from "react";
import { Star, ThumbsUp, MessageCircle, User, Clock, Flag, Trash2, Check, X, Send, Filter, Search, MoreVertical, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type ReviewStatus = "published" | "hidden" | "flagged";

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  product: string;
  helpful: number;
  replied: boolean;
  reply?: string;
  status: ReviewStatus;
}

const initialReviews: Review[] = [
  { id: 1, author: "Məhəmməd H.", rating: 5, text: "Əla xidmət, məhsul orijinaldır. Çatdırılma da sürətli oldu. Tövsiyə edirəm!", date: "17.03.2026", product: "iPhone 15 Pro Max", helpful: 8, replied: true, reply: "Təşəkkür edirik, Məhəmməd! Sizə xidmət etməkdən məmnunuq.", status: "published" },
  { id: 2, author: "Leyla A.", rating: 4, text: "Keyfiyyətli məhsul, amma çatdırılma bir az gecikdi. Ümumi yaxşıdır.", date: "15.03.2026", product: "AirPods Pro 2nd Gen", helpful: 3, replied: false, status: "published" },
  { id: 3, author: "Tural M.", rating: 5, text: "MacBook Pro mükəmməl vəziyyətdə gəldi. Zəmanət kağızı da var. Çox razıyam!", date: "12.03.2026", product: "MacBook Pro M3", helpful: 12, replied: true, reply: "Rəyiniz üçün təşəkkür edirik! Yenidən gözləyirik.", status: "published" },
  { id: 4, author: "Nigar R.", rating: 3, text: "Məhsul yaxşıdır, amma qiyməti bir az yüksəkdir. Digər mağazalarda daha ucuzdur.", date: "10.03.2026", product: "Samsung Galaxy S24", helpful: 2, replied: false, status: "published" },
  { id: 5, author: "Rəşad İ.", rating: 5, text: "3-cü dəfədir buradan alıram. Həmişə keyfiyyətli xidmət!", date: "08.03.2026", product: "PlayStation 5 Slim", helpful: 6, replied: true, reply: "Sadiq müştərimiz olduğunuz üçün təşəkkür edirik!", status: "published" },
  { id: 6, author: "Vüsal Q.", rating: 1, text: "Fake məhsul satırlar, almayın!", date: "05.03.2026", product: "iPhone 15", helpful: 0, replied: false, status: "flagged" },
];

const statusConfig: Record<ReviewStatus, { cls: string; label: string }> = {
  published: { cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Yayımda" },
  hidden: { cls: "bg-muted text-muted-foreground", label: "Gizli" },
  flagged: { cls: "bg-destructive/10 text-destructive", label: "Şikayət" },
};

const ShopReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReviewStatus | "all">("all");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = reviews.filter((r) => {
    if (filterRating && r.rating !== filterRating) return false;
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    if (search && !r.author.toLowerCase().includes(search.toLowerCase()) && !r.text.toLowerCase().includes(search.toLowerCase()) && !r.product.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0";
  const totalReviews = reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return { stars: star, count, percent: totalReviews ? Math.round((count / totalReviews) * 100) : 0 };
  });

  const handleReply = (id: number) => {
    if (!replyText.trim()) return;
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, replied: true, reply: replyText } : r));
    setReplyingTo(null);
    setReplyText("");
    toast.success("Cavab göndərildi!");
  };

  const handleDeleteReply = (id: number) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, replied: false, reply: undefined } : r));
    toast.success("Cavab silindi");
  };

  const toggleVisibility = (id: number) => {
    setReviews((prev) => prev.map((r) => {
      if (r.id !== id) return r;
      const newStatus = r.status === "hidden" ? "published" : "hidden";
      return { ...r, status: newStatus };
    }));
    toast.success("Rəy statusu dəyişdirildi");
  };

  const handleDelete = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeleteConfirm(null);
    toast.success("Rəy silindi");
  };

  const dismissFlag = (id: number) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: "published" } : r));
    toast.success("Şikayət rədd edildi");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Rəylər və Reytinq</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Müştəri rəylərini idarə edin</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Rəy axtar..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-sm w-44 focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
      </div>

      {/* Rating overview */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col items-center justify-center sm:min-w-[140px]">
            <p className="text-5xl font-bold text-foreground">{avgRating}</p>
            <div className="flex gap-0.5 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "text-primary fill-primary" : "text-primary/40 fill-primary/40"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{totalReviews} rəy</p>
          </div>
          <div className="flex-1 space-y-2">
            {ratingCounts.map((r) => (
              <button key={r.stars} onClick={() => setFilterRating(filterRating === r.stars ? null : r.stars)}
                className={`flex items-center gap-2 w-full rounded-lg px-1 py-0.5 transition-colors ${filterRating === r.stars ? "bg-primary/10" : "hover:bg-secondary/50"}`}>
                <span className="text-xs text-muted-foreground w-4">{r.stars}</span>
                <Star className="w-3 h-3 text-primary fill-primary" />
                <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${r.percent}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{r.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex gap-1 bg-secondary/50 rounded-xl p-1 w-fit">
        {([
          { key: "all" as const, label: "Hamısı", count: reviews.length },
          { key: "published" as const, label: "Yayımda", count: reviews.filter((r) => r.status === "published").length },
          { key: "flagged" as const, label: "Şikayət", count: reviews.filter((r) => r.status === "flagged").length },
          { key: "hidden" as const, label: "Gizli", count: reviews.filter((r) => r.status === "hidden").length },
        ]).map((t) => (
          <button key={t.key} onClick={() => setFilterStatus(t.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterStatus === t.key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {t.label} <span className="text-muted-foreground ml-0.5">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <p className="text-muted-foreground text-sm">Rəy tapılmadı</p>
          </div>
        ) : (
          filtered.map((review) => (
            <div key={review.id} className={`bg-card rounded-2xl border p-5 shadow-card transition-all ${review.status === "flagged" ? "border-destructive/30" : review.status === "hidden" ? "border-border opacity-60" : "border-border"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground">{review.author}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${statusConfig[review.status].cls}`}>
                        {statusConfig[review.status].label}
                      </span>
                      {review.replied && (
                        <span className="text-[10px] font-medium bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded">Cavablandı</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">• {review.product}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[11px] text-muted-foreground mr-1 hidden sm:inline">{review.date}</span>
                  <button onClick={() => toggleVisibility(review.id)}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title={review.status === "hidden" ? "Göstər" : "Gizlət"}>
                    {review.status === "hidden" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  {deleteConfirm === review.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(review.id)}
                        className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteConfirm(null)}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(review.id)}
                      className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Sil">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{review.text}</p>

              {/* Existing reply */}
              {review.replied && review.reply && (
                <div className="mt-3 ml-6 p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-primary">Sizin cavabınız</p>
                    <button onClick={() => handleDeleteReply(review.id)}
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Sil
                    </button>
                  </div>
                  <p className="text-sm text-foreground/70">{review.reply}</p>
                </div>
              )}

              {/* Reply form */}
              {replyingTo === review.id && (
                <div className="mt-3 ml-6">
                  <div className="flex gap-2">
                    <input value={replyText} onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Cavabınızı yazın..."
                      className="flex-1 h-10 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      onKeyDown={(e) => e.key === "Enter" && handleReply(review.id)} />
                    <button onClick={() => handleReply(review.id)}
                      className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-95 transition-all flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5" /> Göndər
                    </button>
                    <button onClick={() => { setReplyingTo(null); setReplyText(""); }}
                      className="h-10 px-3 rounded-xl border border-input text-sm hover:bg-secondary transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" /> {review.helpful} faydalı
                  </span>
                  <span className="text-xs text-muted-foreground sm:hidden flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {review.date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {!review.replied && replyingTo !== review.id && (
                    <button onClick={() => { setReplyingTo(review.id); setReplyText(""); }}
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      <MessageCircle className="w-3 h-3" /> Cavabla
                    </button>
                  )}
                  {review.status === "flagged" && (
                    <button onClick={() => dismissFlag(review.id)}
                      className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:underline">
                      <Check className="w-3 h-3" /> Şikayəti rədd et
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary footer */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-muted-foreground">{filtered.length} rəy göstərilir</p>
        {filterRating && (
          <button onClick={() => setFilterRating(null)} className="text-xs text-primary hover:underline">
            Filtri sıfırla
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopReviews;
