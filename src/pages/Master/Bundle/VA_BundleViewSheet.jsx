import React, { useRef, useState } from "react";
import { Eye, Layers, Calendar, CheckCircle, XCircle } from "lucide-react";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import VA_Switch from "@/components/VAComponents/VA_Switch";
import { Card, CardContent } from "@/components/ui/card";
import  Badge  from "@/components/ui/Badge";
import { useUpdateBundle } from "@/hooks/Master/useBundle";

function VA_BundleViewSheet({ rowData }) {
  const updateMutation = useUpdateBundle();
  const [isPublished, setIsPublished] = useState(rowData?.isPublished === true);
  const [nextState, setNextState] = useState(null);
  const triggerRef = useRef(null); // reference to open dialog

  if (!rowData) return null;
  const { _id, name, description, durationDays, basePrice, currency, status, menus = [] } = rowData;

  const handleSwitchChange = (checked) => {
    setNextState(checked);
    triggerRef.current?.click(); // manually open dialog
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
      <div className="space-y-6 p-4">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-3 justify-between">
            <div className="flex gap-3 items-center">
              <Layers className="h-5 w-5 text-primary" /> {name}
            </div>

            <VA_Switch
              id="publish-switch"
              label="Publish"
              checked={isPublished}
              onCheckedChange={handleSwitchChange}
            />
          </h2>
          <p className="text-muted-foreground mt-1">{description || "—"}</p>
        </div>

        <div className="flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Duration: {durationDays} days
          </div>
          <div>
            Price: ₹{basePrice} {currency}
          </div>
          <div className="flex items-center gap-1">
            {status === "active" ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <Badge variant={status === "active" ? "default" : "destructive"}>
              {status}
            </Badge>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" /> Linked Menus
          </h3>

          {menus.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No menus linked to this bundle.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menus.map((m, i) => (
                <Card
                  key={i}
                  className="border border-border hover:shadow-sm transition-all"
                >
                  <CardContent className="p-4">
                    <p className="font-semibold">
                      {m.menuId?.name || "Unnamed Menu"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Day Index: {m.dayIndex}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hidden AlertDialog trigger and modal */}
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
