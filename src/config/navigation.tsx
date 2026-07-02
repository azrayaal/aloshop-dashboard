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
  Icon: (p: IconProps) => JSX.Element
}

/** Primary sidebar navigation for the seller admin console. */
export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { id: 'orders', label: 'Orders', Icon: OrdersIcon },
  { id: 'inventory', label: 'Inventory', Icon: InventoryIcon },
  { id: 'products', label: 'Products', Icon: ProductsIcon },
  { id: 'stores', label: 'Stores (Tenant)', Icon: StoresIcon },
  { id: 'crm', label: 'CRM', Icon: CrmIcon },
  { id: 'analytics', label: 'Analytics', Icon: AnalyticsIcon },
  { id: 'ai', label: 'AI Insights', Icon: AiIcon },
  { id: 'operations', label: 'Operations', Icon: OperationsIcon },
  { id: 'delivery', label: 'Delivery', Icon: DeliveryIcon },
  { id: 'security', label: 'Security', Icon: SecurityIcon },
  { id: 'settings', label: 'Settings', Icon: SettingsIcon },
]
