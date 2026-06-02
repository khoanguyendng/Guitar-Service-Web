"use client";

import { useState, useRef, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
  className?: string;
}

export function BeforeAfterSlider({
  beforeLabel = "Before",
  afterLabel = "After",
  beforeContent,
  afterContent,
  className = "",
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden cursor-col-resize ${className}`}
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) update(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (dragging.current) update(e.touches[0].clientX); }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* After layer (full width, behind) */}
      <div className="absolute inset-0">{afterContent}</div>

      {/* Before layer (clipped, on top) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {beforeContent}
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-[9px] font-mono text-white/80 uppercase tracking-wider pointer-events-none z-10">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-[9px] font-mono text-white/80 uppercase tracking-wider pointer-events-none z-10">
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-20 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-white/70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-xl flex items-center justify-center">
          <MoveHorizontal className="w-4 h-4 text-stone-700" />
        </div>
      </div>
    </div>
  );
}
