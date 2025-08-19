"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  id?: number
  title: string
  description: string
  image: string
  link?: string
  githubLink?: string
  tags?: string[]
  className?: string
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  link,
  githubLink,
  tags = [],
  className = ""
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`
        relative group cursor-pointer
        bg-card border border-border rounded-xl overflow-hidden
        transition-all duration-500 ease-out
        ${isHovered 
          ? 'scale-105 -rotate-1 shadow-2xl border-primary/50' 
          : 'scale-100 rotate-0 shadow-lg hover:shadow-xl'
        }
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformOrigin: 'center',
        boxShadow: isHovered
          ? '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 60px rgba(59, 130, 246, 0.3)'
          : '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Floating glow effect */}
      <div
        className={`
          absolute -inset-2 rounded-xl pointer-events-none z-0
          transition-all duration-700 ease-out
          ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}
        `}
        style={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
          filter: 'blur(20px)',
        }}
      />

      {/* Image container */}
      <div className="relative overflow-hidden">
        <div
          className={`
            transition-transform duration-700 ease-out
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
        >
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        </div>
        
        {/* Overlay gradient */}
        <div
          className={`
            absolute inset-0 transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
          }}
        />

        {/* Action buttons */}
        <div
          className={`
            absolute top-4 right-4 flex gap-2
            transition-all duration-500 ease-out
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
        >
          {githubLink && (
            <Link
              href={githubLink}
              target="_blank"
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} className="text-white" />
            </Link>
          )}
          {link && (
            <Link
              href={link}
              target="_blank"
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} className="text-white" />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <h3
          className={`
            text-xl font-bold mb-2 transition-all duration-300
            ${isHovered ? 'text-primary' : 'text-foreground'}
          `}
        >
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`
                  px-2 py-1 text-xs rounded-full border
                  transition-all duration-300 ease-out
                  ${isHovered 
                    ? 'bg-primary/20 border-primary/40 text-primary' 
                    : 'bg-muted border-border text-muted-foreground'
                  }
                `}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Animated border */}
      <div
        className={`
          absolute inset-0 rounded-xl pointer-events-none
          transition-all duration-500 ease-out
          ${isHovered 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
          }
        `}
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
          backgroundSize: '200% 200%',
          animation: isHovered ? 'gradient-shift 3s ease-in-out infinite' : 'none',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          padding: '2px',
        }}
      />
    </div>
  )
}
