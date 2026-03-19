import { useEffect } from "react";

const usePageTitle = (title: string, description?: string) => {
  useEffect(() => {
    const suffix = "UcuzTap";
    document.title = title ? `${title} | ${suffix}` : `${suffix} — Azərbaycanda pulsuz elanlar`;
    
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
};

export default usePageTitle;
