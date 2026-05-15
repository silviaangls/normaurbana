'use client'

import { useState } from 'react'

function ParamsTable({ parametros }) {
  return (
    <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#0f0f0f', borderBottom: '1px solid #2a2a2a' }}>
          <th className="px-3 py-2 text-left font-medium" style={{ color: '#888888' }}>Parámetro</th>
          <th className="px-3 py-2 text-right font-medium whitespace-nowrap" style={{ color: '#888888' }}>Valor</th>
          <th className="px-3 py-2 text-left font-medium" style={{ color: '#888888' }}>Unidad</th>
        </tr>
      </thead>
      <tbody>
        {parametros.map((p, i) => (
          <tr key={i} style={{ borderTop: i > 0 ? '1px solid #1f1f1f' : 'none' }}>
            <td className="px-3 py-2" style={{ color: '#e0e0e0' }}>{p.parametro}</td>
            <td
              className="px-3 py-2 text-right font-semibold tabular-nums"
              style={{ color: '#ffffff', fontFamily: 'var(--font-space-grotesk)' }}
            >
              {p.valor}
            </td>
            <td className="px-3 py-2" style={{ color: '#888888' }}>{p.unidad}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function IntlTable({ fuentes }) {
  return (
    <div style={{ borderTop: '1px solid #1a2a1a' }}>
      {/* Section header */}
      <div
        className="px-3 py-2 flex items-center gap-2"
        style={{ background: 'rgba(46,204,113,0.06)', borderBottom: '1px solid #1a2a1a' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ color: '#2ecc71' }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#2ecc71' }}>
          Referencias Internacionales
        </span>
      </div>
      <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#0a1a0a', borderBottom: '1px solid #1a2a1a' }}>
            <th className="px-3 py-2 text-left font-medium" style={{ color: '#2ecc71', opacity: 0.7 }}>Fuente</th>
            <th className="px-3 py-2 text-left font-medium" style={{ color: '#2ecc71', opacity: 0.7 }}>Referencia</th>
            <th className="px-3 py-2 text-left font-medium" style={{ color: '#2ecc71', opacity: 0.7 }}>Aportación</th>
          </tr>
        </thead>
        <tbody>
          {fuentes.map((f, i) => (
            <tr key={i} style={{ borderTop: i > 0 ? '1px solid #1a2a1a' : 'none' }}>
              <td className="px-3 py-2 whitespace-nowrap">
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ background: 'rgba(46,204,113,0.08)', border: '1px solid rgba(46,204,113,0.2)', color: '#86efac' }}
                >
                  {f.fuente}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs" style={{ color: '#555555' }}>{f.referencia}</td>
              <td className="px-3 py-2 text-xs leading-relaxed" style={{ color: '#888888' }}>{f.parametro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TipoCard({ tipo, tipoViaLabel, recommended, expanded, onToggle }) {
  return (
    <div
      className="iv-card rounded-xl overflow-hidden"
      style={{
        border: recommended
          ? '1px solid rgba(46,204,113,0.25)'
          : '1px solid #2a2a2a',
      }}
    >
      {/* Header — clickable */}
      <button
        type="button"
        onClick={onToggle}
        className="no-print w-full px-5 py-4 text-left flex items-start justify-between gap-4"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className="intervention-title font-semibold text-base text-white print:text-gray-900"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {tipo.nombre}
            </span>
            {recommended && tipoViaLabel && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: 'rgba(46,204,113,0.1)',
                  border: '1px solid rgba(46,204,113,0.3)',
                  color: '#2ecc71',
                }}
              >
                Recomendado · {tipoViaLabel}
              </span>
            )}
            {tipo.requiereEspecialista && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: 'rgba(234,179,8,0.08)',
                  border: '1px solid rgba(234,179,8,0.25)',
                  color: '#fbbf24',
                }}
              >
                Requiere {tipo.especialistas?.join(', ')}
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
            {tipo.descripcion}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 items-center">
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: '#1f1f1f', border: '1px solid #333333', color: '#aaaaaa' }}
            >
              {tipo.fuente}
            </span>
            <span className="text-xs" style={{ color: '#555555' }}>{tipo.referencia}</span>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 shrink-0 mt-1.5 transition-transform duration-200"
          style={{ color: '#555555', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Print-only header (always visible in PDF) */}
      <div
        className="print-only iv-card-print-header px-5 pt-4"
        style={{ display: 'none' }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {tipo.nombre}
          </span>
          {recommended && tipoViaLabel && (
            <span className="text-xs">· Recomendado para {tipoViaLabel}</span>
          )}
          {tipo.requiereEspecialista && (
            <span className="text-xs">· Requiere {tipo.especialistas?.join(', ')}</span>
          )}
        </div>
        <p className="text-xs" style={{ color: '#475569' }}>{tipo.descripcion}</p>
        <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
          {tipo.fuente} — {tipo.referencia}
        </p>
      </div>

      {/* Params + intl refs — collapsed on screen, always expanded in PDF for recommended */}
      <div
        className={recommended ? 'iv-params-print' : undefined}
        style={{
          display: expanded ? 'block' : 'none',
          borderTop: '1px solid #2a2a2a',
        }}
      >
        <div className="px-5 py-3">
          <ParamsTable parametros={tipo.parametros} />
        </div>
        {tipo.fuentesInternacionales?.length > 0 && (
          <div className="px-5 pb-4">
            <IntlTable fuentes={tipo.fuentesInternacionales} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function InfraestructuraVerdePanel({ tiposInfraestructura, tipoVia, tipoViaLabel }) {
  const [expandedSet, setExpandedSet] = useState(new Set())
  const [othersOpen, setOthersOpen] = useState(false)

  const recommended = tipoVia
    ? tiposInfraestructura.filter((t) => t.aplicacion.includes(tipoVia))
    : tiposInfraestructura
  const others = tipoVia
    ? tiposInfraestructura.filter((t) => !t.aplicacion.includes(tipoVia))
    : []

  const toggle = (key) => {
    setExpandedSet((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div>
      {/* ── Tipos recomendados para este tipo de vía ── */}
      {recommended.length > 0 ? (
        <div className="flex flex-col gap-4 mb-6">
          {recommended.map((tipo) => (
            <TipoCard
              key={tipo.nombre}
              tipo={tipo}
              tipoViaLabel={tipoViaLabel}
              recommended
              expanded={expandedSet.has(tipo.nombre)}
              onToggle={() => toggle(tipo.nombre)}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm mb-6" style={{ color: '#888888' }}>
          No hay tipos de infraestructura recomendados específicamente para este tipo de vía.
          Consulta los tipos disponibles abajo.
        </p>
      )}

      {/* ── Otros tipos (colapsable, oculto en PDF) ── */}
      {others.length > 0 && (
        <div className="no-print">
          <button
            type="button"
            onClick={() => setOthersOpen((v) => !v)}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors"
            style={{ color: '#888888', border: '1px solid #2a2a2a', background: '#111111' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform duration-200"
              style={{ transform: othersOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {othersOpen ? 'Ocultar' : 'Ver'} otros tipos aplicables en diferentes vías
            <span
              className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: '#222222', border: '1px solid #333333', color: '#666666' }}
            >
              {others.length}
            </span>
          </button>

          {othersOpen && (
            <div className="flex flex-col gap-4 mt-4">
              {others.map((tipo) => (
                <TipoCard
                  key={tipo.nombre}
                  tipo={tipo}
                  tipoViaLabel={tipoViaLabel}
                  recommended={false}
                  expanded={expandedSet.has('other-' + tipo.nombre)}
                  onToggle={() => toggle('other-' + tipo.nombre)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
