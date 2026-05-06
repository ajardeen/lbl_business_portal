import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from "react";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon } from "lucide-react";

const VA_InputFile = forwardRef(
  (
    {
      className,
      showPreview = false,
      onChange,
      value, 
      ...props
    },
    ref
  ) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    
    // We use an internal ref to talk to the DOM directly for resets
    const inputRef = useRef(null);
    
    // This allows react-hook-form to still use the ref while we use it too
    useImperativeHandle(ref, () => inputRef.current);

    // --- RESET LOGIC ---
    useEffect(() => {
      // If value is empty/null (form reset), clear everything
      if (!value) {
        if (previewUrl) {
          if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        // CRITICAL: Manually clear the DOM input value
        if (inputRef.current) {
          inputRef.current.value = ""; 
        }
      } 
      // Handle existing image URLs (Edit mode)
      else if (typeof value === "string" && value !== previewUrl) {
        setPreviewUrl(value);
      }
    }, [value]);

   const handleFileChange = (e) => {
      const file = e.target.files?.[0] || null; // Ensure we have null if cancelled

      if (showPreview && file && file.type.startsWith("image/")) {
        if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }

      // Sync with React Hook Form
      if (onChange) {
        // Pass the actual File object directly to RHF
        onChange(file); 
      }
    };
    return (
      <div className="space-y-3">
        {showPreview && (
          <div className="relative">
            {previewUrl ? (
              <div className="w-24 h-24 rounded-lg border bg-muted overflow-hidden shadow-sm">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-lg border border-dashed flex flex-col items-center justify-center text-muted-foreground bg-muted/30">
                <ImageIcon className="w-8 h-8 opacity-20" />
                <span className="text-[10px] mt-1">No Image</span>
              </div>
            )}
          </div>
        )}

        <Input
          ref={inputRef} // Use our internal ref here
          type="file"
          onChange={handleFileChange}
          className={`
            cursor-pointer 
            p-1
            file:px-3
            file:h-full
            file:rounded-md
            file:cursor-pointer 
            file:border-0 
            file:bg-primary/10 
            file:text-primary 
            file:font-medium 
            hover:file:bg-primary/20
            dark:file:bg-primary/20
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

VA_InputFile.displayName = "VA_InputFile";

export default VA_InputFile;