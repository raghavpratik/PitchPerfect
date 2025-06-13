export interface User {
  id: string;
  email: string;
  name?: string;
  role: "founder" | "investor" | null; // Allow null for initial state before role selection
  avatarUrl?: string;
}

export type StartupStage = "Idea" | "MVP" | "Growth";

export interface Startup {
  id: string;
  logoUrl: string;
  name: string;
  industry: string;
  stage: StartupStage;
  summary: string;
  pitchDeckUrl?: string;
  videoLink?: string;
  tags: string[];
  founderId: string;
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
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}
