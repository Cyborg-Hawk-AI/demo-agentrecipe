import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-surface-600 bg-surface-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white">
                AR
              </div>
              <span className="font-bold text-white">AgentRecipe</span>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Curated AI agent templates for small business workflows. Deploy in an afternoon, not a quarter.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/demo" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                  Developer Docs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Research</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/research" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                  How we found this idea
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-surface-600 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            Demo built by Idea Miner · Mock data only · No backend required
          </p>
          <p className="text-xs text-gray-500">© 2026 AgentRecipe</p>
        </div>
      </div>
    </footer>
  );
}
