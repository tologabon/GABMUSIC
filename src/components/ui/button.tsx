import * as React from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant = "default" | "outline" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
  ghost: "text-blue-600 hover:bg-blue-50 active:bg-blue-100",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild, children, ...props }, ref) => {
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
