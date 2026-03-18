import { Link } from "react-router-dom";
import { Wrench, MapPin, Star, Clock, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const services = [
  { id: 1, title: "Ev təmiri və tikintisi", provider: "ProBuild", rating: 4.9, price: "Razılaşma ilə", location: "Bakı" },
  { id: 2, title: "Kompüter təmiri", provider: "TechFix", rating: 4.7, price: "30 ₼-dan", location: "Bakı" },
  { id: 3, title: "Avtomobil təmiri", provider: "AvtoServis+", rating: 4.8, price: "50 ₼-dan", location: "Sumqayıt" },
  { id: 4, title: "Dil kursları (İngilis)", provider: "LangAcademy", rating: 4.6, price: "80 ₼/ay", location: "Bakı" },
  { id: 5, title: "Fotosəssiya", provider: "PhotoArt", rating: 4.9, price: "100 ₼-dan", location: "Bakı" },
  { id: 6, title: "Daşınma xidməti", provider: "MoveIt", rating: 4.5, price: "40 ₼-dan", location: "Bakı" },
  { id: 7, title: "Santexnika xidmətləri", provider: "AquaFix", rating: 4.4, price: "25 ₼-dan", location: "Gəncə" },
  { id: 8, title: "Təmizlik xidməti", provider: "CleanPro", rating: 4.8, price: "50 ₼-dan", location: "Bakı" },
];

const Services = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />

    <div className="container py-8 flex-1">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Xidmətlər</h1>
      <p className="text-sm text-muted-foreground mb-8">Peşəkar xidmət göstəriciləri</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {services.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
          >
            <Link
              to={`/elanlar?category=Xidmətlər`}
              className="block bg-card rounded-2xl border border-border p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground truncate">{svc.title}</h3>
                  <p className="text-xs text-muted-foreground">{svc.provider}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                <span className="font-medium text-foreground">{svc.rating}</span>
                <span>·</span>
                <MapPin className="w-3 h-3" />
                <span>{svc.location}</span>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{svc.price}</span>
                <span className="text-xs text-primary font-medium">Ətraflı →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>

    <Footer />
  </div>
);

export default Services;
