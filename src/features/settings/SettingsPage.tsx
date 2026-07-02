import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/atoms/Card'
import { cn } from '@/lib/cn'
import { useAuth } from '@/context/AuthContext'

const sections = [
  { id: 'profile', label: 'Profil' },
  { id: 'store', label: 'Toko' },
  { id: 'notifications', label: 'Notifikasi' },
  { id: 'billing', label: 'Pembayaran' },
] as const

type SectionId = (typeof sections)[number]['id']

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  )
}

function Toggle({ label, description, defaultOn }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(Boolean(defaultOn))
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3.5 last:border-0">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-xs text-ink-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={cn('relative h-6 w-11 shrink-0 rounded-full transition', on ? 'bg-brand-600' : 'bg-slate-300')}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
            on ? 'left-[22px]' : 'left-0.5',
          )}
        />
      </button>
    </div>
  )
}

export function SettingsPage() {
  const [section, setSection] = useState<SectionId>('profile')
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Kelola profil, toko, notifikasi, dan pembayaran"
        actions={<Button>Simpan Perubahan</Button>}
      />

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        {/* Section nav */}
        <Card className="h-fit p-2">
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSection(s.id)}
                className={cn(
                  'w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition',
                  section === s.id ? 'bg-brand-100 text-brand-800' : 'text-ink-soft hover:bg-surface-sunken',
                )}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Section content */}
        <Card>
          {section === 'profile' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-ink">Informasi Profil</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nama Lengkap" defaultValue={user?.name ?? 'Budi Santoso'} />
                <Field label="Email" type="email" defaultValue={user?.email ?? 'admin@aloshop.id'} />
                <Field label="Nomor Telepon" defaultValue="+62 812 3456 7890" />
                <Field label="Peran" defaultValue={user?.role ?? 'Seller Admin'} />
              </div>
            </div>
          )}

          {section === 'store' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-ink">Pengaturan Toko</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nama Toko" defaultValue="Aloshop Store Pusat" />
                <Field label="Kota" defaultValue="Jakarta Selatan" />
                <Field label="Mata Uang" defaultValue="IDR (Rp)" />
                <Field label="Zona Waktu" defaultValue="WIB (GMT+7)" />
              </div>
            </div>
          )}

          {section === 'notifications' && (
            <div>
              <h3 className="mb-2 text-base font-bold text-ink">Preferensi Notifikasi</h3>
              <Toggle label="Pesanan baru" description="Email setiap ada pesanan masuk" defaultOn />
              <Toggle label="Stok menipis" description="Peringatan saat stok di bawah reorder level" defaultOn />
              <Toggle label="Laporan mingguan" description="Ringkasan performa setiap Senin" defaultOn />
              <Toggle label="Insight AI" description="Rekomendasi & anomali dari model AI" />
              <Toggle label="Promo & marketing" description="Kabar fitur dan penawaran Aloshop" />
            </div>
          )}

          {section === 'billing' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-ink">Pembayaran & Langganan</h3>
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                <p className="text-sm text-ink-soft">Paket saat ini</p>
                <p className="text-lg font-bold text-ink">Aloshop Business — Rp 1.499.000 / bln</p>
                <p className="mt-1 text-xs text-ink-muted">Perpanjangan berikutnya: 21 Jul 2026</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Metode Pembayaran" defaultValue="Visa •••• 4242" />
                <Field label="Email Penagihan" type="email" defaultValue="finance@aloshop.id" />
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
