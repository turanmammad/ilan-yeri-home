import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

const StaticPage = ({ title, content }: { title: string; content: string }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="container py-10 flex-1 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{title}</h1>
      <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{content}</p>
      </div>
    </main>
    <Footer />
  </div>
);

export const Rules = () => (
  <StaticPage
    title="Qaydalar"
    content={`UcuzTap platformasında elan yerləşdirərkən aşağıdakı qaydalara riayət etməlisiniz:

1. Elanlar Azərbaycan qanunvericiliyinə uyğun olmalıdır.
2. Saxta və ya aldadıcı məlumat yerləşdirmək qadağandır.
3. Eyni elanı bir neçə dəfə yerləşdirmək olmaz.
4. Şəkillər məhsula aid olmalıdır.
5. Qiymət düzgün göstərilməlidir.
6. Ədəbsiz və ya təhqiredici ifadələr istifadə etmək qadağandır.

Qaydaları pozan elanlar silinəcək və hesab bloklanacaq.`}
  />
);

export const Safety = () => (
  <StaticPage
    title="Təhlükəsizlik"
    content={`UcuzTap-da təhlükəsiz alış-veriş üçün tövsiyələr:

• Şəxsi məlumatlarınızı (şifrə, bank kartı və s.) heç kimlə paylaşmayın.
• Əvvəlcədən ödəniş tələb edən satıcılardan ehtiyatlı olun.
• Görüş zamanı ictimai yerlərdə görüşün.
• Məhsulu şəxsən yoxlayın.
• Şübhəli elanları bildirin.

Hər hansı problem yaranarsa, dəstək komandamıza müraciət edin.`}
  />
);

export const Careers = () => (
  <StaticPage
    title="Karyera"
    content={`UcuzTap komandasına qoşulun!

Biz daim istedadlı insanlar axtarırıq. Hal-hazırda aşağıdakı vakansiyalar mövcuddur:

• Frontend Developer (React/TypeScript)
• Backend Developer (Node.js)
• UI/UX Designer
• Marketing Manager
• Müştəri Dəstəyi Mütəxəssisi

Müraciət üçün CV-nizi careers@ucuztap.az ünvanına göndərin.`}
  />
);

export const HelpCenter = () => (
  <StaticPage
    title="Yardım mərkəzi"
    content={`Tez-tez verilən suallar:

S: Elan necə yerləşdirilir?
C: "Elan yerləşdir" düyməsinə basın, formu doldurun və göndərin.

S: Elan neçə gün aktiv qalır?
C: Standart elanlar 30 gün, VIP elanlar 60 gün aktiv qalır.

S: Elanımı necə redaktə edə bilərəm?
C: Hesabınıza daxil olun, "Elanlarım" bölməsindən redaktə edin.

S: Şübhəli elanı necə bildirə bilərəm?
C: Elanın altındakı "Şikayət et" düyməsinə basın.

Digər suallarınız üçün info@ucuztap.az ünvanına yazın.`}
  />
);

export const Complaint = () => (
  <StaticPage
    title="Şikayət"
    content={`Şikayət bildirmək üçün aşağıdakı yollardan istifadə edə bilərsiniz:

1. Elanın üzərindəki "Şikayət et" düyməsi
2. E-poçt: complaint@ucuztap.az
3. Telefon: +994 12 345 67 89

Şikayətiniz 24 saat ərzində baxılacaq.`}
  />
);

export const Partnership = () => (
  <StaticPage
    title="Tərəfdaşlıq"
    content={`UcuzTap ilə tərəfdaşlıq imkanları:

• API inteqrasiyası — elanlarınızı avtomatik yerləşdirin
• Mağaza hesabı — brend səhifənizi yaradın
• Reklam kampaniyaları — hədəfli reklam
• Korporativ həllər — şirkətlər üçün xüsusi paketlər

Ətraflı məlumat üçün partners@ucuztap.az ünvanına yazın.`}
  />
);

export const Press = () => (
  <StaticPage
    title="Mətbuat"
    content={`Mətbuat sorğuları üçün:

E-poçt: press@ucuztap.az
Telefon: +994 12 345 67 89

Mətbuat dəsti və loqolar tələb əsasında təqdim edilir.`}
  />
);
