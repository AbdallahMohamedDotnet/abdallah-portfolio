import { Button } from "@/components/ui/button"
import ProfileImage from "@/components/ProfileImage" 
import ProjectCard from "@/components/ProjectCard"

export default function ComponentDemo() {
  // Sample data for demonstration
  const sampleProjects = [
    {
      id: 1,
      title: "Animated Portfolio",
      description: "A stunning portfolio website with custom animations and interactive elements built with Next.js and Tailwind CSS.",
      image: "/placeholder.svg?height=400&width=600",
      link: "https://portfolio-demo.vercel.app",
      githubLink: "https://github.com/username/portfolio",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.",
      image: "/placeholder.svg?height=400&width=600",
      link: "https://ecommerce-demo.vercel.app",
      githubLink: "https://github.com/username/ecommerce",
      tags: ["React", "Node.js", "Stripe", "MongoDB"]
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      image: "/placeholder.svg?height=400&width=600",
      link: "https://tasks-demo.vercel.app",
      githubLink: "https://github.com/username/task-manager",
      tags: ["Vue.js", "Express", "Socket.io", "PostgreSQL"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Animated Components Demo</h1>
          <p className="text-muted-foreground text-lg">
            Interactive components with hover animations and custom cursor
          </p>
        </div>

        {/* ProfileImage Component Demo */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">ProfileImage Component</h2>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-center">
              <ProfileImage
                src="/placeholder-user.jpg"
                alt="Profile Image Small"
                size={120}
              />
              <p className="mt-4 text-sm text-muted-foreground">Small (120px)</p>
            </div>
            <div className="text-center">
              <ProfileImage
                src="/placeholder-user.jpg"
                alt="Profile Image Medium"
                size={160}
              />
              <p className="mt-4 text-sm text-muted-foreground">Medium (160px)</p>
            </div>
            <div className="text-center">
              <ProfileImage
                src="/placeholder-user.jpg"
                alt="Profile Image Large"
                size={200}
              />
              <p className="mt-4 text-sm text-muted-foreground">Large (200px)</p>
            </div>
          </div>
        </section>

        {/* ProjectCard Component Demo */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">ProjectCard Component</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sampleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                link={project.link}
                githubLink={project.githubLink}
                tags={project.tags}
              />
            ))}
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">How to Use These Components</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">1. Cursor Component</h3>
              <p className="text-muted-foreground mb-2">
                Add a custom animated cursor that follows the mouse with glowing effects.
              </p>
              <code className="bg-background p-2 rounded text-sm block">
                {`import Cursor from "@/components/Cursor"

export default function MyPage() {
  return (
    <div>
      <Cursor />
      {/* Your content */}
    </div>
  )
}`}
              </code>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">2. ProfileImage Component</h3>
              <p className="text-muted-foreground mb-2">
                Display profile images with hover animations (scale + glow effects).
              </p>
              <code className="bg-background p-2 rounded text-sm block">
                {`import ProfileImage from "@/components/ProfileImage"

<ProfileImage
  src="/path/to/image.jpg"
  alt="Profile description"
  size={160}
  className="custom-class"
/>`}
              </code>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">3. ProjectCard Component</h3>
              <p className="text-muted-foreground mb-2">
                Create project cards with hover effects (scale, rotate, glow).
              </p>
              <code className="bg-background p-2 rounded text-sm block">
                {`import ProjectCard from "@/components/ProjectCard"

<ProjectCard
  title="Project Title"
  description="Project description..."
  image="/project-image.jpg"
  link="https://demo.com"
  githubLink="https://github.com/user/repo"
  tags={["React", "TypeScript", "Tailwind"]}
/>`}
              </code>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
