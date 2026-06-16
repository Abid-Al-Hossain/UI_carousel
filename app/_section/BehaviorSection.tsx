"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { CarouselState } from "../types";

type Props = { state: CarouselState; update: <K extends keyof CarouselState>(key: K, value: CarouselState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Playback" subtitle="Autoplay, looping, and hover pause.">
      <div className="space-y-4">
        <Switch label="Autoplay" checked={state.autoplay} onChange={(value) => update("autoplay", value)} />
        <Switch label="Pause on hover" checked={state.pauseOnHover} onChange={(value) => update("pauseOnHover", value)} />
        <Switch label="Loop" checked={state.loop} onChange={(value) => update("loop", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Controls" subtitle="Navigation arrows and dot indicators.">
      <div className="space-y-4">
        <Switch label="Show arrows" checked={state.showArrows} onChange={(value) => update("showArrows", value)} />
        <Switch label="Show dots" checked={state.showDots} onChange={(value) => update("showDots", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
