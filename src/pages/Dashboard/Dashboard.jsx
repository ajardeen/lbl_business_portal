import React from "react";
import { useNavigate } from "react-router-dom";
import { HardHat, Users, ClipboardList } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PiBicycle } from "react-icons/pi";

const Dashboard = () => {
  const navigate = useNavigate();

  const kitchenOverview = {
    totalOrders: 41,
    pending: 10,
    cooking: 6,
    completed: 25,
  };

  const staffList = [
    { id: 1, name: "Ramesh", role: "Chef", status: "Active" },
    { id: 2, name: "Suresh", role: "Assistant", status: "Active" },
    { id: 3, name: "Mahesh", role: "Waiter", status: "Leave" },
  ];

  const otherStats = [
    { label: "Items in Stock", value: 134 },
    { label: "Low Stock Items", value: 6 },
    { label: "Today's Revenue", value: "₹12,450" },
  ];

  return (
    <div className="min-h-[85vh] ">
      <div className="h-fit p-6 grid grid-cols-1 lg:grid-cols-3 gap-6
      ">

      {/* Kitchen Status */}
      <Card
        className="cursor-pointer transition-all shadow-sm hover:shadow-xl hover:scale-[1.02] border-none bg-gradient-to-br from-yellow-50 to-yellow-100"
        onClick={() => navigate("/cloud-kitchen/kdn")}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700 text-lg font-semibold">
            <HardHat className="w-6 h-6" />
            Cloud Kitchen Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 text-center gap-3">
            <div>
              <p className="text-3xl font-bold text-red-600">{kitchenOverview.pending}</p>
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-600">{kitchenOverview.cooking}</p>
              <span className="text-sm text-muted-foreground">Cooking</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{kitchenOverview.completed}</p>
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff List */}
      <Card onClick={() => navigate("/cloud-kitchen/rider")} className="shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
            <PiBicycle className="w-6 h-6" />
            Rider
          </CardTitle>
        </CardHeader>
       
      </Card>

      {/* Other Stats */}
      <Card className="shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700 text-lg font-semibold">
            <ClipboardList className="w-6 h-6" />
            Kitchen Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 text-center">
            {otherStats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>

    </div>
  );
};

export default Dashboard;
