import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { ProtectedRoute } from '@/components/layouts/ProtectedRoute'
import { LoginPage } from '@/features/auth/LoginPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { OrdersPage } from '@/features/orders/OrdersPage'
import { InventoryPage } from '@/features/inventory/InventoryPage'
import { ProductsPage } from '@/features/products/ProductsPage'
import { StoresPage } from '@/features/stores/StoresPage'
import { CrmPage } from '@/features/crm/CrmPage'
import { AnalyticsPage } from '@/features/analytics/AnalyticsPage'
import { AiInsightsPage } from '@/features/ai/AiInsightsPage'
import { OperationsPage } from '@/features/operations/OperationsPage'
import { DeliveryPage } from '@/features/delivery/DeliveryPage'
import { SecurityPage } from '@/features/security/SecurityPage'
import { SettingsPage } from '@/features/settings/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/crm" element={<CrmPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/ai-insights" element={<AiInsightsPage />} />
        <Route path="/operations" element={<OperationsPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
