import { forwardRef } from "react";
import { Button, ButtonProps } from "./Button";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  label: string; // Accessibility label is required
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, icon, label, variant = "ghost", size = "icon", ...props },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors",
          className,
        )}
        aria-label={label}
        {...props}
      >
        {icon}
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";

export { IconButton };
