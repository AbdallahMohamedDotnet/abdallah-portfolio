"use client"

import Cursor from "@/components/Cursor"
import { ReactNode } from "react"

interface AnimatedLayoutProps {
  children: ReactNode
}

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Cursor with white live objects */}
      <Cursor />
      
      {/* Animated background with white floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating white orbs */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full animate-float" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-20 right-20 w-6 h-6 bg-white/15 rounded-full animate-bounce" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/25 rounded-full animate-pulse" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-5 h-5 bg-white/20 rounded-full animate-float" 
             style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping" 
             style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-white/18 rounded-full animate-bounce" 
             style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-white/22 rounded-full animate-pulse" 
             style={{ animationDelay: '2.5s' }} />
        
        {/* Larger floating elements */}
        <div className="absolute top-32 left-1/3 w-8 h-8 bg-gradient-to-r from-white/10 to-white/20 rounded-full animate-float" 
             style={{ animationDelay: '4s', animationDuration: '4s' }} />
        <div className="absolute bottom-32 right-1/4 w-10 h-10 bg-gradient-to-r from-white/8 to-white/15 rounded-full animate-bounce" 
             style={{ animationDelay: '5s', animationDuration: '3s' }} />
        
        {/* Moving particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute animate-orbit" style={{ top: '20%', left: '30%' }}>
            <div className="w-2 h-2 bg-white/30 rounded-full" />
          </div>
          <div className="absolute animate-orbit" style={{ top: '60%', left: '70%', animationDirection: 'reverse', animationDuration: '15s' }}>
            <div className="w-3 h-3 bg-white/25 rounded-full" />
          </div>
          <div className="absolute animate-orbit" style={{ top: '80%', left: '20%', animationDuration: '20s' }}>
            <div className="w-1.5 h-1.5 bg-white/35 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main content with entrance animation */}
      <div className="relative z-10 animate-fade-in">
        {children}
      </div>

      {/* Sparkle effects in corners */}
      <div className="fixed top-4 left-4 w-3 h-3 bg-white/40 rounded-full animate-sparkle z-5" 
           style={{ animationDelay: '1s' }} />
      <div className="fixed top-4 right-4 w-2 h-2 bg-white/50 rounded-full animate-sparkle z-5" 
           style={{ animationDelay: '2s' }} />
      <div className="fixed bottom-4 left-4 w-2.5 h-2.5 bg-white/35 rounded-full animate-sparkle z-5" 
           style={{ animationDelay: '3s' }} />
      <div className="fixed bottom-4 right-4 w-2 h-2 bg-white/45 rounded-full animate-sparkle z-5" 
           style={{ animationDelay: '4s' }} />
    </div>
  )
}
