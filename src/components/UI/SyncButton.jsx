import { IoSyncCircleOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

function SyncButton({
  loading = false,
  onClick,
  className = "",
  textState = false,
}) {
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

  const animationClass = isAnimating ? "animating" : "";

  return (
    <button
      onClick={onClick}
      disabled={isAnimating}
      className={`p-1 px-2 flex items-center justify-center rounded-full border transition duration-150 ${
        !isAnimating
          ? "text-gray-800 border-gray-200/50 hover:border-gray-400"
          : "text-green-500 border-transparent"
      } bg-white/30 backdrop-blur-sm shadow-sm ${className} ${
        isAnimating ? "cursor-not-allowed" : ""
      }`}
    >
      <div className="text-xs md:text-sm flex justify-center items-center gap-2 px-1 capitalize transition-all duration-150 ">
        {textState && `${animationClass?"syncing":"sync"}`}
        <IoSyncCircleOutline className={`${animationClass && "animate-spin"   }`} size={20} />
      </div>
    </button>
  );
}

export default SyncButton;
