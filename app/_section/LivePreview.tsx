"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { CarouselState } from "../types";
import { SYSTEM_FONTS } from "@/components/shared/typography/fontConstants";

function resolveFont(state: { fontBucket: "system" | "google"; googleFontFamily: string; systemFontIdx: number }): string {
  return state.fontBucket === "google"
    ? `"${state.googleFontFamily}", sans-serif`
    : (SYSTEM_FONTS[state.systemFontIdx]?.css ?? "inherit");
}

function buildShadow(state: { shadowEnabled: boolean; shadowX: number; shadowY: number; shadowBlur: number; shadowSpread: number; shadowColor: string; shadowOpacity: number }): string {
  if (!state.shadowEnabled) return "none";
  const hex = Math.round(state.shadowOpacity * 255).toString(16).padStart(2, "0");
  return `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}${hex}`;
}

function buildRadius(state: { radiusLinked: boolean; radius: number; radiusTL: number; radiusTR: number; radiusBR: number; radiusBL: number }): string {
  return state.radiusLinked
    ? `${state.radius}px`
    : `${state.radiusTL}px ${state.radiusTR}px ${state.radiusBR}px ${state.radiusBL}px`;
}

function shell(state: CarouselState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, gap: state.gap, borderRadius: buildRadius(state), border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`, boxShadow: buildShadow(state), background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background, color: state.foreground, fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight, opacity: state.disabled ? 0.55 : 1 };
}

export default function LivePreview({ state }: { state: CarouselState }) {
  const slideCount = Math.max(1, state.slideCount);
  const initialIndex = Math.min(Math.max(state.activeIndex, 0), slideCount - 1);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [paused, setPaused] = useState(!state.autoplay);
  const [arrowHover, setArrowHover] = useState("");
  const slides = Array.from({ length: slideCount }, (_, index) => ({
    id: `${state.id}-slide-${index + 1}`,
    title: index === 0 ? state.title : `${state.title} ${index + 1}`,
    body: index === 0 ? state.description : `${state.helper} Slide ${index + 1} of ${slideCount}.`,
  }));
  const safeIndex = Math.min(selectedIndex, slideCount - 1);
  const selectedSlide = slides[safeIndex] ?? slides[0];
  const panel = shell(state);

  const goPrevious = () => setSelectedIndex((current) => current === 0 ? (state.loop ? slideCount - 1 : current) : current - 1);
  const goNext = () => setSelectedIndex((current) => current >= slideCount - 1 ? (state.loop ? 0 : current) : current + 1);

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  return <section id={state.id} role={state.role} aria-roledescription="carousel" aria-label={state.ariaLabel} tabIndex={state.tabIndex} style={panel} className="grid" onMouseEnter={() => state.pauseOnHover && setPaused(true)} onMouseLeave={() => state.pauseOnHover && setPaused(!state.autoplay)}>
    <div className="grid gap-4">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: state.accent }}>{state.label}</p>
        <h3 className="mt-2" style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p className="mt-2" style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </header>
      <div aria-live={state.autoplay && !paused ? "off" : "polite"} data-swipe={state.swipeEnabled} data-drag={state.dragEnabled} className="overflow-hidden" style={{ borderRadius: state.slideRadius }}>
        <div className="flex" style={{ transform: `translateX(-${safeIndex * 100}%)`, transition: state.transitionDuration > 0 ? `transform ${state.animationDuration}ms ease` : "none" }}>
          {slides.map((slide, index) => {
            const selected = index === safeIndex;
            return <article key={slide.id} id={slide.id} role="group" aria-roledescription="slide" aria-label={`Slide ${index + 1} of ${slideCount}: ${slide.title}`} aria-current={selected ? "true" : undefined} aria-hidden={selected ? undefined : true} className="grid shrink-0 content-end gap-3 border p-5" style={{ width: "100%", minHeight: Math.max(160, state.height - state.padding * 2 - 130), borderColor: state.border, borderRadius: state.slideRadius, background: `linear-gradient(135deg, ${state.itemActiveBg}, rgba(255,255,255,.06))`, opacity: selected ? 1 : 0.45 }}>
              <span className="text-xs font-bold" style={{ color: state.accent }}>{state.label} {index + 1}</span>
              <h4 className="m-0" style={{ fontSize: Math.max(20, state.titleSize - 6), fontWeight: state.fontWeight }}>{slide.title}</h4>
              <p className="m-0" style={{ color: state.muted, fontSize: state.bodySize }}>{slide.body}</p>
            </article>;
          })}
        </div>
      </div>
      {state.thumbnailsEnabled && <div role="group" aria-label="Slide thumbnails" className="flex gap-2 overflow-x-auto">
        {slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => setSelectedIndex(index)} disabled={state.disabled} aria-label={`Show slide ${index + 1}`} aria-current={index === safeIndex ? "true" : undefined} className="shrink-0" style={{ height: state.thumbHeight, width: Math.round(state.thumbHeight * 1.6), borderRadius: Math.max(4, state.slideRadius - 4), border: `2px solid ${index === safeIndex ? state.thumbActiveBorder : state.border}`, background: `linear-gradient(135deg, ${state.itemActiveBg}, rgba(255,255,255,.06))`, opacity: index === safeIndex ? 1 : 0.6 }} />)}
      </div>}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {state.showArrows && <div className="flex gap-2">
          <button type="button" onClick={goPrevious} onMouseEnter={() => setArrowHover("prev")} onMouseLeave={() => setArrowHover("")} disabled={state.disabled || (!state.loop && safeIndex === 0)} aria-label="Show previous slide" className="grid place-items-center border" style={{ width: state.arrowSize, height: state.arrowSize, borderRadius: state.arrowRadius, borderColor: state.arrowBorder, background: arrowHover === "prev" ? state.arrowHoverBg : state.arrowBg, color: arrowHover === "prev" ? state.arrowHoverColor : state.arrowColor }}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" onClick={goNext} onMouseEnter={() => setArrowHover("next")} onMouseLeave={() => setArrowHover("")} disabled={state.disabled || (!state.loop && safeIndex === slideCount - 1)} aria-label="Show next slide" className="grid place-items-center border" style={{ width: state.arrowSize, height: state.arrowSize, borderRadius: state.arrowRadius, borderColor: state.arrowBorder, background: arrowHover === "next" ? state.arrowHoverBg : state.arrowBg, color: arrowHover === "next" ? state.arrowHoverColor : state.arrowColor }}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>}
        {state.showDots && <div role="group" aria-label="Choose slide" className="flex" style={{ gap: state.dotGap }}>
          {slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => setSelectedIndex(index)} disabled={state.disabled} aria-label={`Show slide ${index + 1}`} aria-current={index === safeIndex ? "true" : undefined} style={{ height: state.dotSize, width: index === safeIndex ? state.dotSize * 2.4 : state.dotSize, borderRadius: state.dotBorderRadius, border: 0, background: index === safeIndex ? state.dotActiveBg : state.dotInactiveBg }} />)}
        </div>}
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: state.counterColor, background: state.counterBg }}>{safeIndex + 1} / {slideCount}</span>
        {state.autoplay && <button type="button" onClick={() => setPaused((value) => !value)} disabled={state.disabled} aria-pressed={paused} className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: state.border }}>{paused ? "Resume autoplay" : "Pause autoplay"}</button>}
      </div>
      <p aria-live="polite" className="text-xs" style={{ color: state.muted }}>{selectedSlide.title} selected. {state.autoplay ? (paused ? "Autoplay paused." : "Autoplay modeled as running.") : "Autoplay off."}</p>
    </div>
  </section>;
}
