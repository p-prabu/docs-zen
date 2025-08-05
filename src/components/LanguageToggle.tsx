import { useEffect } from "react";

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

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      
      // Initialize Google Translate
      (window as any).googleTranslateElementInit = function() {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,ta,hi,fr,es,de,it,pt,ru,ja,ko,zh,ar',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          multilanguagePage: true
        }, 'google_translate_element');
      };
      
      document.head.appendChild(script);
    };

    addGoogleTranslateScript();
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
        background-color: transparent !important;
        border: none !important;
        font-size: 14px !important;
        font-family: inherit !important;
      }
      
      .goog-te-gadget-simple .goog-te-menu-value {
        color: hsl(var(--foreground)) !important;
        font-family: inherit !important;
      }
      
      .goog-te-gadget-simple .goog-te-menu-value:hover {
        text-decoration: none !important;
      }
      
      .goog-te-combo {
        background-color: hsl(var(--background)) !important;
        border: 1px solid hsl(var(--border)) !important;
        border-radius: 6px !important;
        color: hsl(var(--foreground)) !important;
        font-size: 14px !important;
        padding: 8px 12px !important;
        font-family: inherit !important;
      }
      
      .goog-te-combo:hover {
        background-color: hsl(var(--accent)) !important;
      }
      
      .goog-te-combo:focus {
        outline: 2px solid hsl(var(--ring)) !important;
        outline-offset: 2px !important;
      }
      
      ${variant === "mobile" ? `
        .goog-te-combo {
          font-size: 12px !important;
          padding: 6px 8px !important;
        }
      ` : ''}
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
      <div className="flex items-center">
        <div className="text-xs text-muted-foreground mr-2">Translate:</div>
        <div id="google_translate_element" className="text-sm min-w-[100px]"></div>
      </div>
    );
  }

  return (
    <div className="px-3 py-2">
      <div className="text-sm text-muted-foreground mb-2">Language:</div>
      <div id="google_translate_element" className="min-w-[120px]"></div>
    </div>
  );
}