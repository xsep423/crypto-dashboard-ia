import { useLivePrice } from '../../hooks/useLivePrice'

/**
 * LivePriceTicker - Muestra el precio en tiempo real de un par de Binance
 * @param {string} symbol - Par de Binance, ej. 'btcusdt'
 * @param {string} label - Nombre a mostrar, ej. 'BTC/USDT'
 */
function LivePriceTicker({ symbol, label }) {
  const { price, priceChangePercent, connected } = useLivePrice(symbol)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-white font-medium">{label}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`w-2 h-2 rounded-full ${
              connected ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
            }`}
          />
          <span className="text-gray-500 text-xs">
            {connected ? 'En vivo' : 'Conectando...'}
          </span>
        </div>
      </div>

      <div className="text-right">
        {price !== null ? (
          <>
            <p className="text-white font-bold text-lg">
              ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p
              className={`text-xs ${
                priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {priceChangePercent?.toFixed(2)}%
            </p>
          </>
        ) : (
          <p className="text-gray-500 text-sm">Cargando...</p>
        )}
      </div>
    </div>
  )
}

export default LivePriceTicker