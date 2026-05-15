'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PasswordPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/check-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error || 'Contraseña incorrecta')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold text-[#f5f5f5] tracking-tight"
            style={{ fontFamily: 'var(--fuente-titulos)' }}
          >
            NormaUrb
          </h1>
          <p className="text-[#888888] text-sm mt-2">Acceso beta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="w-full appearance-none bg-[#111111] border border-[#333333] text-[#f5f5f5] text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-[#555555] transition-colors placeholder-[#555555]"
          />

          {error && (
            <p className="text-sm text-[#f59e0b]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-white text-black text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-[#e5e5e5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Verificando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
