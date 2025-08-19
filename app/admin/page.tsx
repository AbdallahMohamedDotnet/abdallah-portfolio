"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Edit, Plus, Save, X, ExternalLink, LinkIcon, Globe, Settings, Key, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ProjectForm from "./components/project-form"

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

interface PersonalInfo {
  name: string
  title: string
  description: string
  email: string
  profileImage: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
  }
  navigation: Array<{ name: string; href: string }>
  footer: {
    copyright: string
    links: Array<{ name: string; href: string }>
  }
}

interface TechCategory {
  category: string
  technologies: Array<{ name: string; icon: string }>
}

interface LinkItem {
  id: number
  title: string
  url: string
  description?: string
  category: string
  isActive: boolean
  createdAt: string
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [techStack, setTechStack] = useState<TechCategory[]>([])
  const [links, setLinks] = useState<LinkItem[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingPersonal, setEditingPersonal] = useState(false)
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null)
  const [newProject, setNewProject] = useState<Partial<Project>>({
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
  })
  const [newLink, setNewLink] = useState<Partial<LinkItem>>({})
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  // Tech Stack editing state
  const [editingCategory, setEditingCategory] = useState<number | null>(null)
  const [editingTech, setEditingTech] = useState<{ categoryIndex: number; techIndex: number } | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newTechName, setNewTechName] = useState("")
  const [newTechIcon, setNewTechIcon] = useState("")
  // Image upload state
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUploadError, setImageUploadError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/login")
      return
    }
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [projectsRes, personalRes, techRes, linksRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/personal-info"),
        fetch("/api/tech-stack"),
        fetch("/api/links"),
      ])

      if (projectsRes.ok) setProjects(await projectsRes.json())
      if (personalRes.ok) setPersonalInfo(await personalRes.json())
      if (techRes.ok) setTechStack(await techRes.json())
      if (linksRes.ok) setLinks(await linksRes.json())
    } catch (error) {
      console.error("Failed to load data:", error)
    }
  }

  const handleDeleteProject = async (id: number) => {
    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete project:", error)
    }
  }

  const handleSaveProject = async (project: Project) => {
    try {
      if (editingProject) {
        // Update existing project
        const response = await fetch(`/api/projects/${project.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(project),
        })

        if (response.ok) {
          const updatedProject = await response.json()
          setProjects(projects.map((p) => (p.id === project.id ? updatedProject : p)))
          setEditingProject(null)
        }
      } else {
        // Add new project
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(project),
        })

        if (response.ok) {
          const createdProject = await response.json()
          setProjects([...projects, createdProject])
          setShowProjectForm(false)
        }
      }
    } catch (error) {
      console.error("Failed to save project:", error)
    }
  }

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) return

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProject,
          id: Date.now(),
          tags: newProject.tags || [],
        }),
      })

      if (response.ok) {
        const createdProject = await response.json()
        setProjects([...projects, createdProject])
        setNewProject({
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
        })
      }
    } catch (error) {
      console.error("Failed to add project:", error)
    }
  }

  const handleSavePersonalInfo = async () => {
    if (!personalInfo) return

    try {
      const response = await fetch("/api/personal-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personalInfo),
      })

      if (response.ok) {
        setEditingPersonal(false)
      }
    } catch (error) {
      console.error("Failed to save personal info:", error)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !personalInfo) return

    setUploadingImage(true)
    setImageUploadError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setPersonalInfo({ ...personalInfo, profileImage: data.url })
      } else {
        const errorData = await response.json()
        setImageUploadError(errorData.error || "Failed to upload image")
      }
    } catch (error) {
      setImageUploadError("Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleAddLink = async () => {
    if (!newLink.title || !newLink.url || !newLink.category) return

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newLink,
          isActive: newLink.isActive !== undefined ? newLink.isActive : true,
        }),
      })

      if (response.ok) {
        const createdLink = await response.json()
        setLinks([...links, createdLink])
        setNewLink({})
      }
    } catch (error) {
      console.error("Failed to add link:", error)
    }
  }

  const handleUpdateLink = async (link: LinkItem) => {
    try {
      const response = await fetch(`/api/links/${link.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(link),
      })

      if (response.ok) {
        const updatedLink = await response.json()
        setLinks(links.map((l) => (l.id === link.id ? updatedLink : l)))
        setEditingLink(null)
      }
    } catch (error) {
      console.error("Failed to update link:", error)
    }
  }

  const handleDeleteLink = async (id: number) => {
    try {
      const response = await fetch(`/api/links/${id}`, { method: "DELETE" })
      if (response.ok) {
        setLinks(links.filter((l) => l.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete link:", error)
    }
  }

  const toggleLinkStatus = async (link: LinkItem) => {
    const updatedLink = { ...link, isActive: !link.isActive }
    await handleUpdateLink(updatedLink)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match")
      return
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (response.ok) {
        setPasswordSuccess("Password changed successfully")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        const errorData = await response.json()
        setPasswordError(errorData.message || "Failed to change password")
      }
    } catch (error) {
      setPasswordError("Failed to change password")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/login")
  }

  // Tech Stack Management Functions
  const handleSaveTechStack = async (updatedTechStack: TechCategory[]) => {
    try {
      const response = await fetch("/api/tech-stack", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTechStack),
      })

      if (response.ok) {
        setTechStack(updatedTechStack)
      }
    } catch (error) {
      console.error("Failed to save tech stack:", error)
    }
  }

  const addTechCategory = (categoryName: string) => {
    const newCategory: TechCategory = {
      category: categoryName,
      technologies: []
    }
    const updatedTechStack = [...techStack, newCategory]
    handleSaveTechStack(updatedTechStack)
  }

  const updateCategoryName = (categoryIndex: number, newName: string) => {
    const updatedTechStack = [...techStack]
    updatedTechStack[categoryIndex].category = newName
    handleSaveTechStack(updatedTechStack)
  }

  const deleteTechCategory = (categoryIndex: number) => {
    const updatedTechStack = techStack.filter((_, index) => index !== categoryIndex)
    handleSaveTechStack(updatedTechStack)
  }

  const addTechnology = (categoryIndex: number, techName: string, techIcon: string = "⚡") => {
    const updatedTechStack = [...techStack]
    updatedTechStack[categoryIndex].technologies.push({
      name: techName,
      icon: techIcon
    })
    handleSaveTechStack(updatedTechStack)
  }

  const updateTechnology = (categoryIndex: number, techIndex: number, techName: string, techIcon: string) => {
    const updatedTechStack = [...techStack]
    updatedTechStack[categoryIndex].technologies[techIndex] = {
      name: techName,
      icon: techIcon
    }
    handleSaveTechStack(updatedTechStack)
  }

  const deleteTechnology = (categoryIndex: number, techIndex: number) => {
    const updatedTechStack = [...techStack]
    updatedTechStack[categoryIndex].technologies = updatedTechStack[categoryIndex].technologies.filter(
      (_, index) => index !== techIndex
    )
    handleSaveTechStack(updatedTechStack)
  }

  const linkCategories = Array.from(new Set(links.map((link) => link.category)))
  const activeLinks = links.filter((link) => link.isActive)
  const inactiveLinks = links.filter((link) => !link.isActive)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio content and settings</p>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
            <TabsTrigger value="links">URL Links</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            {showProjectForm || editingProject ? (
              <ProjectForm
                project={editingProject || undefined}
                onSave={handleSaveProject}
                onCancel={() => {
                  setShowProjectForm(false)
                  setEditingProject(null)
                }}
                isEditing={!!editingProject}
              />
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Projects</h2>
                    <p className="text-muted-foreground">Manage your portfolio projects</p>
                  </div>
                  <Button onClick={() => setShowProjectForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Project
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <Card key={project.id} className="relative">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{project.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setEditingProject(project)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{project.shortDescription || project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline">+{project.tags.length - 3} more</Badge>
                          )}
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                          <span>Status: <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge></span>
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex gap-2">
                          {project.link && (
                            <Link href={project.link} target="_blank" className="text-sm text-blue-600 hover:underline">
                              GitHub →
                            </Link>
                          )}
                          {project.liveDemo && (
                            <Link href={project.liveDemo} target="_blank" className="text-sm text-green-600 hover:underline">
                              Live Demo →
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {projects.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground mb-4">No projects found</p>
                      <Button onClick={() => setShowProjectForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Project
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            {personalInfo && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details and social links</CardDescription>
                    </div>
                    {!editingPersonal ? (
                      <Button onClick={() => setEditingPersonal(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSavePersonalInfo}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditingPersonal(false)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingPersonal ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={personalInfo.name}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={personalInfo.title}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={personalInfo.description}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, description: e.target.value })}
                        />
                      </div>
                      <div className="space-y-4">
                        <Label>Profile Image</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                            <img
                              src={personalInfo.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              disabled={uploadingImage}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50"
                            />
                            {uploadingImage && (
                              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                            )}
                            {imageUploadError && (
                              <p className="text-sm text-red-500 mt-1">{imageUploadError}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="github">GitHub URL</Label>
                          <Input
                            id="github"
                            value={personalInfo.socialLinks.github}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                socialLinks: { ...personalInfo.socialLinks, github: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn URL</Label>
                          <Input
                            id="linkedin"
                            value={personalInfo.socialLinks.linkedin}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                socialLinks: { ...personalInfo.socialLinks, linkedin: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="twitter">Twitter URL</Label>
                          <Input
                            id="twitter"
                            value={personalInfo.socialLinks.twitter}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                socialLinks: { ...personalInfo.socialLinks, twitter: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Name</Label>
                          <p className="text-sm text-muted-foreground">{personalInfo.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Email</Label>
                          <p className="text-sm text-muted-foreground">{personalInfo.email}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Title</Label>
                        <p className="text-sm text-muted-foreground">{personalInfo.title}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Description</Label>
                        <p className="text-sm text-muted-foreground">{personalInfo.description}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tech" className="space-y-6">
            {/* Add New Category Card */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Category</CardTitle>
                <CardDescription>Create a new technology category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category name (e.g., Frontend, Backend)"
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => {
                      if (newCategoryName.trim()) {
                        addTechCategory(newCategoryName.trim())
                        setNewCategoryName("")
                      }
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Existing Categories */}
            {techStack.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {editingCategory === categoryIndex ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={category.category}
                          onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => setEditingCategory(null)}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingCategory(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <CardTitle>{category.category}</CardTitle>
                          <CardDescription>{category.technologies.length} technologies</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingCategory(categoryIndex)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteTechCategory(categoryIndex)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Add new technology to this category */}
                    <div className="flex gap-2">
                      <Input
                        value={newTechName}
                        onChange={(e) => setNewTechName(e.target.value)}
                        placeholder="Technology name (e.g., Node.js)"
                        className="flex-1"
                      />
                      <Input
                        value={newTechIcon}
                        onChange={(e) => setNewTechIcon(e.target.value)}
                        placeholder="Icon (e.g., 🟢)"
                        className="w-20"
                      />
                      <Button
                        onClick={() => {
                          if (newTechName.trim()) {
                            addTechnology(categoryIndex, newTechName.trim(), newTechIcon.trim() || "⚡")
                            setNewTechName("")
                            setNewTechIcon("")
                          }
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Tech
                      </Button>
                    </div>

                    {/* Existing technologies */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {category.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center justify-between p-2 border rounded">
                          {editingTech?.categoryIndex === categoryIndex && editingTech?.techIndex === techIndex ? (
                            <div className="flex items-center gap-2 flex-1">
                              <Input
                                value={tech.icon}
                                onChange={(e) => updateTechnology(categoryIndex, techIndex, tech.name, e.target.value)}
                                className="w-16"
                              />
                              <Input
                                value={tech.name}
                                onChange={(e) => updateTechnology(categoryIndex, techIndex, e.target.value, tech.icon)}
                                className="flex-1"
                              />
                              <Button
                                size="sm"
                                onClick={() => setEditingTech(null)}
                              >
                                <Save className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{tech.icon}</span>
                                <span className="text-sm">{tech.name}</span>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingTech({ categoryIndex, techIndex })}
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteTechnology(categoryIndex, techIndex)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="links" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Link</CardTitle>
                <CardDescription>Create a new URL link for your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkTitle">Link Title</Label>
                    <Input
                      id="linkTitle"
                      value={newLink.title || ""}
                      onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                      placeholder="My Portfolio"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkUrl">URL</Label>
                    <Input
                      id="linkUrl"
                      value={newLink.url || ""}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="linkDescription">Description (Optional)</Label>
                  <Textarea
                    id="linkDescription"
                    value={newLink.description || ""}
                    onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                    placeholder="Brief description of this link"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkCategory">Category</Label>
                    <Select
                      value={newLink.category || ""}
                      onValueChange={(value) => setNewLink({ ...newLink, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select or type category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Social">Social</SelectItem>
                        <SelectItem value="Content">Content</SelectItem>
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        {linkCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="linkActive"
                      checked={newLink.isActive !== false}
                      onCheckedChange={(checked) => setNewLink({ ...newLink, isActive: checked })}
                    />
                    <Label htmlFor="linkActive">Active</Label>
                  </div>
                </div>
                <Button onClick={handleAddLink} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    Active Links ({activeLinks.length})
                  </CardTitle>
                  <CardDescription>Currently visible links on your portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeLinks.map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <LinkIcon className="w-4 h-4" />
                          <h4 className="font-medium">{link.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {link.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                        {link.description && <p className="text-xs text-muted-foreground mt-1">{link.description}</p>}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => setEditingLink(link)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleLinkStatus(link)}>
                          <X className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteLink(link.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {activeLinks.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No active links</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <X className="w-5 h-5 text-gray-400" />
                    Inactive Links ({inactiveLinks.length})
                  </CardTitle>
                  <CardDescription>Hidden links that can be reactivated</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inactiveLinks.map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg opacity-60">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <LinkIcon className="w-4 h-4" />
                          <h4 className="font-medium">{link.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {link.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => toggleLinkStatus(link)}>
                          <Globe className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteLink(link.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {inactiveLinks.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No inactive links</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Change Password
                  </CardTitle>
                  <CardDescription>Update your admin password for security</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    {passwordError && (
                      <Alert variant="destructive">
                        <AlertDescription>{passwordError}</AlertDescription>
                      </Alert>
                    )}

                    {passwordSuccess && (
                      <Alert>
                        <AlertDescription>{passwordSuccess}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full">
                      <Key className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    System Settings
                  </CardTitle>
                  <CardDescription>Configure system preferences and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sound Effects</Label>
                      <p className="text-sm text-muted-foreground">Enable hover and click sounds</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-save</Label>
                      <p className="text-sm text-muted-foreground">Automatically save changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
