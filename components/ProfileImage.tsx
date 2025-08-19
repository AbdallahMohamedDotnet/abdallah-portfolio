"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface ProfileImageProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export default function ProfileImage({ 
  src, 
  alt, 
  size = 200, // Increased default size
  className = "" 
}: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`relative group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      {/* Main image container with enhanced animations */}
      <div
        className={`
          relative w-full h-full rounded-full overflow-hidden
          border-4 border-primary/30 
          transition-all duration-700 ease-out
          ${isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
          ${isHovered 
            ? 'scale-125 border-primary/80 shadow-2xl rotate-6' 
            : 'scale-100 shadow-xl rotate-0'
          }
        `}
        style={{
          boxShadow: isHovered
            ? '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(59, 130, 246, 0.6)'
            : '0 15px 30px rgba(0, 0, 0, 0.3)',
          transform: `scale(${isHovered ? 1.25 : 1}) rotate(${isHovered ? 6 : 0}deg)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="w-full h-full object-cover transition-all duration-700 ease-out"
          style={{
            transform: isHovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0deg)',
            filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
          }}
          priority
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Enhanced gradient overlay */}
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-700
            ${isHovered ? 'opacity-100' : 'opacity-40'}
          `}
          style={{
            background: isHovered
              ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.3))'
              : 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
          }}
        />

        {/* Floating particles effect */}
        {isHovered && (
          <>
            <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-ping opacity-75" />
            <div className="absolute top-8 right-6 w-1 h-1 bg-blue-300 rounded-full animate-pulse" />
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce" />
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-pink-300 rounded-full animate-ping" />
          </>
        )}
      </div>

      {/* Enhanced floating glow effect */}
      <div
        className={`
          absolute inset-0 rounded-full pointer-events-none
          transition-all duration-1000 ease-out
          ${isHovered ? 'opacity-100 scale-150' : 'opacity-0 scale-100'}
        `}
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.4) 40%, rgba(236, 72, 153, 0.3) 70%, transparent 100%)',
          filter: 'blur(25px)',
          animation: isHovered ? 'pulse 2s infinite, float 4s ease-in-out infinite' : 'none',
        }}
      />

      {/* Multiple animated rings */}
      <div
        className={`
          absolute inset-0 rounded-full border-2 pointer-events-none
          transition-all duration-700 ease-out
          ${isHovered 
            ? 'border-blue-400/70 scale-140 opacity-100' 
            : 'border-transparent scale-100 opacity-0'
          }
        `}
        style={{
          animation: isHovered ? 'spin 4s linear infinite' : 'none',
        }}
      />
      
      <div
        className={`
          absolute inset-0 rounded-full border-2 pointer-events-none
          transition-all duration-700 ease-out
          ${isHovered 
            ? 'border-purple-400/50 scale-160 opacity-100' 
            : 'border-transparent scale-100 opacity-0'
          }
        `}
        style={{
          animation: isHovered ? 'spin 6s linear infinite reverse' : 'none',
        }}
      />

      {/* Sparkle effects */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full animate-bounce opacity-80" 
                 style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-pink-200 rounded-full animate-ping opacity-80" 
                 style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full animate-pulse opacity-80" 
                 style={{ animationDelay: '1.5s' }} />
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-200 rounded-full animate-bounce opacity-80" 
                 style={{ animationDelay: '2s' }} />
          </div>
        </div>
      )}
    </div>
  )
}
