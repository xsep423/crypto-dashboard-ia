import { useState, useEffect } from 'react'
import { getTopCoins } from '../services/api/cryptoApi'

/**
 * useCryptoMarket
 * Hook que trae y maneja el estado de los datos del mercado cripto.
 * Encapsula loading, error y data para reutilizarlo en cualquier componente.
 */
export function useCryptoMarket(limit = 10) {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true // evita actualizar estado si el componente ya se desmontó

    async function fetchData() {
      try {
        setLoading(true)
        const data = await getTopCoins(limit)
        if (isMounted) {
          setCoins(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [limit])

  return { coins, loading, error }
}