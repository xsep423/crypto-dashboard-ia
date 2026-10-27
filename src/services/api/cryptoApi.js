/**
 * cryptoApi.js
 * Servicio para consumir la API pública de CoinGecko.
 * Documentación: https://www.coingecko.com/en/api/documentation
 */

const BASE_URL = 'https://api.coingecko.com/api/v3'

/**
 * Obtiene los datos de mercado de las criptomonedas top por capitalización.
 * @param {number} limit - Cantidad de monedas a traer (default 10)
 * @returns {Promise<Array>} Lista de monedas con precio, cambio 24h, etc.
 */
export async function getTopCoins(limit = 10) {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error al obtener datos del mercado: ${response.status}`)
  }

  

  return response.json()
}

/**
 * Obtiene el historial de precios de una moneda específica.
 * @param {string} coinId - ID de la moneda en CoinGecko (ej. 'bitcoin')
 * @param {number} days - Cantidad de días hacia atrás (ej. 7)
 * @returns {Promise<Array>} Arreglo de [timestamp, precio]
 */
export async function getCoinHistory(coinId, days = 7) {
  const url = `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error al obtener historial: ${response.status}`)
  }

  const data = await response.json()
  return data.prices // formato: [[timestamp, precio], [timestamp, precio], ...]
}