import Header from "@/components/Header";
import SearchHero from "@/components/SearchHero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <SearchHero />
    <Categories />
    <ProductGrid />
    <div className="flex-1" />
    <Footer />
  </div>
);

export default Index;
