import { useState } from "react";
import {
  Car, Smartphone, Home, Shirt, Sofa, Briefcase, Baby, Dumbbell, Wrench,
  PawPrint, Monitor, Sparkles, Plus, Pencil, Trash2, GripVertical,
  Eye, EyeOff, Search, X, FolderTree, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type LucideIcon = typeof Car;

interface Category {
  id: number;
  label: string;
  slug: string;
  icon: string;
  count: number;
  active: boolean;
  order: number;
  subcategories: { id: number; label: string; active: boolean }[];
}

const iconMap: Record<string, LucideIcon> = {
  Car, Smartphone, Home, Shirt, Sofa, Briefcase, Baby, Dumbbell,
  Wrench, PawPrint, Monitor, Sparkles,
};

const iconOptions = Object.keys(iconMap);

const initialCategories: Category[] = [
  { id: 1, label: "Nəqliyyat", slug: "neqliyyat", icon: "Car", count: 45231, active: true, order: 1, subcategories: [
    { id: 101, label: "Avtomobillər", active: true },
    { id: 102, label: "Motosikletlər", active: true },
    { id: 103, label: "Ehtiyat hissələri", active: true },
  ]},
  { id: 2, label: "Daşınmaz əmlak", slug: "dashinmaz-emlak", icon: "Home", count: 23456, active: true, order: 2, subcategories: [
    { id: 201, label: "Mənzillər", active: true },
    { id: 202, label: "Evlər / Villalar", active: true },
    { id: 203, label: "Torpaq", active: true },
    { id: 204, label: "Obyektlər", active: true },
  ]},
  { id: 3, label: "Elektronika", slug: "elektronika", icon: "Smartphone", count: 31892, active: true, order: 3, subcategories: [
    { id: 301, label: "Telefonlar", active: true },
    { id: 302, label: "Planşetlər", active: true },
    { id: 303, label: "Aksessuarlar", active: true },
  ]},
  { id: 4, label: "İş elanları", slug: "is-elanlari", icon: "Briefcase", count: 12567, active: true, order: 4, subcategories: [
    { id: 401, label: "Tam iş günü", active: true },
    { id: 402, label: "Part-time", active: true },
  ]},
  { id: 5, label: "Geyim", slug: "geyim", icon: "Shirt", count: 18234, active: true, order: 5, subcategories: [
    { id: 501, label: "Kişi geyimləri", active: true },
    { id: 502, label: "Qadın geyimləri", active: true },
    { id: 503, label: "Uşaq geyimləri", active: true },
  ]},
  { id: 6, label: "Ev və bağ", slug: "ev-ve-bag", icon: "Sofa", count: 9876, active: true, order: 6, subcategories: [] },
  { id: 7, label: "Uşaq aləmi", slug: "usaq-alemi", icon: "Baby", count: 7543, active: true, order: 7, subcategories: [] },
  { id: 8, label: "Hobbi və idman", slug: "hobbi-ve-idman", icon: "Dumbbell", count: 5432, active: true, order: 8, subcategories: [] },
  { id: 9, label: "Xidmətlər", slug: "xidmetler", icon: "Wrench", count: 8765, active: true, order: 9, subcategories: [] },
  { id: 10, label: "Heyvanlar", slug: "heyvanlar", icon: "PawPrint", count: 3210, active: true, order: 10, subcategories: [] },
  { id: 11, label: "Kompüter", slug: "komputer", icon: "Monitor", count: 14321, active: true, order: 11, subcategories: [] },
  { id: 12, label: "Gözəllik", slug: "gozellik", icon: "Sparkles", count: 6789, active: false, order: 12, subcategories: [] },
];

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Form state
  const [formLabel, setFormLabel] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formIcon, setFormIcon] = useState("Car");
  const [formActive, setFormActive] = useState(true);
  const [formSubs, setFormSubs] = useState<{ id: number; label: string; active: boolean }[]>([]);
  const [newSubName, setNewSubName] = useState("");

  const filtered = categories
    .filter(c => !search || c.label.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  const openCreate = () => {
    setEditingCat(null);
    setFormLabel("");
    setFormSlug("");
    setFormIcon("Car");
    setFormActive(true);
    setFormSubs([]);
    setEditDialog(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCat(cat);
    setFormLabel(cat.label);
    setFormSlug(cat.slug);
    setFormIcon(cat.icon);
    setFormActive(cat.active);
    setFormSubs([...cat.subcategories]);
    setEditDialog(true);
  };

  const saveCategory = () => {
    if (!formLabel.trim()) { toast.error("Kateqoriya adı daxil edin"); return; }
    const slug = formSlug.trim() || formLabel.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-əüöığçş]/g, "");

    if (editingCat) {
      setCategories(prev => prev.map(c => c.id === editingCat.id ? { ...c, label: formLabel, slug, icon: formIcon, active: formActive, subcategories: formSubs } : c));
      toast.success("Kateqoriya yeniləndi");
    } else {
      const newCat: Category = {
        id: Date.now(), label: formLabel, slug, icon: formIcon, count: 0,
        active: formActive, order: categories.length + 1, subcategories: formSubs,
      };
      setCategories(prev => [...prev, newCat]);
      toast.success("Yeni kateqoriya yaradıldı");
    }
    setEditDialog(false);
  };

  const deleteCategory = () => {
    if (!deleteId) return;
    setCategories(prev => prev.filter(c => c.id !== deleteId));
    setDeleteId(null);
    toast.success("Kateqoriya silindi");
  };

  const toggleActive = (id: number) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const addSub = () => {
    if (!newSubName.trim()) return;
    setFormSubs(prev => [...prev, { id: Date.now(), label: newSubName.trim(), active: true }]);
    setNewSubName("");
  };

  const removeSub = (subId: number) => {
    setFormSubs(prev => prev.filter(s => s.id !== subId));
  };

  const activeCount = categories.filter(c => c.active).length;
  const totalListings = categories.reduce((a, c) => a + c.count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-primary tracking-widest uppercase mb-1">Tənzimləmə</p>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Kateqoriyalar</h1>
        </div>
        <Button size="sm" className="gap-2 rounded-xl" onClick={openCreate}>
          <Plus className="w-4 h-4" /> Yeni kateqoriya
        </Button>
      </div>

      {/* Summary + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <FolderTree className="w-4 h-4 text-primary" />
            <span className="font-bold text-foreground">{categories.length}</span>
            <span className="text-muted-foreground">kateqoriya</span>
          </div>
          <span className="text-border">|</span>
          <div className="text-sm">
            <span className="font-bold text-emerald-500">{activeCount}</span>
            <span className="text-muted-foreground"> aktiv</span>
          </div>
          <span className="text-border">|</span>
          <div className="text-sm">
            <span className="font-bold text-foreground">{totalListings.toLocaleString()}</span>
            <span className="text-muted-foreground"> elan</span>
          </div>
        </div>
        <div className="relative sm:ml-auto w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="Axtar..." value={search} onChange={e => setSearch(e.target.value)} className="h-9 pl-9 text-xs rounded-lg" />
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.map(cat => {
            const Icon = iconMap[cat.icon] || Sparkles;
            const isExpanded = expandedId === cat.id;
            return (
              <div key={cat.id}>
                <div className={cn(
                  "flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/30",
                  !cat.active && "opacity-50"
                )}>
                  <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0 cursor-grab" />
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{cat.label}</p>
                      {!cat.active && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">Deaktiv</span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      /{cat.slug} · {cat.count.toLocaleString()} elan
                      {cat.subcategories.length > 0 && ` · ${cat.subcategories.length} alt kateqoriya`}
                    </p>
                  </div>

                  {cat.subcategories.length > 0 && (
                    <button onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                      className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
                      <ChevronRight className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")} />
                    </button>
                  )}

                  <button onClick={() => toggleActive(cat.id)}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title={cat.active ? "Deaktiv et" : "Aktiv et"}>
                    {cat.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(cat)}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteId(cat.id)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Subcategories */}
                {isExpanded && cat.subcategories.length > 0 && (
                  <div className="bg-secondary/20 border-t border-border/50">
                    {cat.subcategories.map(sub => (
                      <div key={sub.id} className="flex items-center gap-3 pl-16 pr-5 py-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                        <p className={cn("text-sm text-foreground flex-1", !sub.active && "opacity-40 line-through")}>{sub.label}</p>
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full", sub.active ? "bg-emerald-500/10 text-emerald-500" : "bg-secondary text-muted-foreground")}>
                          {sub.active ? "Aktiv" : "Deaktiv"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Nəticə tapılmadı</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="rounded-2xl max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingCat ? "Kateqoriyanı düzəliş et" : "Yeni kateqoriya"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Kateqoriya adı</label>
              <Input value={formLabel} onChange={e => setFormLabel(e.target.value)} placeholder="Məs: Elektronika" className="rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Slug (URL)</label>
              <Input value={formSlug} onChange={e => setFormSlug(e.target.value)} placeholder="Avtomatik yaradılacaq" className="rounded-xl font-mono text-xs" />
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">İkon</label>
              <div className="grid grid-cols-6 gap-2">
                {iconOptions.map(name => {
                  const Ic = iconMap[name];
                  return (
                    <button key={name} onClick={() => setFormIcon(name)}
                      className={cn(
                        "w-full aspect-square rounded-xl border-2 flex items-center justify-center transition-all",
                        formIcon === name ? "border-primary bg-primary/10 text-primary" : "border-input text-muted-foreground hover:border-primary/30"
                      )}>
                      <Ic className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active toggle */}
            <div className="flex items-center justify-between bg-secondary/50 rounded-xl p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Aktiv status</p>
                <p className="text-[11px] text-muted-foreground">Deaktiv kateqoriyalar istifadəçilərə görünmür</p>
              </div>
              <button onClick={() => setFormActive(!formActive)}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative",
                  formActive ? "bg-primary" : "bg-border"
                )}>
                <span className={cn(
                  "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                  formActive ? "left-[22px]" : "left-0.5"
                )} />
              </button>
            </div>

            {/* Subcategories */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Alt kateqoriyalar</label>
              <div className="space-y-2 mb-2">
                {formSubs.map(sub => (
                  <div key={sub.id} className="flex items-center gap-2 bg-secondary/30 rounded-lg px-3 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span className="text-sm text-foreground flex-1">{sub.label}</span>
                    <button onClick={() => removeSub(sub.id)} className="text-muted-foreground hover:text-destructive">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newSubName} onChange={e => setNewSubName(e.target.value)} placeholder="Alt kateqoriya adı"
                  className="rounded-xl text-xs flex-1" onKeyDown={e => e.key === "Enter" && addSub()} />
                <Button variant="outline" size="sm" onClick={addSub} className="rounded-xl shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <Button onClick={saveCategory} className="w-full rounded-xl h-11">
              {editingCat ? "Yadda saxla" : "Kateqoriya yarat"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={open => { if (!open) setDeleteId(null); }}
        title="Kateqoriyanı silmək istəyirsiniz?"
        description="Bu kateqoriya və bütün alt kateqoriyaları silinəcək. Bu əməliyyat geri qaytarıla bilməz."
        confirmLabel="Sil"
        variant="destructive"
        onConfirm={deleteCategory}
      />
    </div>
  );
};

export default AdminCategories;
