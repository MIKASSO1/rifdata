import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { Plus, Minus, Navigation, Locate } from "lucide-react";

// ---------- GeoJSON local types ----------
type Geometry = { type: string; coordinates: unknown };
interface Feature<G = Geometry, P = Record<string, unknown>> {
  type: "Feature";
  geometry: G;
  properties: P;
}
interface FeatureCollection<G = Geometry, P = Record<string, unknown>> {
  type: "FeatureCollection";
  features: Feature<G, P>[];
}

type ProvinceProps = { name: string; zone?: string };
type ProvinceFeature = Feature<Geometry, ProvinceProps>;

const GEO_URL = "/morocco-provinces.geojson";
const W = 800;
const H = 900;

// Google-Maps-like neutral palette
const MAP_BG = "#e8eef4"; // water/outside
const LAND_FILL = "#f5f3ee"; // land
const LAND_HOVER = "#e9efff";
const LAND_ACTIVE = "#c9dcff";
const BORDER = "#b9c2cf";
const BORDER_STRONG = "#4a73c9";

const cleanName = (raw: string) =>
  raw
    .replace(/^Province de\s+/i, "")
    .replace(/^Préfecture de\s+/i, "")
    .replace(/\s+Province$/i, "")
    .replace(/\s+Prefecture$/i, "")
    .trim();

interface ProvinceMapProps {
  selectedProvince?: string | null;
  onSelectProvince?: (name: string | null) => void;
}


// Approx km per pixel at zoom 1, scale 1 (rough — for scale-bar visual)
const KM_PER_PX_BASE = 1.6;

