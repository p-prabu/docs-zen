// Import all blog posts from category folders
import { adIntro } from './activedirectory/ad-intro';
import { adDomain } from './activedirectory/ad-domain';
import { adSchema } from './activedirectory/ad-schema';
import { adTempGroups } from './activedirectory/ad-temp-groups';
import { entraIntro } from './entra/entra-intro';
import { entraOuVsAu } from './entra/entra-ou-vs-au';
import { eam } from './entra/eam';
import { psIntro } from './powershell/ps-intro';
import { psWriteHTML } from './powershell/ps-writehtml';
import { gpIntro } from './grouppolicy/gp-intro';
import { intuneIntro } from './intune/intune-intro';
import { aiIntro } from './ai/ai-intro';
import { adDsrmPassword } from './activedirectory/ad-dsrm-password';
import { adHealthCheck } from './activedirectory/ad-health-check';


export interface BlogPost {
  id: string;
  title: string;
  category: string;
  body: string;
  headings: { id: string; text: string; level: number }[];
}

export const blogCategories = [
  {
    id: "activedirectory",
    title: "Active Directory",
    posts: ["ad-intro", "ad-domain", "ad-schema", "ad-temp-groups", "ad-dsrm-password","ad-health-check"]
  },
  {
    id: "entra",
    title: "Entra ID",
    posts: ["entra-intro", "entra-ou-vs-au", "eam"]
  },
  {
    id: "powershell",
    title: "PowerShell",
    posts: ["ps-intro", "ps-writehtml"]
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
  "ad-temp-groups": adTempGroups,
  "ad-dsrm-password": adDsrmPassword,
  "ad-health-check": adHealthCheck, // ← add this
  
  // Entra ID posts
  "entra-intro": entraIntro,
  "entra-ou-vs-au": entraOuVsAu,
  "eam": eam, // ← add this
  
  // PowerShell posts
  "ps-intro": psIntro,
  "ps-writehtml": psWriteHTML,
  
  // Group Policy posts
  "gp-intro": gpIntro,
  
  // Intune posts
  "intune-intro": intuneIntro,
  
  // AI posts
  "ai-intro": aiIntro,
};