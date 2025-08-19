// "use server" - Commented out for static export

export async function submitContactForm(formData: FormData) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // For static export, we'll handle this client-side
  console.log("Form submission:", { name, email, message })

  return {
    message: "Thanks for your message! Contact form is for demo purposes only.",
  }
}
