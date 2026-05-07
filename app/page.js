'use client'

import { useState } from 'react'
import NormasTable from './components/NormasTable'
import BarChart from './components/BarChart'
import PDFExport from './components/PDFExport'
import { ALCALDIAS, INTERVENCIONES, TIPOS_VIA } from '@/lib/normas'

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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
            <strong>Alcaldía:</strong> {alcaldia} &nbsp;|&nbsp;
            <strong>Fecha:</strong>{' '}
            {new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        )}
      </div>

      {/* ══════════════════════════════════════
          HEADER
      ══════════════════════════════════════ */}
      <header className="no-print relative overflow-hidden border-b border-slate-800/80">
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 60% at 50% -10%, #1d4ed820 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9.5L12 3l9 6.5V21H3V9.5Z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-white">
                  Norma<span className="text-blue-400">Urb</span>
                </h1>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Consultor de normas de diseño urbano para intervenciones en vía pública en la Ciudad de México.
                Integra RCDF, NOM-034-SCT2, Manual de Calles, NACTO, ITDP, CROW y SEDATU.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 items-start pt-1">
              {['RCDF', 'NOM-034', 'Manual CDMX', 'NACTO', 'ITDP', 'CROW', 'SEDATU'].map((s) => (
                <span key={s} className="text-xs px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-400 font-mono">
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
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Parámetros de consulta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {/* Alcaldía */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="alcaldia">
                Alcaldía
              </label>
              <div className="relative">
                <select
                  id="alcaldia"
                  value={alcaldia}
                  onChange={(e) => setAlcaldia(e.target.value)}
                  className="w-full appearance-none bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Seleccionar alcaldía…</option>
                  {ALCALDIAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">▾</span>
              </div>
            </div>

            {/* Tipo de intervención */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="intervencion">
                Tipo de intervención
              </label>
              <div className="relative">
                <select
                  id="intervencion"
                  value={intervencion}
                  onChange={(e) => setIntervencion(e.target.value)}
                  className="w-full appearance-none bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Seleccionar tipo…</option>
                  {INTERVENCIONES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">▾</span>
              </div>
            </div>

            {/* Tipo de vía — NUEVO */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="tipoVia">
                Tipo de vía
              </label>
              <div className="relative">
                <select
                  id="tipoVia"
                  value={tipoVia}
                  onChange={(e) => setTipoVia(e.target.value)}
                  className="w-full appearance-none bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Seleccionar tipo de vía…</option>
                  {TIPOS_VIA.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}{t.sublabel ? ` — ${t.sublabel}` : ''}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">▾</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-colors shadow-lg"
          >
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
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Ficha técnica</span>
                <span className="text-slate-700">·</span>
                <span className="text-xs font-mono text-blue-400">{alcaldia}</span>
                {tipoViaInfo && (
                  <>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs font-mono text-slate-400">{tipoViaInfo.label}</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">{normas.nombre}</h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">{normas.descripcion}</p>
            </div>
            <PDFExport normas={normas} alcaldia={alcaldia} intervencion={intervencion} tipoVia={tipoVia} />
          </div>

          {/* Nota de tipo de vía */}
          {normas.tipoViaNota && (
            <div className="no-print mb-6 flex items-start gap-3 bg-blue-500/8 border border-blue-500/20 rounded-xl px-4 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-blue-200 text-sm leading-relaxed">{normas.tipoViaNota}</p>
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
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="inline-block font-mono bg-slate-800 border border-slate-700 px-1 rounded text-slate-500" style={{ fontSize: '10px', textDecoration: 'line-through' }}>valor</span>
                Valor base antes del ajuste
              </div>
            </div>
          )}

          {/* Summary badges */}
          <div className="no-print flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-lg px-3 py-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span className="text-amber-300 font-medium">{normas.obligatorias.length} normas obligatorias</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-lg px-3 py-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              <span className="text-blue-300 font-medium">{normas.manualesNacionales.length} recomendaciones nacionales</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-lg px-3 py-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span className="text-emerald-300 font-medium">{normas.internacionales.length} referencias internacionales</span>
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
          <p className="no-print mt-8 text-xs text-slate-600 leading-relaxed border-t border-slate-800 pt-5">
            Los valores presentados corresponden a las normas vigentes a la fecha de consulta.
            Verifique siempre la versión actualizada de cada instrumento normativo antes de
            aplicar los parámetros en proyecto. NormaUrb no sustituye la consulta a la autoridad competente.
          </p>
        </section>
      )}

      {/* Empty state */}
      {!normas && !loading && !error && (
        <div className="no-print max-w-6xl mx-auto px-6 pb-20 flex flex-col items-center text-center pt-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center mb-5 text-slate-500">
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
          <h3 className="text-slate-300 font-semibold text-lg mb-2">Selecciona los tres filtros</h3>
          <p className="text-slate-500 text-sm max-w-md">
            Elige la alcaldía, el tipo de intervención y el tipo de vía para obtener la ficha
            técnica con parámetros ajustados al contexto específico del proyecto.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-xl">
            {INTERVENCIONES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setIntervencion(t.value)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-100 hover:border-blue-500 transition-colors"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="no-print border-t border-slate-800 py-6 text-center text-xs text-slate-600">
        NormaUrb · Consultor de Normas de Diseño Urbano · México, CDMX
      </footer>
    </div>
  )
}
