import { useState } from "react";
import type { ChartSegment } from "@/types/meeting-detail";

interface DonutChartProps {
  data: ChartSegment[];
  total: number;
}

const GAP_ANGLE = 4; // degrees between segments
const OUTER_RADIUS = 100;
const INNER_RADIUS = 60;
const SIZE = (OUTER_RADIUS + 10) * 2;
const CENTER = SIZE / 2;

function polarToCartesian(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

function arcPath(startAngle: number, endAngle: number) {
  const outerStart = polarToCartesian(startAngle, OUTER_RADIUS);
  const outerEnd = polarToCartesian(endAngle, OUTER_RADIUS);
  const innerStart = polarToCartesian(startAngle, INNER_RADIUS);
  const innerEnd = polarToCartesian(endAngle, INNER_RADIUS);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function DonutChart({ data, total }: DonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalGap = GAP_ANGLE * data.length;
  const available = 360 - totalGap;

  let currentAngle = 0;
  const segments = data.map((segment) => {
    const sweep = (segment.value / total) * available;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    currentAngle = endAngle + GAP_ANGLE;
    return { ...segment, startAngle, endAngle };
  });

  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-center text-sm font-bold text-foreground">
        عدد الاجتماعات
      </h3>
      <div className="relative flex justify-center">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="block">
          {segments.map((seg, i) => (
            <path
              key={i}
              d={arcPath(seg.startAngle, seg.endAngle)}
              fill={seg.color}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
          <text
            x={CENTER}
            y={CENTER - 4}
            textAnchor="middle"
            className="fill-foreground font-bold"
            style={{ fontSize: 26 }}
          >
            {total}
          </text>
          <text
            x={CENTER}
            y={CENTER + 18}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ fontSize: 14 }}
          >
            اجتماع
          </text>
        </svg>

        {hoveredIndex !== null && (() => {
          const seg = segments[hoveredIndex];
          const midAngle = (seg.startAngle + seg.endAngle) / 2;
          const tooltipRadius = OUTER_RADIUS + 20;
          const pos = polarToCartesian(midAngle, tooltipRadius);
          return (
            <div
              className="pointer-events-none absolute rounded-lg bg-teal-dark px-3 py-1.5 text-xs font-medium text-white shadow-lg"
              style={{
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              {seg.label} {seg.value}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export { DonutChart };
