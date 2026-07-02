import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/atoms/Logo'
import { AiIcon, AuthIcon, SecurityCheckIcon } from '@/components/icons'
import { useAuth } from '@/context/AuthContext'

/** Dummy login screen. Any (non-empty) credentials are accepted. */
export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('admin@aloshop.id')
  const [password, setPassword] = useState('password')
  const [remember, setRemember] = useState(true)

  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    login(email)
    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand / marketing panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 p-12 text-white lg:flex">
        <Logo className="[&_span]:text-white [&_.text-brand-600]:text-brand-200" />
        <div className="relative space-y-6">
          <h2 className="text-4xl font-extrabold leading-tight">
            Kelola bisnis Anda dalam satu dashboard.
          </h2>
          <p className="max-w-md text-white/80">
            Pantau penjualan, inventori, pelanggan, dan performa AI secara real-time di seluruh toko
            Aloshop Anda.
          </p>
          <ul className="space-y-3 text-sm">
            {[
              { icon: <AiIcon className="h-5 w-5" />, label: 'AI-powered insights & rekomendasi' },
              { icon: <SecurityCheckIcon className="h-5 w-5" />, label: 'Keamanan enterprise (VAPT passed)' },
              { icon: <AuthIcon className="h-5 w-5" />, label: 'Multi-tenant store management' },
            ].map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                  {f.icon}
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-white/60">© 2026 Aloshop. All rights reserved.</p>
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center bg-surface-subtle p-6 lg:w-1/2">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Selamat datang kembali</h1>
            <p className="mt-1 text-sm text-ink-soft">Masuk ke Aloshop Seller Dashboard</p>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@aloshop.id"
                className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </label>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-ink-soft">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
              />
              Ingat saya
            </label>
            <button type="button" className="font-semibold text-brand-600 hover:text-brand-700">
              Lupa password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-800"
          >
            Masuk
          </button>

          <p className="text-center text-xs text-ink-muted">
            Demo login — kredensial apa pun diterima.
          </p>
        </form>
      </div>
    </div>
  )
}
