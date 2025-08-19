"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Save, Plus, Trash2 } from "lucide-react"

interface PersonalInfo {
  name: string
  title: string
  description: string
  email: string
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

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo
  onSave: (info: PersonalInfo) => void
  onCancel: () => void
}

export default function PersonalInfoForm({ personalInfo, onSave, onCancel }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo)

  const handleSave = () => {
    onSave(formData)
  }

  const addNavigationItem = () => {
    setFormData({
      ...formData,
      navigation: [...formData.navigation, { name: "", href: "" }],
    })
  }

  const updateNavigationItem = (index: number, field: "name" | "href", value: string) => {
    const newNavigation = [...formData.navigation]
    newNavigation[index][field] = value
    setFormData({ ...formData, navigation: newNavigation })
  }

  const removeNavigationItem = (index: number) => {
    setFormData({
      ...formData,
      navigation: formData.navigation.filter((_, i) => i !== index),
    })
  }

  const addFooterLink = () => {
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        links: [...formData.footer.links, { name: "", href: "" }],
      },
    })
  }

  const updateFooterLink = (index: number, field: "name" | "href", value: string) => {
    const newLinks = [...formData.footer.links]
    newLinks[index][field] = value
    setFormData({
      ...formData,
      footer: { ...formData.footer, links: newLinks },
    })
  }

  const removeFooterLink = (index: number) => {
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        links: formData.footer.links.filter((_, i) => i !== index),
      },
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your personal details and bio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          <div>
            <Label htmlFor="description">Bio Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell visitors about yourself..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Update your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="github">GitHub Profile</Label>
            <Input
              id="github"
              value={formData.socialLinks.github}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, github: e.target.value },
                })
              }
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={formData.socialLinks.linkedin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                })
              }
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <Label htmlFor="twitter">Twitter Profile</Label>
            <Input
              id="twitter"
              value={formData.socialLinks.twitter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                })
              }
              placeholder="https://twitter.com/username"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Navigation Menu</CardTitle>
              <CardDescription>Manage your site navigation links</CardDescription>
            </div>
            <Button onClick={addNavigationItem} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.navigation.map((item, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Link Name</Label>
                <Input
                  value={item.name}
                  onChange={(e) => updateNavigationItem(index, "name", e.target.value)}
                  placeholder="About"
                />
              </div>
              <div className="flex-1">
                <Label>Link URL</Label>
                <Input
                  value={item.href}
                  onChange={(e) => updateNavigationItem(index, "href", e.target.value)}
                  placeholder="#about"
                />
              </div>
              <Button variant="destructive" size="sm" onClick={() => removeNavigationItem(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Footer Settings</CardTitle>
          <CardDescription>Update footer copyright and links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="copyright">Copyright Text</Label>
            <Input
              id="copyright"
              value={formData.footer.copyright}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  footer: { ...formData.footer, copyright: e.target.value },
                })
              }
              placeholder="© 2024 Your Name. All rights reserved."
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Label>Footer Links</Label>
            <Button onClick={addFooterLink} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>

          {formData.footer.links.map((link, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Link Name</Label>
                <Input
                  value={link.name}
                  onChange={(e) => updateFooterLink(index, "name", e.target.value)}
                  placeholder="Privacy Policy"
                />
              </div>
              <div className="flex-1">
                <Label>Link URL</Label>
                <Input
                  value={link.href}
                  onChange={(e) => updateFooterLink(index, "href", e.target.value)}
                  placeholder="/privacy"
                />
              </div>
              <Button variant="destructive" size="sm" onClick={() => removeFooterLink(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
