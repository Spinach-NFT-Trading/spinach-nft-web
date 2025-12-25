import React from "react";

import clsx from "clsx";

// Define the variant types
// Define the variant types
export type ButtonVariant = "default" | "outline" | "destructive" | "ghost" | "link" | "ghostDestructive";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant,
  size?: ButtonSize,
  isLoading?: boolean,
}

export const buttonVariants = {
  variants: {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-transparent shadow-sm hover:bg-primary hover:text-primary-foreground",
    ghost: "hover:bg-primary hover:text-primary-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    ghostDestructive: "text-red-500 hover:bg-red-500 hover:text-white",
  },
  sizes: {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8 text-base",
    icon: "h-9 w-9",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant = "default", size = "default", isLoading, children, disabled, ...props}, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none " +
      "focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, buttonVariants.variants[variant], buttonVariants.sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className={`
            mr-2 size-4 animate-spin rounded-full border-2 border-current
            border-t-transparent
          `}/>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
