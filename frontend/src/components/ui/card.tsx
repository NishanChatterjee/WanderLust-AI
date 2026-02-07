import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={cn(
      "rounded-2xl border border-slate-700/50 bg-slate-800/40 text-slate-100 shadow-xl backdrop-blur-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

export { Card }
