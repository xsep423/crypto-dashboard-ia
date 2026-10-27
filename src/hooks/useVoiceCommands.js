import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Mapeo de frases clave → rutas del dashboard
const COMANDOS = [
  { frases: ['ir a mercado', 'mostrar mercado', 'ver mercado'], ruta: '/' },
  { frases: ['ir a sentimiento', 'mostrar sentimiento', 'ver sentimiento'], ruta: '/sentimiento-ia' },
  { frases: ['ir a personalizacion', 'ir a personalización', 'mostrar personalizacion'], ruta: '/personalizacion' },
  { frases: ['ir a asistente', 'mostrar asistente', 'ver asistente'], ruta: '/asistente-ia' },
]

/**
 * useVoiceCommands
 * Escucha comandos de voz usando la Web Speech API (reconocimiento)
 * y navega automáticamente cuando detecta una frase conocida.
 */
export function useVoiceCommands() {
  const [escuchando, setEscuchando] = useState(false)
  const [ultimoTexto, setUltimoTexto] = useState('')
  const [soportado, setSoportado] = useState(true)
  const recognitionRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setSoportado(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'es-MX'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setEscuchando(true)
    recognition.onend = () => setEscuchando(false)
    recognition.onerror = () => setEscuchando(false)

    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript.toLowerCase().trim()
      setUltimoTexto(texto)

      // Buscamos si el texto reconocido coincide con algún comando conocido
      const comando = COMANDOS.find((c) =>
        c.frases.some((frase) => texto.includes(frase))
      )

      if (comando) {
        navigate(comando.ruta)
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.abort()
    }
  }, [navigate])

  const escuchar = useCallback(() => {
    recognitionRef.current?.start()
  }, [])

  return { escuchar, escuchando, ultimoTexto, soportado }
}