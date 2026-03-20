import { useState } from "react";
import {
  Car, Smartphone, Home, Shirt, Sofa, Briefcase, Baby, Dumbbell, Wrench,
  PawPrint, Monitor, Sparkles, Plus, Pencil, Trash2, GripVertical,
  Eye, EyeOff, Search, X, FolderTree, ChevronRight, Wand2, Loader2, Globe, FileText, Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type LucideIcon = typeof Car;

interface CategorySEO {
  metaTitle: string;
  metaDescription: string;
  h1Title: string;
  contentText: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string;
  canonicalUrl: string;
  titleTag: string;
}

interface Category {
  id: number;
  label: string;
  slug: string;
  icon: string;
  count: number;
  active: boolean;
  order: number;
  subcategories: { id: number; label: string; active: boolean }[];
  seo: CategorySEO;
}

const emptySEO: CategorySEO = {
  metaTitle: "", metaDescription: "", h1Title: "", contentText: "",
  ogTitle: "", ogDescription: "", keywords: "", canonicalUrl: "", titleTag: "",
};

const iconMap: Record<string, LucideIcon> = {
  Car, Smartphone, Home, Shirt, Sofa, Briefcase, Baby, Dumbbell,
  Wrench, PawPrint, Monitor, Sparkles,
};
const iconOptions = Object.keys(iconMap);

// AI SEO generator (mock — real AI requires Lovable Cloud)
const generateSEO = (label: string, slug: string, subs: string[]): CategorySEO => {
  const subText = subs.length > 0 ? `, ${subs.slice(0, 3).join(", ")}` : "";
  return {
    metaTitle: `${label} — UcuzTap.az ilə ən yaxşı ${label.toLowerCase()} elanları`,
    metaDescription: `${label} kateqoriyasında minlərlə elan${subText}. Ən ucuz qiymətlərlə alış-veriş edin. Pulsuz elan yerləşdirin!`,
    h1Title: `${label} elanları`,
    contentText: `UcuzTap.az-da ${label.toLowerCase()} kateqoriyasında müxtəlif elanlar tapın${subText ? ` — ${subText.slice(2)}` : ""}. Həm yeni, həm də istifadə olunmuş məhsulları ən sərfəli qiymətlərlə əldə edin. Satıcılarla birbaşa əlaqə saxlayın.`,
    ogTitle: `${label} | UcuzTap — Azərbaycanın ən böyük elan platforması`,
    ogDescription: `${label} kateqoriyasında ən son elanlar. UcuzTap.az-da pulsuz elan yerləşdirin!`,
    keywords: `${label.toLowerCase()}, ${slug}, ucuztap, elan, azərbaycan${subs.length > 0 ? ", " + subs.map(s => s.toLowerCase()).join(", ") : ""}, alış-veriş, pulsuz elan`,
    canonicalUrl: `https://ucuztap.az/elanlar?category=${encodeURIComponent(label)}`,
    titleTag: `${label} — Elanlar | UcuzTap.az`,
  };
};

const initialCategories: Category[] = [
  { id: 1, label: "Nəqliyyat", slug: "neqliyyat", icon: "Car", count: 45231, active: true, order: 1, seo: { ...emptySEO }, subcategories: [
    { id: 101, label: "Avtomobillər", active: true },
    { id: 102, label: "Motosikletlər", active: true },
    { id: 103, label: "Ehtiyat hissələri", active: true },
  ]},
  { id: 2, label: "Daşınmaz əmlak", slug: "dashinmaz-emlak", icon: "Home", count: 23456, active: true, order: 2, seo: { ...emptySEO }, subcategories: [
    { id: 201, label: "Mənzillər", active: true },
    { id: 202, label: "Evlər / Villalar", active: true },
    { id: 203, label: "Torpaq", active: true },
    { id: 204, label: "Obyektlər", active: true },
  ]},
  { id: 3, label: "Elektronika", slug: "elektronika", icon: "Smartphone", count: 31892, active: true, order: 3, seo: { ...emptySEO }, subcategories: [
    { id: 301, label: "Telefonlar", active: true },
    { id: 302, label: "Planşetlər", active: true },
    { id: 303, label: "Aksessuarlar", active: true },
  ]},
  { id: 4, label: "İş elanları", slug: "is-elanlari", icon: "Briefcase", count: 12567, active: true, order: 4, seo: { ...emptySEO }, subcategories: [
    { id: 401, label: "Tam iş günü", active: true },
    { id: 402, label: "Part-time", active: true },
  ]},
  { id: 5, label: "Geyim", slug: "geyim", icon: "Shirt", count: 18234, active: true, order: 5, seo: { ...emptySEO }, subcategories: [
    { id: 501, label: "Kişi geyimləri", active: true },
    { id: 502, label: "Qadın geyimləri", active: true },
    { id: 503, label: "Uşaq geyimləri", active: true },
  ]},
  { id: 6, label: "Ev və bağ", slug: "ev-ve-bag", icon: "Sofa", count: 9876, active: true, order: 6, seo: { ...emptySEO }, subcategories: [] },
  { id: 7, label: "Uşaq aləmi", slug: "usaq-alemi", icon: "Baby", count: 7543, active: true, order: 7, seo: { ...emptySEO }, subcategories: [] },
  { id: 8, label: "Hobbi və idman", slug: "hobbi-ve-idman", icon: "Dumbbell", count: 5432, active: true, order: 8, seo: { ...emptySEO }, subcategories: [] },
  { id: 9, label: "Xidmətlər", slug: "xidmetler", icon: "Wrench", count: 8765, active: true, order: 9, seo: { ...emptySEO }, subcategories: [] },
  { id: 10, label: "Heyvanlar", slug: "heyvanlar", icon: "PawPrint", count: 3210, active: true, order: 10, seo: { ...emptySEO }, subcategories: [] },
  { id: 11, label: "Kompüter", slug: "komputer", icon: "Monitor", count: 14321, active: true, order: 11, seo: { ...emptySEO }, subcategories: [] },
  { id: 12, label: "Gözəllik", slug: "gozellik", icon: "Sparkles", count: 6789, active: false, order: 12, seo: { ...emptySEO }, subcategories: [] },
];

const SEOField = ({ label, value, onChange, maxLen, placeholder, multiline, charWarn }: {
  label: string; value: string; onChange: (v: string) => void; maxLen?: number; placeholder?: string; multiline?: boolean; charWarn?: number;
}) => {
  const len = value.length;
  const warn = charWarn && len > charWarn;
  const over = maxLen && len > maxLen;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-foreground">{label}</label>
        {maxLen && (
          <span className={cn("text-[10px] font-mono", over ? "text-destructive font-bold" : warn ? "text-amber-500" : "text-muted-foreground")}>
            {len}/{maxLen}
          </span>
        )}
      </div>
      {multiline ? (
        <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="rounded-xl text-xs min-h-[70px] resize-none" />
      ) : (
        <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="rounded-xl text-xs h-9" />
      )}
    </div>
  );
};

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [dialogTab, setDialogTab] = useState<"general" | "seo">("general");
  const [isGenerating, setIsGenerating] = useState(false);

  // Form state
  const [formLabel, setFormLabel] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formIcon, setFormIcon] = useState("Car");
  const [formActive, setFormActive] = useState(true);
  const [formSubs, setFormSubs] = useState<{ id: number; label: string; active: boolean }[]>([]);
  const [newSubName, setNewSubName] = useState("");
  const [formSEO, setFormSEO] = useState<CategorySEO>({ ...emptySEO });

  const filtered = categories
    .filter(c => !search || c.label.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  const updateSEO = (key: keyof CategorySEO, value: string) => {
    setFormSEO(prev => ({ ...prev, [key]: value }));
  };

  const openCreate = () => {
    setEditingCat(null);
    setFormLabel(""); setFormSlug(""); setFormIcon("Car"); setFormActive(true);
    setFormSubs([]); setFormSEO({ ...emptySEO }); setDialogTab("general");
    setEditDialog(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCat(cat);
    setFormLabel(cat.label); setFormSlug(cat.slug); setFormIcon(cat.icon);
    setFormActive(cat.active); setFormSubs([...cat.subcategories]);
    setFormSEO({ ...cat.seo }); setDialogTab("general");
    setEditDialog(true);
  };

  const handleAIGenerate = () => {
    if (!formLabel.trim()) { toast.error("Əvvəlcə kateqoriya adı daxil edin"); return; }
    setIsGenerating(true);
    const slug = formSlug.trim() || formLabel.toLowerCase().replace(/\s+/g, "-");
    setTimeout(() => {
      const seo = generateSEO(formLabel, slug, formSubs.map(s => s.label));
      setFormSEO(seo);
      setIsGenerating(false);
      toast.success("AI bütün SEO sahələrini doldurdu!");
    }, 1500);
  };

  const handleAISingleField = (key: keyof CategorySEO) => {
    if (!formLabel.trim()) { toast.error("Əvvəlcə kateqoriya adı daxil edin"); return; }
    const slug = formSlug.trim() || formLabel.toLowerCase().replace(/\s+/g, "-");
    const full = generateSEO(formLabel, slug, formSubs.map(s => s.label));
    setFormSEO(prev => ({ ...prev, [key]: full[key] }));
    toast.success("Sahə AI ilə dolduruldu");
  };

  const saveCategory = () => {
    if (!formLabel.trim()) { toast.error("Kateqoriya adı daxil edin"); return; }
    const slug = formSlug.trim() || formLabel.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-əüöığçş]/g, "");

    if (editingCat) {
      setCategories(prev => prev.map(c => c.id === editingCat.id ? { ...c, label: formLabel, slug, icon: formIcon, active: formActive, subcategories: formSubs, seo: formSEO } : c));
      toast.success("Kateqoriya yeniləndi");
    } else {
      const newCat: Category = {
        id: Date.now(), label: formLabel, slug, icon: formIcon, count: 0,
        active: formActive, order: categories.length + 1, subcategories: formSubs, seo: formSEO,
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
  const seoFilledCount = categories.filter(c => c.seo.metaTitle).length;

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
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm">
            <FolderTree className="w-4 h-4 text-primary" />
            <span className="font-bold text-foreground">{categories.length}</span>
            <span className="text-muted-foreground">kateqoriya</span>
          </div>
          <span className="text-border">·</span>
          <div className="text-sm">
            <span className="font-bold text-emerald-500">{activeCount}</span>
            <span className="text-muted-foreground"> aktiv</span>
          </div>
          <span className="text-border">·</span>
          <div className="text-sm">
            <span className="font-bold text-foreground">{totalListings.toLocaleString()}</span>
            <span className="text-muted-foreground"> elan</span>
          </div>
          <span className="text-border">·</span>
          <div className="flex items-center gap-1 text-sm">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span className="font-bold text-foreground">{seoFilledCount}</span>
            <span className="text-muted-foreground">SEO</span>
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
            const hasSEO = !!cat.seo.metaTitle;
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
                      {hasSEO ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center gap-0.5">
                          <Globe className="w-2.5 h-2.5" /> SEO
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500">SEO yox</span>
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
        <DialogContent className="rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingCat ? "Kateqoriyanı düzəliş et" : "Yeni kateqoriya"}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={dialogTab} onValueChange={v => setDialogTab(v as any)}>
            <TabsList className="h-9 w-full">
              <TabsTrigger value="general" className="text-xs flex-1 gap-1.5">
                <FolderTree className="w-3.5 h-3.5" /> Ümumi
              </TabsTrigger>
              <TabsTrigger value="seo" className="text-xs flex-1 gap-1.5">
                <Globe className="w-3.5 h-3.5" /> SEO & Kontent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Kateqoriya adı</label>
                <Input value={formLabel} onChange={e => setFormLabel(e.target.value)} placeholder="Məs: Elektronika" className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Slug (URL)</label>
                <Input value={formSlug} onChange={e => setFormSlug(e.target.value)} placeholder="Avtomatik yaradılacaq" className="rounded-xl font-mono text-xs" />
              </div>

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

              <div className="flex items-center justify-between bg-secondary/50 rounded-xl p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Aktiv status</p>
                  <p className="text-[11px] text-muted-foreground">Deaktiv kateqoriyalar istifadəçilərə görünmür</p>
                </div>
                <button onClick={() => setFormActive(!formActive)}
                  className={cn("w-11 h-6 rounded-full transition-colors relative", formActive ? "bg-primary" : "bg-border")}>
                  <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform", formActive ? "left-[22px]" : "left-0.5")} />
                </button>
              </div>

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
            </TabsContent>

            <TabsContent value="seo" className="mt-4 space-y-4">
              {/* AI Generate All Button */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-foreground">AI SEO Generatoru</h4>
                    <p className="text-[10px] text-muted-foreground">Bütün SEO sahələrini AI ilə avtomatik doldurun</p>
                  </div>
                  <Button onClick={handleAIGenerate} disabled={isGenerating} size="sm"
                    className="rounded-xl gap-1.5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white border-0 hover:brightness-110">
                    {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                    {isGenerating ? "Yaradılır..." : "Hamısını yarat"}
                  </Button>
                </div>
              </div>

              {/* Title Tag */}
              <div className="relative">
                <SEOField label="Title Tag" value={formSEO.titleTag} onChange={v => updateSEO("titleTag", v)}
                  maxLen={60} charWarn={55} placeholder="Səhifə başlığı — Google axtarış nəticəsində görünür" />
                <button onClick={() => handleAISingleField("titleTag")} className="absolute top-0 right-0 p-1 text-primary hover:text-primary/80" title="AI ilə yarat">
                  <Wand2 className="w-3 h-3" />
                </button>
              </div>

              {/* Meta Title */}
              <div className="relative">
                <SEOField label="Meta Title (og:title)" value={formSEO.metaTitle} onChange={v => updateSEO("metaTitle", v)}
                  maxLen={70} charWarn={60} placeholder="Meta başlıq — sosial mediada paylaşılanda görünür" />
                <button onClick={() => handleAISingleField("metaTitle")} className="absolute top-0 right-0 p-1 text-primary hover:text-primary/80" title="AI ilə yarat">
                  <Wand2 className="w-3 h-3" />
                </button>
              </div>

              {/* Meta Description */}
              <div className="relative">
                <SEOField label="Meta Description" value={formSEO.metaDescription} onChange={v => updateSEO("metaDescription", v)}
                  maxLen={160} charWarn={150} placeholder="Axtarış nəticəsində başlığın altında görünən təsvir" multiline />
                <button onClick={() => handleAISingleField("metaDescription")} className="absolute top-0 right-0 p-1 text-primary hover:text-primary/80" title="AI ilə yarat">
                  <Wand2 className="w-3 h-3" />
                </button>
              </div>

              {/* H1 Title */}
              <div className="relative">
                <SEOField label="H1 Başlıq" value={formSEO.h1Title} onChange={v => updateSEO("h1Title", v)}
                  maxLen={80} placeholder="Səhifənin əsas H1 başlığı" />
                <button onClick={() => handleAISingleField("h1Title")} className="absolute top-0 right-0 p-1 text-primary hover:text-primary/80" title="AI ilə yarat">
                  <Wand2 className="w-3 h-3" />
                </button>
              </div>

              {/* Content Text */}
              <div className="relative">
                <SEOField label="Kateqoriya təsviri (kontent)" value={formSEO.contentText} onChange={v => updateSEO("contentText", v)}
                  placeholder="Kateqoriya səhifəsinin alt hissəsində görünəcək SEO mətni" multiline />
                <button onClick={() => handleAISingleField("contentText")} className="absolute top-0 right-0 p-1 text-primary hover:text-primary/80" title="AI ilə yarat">
                  <Wand2 className="w-3 h-3" />
                </button>
              </div>

              {/* OG Title & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <SEOField label="OG Title" value={formSEO.ogTitle} onChange={v => updateSEO("ogTitle", v)}
                    maxLen={70} placeholder="Sosial media paylaşım başlığı" />
                  <button onClick={() => handleAISingleField("ogTitle")} className="absolute top-0 right-0 p-1 text-primary hover:text-primary/80">
                    <Wand2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="relative">
                  <SEOField label="OG Description" value={formSEO.ogDescription} onChange={v => updateSEO("ogDescription", v)}
                    maxLen={160} placeholder="Sosial media paylaşım təsviri" />
                  <button onClick={() => handleAISingleField("ogDescription")} className="absolute top-0 right-0 p-1 text-primary hover:text-primary/80">
                    <Wand2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Keywords */}
              <div className="relative">
                <SEOField label="Açar sözlər (keywords)" value={formSEO.keywords} onChange={v => updateSEO("keywords", v)}
                  placeholder="vergüllə ayırın: elektronika, telefon, ucuz elan" />
                <button onClick={() => handleAISingleField("keywords")} className="absolute top-0 right-0 p-1 text-primary hover:text-primary/80">
                  <Wand2 className="w-3 h-3" />
                </button>
              </div>

              {/* Canonical URL */}
              <SEOField label="Canonical URL" value={formSEO.canonicalUrl} onChange={v => updateSEO("canonicalUrl", v)}
                placeholder="https://ucuztap.az/elanlar?category=..." />

              {/* Google Preview */}
              {(formSEO.titleTag || formSEO.metaDescription) && (
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Search className="w-3 h-3" /> Google önizləmə
                  </p>
                  <div className="space-y-0.5">
                    <p className="text-sm text-muted-foreground truncate">{formSEO.canonicalUrl || "https://ucuztap.az/..."}</p>
                    <p className="text-base text-blue-600 font-medium truncate hover:underline cursor-pointer">{formSEO.titleTag || formSEO.metaTitle || "Başlıq"}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{formSEO.metaDescription || "Təsvir..."}</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Button onClick={saveCategory} className="w-full rounded-xl h-11 mt-2">
            {editingCat ? "Yadda saxla" : "Kateqoriya yarat"}
          </Button>
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
