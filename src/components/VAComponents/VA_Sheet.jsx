import React from "react";
import PropTypes from "prop-types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ChevronsDown, ExternalLink } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function VA_Sheet({
  title = "Sheet Title",
  triggerComponent = <ExternalLink size={18} />,
  description,
  open,
  setOpen,
  icon,
  side = "right",
  className = "",
  sheetContentClassName = "",
  children,
  sheetFooterComponent,
}) {
  const isMobile = useIsMobile();
  const scrollViewportRef = React.useRef(null);
  const [isScrollable, setIsScrollable] = React.useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(false);

  const checkScrollable = React.useCallback(() => {
    // The actual scrolling element (viewport) inside the ScrollArea component
    const viewport =
      scrollViewportRef.current?.getElementsByClassName("viewport")[0] ||
      scrollViewportRef.current;

    if (viewport) {
      const scrollable = viewport.scrollHeight > viewport.clientHeight;
      setIsScrollable(scrollable);

      if (scrollable && viewport.scrollTop < 10) {
        setShowScrollIndicator(true);
      } else {
        setShowScrollIndicator(false);
      }
    }
  }, []);

  React.useEffect(() => {
    if (open) {
      const timeout = setTimeout(checkScrollable, 50);

      window.addEventListener("resize", checkScrollable);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener("resize", checkScrollable);
      };
    } else {
      setIsScrollable(false);
      setShowScrollIndicator(false);
    }
  }, [open, children, checkScrollable]);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 20) {
      setShowScrollIndicator(false);
    } else if (isScrollable && e.target.scrollTop <= 20) {
      setShowScrollIndicator(true);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{triggerComponent}</SheetTrigger>

      <SheetContent
        side={side}
        className={cn("gap-0", `${className}`)}
      >
        <SheetHeader className={"border-b-accent"}>
          <SheetTitle>
            {icon && <span className="mr-2"> {icon}</span>}
            {title}
          </SheetTitle>
          <SheetDescription>{description}</SheetDescription>
          <Separator />
        </SheetHeader>

        <div className="relative flex-grow overflow-hidden">
          <ScrollArea
            className="h-full"
            onScroll={handleScroll}
            ref={scrollViewportRef}
          >
            <div
              className={`mx-2 my-0 pb-10 px-4 rounded-md ${sheetContentClassName}`}
            >
              {children}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>

          {/* SCROLL INDICATOR ICON FIXED: Placed here, outside the ScrollArea, 
          but inside the relative content wrapper (div above) to ensure 
          it correctly positions at the bottom of the *visible* content area. */}
        </div>

        <SheetFooter className="border-t">
          {showScrollIndicator && (
            <ChevronsDown className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce w-6 h-6 text-muted-foreground pointer-events-none z-10" />
          )}
          {sheetFooterComponent}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

VA_Sheet.propTypes = {
  title: PropTypes.string,
  triggerComponent: PropTypes.node,
  description: PropTypes.node,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  icon: PropTypes.node,
  side: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  className: PropTypes.string,
  sheetContentClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  sheetFooterComponent: PropTypes.node,
};
