import { AiIcon, ChevronDownIcon } from '@/components/icons'
import { Sparkline } from '@/components/dashboard/Sparkline'
import { aiConversionLift, aiInsights } from '@/data/dashboard'

/** Green AI Insights panel: conversion lift + recommendation shortcuts. */
export function AiInsightsPanel() {
  return (
    <section className="flex h-full flex-col gap-4 rounded-card bg-gradient-to-b from-brand-600 to-brand-800 p-5 text-white shadow-card">
      <header className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
          <AiIcon className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-bold">AI Insights</h3>
        <span className="ml-auto rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          Powered by AI
        </span>
      </header>

      {/* Conversion lift card */}
      <div className="rounded-2xl bg-white p-4 text-ink">
        <p className="text-sm font-medium text-ink-soft">AI Conversion Lift</p>
        <p className="mt-1 text-4xl font-extrabold text-brand-600">{aiConversionLift.value}</p>
        <p className="text-xs text-ink-muted">{aiConversionLift.caption}</p>
        <Sparkline values={aiConversionLift.spark} className="mt-3 h-14 w-full" />
      </div>

      {/* Recommendation shortcuts */}
      {aiInsights.map(({ id, title, value, actionLabel, Icon }) => (
        <div key={id} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-white/70">{value}</p>
            <button
              type="button"
              className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-100 hover:text-white"
            >
              {actionLabel}
              <ChevronDownIcon className="h-3.5 w-3.5 -rotate-90" />
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}
