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

export const protectedRoutes = [
  { path: "/dashboard", layout: true, element: <Dashboard /> },
  { path: "/leads", layout: true, element: <LeadGeneration /> },
  { path: "/settings", layout: true, element: <Settings /> },
  { path: "/master/branch", layout: true, element: <BranchMaster /> },
  { path: "/master/category", layout: true, element: <CategoryMaster /> },
  { path: "/master/items", layout: true, element: <ItemMaster /> },
  { path: "/master/menus", layout: true, element: <MenuMaster /> },
  { path: "/master/bundles", layout: true, element: <BundleMaster /> },
  { path: "/master/bundles/create", layout: true, element: <VA_BundleFormScreen /> },
  { path: "/cloud-kitchen/orders", layout: true, element: <OrderTracker /> },
  { path: "/cloud-kitchen/kdn", element: <KitchenDisplayScreen /> },
  { path: "/staff-master", layout: true, element: <StaffMaster /> },
  { path: "/cloud-kitchen/rider", element: <Rider /> },
  { path: "/cloud-kitchen/rider/order/:orderId", element: <RiderOrderDetail /> },
  { path: "/cloud-kitchen/rider/order/:id/track", element: <RiderOrderTracker /> },
];
