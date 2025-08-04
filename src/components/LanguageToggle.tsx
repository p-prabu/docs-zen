import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageToggleProps {
  variant?: "mobile" | "desktop";
}

export function LanguageToggle({ variant = "desktop" }: LanguageToggleProps) {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "ta">("en");
  const [isGoogleTranslateLoaded, setIsGoogleTranslateLoaded] = useState(false);

  // Load Google Translate script
  useEffect(() => {
    const loadGoogleTranslate = () => {
      // Check if already loaded
      if ((window as any).google?.translate) {
        setIsGoogleTranslateLoaded(true);
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      
      // Define the callback function
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,ta',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element');
        setIsGoogleTranslateLoaded(true);
      };

      document.head.appendChild(script);
    };

    loadGoogleTranslate();
  }, []);

  const handleLanguageChange = (language: "en" | "ta") => {
    setCurrentLanguage(language);
    
    // Wait a bit for Google Translate to load if needed
    setTimeout(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = language;
        select.dispatchEvent(new Event('change'));
      }
    }, 100);
  };

  if (variant === "mobile") {
    return (
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-docs-nav-foreground hover:bg-accent"
            >
              <Languages className="h-4 w-4" />
              <span className="ml-1 text-xs">
                {currentLanguage === "en" ? "EN" : "த"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background border border-border z-50">
            <DropdownMenuItem
              onClick={() => handleLanguageChange("en")}
              className={currentLanguage === "en" ? "bg-accent" : ""}
            >
              🇬🇧 English
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleLanguageChange("ta")}
              className={currentLanguage === "ta" ? "bg-accent" : ""}
            >
              🇮🇳 தமிழ் (Tamil)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Hidden Google Translate Element */}
        <div id="google_translate_element" className="hidden"></div>
      </div>
    );
  }

  return (
    <div className="px-3 py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-accent w-full justify-start"
          >
            <Languages className="h-4 w-4" />
            <span className="ml-2">
              {currentLanguage === "en" ? "English" : "தமிழ்"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-background border border-border z-50">
          <DropdownMenuItem
            onClick={() => handleLanguageChange("en")}
            className={currentLanguage === "en" ? "bg-accent" : ""}
          >
            🇬🇧 English
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLanguageChange("ta")}
            className={currentLanguage === "ta" ? "bg-accent" : ""}
          >
            🇮🇳 தமிழ் (Tamil)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>
    </div>
  );
}

// Add CSS to hide Google Translate branding
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .goog-te-banner-frame.skiptranslate,
    .goog-te-gadget-icon {
      display: none !important;
    }
    
    body {
      top: 0px !important;
    }
    
    .goog-te-combo {
      display: none !important;
    }
    
    .goog-te-menu-value {
      color: transparent !important;
    }
  `;
  document.head.appendChild(style);
}