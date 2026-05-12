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
    <div
      className="print-chart rounded-xl overflow-hidden"
      style={{ border: '1px solid #2a2a2a', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
    >
      {/* Encabezado */}
      <div
        className="print-chart-header px-5 py-3 flex items-center gap-3"
        style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ color: '#888888' }}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
        <h3
          className="text-sm tracking-wide"
          style={{ fontWeight: 600, color: '#e0e0e0' }}
        >
          {title}
        </h3>
      </div>

      {/* Gráfica */}
      <div className="print-chart-scroll p-4 overflow-x-auto" style={{ background: '#111111' }}>
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
                  fill="#888888"
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
                  fill="#1a1a1a"
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
