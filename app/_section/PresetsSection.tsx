"use client";

import { useEffect, useMemo, useState } from "react";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { CAROUSEL_PRESETS } from "../_data/CarouselPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply, onReset }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void; onReset: () => void }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(0);
  const [surpriseIndex, setSurpriseIndex] = useState(0);
  const families = useMemo(() => ["all", ...Array.from(new Set(CAROUSEL_PRESETS.map((preset) => preset.family)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(CAROUSEL_PRESETS.map((preset) => preset.size)))], []);
  const filtered = CAROUSEL_PRESETS.filter((preset) => [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase().includes(query.toLowerCase()) && (family === "all" || preset.family === family) && (size === "all" || preset.size === size));
  const source = filtered.length ? filtered : CAROUSEL_PRESETS;
  const pageSize = 8;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
  const applySurprise = () => { const nextIndex = (surpriseIndex * 7 + 3) % source.length; onApply(source[nextIndex]); setSurpriseIndex(nextIndex + 1); };
  const reset = () => { setQuery(""); setFamily("all"); setSize("all"); setPage(0); setSurpriseIndex(0); onReset(); };
  useEffect(() => setPage(0), [query, family, size]);
  return <SectionCard title="Presets" subtitle="48 structured full-state presets."><div className="grid gap-3 sm:grid-cols-3"><Input label="Search presets" value={query} onChange={setQuery} /><Select label="Family" value={family} options={families} onChange={setFamily} /><Select label="Size" value={size} options={sizes} onChange={setSize} /></div><div className="flex flex-wrap gap-2"><button type="button" onClick={applySurprise} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Surprise me</button><button type="button" onClick={reset} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Reset studio</button></div><div className="flex items-center justify-between gap-3 text-xs" style={{ color: "var(--muted)" }}><span>{filtered.length} presets · page {currentPage + 1} of {pageCount}</span><div className="flex gap-2"><button type="button" onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={currentPage === 0} className="rounded-lg border px-3 py-2" style={{ borderColor: "var(--border)" }}>Previous</button><button type="button" onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))} disabled={currentPage >= pageCount - 1} className="rounded-lg border px-3 py-2" style={{ borderColor: "var(--border)" }}>Next</button></div></div><div className="grid gap-3">{pageItems.map((preset) => <button key={preset.id} type="button" onClick={() => onApply(preset)} className="rounded-2xl border p-4 text-left" style={{ borderColor: activePresetId === preset.id ? "var(--primary)" : "var(--border)", background: activePresetId === preset.id ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)", color: "var(--text)" }}><strong>{preset.archetype}</strong><span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span><p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p></button>)}</div></SectionCard>;
}
