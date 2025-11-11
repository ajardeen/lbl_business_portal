import React, { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const SyncButton = ({
  loading = false,
  onClick,
  className = "",
  textState = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (loading) {
      setIsAnimating(true);
      startTimeRef.current = Date.now();
    } else if (isAnimating) {
      const elapsedTime = Date.now() - startTimeRef.current;
      const remainingTime = 2000 - elapsedTime;

      if (remainingTime > 0) {
        const timer = setTimeout(() => setIsAnimating(false), remainingTime);
        return () => clearTimeout(timer);
      } else {
        setIsAnimating(false);
      }
    }
  }, [loading, isAnimating]);

  const animationClass = isAnimating ? "animate-spin" : "";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={isAnimating}
      className={`flex items-center gap-2 rounded-full transition-all duration-150 
        ${
          isAnimating
            ? "cursor-not-allowed text-green-600 border-green-300"
            : ""
        }
        ${className}`}
    >
      {textState && (
        <span className="capitalize text-sm">
          {isAnimating ? "syncing..." : "sync"}
        </span>
      )}

      <RefreshCw
        size={18}
        className={`${animationClass} transition-transform duration-150`}
      />
    </Button>
  );
};
export default SyncButton;
