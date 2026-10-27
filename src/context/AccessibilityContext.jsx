import { createContext, useContext, useState, useEffect } from 'react'

const AccessibilityContext = createContext(null)

const STORAGE_KEY = 'crypto-dashboard-accessibility'

const DEFAULT_SETTINGS = {
  altoContraste: false,
  tamañoTexto: 'normal', // 'normal' | 'grande' | 'muy-grande'
}

/**
 * AccessibilityProvider
 * Maneja las preferencias de accesibilidad visual del usuario:
 * alto contraste y tamaño de texto. Se aplican como clases en el <html>
 * para que Tailwind pueda reaccionar globalmente, y se guardan en localStorage.
 */
export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS
  })

  // Guarda cambios y aplica clases globales al <html>
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))

    const html = document.documentElement

    html.classList.toggle('alto-contraste', settings.altoContraste)

    html.classList.remove('texto-normal', 'texto-grande', 'texto-muy-grande')
    html.classList.add(`texto-${settings.tamañoTexto}`)
  }, [settings])

  function toggleAltoContraste() {
    setSettings((prev) => ({ ...prev, altoContraste: !prev.altoContraste }))
  }

  function setTamañoTexto(tamaño) {
    setSettings((prev) => ({ ...prev, tamañoTexto: tamaño }))
  }

  return (
    <AccessibilityContext.Provider value={{ settings, toggleAltoContraste, setTamañoTexto }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility debe usarse dentro de AccessibilityProvider')
  }
  return context
}