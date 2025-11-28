import React, { useRef, useState } from "react";
import { Eye, Layers, Calendar, Utensils } from "lucide-react";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import VA_Switch from "@/components/VAComponents/VA_Switch";
import Badge from "@/components/ui/Badge";
import { useUpdateBundle } from "@/hooks/Master/useBundle";

function VA_BundleViewSheet({ rowData }) {
  const updateMutation = useUpdateBundle();
  const [isPublished, setIsPublished] = useState(rowData?.isPublished === true);
  const [nextState, setNextState] = useState(null);
  const triggerRef = useRef(null);

  if (!rowData) return null;

  const {
    _id,
    name,
    description,
    durationDays,
    basePrice,
    currency,
    status,
    menus = [],
  } = rowData;

  const handleSwitchChange = (checked) => {
    setNextState(checked);
    triggerRef.current?.click();
  };

  const handleConfirm = async () => {
    await updateMutation.mutateAsync({
      id: _id,
      payload: { isPublished: nextState },
    });
    setIsPublished(nextState);
  };

  return (
    <VA_Sheet
      title="Bundle Details"
      className="min-w-[800px]"
      triggerComponent={
        <VA_Button
          variant="ghost"
          size="sm"
          icon={<Eye className="text-primary" />}
        />
      }
    >
      <div className="space-y-4 p-4">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <Layers className="h-5 w-5 text-primary" />{" "}
              {name || "Unnamed Bundle"}
              <Badge
                variant={isPublished ? "success" : "secondary"}
                text={isPublished ? "Published" : "Unpublished"}
                badgeClassName="capitalize"
              />
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {description || "No Description Provided"}
            </p>
          </div>

          <VA_Switch
            id="publish-switch"
            label="Publish"
            checked={isPublished}
            onCheckedChange={handleSwitchChange}
          />
        </div>

        {/* META INFO */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Duration: {durationDays} days
          </div>
          <div>
            Price: ₹{basePrice} {currency}
          </div>
        </div>

        {/* LINKED MENUS */}
        <div className="border-t border-border pt-3">
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" /> Menus
          </h3>

          {menus.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No menus linked to this bundle.
            </p>
          ) : (
            <div className="space-y-4 grid grid-cols-2 gap-4">
              {menus.map((menuWrapper, i) => {
                const { dayIndex, menuId } = menuWrapper;
                const {
                  name,
                  description,
                  dayOfWeek,
                  items = [],
                  status,
                } = menuId || {};

                return (
                  <div
                    key={i}
                    className="border border-border rounded-lg p-3 bg-card/50 hover:bg-muted/30 transition-all"
                  >
                    {/* Menu Header */}
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3>{dayOfWeek}</h3>
                        <p className="font-semibold text-sm text-muted-foreground">Menu: <span className="">{name}</span></p>
                        {/* <p className="text-xs text-muted-foreground">
                          {description || "No Description"}
                        </p> */}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge
                          variant={
                            status === "active" ? "success" : "destructive"
                          }
                          text={status}
                          badgeClassName="capitalize"
                        />
                      </div>
                    </div>

                    {/* Items List */}
                    {items.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">
                        No items in this menu.
                      </p>
                    ) : (
                      <table className="w-full text-xs border-t border-border mt-2">
                        <thead className="bg-muted/50 text-muted-foreground">
                          <tr>
                            <th className="text-left font-medium py-1 px-2">
                              Item Name
                            </th>
                            <th className="text-left font-medium py-1 px-2">
                              Qty
                            </th>
                            <th className="text-right font-medium py-1 px-2">
                              Price (₹)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, idx) => (
                            <tr
                              key={idx}
                              className="border-t border-border hover:bg-muted/30 transition-colors"
                            >
                              <td className="py-1.5 px-2 text-foreground font-medium">
                                {item.itemName}
                              </td>
                              <td className="py-1.5 px-2 text-muted-foreground">
                                {item.qty}
                              </td>
                              <td className="py-1.5 px-2 text-right text-muted-foreground">
                                {item.itemPrice}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation dialog */}
      <VA_AlertDialog
        trigger={<button ref={triggerRef} className="hidden" />}
        title={`Are you sure you want to ${
          nextState ? "publish" : "unpublish"
        } this bundle?`}
        description={`This will mark the bundle as ${
          nextState ? "published" : "unpublished"
        } in the system.`}
        actionText="Confirm"
        onAction={handleConfirm}
      />
    </VA_Sheet>
  );
}

export default VA_BundleViewSheet;
