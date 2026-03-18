import { Star, ThumbsUp, MessageCircle, User, Clock, Flag } from "lucide-react";

const reviews = [
  { id: 1, author: "Məhəmməd H.", rating: 5, text: "Əla xidmət, məhsul orijinaldır. Çatdırılma da sürətli oldu. Tövsiyə edirəm!", date: "17.03.2026", product: "iPhone 15 Pro Max", helpful: 8, replied: true },
  { id: 2, author: "Leyla A.", rating: 4, text: "Keyfiyyətli məhsul, amma çatdırılma bir az gecikdi. Ümumi yaxşıdır.", date: "15.03.2026", product: "AirPods Pro 2nd Gen", helpful: 3, replied: false },
  { id: 3, author: "Tural M.", rating: 5, text: "MacBook Pro mükəmməl vəziyyətdə gəldi. Zəmanət kağızı da var. Çox razıyam!", date: "12.03.2026", product: "MacBook Pro M3", helpful: 12, replied: true },
  { id: 4, author: "Nigar R.", rating: 3, text: "Məhsul yaxşıdır, amma qiyməti bir az yüksəkdir. Digər mağazalarda daha ucuzdur.", date: "10.03.2026", product: "Samsung Galaxy S24", helpful: 2, replied: false },
  { id: 5, author: "Rəşad İ.", rating: 5, text: "3-cü dəfədir buradan alıram. Həmişə keyfiyyətli xidmət!", date: "08.03.2026", product: "PlayStation 5 Slim", helpful: 6, replied: true },
];

const ratingDistribution = [
  { stars: 5, count: 98, percent: 63 },
  { stars: 4, count: 34, percent: 22 },
  { stars: 3, count: 15, percent: 10 },
  { stars: 2, count: 5, percent: 3 },
  { stars: 1, count: 4, percent: 2 },
];

const ShopReviews = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-foreground">Rəylər</h2>
      <p className="text-sm text-muted-foreground mt-0.5">Müştəri rəyləri və reytinqlər</p>
    </div>

    {/* Rating overview */}
    <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Overall rating */}
        <div className="flex flex-col items-center justify-center sm:min-w-[140px]">
          <p className="text-5xl font-bold text-foreground">4.8</p>
          <div className="flex gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-primary fill-primary" : "text-primary/40 fill-primary/40"}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-1">156 rəy</p>
        </div>

        {/* Distribution */}
        <div className="flex-1 space-y-2">
          {ratingDistribution.map((r) => (
            <div key={r.stars} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-4">{r.stars}</span>
              <Star className="w-3 h-3 text-primary fill-primary" />
              <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${r.percent}%` }} />
              </div>
              <span className="text-xs text-muted-foreground w-8 text-right">{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Reviews list */}
    <div className="space-y-3">
      {reviews.map((review) => (
        <div key={review.id} className="bg-card rounded-2xl border border-border p-5 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{review.author}</p>
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
                  <span className="text-xs text-muted-foreground">{review.product}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{review.date}</span>
            </div>
          </div>

          <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{review.text}</p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> {review.helpful} faydalı
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!review.replied && (
                <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  <MessageCircle className="w-3 h-3" /> Cavabla
                </button>
              )}
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
                <Flag className="w-3 h-3" /> Şikayət
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ShopReviews;
