import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-white text-primary hover:bg-white/90 shadow-elegant transition-all duration-300 hover:scale-[1.02] hover:shadow-glow font-semibold",
        navy: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-card-soft transition-all duration-300 hover:scale-[1.02] font-semibold",
        outlineLight: "border-2 border-white/30 bg-transparent text-white hover:bg-white hover:text-primary transition-all duration-300",
        // Vibrant blue→purple pill CTA. Arrow icon inside slides right on hover.
        cta: "rounded-full text-white font-semibold bg-[linear-gradient(135deg,hsl(217_91%_55%)_0%,hsl(258_90%_55%)_55%,hsl(280_85%_45%)_100%)] shadow-[0_10px_30px_-8px_hsl(258_90%_55%/0.55)] hover:shadow-[0_14px_36px_-8px_hsl(258_90%_55%/0.7)] transition-all duration-300 hover:scale-[1.03] group-hover:[&_svg]:translate-x-1 hover:[&_svg]:translate-x-1",
        // High-contrast emerald CTA for "Get in Touch"
        emerald: "rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 shadow-[0_8px_24px_-8px_hsl(160_84%_39%/0.6)] transition-all duration-300 hover:scale-[1.03]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
