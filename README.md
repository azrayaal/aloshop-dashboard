# Aloshop — Admin (Seller Dashboard)

Desktop seller/admin dashboard for Aloshop, built with **React + TypeScript + Vite + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Architecture

```
src/
├── components/
│   ├── atoms/        # Logo, Badge, Card, IconTile, StatDelta
│   ├── layouts/      # Sidebar, Topbar, AdminLayout, UserBadge
│   ├── dashboard/    # KpiCard/Grid, SalesChart, SalesPerformance,
│   │                 #   AiInsightsPanel, Sparkline, CrmSnapshot,
│   │                 #   InventoryOverview, OperationalMonitoring, SecuritySystem
│   └── icons/        # dependency-free inline SVG icon set
├── config/           # navigation config (sidebar)
├── features/         # DashboardPage — composes the overview
├── data/             # mock dashboard content (swap for an API)
├── lib/              # cn(), formatters, chart geometry helpers
└── types/            # domain models
```

### Charts

All charts (multi-series sales line, AI conversion sparkline, inventory-health
donut) are hand-rolled inline **SVG** — no charting dependency. The line-smoothing
logic lives in `src/lib/chart.ts`.

### Extending

The sidebar is fully wired (`config/navigation.tsx`); only the **Dashboard**
view ships in this POC. Add a feature module under `src/features/` and switch on
the active nav id in `App.tsx` to build out the remaining sections.
# aloshop-dashboard
