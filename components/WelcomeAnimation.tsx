"use client"

import { useState, useEffect } from "react"

export default function WelcomeAnimation() {
  const [isVisible, setIsVisible] = useState(true)
  const [showTexts, setShowTexts] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Check if user has seen the welcome animation before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    
    if (hasSeenWelcome) {
      setIsVisible(false)
      return
    }

    // Show both texts after initial delay
    const showTimer = setTimeout(() => {
      setShowTexts(true)
    }, 500)

    // Start exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 3000)

    // Hide welcome screen completely
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem('hasSeenWelcome', 'true')
    }, 4000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-all duration-1000 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Main welcome content */}
      <div className="relative text-center">
        {/* Both texts displayed simultaneously */}
        <div className="space-y-4">
          {/* Hello text */}
          <h1 
            className={`text-6xl md:text-7xl lg:text-8xl font-light text-foreground transition-all duration-1000 transform ${
              showTexts && !isExiting
                ? 'opacity-100 translate-y-0 scale-100' 
                : showTexts && isExiting
                ? 'opacity-0 -translate-y-12 scale-95'
                : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{
              transitionDelay: isExiting ? '0ms' : '200ms'
            }}
          >
            Hello
          </h1>
          
          {/* اهلا text */}
          <h1 
            className={`text-6xl md:text-7xl lg:text-8xl font-light text-foreground transition-all duration-1000 transform ${
              showTexts && !isExiting
                ? 'opacity-100 translate-y-0 scale-100' 
                : showTexts && isExiting
                ? 'opacity-0 -translate-y-12 scale-95'
                : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{
              fontFamily: 'Arial, sans-serif',
              direction: 'rtl',
              transitionDelay: isExiting ? '100ms' : '400ms'
            }}
          >
            اهلا
          </h1>
        </div>

        {/* Animated separator line between texts */}
        <div 
          className={`mx-auto mt-8 mb-8 h-px bg-gradient-to-r from-transparent via-foreground to-transparent transition-all duration-1000 ${
            showTexts && !isExiting
              ? 'opacity-40 w-32' 
              : 'opacity-0 w-0'
          }`}
          style={{
            transitionDelay: isExiting ? '0ms' : '600ms'
          }}
        />
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          <div 
            className={`w-2 h-2 bg-foreground rounded-full transition-all duration-500 ${
              showTexts && !isExiting ? 'animate-pulse opacity-100' : 'opacity-30'
            }`}
          />
          <div 
            className={`w-2 h-2 bg-foreground rounded-full transition-all duration-500 ${
              showTexts && !isExiting ? 'animate-pulse opacity-100' : 'opacity-30'
            }`}
            style={{ animationDelay: '0.2s' }}
          />
          <div 
            className={`w-2 h-2 bg-foreground rounded-full transition-all duration-500 ${
              showTexts && !isExiting ? 'animate-pulse opacity-100' : 'opacity-30'
            }`}
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>

      {/* Subtle background animation on exit */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          isExiting 
            ? 'bg-gradient-to-t from-background via-background to-transparent opacity-100' 
            : 'opacity-0'
        }`}
      />
    </div>
  )
}
