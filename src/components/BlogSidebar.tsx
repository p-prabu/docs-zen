import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight, ChevronDown, BookOpen, Code, Settings, FileText, Search, X, Menu, Shield, Terminal, FolderCog, Smartphone, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import { blogCategories, blogPosts } from "@/data/blog-posts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";

const categoryIcons = {
  "activedirectory": Shield,
  "entra": Settings,
  "powershell": Terminal,
  "grouppolicy": FolderCog,
  "intune": Smartphone,
  "ai": Brain
} as const;

interface BlogSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function BlogSidebar({ isOpen = true, onClose, className }: BlogSidebarProps) {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "activedirectory" // Default to expanded
  ]);
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  useEffect(() => {
    // Ensure router is ready before rendering NavLinks
    setIsRouterReady(true);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results: any[] = [];
      Object.values(blogPosts).forEach((post) => {
        if (
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          results.push(post);
        }
      });
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSearchResultClick = () => {
    if (onClose) onClose();
  };

  if (!isRouterReady) {
    return (
      <div className={cn(
        "w-64 bg-docs-nav border-r border-docs-border h-screen overflow-y-auto",
        "md:sticky md:top-0",
        "fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        className
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-docs-nav-active" />
              <h1 className="text-xl font-bold text-docs-nav-foreground">Tech-docs</h1>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="md:hidden text-docs-nav-foreground hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="text-docs-nav-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-64 bg-docs-nav border-r border-docs-border h-screen overflow-y-auto",
      "md:sticky md:top-0",
      "fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-docs-nav-active" />
            <h1 className="text-xl font-bold text-docs-nav-foreground">Tech-docs</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="md:hidden text-docs-nav-foreground hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Box */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-docs-nav-foreground" />
          <Input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-docs-border text-docs-nav-foreground placeholder:text-docs-toc-foreground"
          />
        </div>

        {/* Search Results */}
        {searchQuery.trim() && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-docs-nav-foreground mb-3">
              Search Results ({filteredResults.length})
            </h3>
            {filteredResults.length > 0 ? (
              <div className="space-y-1">
                {filteredResults.map((post) => (
                  <NavLink
                    key={post.id}
                    to={`/${post.id}`}
                    onClick={handleSearchResultClick}
                    className="block px-3 py-2 text-sm rounded-lg transition-colors text-docs-nav-foreground hover:bg-accent"
                  >
                    <div className="font-medium">{post.title}</div>
                    <div className="text-xs text-docs-toc-foreground capitalize">
                      {post.category.replace('-', ' ')}
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <div className="text-sm text-docs-toc-foreground">No results found</div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-2">
          {blogCategories.map((category) => {
            const Icon = categoryIcons[category.id as keyof typeof categoryIcons];
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <div key={category.id} className="space-y-1">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "flex items-center justify-between w-full p-2 text-left rounded-lg transition-colors",
                    "hover:bg-accent text-docs-nav-foreground font-medium"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{category.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {category.posts.map((postId) => {
                      const currentPath = location?.pathname || "/";
                      const targetPath = `/${postId}`;
                      const isActive = currentPath === targetPath || (currentPath === "/" && postId === "introduction");
                      
                      return (
                        <NavLink
                          key={postId}
                          to={targetPath}
                          onClick={handleSearchResultClick}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-lg transition-colors",
                            isActive
                              ? "bg-docs-nav-active text-docs-nav-active-foreground font-medium"
                              : "text-docs-nav-foreground hover:bg-accent"
                          )}
                        >
                          {postId.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}