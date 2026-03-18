import ProductCard, { type Product } from "./ProductCard";

const products: Product[] = [
  { id: 1, title: "iPhone 15 Pro Max 256GB Natural Titanium", price: 2150, currency: "AZN", location: "Bakı", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", isVip: true, timeAgo: "2 saat" },
  { id: 2, title: "Mercedes-Benz C200 AMG 2021", price: 52000, currency: "AZN", location: "Bakı", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=400&fit=crop", isVip: true, timeAgo: "5 saat" },
  { id: 3, title: "2 otaqlı mənzil, 28 May m/s yaxınlığı", price: 850, currency: "AZN/ay", location: "Nəsimi", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop", timeAgo: "1 saat" },
  { id: 4, title: "MacBook Air M2 2024 Midnight", price: 1850, currency: "AZN", location: "Bakı", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", isNew: true, timeAgo: "30 dəq" },
  { id: 5, title: "Samsung Galaxy S24 Ultra 512GB", price: 1950, currency: "AZN", location: "Gəncə", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", timeAgo: "3 saat" },
  { id: 6, title: "Nike Air Jordan 1 Retro High OG", price: 280, currency: "AZN", location: "Bakı", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", isNew: true, timeAgo: "45 dəq" },
  { id: 7, title: "Divan yeni, açılır, saxlama yeri ilə", price: 450, currency: "AZN", location: "Sumqayıt", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", timeAgo: "6 saat" },
  { id: 8, title: "PlayStation 5 Slim + 2 pult + 3 oyun", price: 890, currency: "AZN", location: "Bakı", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop", timeAgo: "2 saat" },
  { id: 9, title: "Toyota Camry 2.5 Hybrid 2023", price: 45000, currency: "AZN", location: "Bakı", image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=400&fit=crop", isVip: true, timeAgo: "1 gün" },
  { id: 10, title: "AirPods Pro 2 USB-C orijinal", price: 320, currency: "AZN", location: "Bakı", image: "https://images.unsplash.com/photo-1588423771073-b8903fdes678?w=400&h=400&fit=crop", timeAgo: "4 saat" },
  { id: 11, title: "Uşaq arabası 3-ü 1-də, Almanya istehsalı", price: 380, currency: "AZN", location: "Bakı", image: "https://images.unsplash.com/photo-1586048095898-a1e4dfe7b2f0?w=400&h=400&fit=crop", isNew: true, timeAgo: "7 saat" },
  { id: 12, title: "Velosiped 29 düym, karbon çərçivə", price: 650, currency: "AZN", location: "Bakı", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop", timeAgo: "12 saat" },
];

const ProductGrid = () => (
  <section className="container pb-12">
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-lg sm:text-xl font-bold text-foreground">Son elanlar</h2>
      <button className="text-sm font-medium text-primary hover:underline">Hamısına bax →</button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  </section>
);

export default ProductGrid;
