import { BlogSidebar } from "./BlogSidebar";
import { TableOfContents } from "./TableOfContents";
import { BlogContent } from "./BlogContent";
import { Comments } from "./Comments";
import { MobileHeader } from "./MobileHeader";
import { blogPosts } from "@/data/blog-posts";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function BlogLayout() {
  const { postId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const post = postId ? blogPosts[postId] : blogPosts["ad-intro"];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when switching routes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [postId, isMobile]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.getElementById('mobile-sidebar');
        const target = event.target as Node;
        if (sidebar && !sidebar.contains(target)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  if (!post) {
    return (
      <div className="flex flex-col h-screen">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex flex-1">
          <div className="hidden md:block w-64 bg-docs-nav border-r border-docs-border">
            <div className="p-6 text-docs-nav-foreground">Navigation</div>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
              <p className="text-muted-foreground">The requested documentation page could not be found.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <MobileHeader 
        onMenuClick={() => setIsSidebarOpen(true)} 
        title={post.title}
      />
      
      <div className="flex flex-1 overflow-hidden" style={{ border: '2px solid red' }}>
        {/* Mobile Overlay */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div id="mobile-sidebar">
          <BlogSidebar 
            isOpen={isSidebarOpen || !isMobile} 
            onClose={() => setIsSidebarOpen(false)}
            className={isMobile ? "md:relative" : ""}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex flex-1 min-h-0 min-w-0" style={{ border: '2px solid blue' }}>
          <div className="flex-1 overflow-y-auto" style={{ border: '2px solid green' }}>
            <BlogContent post={post} />
            <Comments postId={post.id} />
          </div>
          
          {/* Table of Contents - Hidden on mobile, sticky on desktop */}
          <div className="hidden lg:block">
            <TableOfContents headings={post.headings} />
          </div>
        </div>
      </div>
    </div>
  );
}