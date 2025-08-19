import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import TechStack from "./components/tech-stack"
import { ThemeToggle } from "@/components/theme-toggle"
import ProfileImage from "@/components/ProfileImage"
import ProjectCard from "@/components/ProjectCard"
import personalInfo from "@/data/personal-info.json"
import projectsData from "@/data/projects.json"

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="live-background">
        <div className="floating-orbs"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center max-w-7xl px-4 md:px-6">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">{personalInfo.name}</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {personalInfo.navigation.map((item) => (
                <Link key={item.name} href={item.href} className="transition-colors hover:text-foreground/80">
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" className="bg-transparent">
              Resume
            </Button>
          </div>
        </div>
      </header>

      <audio id="hover-sound" preload="auto">
        <source src="/sounds/hover.mp3" type="audio/mpeg" />
      </audio>
      <audio id="click-sound" preload="auto">
        <source src="/sounds/click.mp3" type="audio/mpeg" />
      </audio>

      <main className="container mx-auto px-4 md:px-6 max-w-7xl flex-1">
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-4xl mx-auto">
            <ProfileImage
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              size={250}
              className="mb-8"
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {personalInfo.name}
              </h1>
              <h2 className="text-2xl font-semibold text-primary">
                {personalInfo.title}
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                {personalInfo.description}
              </p>
            </div>
            <div className="space-x-4 flex flex-wrap justify-center gap-2">
              <Link href={personalInfo.socialLinks.github} target="_blank">
                <Button variant="outline" size="icon" className="sound-button bg-transparent">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href={personalInfo.socialLinks.linkedin} target="_blank">
                <Button variant="outline" size="icon" className="sound-button bg-transparent">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href={personalInfo.socialLinks.twitter} target="_blank">
                <Button variant="outline" size="icon" className="sound-button bg-transparent">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link href={`mailto:${personalInfo.email}`}>
                <Button variant="outline" size="icon" className="sound-button bg-transparent">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="projects" className="py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full">
              {projectsData.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.liveDemo || project.link}
                  githubLink={project.link}
                  tags={project.tags}
                />
              ))}
            </div>
            <div className="mt-12">
              <Button asChild variant="outline">
                <Link href="/projects">
                  View All Projects
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              Tech Stack
            </h2>
            <TechStack />
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto max-w-2xl w-full">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Get in Touch
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 max-w-7xl">
          <p className="text-xs text-gray-500 dark:text-gray-400">{personalInfo.footer.copyright}</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            {personalInfo.footer.links.map((link) => (
              <Link key={link.name} className="text-xs hover:underline underline-offset-4" href={link.href}>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
