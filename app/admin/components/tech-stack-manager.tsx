"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, Save, X } from "lucide-react"

interface Technology {
  name: string
  icon: string
}

interface TechCategory {
  category: string
  technologies: Technology[]
}

interface TechStackManagerProps {
  techStack: TechCategory[]
  onSave: (techStack: TechCategory[]) => void
}

export default function TechStackManager({ techStack, onSave }: TechStackManagerProps) {
  const [categories, setCategories] = useState<TechCategory[]>(techStack)
  const [editingCategory, setEditingCategory] = useState<number | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newTechName, setNewTechName] = useState("")
  const [newTechIcon, setNewTechIcon] = useState("")

  const addCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([...categories, { category: newCategoryName.trim(), technologies: [] }])
      setNewCategoryName("")
    }
  }

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const updateCategoryName = (index: number, newName: string) => {
    const newCategories = [...categories]
    newCategories[index].category = newName
    setCategories(newCategories)
    setEditingCategory(null)
  }

  const addTechnology = (categoryIndex: number) => {
    if (newTechName.trim()) {
      const newCategories = [...categories]
      newCategories[categoryIndex].technologies.push({
        name: newTechName.trim(),
        icon: newTechIcon.trim() || "⚡",
      })
      setCategories(newCategories)
      setNewTechName("")
      setNewTechIcon("")
    }
  }

  const removeTechnology = (categoryIndex: number, techIndex: number) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].technologies = newCategories[categoryIndex].technologies.filter(
      (_, i) => i !== techIndex,
    )
    setCategories(newCategories)
  }

  const handleSave = () => {
    onSave(categories)
  }

  return (
    <div className="space-y-6">
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
            <Button onClick={addCategory}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardContent>
      </Card>

      {categories.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {editingCategory === categoryIndex ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={category.category}
                      onChange={(e) => {
                        const newCategories = [...categories]
                        newCategories[categoryIndex].category = e.target.value
                        setCategories(newCategories)
                      }}
                      className="w-48"
                    />
                    <Button size="sm" onClick={() => setEditingCategory(null)}>
                      <Save className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <CardTitle>{category.category}</CardTitle>
                    <Button size="sm" variant="outline" onClick={() => setEditingCategory(categoryIndex)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
              <Button size="sm" variant="destructive" onClick={() => removeCategory(categoryIndex)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>Manage technologies in the {category.category} category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {category.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="secondary" className="flex items-center gap-1">
                  <span>{tech.icon}</span>
                  <span>{tech.name}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive ml-1"
                    onClick={() => removeTechnology(categoryIndex, techIndex)}
                  />
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newTechName}
                onChange={(e) => setNewTechName(e.target.value)}
                placeholder="Technology name (e.g., React)"
                className="flex-1"
              />
              <Input
                value={newTechIcon}
                onChange={(e) => setNewTechIcon(e.target.value)}
                placeholder="Icon (emoji or text)"
                className="w-24"
              />
              <Button onClick={() => addTechnology(categoryIndex)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>
  )
}
