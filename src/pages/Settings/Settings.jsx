import React from "react";
import { useNavigate } from "react-router-dom";
import { HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const Settings = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/leads");
  };

  return (
    <Empty className={"min-h-[85vh]"}>
      <EmptyHeader>
        <EmptyMedia>
          <div className="flex flex-col items-center justify-center space-y-3">
            {/* Icon and avatars */}
            <HardHat className="w-12 h-12 text-yellow-500 mb-2" />
          </div>
        </EmptyMedia>

        <EmptyTitle>Settings Under Development</EmptyTitle>
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
      </EmptyContent>
    </Empty>
  );
};

export default Settings;
