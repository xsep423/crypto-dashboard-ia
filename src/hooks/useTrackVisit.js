import { useEffect } from 'react'
import { useUserProfile } from '../context/UserProfileContext'

/**
 * useTrackVisit
 * Se coloca en cada página — registra automáticamente una visita
 * a esa sección cada vez que el componente se monta.
 * @param {string} seccion - Identificador de la sección, ej. 'mercado'
 */
export function useTrackVisit(seccion) {
  const { registrarVisita } = useUserProfile()

  useEffect(() => {
    registrarVisita(seccion)
    // Solo queremos que se dispare al entrar a la página, no en cada render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seccion])
}