import React from "react";
import {
  CalendarDays,
  List,
  CheckCircle,
  XCircle,
  Eye,
  Utensils,
} from "lucide-react";

import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_Button from "@/components/VAComponents/VA_Button";
import Badge from "@/components/ui/Badge";

function VA_MenuViewSheet({ rowData }) {
  if (!rowData) return null;

  const {
    name,
    description,
    dayOfWeek,
    status,
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
        {/* Header Info */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <List className="h-5 w-5 text-primary" />
            {name}
            <Badge
              variant={status === "active" ? "success" : "destructive"}
              text={status}
              badgeClassName="capitalize"
            />
          </h2>
          <p className="text-muted-foreground">{description || "—"}</p>

          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {dayOfWeek || "No day specified"}
            </span>
            {status === "active" ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span>Created on {new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border"></div>

        {/* Items Section */}
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
            <table className="w-full text-xs border-t border-border mt-2">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left font-medium py-1 px-2">Item Name</th>
                  <th className="text-left font-medium py-1 px-2">Qty</th>
                  <th className="text-left font-medium py-1 px-2">Price (₹)</th>
                  <th className="text-left font-medium py-1 px-2">UOM</th>
                  <th className="text-left font-medium py-1 px-2">
                    Prep Time (min)
                  </th>
                  <th className="text-left font-medium py-1 px-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((menuItem, idx) => {
                  const item = menuItem.itemId || {};
                  return (
                    <tr
                      key={idx}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-1.5 px-2 text-foreground font-medium">
                        {item.name || "Unnamed Item"}
                      </td>
                      <td className="py-1.5 px-2 text-muted-foreground">
                        {menuItem.qty || 1}
                      </td>
                      <td className="py-1.5 px-2 text-muted-foreground">
                        ₹{item.price ?? "--"}
                      </td>
                      <td className="py-1.5 px-2 text-muted-foreground">
                        {item.uom || "—"}
                      </td>
                      <td className="py-1.5 px-2 text-muted-foreground">
                        {item.prepTimeMinutes || 0}
                      </td>
                      <td className="py-1.5 px-2 text-muted-foreground">
                        {menuItem.notes || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </VA_Sheet>
  );
}

export default VA_MenuViewSheet;
