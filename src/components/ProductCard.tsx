import { Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export type Product = {
  id: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  image: string;
  isVip?: boolean;
  isNew?: boolean;
  timeAgo: string;
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
    className="group bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden cursor-pointer hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
    style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
  >
    <div className="relative aspect-square overflow-hidden bg-secondary">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      {product.isVip && (
        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
          VIP
        </span>
      )}
      {product.isNew && (
        <span className="absolute top-2 left-2 bg-foreground text-card text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
          Yeni
        </span>
      )}
      <button className="absolute top-2 right-2 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card">
        <Heart className="w-4 h-4 text-foreground/70" strokeWidth={1.5} />
      </button>
    </div>
    <div className="p-3">
      <p className="text-xl font-bold text-foreground tabular-nums">
        {product.price.toLocaleString()} {product.currency}
      </p>
      <h3 className="text-sm text-foreground/80 mt-1 line-clamp-2 leading-snug">
        {product.title}
      </h3>
      <div className="flex items-center justify-between mt-2.5 text-muted-foreground">
        <span className="flex items-center gap-1 text-xs">
          <MapPin className="w-3 h-3" strokeWidth={1.5} />
          {product.location}
        </span>
        <span className="text-xs">{product.timeAgo}</span>
      </div>
    </div>
  </motion.article>
);

export default ProductCard;
