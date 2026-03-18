const Footer = () => (
  <footer className="bg-secondary border-t border-border py-8">
    <div className="container">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold text-foreground mb-3">Ucuztap</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Haqqımızda</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Qaydalar</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Əlaqə</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Kateqoriyalar</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Nəqliyyat</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Elektronika</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Daşınmaz əmlak</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Dəstək</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">VIP elanlar</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Reklam</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Tətbiq</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">iOS</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Android</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © 2026 Ucuztap. Bütün hüquqlar qorunur.
      </div>
    </div>
  </footer>
);

export default Footer;
