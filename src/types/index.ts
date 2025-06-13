
export interface User {
  id: string;
  email: string;
  name?: string;
  role: "founder" | "investor" | null; 
  avatarUrl?: string;
}

export type StartupStage = "Idea" | "Pre-Seed" | "Seed" | "MVP" | "Growth" | "Series A" | "Series B+" | "Acquired" | "Others";

export interface Startup {
  id: string;
  logoUrl: string;
  name: string;
  industry: string;
  stage: StartupStage;
  summary: string;
  founderId: string;
  // pitchDeckUrl?: string; // Removed
  // videoLink?: string; // Removed
  // tags?: string[]; // Removed - Storing as a string in form, but not in main Startup object for now
}

export interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  imageUrl: string;
  source: string;
  date: string;
  category: "Startup News" | "Stock Market Updates" | "Funding Rounds" | "Tech & AI";
  link: string;
  dataAiHint?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}
