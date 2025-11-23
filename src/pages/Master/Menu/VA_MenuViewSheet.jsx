import React from "react";
import {
  CalendarDays,
  List,
  Info,
  Utensils,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_Button from "@/components/VAComponents/VA_Button";
import { Card, CardContent } from "@/components/ui/card";
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
          </h2>
          <p className="text-muted-foreground">{description || "—"}</p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              {dayOfWeek || "No day specified"}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              {status === "active" ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <Badge
                variant={status === "active" ? "default" : "destructive"}
                text={status}
              />
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Created on {new Date(createdAt).toLocaleDateString()}
          </p>
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
            <div className="flex gap-5">
              {items.map((menuItem, idx) => {
                const item = menuItem.itemId || {};
                return (
                  <Card
                    key={idx}
                    className="border border-border hover:shadow-md transition-all max-w-70"
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-base">
                            {item.name || "Unnamed Item"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description || "No description"}
                          </p>
                        </div>
                        <Badge
                          variant={item.isActive ? "default" : "secondary"}
                          text={item.isActive ? "Active" : "Inactive"}
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mt-2">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Price</span>
                          <span className="font-semibold text-foreground">
                            ₹{item.price ?? "--"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">UOM</span>
                          <span>{item.uom || "—"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Qty</span>
                          <span>{menuItem.qty || 1}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">
                            Preparation Time
                          </span>
                          <span>{item.prepTimeMinutes || 0} min</span>
                        </div>
                      </div>

                      {menuItem.notes && (
                        <div className="pt-2 border-t border-border mt-2 text-sm">
                          <span className="text-muted-foreground">Notes: </span>
                          {menuItem.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </VA_Sheet>
  );
}

export default VA_MenuViewSheet;
