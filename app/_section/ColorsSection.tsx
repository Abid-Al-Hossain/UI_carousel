"use client";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import ColorControl from "@/components/shared/color/ColorControl";
import type { CarouselState } from "../types";

type Props = { state: CarouselState; update: <K extends keyof CarouselState>(key: K, value: CarouselState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Shell" subtitle="Base container colors.">
        <ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} />
        <ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} />
        <ColorControl label="Muted" value={state.muted} onChange={(v) => update("muted", v)} />
        <ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} />
      </SectionCard>
      <SectionCard title="Active Item" subtitle="Selected or hovered item highlight.">
        <ColorControl label="Active background" value={state.itemActiveBg} onChange={(v) => update("itemActiveBg", v)} />
      </SectionCard>
      <SectionCard title="Arrows" subtitle="Previous/next control colors.">
        <ColorControl label="Arrow background" value={state.arrowBg} onChange={(v) => update("arrowBg", v)} />
        <ColorControl label="Arrow color" value={state.arrowColor} onChange={(v) => update("arrowColor", v)} />
        <ColorControl label="Arrow border" value={state.arrowBorder} onChange={(v) => update("arrowBorder", v)} />
        <ColorControl label="Arrow hover background" value={state.arrowHoverBg} onChange={(v) => update("arrowHoverBg", v)} />
        <ColorControl label="Arrow hover color" value={state.arrowHoverColor} onChange={(v) => update("arrowHoverColor", v)} />
      </SectionCard>
      <SectionCard title="Dots, counter & thumbnails" subtitle="Indicator dots, counter, and thumbnail strip.">
        <ColorControl label="Dot active" value={state.dotActiveBg} onChange={(v) => update("dotActiveBg", v)} />
        <ColorControl label="Dot inactive" value={state.dotInactiveBg} onChange={(v) => update("dotInactiveBg", v)} />
        <ColorControl label="Counter color" value={state.counterColor} onChange={(v) => update("counterColor", v)} />
        <ColorControl label="Counter background" value={state.counterBg} onChange={(v) => update("counterBg", v)} />
        <ColorControl label="Thumbnail active border" value={state.thumbActiveBorder} onChange={(v) => update("thumbActiveBorder", v)} />
      </SectionCard>
    </div>
  );
}
