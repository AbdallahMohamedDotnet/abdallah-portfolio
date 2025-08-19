import { ThemeProvider } from "@/components/theme-provider"
import AnimatedLayout from "@/components/AnimatedLayout"
import WelcomeAnimation from "@/components/WelcomeAnimation"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abdallah Mohamed - Back-End Developer",
  description: "Back-End developer portfolio showcasing projects and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WelcomeAnimation />
          <AnimatedLayout>
            {children}
          </AnimatedLayout>
        </ThemeProvider>
        <script src="/sounds/sound-manager.js" defer></script>
      </body>
    </html>
  )
}
