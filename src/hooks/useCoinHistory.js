import { useState, useEffect } from 'react'
import { getCoinHistory } from '../services/api/cryptoApi'

/**
 * useCoinHistory
 * Trae el historial de precios de una moneda específica.
 */
export function useCoinHistory(coinId, days = 7) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchHistory() {
      try {
        setLoading(true)
        const data = await getCoinHistory(coinId, days)
        if (isMounted) {
          setHistory(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (coinId) fetchHistory()

    return () => {
      isMounted = false
    }
  }, [coinId, days])

  return { history, loading, error }
}