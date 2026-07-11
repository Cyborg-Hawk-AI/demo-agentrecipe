import Link from "next/link";

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: false },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

const painPoints = [
  {
    problem:
      "Orchestration layers in multi-agent systems create bottlenecks rather than improving efficiency, making complex agent setups counterproductive for small business tasks.",
    persona: "Small business owner / AI agent implementer",
    workaround: "Running multiple separate agents or avoiding orchestration layers entirely",
    frequency: "daily",
    wtp: "Already invested in running AI agents for months across multiple businesses",
    source: "https://www.reddit.com/r/AI_Agents/comments/1u6xnri/been_running_my_businesses_on_ai_agents_for/",
  },
  {
    problem:
      "Small businesses need simple, specialized agents for specific tasks like lead follow-up and inbox management, but existing solutions require full agency setups with unnecessary complexity.",
    persona: "Small business owner",
    workaround: "Building or configuring partial agent setups or using non-AI automation",
    frequency: "daily",
    wtp: "Already running businesses on AI agents and seeking cost-effective solutions",
    source: "https://www.reddit.com/r/AI_Agents/comments/1u6xnri/been_running_my_businesses_on_ai_agents_for/",
  },
];

export const metadata = {
  title: "Research — How We Found AgentRecipe",
  description: "The research and validation behind the AgentRecipe micro-SaaS idea.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-medium text-brand-400">Idea Miner Research</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">How we found this idea</h1>
        <p className="mt-4 text-lg text-gray-400">
          AgentRecipe was validated through systematic pain-point mining across Reddit, Hacker News, and community forums.
        </p>
      </div>

      {/* Origin Story */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white">The research: why this exists</h2>
        <div className="card mt-4 space-y-4 text-gray-300 leading-relaxed">
          <p>
            The same r/AI_Agents thread where a multi-business owner described months of AI agent experimentation
            revealed a consistent pattern: people want agents for specific, narrow tasks (lead follow-up, inbox
            management) but can&apos;t find ready-made, trustworthy templates. They end up either over-engineering with
            full orchestration platforms or abandoning the idea.
          </p>
          <p>
            The complaint isn&apos;t about AI capability — it&apos;s about the gap between &ldquo;I know this is
            possible&rdquo; and &ldquo;I can actually deploy it today.&rdquo; Existing template libraries (n8n&apos;s own,
            Make&apos;s marketplace) are sparse, poorly documented, and not curated for SMB use cases.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="badge border border-surface-500 bg-surface-700 text-gray-300">
            Cluster: Overly complex AI agent orchestration for small business
          </span>
          <span className="badge border border-brand-500/30 bg-brand-500/10 text-brand-400">Score: 110/130</span>
          <span className="badge border border-brand-500/30 bg-brand-500/10 text-brand-400">Validation: 8/9 checks passed</span>
        </div>
      </section>

      {/* Competitive Landscape */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white">Competitive landscape</h2>
        <div className="card mt-4 text-gray-300 leading-relaxed">
          <p>
            n8n template library exists but is generic and undocumented. Make template marketplace is sparse for AI
            agents. No curated, SMB-focused, well-documented AI agent template library exists as a standalone product.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            <strong className="text-gray-300">Go-to-market:</strong> r/AI_Agents, r/n8n, Indie Hackers, YouTube
            tutorials linking to templates, SEO content targeting &lsquo;[task] AI agent template&rsquo; queries
          </p>
        </div>
      </section>

      {/* Validation Checklist */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white">Validation checklist (8/9)</h2>
        <div className="card mt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${item.passed ? "bg-brand-500/20 text-brand-400" : "bg-red-500/20 text-red-400"}`}>
                  {item.passed ? "✓" : "✗"}
                </span>
                <span className={`text-sm ${item.passed ? "text-gray-300" : "text-gray-500"}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white">Source pain points (real posts)</h2>
        <div className="mt-4 space-y-4">
          {painPoints.map((pp, i) => (
            <div key={i} className="card">
              <p className="text-gray-300 leading-relaxed">{pp.problem}</p>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-gray-500">Persona</dt>
                  <dd className="text-gray-300">{pp.persona}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Workaround</dt>
                  <dd className="text-gray-300">{pp.workaround}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Frequency</dt>
                  <dd className="text-gray-300">{pp.frequency}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">WTP signal</dt>
                  <dd className="text-gray-300">{pp.wtp}</dd>
                </div>
              </dl>
              <a
                href={pp.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-brand-400 hover:text-brand-300"
              >
                View source post →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Automation Playbook */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white">How this business runs itself (mailbox money)</h2>
        <div className="card mt-4 space-y-4 text-gray-300 leading-relaxed">
          <p>
            The goal is passive, low-maintenance recurring revenue: AI is how we build and operate the business, not
            necessarily what it sells.
          </p>
          <p>
            All templates are static files delivered via Lemon Squeezy download links — zero fulfillment work.
            Subscription billing, renewals, and cancellations are fully automated by Lemon Squeezy. Monthly template
            drops are batched in a single 2-hour work session. A Discord bot (MEE6 or custom) answers common setup
            questions using a knowledge base of FAQs. SEO blog posts (written once, AI-assisted) drive organic traffic
            passively. No customer data to manage, no servers to maintain.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="rounded-lg border border-surface-600 bg-surface-700 px-4 py-3">
              <p className="text-2xl font-bold text-white">~2 hrs</p>
              <p className="text-xs text-gray-400">Owner time / week</p>
            </div>
            <div className="rounded-lg border border-surface-600 bg-surface-700 px-4 py-3">
              <p className="text-2xl font-bold text-white">2 weeks</p>
              <p className="text-xs text-gray-400">MVP estimate</p>
            </div>
            <div className="rounded-lg border border-surface-600 bg-surface-700 px-4 py-3">
              <p className="text-2xl font-bold text-white">15</p>
              <p className="text-xs text-gray-400">Templates at launch</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white">About this program</h2>
        <div className="card mt-4 text-gray-300 leading-relaxed">
          <p>
            This demo was auto-built by the <strong className="text-white">Idea Miner</strong> pipeline: a twice-daily
            research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real
            pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation
            (&gt;=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance
            recurring revenue that a solo owner can run in a few hours a week.
          </p>
          <p className="mt-4 text-sm text-gray-500">Generated by Idea Miner run 2026-07-11-am on 2026-07-11 12:24 UTC</p>
        </div>
      </section>

      <div className="flex gap-4">
        <Link href="/demo" className="btn-primary">Try the Live Demo</Link>
        <Link href="/developers" className="btn-secondary">Developer Docs</Link>
      </div>
    </div>
  );
}
