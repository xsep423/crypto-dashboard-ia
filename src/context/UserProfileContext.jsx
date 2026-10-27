import { createContext, useContext, useState, useEffect } from 'react'

const UserProfileContext = createContext(null)

const STORAGE_KEY = 'crypto-dashboard-user-profile'

// Estructura por defecto si es la primera vez que el usuario entra
const DEFAULT_PROFILE = {
  nivel: 'intermedio', // 'principiante' | 'intermedio' | 'avanzado' — elegido manualmente
  visitas: {
    mercado: 0,
    'sentimiento-ia': 0,
    personalizacion: 0,
    'asistente-ia': 0,
  },
}

/**
 * UserProfileProvider
 * Maneja el perfil de personalización del usuario:
 * - nivel: elegido manualmente (afecta cuánta info técnica se muestra)
 * - visitas: contador automático por sección (afecta el orden del sidebar)
 * Todo se guarda en localStorage para persistir entre sesiones.
 */
export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE
  })

  // Cada vez que el perfil cambia, lo guardamos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  // Cambia el nivel elegido manualmente por el usuario
  function setNivel(nuevoNivel) {
    setProfile((prev) => ({ ...prev, nivel: nuevoNivel }))
  }

  // Incrementa el contador de visitas de una sección (rastreo automático)
  function registrarVisita(seccion) {
    setProfile((prev) => ({
      ...prev,
      visitas: {
        ...prev.visitas,
        [seccion]: (prev.visitas[seccion] || 0) + 1,
      },
    }))
  }

  return (
    <UserProfileContext.Provider value={{ profile, setNivel, registrarVisita }}>
      {children}
    </UserProfileContext.Provider>
  )
}

/**
 * useUserProfile
 * Hook para acceder al perfil de personalización desde cualquier componente.
 */
export function useUserProfile() {
  const context = useContext(UserProfileContext)
  if (!context) {
    throw new Error('useUserProfile debe usarse dentro de UserProfileProvider')
  }
  return context
}