// src/Routes/routeConfig.jsx
import Dashboard from "../pages/Dashboard/Dashboard";
import LeadGeneration from "../pages/LeadGeneration/LeadGeneration";
import BranchMaster from "../pages/Master/Branch/BranchMaster";
import CategoryMaster from "../pages/Master/Category/CategoryMaster";
import ItemMaster from "../pages/Master/Item/ItemMaster";
import MenuMaster from "../pages/Master/Menu/MenuMaster";
import BundleMaster from "../pages/Master/Bundle/BundleMaster";
import VA_BundleFormScreen from "../pages/Master/Bundle/VA_BundleFormScreen";
import OrderTracker from "../pages/CloudKitchen/OrderTracker";
import KitchenDisplayScreen from "../pages/CloudKitchen/KDS/KitchenDisplayScreen";
import StaffMaster from "../pages/MyStaff/StaffMaster";
import Rider from "../pages/CloudKitchen/RiderScreens/Rider";
import RiderOrderDetail from "../pages/CloudKitchen/RiderScreens/RiderOrderDetail";
import RiderOrderTracker from "../pages/CloudKitchen/RiderScreens/RiderOrderTracker";
import Settings from "../pages/Settings/Settings";

// ⬇ define allowed roles here
export const protectedRoutes = [
  { path: "/dashboard", layout: true, component: Dashboard, roles: ["admin"] },
  { path: "/leads", layout: true, component: LeadGeneration, roles: ["admin"] },
  { path: "/settings", layout: true, component: Settings, roles: ["admin"] },
  { path: "/master/branch", layout: true, component: BranchMaster, roles: ["admin"] },
  { path: "/master/category", layout: true, component: CategoryMaster, roles: ["admin"] },
  { path: "/master/items", layout: true, component: ItemMaster, roles: ["admin"] },
  { path: "/master/menus", layout: true, component: MenuMaster, roles: ["admin"] },
  { path: "/master/bundles", layout: true, component: BundleMaster, roles: ["admin"] },
  { path: "/master/bundles/create", layout: true, component: VA_BundleFormScreen, roles: ["admin"] },

  // Kitchen
  { path: "/cloud-kitchen/orders", layout: true, component: OrderTracker, roles: ["admin"] },
  { path: "/cloud-kitchen/kdn", component: KitchenDisplayScreen, roles: ["admin","chef"] },

  // Rider
  { path: "/cloud-kitchen/rider", component: Rider, roles: ["admin","rider"] },
  { path: "/cloud-kitchen/rider/order/:orderId", component: RiderOrderDetail, roles: ["admin","rider"] },
  { path: "/cloud-kitchen/rider/order/:id/track", component: RiderOrderTracker, roles: ["admin","rider"] },

  // Staff Management
  { path: "/staff-master", layout: true, component: StaffMaster, roles: ["admin"] },
];
