import Header from "@/components/Header";
import SearchHero from "@/components/SearchHero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { AdBanner, mockBannerAds } from "@/components/ads/AdSystem";
import usePageTitle from "@/hooks/usePageTitle";

const Index = () => {
  usePageTitle("", "UcuzTap — Azərbaycanın ən böyük pulsuz elan platforması. Al, sat, dəyiş — hər şey bir yerdə.");
  return (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <SearchHero />

    {/* Reklam: Hero altı */}
    <div className="container pt-4">
      <AdBanner ad={mockBannerAds.heroBottom} />
    </div>

    <Categories />

    {/* Reklam: Kateqoriya altı */}
    <div className="container pb-2">
      <AdBanner ad={mockBannerAds.categoriesBottom} />
    </div>

    <ProductGrid />
    <PromoBanner />

    {/* Reklam: Footer üstü */}
    <div className="container pb-6">
      <AdBanner ad={mockBannerAds.footerTop} />
    </div>

    <div className="flex-1" />
    <Footer />
  </div>
  );
};

export default Index;
