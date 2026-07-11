import type {
  ActivityItem,
  BusinessType,
  DiscordMessage,
  MonthlyDrop,
  TaskCategory,
  Template,
  TemplateFormat,
  VoteCandidate,
} from "./types";

const authors = [
  "Sarah Chen",
  "Marcus Webb",
  "Elena Rodriguez",
  "James Okafor",
  "Priya Sharma",
  "Tom Bradley",
];

const templateSeeds: {
  name: string;
  desc: string;
  business: BusinessType;
  category: TaskCategory;
  format: TemplateFormat;
  tags: string[];
}[] = [
  { name: "Abandoned Cart Recovery Agent", desc: "Re-engage shoppers who left items in cart with personalized AI follow-ups via email and SMS.", business: "e-commerce", category: "sales", format: "n8n", tags: ["shopify", "email", "recovery"] },
  { name: "Lead Qualification Bot", desc: "Score inbound leads from your website form and route hot prospects to your CRM automatically.", business: "service", category: "sales", format: "make", tags: ["crm", "leads", "scoring"] },
  { name: "Support Ticket Triage", desc: "Classify and prioritize support tickets, draft first responses, and escalate urgent issues.", business: "saas", category: "support", format: "python", tags: ["zendesk", "triage", "ai"] },
  { name: "Invoice Follow-Up Agent", desc: "Send polite payment reminders for overdue invoices and log responses in your accounting tool.", business: "service", category: "ops", format: "n8n", tags: ["quickbooks", "invoicing", "collections"] },
  { name: "Product Review Requester", desc: "Trigger review requests 7 days after delivery with sentiment-aware follow-up sequences.", business: "e-commerce", category: "sales", format: "make", tags: ["reviews", "post-purchase", "trustpilot"] },
  { name: "Meeting Notes Summarizer", desc: "Transcribe Zoom calls, extract action items, and post summaries to Slack and Notion.", business: "saas", category: "ops", format: "python", tags: ["zoom", "notion", "meetings"] },
  { name: "Churn Risk Alert", desc: "Monitor usage drops and send personalized retention offers before customers cancel.", business: "saas", category: "sales", format: "n8n", tags: ["retention", "analytics", "stripe"] },
  { name: "Inventory Reorder Agent", desc: "Watch stock levels and auto-create purchase orders when SKUs hit reorder points.", business: "e-commerce", category: "ops", format: "make", tags: ["inventory", "suppliers", "reorder"] },
  { name: "FAQ Auto-Responder", desc: "Answer common customer questions from your knowledge base before a human steps in.", business: "service", category: "support", format: "python", tags: ["faq", "chatbot", "knowledge-base"] },
  { name: "Proposal Generator", desc: "Turn discovery call notes into branded proposals with pricing tables and scope sections.", business: "service", category: "sales", format: "n8n", tags: ["proposals", "sales", "docs"] },
  { name: "Onboarding Email Sequence", desc: "Personalized 14-day onboarding drip based on user role and activation milestones.", business: "saas", category: "ops", format: "make", tags: ["onboarding", "email", "activation"] },
  { name: "Social Proof Collector", desc: "Request testimonials from happy customers and format them for your landing page.", business: "e-commerce", category: "sales", format: "python", tags: ["testimonials", "social-proof", "ugc"] },
  { name: "Refund Request Handler", desc: "Process refund requests with policy checks, approval routing, and customer notifications.", business: "e-commerce", category: "support", format: "n8n", tags: ["refunds", "policy", "stripe"] },
  { name: "Contract Renewal Reminder", desc: "Track contract end dates and initiate renewal conversations 60 days before expiry.", business: "service", category: "sales", format: "make", tags: ["contracts", "renewals", "b2b"] },
  { name: "Bug Report Classifier", desc: "Categorize GitHub issues, assign severity, and suggest duplicate merges.", business: "saas", category: "support", format: "python", tags: ["github", "bugs", "triage"] },
  { name: "Expense Receipt Scanner", desc: "Extract data from receipt photos and push entries to your expense management tool.", business: "service", category: "ops", format: "n8n", tags: ["expenses", "ocr", "receipts"] },
  { name: "Upsell Recommendation Engine", desc: "Analyze purchase history and trigger targeted upsell offers at checkout.", business: "e-commerce", category: "sales", format: "make", tags: ["upsell", "recommendations", "aov"] },
  { name: "SLA Breach Monitor", desc: "Track response times across support channels and alert managers before SLA breaches.", business: "saas", category: "support", format: "python", tags: ["sla", "monitoring", "alerts"] },
  { name: "Vendor Payment Scheduler", desc: "Schedule and approve recurring vendor payments with audit trail logging.", business: "service", category: "ops", format: "n8n", tags: ["payments", "vendors", "ap"] },
  { name: "Competitor Price Watcher", desc: "Monitor competitor pricing pages and alert you when they change prices on key SKUs.", business: "e-commerce", category: "ops", format: "python", tags: ["competitive", "pricing", "monitoring"] },
  { name: "Demo Request Router", desc: "Qualify demo requests, book calendar slots, and prep briefing docs for sales reps.", business: "saas", category: "sales", format: "make", tags: ["demos", "calendar", "sales"] },
  { name: "Warranty Claim Processor", desc: "Validate warranty claims against purchase records and issue RMA numbers automatically.", business: "e-commerce", category: "support", format: "n8n", tags: ["warranty", "rma", "claims"] },
  { name: "Client Check-In Agent", desc: "Send monthly check-in emails to retainer clients and summarize responses for account managers.", business: "service", category: "ops", format: "python", tags: ["retainer", "check-in", "account-mgmt"] },
  { name: "Trial Conversion Nudger", desc: "Identify trial users near expiry and send behavior-based conversion sequences.", business: "saas", category: "sales", format: "n8n", tags: ["trial", "conversion", "saas"] },
  { name: "Shipping Delay Notifier", desc: "Proactively notify customers of shipping delays with updated ETAs and compensation offers.", business: "e-commerce", category: "support", format: "make", tags: ["shipping", "notifications", "cx"] },
  { name: "Job Application Screener", desc: "Score incoming job applications against your criteria and schedule interviews for top candidates.", business: "service", category: "ops", format: "python", tags: ["hiring", "hr", "screening"] },
  { name: "NPS Survey Analyzer", desc: "Send NPS surveys, analyze responses with sentiment, and route detractors to support.", business: "saas", category: "support", format: "n8n", tags: ["nps", "feedback", "sentiment"] },
  { name: "Quote Follow-Up Agent", desc: "Follow up on sent quotes at optimal intervals until closed-won or closed-lost.", business: "service", category: "sales", format: "make", tags: ["quotes", "follow-up", "pipeline"] },
  { name: "Subscription Dunning Agent", desc: "Recover failed subscription payments with smart retry logic and dunning emails.", business: "saas", category: "ops", format: "python", tags: ["dunning", "stripe", "billing"] },
  { name: "Return Label Generator", desc: "Auto-generate return shipping labels and update inventory when returns are initiated.", business: "e-commerce", category: "ops", format: "n8n", tags: ["returns", "shipping", "labels"] },
  { name: "Referral Program Tracker", desc: "Track referral links, attribute conversions, and trigger reward payouts automatically.", business: "e-commerce", category: "sales", format: "make", tags: ["referrals", "rewards", "growth"] },
  { name: "Knowledge Base Updater", desc: "Turn resolved support tickets into draft KB articles for human review and publishing.", business: "saas", category: "support", format: "python", tags: ["kb", "documentation", "deflection"] },
  { name: "Appointment Reminder Bot", desc: "Send SMS and email reminders for upcoming appointments with easy reschedule links.", business: "service", category: "ops", format: "n8n", tags: ["appointments", "reminders", "calendly"] },
  { name: "Competitor Mention Alert", desc: "Monitor social media for competitor mentions and alert your marketing team with context.", business: "saas", category: "sales", format: "python", tags: ["social", "monitoring", "competitive"] },
  { name: "Bulk Order Processor", desc: "Handle wholesale bulk orders with custom pricing rules and approval workflows.", business: "e-commerce", category: "ops", format: "make", tags: ["wholesale", "b2b", "orders"] },
  { name: "Client Onboarding Checklist", desc: "Guide new clients through onboarding steps with automated task assignments and reminders.", business: "service", category: "ops", format: "n8n", tags: ["onboarding", "clients", "checklist"] },
  { name: "Feature Request Aggregator", desc: "Cluster similar feature requests from multiple channels and rank by demand.", business: "saas", category: "ops", format: "python", tags: ["product", "feedback", "roadmap"] },
  { name: "Loyalty Points Calculator", desc: "Calculate and apply loyalty points on purchases with tier-based multipliers.", business: "e-commerce", category: "sales", format: "make", tags: ["loyalty", "rewards", "retention"] },
  { name: "Escalation Router", desc: "Route complex support cases to the right specialist based on issue type and customer tier.", business: "saas", category: "support", format: "n8n", tags: ["escalation", "routing", "tier"] },
  { name: "Timesheet Reminder", desc: "Nudge freelancers and contractors to submit timesheets before payroll deadlines.", business: "service", category: "ops", format: "python", tags: ["timesheets", "payroll", "reminders"] },
  { name: "Cross-Sell Email Agent", desc: "Identify cross-sell opportunities from order data and send personalized product recommendations.", business: "e-commerce", category: "sales", format: "n8n", tags: ["cross-sell", "email", "personalization"] },
  { name: "Status Page Updater", desc: "Auto-update your status page when monitoring alerts fire and post-incident summaries.", business: "saas", category: "ops", format: "make", tags: ["status-page", "incidents", "uptime"] },
  { name: "Review Response Drafter", desc: "Draft on-brand responses to Google and Yelp reviews for human approval before posting.", business: "service", category: "support", format: "python", tags: ["reviews", "reputation", "local"] },
  { name: "Flash Sale Launcher", desc: "Coordinate flash sale launches across email, SMS, and social with inventory sync.", business: "e-commerce", category: "sales", format: "n8n", tags: ["flash-sale", "promotions", "multi-channel"] },
  { name: "Partner Commission Calculator", desc: "Calculate partner commissions from deal data and generate monthly payout reports.", business: "saas", category: "ops", format: "make", tags: ["partners", "commissions", "payouts"] },
  { name: "Scope Creep Detector", desc: "Analyze client emails for out-of-scope requests and alert project managers.", business: "service", category: "ops", format: "python", tags: ["scope", "projects", "alerts"] },
  { name: "Win-Back Campaign Agent", desc: "Re-engage lapsed customers with personalized offers based on their purchase history.", business: "e-commerce", category: "sales", format: "n8n", tags: ["win-back", "lapsed", "reactivation"] },
  { name: "API Usage Alert", desc: "Monitor API usage against plan limits and notify customers before overage charges.", business: "saas", category: "support", format: "python", tags: ["api", "usage", "billing"] },
  { name: "Seasonal Inventory Planner", desc: "Forecast seasonal demand and suggest inventory adjustments based on historical data.", business: "e-commerce", category: "ops", format: "make", tags: ["forecasting", "seasonal", "inventory"] },
  { name: "Case Study Generator", desc: "Turn project completion data into draft case studies for marketing review.", business: "service", category: "sales", format: "n8n", tags: ["case-studies", "marketing", "content"] },
  { name: "Release Notes Writer", desc: "Generate customer-facing release notes from merged PR descriptions and changelog entries.", business: "saas", category: "ops", format: "python", tags: ["releases", "changelog", "product"] },
  { name: "Gift Card Fulfillment", desc: "Process digital gift card orders and deliver codes instantly with fraud checks.", business: "e-commerce", category: "ops", format: "make", tags: ["gift-cards", "fulfillment", "fraud"] },
  { name: "Consultation Prep Agent", desc: "Research prospect companies before sales calls and compile briefing documents.", business: "service", category: "sales", format: "python", tags: ["research", "sales-prep", "briefing"] },
  { name: "Multi-Language Support Router", desc: "Detect customer language and route tickets to agents who speak that language.", business: "saas", category: "support", format: "n8n", tags: ["i18n", "routing", "language"] },
  { name: "Subscription Upgrade Suggester", desc: "Identify users hitting plan limits and suggest upgrades with ROI calculations.", business: "saas", category: "sales", format: "make", tags: ["upgrade", "expansion", "mrr"] },
];

