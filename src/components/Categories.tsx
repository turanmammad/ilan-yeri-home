import {
  Car, Smartphone, Home, Shirt, Sofa,
  Briefcase, Baby, Dumbbell, Wrench, MoreHorizontal
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { icon: Car, label: "Nəqliyyat", count: "12.4K" },
  { icon: Home, label: "Daşınmaz əmlak", count: "8.7K" },
  { icon: Smartphone, label: "Elektronika", count: "15.2K" },
  { icon: Shirt, label: "Geyim", count: "6.1K" },
  { icon: Sofa, label: "Ev və bağ", count: "4.3K" },
  { icon: Briefcase, label: "İş elanları", count: "3.8K" },
  { icon: Baby, label: "Uşaq dünyası", count: "2.9K" },
  { icon: Dumbbell, label: "İdman", count: "1.7K" },
  { icon: Wrench, label: "Xidmətlər", count: "2.1K" },
  { icon: MoreHorizontal, label: "Hamısı", count: "" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } },
};

const Categories = () => (
  <section className="container py-8">
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-5 sm:grid-cols-10 gap-3 sm:gap-4"
    >
      {categories.map((cat) => (
        <motion.button
          key={cat.label}
          variants={item}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <cat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/70 group-hover:text-primary-foreground" strokeWidth={1.5} />
          </div>
          <span className="text-[11px] sm:text-xs font-medium text-foreground/80 leading-tight text-center">
            {cat.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  </section>
);

export default Categories;
