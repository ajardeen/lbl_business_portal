import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Bell, CreditCard } from "lucide-react";

const tabs = [
  {
    name: "Profile",
    value: "profile",
    icon: User,
    content: (
      <>
        Manage your <span className="text-foreground font-semibold">profile details</span> and personal information.
      </>
    ),
  },
  {
    name: "Security",
    value: "security",
    icon: Shield,
    content: (
      <>
        Strengthen your account by updating your{" "}
        <span className="text-foreground font-semibold">security settings</span>.
      </>
    ),
  },
  {
    name: "Notifications",
    value: "notifications",
    icon: Bell,
    content: (
      <>
        Choose how you receive{" "}
        <span className="text-foreground font-semibold">alerts & updates</span> from the system.
      </>
    ),
  },
  {
    name: "Billing",
    value: "billing",
    icon: CreditCard,
    content: (
      <>
        Manage your <span className="text-foreground font-semibold">billing details</span> and invoices.
      </>
    ),
  },
];

const Settings = () => {
  return (
    <div className="w-full ">
      {/* IMPORTANT: Wrap TabsList + Content inside a flex container */}
      <Tabs defaultValue="profile" orientation="vertical" className="">
        <div className="flex w-full">
          {/* LEFT SIDE — EXACT SAME STYLE */}
          <TabsList className="bg- h-full flex-col rounded-none gap-1  p-0 w-60">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                 data-[state=active]:bg-accent
                  data-[state=active]:border-primary
                  dark:data-[state=active]:border-primary
                  h-12 w-full
                  justify-start gap-2 px-4
                  rounded-none border-0 border-l-4 border-transparent
                  flex items-center
                "
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* RIGHT SIDE — CONTENT */}
          <div className="flex-1 w-full h-full">
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className={"px-10  h-[80vh]  rounded-md"}>
                <p className="text-muted-foreground text-sm">{tab.content}</p>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
