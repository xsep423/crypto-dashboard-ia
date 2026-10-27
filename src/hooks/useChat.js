import { useState } from 'react'
import { sendChatMessage } from '../services/api/chatApi'

/**
 * useChat
 * Maneja el estado de la conversación con el asistente:
 * historial de mensajes, envío, carga y errores.
 */
export function useChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de CryptoDashboard IA. Puedo ayudarte a entender conceptos de criptomonedas o a interpretar los datos del dashboard. ¿En qué te ayudo?',
    },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function sendMessage(texto) {
    if (!texto.trim()) return

    const nuevoMensajeUsuario = { role: 'user', content: texto }
    const historialActualizado = [...messages, nuevoMensajeUsuario]

    setMessages(historialActualizado)
    setLoading(true)
    setError(null)

    try {
      // Mandamos solo role+content al backend (sin ids ni otros campos extra)
      const historialParaAPI = historialActualizado.map(({ role, content }) => ({ role, content }))
      const respuesta = await sendChatMessage(historialParaAPI)

      setMessages((prev) => [...prev, { role: 'assistant', content: respuesta }])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, error, sendMessage }
}