import React from "react";
import { useNavigate } from "react-router-dom";
import { HardHat, Users, ClipboardList } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
      <div className="h-fit p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

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
      <Card className="shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
            <Users className="w-6 h-6" />
            Staff Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {staffList.map((staff) => (
              <div
                key={staff.id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg border hover:bg-gray-100 transition"
              >
                <span className="font-medium">{staff.name}</span>
                <span className="text-sm text-muted-foreground">{staff.role}</span>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded ${
                    staff.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {staff.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
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
