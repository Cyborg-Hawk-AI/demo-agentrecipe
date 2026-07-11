"use client";

import { useState } from "react";
import DevNote from "@/components/DevNote";
import { useToast } from "@/components/Toast";
import {
  activityFeed,
  businessTypeLabels,
  categoryLabels,
  chartData,
  dashboardStats,
  discordMessages,
  formatColors,
  formatLabels,
  monthlyDrops,
  purchasedTemplates,
  templates,
  voteCandidates,
} from "@/lib/mock-data";
import type { BusinessType, TaskCategory, Template, VoteCandidate } from "@/lib/types";

type View = "dashboard" | "library" | "voting" | "discord" | "billing" | "setup";

const navItems: { id: View; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "library", label: "Template Library", icon: "📚" },
  { id: "voting", label: "Monthly Drops", icon: "🗳️" },
  { id: "discord", label: "Community", icon: "💬" },
  { id: "billing", label: "Billing", icon: "💳" },
];

export default function DemoApp() {
  const { showToast } = useToast();
  const [view, setView] = useState<View>("dashboard");
  const [search, setSearch] = useState("");
  const [businessFilter, setBusinessFilter] = useState<BusinessType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">("all");
  const [formatFilter, setFormatFilter] = useState<"all" | "n8n" | "make" | "python">("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [detailTab, setDetailTab] = useState<"guide" | "keys" | "io" | "checklist">("guide");
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(voteCandidates.map((v) => [v.id, v.votes]))
  );
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const [discordChannel, setDiscordChannel] = useState("all");
  const [discordInput, setDiscordInput] = useState("");
  const [messages, setMessages] = useState(discordMessages);
  const [owned, setOwned] = useState<Set<string>>(new Set(purchasedTemplates));
  const [subscription, setSubscription] = useState<"pro" | "none">("pro");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseTarget, setPurchaseTarget] = useState<Template | null>(null);
  const [setupStep, setSetupStep] = useState(0);
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "rating">("popular");

  const filteredTemplates = templates
    .filter((t) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.includes(q));
      const matchBusiness = businessFilter === "all" || t.businessType === businessFilter;
      const matchCategory = categoryFilter === "all" || t.category === categoryFilter;
      const matchFormat = formatFilter === "all" || t.format === formatFilter;
      return matchSearch && matchBusiness && matchCategory && matchFormat;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.downloads - a.downloads;
      if (sortBy === "newest") return b.lastUpdated.localeCompare(a.lastUpdated);
      return b.rating - a.rating;
    });

  const handleVote = (id: string) => {
    if (userVotes.has(id)) {
      setVotes((prev) => ({ ...prev, [id]: prev[id] - 1 }));
      setUserVotes((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      showToast("Vote removed", "info");
    } else {
      setVotes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
      setUserVotes((prev) => new Set(prev).add(id));
      showToast("Vote cast! Top 3 templates ship this month.", "success");
    }
  };

  const handleDownload = (t: Template) => {
    if (subscription === "pro" || owned.has(t.id)) {
      showToast(`Downloaded ${t.name} (${formatLabels[t.format]})`, "success");
    } else {
      setPurchaseTarget(t);
      setShowPurchaseModal(true);
    }
  };

  const handlePurchase = (type: "single" | "pro") => {
    if (type === "pro") {
      setSubscription("pro");
      showToast("Pro Library subscription activated — $19/mo", "success");
    } else if (purchaseTarget) {
      setOwned((prev) => new Set(prev).add(purchaseTarget.id));
      showToast(`Purchased ${purchaseTarget.name} for $9`, "success");
    }
    setShowPurchaseModal(false);
    setPurchaseTarget(null);
  };

  const handleDiscordSend = () => {
    if (!discordInput.trim()) return;
    const newMsg = {
      id: `d-${Date.now()}`,
      author: "You",
      avatar: "YO",
      channel: "#setup-help",
      content: discordInput,
      timestamp: new Date().toISOString(),
      reactions: [] as { emoji: string; count: number }[],
    };
    setMessages((prev) => [newMsg, ...prev]);
    setDiscordInput("");
    showToast("Message posted to #setup-help", "success");
    setTimeout(() => {
      setMessages((prev) => [
        {
          id: `bot-${Date.now()}`,
          author: "AgentRecipe Bot",
          avatar: "AR",
          channel: "#setup-help",
          content:
            "📋 **FAQ:** Thanks for your question! Check the template's setup guide Step 3 for troubleshooting. If that doesn't help, a community member usually responds within 2 hours.",
          timestamp: new Date().toISOString(),
          reactions: [{ emoji: "✅", count: 1 }],
        },
        ...prev,
      ]);
      showToast("AgentRecipe Bot replied to your message", "info");
    }, 1500);
  };

  const toggleChecklist = (templateId: string, itemId: string) => {
    const key = `${templateId}-${itemId}`;
    setChecklist((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const t = templates.find((x) => x.id === templateId);
      if (t) {
        const allDone = t.testChecklist.every((item) => next[`${templateId}-${item.id}`]);
        if (allDone) showToast("All tests passed! Agent ready for production.", "success");
      }
      return next;
    });
  };

  const filteredDiscord =
    discordChannel === "all" ? messages : messages.filter((m) => m.channel === discordChannel);

  const maxDownloads = Math.max(...chartData.downloadsByMonth.map((d) => d.downloads));

  return (
    <div className="min-h-screen bg-surface-900">
      <div className="border-b border-surface-600 bg-surface-800/50 px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-brand-500/20 px-2 py-0.5 text-xs font-semibold text-brand-400">
              INTERACTIVE DEMO
            </span>
            <span className="text-sm text-gray-400">
              {subscription === "pro" ? "Pro Library" : "Free"} · {owned.size} templates owned
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setView("setup");
              setSetupStep(0);
            }}
            className="btn-secondary text-xs py-1.5 px-3"
          >
            Setup Wizard
            <DevNote note="Multi-step onboarding wizard. Production: Lemon Squeezy checkout → email with download links → Discord invite." />
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-20 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  view === item.id
                    ? "bg-brand-500/15 text-brand-400"
                    : "text-gray-400 hover:bg-surface-700 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-surface-600 bg-surface-800 lg:hidden">
          <div className="flex justify-around py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] ${
                  view === item.id ? "text-brand-400" : "text-gray-500"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1 pb-20 lg:pb-6">
          {view === "dashboard" && (
            <DashboardView
              maxDownloads={maxDownloads}
              onNavigate={setView}
            />
          )}

          {view === "library" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Template Library
                    <DevNote note="Static template files served from CDN. Production: Notion CMS for docs + Lemon Squeezy for gated downloads." />
                  </h1>
                  <p className="mt-1 text-sm text-gray-400">{filteredTemplates.length} of {templates.length} templates</p>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="input-field w-auto"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field flex-1"
                />
                <select
                  value={businessFilter}
                  onChange={(e) => setBusinessFilter(e.target.value as BusinessType | "all")}
                  className="input-field w-auto"
                >
                  <option value="all">All Business Types</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="service">Service</option>
                  <option value="saas">SaaS</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as TaskCategory | "all")}
                  className="input-field w-auto"
                >
                  <option value="all">All Categories</option>
                  <option value="sales">Sales</option>
                  <option value="ops">Operations</option>
                  <option value="support">Support</option>
                </select>
                <select
                  value={formatFilter}
                  onChange={(e) => setFormatFilter(e.target.value as typeof formatFilter)}
                  className="input-field w-auto"
                >
                  <option value="all">All Formats</option>
                  <option value="n8n">n8n</option>
                  <option value="make">Make</option>
                  <option value="python">Python</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTemplates.map((t) => (
                  <TemplateCard
                    key={t.id}
                    template={t}
                    owned={subscription === "pro" || owned.has(t.id)}
                    onSelect={() => {
                      setSelectedTemplate(t);
                      setDetailTab("guide");
                    }}
                    onDownload={() => handleDownload(t)}
                  />
                ))}
              </div>
            </div>
          )}

          {view === "voting" && (
            <VotingView
              candidates={voteCandidates}
              votes={votes}
              userVotes={userVotes}
              onVote={handleVote}
              drops={monthlyDrops}
            />
          )}

          {view === "discord" && (
            <DiscordView
              messages={filteredDiscord}
              channel={discordChannel}
              onChannelChange={setDiscordChannel}
              input={discordInput}
              onInputChange={setDiscordInput}
              onSend={handleDiscordSend}
            />
          )}

          {view === "billing" && (
            <BillingView
              subscription={subscription}
              owned={owned}
              onUpgrade={() => {
                setSubscription("pro");
                showToast("Upgraded to Pro Library — $19/mo", "success");
              }}
              onCancel={() => {
                setSubscription("none");
                showToast("Subscription cancelled. Access until Jul 31, 2026.", "warning");
              }}
            />
          )}

          {view === "setup" && (
            <SetupWizard
              step={setupStep}
              onStepChange={setSetupStep}
              onComplete={() => {
                setSubscription("pro");
                setView("library");
                showToast("Setup complete! Welcome to AgentRecipe Pro.", "success");
              }}
            />
          )}
        </div>
      </div>

      {/* Template detail modal */}
      {selectedTemplate && (
        <TemplateDetailModal
          template={selectedTemplate}
          tab={detailTab}
          onTabChange={setDetailTab}
          checklist={checklist}
          onToggleChecklist={(itemId) => toggleChecklist(selectedTemplate.id, itemId)}
          owned={subscription === "pro" || owned.has(selectedTemplate.id)}
          onClose={() => setSelectedTemplate(null)}
          onDownload={() => handleDownload(selectedTemplate)}
        />
      )}

      {/* Purchase modal */}
      {showPurchaseModal && purchaseTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowPurchaseModal(false)}>
          <div className="card max-w-md w-full animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white">Unlock {purchaseTarget.name}</h3>
            <p className="mt-2 text-sm text-gray-400">Choose how you&apos;d like to access this template.</p>
            <div className="mt-6 space-y-3">
              <button type="button" onClick={() => handlePurchase("single")} className="btn-secondary w-full justify-between">
                <span>Buy this template</span>
                <span className="font-bold">$9</span>
              </button>
              <button type="button" onClick={() => handlePurchase("pro")} className="btn-primary w-full justify-between">
                <span>Pro Library (all templates)</span>
                <span className="font-bold">$19/mo</span>
              </button>
            </div>
            <button type="button" onClick={() => setShowPurchaseModal(false)} className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-300">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardView({ maxDownloads, onNavigate }: { maxDownloads: number; onNavigate: (v: View) => void }) {
  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-white">
        Dashboard
        <DevNote note="Analytics dashboard for the product owner. Production: Lemon Squeezy webhooks + Plausible/PostHog for traffic." />
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Templates", value: dashboardStats.totalTemplates, change: "+3 this month" },
          { label: "Total Downloads", value: dashboardStats.totalDownloads.toLocaleString(), change: "+12% vs last month" },
          { label: "Active Subscribers", value: dashboardStats.activeSubscribers.toLocaleString(), change: "+84 this week" },
          { label: "Monthly Revenue", value: `$${dashboardStats.monthlyRevenue.toLocaleString()}`, change: "+6.4% MoM" },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-brand-400">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="font-semibold text-white">Downloads by Month</h3>
          <div className="mt-4 flex items-end gap-2 h-40">
            {chartData.downloadsByMonth.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-brand-600 to-brand-400 transition-all hover:from-brand-500 hover:to-brand-300"
                  style={{ height: `${(d.downloads / maxDownloads) * 100}%` }}
                  title={`${d.downloads} downloads`}
                />
                <span className="text-[10px] text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-white">Templates by Category</h3>
          <div className="mt-4 space-y-3">
            {chartData.templatesByCategory.map((c) => (
              <div key={c.category}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{c.category}</span>
                  <span className="text-gray-400">{c.count}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-surface-600">
                  <div
                    className="h-2 rounded-full bg-brand-500"
                    style={{ width: `${(c.count / dashboardStats.totalTemplates) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Recent Activity</h3>
          <button type="button" onClick={() => onNavigate("library")} className="text-sm text-brand-400 hover:text-brand-300">
            Browse library →
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {activityFeed.slice(0, 6).map((item) => (
            <div key={item.id} className="flex items-start gap-3 border-b border-surface-600 pb-3 last:border-0">
              <span className="mt-0.5 text-lg">
                {item.type === "download" ? "⬇️" : item.type === "vote" ? "🗳️" : item.type === "purchase" ? "💳" : item.type === "update" ? "🔄" : "💬"}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
              <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({
  template: t,
  owned,
  onSelect,
  onDownload,
}: {
  template: Template;
  owned: boolean;
  onSelect: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="card group cursor-pointer transition-colors hover:border-brand-500/30" onClick={onSelect}>
      <div className="flex items-start justify-between gap-2">
        <span className={`badge border ${formatColors[t.format]}`}>{formatLabels[t.format]}</span>
        <div className="flex gap-1">
          {t.isNew && <span className="badge border border-brand-500/30 bg-brand-500/10 text-brand-400">New</span>}
          {owned && <span className="badge border border-blue-500/30 bg-blue-500/10 text-blue-400">Owned</span>}
        </div>
      </div>
      <h3 className="mt-3 font-semibold text-white group-hover:text-brand-400 transition-colors">{t.name}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-gray-400">{t.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="badge border border-surface-500 bg-surface-700 text-gray-400">{businessTypeLabels[t.businessType]}</span>
        <span className="badge border border-surface-500 bg-surface-700 text-gray-400">{categoryLabels[t.category]}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>★ {t.rating}</span>
          <span>·</span>
          <span>{t.downloads.toLocaleString()} downloads</span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDownload();
          }}
          className="btn-primary text-xs py-1.5 px-3"
        >
          {owned ? "Download" : "$9"}
        </button>
      </div>
    </div>
  );
}

function TemplateDetailModal({
  template: t,
  tab,
  onTabChange,
  checklist,
  onToggleChecklist,
  owned,
  onClose,
  onDownload,
}: {
  template: Template;
  tab: "guide" | "keys" | "io" | "checklist";
  onTabChange: (t: "guide" | "keys" | "io" | "checklist") => void;
  checklist: Record<string, boolean>;
  onToggleChecklist: (id: string) => void;
  owned: boolean;
  onClose: () => void;
  onDownload: () => void;
}) {
  const tabs = [
    { id: "guide" as const, label: "Setup Guide" },
    { id: "keys" as const, label: "API Keys" },
    { id: "io" as const, label: "Inputs/Outputs" },
    { id: "checklist" as const, label: "Test Checklist" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4" onClick={onClose}>
      <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto animate-slide-up sm:rounded-xl rounded-t-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex gap-2">
              <span className={`badge border ${formatColors[t.format]}`}>{formatLabels[t.format]}</span>
              <span className="badge border border-surface-500 bg-surface-700 text-gray-400">{businessTypeLabels[t.businessType]}</span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-white">{t.name}</h2>
            <p className="mt-1 text-sm text-gray-400">{t.description}</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-white text-xl">×</button>
        </div>

        <div className="mt-4 flex gap-1 border-b border-surface-600">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              type="button"
              onClick={() => onTabChange(tb.id)}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === tb.id ? "border-brand-500 text-brand-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {tab === "guide" && (
            <ol className="space-y-3">
              {t.setupGuide.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-400">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          )}
          {tab === "keys" && (
            <div className="space-y-3">
              {t.apiKeys.map((key) => (
                <div key={key.name} className="flex items-center justify-between rounded-lg border border-surface-600 bg-surface-700 p-3">
                  <div>
                    <p className="text-sm font-medium text-white">{key.name}</p>
                    <p className="text-xs text-gray-500">{key.required ? "Required" : "Optional"}</p>
                  </div>
                  <span className="text-xs text-brand-400">View docs →</span>
                </div>
              ))}
            </div>
          )}
          {tab === "io" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Inputs</h4>
                {t.inputs.map((inp) => (
                  <div key={inp.name} className="mb-2 rounded-lg border border-surface-600 p-2">
                    <p className="text-sm font-mono text-brand-400">{inp.name}</p>
                    <p className="text-xs text-gray-500">{inp.type} — {inp.description}</p>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Outputs</h4>
                {t.outputs.map((out) => (
                  <div key={out.name} className="mb-2 rounded-lg border border-surface-600 p-2">
                    <p className="text-sm font-mono text-brand-400">{out.name}</p>
                    <p className="text-xs text-gray-500">{out.type} — {out.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "checklist" && (
            <div className="space-y-2">
              {t.testChecklist.map((item) => {
                const checked = checklist[`${t.id}-${item.id}`] || false;
                return (
                  <label key={item.id} className="flex items-center gap-3 rounded-lg border border-surface-600 p-3 cursor-pointer hover:bg-surface-700">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleChecklist(item.id)}
                      className="h-4 w-4 rounded border-surface-500 text-brand-500 focus:ring-brand-500"
                    />
                    <span className={`text-sm ${checked ? "text-gray-500 line-through" : "text-gray-300"}`}>{item.label}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button type="button" onClick={onDownload} className="btn-primary flex-1">
            {owned ? "Download Template" : "Unlock — $9 or Pro"}
          </button>
          <button type="button" onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
}

function VotingView({
  candidates,
  votes,
  userVotes,
  onVote,
  drops,
}: {
  candidates: VoteCandidate[];
  votes: Record<string, number>;
  userVotes: Set<string>;
  onVote: (id: string) => void;
  drops: typeof monthlyDrops;
}) {
  const [tab, setTab] = useState<"vote" | "history">("vote");

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Monthly Template Drops
          <DevNote note="Community votes collected via Typeform or in-app. Top 3 shipped in a monthly 2-hour batch session. Production: Airtable for vote tracking." />
        </h1>
        <p className="mt-1 text-sm text-gray-400">Vote for next month&apos;s templates · 2,847 votes cast this month</p>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={() => setTab("vote")} className={`rounded-lg px-4 py-2 text-sm font-medium ${tab === "vote" ? "bg-brand-500/20 text-brand-400" : "text-gray-400 hover:bg-surface-700"}`}>
          Current Voting
        </button>
        <button type="button" onClick={() => setTab("history")} className={`rounded-lg px-4 py-2 text-sm font-medium ${tab === "history" ? "bg-brand-500/20 text-brand-400" : "text-gray-400 hover:bg-surface-700"}`}>
          Drop History
        </button>
      </div>

      {tab === "vote" && (
        <div className="space-y-3">
          {candidates
            .filter((c) => c.status === "voting")
            .sort((a, b) => votes[b.id] - votes[a.id])
            .map((c, i) => (
              <div key={c.id} className="card flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-600 w-8">#{i + 1}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{c.title}</h3>
                  <p className="text-sm text-gray-400">{c.description}</p>
                  <p className="mt-1 text-xs text-gray-500">Requested by {c.requestedBy}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{votes[c.id].toLocaleString()}</p>
                  <p className="text-xs text-gray-500">votes</p>
                  <button
                    type="button"
                    onClick={() => onVote(c.id)}
                    className={`mt-2 rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
                      userVotes.has(c.id) ? "bg-brand-500/20 text-brand-400" : "bg-surface-600 text-gray-300 hover:bg-brand-500/20 hover:text-brand-400"
                    }`}
                  >
                    {userVotes.has(c.id) ? "Voted ✓" : "Vote"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-4">
          {drops.map((drop) => (
            <div key={drop.month} className="card">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{drop.month} Drop</h3>
                <span className="text-sm text-gray-400">{drop.totalDownloads.toLocaleString()} downloads</span>
              </div>
              <ul className="mt-3 space-y-1">
                {drop.templates.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-brand-400">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DiscordView({
  messages,
  channel,
  onChannelChange,
  input,
  onInputChange,
  onSend,
}: {
  messages: typeof discordMessages;
  channel: string;
  onChannelChange: (c: string) => void;
  input: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
}) {
  const channels = ["all", "#setup-help", "#template-requests", "#wins", "#july-drop", "#general"];

  return (
    <div className="animate-fade-in space-y-4">
      <h1 className="text-2xl font-bold text-white">
        Discord Community
        <DevNote note="Private Discord with MEE6/custom bot for FAQ auto-replies. Production: Discord OAuth for member verification, bot webhook for template announcements." />
      </h1>
      <p className="text-sm text-gray-400">847 members · AgentRecipe Bot handles 80% of setup questions</p>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {channels.map((ch) => (
          <button
            key={ch}
            type="button"
            onClick={() => onChannelChange(ch)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium ${
              channel === ch ? "bg-brand-500/20 text-brand-400" : "bg-surface-700 text-gray-400 hover:text-white"
            }`}
          >
            {ch === "all" ? "All Channels" : ch}
          </button>
        ))}
      </div>

      <div className="card max-h-96 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-600 text-xs font-bold text-gray-300">
              {msg.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{msg.author}</span>
                <span className="text-xs text-gray-500">{msg.channel}</span>
                <span className="text-xs text-gray-600">{new Date(msg.timestamp).toLocaleString()}</span>
              </div>
              <p className="mt-0.5 text-sm text-gray-300">{msg.content}</p>
              {msg.reactions.length > 0 && (
                <div className="mt-1 flex gap-1">
                  {msg.reactions.map((r) => (
                    <span key={r.emoji} className="rounded-full bg-surface-600 px-2 py-0.5 text-xs">
                      {r.emoji} {r.count}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Ask a setup question in #setup-help..."
          className="input-field flex-1"
        />
        <button type="button" onClick={onSend} className="btn-primary">Send</button>
      </div>
    </div>
  );
}

function BillingView({
  subscription,
  owned,
  onUpgrade,
  onCancel,
}: {
  subscription: "pro" | "none";
  owned: Set<string>;
  onUpgrade: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-white">
        Billing & Subscription
        <DevNote note="All billing handled by Lemon Squeezy: subscriptions, one-time purchases, receipts, and download link delivery. Zero custom payment code." />
      </h1>

      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Current Plan</p>
            <p className="text-xl font-bold text-white">{subscription === "pro" ? "Pro Library" : "Free"}</p>
            {subscription === "pro" && <p className="text-sm text-gray-400">$19/month · Renews Aug 1, 2026</p>}
          </div>
          <span className={`badge border ${subscription === "pro" ? "border-brand-500/30 bg-brand-500/10 text-brand-400" : "border-gray-500/30 bg-gray-500/10 text-gray-400"}`}>
            {subscription === "pro" ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="mt-4 flex gap-3">
          {subscription === "none" ? (
            <button type="button" onClick={onUpgrade} className="btn-primary">Upgrade to Pro — $19/mo</button>
          ) : (
            <button type="button" onClick={onCancel} className="btn-secondary text-red-400 border-red-500/30 hover:border-red-500/50">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-white">Payment History</h3>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-surface-600 text-left text-gray-400">
              <th className="pb-2">Date</th>
              <th className="pb-2">Description</th>
              <th className="pb-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "Jul 1, 2026", desc: "Pro Library — Monthly", amount: "$19.00" },
              { date: "Jun 1, 2026", desc: "Pro Library — Monthly", amount: "$19.00" },
              { date: "May 15, 2026", desc: "Churn Risk Alert (individual)", amount: "$9.00" },
              { date: "May 1, 2026", desc: "Pro Library — Monthly", amount: "$19.00" },
            ].map((row) => (
              <tr key={row.date + row.desc} className="border-b border-surface-600/50">
                <td className="py-2 text-gray-300">{row.date}</td>
                <td className="py-2 text-gray-400">{row.desc}</td>
                <td className="py-2 text-right text-white">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="font-semibold text-white">Owned Templates ({owned.size})</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {Array.from(owned).map((id) => {
            const t = templates.find((x) => x.id === id);
            return t ? (
              <span key={id} className="badge border border-surface-500 bg-surface-700 text-gray-300">{t.name}</span>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

function SetupWizard({
  step,
  onStepChange,
  onComplete,
}: {
  step: number;
  onStepChange: (s: number) => void;
  onComplete: () => void;
}) {
  const steps = [
    { title: "Choose your business type", options: ["E-commerce", "Service Business", "SaaS"] },
    { title: "Pick your first template", options: ["Lead Qualification Bot", "Abandoned Cart Recovery", "Support Ticket Triage"] },
    { title: "Connect your tools", options: ["Shopify", "HubSpot", "Slack", "OpenAI"] },
    { title: "Run the test checklist", options: ["API keys validated", "Test trigger fired", "Output verified"] },
  ];

  return (
    <div className="animate-fade-in mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-white">
        Setup Wizard
        <DevNote note="Guided onboarding for new subscribers. Production: tracks completion in Lemon Squeezy customer metadata or a simple analytics event." />
      </h1>

      <div className="flex gap-2">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-brand-500" : "bg-surface-600"}`} />
        ))}
      </div>

      <div className="card">
        <p className="text-sm text-gray-400">Step {step + 1} of {steps.length}</p>
        <h2 className="mt-1 text-lg font-semibold text-white">{steps[step].title}</h2>
        <div className="mt-4 space-y-2">
          {steps[step].options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => (step < steps.length - 1 ? onStepChange(step + 1) : onComplete())}
              className="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-3 text-left text-sm text-gray-300 hover:border-brand-500/50 hover:bg-surface-600 transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button type="button" onClick={() => onStepChange(step - 1)} className="mt-4 text-sm text-gray-500 hover:text-gray-300">
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
