import React from "react";
import { useNavigate } from "react-router-dom";
import { HardHat } from "lucide-react";
import { Button } from "@/components/_UItemp/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/_UItemp/empty";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/leads");
  };

  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 2000)
    );

  return (
    <Empty className={"min-h-[85vh]"}>
      <EmptyHeader>
        <EmptyMedia>
          <div className="flex flex-col items-center justify-center space-y-3">
            {/* Icon and avatars */}
            <HardHat className="w-12 h-12 text-yellow-500 mb-2" />
          </div>
        </EmptyMedia>

        <EmptyTitle>Dashboard Under Development</EmptyTitle>
        <EmptyDescription className="max-w-md mx-auto">
          We’re currently building an enhanced experience for your dashboard.
          Please check back soon! In the meantime, you can view your leads
          section.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button size="sm" onClick={handleRedirect}>
          Go to Leads
        </Button>
        {/* <Button
          size="sm"
          onClick={() => {
            toast.success(
              "success")
          }}
        >
          success toast
        </Button>
        <Button
          size="sm"
          onClick={() => {
            toast.warning("Coming Soon");
          }}
        >
          warning toast
        </Button>
        <Button
          size="sm"
          onClick={() => {
            toast.error("Coming Soon");
          }}
        >
          error toast
        </Button>
        <Button
          size="sm"
          onClick={() => {
            toast.info("Coming Soon");
          }}
        >
          info toast
        </Button>

        <Button
          size="sm"
          onClick={() => {
            toast.promise(promise, {
              loading: "Loading...",
              success: (data) => {
                return `Toast for ${data.name} has been added`;
              },
              error: "Error",
            });
          }}
        >
          promise toast
        </Button> */}
      </EmptyContent>
    </Empty>
  );
};

export default Dashboard;
