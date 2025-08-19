// Sound effect manager
class SoundManager {
  constructor() {
    this.sounds = {
      hover: new Audio("/sounds/hover.mp3"),
      click: new Audio("/sounds/click.mp3"),
    }

    // Set volume levels
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = 0.3
    })

    this.init()
  }

  init() {
    // Add hover sound to buttons
    document.addEventListener("mouseover", (e) => {
      if (e.target.matches("button, .sound-button, .clickable")) {
        this.play("hover")
      }
    })

    // Add click sound to buttons
    document.addEventListener("click", (e) => {
      if (e.target.matches("button, .sound-button, .clickable")) {
        this.play("click")
      }
    })
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0
      this.sounds[soundName].play().catch(() => {
        // Ignore autoplay restrictions
      })
    }
  }
}

// Initialize when DOM is loaded
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    new SoundManager()
  })
}
