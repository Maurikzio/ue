import { useState } from "react";
import { cn } from "../../lib/utils";

export function Image({ src, alt = "", className, fill = false, width, height, priority = false, onLoad, ...props }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <div
      className={cn(fill ? "relative w-full h-full" : "", isLoading ? "bg-gray-800 animate-pulse" : "", className)}
      style={!fill && width && height ? { width, height } : {}}
    >
      <img
        src={src || "https://placehold.co/600x400"}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          fill ? "absolute inset-0 w-full h-full" : "",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
}
