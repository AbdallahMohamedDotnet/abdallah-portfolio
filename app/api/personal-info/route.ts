import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = 'force-static'
export const revalidate = false

const dataPath = path.join(process.cwd(), "data", "personal-info.json")

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

function readPersonalInfo(): PersonalInfo {
  try {
    const fileContents = fs.readFileSync(dataPath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading personal info:", error)
    // Return default structure if file doesn't exist
    return {
      name: "",
      title: "",
      description: "",
      email: "",
      socialLinks: { github: "", linkedin: "", twitter: "" },
      navigation: [],
      footer: { copyright: "", links: [] },
    }
  }
}

function writePersonalInfo(data: PersonalInfo): void {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("Error writing personal info:", error)
    throw new Error("Failed to save personal info")
  }
}

// GET - Fetch personal information
export async function GET() {
  try {
    const data = readPersonalInfo()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch personal info" }, { status: 500 })
  }
}

// PUT - Update personal information
export async function PUT(request: NextRequest) {
  try {
    const updatedInfo: PersonalInfo = await request.json()

    // Validate required fields
    if (!updatedInfo.name || !updatedInfo.title || !updatedInfo.email) {
      return NextResponse.json(
        {
          error: "Name, title, and email are required",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(updatedInfo.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    writePersonalInfo(updatedInfo)
    return NextResponse.json(updatedInfo)
  } catch (error) {
    console.error("Error updating personal info:", error)
    return NextResponse.json({ error: "Failed to update personal info" }, { status: 500 })
  }
}
