"use client"

import { useState, useEffect, useRef } from "react"

interface FloatingObject {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  life: number
  maxLife: number
}

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [floatingObjects, setFloatingObjects] = useState<FloatingObject[]>([])
  const objectIdRef = useRef(0)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Create floating objects near cursor
      if (Math.random() < 0.3) { // 30% chance to create object
        const newObject: FloatingObject = {
          id: objectIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 100,
          y: e.clientY + (Math.random() - 0.5) * 100,
          size: Math.random() * 15 + 5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 2 + 1,
          life: 0,
          maxLife: Math.random() * 100 + 50
        }
        
        setFloatingObjects(prev => [...prev.slice(-20), newObject]) // Keep max 20 objects
      }
    }

    const hideCursor = () => setIsVisible(false)

    // Add event listeners
    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", hideCursor)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", hideCursor)
    }
  }, [])

  // Animate floating objects
  useEffect(() => {
    const animateObjects = () => {
      setFloatingObjects(prev => 
        prev
          .map(obj => ({
            ...obj,
            y: obj.y - obj.speed,
            x: obj.x + Math.sin(obj.life * 0.1) * 0.5,
            life: obj.life + 1,
            opacity: obj.opacity * (1 - obj.life / obj.maxLife)
          }))
          .filter(obj => obj.life < obj.maxLife && obj.opacity > 0.01)
      )
    }

    const interval = setInterval(animateObjects, 16) // ~60fps
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor with enhanced glow */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
          background: "linear-gradient(45deg, #ffffff, #f0f9ff, #dbeafe)",
          boxShadow: `
            0 0 20px rgba(255, 255, 255, 0.8),
            0 0 40px rgba(240, 249, 255, 0.6),
            0 0 60px rgba(219, 234, 254, 0.4),
            0 0 80px rgba(147, 197, 253, 0.3)
          `,
        }}
      />
      
      {/* Secondary glow ring */}
      <div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-40 opacity-60 transition-all duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 32}px, ${mousePosition.y - 32}px)`,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(240, 249, 255, 0.3) 40%, rgba(219, 234, 254, 0.2) 70%, transparent 100%)",
          filter: "blur(12px)",
        }}
      />

      {/* Floating white objects */}
      {floatingObjects.map(obj => (
        <div
          key={obj.id}
          className="fixed pointer-events-none z-30"
          style={{
            left: obj.x - obj.size / 2,
            top: obj.y - obj.size / 2,
            width: obj.size,
            height: obj.size,
            opacity: obj.opacity,
            transform: `rotate(${obj.life * 2}deg) scale(${1 + Math.sin(obj.life * 0.1) * 0.2})`,
            transition: 'opacity 0.1s ease-out',
          }}
        >
          {/* White floating object with different shapes */}
          <div
            className={`w-full h-full ${
              obj.id % 4 === 0 ? 'rounded-full' :
              obj.id % 4 === 1 ? 'rounded-lg' :
              obj.id % 4 === 2 ? 'rounded-none rotate-45' :
              'rounded-full'
            }`}
            style={{
              background: obj.id % 3 === 0 
                ? "linear-gradient(45deg, rgba(255, 255, 255, 0.9), rgba(240, 249, 255, 0.7))"
                : obj.id % 3 === 1
                ? "radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(219, 234, 254, 0.6))"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(147, 197, 253, 0.5))",
              boxShadow: `0 0 ${obj.size}px rgba(255, 255, 255, 0.6)`,
              filter: "blur(1px)",
            }}
          />
        </div>
      ))}

      {/* Ambient white particles */}
      <div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-35 opacity-40 transition-all duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x + Math.sin(Date.now() * 0.001) * 30 - 8}px, ${mousePosition.y + Math.cos(Date.now() * 0.001) * 30 - 8}px)`,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      
      <div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-35 opacity-30 transition-all duration-1500 ease-out"
        style={{
          transform: `translate(${mousePosition.x + Math.sin(Date.now() * 0.0015 + Math.PI) * 50 - 12}px, ${mousePosition.y + Math.cos(Date.now() * 0.0015 + Math.PI) * 50 - 12}px)`,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)",
          filter: "blur(3px)",
        }}
      />
    </>
  )
}
