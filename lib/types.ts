export type BusinessType = "e-commerce" | "service" | "saas";
export type TaskCategory = "sales" | "ops" | "support";
export type TemplateFormat = "n8n" | "make" | "python";

export interface Template {
  id: string;
  name: string;
  description: string;
  businessType: BusinessType;
  category: TaskCategory;
  format: TemplateFormat;
  downloads: number;
  rating: number;
  reviewCount: number;
  price: number;
  isNew: boolean;
  isFeatured: boolean;
  setupTime: string;
  author: string;
  lastUpdated: string;
  tags: string[];
  setupGuide: string[];
  apiKeys: { name: string; required: boolean; docsUrl: string }[];
  inputs: { name: string; type: string; description: string }[];
  outputs: { name: string; type: string; description: string }[];
  testChecklist: { id: string; label: string; completed: boolean }[];
}

export interface VoteCandidate {
  id: string;
  title: string;
  description: string;
  votes: number;
  businessType: BusinessType;
  category: TaskCategory;
  requestedBy: string;
  status: "voting" | "in-development" | "shipped";
}

export interface DiscordMessage {
  id: string;
  author: string;
  avatar: string;
  channel: string;
  content: string;
  timestamp: string;
  reactions: { emoji: string; count: number }[];
}

export interface ActivityItem {
  id: string;
  type: "download" | "vote" | "purchase" | "update" | "community";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

export interface MonthlyDrop {
  month: string;
  templates: string[];
  totalDownloads: number;
  communityVotes: number;
}
