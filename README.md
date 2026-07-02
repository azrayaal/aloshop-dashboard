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
│   ├── atoms/        # Logo, Badge, Card, IconTile, StatDelta, Avatar helpers
│   ├── ui/           # reusable kit: PageHeader, DataTable, StatTiles,
│   │                 #   StatusPill, FilterTabs, SearchInput, Button, Avatar
│   ├── layouts/      # Sidebar, Topbar, AdminLayout, ProtectedRoute, UserBadge
│   ├── dashboard/    # KpiCard/Grid, SalesChart, SalesPerformance,
│   │                 #   AiInsightsPanel, Sparkline, CrmSnapshot,
│   │                 #   InventoryOverview, OperationalMonitoring, SecuritySystem
│   └── icons/        # dependency-free inline SVG icon set
├── config/           # navigation config (sidebar + route paths)
├── context/          # AuthContext (dummy, localStorage-backed)
├── features/         # one folder per route/module (see below)
├── data/             # mock dashboard content (swap for an API)
├── lib/              # cn(), formatters, chart geometry helpers
└── types/            # domain models
```

### Routing & auth

`react-router-dom` drives navigation. `/login` is public; every other route is
wrapped in `ProtectedRoute`, which redirects to `/login` when there is no
session. Auth is a **dummy** provider (`context/AuthContext.tsx`) — any
credentials sign in and the session persists to `localStorage`.

### Modules (feature pages)

Every sidebar item is a real page under `src/features/`:

| Route | Module | Highlights |
| --- | --- | --- |
| `/` | Dashboard | KPIs, sales chart, AI insights, summary cards |
| `/orders` | Orders | status tabs, searchable order table |
| `/inventory` | Inventory | stock levels, low/out-of-stock alerts |
| `/products` | Products | category filter, catalog table |
| `/stores` | Stores (Tenant) | multi-tenant store cards |
| `/crm` | CRM | loyalty segmentation + customer table |
| `/analytics` | Analytics | funnel, top products, traffic sources |
| `/ai-insights` | AI Insights | recommendations, cross-sell, anomalies |
| `/operations` | Operations | warehouse capacity, task queue |
| `/delivery` | Delivery | courier performance, active shipments |
| `/security` | Security | score gauge, compliance checklist, audit log |
| `/settings` | Settings | tabbed profile/store/notifications/billing |
| `/login` | Login | dummy split-screen sign-in |

### Charts

All charts (multi-series sales line, AI conversion sparkline, inventory-health
and security donuts) are hand-rolled inline **SVG** — no charting dependency.
The line-smoothing logic lives in `src/lib/chart.ts`.

### Extending

Pages are presentational and read from co-located mock arrays; wiring a real
backend means replacing those arrays (or `src/data/*`) with API calls. Add a new
module by creating a folder in `src/features/`, a `<Route>` in `App.tsx`, and an
entry in `config/navigation.tsx`.