function generateTemplates(): Template[] {
  return templateSeeds.map((seed, i) => {
    const id = `tpl-${String(i + 1).padStart(3, "0")}`;
    const downloads = 120 + Math.floor(Math.random() * 2800);
    const rating = 4.2 + Math.random() * 0.7;
    const daysAgo = Math.floor(Math.random() * 180);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    return {
      id,
      name: seed.name,
      description: seed.desc,
      businessType: seed.business,
      category: seed.category,
      format: seed.format,
      downloads,
      rating: Math.round(rating * 10) / 10,
      reviewCount: Math.floor(downloads * 0.15),
      price: 9,
      isNew: daysAgo < 30,
      isFeatured: i < 6,
      setupTime: `${15 + (i % 4) * 10} min`,
      author: authors[i % authors.length],
      lastUpdated: date.toISOString().split("T")[0],
      tags: seed.tags,
      setupGuide: [
        "Download the template file and import it into your automation platform.",
        "Connect the required API integrations listed in the API Keys section.",
        "Configure input mappings to match your existing tools (CRM, email, etc.).",
        "Run the built-in test mode with sample data to verify the workflow.",
        "Enable the agent and monitor the activity log for the first 24 hours.",
      ],
      apiKeys: [
        { name: "OpenAI API Key", required: true, docsUrl: "https://platform.openai.com/api-keys" },
        { name: seed.format === "n8n" ? "n8n Webhook URL" : seed.format === "make" ? "Make.com API Token" : "Python Runtime (3.10+)", required: true, docsUrl: "#" },
        { name: getIntegrationKey(seed.business, seed.category), required: true, docsUrl: "#" },
        { name: "Slack Webhook (optional)", required: false, docsUrl: "#" },
      ],
      inputs: [
        { name: "trigger_event", type: "webhook", description: "Event that starts the agent workflow" },
        { name: "customer_data", type: "object", description: "Customer profile and contact information" },
        { name: "config_overrides", type: "object", description: "Optional settings to customize behavior" },
      ],
      outputs: [
        { name: "action_taken", type: "string", description: "Summary of what the agent did" },
        { name: "notification_sent", type: "boolean", description: "Whether a notification was dispatched" },
        { name: "log_entry", type: "object", description: "Structured log for audit trail" },
      ],
      testChecklist: [
        { id: "t1", label: "API keys validated and connected", completed: false },
        { id: "t2", label: "Test trigger fires successfully", completed: false },
        { id: "t3", label: "Output matches expected format", completed: false },
        { id: "t4", label: "Error handling tested with bad input", completed: false },
        { id: "t5", label: "Notifications delivered to correct channel", completed: false },
        { id: "t6", label: "Production run logged without errors", completed: false },
      ],
    };
  });
}

