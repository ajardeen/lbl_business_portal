// VA_AlertDialog.jsx
// Reusable AlertDialog component using shadcn/ui

import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader } from "lucide-react";



export const VA_AlertDialog = ({
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  cancelText = "Cancel",
  actionText = "Continue",
  loading = false,
  onAction = () => {},
  icon: Icon,
  size = "md", // sm, md, lg
  variant = "default", // default, danger
}) => {
  const sizeClasses = {
    sm: "max-w-xs",
    md: "max-w-sm",
    lg: "max-w-lg",
  };

  const actionClasses =
    variant === "danger" ? "bg-red-600 hover:bg-red-700" : "";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className={sizeClasses[size]}>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-red-600" />}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction className={actionClasses} onClick={onAction}>
            {loading && <Loader className="animate-spin mr-2"/>}
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VA_AlertDialog;
