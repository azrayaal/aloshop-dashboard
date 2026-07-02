import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { Card, CardHeader } from '@/components/atoms/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { StatusPill } from '@/components/ui/StatusPill'
import { AuthIcon, CheckIcon, SecurityCheckIcon, VaptIcon, WarningIcon } from '@/components/icons'

const stats: StatTile[] = [
  { id: 'score', label: 'Security Score', value: '98%', delta: 1.2, icon: <SecurityCheckIcon className="h-4 w-4" /> },
  { id: 'auth', label: 'Authentication', value: 'Healthy', valueClassName: 'text-brand-600', caption: 'MFA aktif', icon: <AuthIcon className="h-4 w-4" /> },
  { id: 'vapt', label: 'VAPT Status', value: 'Passed', valueClassName: 'text-brand-600', caption: 'Terakhir 12 Jun 2026', icon: <VaptIcon className="h-4 w-4" /> },
  { id: 'vuln', label: 'Open Vulnerabilities', value: '2', valueClassName: 'text-amber-600', caption: '1 medium · 1 low' },
]

const checklist = [
  { label: 'SSL/TLS Encryption', ok: true },
  { label: 'Multi-Factor Authentication', ok: true },
  { label: 'Data Backup (harian)', ok: true },
  { label: 'Role-based Access Control', ok: true },
  { label: 'PCI-DSS Compliance', ok: true },
  { label: 'Rotasi API Key', ok: false },
]

interface AuditLog {
  time: string
  actor: string
  action: string
  ip: string
  status: string
}

const logs: AuditLog[] = [
  { time: '21 Jun, 09:24', actor: 'budi@aloshop.id', action: 'Login berhasil', ip: '103.20.11.4', status: 'Passed' },
  { time: '21 Jun, 08:58', actor: 'sari@aloshop.id', action: 'Ubah pengaturan toko', ip: '103.20.11.9', status: 'Passed' },
  { time: '21 Jun, 02:11', actor: 'unknown', action: 'Percobaan login gagal (x5)', ip: '45.88.12.201', status: 'Failed' },
  { time: '20 Jun, 23:40', actor: 'andi@aloshop.id', action: 'Export data pelanggan', ip: '103.20.11.7', status: 'Passed' },
  { time: '20 Jun, 19:02', actor: 'system', action: 'Backup database otomatis', ip: 'internal', status: 'Passed' },
]

const columns: Column<AuditLog>[] = [
  { header: 'Waktu', cell: (l) => <span className="text-ink-soft">{l.time}</span> },
  { header: 'Actor', cell: (l) => <span className="font-medium text-ink">{l.actor}</span> },
  { header: 'Aksi', cell: (l) => l.action },
  { header: 'IP', cell: (l) => <span className="font-mono text-xs text-ink-soft">{l.ip}</span> },
  { header: 'Status', cell: (l) => <StatusPill status={l.status} /> },
]

export function SecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Security" subtitle="Postur keamanan sistem, audit, dan kepatuhan" />

      <StatTiles tiles={stats} />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.6fr]">
        <Card className="flex flex-col items-center text-center">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-40 w-40 -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#059669"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(98 / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-ink">98%</span>
              <StatusPill status="Excellent" className="mt-1" dot={false} />
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-soft">Security Score keseluruhan sistem Aloshop</p>

          <ul className="mt-5 w-full space-y-2.5">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-center gap-2.5 text-sm">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    c.ok ? 'bg-brand-100 text-brand-600' : 'bg-amber-100 text-amber-600'
                  }`}
                >
                  {c.ok ? <CheckIcon className="h-3.5 w-3.5" /> : <WarningIcon className="h-3.5 w-3.5" />}
                </span>
                <span className={c.ok ? 'text-ink' : 'text-amber-700'}>{c.label}</span>
                {!c.ok && <span className="ml-auto text-xs font-medium text-amber-600">Perlu tindakan</span>}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-0">
          <div className="p-5 pb-0">
            <CardHeader title="Audit Log" actionLabel="Lihat Semua" />
          </div>
          <div className="px-5 pb-5">
            <DataTable columns={columns} rows={logs} rowKey={(l) => l.time + l.actor} />
          </div>
        </Card>
      </div>
    </div>
  )
}
