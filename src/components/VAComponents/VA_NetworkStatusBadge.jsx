import React, { useState, useEffect } from "react";
import { onlineManager } from "@tanstack/react-query";
import { Wifi, AlertTriangle } from "lucide-react";

const Badge = ({ children, variant, className = "" }) => {
  let baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  let variantClasses = "";

  switch (variant) {
    case "default":
      variantClasses = "bg-green-600 text-white shadow hover:bg-green-600/80";
      break;
    case "destructive":
      variantClasses =
        "bg-red-600 text-white shadow hover:bg-red-600/80 border border-red-700";
      break;
    default:
      variantClasses = "bg-gray-100 text-gray-900 border border-gray-200";
  }

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

function VA_NetworkStatusBadge() {
  const [isOnline, setIsOnline] = useState(onlineManager.isOnline());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer;

    const unsubscribe = onlineManager.subscribe((onlineStatus) => {
      clearTimeout(timer);
      setIsVisible(true); // Always show when status changes

      if (onlineStatus) {
        setIsOnline(true);
        // Hide after 2 seconds only when online
        timer = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        setIsOnline(false);
      }
    });

    // Initial check on mount
    if (isOnline) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [isOnline]); // Rerun effect if isOnline changes from initial state

  if (!isVisible && isOnline) {
    return null; // Don't render anything if not visible and online
  }

  const Icon = isOnline ? Wifi : AlertTriangle;
  const text = isOnline ? "Online" : "Offline";
  const variant = isOnline ? "default" : "destructive";
  const badgeClassName = !isOnline ? "animate-pulse" : "";

  return (
    <Badge
      variant={variant}
      className={`transition-all duration-500 ease-in-out ${badgeClassName}`}
    >
      <Icon className="h-3 w-3 flex-shrink-0" />
      <span className="ml-1 whitespace-nowrap">{text}</span>
    </Badge>
  );
}
export default VA_NetworkStatusBadge;
