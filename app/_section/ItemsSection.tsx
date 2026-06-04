"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { CarouselState } from "../types";

type Props = { state: CarouselState; update: <K extends keyof CarouselState>(key: K, value: CarouselState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return <SectionCard title="Items" subtitle="Items controls for native carousel generation."><Slider label="Slides" value={state.slideCount} min={1} max={10} step={1} onChange={(value) => update("slideCount", value)} /></SectionCard>;
}
