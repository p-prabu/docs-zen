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
          includedLanguages: 'en,ta',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      };
      
      document.head.appendChild(script);
    };

    addGoogleTranslateScript();
  }, []);

  const changeLanguage = (langCode: string) => {
    const iframe = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (innerDoc) {
        const langOptions = innerDoc.querySelectorAll('.goog-te-menu2-item span.text');
        langOptions.forEach((option: any) => {
          if (option.textContent.includes(langCode === 'ta' ? 'Tamil' : 'English')) {
            option.click();
          }
        });
      }
    } else {
      // Fallback method
      const selectElement = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event('change'));
      }
    }
  };

  const handleLanguageChange = (language: "en" | "ta") => {
    setCurrentLanguage(language);
    
    // Wait for Google Translate to be ready
    const checkAndTranslate = () => {
      if ((window as any).google?.translate) {
        changeLanguage(language);
      } else {
        setTimeout(checkAndTranslate, 500);
      }
    };
    
    checkAndTranslate();
  };

  // Add CSS to hide Google Translate UI
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'google-translate-styles';
    style.textContent = `
      .goog-te-banner-frame.skiptranslate,
      .goog-te-gadget-icon,
      .goog-te-gadget-simple .goog-te-menu-value span:first-child {
        display: none !important;
      }
      
      body {
        top: 0px !important;
      }
      
      #google_translate_element,
      .goog-te-gadget-simple {
        display: none !important;
      }
      
      .goog-te-menu-frame {
        max-height: 400px !important;
        overflow-y: auto !important;
      }
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
  }, []);

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
        
        {/* Google Translate Element - Hidden but functional */}
        <div id="google_translate_element" style={{ visibility: 'hidden', width: '1px', height: '1px' }}></div>
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
      
      {/* Google Translate Element - Hidden but functional */}
      <div id="google_translate_element" style={{ visibility: 'hidden', width: '1px', height: '1px' }}></div>
    </div>
  );
}