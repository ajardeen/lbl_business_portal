import { useIsMobile } from "@/hooks/use-mobile";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // ✅ or next/link if using Next.js
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { CornerDownLeft, Search } from "lucide-react";
import { Kbd, KbdGroup } from "../ui/kbd";

/**
 * VA_GlobalSearchModel
 * Global command palette search with config-driven data
 */
function VA_GlobalSearchModel({
  placeholder = "Search...",
  searchBtnText = "Quick Search",
  suggestedSearch = [],
  pagesSearch = [],
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Handle Ctrl + /
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navigate to a route and close the dialog
  const handleNavigate = (link) => {
    setOpen(false);
    navigate(link);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        {isMobile ? (
          <Button variant="outline" className="p-2">
            <Search className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" className="flex items-center gap-3">
            <Search className="h-4 w-4" />
            {searchBtnText}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>/</Kbd>
            </KbdGroup>
          </Button>
        )}
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg p-1 h-[410px] gap-0 flex flex-col overflow-hidden dark:border-t-neutral-700 dark:bg-neutral-800 [&_button[data-dialog-close]]:hidden"
      >
        {/* Command Container */}
        <Command className="flex flex-col   flex-1 p-2 overflow-hidden">
          {/* Search Input */}
          <div className="rounded-md overflow-hidden mb-2 bg-[oklab(0.921998_-0.00000908971_0.0000215769_/_0.5)] dark:bg-[oklab(0.999998_-0.00000980496_0.0000234246_/_0.075)]">
            <CommandInput
              className="placeholder:text-muted-foreground flex h-10 w-full rounded-md border-hidden py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={placeholder}
            />
          </div>

          {/* Scrollable List Area */}
          <CommandList className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <CommandEmpty>No results found.</CommandEmpty>

            {/* Suggestions */}
            {suggestedSearch.length > 0 && (
              <>
                <CommandGroup heading="Suggestions">
                  {suggestedSearch.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <CommandItem
                        key={index}
                        onSelect={() => handleNavigate(item.link)}
                        className="cursor-pointer"
                      >
                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                        {item.searchName}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Pages */}
            {pagesSearch.length > 0 && (
              <CommandGroup heading="Pages">
                {pagesSearch.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => handleNavigate(item.link)}
                      className="cursor-pointer"
                    >
                      {Icon && <Icon className="mr-2 h-4 w-4" />}
                      {item.searchName}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>

        {/* Footer (fixed bottom) */}
        <DialogFooter className="text-muted-foreground flex h-10 items-center sm:justify-start gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800">
          <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3">
            <CornerDownLeft size={18} />
          </kbd>
          Go to Page
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

VA_GlobalSearchModel.propTypes = {
  placeholder: PropTypes.string,
  searchBtnText: PropTypes.string,
  suggestedSearch: PropTypes.arrayOf(
    PropTypes.shape({
      searchName: PropTypes.string.isRequired,
      link: PropTypes.string,
      icon: PropTypes.elementType,
    })
  ),
  pagesSearch: PropTypes.arrayOf(
    PropTypes.shape({
      searchName: PropTypes.string.isRequired,
      link: PropTypes.string,
      icon: PropTypes.elementType,
    })
  ),
};

export default VA_GlobalSearchModel;
