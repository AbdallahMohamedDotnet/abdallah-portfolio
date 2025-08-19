"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { submitContactForm } from "../actions"

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      const response = await submitContactForm(formData)
      setMessage(response.message)
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="p-6 hover-lift active-bg animate-slide-up">
      <form action={handleSubmit} className="space-y-4">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <Input
            id="name"
            name="name"
            required
            className="transition-all duration-300 focus:scale-105 focus:shadow-lg active-bg"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="transition-all duration-300 focus:scale-105 focus:shadow-lg active-bg"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            required
            className="transition-all duration-300 focus:scale-105 focus:shadow-lg active-bg"
          />
        </div>
        <Button
          type="submit"
          className="w-full hover-lift animate-glow animate-bounce-in"
          disabled={pending}
          style={{ animationDelay: "0.4s" }}
        >
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && <p className="text-sm text-center mt-4 text-muted-foreground animate-fade-in">{message}</p>}
      </form>
    </Card>
  )
}