function getIntegrationKey(business: BusinessType, category: TaskCategory): string {
  const map: Record<string, string> = {
    "e-commerce-sales": "Shopify API Key",
    "e-commerce-ops": "Shopify Admin API",
    "e-commerce-support": "Gorgias API Token",
    "service-sales": "HubSpot API Key",
    "service-ops": "QuickBooks API Token",
    "service-support": "Freshdesk API Key",
    "saas-sales": "Stripe API Key",
    "saas-ops": "Notion Integration Token",
    "saas-support": "Intercom Access Token",
  };
  return map[`${business}-${category}`] || "CRM API Key";
}

export const templates: Template[] = generateTemplates();

export const voteCandidates: VoteCandidate[] = [
  { id: "v1", title: "Multi-Channel Order Sync Agent", description: "Sync orders across Shopify, Amazon, and Etsy with conflict resolution.", votes: 847, businessType: "e-commerce", category: "ops", requestedBy: "Mike Torres — Outdoor Gear Co.", status: "voting" },
  { id: "v2", title: "Client Portal Auto-Provisioner", description: "Create client portals, folders, and welcome emails when deals close in HubSpot.", votes: 623, businessType: "service", category: "ops", requestedBy: "Lisa Park — Park Consulting", status: "voting" },
  { id: "v3", title: "Usage-Based Billing Reconciler", description: "Reconcile metered usage data with Stripe invoices and flag discrepancies.", votes: 591, businessType: "saas", category: "ops", requestedBy: "David Kim — MetricFlow", status: "voting" },
  { id: "v4", title: "Instagram DM Sales Agent", description: "Qualify leads from Instagram DMs and book discovery calls automatically.", votes: 534, businessType: "e-commerce", category: "sales", requestedBy: "Aisha Johnson — Bloom Boutique", status: "voting" },
  { id: "v5", title: "SOW Compliance Checker", description: "Compare project deliverables against SOW and alert on scope deviations.", votes: 412, businessType: "service", category: "ops", requestedBy: "Ryan Foster — Foster Digital", status: "in-development" },
  { id: "v6", title: "Security Questionnaire Auto-Filler", description: "Fill out vendor security questionnaires from your existing compliance docs.", votes: 389, businessType: "saas", category: "support", requestedBy: "Nina Patel — SecureStack", status: "in-development" },
  { id: "v7", title: "Wholesale Price List Generator", description: "Generate tiered wholesale price lists from your retail catalog.", votes: 298, businessType: "e-commerce", category: "sales", requestedBy: "Carlos Mendez — Mendez Apparel", status: "shipped" },
  { id: "v8", title: "Podcast Guest Outreach Agent", description: "Find and pitch podcast guests based on your content calendar.", votes: 267, businessType: "service", category: "sales", requestedBy: "Emma Walsh — Walsh Media", status: "shipped" },
];

