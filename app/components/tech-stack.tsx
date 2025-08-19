import { Card } from "@/components/ui/card"
import techStackData from "@/data/tech-stack.json"

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl mx-auto justify-items-center">
      {techStackData.categories.map((category, index) => (
        <Card
          key={category.category}
          className="p-6 hover-lift active-bg animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <h3 className="text-lg font-semibold mb-4 animate-glow">{category.category}</h3>
          <div className="flex flex-wrap gap-2">
            {category.technologies.map((tech, techIndex) => (
              <span
                key={tech.name}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 hover:scale-105 hover:bg-primary/20 transition-all duration-200 active-bg animate-bounce-in"
                style={{ animationDelay: `${index * 0.1 + techIndex * 0.05}s` }}
              >
                <span className="mr-1">{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
