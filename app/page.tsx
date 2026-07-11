import Link from "next/link";

const features = [
  {
    title: "50+ Proven Templates",
    description:
      "n8n JSON, Make blueprints, and Python scripts for lead follow-up, inbox triage, cart recovery, and more — each built from real SMB pain points.",
    icon: "📚",
  },
  {
    title: "Plain-English Setup Guides",
    description:
      "Every template includes step-by-step instructions, required API keys, expected inputs/outputs, and a test checklist you can run in under 30 minutes.",
    icon: "📋",
  },
  {
    title: "Search & Filter",
    description:
      "Find the right agent by business type (e-commerce, service, SaaS) and task category (sales, ops, support). No more digging through generic marketplaces.",
    icon: "🔍",
  },
  {
    title: "Monthly Template Drops",
    description:
      "2–4 new templates every month, chosen by community voting. The library grows with what small business owners actually need.",
    icon: "🗳️",
  },
  {
    title: "Private Discord Community",
    description:
      "Get setup help, share wins, and request templates. A FAQ bot handles 80% of common questions automatically.",
    icon: "💬",
  },
  {
    title: "Mailbox Money Ops",
    description:
      "Static file delivery via Lemon Squeezy, automated billing, and batch template creation. Estimated owner time: 2 hours/week.",
    icon: "📬",
  },
];

const pricingPlans = [
  {
    name: "Single Template",
    price: "$9",
    period: "one-time",
    description: "Perfect for trying one workflow before committing.",
    features: ["1 template download", "Setup guide & test checklist", "30-day update access", "Discord community access"],
    cta: "Buy a Template",
    highlighted: false,
  },
  {
    name: "Pro Library",
    price: "$19",
    period: "/month",
    description: "Full access to every template, plus monthly drops.",
    features: [
      "All 50+ templates",
      "Monthly new drops (2–4)",
      "Community voting rights",
      "Priority Discord support",
      "Lifetime updates on downloaded templates",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400">
              <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
              54 templates · 2,847 subscribers · 847 Discord members
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Deploy AI agents{" "}
              <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                this afternoon
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Curated, copy-paste AI agent templates for common small business workflows. No agency rates, no
              orchestration complexity — just proven templates with plain-English setup guides.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo" className="btn-primary px-8 py-3 text-base">
                Explore Live Demo
              </Link>
              <Link href="/research" className="btn-secondary px-8 py-3 text-base">
                How we found this idea
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-surface-600 bg-surface-800/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { value: "54", label: "Agent templates" },
            { value: "28 min", label: "Avg. setup time" },
            { value: "$19", label: "Full library /mo" },
            { value: "2 hrs", label: "Owner time /week" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need to deploy today</h2>
            <p className="mt-4 text-lg text-gray-400">
              Built for small business owners who know AI agents are possible — they just need a trustworthy starting point.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="card group transition-colors hover:border-brand-500/30">
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white group-hover:text-brand-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-surface-600 bg-surface-800/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Simple, honest pricing</h2>
            <p className="mt-4 text-lg text-gray-400">Low enough to remove the &ldquo;is it worth trying?&rdquo; barrier.</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card relative ${plan.highlighted ? "border-brand-500/50 ring-1 ring-brand-500/20" : ""}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-0.5 text-brand-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-8 block w-full text-center ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-brand-600/5" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white">See the full product in action</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Browse 54 templates, vote on next month&apos;s drops, explore the Discord community, and walk through
                complete setup guides — all in our interactive demo.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/demo" className="btn-primary px-8 py-3 text-base">
                  Open Live Demo
                </Link>
                <Link href="/developers" className="btn-secondary px-8 py-3 text-base">
                  Developer Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
