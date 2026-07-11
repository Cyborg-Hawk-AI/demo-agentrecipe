"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/demo", label: "Live Demo" },
  { href: "/developers", label: "Developers" },
  { href: "/research", label: "Research" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-surface-600/50 bg-surface-900/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white shadow-lg shadow-brand-500/20">
            AR
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-brand-400 transition-colors">
            AgentRecipe
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-surface-700 text-brand-400"
                  : "text-gray-400 hover:bg-surface-800 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/demo" className="btn-primary text-sm">
            Try Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
