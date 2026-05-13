'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  opacitySpeed: number
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * (canvas?.width ?? 0),
        y: (canvas?.height ?? 0) + 10,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.6 + 0.2),
        opacity: 0,
        opacitySpeed: Math.random() * 0.005 + 0.002
      }
    }

    function init() {
      particles = Array.from({ length: 60 }, () => {
        const p = createParticle()
        p.y = Math.random() * (canvas?.height ?? 0)
        p.opacity = Math.random() * 0.4
        return p
      })
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.speedX
        p.y += p.speedY
        p.opacity += p.opacitySpeed

        if (p.opacity > 0.5) p.opacitySpeed *= -1
        if (p.opacity < 0) {
          particles[i] = createParticle()
          return
        }
        if (p.y < -10) {
          particles[i] = createParticle()
          return
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full z-3 pointer-events-none" />
  )
}
