import React, { useState } from "react";
import {
  Bell,
  Settings,
  ArrowUpRight,
  ShoppingBag,
  UtensilsCrossed,
  Trophy,
  Users,
  ClipboardList,
  TrendingUp,
  Clock,
  Calendar,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// --- Mock Data ---
const revenueData = [
  { day: "Sun", value: 480 },
  { day: "Mon", value: 620 },
  { day: "Tue", value: 530 },
  { day: "Wed", value: 710 },
  { day: "Thu", value: 843, highlight: true },
  { day: "Fri", value: 490 },
  { day: "Sat", value: 380 },
];

const topDishes = [
  { name: "Twice Cooked Pork", orders: 960, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=60&h=60&fit=crop" },
  { name: "Fish Flavored Pork", orders: 863, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=60&h=60&fit=crop" },
  { name: "Pork Ribs Rice", orders: 884, img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=60&h=60&fit=crop" },
  { name: "Kung Pao Chicken", orders: 884, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&h=60&fit=crop" },
];

const recentActivity = [
  { img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=50&h=50&fit=crop", title: "Status Changed", amount: "₹ 109.00", order: "#4587", wait: "9min", status: "Completed" },
  { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=50&h=50&fit=crop", title: "Status Changed", amount: "₹ 109.00", order: "#4587", wait: "9min", status: "Pending" },
  { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=50&h=50&fit=crop", title: "Status Changed", amount: "₹ 109.00", order: "#4587", wait: "9min", status: "Pending" },
  { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=50&h=50&fit=crop", title: "Status Changed", amount: "₹ 109.00", order: "#4587", wait: "9min", status: "Completed" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-3 py-2 text-xs shadow-lg border border-gray-700">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>₹{payload[0].value}.00</span>
        </div>
      </div>
    );
  }
  return null;
};

const StatusBadge = ({ status }) => {
  const styles = {
    Completed: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    Pending: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
  };
  return (
    <span className={`text-[10px] md:text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full whitespace-nowrap ${styles[status] || ""}`}>
      {status}
    </span>
  );
};

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={"relative"}>
      <div className="sticky -top-0 mb-5 rounded-sm p-1 w-full text-center bg-primary text-white">This dashboard displays sample data for demonstration. </div>

      <div className="min-h-screen  transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-xs md:text-sm text-gray-500">Live store overview</p>
            </div>
           
          </div>

          {/* Top Stat Cards - 1 col on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className=" px-2 py-4">
              <CardContent className="px-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    Pending Orders
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">25</span>
                  <span className="text-sm font-semibold text-green-500">47%</span>
                  <span className="text-xs text-gray-400">Cleared</span>
                </div>
              </CardContent>
            </Card>

            <Card className="px-2 py-4">
              <CardContent className="px-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider">
                    <UtensilsCrossed className="w-4 h-4 text-primary" />
                    In Progress
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">17</span>
                </div>
              </CardContent>
            </Card>

            <Card className="] px-2 py-4">
              <CardContent className="px-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider">
                    <Trophy className="w-4 h-4 text-primary" />
                    Tables
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">3/12</span>
                  <span className="text-sm font-semibold text-primary">87%</span>
                  <span className="text-xs text-gray-400">Booked</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue + Business Data */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Total Revenue Chart */}
            <Card className="lg:col-span-2  ">
              <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div>
                  <CardTitle className="text-lg font-bold">Total Revenue</CardTitle>
                  <p className="text-xs text-gray-400">Weekly sales activity</p>
                </div>
                <button className="hidden md:flex items-center gap-1 text-xs border rounded-md px-2 py-1">
                  <Calendar className="w-3 h-3" /> This Week <ChevronDown className="w-3 h-3" />
                </button>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} barSize={window.innerWidth < 768 ? 20 : 36}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <YAxis hide={window.innerWidth < 768} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                        {revenueData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.highlight ? "#1447e6" : "#1447e691"} className="transition-all duration-300" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Business Stats Grid */}
             <Card className=" px-4">

            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex justify-between items-start">
                <div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Customers</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold">197</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-blue-400" />
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl flex justify-between items-start">
                <div>
                  <p className="text-xs text-orange-600 dark:text-primary font-medium mb-1">Total Orders</p>
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-orange-600" />
                    <span className="text-2xl font-bold">270</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl flex justify-between items-start">
                <div>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Avg. Value</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold">₹109</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              </div>
            </div>
             </Card>
          </div>

          {/* Recent Activity + Top Dishes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img src={item.img} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.title}</p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>{item.amount}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{item.wait}</span>
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Top Dishes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {topDishes.map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img src={dish.img} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="flex-1 text-sm font-medium truncate">{dish.name}</span>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold">{dish.orders}</span>
                      <span className="text-[10px] text-primary ml-1 uppercase">Orders</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;