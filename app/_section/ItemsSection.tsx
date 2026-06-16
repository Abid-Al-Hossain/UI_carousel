"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { CarouselState } from "../types";

type Props = { state: CarouselState; update: <K extends keyof CarouselState>(key: K, value: CarouselState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Items controls for native carousel generation.">
        <Slider label="Slides" value={state.slideCount} min={1} max={10} step={1} onChange={(value) => update("slideCount", value)} />
      </SectionCard>
      <SectionCard title="Arrow & dot geometry" subtitle="Control sizing and shape.">
      <div className="space-y-4">
        <Slider label="Arrow size" value={state.arrowSize} min={28} max={64} step={1} onChange={(value) => update("arrowSize", value)} />
        <Slider label="Arrow radius" value={state.arrowRadius} min={0} max={999} step={1} onChange={(value) => update("arrowRadius", value)} />
        <Slider label="Dot size" value={state.dotSize} min={4} max={20} step={1} onChange={(value) => update("dotSize", value)} />
        <Slider label="Dot gap" value={state.dotGap} min={0} max={24} step={1} onChange={(value) => update("dotGap", value)} />
        <Slider label="Dot radius" value={state.dotBorderRadius} min={0} max={999} step={1} onChange={(value) => update("dotBorderRadius", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Slides, motion & thumbnails" subtitle="Slide radius, animation, and thumbnail strip.">
      <div className="space-y-4">
        <Slider label="Slide radius" value={state.slideRadius} min={0} max={32} step={1} onChange={(value) => update("slideRadius", value)} />
        <Slider label="Animation duration (ms)" value={state.animationDuration} min={0} max={1200} step={20} onChange={(value) => update("animationDuration", value)} />
        <Switch label="Thumbnails" checked={state.thumbnailsEnabled} onChange={(value) => update("thumbnailsEnabled", value)} />
        <Slider label="Thumbnail height" value={state.thumbHeight} min={32} max={96} step={1} onChange={(value) => update("thumbHeight", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Gestures" subtitle="Touch and pointer interaction.">
      <div className="space-y-4">
        <Switch label="Swipe enabled" checked={state.swipeEnabled} onChange={(value) => update("swipeEnabled", value)} />
        <Switch label="Drag enabled" checked={state.dragEnabled} onChange={(value) => update("dragEnabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
