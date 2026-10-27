import { useState, useEffect } from 'react'
import { getMarketSentiment } from '../services/api/sentimentApi'

/**
 * useMarketSentiment
 * Trae y maneja el estado del análisis de sentimiento del mercado.
 */
export function useMarketSentiment() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchSentiment() {
      try {
        setLoading(true)
        const result = await getMarketSentiment()
        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchSentiment()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, loading, error }
}