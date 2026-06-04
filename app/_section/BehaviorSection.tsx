"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { CarouselState } from "../types";

type Props = { state: CarouselState; update: <K extends keyof CarouselState>(key: K, value: CarouselState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return <SectionCard title="Behavior" subtitle="Behavior controls for native carousel generation."><Switch label="Autoplay" checked={state.autoplay} onChange={(value) => update("autoplay", value)} />
<Switch label="Loop" checked={state.loop} onChange={(value) => update("loop", value)} />
<Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} /></SectionCard>;
}
