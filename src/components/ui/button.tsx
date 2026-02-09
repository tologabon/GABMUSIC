"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { usePlayerStore } from "../../store/usePlayerStore";

export type ButtonVariant = "default" | "outline" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild, children, ...props }, ref) => {
    const selectedPlan = usePlayerStore((state) => state.selectedPlan);

    const planClasses =
      selectedPlan === "premium"
        ? "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700"
        : selectedPlan === "standard"
        ? "bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700"
        : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800";

    const planOutlineClasses =
      selectedPlan === "premium"
        ? "border border-amber-500 text-amber-500 hover:bg-amber-50 active:bg-amber-100"
        : selectedPlan === "standard"
        ? "border border-emerald-500 text-emerald-500 hover:bg-emerald-50 active:bg-emerald-100"
        : "border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100";

    const variantClasses: Record<ButtonVariant, string> = {
      default: planClasses,
      outline: planOutlineClasses,
      ghost:
        selectedPlan === "premium"
          ? "text-amber-500 hover:bg-amber-50 active:bg-amber-100"
          : selectedPlan === "standard"
          ? "text-emerald-500 hover:bg-emerald-50 active:bg-emerald-100"
          : "text-blue-600 hover:bg-blue-50 active:bg-blue-100",
    };

    const classes = cn(
      "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      variantClasses[variant],
      className
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
