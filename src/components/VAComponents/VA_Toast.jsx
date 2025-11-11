"use client";

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { toast, Toaster } from "sonner";
import {
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  Bell,
} from "lucide-react";

/**
 * VA_Toast — Reusable toast component for Vision Action
 * Handles all states (success, error, warning, info, default)
 * and applies consistent styling.
 */
export default function VA_Toast({
  type = "default",
  message = "This is a toast message!",
  description = "",
  duration = 3000,
  position = "top-right",
  show = false,
}) {
  // Define type-based icon and styling
  const toastVariants = {
    success: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      className:
        "border border-green-300 bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400",
    },
    error: {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      className:
        "border border-red-300 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      className:
        "border border-yellow-300 bg-yellow-50 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400",
    },
    info: {
      icon: <Info className="h-5 w-5 text-blue-500" />,
      className:
        "border border-blue-300 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400",
    },
    default: {
      icon: <Bell className="h-5 w-5 text-gray-500" />,
      className:
        "border border-gray-200 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    },
  };

  const { icon, className } = toastVariants[type] || toastVariants.default;

  // Trigger toast when `show` changes
  useEffect(() => {
    if (show) {
      toast.custom(
        (t) => (
          <div
            className={`flex items-start gap-3 rounded-lg px-3 py-2 shadow-md ${className}`}
          >
            {icon}
            <div className="flex flex-col">
              <p className="font-medium">{message}</p>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        ),
        {
          duration,
          position,
        }
      );
    }
  }, [show, type, message, description, duration, position]);

  return <Toaster position={position} richColors closeButton />;
}

VA_Toast.propTypes = {
  /** Type of toast (success, error, warning, info, default) */
  type: PropTypes.oneOf(["success", "error", "warning", "info", "default"]),
  /** Main message text */
  message: PropTypes.string.isRequired,
  /** Optional smaller description text */
  description: PropTypes.string,
  /** Duration in ms */
  duration: PropTypes.number,
  /** Position of toast */
  position: PropTypes.oneOf([
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]),
  /** Trigger flag to show toast */
  show: PropTypes.bool.isRequired,
};
