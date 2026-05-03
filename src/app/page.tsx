"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  FileText,
  Sparkles,
  Download,
  Filter,
  Check,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Hash,
} from "lucide-react";
import { motion } from "framer-motion";
import { extractedFields, type ExtractedField } from "@/data/extracted";
import { leaseDocument } from "@/data/leaseDocument";
import { leases, focalLeaseId } from "@/data/leases";

const categories = [
  "All",
  "Parties",
  "Term",
  "Economics",
  "Options",
  "Use",
  "Other",
] as const;

function confidenceTone(c: number) {
  if (c >= 0.92) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (c >= 0.82) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-rose-700 bg-rose-50 border-rose-200";
}

function renderParagraph(
  text: string,
  paragraphFields: ExtractedField[],
  pulseId: string | null,
) {
  if (paragraphFields.length === 0) return text;

  // Find non-overlapping ranges, sorted by index
  type R = { start: number; end: number; field: ExtractedField };
  const ranges: R[] = [];
  for (const f of paragraphFields) {
    const idx = text.indexOf(f.sourceRange.snippet);
    if (idx === -1) continue;
    ranges.push({
      start: idx,
      end: idx + f.sourceRange.snippet.length,
      field: f,
    });
  }
  ranges.sort((a, b) => a.start - b.start);

  // Merge / drop overlaps (keep first)
  const cleaned: R[] = [];
  for (const r of ranges) {
    if (cleaned.length === 0 || r.start >= cleaned[cleaned.length - 1].end) {
      cleaned.push(r);
    }
  }

  const out: React.ReactNode[] = [];
  let cursor = 0;
  cleaned.forEach((r, i) => {
    if (r.start > cursor) out.push(text.slice(cursor, r.start));
    const isPulsing = pulseId === r.field.id;
    out.push(
      <span
        key={`${r.field.id}-${i}`}
        data-snippet-id={r.field.id}
        className={isPulsing ? "highlight-pulse px-0.5 -mx-0.5" : "px-0.5 -mx-0.5"}
        style={{
          backgroundColor: isPulsing ? undefined : "rgba(167,139,250,0.10)",
          boxShadow: "inset 0 -1px 0 rgba(167,139,250,0.45)",
          borderRadius: 4,
        }}
      >
        {text.slice(r.start, r.end)}
      </span>,
    );
    cursor = r.end;
  });
  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

export default function ExtractionPage() {
  const focalLease = leases.find((l) => l.id === focalLeaseId)!;
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const [activeField, setActiveField] = useState<ExtractedField | null>(null);
  const [pulseId, setPulseId] = useState<string | null>(null);

  const docRef = useRef<HTMLDivElement>(null);

  const filteredFields = useMemo(() => {
    if (activeCategory === "All") return extractedFields;
    return extractedFields.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const onSourceClick = useCallback((f: ExtractedField) => {
    setActiveField(f);
    setPulseId(f.id);
    const root = docRef.current;
    if (!root) return;
    const para = root.querySelector<HTMLElement>(
      `[data-pid="${f.sourceRange.paragraphId}"]`,
    );
    if (para) {
      para.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    window.setTimeout(() => setPulseId(null), 1600);
  }, []);

  const avgConfidence =
    Math.round(
      (extractedFields.reduce((s, f) => s + f.confidence, 0) /
        extractedFields.length) *
        1000,
    ) / 10;

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Page header */}
      <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-elev)] flex items-center gap-4">
        <div className="w-9 h-9 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
          <FileText size={16} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-[15px] font-semibold tracking-tight">
              {focalLease.tenant} — Office Lease
            </h1>
            <span className="chip text-[10.5px]">{focalLease.id}</span>
          </div>
          <div className="text-[12px] text-[var(--text-mute)] flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
            <span className="flex items-center gap-1">
              <Building2 size={11} /> {focalLease.address}
            </span>
            <span className="flex items-center gap-1">
              <Hash size={11} /> {focalLease.sqft.toLocaleString()} RSF
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays size={11} /> Executed {focalLease.executedDate}
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 mr-2 px-2.5 h-8 rounded-md border border-[var(--border)] bg-stone-50 text-[12px] text-[var(--text-mute)]">
            <Sparkles size={12} className="text-[var(--accent)]" />
            <span className="font-mono">avg confidence</span>
            <span className="text-[var(--text)] font-medium">
              {avgConfidence}%
            </span>
          </div>
          <button className="btn h-8">
            <Filter size={13} />
            Compare
          </button>
          <button className="btn h-8">
            <Download size={13} />
            Export
          </button>
          <button className="btn btn-accent h-8">
            <Sparkles size={13} />
            Re-run extraction
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] min-h-0">
        {/* LEFT: lease document */}
        <section className="border-r border-[var(--border)] overflow-hidden flex flex-col">
          <div className="h-10 border-b border-[var(--border)] px-4 flex items-center justify-between bg-[var(--bg-elev)]">
            <div className="flex items-center gap-2 text-[12px] text-[var(--text-mute)]">
              <span className="font-mono">document.pdf</span>
              <span className="chip">2 pages</span>
              <span className="chip">OCR clean</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-[var(--text-mute)]">
              <span className="font-mono">100%</span>
              <span className="text-stone-300">·</span>
              <span>Page 1 / 2</span>
            </div>
          </div>
          <div ref={docRef} className="flex-1 overflow-y-auto bg-stone-100 p-6">
            <article className="max-w-[680px] mx-auto bg-white border border-[var(--border)] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] p-10 leading-[1.7] text-[13.5px] text-stone-800">
              {leaseDocument.map((p) => {
                const fieldsHere = extractedFields.filter(
                  (f) => f.sourceRange.paragraphId === p.id,
                );
                return (
                  <div
                    key={p.id}
                    data-pid={p.id}
                    className="mb-5 last:mb-0 scroll-mt-32"
                  >
                    {p.heading && (
                      <h3 className="text-[11.5px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5 font-mono">
                        {p.heading}
                      </h3>
                    )}
                    <p className="text-stone-800">
                      {renderParagraph(p.text, fieldsHere, pulseId)}
                    </p>
                  </div>
                );
              })}
              <div className="mt-10 pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>Lease 2024-A · Office</span>
                <span>Page 1 of 2</span>
              </div>
            </article>
          </div>
        </section>

        {/* RIGHT: extracted fields */}
        <section className="overflow-hidden flex flex-col bg-[var(--bg-elev)]">
          <div className="h-10 border-b border-[var(--border)] px-4 flex items-center gap-2">
            <span className="text-[12.5px] font-medium">Extracted clauses</span>
            <span className="chip">{extractedFields.length} fields</span>
            <div className="ml-auto flex items-center gap-1 overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`text-[11.5px] h-6 px-2 rounded-md transition-colors whitespace-nowrap ${
                    activeCategory === c
                      ? "bg-[var(--accent-soft)] text-[var(--text)]"
                      : "text-[var(--text-mute)] hover:bg-stone-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul>
              {filteredFields.map((f, i) => {
                const isActive = activeField?.id === f.id;
                return (
                  <motion.li
                    key={f.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1],
                      delay: i * 0.02,
                    }}
                    className={`group border-b border-[var(--border)] px-4 py-3 cursor-pointer transition-colors ${
                      isActive
                        ? "bg-[var(--accent-soft)]/40"
                        : "hover:bg-stone-50"
                    }`}
                    onClick={() => onSourceClick(f)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-md bg-stone-100 text-stone-500 group-hover:text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={13} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-[11px] uppercase tracking-wider text-[var(--text-mute)] font-mono">
                            {f.field}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span
                              className={`text-[10.5px] font-mono px-1.5 py-0.5 rounded border ${confidenceTone(
                                f.confidence,
                              )}`}
                            >
                              {Math.round(f.confidence * 100)}%
                            </span>
                            <span className="chip text-[10.5px]">
                              {f.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-[13.5px] mt-1 font-medium text-[var(--text)]">
                          {f.value}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSourceClick(f);
                          }}
                          className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-[var(--accent)] hover:underline"
                        >
                          <span className="font-mono">source</span>
                          <ArrowUpRight size={11} />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-[var(--border)] px-4 py-3 bg-stone-50 flex items-center justify-between">
            <div className="text-[11.5px] text-[var(--text-mute)]">
              <span className="font-mono">model</span>{" "}
              <span className="text-[var(--text)] font-medium">
                grospace-ext-v4
              </span>
              <span className="mx-1.5 text-stone-300">·</span>
              <span className="font-mono">latency</span>{" "}
              <span className="text-[var(--text)] font-medium">1.84s</span>
            </div>
            <button className="btn h-7 text-[12px]">Review queue</button>
          </div>
        </section>
      </div>
    </div>
  );
}
