import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

type buttonTypes = "default" | "outline" | "cancel"

const buttonVariants = cva(
  "rounded-lg px-3 py-1 text-sm",
  {
    variants: {
      variant: {
        default: "bg-primary",
        outline: "border border-primary text-primary",
        cancel: "bg-[#262634] text-white hover:opacity-75",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: buttonTypes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export default Button
