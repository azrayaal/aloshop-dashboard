import {
  AiIcon,
  AnalyticsIcon,
  CrmIcon,
  DashboardIcon,
  DeliveryIcon,
  InventoryIcon,
  OperationsIcon,
  OrdersIcon,
  ProductsIcon,
  SecurityIcon,
  SettingsIcon,
  StoresIcon,
  type IconProps,
} from '@/components/icons'

export interface NavItem {
  id: string
  label: string
  /** Route path (relative to the app root). */
  path: string
  Icon: (p: IconProps) => JSX.Element
}

/** Primary sidebar navigation for the seller admin console. */
export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/', Icon: DashboardIcon },
  { id: 'orders', label: 'Orders', path: '/orders', Icon: OrdersIcon },
  { id: 'inventory', label: 'Inventory', path: '/inventory', Icon: InventoryIcon },
  { id: 'products', label: 'Products', path: '/products', Icon: ProductsIcon },
  { id: 'stores', label: 'Stores (Tenant)', path: '/stores', Icon: StoresIcon },
  { id: 'crm', label: 'CRM', path: '/crm', Icon: CrmIcon },
  { id: 'analytics', label: 'Analytics', path: '/analytics', Icon: AnalyticsIcon },
  { id: 'ai', label: 'AI Insights', path: '/ai-insights', Icon: AiIcon },
  { id: 'operations', label: 'Operations', path: '/operations', Icon: OperationsIcon },
  { id: 'delivery', label: 'Delivery', path: '/delivery', Icon: DeliveryIcon },
  { id: 'security', label: 'Security', path: '/security', Icon: SecurityIcon },
  { id: 'settings', label: 'Settings', path: '/settings', Icon: SettingsIcon },
]
