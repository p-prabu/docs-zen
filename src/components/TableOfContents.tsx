import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="w-64 bg-docs-toc border-l border-docs-border h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h3 className="text-sm font-semibold text-docs-toc-foreground mb-4 uppercase tracking-wide">
          On This Page
        </h3>
        
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "block w-full text-left text-sm transition-colors py-1.5 px-2 rounded",
                "hover:text-primary hover:bg-accent/50",
                heading.level === 2 && "pl-2",
                heading.level === 3 && "pl-6",
                heading.level === 4 && "pl-10",
                activeId === heading.id
                  ? "text-primary font-medium bg-accent"
                  : "text-docs-toc-foreground"
              )}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}