// Import all blog posts from category folders
import { adIntro } from './activedirectory/ad-intro';
import { adDomain } from './activedirectory/ad-domain';
import { adSchema } from './activedirectory/ad-schema';
import { entraIntro } from './entra/entra-intro';
import { psIntro } from './powershell/ps-intro';
import { gpIntro } from './grouppolicy/gp-intro';
import { intuneIntro } from './intune/intune-intro';
import { aiIntro } from './ai/ai-intro';

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  content: string;
  headings: { id: string; text: string; level: number }[];
}

export const blogCategories = [
  {
    id: "activedirectory",
    title: "Active Directory",
    posts: ["ad-intro", "ad-domain", "ad-schema"]
  },
  {
    id: "entra",
    title: "Entra ID",
    posts: ["entra-intro"]
  },
  {
    id: "powershell",
    title: "PowerShell",
    posts: ["ps-intro"]
  },
  {
    id: "grouppolicy",
    title: "Group Policy",
    posts: ["gp-intro"]
  },
  {
    id: "intune",
    title: "Intune",
    posts: ["intune-intro"]
  },
  {
    id: "ai",
    title: "AI",
    posts: ["ai-intro"]
  }
];

export const blogPosts: Record<string, BlogPost> = {
  // Active Directory posts
  "ad-intro": adIntro,
  "ad-domain": adDomain,
  "ad-schema": adSchema,
  
  // Entra ID posts
  "entra-intro": entraIntro,
  
  // PowerShell posts
  "ps-intro": psIntro,
  
  // Group Policy posts
  "gp-intro": gpIntro,
  
  // Intune posts
  "intune-intro": intuneIntro,
  
  // AI posts
  "ai-intro": aiIntro,
};