import { useState, useEffect, useRef } from 'react'

/**
 * useLivePrice
 * Se conecta al WebSocket público de Binance para recibir el precio
 * de un par en tiempo real (sin necesidad de API key).
 * Docs: https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams
 *
 * @param {string} symbol - Par de Binance en minúsculas, ej. 'btcusdt'
 */
export function useLivePrice(symbol = 'btcusdt') {
  const [price, setPrice] = useState(null)
  const [priceChangePercent, setPriceChangePercent] = useState(null)
  const [connected, setConnected] = useState(false)
  const wsRef = useRef(null)

  useEffect(() => {
    // Stream "ticker" de Binance: transmite precio, cambio 24h, etc.
    // varias veces por segundo mientras la conexión esté abierta.
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@ticker`
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      setConnected(true)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      // 'c' = precio actual (close price), 'P' = % de cambio en 24h
      setPrice(parseFloat(data.c))
      setPriceChangePercent(parseFloat(data.P))
    }

    ws.onerror = () => {
      setConnected(false)
    }

    ws.onclose = () => {
      setConnected(false)
    }

    // Cierra la conexión al desmontar el componente o cambiar de symbol
    return () => {
      ws.close()
    }
  }, [symbol])

  return { price, priceChangePercent, connected }
}