import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ProjectCard from "../components/project-card"
import projectsData from "@/data/projects.json"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="live-background">
        <div className="floating-orbs"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center max-w-7xl px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Portfolio</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 max-w-7xl flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-4">All Projects</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore my portfolio of web development projects, from full-stack applications to AI-powered solutions.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full">
              {projectsData.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                  tags={project.tags}
                />
              ))}
            </div>

            <div className="mt-12">
              <Button asChild>
                <Link href="/#contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
