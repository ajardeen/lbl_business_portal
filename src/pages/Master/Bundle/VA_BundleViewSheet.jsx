import React, { useEffect, useRef, useState } from "react";
import {
  Eye,
  Layers,
  Calendar,
  Utensils,
  CreditCard,
  Loader2,
  Vegan, // Added icon for vegetarian badge
} from "lucide-react";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import VA_Switch from "@/components/VAComponents/VA_Switch";
import Badge from "@/components/ui/Badge";
import { useBundleById, useUpdateBundle } from "@/hooks/Master/useBundle";
import { toast } from "sonner";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function VA_BundleViewSheet({ bundleId }) {
  const updateMutation = useUpdateBundle();
  const [isOpen, setIsOpen] = useState(false);
  const [nextState, setNextState] = useState(null);
  const triggerRef = useRef(null);

  if (!bundleId) return null;

  // 1. Use the hook to fetch detailed data ONLY when the sheet is open
  // Current code
const {
    data: bundleDetails,
    isLoading: isFetchingDetails,
    isError,
    error,
} = useBundleById(isOpen ? bundleId : null);

  // The console logs were removed as they were only for debugging the fetch
   useEffect(() => {
     console.log("isopen", isOpen);
     console.log("data", bundleDetails);
   }, [isOpen,bundleDetails]);

  const currentData = bundleDetails || {};

  const {
    name,
    price,
    bundleMealType,
    totalMealsCount,
    isPublished,
    schedule = [],
  } = currentData;

  const [isBundlePublished, setIsBundlePublished] = useState(false);

  // Sync local state when details finish loading
  React.useEffect(() => {
    if (typeof isPublished === "boolean") {
      setIsBundlePublished(isPublished);
    }
  }, [isPublished]);

  // Handle error display
  React.useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to fetch bundle details.");
    }
  }, [isError, error]);

  const handleSwitchChange = (checked) => {
    setNextState(checked);
    triggerRef.current?.click();
  };

  const handleConfirm = async () => {
    try {
      await updateMutation.mutateAsync({
        id: bundleId,
        payload: { isPublished: nextState },
      });
      setIsBundlePublished(nextState);
    } catch (err) {
      toast.error(err?.message || "Failed to update publish status.");
    }
  };

  // Only sort the schedule if data is available
  const sortedSchedule = schedule.length
    ? schedule.slice().sort((a, b) => a.dayIndex - b.dayIndex)
    : [];

  return (
    <VA_Sheet
      title="Bundle Details"
      className="min-w-[800px]"
      isOpen={isOpen}
      setOpen={setIsOpen} // 💡 FIX: Use onOpenChange for better compatibility
      triggerComponent={
        <VA_Button
          variant="ghost"
          size="sm"
          icon={<Eye className="text-primary" />}
        />
      }
    >
      {isFetchingDetails ? (
        <div className="p-12 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            Fetching detailed bundle information...
          </p>
        </div>
      ) : isError || !bundleDetails ? (
        <div className="p-12 text-center text-destructive">
          Failed to load bundle details. Please try again.
        </div>
      ) : (
        <div className="space-y-4 p-4">
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-3">
                <Layers className="h-5 w-5 text-primary" />
                {name || "Unnamed Bundle"}
                <Badge
                  variant={isBundlePublished ? "success" : "secondary"}
                  text={isBundlePublished ? "Published" : "Unpublished"}
                  badgeClassName="capitalize"
                />
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Meal Type: <Badge variant="outline" text={bundleMealType?.toUpperCase()}></Badge>
              </p>
            </div>

            <VA_Switch
              id="publish-switch"
              label="Publish"
              checked={isBundlePublished}
              onCheckedChange={handleSwitchChange}
              disabled={updateMutation.isPending}
            />
          </div>

          {/* META INFO */}
          <div className="flex flex-wrap gap-6 text-sm text-foreground/80 font-medium">
            <div className="flex items-center gap-1">
              <CreditCard className="h-4 w-4 text-primary" /> Total Meals (Credits): <Badge text={totalMealsCount}></Badge>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" /> Price:
              <span className="text-lg font-bold">₹{price}</span>
            </div>
          </div>

          {/* LINKED MENUS (Schedule) */}
          <div className="border-t border-border pt-3">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" /> Weekly Schedule
            </h3>

            {sortedSchedule.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No menus defined in the weekly schedule.
              </p>
            ) : (
              <div className="space-y-4 grid grid-cols-2 gap-4">
                {sortedSchedule.map((scheduleItem) => {
                  const dayName = DAYS_OF_WEEK[scheduleItem.dayIndex];
                  // menuId is populated with the full menu document from the API response
                  const menu = scheduleItem.menuId;
                  const items = menu?.items || [];

                  return (
                    <div
                      key={scheduleItem.dayIndex}
                      className="border border-border rounded-lg p-3 bg-card/50 hover:bg-muted/30 transition-all"
                    >
                      {/* Menu Header */}
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-bold text-base text-primary">{dayName}</h3>
                          <p className="font-semibold text-sm text-muted-foreground">
                            Menu: <span className="text-foreground">{menu?.name || "N/A"}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <Badge
                            variant={
                              menu?.mealType === "lunch" ? "default" : "secondary"
                            }
                            text={menu?.mealType?.toUpperCase() || "NO TYPE"}
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
                              <th className="text-left font-medium py-1 px-2">Item Name</th>
                              <th className="text-center font-medium py-1 px-2 w-12">Qty</th>
                              <th className="text-right font-medium py-1 px-2">Price/UOM</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => {
                              // itemId is populated with the full item document
                              const itemDoc = item.itemId;
                              // Use the local item name first, or fall back to the populated document name
                              const itemName = item.name || itemDoc?.name || "Unnamed Item";
                              const qty = item.qty || 1;
                              const price = itemDoc?.price;
                              const uom = itemDoc?.uom;
                              const isVeg = item.isVegetarian;

                              return (
                                <tr
                                  key={item._id || itemDoc?._id}
                                  className="border-t border-border hover:bg-muted/30 transition-colors"
                                >
                                  <td className="py-1.5 px-2 text-foreground capitalize flex items-center gap-1.5">
                                    {isVeg && <Vegan className="h-3 w-3 text-green-600" title="Vegetarian Item" />}
                                    {itemName}
                                  </td>
                                  <td className="py-1.5 px-2 text-center text-muted-foreground font-semibold">
                                    {qty}
                                  </td>
                                  <td className="py-1.5 px-2 text-right text-muted-foreground">
                                    {price
                                      ? `₹${price} / ${uom || "Unit"}`
                                      : "--"}
                                  </td>
                                </tr>
                              );
                            })}
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
      )}

      {/* Confirmation dialog */}
      <VA_AlertDialog
        trigger={<button ref={triggerRef} className="hidden" />}
        title={`Are you sure you want to ${
          nextState ? "publish" : "unpublish"
        } this bundle?`}
        description={`This will mark the bundle as ${
          nextState ? "published" : "unpublished"
        } in the system. This change will affect customer subscriptions.`}
        actionText="Confirm"
        onAction={handleConfirm}
      />
    </VA_Sheet>
  );
}

export default VA_BundleViewSheet;