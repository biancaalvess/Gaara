import type React from "react"
import { cn } from "@/lib/utils"

interface SandTextProps {
  children: React.ReactNode
  className?: string
}

export function SandText({ children, className }: SandTextProps) {
  return (
    <span
      className={cn("relative inline-block font-cinzel", className)}
      style={{
        WebkitTextStroke: "1px rgba(139, 69, 19, 0.3)",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      <span className="text-sand">{children}</span>
    </span>
  )
}

export function BloodText({ children, className }: SandTextProps) {
  return (
    <span
      className={cn("relative inline-block font-cinzel", className)}
      style={{
        WebkitTextStroke: "1px rgba(139, 0, 0, 0.3)",
        textShadow: "0 2px 10px rgba(139, 0, 0, 0.5)",
      }}
    >
      <span className="text-blood">{children}</span>
    </span>
  )
}

export function KazekageTitle({ children, className }: SandTextProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <h3 className="font-bebas tracking-wider text-shadow-lg">{children}</h3>
      <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
    </div>
  )
}