export const discordMessages: DiscordMessage[] = [
  { id: "d1", author: "Sarah Chen", avatar: "SC", channel: "#setup-help", content: "Just deployed the Lead Qualification Bot — took me 22 minutes start to finish. The HubSpot mapping step in the guide was super clear.", timestamp: "2026-07-11T09:14:00Z", reactions: [{ emoji: "🎉", count: 12 }, { emoji: "👍", count: 8 }] },
  { id: "d2", author: "Marcus Webb", avatar: "MW", channel: "#template-requests", content: "Would love a template for syncing orders across Shopify + Amazon. Running 3 stores and doing this manually every morning.", timestamp: "2026-07-10T16:42:00Z", reactions: [{ emoji: "⬆️", count: 23 }] },
  { id: "d3", author: "AgentRecipe Bot", avatar: "AR", channel: "#setup-help", content: "📋 **FAQ:** To connect your OpenAI key, go to Settings → Integrations → OpenAI and paste your sk-... key. Test with the built-in ping endpoint before enabling production.", timestamp: "2026-07-10T14:30:00Z", reactions: [{ emoji: "✅", count: 15 }] },
  { id: "d4", author: "Elena Rodriguez", avatar: "ER", channel: "#wins", content: "Churn Risk Alert caught 4 at-risk accounts last week. Saved $2,400 MRR with the retention sequence. Template paid for itself 130x over.", timestamp: "2026-07-09T11:20:00Z", reactions: [{ emoji: "🔥", count: 31 }, { emoji: "💰", count: 18 }] },
  { id: "d5", author: "James Okafor", avatar: "JO", channel: "#july-drop", content: "The Wholesale Price List Generator from last month's vote is live! Already using it for our fall catalog.", timestamp: "2026-07-08T08:55:00Z", reactions: [{ emoji: "🚀", count: 9 }] },
  { id: "d6", author: "Priya Sharma", avatar: "PS", channel: "#setup-help", content: "Having trouble with the Make.com webhook on Windows. Anyone else hit this? Error says 'connection refused on port 5678'.", timestamp: "2026-07-07T19:10:00Z", reactions: [{ emoji: "🤔", count: 4 }] },
  { id: "d7", author: "AgentRecipe Bot", avatar: "AR", channel: "#setup-help", content: "📋 **FAQ:** Make.com webhooks on Windows require allowing port 5678 through Windows Firewall. See the troubleshooting section in the template guide (Step 3b).", timestamp: "2026-07-07T19:15:00Z", reactions: [{ emoji: "✅", count: 7 }] },
  { id: "d8", author: "Tom Bradley", avatar: "TB", channel: "#general", content: "July drop voting is open! Cast your votes — top 3 get built this month. I'm voting for the Usage-Based Billing Reconciler.", timestamp: "2026-07-01T10:00:00Z", reactions: [{ emoji: "🗳️", count: 22 }] },
];

