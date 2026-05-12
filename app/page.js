'use client'

import { useState } from 'react'
import NormasTable from './components/NormasTable'
import BarChart from './components/BarChart'
import PDFExport from './components/PDFExport'
import { ALCALDIAS, INTERVENCIONES, TIPOS_VIA } from '@/lib/normas'

const selectClass =
  'w-full appearance-none bg-[#111111] border border-[#333333] text-[#f5f5f5] text-sm rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-[#555555] transition-colors'

export default function HomePage() {
  const [alcaldia, setAlcaldia] = useState('')
  const [intervencion, setIntervencion] = useState('')
  const [tipoVia, setTipoVia] = useState('')
  const [normas, setNormas] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const canSubmit = alcaldia && intervencion && tipoVia && !loading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    setLoading(true)
    setError(null)
    setNormas(null)

    try {
      const params = new URLSearchParams({ alcaldia, intervencion, tipoVia })
      const res = await fetch(`/api/normas?${params}`)
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Error ${res.status}`)
      }
      const data = await res.json()
      setNormas(data)
      setTimeout(() => {
        document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const tipoViaInfo = TIPOS_VIA.find((t) => t.value === tipoVia)

  const buttonClass = loading
    ? 'inline-flex items-center gap-2 px-6 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-[#888888] cursor-not-allowed font-semibold text-sm rounded-lg transition-colors'
    : canSubmit
    ? 'inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-white/90 text-black font-semibold text-sm rounded-lg transition-colors shadow-sm'
    : 'inline-flex items-center gap-2 px-6 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-[#555555] cursor-not-allowed font-semibold text-sm rounded-lg transition-colors'

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      {/* ── Print-only header ── */}
      <div className="print-only p-6 border-b border-slate-300" style={{ display: 'none' }}>
        <div className="flex items-center gap-4 mb-1">
          <span className="text-2xl font-black tracking-tight" style={{ color: '#0f172a' }}>NormaUrb</span>
          <span className="text-sm" style={{ color: '#64748b' }}>Consultor de Normas de Diseño Urbano · México</span>
        </div>
        {normas && (
          <p className="text-sm" style={{ color: '#475569' }}>
            <strong>Intervención:</strong> {normas.nombre} &nbsp;|&nbsp;
            <strong>Tipo de vía:</strong> {tipoViaInfo?.label || '—'} &nbsp;|&nbsp;
            <strong>Proyecto en:</strong> {alcaldia} &nbsp;|&nbsp;
            <strong>Fecha:</strong>{' '}
            {new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        )}
      </div>

      {/* ══════════════════════════════════════
          HEADER
      ══════════════════════════════════════ */}
      <header className="no-print border-b border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1
                  className="text-3xl tracking-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700 }}
                >
                  <span style={{ color: '#ffffff' }}>Norma</span><span style={{ color: '#888888' }}>Urb</span>
                </h1>
              </div>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: '#888888' }}>
                Consultor de normas de diseño urbano para intervenciones en vía pública en la Ciudad de México.
                Integra RCDF, NOM-034-SCT2, Manual de Calles, NACTO, ITDP, CROW y SEDATU.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 items-start pt-1">
              {['RCDF', 'NOM-034', 'Manual CDMX', 'NACTO', 'ITDP', 'CROW', 'SEDATU'].map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-1 rounded-md font-mono"
                  style={{ background: '#1f1f1f', border: '1px solid #333333', color: '#888888' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          FORM
      ══════════════════════════════════════ */}
      <section className="no-print max-w-6xl mx-auto px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6"
          style={{
            background: '#111111',
            border: '1px solid #2a2a2a',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
          }}
        >
          <h2
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: '#888888', fontWeight: 500 }}
          >
            Parámetros de consulta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {/* Alcaldía */}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: '#e0e0e0', fontWeight: 500 }} htmlFor="alcaldia">
                Alcaldía del proyecto
              </label>
              <div className="relative">
                <select id="alcaldia" value={alcaldia} onChange={(e) => setAlcaldia(e.target.value)} className={selectClass}>
                  <option value="">Seleccionar alcaldía…</option>
                  {ALCALDIAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: '#888888' }}>▾</span>
              </div>
              <p className="mt-1.5 text-xs" style={{ color: '#888888' }}>
                Solo para identificación de la ficha técnica
              </p>
            </div>

            {/* Tipo de intervención */}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: '#e0e0e0', fontWeight: 500 }} htmlFor="intervencion">
                Tipo de intervención
              </label>
              <div className="relative">
                <select id="intervencion" value={intervencion} onChange={(e) => setIntervencion(e.target.value)} className={selectClass}>
                  <option value="">Seleccionar tipo…</option>
                  {INTERVENCIONES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: '#888888' }}>▾</span>
              </div>
            </div>

            {/* Tipo de vía */}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: '#e0e0e0', fontWeight: 500 }} htmlFor="tipoVia">
                Tipo de vía
              </label>
              <div className="relative">
                <select id="tipoVia" value={tipoVia} onChange={(e) => setTipoVia(e.target.value)} className={selectClass}>
                  <option value="">Seleccionar tipo de vía…</option>
                  {TIPOS_VIA.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}{t.sublabel ? ` — ${t.sublabel}` : ''}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: '#888888' }}>▾</span>
              </div>
            </div>
          </div>

          <button type="submit" disabled={!canSubmit} className={buttonClass}>
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Consultando…
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                Consultar Normas
              </>
            )}
          </button>
        </form>
      </section>

      {/* Error */}
      {error && (
        <div className="no-print max-w-6xl mx-auto px-6 -mt-2 mb-4">
          <div className="bg-red-950/50 border border-red-700/50 text-red-300 text-sm rounded-lg px-4 py-3 flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          RESULTS
      ══════════════════════════════════════ */}
      {normas && (
        <section id="resultados" className="max-w-6xl mx-auto px-6 pb-16">
          {/* Result header */}
          <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: '#888888' }}>Ficha técnica</span>
                <span style={{ color: '#333333' }}>·</span>
                <span className="text-xs font-mono" style={{ color: '#888888' }}>Proyecto en {alcaldia}</span>
                {tipoViaInfo && (
                  <>
                    <span style={{ color: '#333333' }}>·</span>
                    <span className="text-xs font-mono" style={{ color: '#888888' }}>{tipoViaInfo.label}</span>
                  </>
                )}
              </div>
              <h2
                className="text-2xl"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, color: '#f5f5f5' }}
              >
                {normas.nombre}
              </h2>
              <p className="text-sm mt-1 max-w-2xl" style={{ color: '#888888' }}>{normas.descripcion}</p>
            </div>
            <PDFExport normas={normas} alcaldia={alcaldia} intervencion={intervencion} tipoVia={tipoVia} />
          </div>

          {/* Nota de tipo de vía */}
          {normas.tipoViaNota && (
            <div
              className="no-print mb-6 flex items-start gap-3 rounded-xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #2a2a2a' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ color: '#888888' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm leading-relaxed" style={{ color: '#e0e0e0' }}>{normas.tipoViaNota}</p>
            </div>
          )}

          {/* Leyenda de indicadores si hay modificaciones */}
          {(normas.obligatorias.some(r => r.tipoViaModificado || r.tipoViaAdicional) ||
            normas.manualesNacionales.some(r => r.tipoViaModificado || r.tipoViaAdicional) ||
            normas.internacionales.some(r => r.tipoViaModificado || r.tipoViaAdicional)) && (
            <div className="no-print flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-1.5 text-xs text-orange-300">
                <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                Valor ajustado para {tipoViaInfo?.label}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-purple-300">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
                Parámetro específico de {tipoViaInfo?.label}
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#888888' }}>
                <span
                  className="inline-block font-mono px-1 rounded"
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    color: '#888888',
                    fontSize: '10px',
                    textDecoration: 'line-through',
                  }}
                >
                  valor
                </span>
                Valor base antes del ajuste
              </div>
            </div>
          )}

          {/* Summary badges */}
          <div className="no-print flex flex-wrap gap-3 mb-8">
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm"
              style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)' }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#d4a017' }} />
              <span className="font-medium" style={{ color: '#d4a017' }}>{normas.obligatorias.length} normas obligatorias</span>
            </div>
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm"
              style={{ background: 'rgba(74,158,255,0.08)', border: '1px solid rgba(74,158,255,0.2)' }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#4a9eff' }} />
              <span className="font-medium" style={{ color: '#4a9eff' }}>{normas.manualesNacionales.length} recomendaciones nacionales</span>
            </div>
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm"
              style={{ background: 'rgba(46,204,113,0.08)', border: '1px solid rgba(46,204,113,0.2)' }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#2ecc71' }} />
              <span className="font-medium" style={{ color: '#2ecc71' }}>{normas.internacionales.length} referencias internacionales</span>
            </div>
          </div>

          {/* Three tables */}
          <div className="flex flex-col gap-6">
            <NormasTable datos={normas.obligatorias} color="amber" />
            <NormasTable datos={normas.manualesNacionales} color="blue" />
            <NormasTable datos={normas.internacionales} color="emerald" />

            {normas.chartData && normas.chartData.length > 0 && (
              <BarChart data={normas.chartData} title={normas.chartTitle} />
            )}
          </div>

          {/* Disclaimer */}
          <p
            className="no-print mt-8 text-xs leading-relaxed border-t pt-5"
            style={{ color: '#888888', borderColor: '#1f1f1f' }}
          >
            Los valores presentados corresponden a las normas vigentes a la fecha de consulta.
            Verifique siempre la versión actualizada de cada instrumento normativo antes de
            aplicar los parámetros en proyecto. NormaUrb no sustituye la consulta a la autoridad competente.
          </p>
        </section>
      )}

      {/* Empty state */}
      {!normas && !loading && !error && (
        <div className="no-print max-w-6xl mx-auto px-6 pb-20 flex flex-col items-center text-center pt-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: '#111111', border: '1px solid #2a2a2a', color: '#888888' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="1" y="10" width="10" height="11" rx="1" />
              <rect x="11" y="4" width="12" height="17" rx="1" />
              <line x1="1" y1="21" x2="23" y2="21" />
              <line x1="5" y1="14" x2="5" y2="14" />
              <line x1="5" y1="17" x2="5" y2="17" />
              <line x1="15" y1="8" x2="15" y2="8" />
              <line x1="19" y1="8" x2="19" y2="8" />
              <line x1="15" y1="12" x2="15" y2="12" />
              <line x1="19" y1="12" x2="19" y2="12" />
              <line x1="15" y1="16" x2="15" y2="16" />
              <line x1="19" y1="16" x2="19" y2="16" />
            </svg>
          </div>
          <h3
            className="font-semibold text-lg mb-2"
            style={{ color: '#f5f5f5', fontFamily: 'var(--font-space-grotesk)' }}
          >
            Selecciona los tres filtros
          </h3>
          <p className="text-sm max-w-md" style={{ color: '#888888' }}>
            Elige la alcaldía, el tipo de intervención y el tipo de vía para obtener la ficha
            técnica con parámetros ajustados al contexto específico del proyecto.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-xl">
            {INTERVENCIONES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setIntervencion(t.value)}
                className="text-xs px-3 py-1.5 rounded-full transition-colors"
                style={{ background: '#111111', border: '1px solid #2a2a2a', color: '#888888' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f5f5f5'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#888888'
                  e.currentTarget.style.borderColor = '#2a2a2a'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className="no-print py-6 text-center text-xs"
        style={{ borderTop: '1px solid #1f1f1f', color: '#888888' }}
      >
        NormaUrb · Consultor de Normas de Diseño Urbano · México, CDMX
      </footer>
    </div>
  )
}
