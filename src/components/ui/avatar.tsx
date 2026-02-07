"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type AvatarProps = React.HTMLAttributes<HTMLDivElement>;

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100",
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

export type AvatarImageProps =
  React.ImgHTMLAttributes<HTMLImageElement> & {
    onLoadingStatusChange?: (loaded: boolean) => void;
  };

export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  AvatarImageProps
>(({ className, onLoad, onError, onLoadingStatusChange, ...props }, ref) => {
  const [loaded, setLoaded] = React.useState(false);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    onLoadingStatusChange?.(true);
    onLoad?.(event);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(false);
    onLoadingStatusChange?.(false);
    onError?.(event);
  };

  return (
    <img
      ref={ref}
      className={cn(
        "h-full w-full object-cover",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

export type AvatarFallbackProps = React.HTMLAttributes<HTMLDivElement>;

export const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 flex items-center justify-center bg-slate-100 text-xs font-semibold text-slate-500",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";
