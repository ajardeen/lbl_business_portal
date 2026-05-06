import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Bell, CreditCard, Building } from "lucide-react";
import OrganizationSettings from "./Organization/OrganizationSettings";
import AccountSettings from "./Account/AccountSettings";
import SecuritySettings from "./Security/SecuritySettings";
import NotificationSettings from "./Notification/NotificationSettings";
import BillingSettings from "./Billing/BillingSettings";

const tabs = [
  { name: "Account", value: "account", icon: User, content: <AccountSettings /> },
  { name: "Organization", value: "organization", icon: Building, content: <OrganizationSettings /> },
  { name: "Security", value: "security", icon: Shield, content: <SecuritySettings /> },
  { name: "Notifications", value: "notifications", icon: Bell, content: <NotificationSettings /> },
  { name: "Billing", value: "billing", icon: CreditCard, content: <BillingSettings /> },
];

const Settings = () => {
  return (
    <div className="w-full">
      {/* 
        Changing from vertical to horizontal on mobile:
        - md:flex-row handles the vertical sidebar for desktop
        - flex-col handles the horizontal tab bar for mobile
      */}
      <Tabs defaultValue="account" className="w-full">
        <div className="flex flex-col  md:flex-row w-full min-h-[80vh]">
          
          {/* TABS LIST: Sidebar on desktop, Top-scroll on mobile */}
          <TabsList className="
            flex h-fit rounded-none p-0 bg-transparent
            flex-row md:flex-col 
            w-full md:w-60 
            overflow-x-auto md:overflow-x-visible
            justify-start border-b md:border-b-0 md:border-t-0 border-border
            scrollbar-hide
          ">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                  flex items-center justify-start gap-2 
                  h-12 px-4 py-2 rounded-none
                  text-sm font-medium transition-all
                  border-b-2  md:border-0  md:border-l-4 border-transparent
                  data-[state=active]:bg-accent/50 
                  data-[state=active]:border-primary
                  data-[state=active]:text-primary
                  whitespace-nowrap flex-shrink-0 md:w-full
                "
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span>{tab.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* CONTENT AREA */}
          <div className="flex-1 w-full bg-background/50">
            {tabs.map((tab) => (
              <TabsContent 
                key={tab.value} 
                value={tab.value} 
                className="
                  mt-0 border-0 p-4 sm:p-6 md:px-10 
                  h-full min-h-[50vh] focus-visible:ring-0
                "
              >
                <div className="w-full max-w-5xl mx-auto">
                   {tab.content}
                </div>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;