import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin, Clock, Star, Shield, Wrench, Phone, MessageCircle,
  Globe, Share2, ChevronRight, Calendar, CheckCircle, ThumbsUp,
  Award, Users, Image as ImageIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AdBanner, mockBannerAds } from "@/components/ads/AdSystem";

// Mock service provider data
const provider = {
  id: 1,
  name: "ProBuild",
  title: "Ev təmiri və tikintisi",
  category: "Təmir xidmətləri",
  description: "10 illik təcrübəyə malik peşəkar tikinti və təmir komandası. Suvaq, boya, elektrik, santexnika, interyerin dizayn və yenilənməsi xidmətləri. Keyfiyyətli material və zəmanətli iş.",
  rating: 4.9,
  reviewCount: 234,
  price: "Razılaşma ilə",
  priceDetails: "Qiymət işin həcminə görə müəyyən edilir. Pulsuz qiymətləndirmə.",
  location: "Bakı, Nəsimi rayonu",
  verified: true,
  phone: "+994 50 234 56 78",
  email: "info@probuild.az",
  website: "https://probuild.az",
  workHours: "Bazar ertəsi - Şənbə: 08:00 - 19:00",
  memberSince: "2019",
  responseTime: "< 30 dəq",
  responseRate: "97%",
  completedJobs: 567,
  followers: 890,
  teamSize: "8 nəfər",
  services: [
    "Ev təmiri",
    "Suvaq və boya işləri",
    "Elektrik işləri",
    "Santexnika",
    "Döşəmə döşənməsi",
    "Tavan asma tavan",
    "İnteryerin yenilənməsi",
    "Pəncərə quraşdırma",
  ],
  portfolio: [
    { id: 1, title: "Mənzil yenilənməsi — Nəsimi", img: "/placeholder.svg" },
    { id: 2, title: "Mətbəx dizaynı — Yasamal", img: "/placeholder.svg" },
    { id: 3, title: "Hamam təmiri — Xətai", img: "/placeholder.svg" },
    { id: 4, title: "Ofis təmiri — 28 May", img: "/placeholder.svg" },
    { id: 5, title: "Villa interyeri — Bilgəh", img: "/placeholder.svg" },
    { id: 6, title: "Restoran renovasiyası", img: "/placeholder.svg" },
  ],
};

const reviews = [
  { id: 1, author: "Əli M.", rating: 5, text: "Əla komanda! Mənzili 3 həftəyə tamamilə yeniləyiblər. Keyfiyyət və qiymət mükəmməldir. Tövsiyə edirəm!", date: "15.03.2026", helpful: 12 },
  { id: 2, author: "Nigar H.", rating: 5, text: "Mətbəxin dizaynını çox gözəl ediblər. İşçilər təmiz və məsuliyyətli idi. Razıyam.", date: "10.03.2026", helpful: 8 },
  { id: 3, author: "Rəşad K.", rating: 4, text: "Yaxşı iş görüblər amma müddət bir az uzandı. Keyfiyyət əla idi.", date: "05.03.2026", helpful: 5 },
  { id: 4, author: "Günel A.", rating: 5, text: "Santexnika işlərini çox tez və keyfiyyətli həll etdilər. Minnətdaram!", date: "28.02.2026", helpful: 15 },
  { id: 5, author: "Tural V.", rating: 5, text: "Ofisimizi yeniləmək lazım idi. Mükəmməl nəticə oldu!", date: "20.02.2026", helpful: 7 },
];

const similarServices = [
  { id: 3, name: "AvtoServis+", title: "Avtomobil təmiri", rating: 4.8, price: "50 ₼-dan", location: "Sumqayıt" },
  { id: 7, name: "AquaFix", title: "Santexnika ustası", rating: 4.4, price: "25 ₼-dan", location: "Gəncə" },
  { id: 12, name: "SparkElektrik", title: "Elektrik ustası", rating: 4.3, price: "20 ₼-dan", location: "Bakı" },
];

const ServiceDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"portfolio" | "reviews" | "about">("portfolio");

  const ratingDist = [
    { stars: 5, count: 189 },
    { stars: 4, count: 32 },
    { stars: 3, count: 8 },
    { stars: 2, count: 3 },
    { stars: 1, count: 2 },
  ];
  const totalReviews = ratingDist.reduce((s, r) => s + r.count, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Cover */}
      <div className="h-32 sm:h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <main className="container -mt-12 sm:-mt-16 relative z-10 flex-1 pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Link to="/xidmetler" className="hover:text-foreground transition-colors">Xidmətlər</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/xidmetler?category=${encodeURIComponent(provider.category)}`} className="hover:text-foreground transition-colors">{provider.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{provider.name}</span>
        </div>

        {/* Provider header card */}
        <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card mb-6">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0 border-4 border-card -mt-12 sm:-mt-14">
              <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">{provider.name}</h1>
                    {provider.verified && (
                      <span className="text-xs font-semibold bg-primary/15 text-primary px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Təsdiqlənmiş
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{provider.title}</p>
                  <p className="text-sm text-foreground/70 mb-3 max-w-xl">{provider.description}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-primary fill-primary" /><span className="font-semibold text-foreground">{provider.rating}</span> ({provider.reviewCount} rəy)</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{provider.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Cavab: {provider.responseTime}</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" />{provider.completedJobs} iş</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{provider.teamSize}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:items-end shrink-0">
                  <span className="text-lg font-bold text-foreground">{provider.price}</span>
                  <span className="text-xs text-muted-foreground">{provider.priceDetails}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <a href={`tel:${provider.phone}`} className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-95 transition-all">
                  <Phone className="w-4 h-4" /> Zəng et
                </a>
                <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-input bg-card text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                  <MessageCircle className="w-4 h-4" /> Mesaj yaz
                </button>
                <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-input bg-card text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{provider.completedJobs}</p>
              <p className="text-xs text-muted-foreground">Tamamlanmış iş</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{provider.responseRate}</p>
              <p className="text-xs text-muted-foreground">Cavab faizi</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{provider.followers}</p>
              <p className="text-xs text-muted-foreground">İzləyici</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{provider.memberSince}</p>
              <p className="text-xs text-muted-foreground">-ci ildən</p>
            </div>
          </div>
        </div>

        {/* Services offered */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card mb-6">
          <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" /> Göstərilən xidmətlər
          </h2>
          <div className="flex flex-wrap gap-2">
            {provider.services.map((svc) => (
              <span key={svc} className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-foreground/80">
                {svc}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 bg-card rounded-xl border border-border p-1 w-fit">
          {([
            { key: "portfolio", label: "Portfolio", icon: ImageIcon },
            { key: "reviews", label: `Rəylər (${provider.reviewCount})`, icon: Star },
            { key: "about", label: "Haqqında", icon: Wrench },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio tab */}
        {activeTab === "portfolio" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {provider.portfolio.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border overflow-hidden bg-card hover:shadow-card-hover transition-shadow group"
              >
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Reviews tab */}
        {activeTab === "reviews" && (
          <div className="space-y-5">
            {/* Rating summary */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="text-center sm:pr-6 sm:border-r border-border">
                  <p className="text-4xl font-bold text-foreground">{provider.rating}</p>
                  <div className="flex justify-center gap-0.5 my-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(provider.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{totalReviews} rəy</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {ratingDist.map((r) => (
                    <div key={r.stars} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-4">{r.stars}</span>
                      <Star className="w-3 h-3 text-primary fill-primary" />
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(r.count / totalReviews) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Review list */}
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/80">{review.text}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp className="w-3 h-3" /> Faydalı ({review.helpful})
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* About tab */}
        {activeTab === "about" && (
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Əlaqə məlumatları</h3>
              <div className="space-y-3">
                <a href={`tel:${provider.phone}`} className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-primary" /> {provider.phone}
                </a>
                <a href={`mailto:${provider.email}`} className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground transition-colors">
                  <MessageCircle className="w-4 h-4 text-primary" /> {provider.email}
                </a>
                {provider.website && (
                  <a href={provider.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground transition-colors">
                    <Globe className="w-4 h-4 text-primary" /> {provider.website}
                  </a>
                )}
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <MapPin className="w-4 h-4 text-primary" /> {provider.location}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
              <h3 className="text-sm font-bold text-foreground">İş saatları və məlumat</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Clock className="w-4 h-4 text-primary" /> {provider.workHours}
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Calendar className="w-4 h-4 text-primary" /> {provider.memberSince}-ci ildən fəaliyyətdə
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Users className="w-4 h-4 text-primary" /> Komanda: {provider.teamSize}
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-primary" /> Cavab faizi: {provider.responseRate}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Similar services */}
        <div className="mt-8">
          <h2 className="text-base font-bold text-foreground mb-4">Oxşar xidmətlər</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {similarServices.map((svc) => (
              <Link
                key={svc.id}
                to={`/xidmet/${svc.id}`}
                className="bg-card rounded-2xl border border-border p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{svc.name}</p>
                    <p className="text-xs text-muted-foreground">{svc.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="font-medium text-foreground">{svc.rating}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{svc.price}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{svc.location}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <AdBanner ad={mockBannerAds.footerTop} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
