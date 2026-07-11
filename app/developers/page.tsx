import Link from "next/link";

const features = [
  {
    name: "Template Library",
    location: "/demo → Template Library tab",
    description:
      "Browse 54 agent templates with search, sort, and filter by business type (e-commerce, service, SaaS), task category (sales, ops, support), and format (n8n, Make, Python).",
  },
  {
    name: "Template Detail Modal",
    location: "/demo → Click any template card",
    description:
      "Full template documentation with four tabs: Setup Guide (step-by-step), API Keys (required integrations), Inputs/Outputs (data contract), and Test Checklist (interactive checkboxes).",
  },
  {
    name: "Search & Filter",
    location: "/demo → Library search bar and dropdowns",
    description:
      "Real-time client-side filtering across template names, descriptions, and tags. Sort by popularity, newest, or rating.",
  },
  {
    name: "Download / Purchase Flow",
    location: "/demo → Download button on template cards",
    description:
      "Pro subscribers download instantly. Free users see a purchase modal offering $9 single template or $19/mo Pro Library upgrade.",
  },
  {
    name: "Monthly Template Drops",
    location: "/demo → Monthly Drops tab",
    description:
      "Community voting for next month's templates with live vote counts. Toggle between Current Voting and Drop History showing past monthly releases.",
  },
  {
    name: "Discord Community",
    location: "/demo → Community tab",
    description:
      "Mock Discord feed with channel filtering, message posting, and auto-reply from AgentRecipe Bot simulating the FAQ bot.",
  },
  {
    name: "Dashboard Analytics",
    location: "/demo → Dashboard tab",
    description:
      "Owner-facing metrics: total templates, downloads, subscribers, revenue. Bar chart for monthly downloads, category breakdown, and activity feed.",
  },
  {
    name: "Billing & Subscription",
    location: "/demo → Billing tab",
    description:
      "Subscription status, upgrade/cancel flows, payment history table, and owned templates list.",
  },
  {
    name: "Setup Wizard",
    location: "/demo → Setup Wizard button (top bar)",
    description:
      "4-step guided onboarding: business type → template selection → tool connections → test checklist.",
  },
  {
    name: "DEV NOTE Tooltips",
    location: "/demo → Info (i) icons beside major controls",
    description:
      "Click any DEV NOTE icon to see what the control does in production and intended integration points.",
  },
];

export const metadata = {
  title: "Developer Documentation — AgentRecipe",
  description: "Feature documentation for the AgentRecipe interactive demo.",
};

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white">Developer Documentation</h1>
        <p className="mt-4 text-lg text-gray-400">
          Every feature in the AgentRecipe demo, what it mocks, and how it would work in production.
        </p>
        <Link href="/demo" className="btn-primary mt-6 inline-flex">
          Open Live Demo
        </Link>
      </div>

      <section className="mb-16">
        <h2 className="text-xl font-bold text-white">Architecture Overview</h2>
        <div className="card mt-4 font-mono text-sm text-gray-300">
          <pre className="overflow-x-auto whitespace-pre">{`Static Site (Next.js on Vercel)
├── Template docs → Notion CMS (exported as static JSON at build time)
├── Template files → S3/R2 CDN (gated download URLs from Lemon Squeezy)
├── Payments → Lemon Squeezy (subscriptions + one-time, webhooks for access)
├── Community → Discord (OAuth invite link post-purchase)
├── Voting → Typeform or in-app → Airtable → monthly batch creation
└── Analytics → Plausible or PostHog (privacy-friendly, no cookies)`}</pre>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-bold text-white">Feature Reference</h2>
        <div className="mt-6 space-y-6">
          {features.map((feature) => (
            <div key={feature.name} className="card">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                <span className="shrink-0 rounded-md bg-brand-500/10 px-2 py-1 text-xs font-medium text-brand-400">
                  {feature.location}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Mocked in Demo</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Client-side React state, hardcoded sample data in lib/mock-data.ts. No API calls, no persistence.
                  </p>
                </div>
                <div className="rounded-lg border border-brand-500/20 bg-brand-500/5 p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-400">Production Implementation</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {getProductionNote(feature.name)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-bold text-white">Data Flow: Template Download</h2>
        <div className="card mt-4 space-y-3 text-sm text-gray-300">
          <p>1. User clicks &ldquo;Download&rdquo; on a template</p>
          <p>2. <span className="text-brand-400">Demo:</span> Toast notification simulates download</p>
          <p>2. <span className="text-brand-400">Production:</span> Lemon Squeezy verifies active subscription or one-time purchase</p>
          <p>3. <span className="text-brand-400">Production:</span> Signed download URL generated (S3 presigned or Lemon Squeezy file delivery)</p>
          <p>4. <span className="text-brand-400">Production:</span> Download event logged to analytics; user redirected to setup guide</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-bold text-white">Data Flow: Community Voting</h2>
        <div className="card mt-4 space-y-3 text-sm text-gray-300">
          <p>1. Pro subscriber casts vote on template candidate</p>
          <p>2. <span className="text-brand-400">Demo:</span> Vote count increments in React state</p>
          <p>2. <span className="text-brand-400">Production:</span> Vote stored in Airtable/Supabase with user ID + timestamp</p>
          <p>3. End of month: top 3 candidates selected automatically</p>
          <p>4. Owner creates templates in 2-hour batch session, uploads to CDN, announces in Discord</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Zero-Config Deployment</h2>
        <div className="card mt-4 text-sm text-gray-300">
          <p>This demo deploys to Vercel with zero configuration:</p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-gray-400">
            <li>No environment variables required</li>
            <li>No custom server or API routes</li>
            <li>No database or auth providers</li>
            <li>Static generation via Next.js App Router</li>
            <li>All interactivity is client-side with hardcoded mock data</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function getProductionNote(featureName: string): string {
  const notes: Record<string, string> = {
    "Template Library": "Notion CMS exports template metadata as JSON at build time. ISR revalidates on new template drops.",
    "Template Detail Modal": "Template docs rendered from Notion blocks. API key docs link to integration provider pages.",
    "Search & Filter": "Client-side filter on static JSON. For 500+ templates, add Algolia or Pagefind for full-text search.",
    "Download / Purchase Flow": "Lemon Squeezy checkout overlay. Webhook grants access tier. Download links expire after 24h.",
    "Monthly Template Drops": "Votes in Airtable. Cron job tallies on last day of month. Owner batch-creates top 3.",
    "Discord Community": "Discord server with role-gated channels. MEE6 bot with FAQ knowledge base. Invite link in purchase email.",
    "Dashboard Analytics": "Lemon Squeezy dashboard for revenue. Plausible for traffic. Custom admin page optional.",
    "Billing & Subscription": "Fully managed by Lemon Squeezy. Customer portal for self-service cancel/update payment.",
    "Setup Wizard": "Post-purchase onboarding flow. Track completion via analytics events. Email drip for incomplete setups.",
    "DEV NOTE Tooltips": "Removed in production. Replaced by inline help links to documentation.",
  };
  return notes[featureName] || "See architecture overview above.";
}
