

# Claude-a Verilecek Tam Dizayn Sinxronizasiya Promptu

Sənin istəyin: Bu Lovable proyektindəki mövcud dizaynı Claude-a (Next.js layihəndə) göndərmək üçün tam detallı, bir dəfəlik, heç bir boşluq buraxmayan prompt hazırlamaq.

Aşağıda Claude-a göndərəcəyin tam prompt var. Bunu copy-paste edib göndər.

---

## Claude-a Göndəriləcək Prompt

```text
# UcuzTap Dizayn Sistemi — Tam Sinxronizasiya Tapşırığı

Sən senior frontend developer, CTO və product owner kimi çalışırsan. Aşağıdakı dizayn sistemini mövcud Next.js strukturuma BİRƏBİR entegrasiya etməlisən. Mockup yox, demo yox — real production kodu. Mövcud funksionallığı pozma, SEO strukturunu qoru, hər komponenti test et.

---

## 1. DESIGN TOKENS (CSS Variables)

Bu dəyişənləri globals.css-ə (və ya mövcud theme faylına) əlavə et. Əgər artıq varsa, üstünə yaz:

### Light Mode (:root)
--background: 0 0% 100%;
--foreground: 222 47% 11%;
--card: 0 0% 100%;
--card-foreground: 222 47% 11%;
--popover: 0 0% 100%;
--popover-foreground: 222 47% 11%;
--primary: 48 100% 48%;          /* Sarı-qızılı — brand rəng */
--primary-foreground: 222 47% 11%;
--secondary: 210 20% 98%;
--secondary-foreground: 222 47% 11%;
--muted: 215 16% 47%;
--muted-foreground: 215 16% 47%;
--accent: 210 20% 98%;
--accent-foreground: 222 47% 11%;
--destructive: 0 84% 60%;
--destructive-foreground: 210 40% 98%;
--border: 220 13% 91%;
--input: 220 13% 91%;
--ring: 48 100% 48%;
--radius: 1rem;
--shadow-card: 0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.05);
--shadow-card-hover: 0 12px 24px -8px rgba(0,0,0,0.1);

### Dark Mode (.dark)
--background: 222 47% 6%;
--foreground: 210 40% 98%;
--card: 222 47% 8%;
--card-foreground: 210 40% 98%;
--primary: 48 100% 48%;
--primary-foreground: 222 47% 11%;
--secondary: 217 33% 17%;
--secondary-foreground: 210 40% 98%;
--muted: 217 33% 17%;
--muted-foreground: 215 20% 65%;
--accent: 217 33% 17%;
--accent-foreground: 210 40% 98%;
--destructive: 0 63% 31%;
--destructive-foreground: 210 40% 98%;
--border: 217 33% 17%;
--input: 217 33% 17%;
--ring: 48 100% 48%;

### Font
Font: "Plus Jakarta Sans" (Google Fonts: https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap)
font-family: '"Plus Jakarta Sans"', system-ui, sans-serif

### Border Radius
--radius: 1rem (16px)
Buttons/inputs: rounded-xl (12px)
Cards: rounded-2xl (16px)
Tags/badges: rounded-lg (8px) və ya rounded-full

---

## 2. HEADER KOMPONENTİ

Sticky, blur backdrop, border-bottom:
- Height: h-14 (mobile), h-16 (desktop)
- Classes: sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border
- Logo: "U" hərfi primary rəngdə rounded-xl box içində + "UcuzTap" font-extrabold text-lg
- Desktop nav: "Bütün elanlar", "Mağazalar", "Xidmətlər" — text-sm font-medium text-foreground/70
- Actions: Dark mode toggle (Sun/Moon), Heart icon, Bell (notification dropdown), MessageCircle, User "Daxil ol", Primary CTA "Elan yerləşdir" button
- Mobile: Hamburger → right slide-out panel (w-[280px]) with backdrop, user login card, nav links with ChevronRight, footer with "Elan yerləşdir" CTA
- Notification dropdown: AnimatePresence, w-[340px], unread count badge (bg-destructive), mark all read, notification list with icons

---

## 3. SEARCH HERO SEKSİYASI

Primary background section with decorative elements:
- Background: bg-primary with overflow-hidden
- Floating icons: 12 category icons (Car, Home, Smartphone, etc.) absolute positioned, framer-motion ile float animation (y: [0, -8, 0]), opacity: 0.12
- Decorative circles: 3 əd bg-primary-foreground/5 rounded-full
- Title: "Azərbaycanda pulsuz elanlar" — text-2xl sm:text-4xl font-extrabold text-primary-foreground
- Subtitle: "Al, sat, dəyiş — hər şey bir yerdə" — text-primary-foreground/70
- Search bar: bg-card h-14 sm:h-16 rounded-2xl shadow-lg
  - City dropdown (FIXED positioning, z-[70]): 19 Azerbaijan cities, MapPin icon + ChevronDown
  - Text input: "Nə axtarırsınız?"
  - Submit button: bg-foreground text-card rounded-xl with Search icon
- Popular tags: iPhone, Mənzil, Avtomobil, İş, Məişət texnikası
- City dropdown MUST use fixed positioning + getBoundingClientRect() to avoid clipping

---

## 4. KATEQORİYALAR

Grid layout: grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4
12 category cards:
- Nəqliyyat (Car), Daşınmaz əmlak (Home), Elektronika (Smartphone), İş elanları (Briefcase), Geyim (Shirt), Ev və bağ (Sofa), Uşaq aləmi (Baby), Hobbi və idman (Dumbbell), Xidmətlər (Wrench), Heyvanlar (PawPrint), Kompüter (Monitor), Gözəllik (Sparkles)
- Icon container: w-14 h-14 rounded-full bg-primary/10 text-primary
- Card: p-5 rounded-2xl border border-border bg-card hover:shadow-card-hover hover:-translate-y-0.5
- Count: text-xs text-muted-foreground
- Stagger animation: framer-motion, staggerChildren: 0.04

---

## 5. PRODUCT CARD

- Card: bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1
- Image: aspect-[4/3] with group-hover:scale-105 transition
- VIP badge: bg-primary text-primary-foreground text-[11px] font-bold with Star icon
- Urgent badge: bg-destructive text-destructive-foreground
- Heart button: absolute top-right, opacity-0 group-hover:opacity-100, w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm
- Price: text-lg font-bold, tabular-nums, space separated (e.g. "45 000")
- Location + time: MapPin + Clock icons, text-xs text-muted-foreground

---

## 6. PRODUCT GRID

- Section title: "Seçilmiş elanlar" — text-xl sm:text-2xl font-bold
- "Hamısına bax →" link: text-sm font-medium text-foreground/60
- Grid: grid-cols-2 lg:grid-cols-4 gap-4

---

## 7. PROMO BANNER

- Container: bg-foreground rounded-3xl px-8 sm:px-12 py-10 sm:py-14 text-card
- Title: "Elanınızı daha çox insana çatdırın" — text-2xl sm:text-3xl font-bold
- 3 stat items: icon in bg-primary/20 circle, value + label
- CTA: bg-primary text-primary-foreground rounded-xl

---

## 8. AD SYSTEM

4 ad type: AdBanner (leaderboard/banner), InFeedAd, SidebarAd, SponsoredBadge
- All have: "Reklam" label (text-[9px] uppercase tracking-wider), advertiser name, CTA button, dismiss X button
- AdBanner: gradient accent overlay, rounded-2xl border
- InFeedAd: border-dashed border-primary/30
- SidebarAd: 300x250 placeholder, stacked layout
- SponsoredBadge: bg-amber-500/15 text-amber-600

---

## 9. FOOTER

- Background: bg-foreground text-background pb-20 md:pb-0
- Stats bar: 4 items (1M+ Aktiv elan, 500K+ İstifadəçi, 50+ Şəhər, 24/7 Dəstək), text-primary for values
- 4-column layout: Brand info (logo, description, address, phone, email, socials) + 3 link columns (Kateqoriyalar, Şirkət, Dəstək)
- Social icons: w-9 h-9 rounded-full bg-background/10, hover:bg-primary
- Link hover: ArrowUpRight icon appears on hover
- SEO block: h2 + p with keyword-rich text
- Bottom bar: copyright + links (Şərtlər, Məxfilik, Sayt xəritəsi)
- Schema.org: itemScope itemType="https://schema.org/Organization"

---

## 10. MOBILE BOTTOM NAV

- Fixed bottom, z-50, bg-card/95 backdrop-blur-md, border-t
- 5 items: Ana səhifə (Home), Axtar (Search), Elan ver (Plus — center, elevated), Seçilmişlər (Heart), Hesab (User)
- Center item: -mt-5, w-12 h-12 rounded-2xl bg-primary, shadow-lg shadow-primary/30
- Active state: text-primary, font-bold, strokeWidth: 2.2
- Hidden on md+ screens and admin pages
- safe-bottom padding for iOS

---

## 11. LOGIN / REGISTER PAGES

- Full page: min-h-screen bg-background
- Mini header: border-b, ArrowLeft "Geri" link
- Centered card: max-w-md, bg-card rounded-2xl border p-8 shadow-card
- Logo centered above card
- Tab switcher: E-poçt / Telefon — bg-secondary rounded-xl p-1, active tab bg-card shadow-sm
- Phone input: +994 prefix box + input
- Password: eye toggle, "Şifrəni unutdun?" link
- CTA: w-full h-11 bg-primary rounded-xl
- Divider: "və ya" with lines
- Social buttons: Google (colored SVG) + Facebook
- Bottom link: "Hesabınız yoxdur? Qeydiyyatdan keç"

---

## 12. LISTINGS PAGE

- Search bar: bg-secondary h-11 rounded-xl
- Category tabs: horizontal scroll, rounded-full pills, active: bg-foreground text-card
- Filter system (ListingFilters component):
  - Toggle button with SlidersHorizontal icon, active count badge
  - AnimatePresence panel: city select, price range (min/max), sort select, VIP checkbox
  - Category-specific filters: Nəqliyyat (marka, yanacaq, il, sürətlər qutusu), Daşınmaz əmlak (otaq, sahə, növ, əməliyyat), etc.
- Subcategories grid when category selected: grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
- Sponsored listings section with SponsoredBadge
- InFeedAd at position 4
- Listing cards: aspect-[4/3] image, VIP badge, heart button, price + location

---

## 13. LISTING DETAIL PAGE

- Breadcrumb: Ana səhifə > Elanlar > Category > Subcategory
- 2-column layout: lg:grid-cols-12 (7+5 or 8+4)
- Left: Image gallery (thumbnails, lightbox, zoom), specs table (striped rows), description, meta info
- Right (sticky): Price card (desktop only), contact buttons (WhatsApp green #25D366 + phone reveal), seller card (avatar, rating, response time), sidebar ad
- Similar listings: horizontal scroll of mini cards
- Phone masking: first 6 digits visible, rest masked

---

## 14. DASHBOARD

- SidebarProvider layout: sidebar + content
- Sidebar: collapsible, user avatar section, menu groups (Hesab + Mağazam), logout at bottom
- Menu items: LayoutDashboard, FileText, Heart, MessageCircle, Bell, Settings + Store, Package, Star, Settings
- Active state: bg-primary/10 text-primary font-medium
- Dashboard home: 4 stat cards (grid-cols-2 lg:grid-cols-4), recent listings table, activity feed
- Status badges: active (emerald), pending (amber), expired (muted)

---

## 15. ADMIN PANEL

- Separate login page (/admin/giris): dark themed, Shield icon, framer-motion
- AdminLayout with sidebar navigation
- Pages: Dashboard, Elanlar, İstifadəçilər, Mağazalar, Şikayətlər, Mesajlar, Blok siyahısı, Analitika, Ödənişlər, Kampaniyalar, AI, Sistem, Tənzimləmə, Premium, Sponsor

---

## 16. SEO REQUIREMENTS

- HTML lang="az"
- Meta tags: description, og:*, twitter:*
- JSON-LD: WebSite schema with SearchAction
- usePageTitle hook: dynamic document.title with "| UcuzTap" suffix
- Canonical URL
- Schema.org Organization on footer
- Semantic HTML: article, nav, main, section, footer
- img loading="lazy", proper alt texts
- aria-label on buttons

---

## 17. ROUTE STRUCTURE (Azerbaijani URLs)

/ — Ana səhifə
/giris — Login
/qeydiyyat — Register
/sifre-sifirla — Forgot Password
/hesab/* — Dashboard (nested routes)
/elan-yerleshdir — Create Listing
/elanlar — Listings (with ?q=, ?category=, ?sub=, ?city= params)
/elan/:id — Listing Detail
/magazalar — Shops
/magaza/:id — Shop Detail
/istifadeci/:id — User Profile
/magaza-acin — Open Shop
/xidmetler — Services
/xidmet/:id — Service Detail
/haqqimizda — About
/elaqe — Contact
/reklam — Advertising
/qaydalar, /tehlukesizlik, /karyera, /yardim, /sikayat, /terefdashlik, /metbuat, /sitemap — Static pages
/admin/giris — Admin Login
/admin/* — Admin Panel (nested routes)

---

## 18. KRİTİK QAYDALAR

1. Hardcoded rəng istifadə etmə — YALNIZ CSS variables (hsl(var(--primary)) etc.)
2. Tailwind class-ları dəyişmə — yuxarıdakı token sisteminə uyğun olmalıdır
3. Framer-motion animasiyalar: stagger, fade-in, slide-in, scale
4. Icon library: lucide-react (lucide-icons/lucide əvəzinə)
5. Her komponenti responsive et: mobile-first
6. Dark mode tam işləməlidir
7. Mövcud Next.js routing strukturunu qoru, sadəcə komponentləri yenilə
8. Heç bir funksiyanı silmə — yalnız dizaynı yenilə
9. Build error olmamalıdır
10. TypeScript strict mode

Bu tapşırığı addım-addım yox, BİRDƏFƏLİK tam həll et. Hər komponenti oxu, anla, yenilə, test et.
```

---

## Qeydlər

- Bu prompt 1 mesajda göndərilməlidir, parçalanmamalıdır
- Claude Next.js layihəndəki mövcud fayl strukturunu oxuyacaq və bu dizaynı o struktura uyğunlaşdıracaq
- Əgər Claude-da token limiti varsa, ən kritik hissələr: Design Tokens (section 1), Header (2), SearchHero (3), Categories (4), ProductCard (5), Footer (9), Mobile Bottom Nav (10)
- Hər komponent üçün tam Tailwind class-ları verilib — Claude-un improvise etməsinə ehtiyac yoxdur

