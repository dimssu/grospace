"use client";

import {
  Sparkles,
  Send,
  Building2,
  TrendingUp,
  CalendarRange,
  Layers,
  PieChart,
  Paperclip,
  Mic,
  ArrowRight,
  BookText,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  chatThread,
  portfolioSummary,
  properties,
  topTenants,
} from "@/data/portfolio";

function fmtPct(x: number) {
  return `${(x * 100).toFixed(0)}%`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  sub: string;
  tone: string;
}) {
  return (
    <div className="card p-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-[var(--text-mute)] font-mono">
          {label}
        </span>
        <Icon size={13} className={tone} />
      </div>
      <div className="mt-1.5 text-[20px] font-semibold tracking-tight font-display">
        {value}
      </div>
      <div className="text-[11px] text-[var(--text-mute)] mt-0.5">{sub}</div>
    </div>
  );
}

function BarChart({
  series,
  label,
}: {
  series: { x: string; y: number }[];
  label: string;
}) {
  const max = Math.max(...series.map((s) => s.y));
  const w = 360;
  const h = 132;
  const pad = { l: 28, r: 8, t: 8, b: 22 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const barW = innerW / series.length - 6;

  return (
    <figure className="bg-stone-50 border border-[var(--border)] rounded-md p-3 mt-2">
      <figcaption className="text-[11px] uppercase tracking-wider text-[var(--text-mute)] font-mono mb-1">
        {label}
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={g}
            x1={pad.l}
            x2={w - pad.r}
            y1={pad.t + innerH * (1 - g)}
            y2={pad.t + innerH * (1 - g)}
            stroke="#e7e5e4"
            strokeDasharray="2 3"
          />
        ))}
        <line
          x1={pad.l}
          x2={pad.l}
          y1={pad.t}
          y2={pad.t + innerH}
          stroke="#d6d3d1"
        />
        <line
          x1={pad.l}
          x2={w - pad.r}
          y1={pad.t + innerH}
          y2={pad.t + innerH}
          stroke="#d6d3d1"
        />
        {series.map((s, i) => {
          const barH = (s.y / max) * innerH;
          const x = pad.l + i * (innerW / series.length) + 3;
          const y = pad.t + innerH - barH;
          const peak = s.y === max;
          return (
            <g key={s.x}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={2}
                fill={peak ? "#a78bfa" : "#c4b5fd"}
              />
              <text
                x={x + barW / 2}
                y={pad.t + innerH + 14}
                fontSize={9}
                textAnchor="middle"
                fill="#78716c"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                {s.x}
              </text>
            </g>
          );
        })}
        <text
          x={pad.l - 4}
          y={pad.t + 8}
          textAnchor="end"
          fontSize={9}
          fill="#a8a29e"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          {Math.round(max / 1000)}K
        </text>
      </svg>
    </figure>
  );
}

