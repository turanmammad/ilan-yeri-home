import ProductCard, { type Product } from "./ProductCard";

const products: Product[] = [
  { id: 1, title: "Mercedes-Benz E 220 d", price: 45000, currency: "AZN", location: "Bakı, Nəsimi", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", isVip: true, timeAgo: "Bu gün, 14:30" },
  { id: 2, title: "3 otaqlı mənzil, 120 m²", price: 185000, currency: "AZN", location: "Bakı, Yasamal", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop", isVip: true, isUrgent: true, timeAgo: "Bu gün, 12:15" },
  { id: 3, title: "iPhone 15 Pro Max 256GB", price: 2100, currency: "AZN", location: "Bakı, Xətai", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop", timeAgo: "Bu gün, 11:45" },
  { id: 4, title: "Marketing Mütəxəssisi", price: 1500, currency: "AZN/ay", location: "Bakı, Səbail", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", timeAgo: "Dünən, 18:20" },
  { id: 5, title: "Yeni divan dəsti", price: 850, currency: "AZN", location: "Bakı, Binəqədi", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop", timeAgo: "Bu gün, 10:00" },
  { id: 6, title: "MacBook Pro M3 14 inch", price: 3800, currency: "AZN", location: "Bakı, Nərimanov", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop", isVip: true, timeAgo: "Bu gün, 09:30" },
  { id: 7, title: "Toyota Camry 2.5", price: 32000, currency: "AZN", location: "Bakı, Xətai", image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop", timeAgo: "Dünən, 16:45" },
  { id: 8, title: "Ofis mebeli dəsti", price: 1200, currency: "AZN", location: "Bakı, Nəsimi", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", timeAgo: "Bu gün, 08:15" },
];

const ProductGrid = () => (
  <section className="container pb-12">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Seçilmiş elanlar</h2>
      <button className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">Hamısına bax →</button>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  </section>
);

export default ProductGrid;
