"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Kanban,
  Sparkles,
  Search,
  Bell,
  Settings,
  Building2,
  ChevronsUpDown,
} from "lucide-react";
import { motion } from "framer-motion";

const nav = [
  { href: "/", label: "Lease extraction", icon: FileText },
  { href: "/pipeline", label: "Deal pipeline", icon: Kanban },
  { href: "/portfolio", label: "Portfolio chat", icon: Sparkles },
];

const meta = [
  { label: "Active leases", value: "138" },
  { label: "Pipeline", value: "$182M" },
  { label: "Occupancy", value: "91%" },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-elev)]">
        <div className="h-14 px-4 flex items-center justify-between border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[var(--accent)] flex items-center justify-center text-white">
              <Building2 size={15} />
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold tracking-tight font-display">
                Grospace
              </div>
              <div className="text-[10.5px] text-[var(--text-mute)] font-mono">
                v0.4.1 · prod
              </div>
            </div>
          </div>
          <button
            aria-label="Switch workspace"
            className="text-[var(--text-mute)] hover:text-[var(--text)] transition-colors"
          >
            <ChevronsUpDown size={14} />
          </button>
        </div>

        <nav className="px-2 py-3 flex flex-col gap-0.5">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-2.5 px-2.5 h-8 rounded-md text-[13px] transition-colors ${
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--text)]"
                    : "text-[var(--text-mute)] hover:bg-stone-100 hover:text-[var(--text)]"
                }`}
              >
                <Icon
                  size={15}
                  className={
                    active ? "text-[var(--accent)]" : "text-stone-500"
                  }
                />
                <span className="font-medium">{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="navdot"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 mt-2">
          <div className="text-[10.5px] uppercase tracking-wider text-[var(--text-mute)] font-mono mb-2">
            Workspace
          </div>
          <div className="card p-3 flex flex-col gap-2.5">
            {meta.map((m) => (
              <div
                key={m.label}
                className="flex items-baseline justify-between"
              >
                <span className="text-[11.5px] text-[var(--text-mute)]">
                  {m.label}
                </span>
                <span className="text-[12.5px] font-medium font-mono">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto p-3">
          <div className="card p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={13} className="text-[var(--accent)]" />
              <span className="text-[12px] font-medium">Diligence copilot</span>
            </div>
            <p className="text-[11.5px] text-[var(--text-mute)] leading-snug">
              Auto-extract clauses, flag exclusions, and benchmark rents in
              seconds.
            </p>
            <button className="btn btn-accent w-full mt-2.5 h-7 text-[12px]">
              Launch
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-[var(--border)] bg-[var(--bg-elev)]/80 backdrop-blur sticky top-0 z-20 flex items-center px-4 gap-3">
          <div className="flex items-center gap-2 text-[12.5px] text-[var(--text-mute)]">
            <span>Grospace</span>
            <span className="text-stone-300">/</span>
            <span className="text-[var(--text)] font-medium">
              {nav.find((n) => n.href === pathname)?.label ?? "Workspace"}
            </span>
          </div>

          <div className="flex-1 max-w-md mx-auto relative">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              placeholder="Search leases, tenants, clauses…"
              className="w-full h-8 pl-8 pr-16 text-[12.5px] rounded-md bg-stone-100 border border-transparent focus:bg-white focus:border-[var(--border)] outline-none transition-colors"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10.5px] text-[var(--text-mute)] font-mono border border-[var(--border)] rounded px-1.5 py-0.5">
              ⌘K
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button className="btn h-8 px-2" aria-label="Notifications">
              <Bell size={14} />
            </button>
            <button className="btn h-8 px-2" aria-label="Settings">
              <Settings size={14} />
            </button>
            <div className="ml-1 w-8 h-8 rounded-full bg-gradient-to-br from-violet-300 to-violet-500 text-white text-[11px] font-semibold flex items-center justify-center">
              AS
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