function CompareChart({
  rows,
  label,
}: {
  rows: { label: string; current: number; market: number }[];
  label: string;
}) {
  const max = Math.max(...rows.flatMap((r) => [r.current, r.market]));
  return (
    <figure className="bg-stone-50 border border-[var(--border)] rounded-md p-3 mt-2">
      <figcaption className="text-[11px] uppercase tracking-wider text-[var(--text-mute)] font-mono mb-2 flex items-center justify-between">
        <span>{label}</span>
        <span className="flex items-center gap-3 normal-case tracking-normal">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-violet-400" />
            in-place
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-stone-300" />
            market
          </span>
        </span>
      </figcaption>
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-center justify-between text-[11.5px]">
              <span>{r.label}</span>
              <span className="font-mono text-[var(--text-mute)]">
                ${r.current} / ${r.market}
              </span>
            </div>
            <div className="mt-1 h-3 relative bg-stone-200/60 rounded-sm overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-stone-300"
                style={{ width: `${(r.market / max) * 100}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-violet-400"
                style={{ width: `${(r.current / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

const suggestedPrompts = [
  "What's my lease rollover risk in 2027?",
  "Which tenants are below market?",
  "Show concentration risk by tenant",
  "Forecast NOI sensitivity to +50bps",
];

export default function PortfolioPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-elev)] flex items-center gap-4">
        <div className="w-9 h-9 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
          <Sparkles size={16} />
        </div>
        <div>
          <h1 className="text-[15px] font-semibold tracking-tight">
            Portfolio chat
          </h1>
          <div className="text-[12px] text-[var(--text-mute)] mt-0.5">
            Ask anything about your{" "}
            <span className="font-mono text-[var(--text)] font-medium">
              {portfolioSummary.properties}
            </span>{" "}
            properties · grounded on rent roll, leases, and CoStar comps.
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="chip">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Live · last sync 1m ago
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[420px_1fr] min-h-0">
        {/* LEFT: portfolio summary */}
        <aside className="border-r border-[var(--border)] overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            <StatCard
              icon={Building2}
              label="GAV"
              value={`$${portfolioSummary.gav}M`}
              sub={`${portfolioSummary.properties} properties`}
              tone="text-stone-400"
            />
            <StatCard
              icon={TrendingUp}
              label="NOI (TTM)"
              value={`$${portfolioSummary.noi}M`}
              sub={`${(portfolioSummary.yieldOnCost * 100).toFixed(1)}% yield-on-cost`}
              tone="text-emerald-500"
            />
            <StatCard
              icon={Layers}
              label="Occupancy"
              value={fmtPct(portfolioSummary.occupancy)}
              sub={`${(portfolioSummary.totalSqft / 1_000_000).toFixed(2)}M total RSF`}
              tone="text-violet-500"
            />
            <StatCard
              icon={CalendarRange}
              label="WALT"
              value={`${portfolioSummary.walt}y`}
              sub={`peer median 5.4y`}
              tone="text-amber-500"
            />
          </div>

          <div className="card p-3">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <PieChart size={13} className="text-[var(--accent)]" />
                <span className="text-[12.5px] font-semibold">
                  Top tenants by revenue
                </span>
              </div>
              <span className="chip text-[10.5px]">{topTenants.length}</span>
            </div>
            <div className="space-y-2">
              {topTenants.map((t) => (
                <div key={t.name}>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="truncate">{t.name}</span>
                    <span className="font-mono text-[var(--text-mute)]">
                      {t.revenuePct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded bg-stone-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(t.revenuePct / 14.2) * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full bg-[var(--accent)]"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10.5px] text-[var(--text-mute)] font-mono">
                    <span>{t.sqft.toLocaleString()} RSF</span>
                    <span>exp {t.expiry}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12.5px] font-semibold">Properties</span>
              <span className="chip text-[10.5px]">{properties.length}</span>
            </div>
            <ul className="divide-y divide-stone-100 -mx-1">
              {properties.slice(0, 8).map((p) => (
                <li
                  key={p.id}
                  className="px-1 py-1.5 flex items-center justify-between gap-2 text-[11.5px]"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">{p.name}</div>
                    <div className="text-[10.5px] text-[var(--text-mute)] font-mono">
                      {p.city} · {p.assetClass}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono">${p.gav}M</div>
                    <div
                      className={`text-[10px] font-mono ${
                        p.occupancy >= 0.9
                          ? "text-emerald-700"
                          : p.occupancy >= 0.8
                            ? "text-amber-700"
                            : "text-rose-700"
                      }`}
                    >
                      {fmtPct(p.occupancy)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* RIGHT: chat thread */}
        <section className="flex flex-col bg-[var(--bg)] min-h-0">
          <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
            <div className="max-w-[760px] mx-auto space-y-5">
              <div className="card p-4 border-dashed">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={13} className="text-[var(--accent)]" />
                  <span className="text-[12px] font-semibold">
                    Ask the portfolio anything
                  </span>
                </div>
                <p className="text-[12.5px] text-[var(--text-mute)] leading-snug">
                  Replies cite the lease, schedule, or comp set used. Charts
                  render inline.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {suggestedPrompts.map((p) => (
                    <button
                      key={p}
                      className="text-[11.5px] h-7 px-2.5 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {chatThread.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.4, 0, 0.2, 1],
                    delay: i * 0.04,
                  }}
                  className={
                    m.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  {m.role === "user" ? (
                    <div className="max-w-[80%] bg-[var(--accent)] text-white rounded-[12px] rounded-tr-[4px] px-3.5 py-2.5 text-[13px] shadow-sm">
                      {m.text}
                    </div>
                  ) : (
                    <div className="max-w-[88%] flex gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles size={13} />
                      </div>
                      <div className="card px-3.5 py-2.5 text-[13px] leading-relaxed">
                        <p>{m.text}</p>
                        {m.chart?.type === "bars" && (
                          <BarChart
                            label={m.chart.label}
                            series={m.chart.series}
                          />
                        )}
                        {m.chart?.type === "compare" && (
                          <CompareChart
                            label={m.chart.label}
                            rows={m.chart.rows}
                          />
                        )}
                        {m.citation && (
                          <div className="mt-2 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-[var(--text-mute)]">
                            <BookText size={11} />
                            <span className="font-mono">from</span>
                            <span className="text-[var(--text)]">
                              {m.citation}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border)] bg-[var(--bg-elev)] px-4 lg:px-8 py-3">
            <div className="max-w-[760px] mx-auto">
              <div className="flex items-end gap-2 border border-[var(--border)] rounded-[12px] bg-[var(--bg-elev)] focus-within:border-[var(--accent)] transition-colors px-3 py-2">
                <button
                  aria-label="Attach"
                  className="text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <Paperclip size={15} />
                </button>
                <input
                  type="text"
                  placeholder="Ask about rents, rollover, NOI sensitivity, comp set…"
                  className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-stone-400"
                />
                <button
                  aria-label="Voice"
                  className="text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <Mic size={15} />
                </button>
                <button
                  aria-label="Send"
                  className="w-7 h-7 rounded-md bg-[var(--accent)] hover:bg-violet-500 text-white flex items-center justify-center transition-colors"
                >
                  <Send size={13} />
                </button>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-[var(--text-mute)] font-mono">
                <span>grospace-chat-v2 · grounded on rent-roll 2026-04</span>
                <span className="flex items-center gap-1">
                  Press <kbd className="px-1 py-0.5 border border-[var(--border)] rounded bg-stone-50">⏎</kbd> to send
                  <ArrowRight size={10} />
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
