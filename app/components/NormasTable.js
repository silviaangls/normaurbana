'use client'

const THEME = {
  amber: {
    accentColor: '#d4a017',
    accentBg: 'rgba(212,160,23,0.08)',
    accentBorder: 'rgba(212,160,23,0.2)',
    dot: 'bg-[#d4a017]',
    row: '',
    label: 'Normas Obligatorias',
  },
  blue: {
    accentColor: '#4a9eff',
    accentBg: 'rgba(74,158,255,0.08)',
    accentBorder: 'rgba(74,158,255,0.2)',
    dot: 'bg-[#4a9eff]',
    row: '',
    label: 'Recomendaciones de Manuales Nacionales',
  },
  emerald: {
    accentColor: '#2ecc71',
    accentBg: 'rgba(46,204,113,0.08)',
    accentBorder: 'rgba(46,204,113,0.2)',
    dot: 'bg-[#2ecc71]',
    row: '',
    label: 'Referencias Internacionales',
  },
}

const ICONS = {
  amber: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  blue: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  emerald: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
}

function TipoViaBadge({ row }) {
  if (row.tipoViaModificado) {
    return (
      <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-orange-300 bg-orange-400/10 border border-orange-400/30 rounded px-1.5 py-0.5 leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Ajustado · {row.tipoViaLabel}
      </span>
    )
  }
  if (row.tipoViaAdicional) {
    return (
      <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-purple-300 bg-purple-400/10 border border-purple-400/30 rounded px-1.5 py-0.5 leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        Específico · {row.tipoViaLabel}
      </span>
    )
  }
  return null
}

export default function NormasTable({ datos, color }) {
  const theme = THEME[color]

  if (!datos || datos.length === 0) return null

  const hasModifications = datos.some((r) => r.tipoViaModificado || r.tipoViaAdicional)

  return (
    <div
      className="print-table rounded-xl overflow-hidden"
      style={{
        border: '1px solid #2a2a2a',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}
    >
      {/* Encabezado de sección */}
      <div
        className="print-table-header px-5 py-3 flex items-center gap-3"
        style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}
      >
        <span style={{ color: theme.accentColor }}>{ICONS[color]}</span>
        <h3
          className="font-semibold text-sm tracking-wide uppercase"
          style={{ color: theme.accentColor }}
        >
          {theme.label}
        </h3>
        <div className="ml-auto flex items-center gap-2">
          {hasModifications && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-400/10 text-orange-300 border border-orange-400/25">
              Ajustado por tipo de vía
            </span>
          )}
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: theme.accentBg,
              border: `1px solid ${theme.accentBorder}`,
              color: theme.accentColor,
            }}
          >
            {datos.length} parámetros
          </span>
        </div>
      </div>

      {/* Tabla */}
      <div className="print-table-scroll overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="text-xs uppercase tracking-wider"
              style={{ background: '#111111', borderBottom: '1px solid #2a2a2a' }}
            >
              <th className="px-4 py-3 text-left font-medium w-6" style={{ color: '#888888' }}>—</th>
              <th className="px-4 py-3 text-left font-medium" style={{ color: '#888888' }}>Parámetro</th>
              <th className="px-4 py-3 text-right font-medium" style={{ color: '#888888' }}>Valor</th>
              <th className="px-4 py-3 text-left font-medium" style={{ color: '#888888' }}>Unidad</th>
              <th className="px-4 py-3 text-left font-medium" style={{ color: '#888888' }}>Fuente</th>
              <th className="px-4 py-3 text-left font-medium min-w-64" style={{ color: '#888888' }}>Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a2a]">
            {datos.map((row, i) => (
              <tr
                key={i}
                className="transition-colors"
                style={{
                  background: row.tipoViaModificado
                    ? 'rgba(251,146,60,0.03)'
                    : row.tipoViaAdicional
                    ? 'rgba(192,132,252,0.03)'
                    : 'transparent',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = row.tipoViaModificado
                    ? 'rgba(251,146,60,0.03)'
                    : row.tipoViaAdicional
                    ? 'rgba(192,132,252,0.03)'
                    : 'transparent'
                }}
              >
                {/* Indicador (oculto en PDF) */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      row.tipoViaModificado ? 'bg-orange-400' :
                      row.tipoViaAdicional  ? 'bg-purple-400' :
                      theme.dot
                    }`}
                  />
                </td>

                {/* Parámetro */}
                <td className="px-4 py-3 font-medium" style={{ color: '#f5f5f5' }}>
                  <div className="flex flex-col">
                    <span className="whitespace-nowrap">{row.parametro}</span>
                    <TipoViaBadge row={row} />
                  </div>
                </td>

                {/* Valor */}
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <div className="flex flex-col items-end gap-0.5">
                    <span
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: row.tipoViaModificado ? '#fb923c' : '#ffffff',
                      }}
                    >
                      {row.valor}
                    </span>
                    {row.tipoViaModificado && row.valorBase && (
                      <span
                        className="text-xs line-through font-normal"
                        style={{ color: '#555555' }}
                      >
                        {row.valorBase}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#888888' }}>
                  {row.unidad}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-medium"
                    style={{ background: '#1f1f1f', border: '1px solid #333333', color: '#e0e0e0' }}
                  >
                    {row.fuente}
                  </span>
                </td>

                <td className="px-4 py-3 text-xs leading-relaxed break-words" style={{ color: '#888888' }}>
                  {row.detalle}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
