import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, ExternalLink, Calendar, Clock, CheckCircle, Circle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import projectsData from "@/data/projects.json"

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params
  const project = projectsData.projects.find(p => p.id === parseInt(id))

  if (!project) {
    notFound()
  }

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

      <main className="container mx-auto px-4 md:px-6 max-w-6xl py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-2/3">
              <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{project.shortDescription}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Duration: {project.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Category: {project.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  {project.status === "Completed" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-sm">Status: {project.status}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4">
                <Button asChild>
                  <Link href={project.link} target="_blank">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Link>
                </Button>
                {project.liveDemo && (
                  <Button variant="outline" asChild>
                    <Link href={project.liveDemo} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Images Gallery */}
        {project.images && project.images.length > 1 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Overview */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
            </CardContent>
          </Card>
        </section>

        {/* Technologies */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Technologies Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(project.technologies).map(([category, techs]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-semibold capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <div className="flex flex-wrap gap-2">
                      {(techs as string[]).map((tech: string) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Challenges and Learnings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Challenges Faced</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Circle className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Learnings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{learning}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/#projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Projects
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    id: project.id.toString(),
  }))
}
