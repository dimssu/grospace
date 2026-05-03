"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Kanban,
  Plus,
  Filter,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Clock,
  MoreHorizontal,
  Building2,
  Sparkles,
} from "lucide-react";
import {
  deals,
  stageOrder,
  type AssetClass,
  type Deal,
  type DealStage,
} from "@/data/deals";

const filters: ("All" | AssetClass)[] = [
  "All",
  "Office",
  "Retail",
  "Industrial",
  "Mixed-use",
];

const stageMeta: Record<
  DealStage,
  { label: string; tone: string; dot: string }
> = {
  Sourcing: {
    label: "Sourcing",
    tone: "text-stone-700 bg-stone-100",
    dot: "bg-stone-400",
  },
  LOI: {
    label: "LOI",
    tone: "text-amber-700 bg-amber-50",
    dot: "bg-amber-500",
  },
  Diligence: {
    label: "Diligence",
    tone: "text-violet-700 bg-violet-50",
    dot: "bg-violet-500",
  },
  Closed: {
    label: "Closed",
    tone: "text-emerald-700 bg-emerald-50",
    dot: "bg-emerald-500",
  },
};

function fmtMillions(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function dealValue(d: Deal) {
  const years = parseInt(d.term);
  return d.sqft * d.rentPerSf * (isNaN(years) ? 1 : years);
}

function DealCard({ deal, idx }: { deal: Deal; idx: number }) {
  const positive = deal.noiDelta >= 0;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.28,
        ease: [0.4, 0, 0.2, 1],
        delay: idx * 0.03,
      }}
      whileHover={{
        y: -2,
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.04), 0 12px 28px rgba(12,10,9,0.08)",
      }}
      className="group bg-[var(--bg-elev)] border border-[var(--border)] rounded-[10px] p-3 cursor-grab active:cursor-grabbing select-none"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold tracking-tight truncate">
            {deal.tenant}
          </div>
          <div className="text-[11.5px] text-[var(--text-mute)] truncate flex items-center gap-1 mt-0.5">
            <Building2 size={10} className="shrink-0" />
            {deal.asset} · {deal.city}
          </div>
        </div>
        <button
          aria-label="Card menu"
          className="text-stone-400 hover:text-stone-700 transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal size={14} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="bg-stone-50 rounded-md px-2 py-1.5">
          <div className="text-[9.5px] uppercase tracking-wider text-[var(--text-mute)] font-mono">
            sqft
          </div>
          <div className="text-[12px] font-semibold font-mono">
            {(deal.sqft / 1000).toFixed(1)}K
          </div>
        </div>
        <div className="bg-stone-50 rounded-md px-2 py-1.5">
          <div className="text-[9.5px] uppercase tracking-wider text-[var(--text-mute)] font-mono">
            $/sf
          </div>
          <div className="text-[12px] font-semibold font-mono">
            ${deal.rentPerSf.toFixed(1)}
          </div>
        </div>
        <div className="bg-stone-50 rounded-md px-2 py-1.5">
          <div className="text-[9.5px] uppercase tracking-wider text-[var(--text-mute)] font-mono">
            term
          </div>
          <div className="text-[12px] font-semibold font-mono">{deal.term}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div
          className={`flex items-center gap-1 text-[11px] font-medium ${
            positive ? "text-emerald-700" : "text-rose-700"
          }`}
        >
          {positive ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}
          NOI {positive ? "+" : ""}
          {deal.noiDelta.toFixed(1)}%
        </div>
        <span
          className={`text-[10.5px] px-1.5 py-0.5 rounded font-medium ${stageMeta[deal.stage].tone}`}
        >
          {deal.assetClass}
        </span>
      </div>

      <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div
            className={`w-6 h-6 rounded-full bg-gradient-to-br ${deal.owner.tone} text-white text-[10px] font-semibold flex items-center justify-center`}
          >
            {deal.owner.initials}
          </div>
          <span className="text-[11px] text-[var(--text-mute)]">
            {deal.owner.name.split(" ")[0]}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10.5px] text-[var(--text-mute)]">
          <Clock size={10} />
          <span>{deal.lastActivity}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PipelinePage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return deals;
    return deals.filter((d) => d.assetClass === filter);
  }, [filter]);

  const totalValue = useMemo(
    () => filtered.reduce((s, d) => s + dealValue(d), 0),
    [filtered],
  );

  const byStage = useMemo(() => {
    const o: Record<DealStage, Deal[]> = {
      Sourcing: [],
      LOI: [],
      Diligence: [],
      Closed: [],
    };
    for (const d of filtered) o[d.stage].push(d);
    return o;
  }, [filtered]);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-elev)] flex items-center gap-4 flex-wrap">
        <div className="w-9 h-9 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
          <Kanban size={16} />
        </div>
        <div>
          <h1 className="text-[15px] font-semibold tracking-tight">
            Deal pipeline
          </h1>
          <div className="text-[12px] text-[var(--text-mute)] mt-0.5">
            <span className="font-mono text-[var(--text)] font-medium">
              {fmtMillions(totalValue)}
            </span>{" "}
            across{" "}
            <span className="font-mono text-[var(--text)] font-medium">
              {filtered.length}
            </span>{" "}
            deals · 4 stages · synced 38s ago
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-0.5 p-0.5 rounded-md border border-[var(--border)] bg-stone-50">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11.5px] h-7 px-2.5 rounded transition-colors ${
                  filter === f
                    ? "bg-[var(--bg-elev)] text-[var(--text)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                    : "text-[var(--text-mute)] hover:text-[var(--text)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="btn h-8">
            <Filter size={13} />
            View
          </button>
          <button className="btn btn-accent h-8">
            <Plus size={13} />
            New deal
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border-b border-[var(--border)]">
        {stageOrder.map((stage) => {
          const list = byStage[stage];
          const value = list.reduce((s, d) => s + dealValue(d), 0);
          const avgNoi =
            list.length > 0
              ? list.reduce((s, d) => s + d.noiDelta, 0) / list.length
              : 0;
          return (
            <div
              key={stage}
              className="bg-[var(--bg-elev)] px-4 py-3 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-mute)] uppercase tracking-wider font-mono">
                  <span className={`w-1.5 h-1.5 rounded-full ${stageMeta[stage].dot}`} />
                  {stage}
                </div>
                <div className="mt-0.5 text-[13px] font-semibold font-mono">
                  {fmtMillions(value)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-[var(--text-mute)] font-mono">
                  {list.length} deals
                </div>
                <div
                  className={`text-[11px] font-medium ${
                    avgNoi >= 0 ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  NOI {avgNoi >= 0 ? "+" : ""}
                  {avgNoi.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="h-full grid grid-cols-4 gap-px bg-[var(--border)] min-w-[1080px]">
          {stageOrder.map((stage) => (
            <div
              key={stage}
              className="bg-stone-50/80 flex flex-col min-h-0"
            >
              <div className="h-10 px-3 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-elev)]">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${stageMeta[stage].dot}`}
                  />
                  <span className="text-[12.5px] font-semibold">
                    {stageMeta[stage].label}
                  </span>
                  <span className="chip text-[10.5px]">
                    {byStage[stage].length}
                  </span>
                </div>
                <button
                  aria-label="Add deal"
                  className="text-stone-400 hover:text-[var(--accent)] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {byStage[stage].length === 0 ? (
                  <div className="border border-dashed border-stone-300 rounded-md p-4 text-[11.5px] text-[var(--text-mute)] text-center mt-2">
                    No deals match filter.
                  </div>
                ) : (
                  byStage[stage].map((deal, idx) => (
                    <DealCard deal={deal} idx={idx} key={deal.id} />
                  ))
                )}
                <button className="w-full border border-dashed border-stone-300 hover:border-[var(--accent)] hover:text-[var(--accent)] text-stone-400 rounded-md py-2 text-[11.5px] transition-colors flex items-center justify-center gap-1">
                  <Plus size={12} />
                  Add deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer copilot */}
      <div className="border-t border-[var(--border)] bg-[var(--bg-elev)] px-6 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-2 text-[12px] text-[var(--text-mute)]">
          <Sparkles size={12} className="text-[var(--accent)]" />
          <span>
            Copilot: 3 deals in <span className="text-[var(--text)] font-medium">Diligence</span> exceed
            their underwritten close date.
          </span>
        </div>
        <button className="ml-auto inline-flex items-center gap-1 text-[12px] text-[var(--accent)] hover:underline">
          Review aging deals <ArrowUpRight size={11} />
        </button>
      </div>
    </div>
  );
}
