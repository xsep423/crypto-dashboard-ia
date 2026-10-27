/**
 * sentimentApi.js
 * Servicio para consumir nuestro propio backend (Node/Express),
 * que a su vez combina noticias RSS + análisis de IA (Groq).
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

/**
 * Obtiene el análisis de sentimiento del mercado cripto.
 * @returns {Promise<Object>} { sentimiento, confianza, resumen, noticias }
 */
export async function getMarketSentiment() {
  const response = await fetch(`${BACKEND_URL}/api/sentiment`)

  if (!response.ok) {
    throw new Error(`Error al obtener el análisis de sentimiento: ${response.status}`)
  }

  return response.json()
}