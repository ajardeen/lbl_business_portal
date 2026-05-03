import { useState, useEffect } from "react";
import VA_Button from "@/components/VAComponents/VA_Button";
import API from "@/configs/axios";
import { useAuth } from "@/context/AuthContext";

function OrderTrackerCard({ order }) {
  const { account } = useAuth();
  const chefId = account?._id;

  const [isCooking, setIsCooking] = useState(order.status === "cooking");
  const [isFinished, setIsFinished] = useState(order.status === "ready");
  const [timeUp, setTimeUp] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(
    (order.totalPrepTime ?? 0) * 60
  );

  // Countdown logic
  useEffect(() => {
    let timer;
    if (isCooking && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    } else if (remainingSeconds === 0 && isCooking) {
      setIsCooking(false);
      setTimeUp(true);
    }
    return () => clearInterval(timer);
  }, [isCooking, remainingSeconds]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Start Cooking
  const handleStart = async () => {
    setIsCooking(true);
    setIsFinished(false);
    setTimeUp(false);
    setRemainingSeconds(order.totalPrepTime * 60);

    await API.put(`/kitchen/status/${order.id}`, { status: "cooking", chefId });
    order.status = "cooking";
  };

  // Finish Cooking -> mark as READY (not completed)
  const handleFinish = async () => {
    setIsCooking(false);
    setIsFinished(true);
    setTimeUp(false);

    await API.put(`/kitchen/status/${order.id}`, { status: "ready", chefId });
    order.status = "ready";
  };
  const handleComplete = async () => {
    setIsFinished(true);
    setIsCooking(false);
    setTimeUp(false);

    await API.put(`/kitchen/status/${order.id}`, {
      status: "completed",
      chefId,
    });
    order.status = "completed";
  };

  return (
    <div
      className={` border-2 min-h-85 bg-white shadow-sm p-4 flex flex-col justify-between transition-all duration-300 ${
        isFinished
          ? "border-yellow-500 bg-yellow-50"
          : timeUp
          ? "border-red-500 bg-red-50"
          : isCooking
          ? "border-orange-500"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="font-semibold text-gray-800">{order.id}</h2>
            <p className="text-sm text-gray-500 mb-1">
              {order.customer} – {order.type}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">
              Due:{" "}
              <span className="font-medium text-gray-600">{order.due}</span>
            </p>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                isFinished
                  ? "bg-yellow-100 text-yellow-600"
                  : timeUp
                  ? "bg-red-100 text-red-600"
                  : isCooking
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isFinished && order.status === "completed"
                ? "COMPLETED"
                : isFinished
                ? "READY"
                : timeUp
                ? "TIME'S UP"
                : isCooking
                ? "COOKING"
                : "QUEUE"}
            </span>
          </div>
        </div>

        <ul className="text-sm text-gray-700 space-y-1">
          {order.items.map((item, idx) => (
            <li
              key={idx}
              className="border-b last:border-none pb-1 flex items-center justify-between"
            >
              {`${item.itemName} x ${item.qty}`}
              <span>{`${item.prepTimeMinutes} min`}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Section */}
      <div className="h-[60px] flex min-w-[200px] bg-accent rounded-md overflow-hidden mt-4">
        {isCooking ? (
          <VA_Button
            size="sm"
            variant="destructive"
            className="w-full h-full flex items-center justify-between px-5 font-semibold"
            onClick={handleFinish}
          >
            <span className="flex-1 text-left">Finish Cooking</span>
            <span className="text-sm text-right min-w-[50px]">
              {formatTime(remainingSeconds)}
            </span>
          </VA_Button>
        ) : timeUp ? (
          <VA_Button
            size="sm"
            className="w-full h-full flex items-center justify-center text-white bg-red-600 hover:bg-red-700 font-semibold"
            onClick={handleFinish}
          >
            Time’s Up — Mark Ready
          </VA_Button>
        ) : order.status === "completed" ? (
          <VA_Button
            size="sm"
            variant="outline"
            className="w-full h-full bg-green-600 text-white cursor-default"
            disabled
          >
            Completed
          </VA_Button>
        ) : isFinished ? (
          <VA_Button
            size="sm"
            variant="outline"
            className="w-full h-full !bg-yellow-500 text-white"
            onClick={handleComplete}
          >
            Ready for Delivery
          </VA_Button>
        ) : (
          <VA_Button
            size="sm"
            className="w-full h-full flex items-center justify-between px-5 font-semibold"
            onClick={handleStart}
          >
            <span className="flex-1 text-left">Start Cooking</span>
            <span className="text-sm text-right min-w-[50px]">
              {formatTime(remainingSeconds)}
            </span>
          </VA_Button>
        )}
      </div>
    </div>
  );
}

export default OrderTrackerCard;
