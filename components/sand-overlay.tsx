"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function SandOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5 // Smaller particles
        this.speedX = Math.random() * 0.5 - 0.25 // Slower movement
        this.speedY = Math.random() * 0.3 - 0.15

        // Sand-like colors with very low opacity
        const colors = [
          "rgba(194, 178, 128, 0.15)", // Sand
          "rgba(210, 180, 140, 0.15)", // Tan
          "rgba(245, 222, 179, 0.12)", // Wheat
          "rgba(210, 105, 30, 0.1)", // Chocolate
          "rgba(139, 69, 19, 0.08)", // Saddle brown
          "rgba(160, 82, 45, 0.1)", // Sienna
          "rgba(205, 133, 63, 0.12)", // Peru
          "rgba(222, 184, 135, 0.15)", // Burlywood
          "rgba(210, 40, 30, 0.08)", // Red accent
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles - fewer particles for subtle effect
    const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none mix-blend-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