export const activityFeed: ActivityItem[] = [
  { id: "a1", type: "download", title: "Template downloaded", description: "Abandoned Cart Recovery Agent — n8n format", timestamp: "2026-07-11T11:45:00Z", user: "You" },
  { id: "a2", type: "vote", title: "Vote cast", description: "Multi-Channel Order Sync Agent (+1 vote)", timestamp: "2026-07-11T10:30:00Z", user: "You" },
  { id: "a3", type: "update", title: "Template updated", description: "Support Ticket Triage v2.1 — improved escalation logic", timestamp: "2026-07-10T09:00:00Z" },
  { id: "a4", type: "community", title: "Discord reply", description: "AgentRecipe Bot answered your setup question in #setup-help", timestamp: "2026-07-09T14:22:00Z", user: "You" },
  { id: "a5", type: "purchase", title: "Subscription renewed", description: "Pro Library — $19.00 charged to Visa •••• 4242", timestamp: "2026-07-01T00:01:00Z", user: "You" },
  { id: "a6", type: "download", title: "Template downloaded", description: "Churn Risk Alert — Python format", timestamp: "2026-06-28T16:10:00Z", user: "You" },
  { id: "a7", type: "update", title: "July drop shipped", description: "3 new templates: Wholesale Price List, Podcast Outreach, API Usage Alert", timestamp: "2026-07-01T08:00:00Z" },
  { id: "a8", type: "community", title: "New community member", description: "847 members in AgentRecipe Discord (+12 this week)", timestamp: "2026-06-25T12:00:00Z" },
];

