"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  shortDescription: string
  image: string
  images: string[]
  link: string
  liveDemo?: string
  tags: string[]
  category: string
  duration: string
  status: string
  technologies: {
    frontend: string[]
    backend: string[]
    payment?: string[]
    authentication?: string[]
    ai?: string[]
    deployment: string[]
  }
  features: string[]
  challenges: string[]
  learnings: string[]
  overview: string
}

interface ProjectFormProps {
  project?: Project
  onSave: (project: Project) => void
  onCancel: () => void
  isEditing?: boolean
}

const emptyProject: Partial<Project> = {
  title: "",
  description: "",
  shortDescription: "",
  image: "",
  images: [""],
  link: "",
  liveDemo: "",
  tags: [],
  category: "",
  duration: "",
  status: "In Progress",
  technologies: {
    frontend: [],
    backend: [],
    payment: [],
    authentication: [],
    ai: [],
    deployment: []
  },
  features: [],
  challenges: [],
  learnings: [],
  overview: ""
}

export default function ProjectForm({ project, onSave, onCancel, isEditing = false }: ProjectFormProps) {
  const [formData, setFormData] = useState<Partial<Project>>(project || emptyProject)
  const [newTag, setNewTag] = useState("")
  const [newFeature, setNewFeature] = useState("")
  const [newChallenge, setNewChallenge] = useState("")
  const [newLearning, setNewLearning] = useState("")

  const categories = ["Full Stack", "Frontend", "Backend", "Mobile", "AI/ML", "DevOps", "Other"]
  const statuses = ["Planning", "In Progress", "Completed", "On Hold"]
  const techCategories = ["frontend", "backend", "payment", "authentication", "ai", "deployment"]

  const addArrayItem = (field: keyof Project, value: string) => {
    if (!value.trim()) return
    
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[] || []), value.trim()]
    }))

    // Clear the input
    if (field === "tags") setNewTag("")
    if (field === "features") setNewFeature("")
    if (field === "challenges") setNewChallenge("")
    if (field === "learnings") setNewLearning("")
  }

  const removeArrayItem = (field: keyof Project, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }))
  }

  const addTechItem = (category: string, value: string) => {
    if (!value.trim()) return
    
    setFormData(prev => ({
      ...prev,
      technologies: {
        ...prev.technologies!,
        [category]: [...((prev.technologies![category as keyof typeof prev.technologies] as string[]) || []), value.trim()]
      }
    }))
  }

  const removeTechItem = (category: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: {
        ...prev.technologies!,
        [category]: ((prev.technologies![category as keyof typeof prev.technologies] as string[]) || []).filter((_: string, i: number) => i !== index)
      }
    }))
  }

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ""]
    }))
  }

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).map((img, i) => i === index ? value : img)
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const projectData = {
      ...formData,
      id: formData.id || Date.now(),
      tags: formData.tags || [],
      images: (formData.images || []).filter(img => img.trim() !== ""),
      technologies: {
        frontend: formData.technologies?.frontend || [],
        backend: formData.technologies?.backend || [],
        payment: formData.technologies?.payment || [],
        authentication: formData.technologies?.authentication || [],
        ai: formData.technologies?.ai || [],
        deployment: formData.technologies?.deployment || []
      },
      features: formData.features || [],
      challenges: formData.challenges || [],
      learnings: formData.learnings || []
    } as Project

    onSave(projectData)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Project" : "Add New Project"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update project information" : "Create a new project entry with detailed information"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription || ""}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief project description"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed project description"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="overview">Project Overview</Label>
              <Textarea
                id="overview"
                value={formData.overview || ""}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                placeholder="Comprehensive project overview for detail page"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category || ""} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration || ""}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 months"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status || ""} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="link">GitHub Repository</Label>
                <Input
                  id="link"
                  value={formData.link || ""}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://github.com/username/repo"
                  required
                />
              </div>
              <div>
                <Label htmlFor="liveDemo">Live Demo (Optional)</Label>
                <Input
                  id="liveDemo"
                  value={formData.liveDemo || ""}
                  onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
                  placeholder="https://your-demo.vercel.app"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <div>
              <Label htmlFor="mainImage">Main Image</Label>
              <Input
                id="mainImage"
                value={formData.image || ""}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/placeholder.svg?height=400&width=600"
                required
              />
            </div>
            
            <div>
              <Label>Additional Images (Gallery)</Label>
              {(formData.images || []).map((image, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    placeholder="Image URL"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => removeImage(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addImage} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addArrayItem("tags", newTag))}
              />
              <Button type="button" variant="outline" onClick={() => addArrayItem("tags", newTag)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.tags || []).map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("tags", index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Technologies</h3>
            {techCategories.map((category) => (
              <div key={category} className="space-y-2">
                <Label className="capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder={`Add ${category} technology`}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTechItem(category, (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={(e) => {
                      const input = (e.currentTarget.previousElementSibling as HTMLInputElement)
                      addTechItem(category, input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(formData.technologies?.[category as keyof typeof formData.technologies] || []).map((tech, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tech}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechItem(category, index)} />
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a key feature"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addArrayItem("features", newFeature))}
              />
              <Button type="button" variant="outline" onClick={() => addArrayItem("features", newFeature)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {(formData.features || []).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1">{feature}</span>
                  <X className="h-4 w-4 cursor-pointer" onClick={() => removeArrayItem("features", index)} />
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Challenges Faced</h3>
            <div className="flex gap-2">
              <Input
                value={newChallenge}
                onChange={(e) => setNewChallenge(e.target.value)}
                placeholder="Add a challenge"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addArrayItem("challenges", newChallenge))}
              />
              <Button type="button" variant="outline" onClick={() => addArrayItem("challenges", newChallenge)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {(formData.challenges || []).map((challenge, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1">{challenge}</span>
                  <X className="h-4 w-4 cursor-pointer" onClick={() => removeArrayItem("challenges", index)} />
                </div>
              ))}
            </div>
          </div>

          {/* Learnings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Learnings</h3>
            <div className="flex gap-2">
              <Input
                value={newLearning}
                onChange={(e) => setNewLearning(e.target.value)}
                placeholder="Add a learning"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addArrayItem("learnings", newLearning))}
              />
              <Button type="button" variant="outline" onClick={() => addArrayItem("learnings", newLearning)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {(formData.learnings || []).map((learning, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1">{learning}</span>
                  <X className="h-4 w-4 cursor-pointer" onClick={() => removeArrayItem("learnings", index)} />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t">
            <Button type="submit" className="flex-1">
              {isEditing ? "Update Project" : "Create Project"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
