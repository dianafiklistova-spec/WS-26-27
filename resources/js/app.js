import Alpine from 'alpinejs'

Alpine.data('alert', function () {
  return {
    isVisible: false,
    dismiss() {
      this.isVisible = false
    },
    init() {
      setTimeout(() => {
        this.isVisible = true
      }, 80)
      setTimeout(() => {
        this.dismiss()
      }, 5000)
    },
  }
})

Alpine.data('themeToggle', function () {
  return {
    theme: 'light',
    init() {
      this.theme = this.$el.dataset.initialTheme || 'light'
    },
    toggle() {
      const next = this.theme === 'dark' ? 'light' : 'dark'
      this.theme = next
      document.documentElement.setAttribute('data-theme', next)
      document.cookie = `app_theme=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
    },
  }
})

Alpine.start()


// ===== Mobiles Hamburger-Menü =====

// Header und Menü-Button auswählen
const mobileHeader = document.querySelector('.header--bar')
const menuToggle = document.querySelector('#header-menu-toggle')
const menuIcon = document.querySelector('#header-menu-icon')

// Prüfen, ob das Menü auf der Seite vorhanden ist
if (mobileHeader && menuToggle && menuIcon) {

  // Menü öffnen oder schließen
  menuToggle.addEventListener('click', function () {
    const isOpen = mobileHeader.classList.toggle('is-open')

    // Zustand für Screenreader aktualisieren
    menuToggle.setAttribute('aria-expanded', String(isOpen))

    if (isOpen) {
      menuIcon.textContent = '✕'
      menuToggle.setAttribute('aria-label', 'Menü schließen')
    } else {
      menuIcon.textContent = '☰'
      menuToggle.setAttribute('aria-label', 'Menü öffnen')
    }
  })

  // Menü mit der Escape-Taste schließen
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileHeader.classList.contains('is-open')) {
      menuToggle.click()
      menuToggle.focus()
    }
  })
}