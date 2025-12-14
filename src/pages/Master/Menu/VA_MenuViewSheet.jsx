import React from "react";
import {
  CalendarDays,
  List,
  CheckCircle,
  XCircle,
  Eye,
  Utensils,
  Clock,
} from "lucide-react";

import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_Button from "@/components/VAComponents/VA_Button";
import Badge from "@/components/ui/Badge";

function VA_MenuViewSheet({ rowData }) {
  if (!rowData) return null;

  const {
    name,
    description,
    mealType,
    suggestedDay,
    isActive,
    createdAt,
    items = [],
  } = rowData;

  return (
    <VA_Sheet
      className="min-w-[800px]"
      title="Menu Details"
      triggerComponent={
        <VA_Button
          variant="ghost"
          size="sm"
          icon={<Eye className="text-primary" />}
        />
      }
    >
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <List className="h-5 w-5 text-primary" />
            {name}
            <Badge
              variant={isActive ? "success" : "destructive"}
              text={isActive ? "Active" : "Inactive"}
              badgeClassName="capitalize"
            />
          </h2>

          <p className="text-muted-foreground">
            {description || "—"}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Meal: <strong className="capitalize">{mealType}</strong>
            </span>

            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              Day: {suggestedDay || "Any"}
            </span>

            {isActive ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}

            <span>
              Created on{" "}
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Items */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Utensils className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Menu Items</h3>
          </div>

          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No items added to this menu.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-md">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="text-left font-medium py-2 px-3">
                      Item Name
                    </th>
                    <th className="text-left font-medium py-2 px-3">
                      Qty
                    </th>
                    <th className="text-left font-medium py-2 px-3">
                      Price (₹)
                    </th>
                    <th className="text-left font-medium py-2 px-3">
                      UOM
                    </th>
                    <th className="text-left font-medium py-2 px-3">
                      Veg
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((menuItem, idx) => {
                    const item =
                      typeof menuItem.itemId === "object"
                        ? menuItem.itemId
                        : {};

                    return (
                      <tr
                        key={idx}
                        className="border-t border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-2 px-3 font-medium">
                          {menuItem.name || item.name || "Unnamed Item"}
                        </td>

                        <td className="py-2 px-3">
                          {menuItem.qty}
                        </td>

                        <td className="py-2 px-3">
                          ₹{item.price ?? "—"}
                        </td>

                        <td className="py-2 px-3">
                          {item.uom || "—"}
                        </td>

                        <td className="py-2 px-3">
                          {menuItem.isVegetarian ? "Yes" : "No"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </VA_Sheet>
  );
}

export default VA_MenuViewSheet;
