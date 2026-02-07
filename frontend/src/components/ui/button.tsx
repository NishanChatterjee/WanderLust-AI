import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-900/20",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:text-white",
        secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
        ghost: "hover:bg-slate-800 hover:text-white",
        link: "text-purple-400 underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-900/20 border border-white/10",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    // If we wanted to use Slot from radix-ui we would need to install it.
    // For now, let's just stick to standard button since we didn't install radix-ui
    // If asChild is true, we should use Slot, but let's remove that complexity for now or check if we want to install it.
    // The plan didn't mention radix-ui. I'll revert Slot usage to standard button to avoid error.
    
    // Actually simplicity first.
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
