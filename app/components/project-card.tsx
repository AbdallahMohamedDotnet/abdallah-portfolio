import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  id: number
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

export default function ProjectCard({ id, title, description, image, link, tags }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover-lift active-bg animate-fade-in">
      <Link href={`/projects/${id}`}>
        <div className="relative aspect-video cursor-pointer">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/projects/${id}`}>
          <h3 className="font-semibold text-xl mb-2 animate-glow hover:text-primary cursor-pointer transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 hover:scale-105 transition-transform duration-200 active-bg"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild size="sm" variant="outline" className="flex-1">
          <Link href={`/projects/${id}`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href={link} target="_blank">
            <Github className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