export const ProvinceMap = ({
  selectedProvince,
  onSelectProvince,
}: ProvinceMapProps) => {
  const [features, setFeatures] = useState<ProvinceFeature[] | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  // pan/zoom state
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragRef = useRef<{
    active: boolean;
    moved: boolean;
    sx: number;
    sy: number;
    stx: number;
    sty: number;
  }>({ active: false, moved: false, sx: 0, sy: 0, stx: 0, sty: 0 });

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((fc: FeatureCollection) =>
        setFeatures(fc.features as ProvinceFeature[]),
      )
      .catch(() => setFeatures([]));
  }, []);

  // Rif bounding box (approx) based on the description:
  // from far east of Chefchaouen (≈ long ~ -5.3 to -3.0),
  // to eastern Essaouira (≈ long ~ -9.5),
  // southern to north Taza (≈ lat ~ 34.0)
  // NOTE: GeoJSON coordinates are lng/lat.
  const RIFF_BBOX = useMemo(
    () => ({
      minLng: -9.6,
      maxLng: -2.9,
      minLat: 34.0,
      maxLat: 35.6,
    }),
    [],
  );

  const { paths, ready } = useMemo(() => {
    if (!features || features.length === 0) {
      return {
        paths: [] as { id: string; d: string; name: string }[],
        ready: false,
      };
    }

    const filtered = features.filter((f) => {
      const coords = (f.geometry as any)?.coordinates;
      if (!coords) return false;

      // Collect a rough lng/lat sample set from polygon coordinates.
      // GeoJSON for Polygon: coordinates = [ [ [lng,lat], ... ] ]
      const ring = Array.isArray(coords) ? coords[0] : null;
      if (!Array.isArray(ring)) return false;

      let minLng = Infinity;
      let maxLng = -Infinity;
      let minLat = Infinity;
      let maxLat = -Infinity;

      for (const pt of ring) {
        const lng = pt?.[0];
        const lat = pt?.[1];
        if (typeof lng !== "number" || typeof lat !== "number") continue;
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      }

      // bbox intersection
      return (
        maxLng >= RIFF_BBOX.minLng &&
        minLng <= RIFF_BBOX.maxLng &&
        maxLat >= RIFF_BBOX.minLat &&
        minLat <= RIFF_BBOX.maxLat
      );
    });

    const fc: FeatureCollection = {
      type: "FeatureCollection",
      features: filtered as ProvinceFeature[],
    };

    const projection = geoMercator().fitSize([W, H], fc as never);
    const path = geoPath(projection);

    const paths = filtered.map((f, i) => ({
      id: `${f.properties.name}-${i}`,
      d: path(f as never) ?? "",
      name: cleanName(f.properties.name),
    }));

    return { paths, ready: filtered.length > 0 };
  }, [features, RIFF_BBOX]);


  const hoveredName = paths.find((p) => p.id === hoverId)?.name ?? null;

  // ---------- Zoom / Pan helpers ----------
  const clampScale = (s: number) => Math.max(1, Math.min(8, s));

  const zoomBy = useCallback((factor: number, cx?: number, cy?: number) => {
    setScale((s) => {
      const ns = clampScale(s * factor);
      if (ns === s) return s;
      // zoom around viewport center if no point given
      const px = cx ?? W / 2;
      const py = cy ?? H / 2;
      setTx((t) => px - (px - t) * (ns / s));
      setTy((t) => py - (py - t) * (ns / s));
      return ns;
    });
  }, []);

  const reset = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  // wheel zoom
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15, x, y);
  };

  // pan
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = {
      active: true,
      moved: false,
      sx: e.clientX,
      sy: e.clientY,
      stx: tx,
      sty: ty,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = ((e.clientX - d.sx) / rect.width) * W;
    const dy = ((e.clientY - d.sy) / rect.height) * H;
    if (Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 4) d.moved = true;
    setTx(d.stx + dx);
    setTy(d.sty + dy);
  };
  const onPointerUp = () => {
    dragRef.current.active = false;
  };

  // scale bar — represents 100 logical px at current zoom
  const scaleKm = Math.round((100 / scale) * KM_PER_PX_BASE);

  return (
    <div
      className="relative w-full rounded-2xl border border-border shadow-card-soft overflow-hidden"
      style={{ background: MAP_BG }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        style={{
          display: "block",
          background: MAP_BG,
          cursor: dragRef.current.active ? "grabbing" : "grab",
          touchAction: "none",
        }}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        role="img"
        aria-label="Interactive vector map of Morocco — provinces"
      >
        <defs>
          <filter id="landShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodOpacity="0.15" />
          </filter>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#d6dde6"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>

        {/* water/grid background */}
        <rect x={0} y={0} width={W} height={H} fill="url(#grid)" />

        {!ready && (
          <text x={W / 2} y={H / 2} textAnchor="middle" style={{ fontSize: 16, fill: "#6b7a90" }}>
            Loading map…
          </text>
        )}

        {/* Pan/zoom group */}
        <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
          {/* land halo */}
          <g style={{ filter: "url(#landShadow)" }}>
            {paths.map((p) => (
              <path key={`halo-${p.id}`} d={p.d} fill={LAND_FILL} stroke="none" />
            ))}
          </g>

          {/* provinces */}
          {paths.map((p) => {
            const isHover = hoverId === p.id;
            const isActive = selectedProvince === p.name;
            return (
              <path
                key={p.id}
                d={p.d}
                fill={isActive ? LAND_ACTIVE : isHover ? LAND_HOVER : LAND_FILL}
                stroke={isActive ? BORDER_STRONG : BORDER}
                strokeWidth={(isActive ? 1.4 : isHover ? 1 : 0.6) / scale}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                style={{ cursor: "pointer", transition: "fill 140ms" }}
                onMouseEnter={() => setHoverId(p.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => {
                  if (dragRef.current.moved) return; // ignore click after drag
                  onSelectProvince(p.name);
                }}
              >
                <title>{p.name}</title>
              </path>
            );
          })}
        </g>
      </svg>

      {/* Top-left: search-style label */}
      {(hoveredName || selectedProvince) && (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-2 rounded-full shadow-md ring-1 ring-black/5 text-xs font-semibold text-slate-800 pointer-events-none flex items-center gap-2 max-w-[70%]">
          <span className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--primary))] flex-shrink-0" />
          <span className="truncate">{hoveredName ?? selectedProvince}</span>
        </div>
      )}

      {/* Compass — top right */}
      <div className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/95 backdrop-blur shadow-md ring-1 ring-black/5 flex items-center justify-center">
        <Navigation size={18} className="text-rose-600 -rotate-0" fill="currentColor" />
        <span className="absolute top-1 text-[9px] font-bold text-slate-700">N</span>
      </div>

      {/* Zoom controls — right middle */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col bg-white/95 backdrop-blur rounded-lg shadow-md ring-1 ring-black/5 overflow-hidden">
        <button
          onClick={() => zoomBy(1.4)}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 transition border-b border-slate-200"
          aria-label="Zoom in"
        >
          <Plus size={18} className="text-slate-700" />
        </button>
        <button
          onClick={() => zoomBy(1 / 1.4)}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 transition border-b border-slate-200"
          aria-label="Zoom out"
        >
          <Minus size={18} className="text-slate-700" />
        </button>
        <button
          onClick={reset}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 transition"
          aria-label="Reset view"
        >
          <Locate size={16} className="text-slate-700" />
        </button>
      </div>

      {/* Scale bar — bottom right */}
      <div className="absolute bottom-3 right-3 flex flex-col items-end gap-1 pointer-events-none">
        <div className="text-[10px] font-semibold text-slate-700 bg-white/85 px-1.5 py-0.5 rounded">
          {scaleKm} km
        </div>
        <div className="h-2 w-[100px] border-l-2 border-r-2 border-b-2 border-slate-700 bg-white/40" />
      </div>

      {/* Attribution — bottom left */}
      <div className="absolute bottom-2 left-3 text-[10px] text-slate-600 font-mono bg-white/70 px-1.5 py-0.5 rounded pointer-events-none">
        Vector Map · {paths.length} provinces · drag to pan · scroll to zoom
      </div>
    </div>
  );
};
