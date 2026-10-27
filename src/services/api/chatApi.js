/**
 * chatApi.js
 * Servicio para consumir el endpoint de chat de nuestro backend.
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

/**
 * Envía el historial de conversación y obtiene la respuesta del asistente.
 * @param {Array} messages - Historial [{ role: 'user'|'assistant', content: string }]
 * @returns {Promise<string>} Respuesta del asistente
 */
export async function sendChatMessage(messages) {
  const response = await fetch(`${BACKEND_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  if (!response.ok) {
    throw new Error(`Error al comunicarse con el asistente: ${response.status}`)
  }

  const data = await response.json()
  return data.respuesta
}