export const monthlyDrops: MonthlyDrop[] = [
  { month: "July 2026", templates: ["Wholesale Price List Generator", "Podcast Guest Outreach Agent", "API Usage Alert"], totalDownloads: 1247, communityVotes: 2847 },
  { month: "June 2026", templates: ["Subscription Dunning Agent", "Review Response Drafter", "Feature Request Aggregator"], totalDownloads: 1089, communityVotes: 2156 },
  { month: "May 2026", templates: ["Win-Back Campaign Agent", "Case Study Generator", "Escalation Router"], totalDownloads: 967, communityVotes: 1923 },
  { month: "April 2026", templates: ["Flash Sale Launcher", "Consultation Prep Agent", "Knowledge Base Updater"], totalDownloads: 834, communityVotes: 1678 },
];

export const dashboardStats = {
  totalTemplates: templates.length,
  totalDownloads: templates.reduce((sum, t) => sum + t.downloads, 0),
  activeSubscribers: 2847,
  communityMembers: 847,
  monthlyRevenue: 54193,
  avgSetupTime: "28 min",
  templatesThisMonth: 3,
  votesThisMonth: 2847,
};

export const chartData = {
  downloadsByMonth: [
    { month: "Feb", downloads: 4200 },
    { month: "Mar", downloads: 5100 },
    { month: "Apr", downloads: 5800 },
    { month: "May", downloads: 6200 },
    { month: "Jun", downloads: 7100 },
    { month: "Jul", downloads: 8400 },
  ],
  templatesByCategory: [
    { category: "Sales", count: 18 },
    { category: "Ops", count: 20 },
    { category: "Support", count: 17 },
  ],
  revenueByMonth: [
    { month: "Feb", revenue: 38200 },
    { month: "Mar", revenue: 41500 },
    { month: "Apr", revenue: 44800 },
    { month: "May", revenue: 47200 },
    { month: "Jun", revenue: 50900 },
    { month: "Jul", revenue: 54193 },
  ],
};

export const purchasedTemplates = ["tpl-001", "tpl-003", "tpl-007", "tpl-012", "tpl-023"];

export const businessTypeLabels: Record<BusinessType, string> = {
  "e-commerce": "E-commerce",
  service: "Service Business",
  saas: "SaaS",
};

export const categoryLabels: Record<TaskCategory, string> = {
  sales: "Sales",
  ops: "Operations",
  support: "Support",
};

export const formatLabels: Record<TemplateFormat, string> = {
  n8n: "n8n JSON",
  make: "Make Blueprint",
  python: "Python Script",
};

export const formatColors: Record<TemplateFormat, string> = {
  n8n: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  make: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  python: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};
