import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: {
          new (options: Record<string, unknown>, elementId: string): void;
          InlineLayout: {
            SIMPLE: unknown;
          };
        };
      };
    };
  }
}

interface LanguageToggleProps {
  variant?: "mobile" | "desktop";
}

export function LanguageToggle({ variant = "desktop" }: LanguageToggleProps) {
  // Load Google Translate script
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      // Check if script already exists
      if (document.getElementById('google-translate-script')) {
        return;
      }
      
      // Initialize Google Translate function first
      window.googleTranslateElementInit = function() {
        try {
          if (window.google?.translate) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,ta,hi,fr,es,de,it,pt,ru,ja,ko,zh,ar',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                multilanguagePage: true,
                gaTrack: true,
                gaId: 'UA-XXXXX-X'
              },
              'google_translate_element'
            );
          }
        } catch (error) {
          console.error('Error initializing Google Translate:', error);
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      
      
      script.onerror = (error) => {
        console.error('Error loading Google Translate script:', error);
      };
      
      document.head.appendChild(script);
    };

    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      addGoogleTranslateScript();
    }, 100);
  }, []);

  // Add CSS to style Google Translate widget
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'google-translate-styles';
    style.textContent = `
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
      
      body {
        top: 0px !important;
      }
      
      .goog-te-gadget-simple {
        background-color: hsl(var(--background)) !important;
        border: 1px solid hsl(var(--border)) !important;
        border-radius: 8px !important;
        padding: 8px 12px !important;
        font-size: 14px !important;
        font-family: inherit !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.2s ease-in-out !important;
        min-width: 120px !important;
        display: block !important;
      }
      
      .goog-te-gadget-simple:hover {
        border-color: hsl(var(--primary)) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
      }
      
      .goog-te-gadget-simple .goog-te-menu-value {
        color: hsl(var(--foreground)) !important;
        font-family: inherit !important;
        font-weight: 500 !important;
        text-decoration: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
      }
      
      .goog-te-gadget-simple .goog-te-menu-value:hover {
        text-decoration: none !important;
      }
      
      .goog-te-gadget-simple .goog-te-menu-value span:first-child {
        margin-right: 8px !important;
      }
      
      .goog-te-combo {
        background-color: hsl(var(--background)) !important;
        border: 1px solid hsl(var(--border)) !important;
        border-radius: 8px !important;
        color: hsl(var(--foreground)) !important;
        font-size: 14px !important;
        padding: 10px 12px !important;
        font-family: inherit !important;
        min-width: 140px !important;
        transition: all 0.2s ease-in-out !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
      }
      
      .goog-te-combo:hover {
        background-color: hsl(var(--accent)) !important;
        border-color: hsl(var(--primary)) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
      }
      
      .goog-te-combo:focus {
        outline: 2px solid hsl(var(--ring)) !important;
        outline-offset: 2px !important;
        border-color: hsl(var(--primary)) !important;
      }
      
      ${variant === "mobile" ? `
        .goog-te-gadget-simple {
          min-width: 100px !important;
          font-size: 12px !important;
          padding: 6px 10px !important;
        }
        .goog-te-combo {
          font-size: 12px !important;
          padding: 8px 10px !important;
          min-width: 100px !important;
        }
      ` : `
        .goog-te-gadget-simple {
          width: 100% !important;
          min-width: 140px !important;
        }
        .goog-te-combo {
          width: 100% !important;
          min-width: 140px !important;
        }
      `}
    `;
    
    if (!document.getElementById('google-translate-styles')) {
      document.head.appendChild(style);
    }
    
    return () => {
      const existingStyle = document.getElementById('google-translate-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [variant]);

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Translate:</div>
        <div id="google_translate_element" className="flex-shrink-0"></div>
      </div>
    );
  }

  return (
    <div className="px-3 py-3 space-y-3">
      <div className="text-sm font-medium text-foreground">Language</div>
      <div id="google_translate_element" className="w-full"></div>
    </div>
  );
}