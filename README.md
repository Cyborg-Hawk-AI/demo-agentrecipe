# AgentRecipe

> Curated, copy-paste AI agent templates for common small business workflows.

## What is AgentRecipe?

AgentRecipe is built for **Small business owners and solo operators who want to deploy AI agents but don't want to build from scratch or pay agency rates — they want proven, documented templates they can configure in an afternoon.**. Templates are built from real complaints in Reddit threads — each one solves a documented, recurring pain. The library grows with community input, creating a flywheel. Low price point removes the 'is it worth trying' barrier.

### Core MVP features
- Library of 50+ single-task agent templates (n8n JSON, Make blueprints, Python scripts) for common SMB jobs
- Each template includes: plain-English setup guide, required API keys, expected inputs/outputs, and a test checklist
- Search and filter by business type (e-commerce, service, SaaS) and task category (sales, ops, support)
- Monthly new template drops (2–4 per month) based on community voting
- Private Discord community for template questions and sharing

**Pricing:** Monthly subscription for full library access; one-time purchase for individual templates at $19/month for full library; $9 per individual template

## The research: why this exists

The same r/AI_Agents thread where a multi-business owner described months of AI agent experimentation revealed a consistent pattern: people want agents for specific, narrow tasks (lead follow-up, inbox management) but can't find ready-made, trustworthy templates. They end up either over-engineering with full orchestration platforms or abandoning the idea. The complaint isn't about AI capability — it's about the gap between 'I know this is possible' and 'I can actually deploy it today.' Existing template libraries (n8n's own, Make's marketplace) are sparse, poorly documented, and not curated for SMB use cases.

**Cluster:** Overly complex AI agent orchestration for small business | **Rubric score:** 110/130 | **Validation:** 8/9 checks passed

**Competitive landscape:** n8n template library exists but is generic and undocumented. Make template marketplace is sparse for AI agents. No curated, SMB-focused, well-documented AI agent template library exists as a standalone product.

**Go-to-market:** r/AI_Agents, r/n8n, Indie Hackers, YouTube tutorials linking to templates, SEO content targeting '[task] AI agent template' queries

## How this business runs itself (mailbox money)

The goal is passive, low-maintenance recurring revenue: AI is how we build and operate the business, not necessarily what it sells.

All templates are static files delivered via Lemon Squeezy download links — zero fulfillment work. Subscription billing, renewals, and cancellations are fully automated by Lemon Squeezy. Monthly template drops are batched in a single 2-hour work session. A Discord bot (MEE6 or custom) answers common setup questions using a knowledge base of FAQs. SEO blog posts (written once, AI-assisted) drive organic traffic passively. No customer data to manage, no servers to maintain. Estimated owner time: 2 hours/week.

**Estimated owner time:** ~2 hour(s)/week

**MVP estimate:** Static site (Astro or Next.js) + Gumroad or Lemon Squeezy for payments + Notion as CMS for template docs; 2 weeks to launch with 15 templates

## Validation checklist (8/9)
- [x] 10+ posts with this pain
- [x] Paying for inferior solution
- [x] Reachable channel
- [x] MVP < 4 weeks
- [x] Price point high enough
- [ ] Hair-on-fire problem
- [x] Can pre-sell
- [x] < 3 competitors
- [x] Low-maintenance ops (mailbox money)

## Source pain points (real posts)

### Orchestration layers in multi-agent systems create bottlenecks rather than improving efficiency, making complex agent setups counterproductive for small business tasks.
- **Persona:** Small business owner / AI agent implementer
- **Workaround:** Running multiple separate agents or avoiding orchestration layers entirely
- **Frequency:** daily
- **WTP signal:** Already invested in running AI agents for months across multiple businesses
- **Source:** https://www.reddit.com/r/AI_Agents/comments/1u6xnri/been_running_my_businesses_on_ai_agents_for/

### Small businesses need simple, specialized agents for specific tasks like lead follow-up and inbox management, but existing solutions require full agency setups with unnecessary complexity.
- **Persona:** Small business owner
- **Workaround:** Building or configuring partial agent setups or using non-AI automation
- **Frequency:** daily
- **WTP signal:** Already running businesses on AI agents and seeking cost-effective solutions
- **Source:** https://www.reddit.com/r/AI_Agents/comments/1u6xnri/been_running_my_businesses_on_ai_agents_for/


## About this program

This demo was auto-built by the **Idea Miner** pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation (>=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.

_Generated by Idea Miner run 2026-07-11-am on 2026-07-11 12:24 UTC_


## Local development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
npm install
npm run dev    # http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) for the landing page. Key routes:

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, pricing, and CTA |
| `/demo` | Interactive product demo — template library, voting, Discord, billing |
| `/developers` | Feature documentation for reviewers and future implementers |
| `/research` | Research story, validation checklist, and source pain points |

### Production build

```bash
npm run build  # required before deploy
npm start      # serve production build locally
```

### Deploy to Vercel

Push to any Git repo and import in Vercel, or run `vercel` from this directory. Zero configuration required — no environment variables, no custom server, no database.

### Project structure

```
app/                  # Next.js App Router pages
  page.tsx            # Landing page
  demo/page.tsx       # Interactive demo
  developers/page.tsx # Developer documentation
  research/page.tsx   # Research story
components/           # Shared UI components
  demo/DemoApp.tsx    # Main demo application (all interactive views)
lib/mock-data.ts      # Hardcoded sample data (54 templates, votes, Discord, etc.)
```
