import {
  Car, Smartphone, Home, Shirt, Sofa,
  Briefcase, Baby, Dumbbell, Wrench, PawPrint, Monitor, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { icon: Car, label: "Nəqliyyat", count: "45,231", color: "bg-blue-100 text-blue-600" },
  { icon: Home, label: "Daşınmaz əmlak", count: "23,456", color: "bg-green-100 text-green-600" },
  { icon: Smartphone, label: "Elektronika", count: "31,892", color: "bg-orange-100 text-orange-600" },
  { icon: Briefcase, label: "İş elanları", count: "12,567", color: "bg-purple-100 text-purple-600" },
  { icon: Shirt, label: "Geyim", count: "18,234", color: "bg-pink-100 text-pink-600" },
  { icon: Sofa, label: "Ev və bağ", count: "9,876", color: "bg-emerald-100 text-emerald-600" },
  { icon: Baby, label: "Uşaq aləmi", count: "7,543", color: "bg-cyan-100 text-cyan-600" },
  { icon: Dumbbell, label: "Hobbi və idman", count: "5,432", color: "bg-red-100 text-red-600" },
  { icon: Wrench, label: "Xidmətlər", count: "8,765", color: "bg-amber-100 text-amber-600" },
  { icon: PawPrint, label: "Heyvanlar", count: "3,210", color: "bg-teal-100 text-teal-600" },
  { icon: Monitor, label: "Kompüter", count: "14,321", color: "bg-indigo-100 text-indigo-600" },
  { icon: Sparkles, label: "Gözəllik", count: "6,789", color: "bg-rose-100 text-rose-600" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const Categories = () => (
  <section className="container py-10">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Kateqoriyalar</h2>
      <button className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
        Hamısına bax →
      </button>
    </div>
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
    >
      {categories.map((cat) => (
        <motion.button
          key={cat.label}
          variants={item}
          className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
        >
          <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
            <cat.icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <span className="text-sm font-semibold text-foreground block">
              {cat.label}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5 block">
              {cat.count}
            </span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  </section>
);

export default Categories;
