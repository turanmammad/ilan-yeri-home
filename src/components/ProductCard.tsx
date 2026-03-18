import { Heart, MapPin, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export type Product = {
  id: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  image: string;
  isVip?: boolean;
  isUrgent?: boolean;
  isNew?: boolean;
  timeAgo: string;
};

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
  >
    <Link
      to={`/elan/${product.id}`}
      className="group block bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {product.isVip && (
            <span className="flex items-center gap-1 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-lg">
              <Star className="w-3 h-3" fill="currentColor" strokeWidth={0} />
              VIP
            </span>
          )}
          {product.isUrgent && (
            <span className="bg-destructive text-destructive-foreground text-[11px] font-bold px-2.5 py-1 rounded-lg">
              Təcili
            </span>
          )}
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2.5 right-2.5 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card shadow-sm"
        >
          <Heart className="w-4 h-4 text-foreground/60" strokeWidth={1.5} />
        </button>
      </div>
      <div className="p-3.5">
        <h3 className="text-sm text-foreground line-clamp-1 leading-snug">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-foreground mt-1 tabular-nums">
          {formatPrice(product.price)} <span className="text-sm font-normal text-muted-foreground">{product.currency}</span>
        </p>
        <div className="flex items-center gap-3 mt-2.5 text-muted-foreground">
          <span className="flex items-center gap-1 text-xs">
            <MapPin className="w-3 h-3" strokeWidth={1.5} />
            {product.location}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" strokeWidth={1.5} />
            {product.timeAgo}
          </span>
        </div>
      </div>
    </Link>
  </motion.article>
);

export default ProductCard;
