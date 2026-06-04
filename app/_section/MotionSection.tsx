"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { CarouselState } from "../types";

type Props = { state: CarouselState; update: <K extends keyof CarouselState>(key: K, value: CarouselState[K]) => void };

export default function MotionSection({ state, update }: Props) {
  return <SectionCard title="Motion" subtitle="Motion controls for native carousel generation."><Switch label="Motion safe" checked={state.motion} onChange={(value) => update("motion", value)} />
<Slider label="Interval" value={state.interval} min={1000} max={10000} step={1} onChange={(value) => update("interval", value)} /></SectionCard>;
}
