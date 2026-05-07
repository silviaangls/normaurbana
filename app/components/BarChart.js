'use client'

const LABEL_W = 170
const BAR_W = 320
const VALUE_W = 100
const SVG_W = LABEL_W + BAR_W + VALUE_W
const ROW_H = 44
const PAD = 10

export default function BarChart({ data, title }) {
  if (!data || data.length === 0) return null

  const parsed = data.map((d) => ({ ...d, num: parseFloat(d.value) })).filter((d) => !isNaN(d.num))
  if (parsed.length === 0) return null

  const maxVal = Math.max(...parsed.map((d) => d.num))
  const svgH = parsed.length * ROW_H + PAD * 2

  return (
    <div className="print-chart rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Encabezado */}
      <div className="print-chart-header px-5 py-3 bg-slate-800/60 border-b border-slate-700/40 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
        <h3 className="text-sm font-semibold text-slate-200 tracking-wide">
          {title}
        </h3>
      </div>

      {/* Gráfica */}
      <div className="print-chart-scroll p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${SVG_W} ${svgH}`}
          className="w-full"
          style={{ maxWidth: SVG_W, minWidth: 320 }}
          aria-label={title}
        >
          {parsed.map((item, i) => {
            const barPx = maxVal > 0 ? (item.num / maxVal) * BAR_W : 0
            const y = PAD + i * ROW_H

            return (
              <g key={i}>
                {/* Etiqueta de fuente */}
                <text
                  x={LABEL_W - 10}
                  y={y + ROW_H / 2 + 4}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="11.5"
                  fontFamily="ui-monospace, monospace"
                >
                  {item.label}
                </text>

                {/* Pista de barra (fondo) — clase bar-track para override en print */}
                <rect
                  className="bar-track"
                  x={LABEL_W}
                  y={y + 10}
                  width={BAR_W}
                  height={ROW_H - 20}
                  fill="#1e293b"
                  rx="5"
                />

                {/* Barra de valor */}
                {barPx > 0 && (
                  <rect
                    x={LABEL_W}
                    y={y + 10}
                    width={barPx}
                    height={ROW_H - 20}
                    fill={item.color}
                    fillOpacity="0.85"
                    rx="5"
                  />
                )}

                {/* Valor numérico */}
                <text
                  x={LABEL_W + BAR_W + 10}
                  y={y + ROW_H / 2 + 4}
                  fill={item.color}
                  fontSize="12"
                  fontFamily="ui-monospace, monospace"
                  fontWeight="700"
                >
                  {item.value} {item.unit}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
