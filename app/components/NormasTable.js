'use client'

const THEME = {
  amber: {
    header: 'bg-amber-500/10 border-b border-amber-500/30',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
    title: 'text-amber-300',
    dot: 'bg-amber-400',
    row: 'hover:bg-amber-500/5',
    border: 'border-amber-500/20',
    label: 'Normas Obligatorias',
  },
  blue: {
    header: 'bg-blue-500/10 border-b border-blue-500/30',
    badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/40',
    title: 'text-blue-300',
    dot: 'bg-blue-400',
    row: 'hover:bg-blue-500/5',
    border: 'border-blue-500/20',
    label: 'Recomendaciones de Manuales Nacionales',
  },
  emerald: {
    header: 'bg-emerald-500/10 border-b border-emerald-500/30',
    badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
    title: 'text-emerald-300',
    dot: 'bg-emerald-400',
    row: 'hover:bg-emerald-500/5',
    border: 'border-emerald-500/20',
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
    <div className={`print-table rounded-xl border ${theme.border} overflow-hidden`}>
      {/* Encabezado de sección */}
      <div className={`print-table-header px-5 py-3 flex items-center gap-3 ${theme.header}`}>
        <span className={theme.title}>{ICONS[color]}</span>
        <h3 className={`font-semibold text-sm tracking-wide uppercase ${theme.title}`}>
          {theme.label}
        </h3>
        <div className="ml-auto flex items-center gap-2">
          {hasModifications && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-400/10 text-orange-300 border border-orange-400/25">
              Ajustado por tipo de vía
            </span>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${theme.badge}`}>
            {datos.length} parámetros
          </span>
        </div>
      </div>

      {/* Tabla */}
      <div className="print-table-scroll overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800/60 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left font-medium w-6">—</th>
              <th className="px-4 py-3 text-left font-medium">Parámetro</th>
              <th className="px-4 py-3 text-right font-medium">Valor</th>
              <th className="px-4 py-3 text-left font-medium">Unidad</th>
              <th className="px-4 py-3 text-left font-medium">Fuente</th>
              <th className="px-4 py-3 text-left font-medium min-w-64">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/40">
            {datos.map((row, i) => (
              <tr
                key={i}
                className={`transition-colors ${theme.row} ${
                  row.tipoViaModificado ? 'bg-orange-400/5' : ''
                } ${row.tipoViaAdicional ? 'bg-purple-400/5' : ''}`}
              >
                {/* Indicador (oculto en PDF) */}
                <td className="px-4 py-3">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                    row.tipoViaModificado ? 'bg-orange-400' :
                    row.tipoViaAdicional  ? 'bg-purple-400' :
                    theme.dot
                  }`} />
                </td>

                {/* Parámetro + badge de tipo de vía */}
                <td className="px-4 py-3 font-medium text-slate-100">
                  <div className="flex flex-col">
                    <span className="whitespace-nowrap">{row.parametro}</span>
                    <TipoViaBadge row={row} />
                  </div>
                </td>

                {/* Valor + valor base tachado si fue modificado */}
                <td className="px-4 py-3 text-right font-mono font-semibold whitespace-nowrap">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className={row.tipoViaModificado ? 'text-orange-300' : 'text-white'}>
                      {row.valor}
                    </span>
                    {row.tipoViaModificado && row.valorBase && (
                      <span className="text-slate-600 text-xs line-through font-normal">
                        {row.valorBase}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                  {row.unidad}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${theme.badge}`}>
                    {row.fuente}
                  </span>
                </td>

                <td className="px-4 py-3 text-slate-400 text-xs leading-relaxed break-words">
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
