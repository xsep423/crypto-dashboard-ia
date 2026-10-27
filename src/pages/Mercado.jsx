import { useTrackVisit } from '../hooks/useTrackVisit'
import { useCryptoMarket } from '../hooks/useCryptoMarket'
import { useCoinHistory } from '../hooks/useCoinHistory'
import PriceChart from '../components/ui/PriceChart'
import LivePriceTicker from '../components/ui/LivePriceTicker'
import { useUserProfile } from '../context/UserProfileContext'

function Mercado() {
  const { coins, loading, error } = useCryptoMarket(10)
  const { history, loading: historyLoading } = useCoinHistory('bitcoin', 7)
  useTrackVisit('mercado')
  const { profile } = useUserProfile()

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Mercado</h1>
      <p className="text-gray-400 mb-6">Precios en vivo — Top 10 criptomonedas por capitalización.</p>

      {/* Precios en tiempo real vía WebSocket de Binance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <LivePriceTicker symbol="btcusdt" label="BTC/USDT" />
        <LivePriceTicker symbol="ethusdt" label="ETH/USDT" />
      </div>

      {/* Gráfica de tendencia - solo para niveles intermedio/avanzado */}
      {profile.nivel !== 'principiante' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
          <h2 className="text-white font-medium mb-3">Bitcoin — Últimos 7 días</h2>
          {historyLoading ? (
            <p className="text-gray-500 text-sm">Cargando gráfica...</p>
          ) : (
            <PriceChart data={history} />
          )}
        </div>
      )}

      {loading && (
        <p className="text-gray-500">Cargando datos del mercado...</p>
      )}

      {error && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3"
            >
                            <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div className="flex-1">
                <p className="text-white font-medium">{coin.name}</p>
                <p className="text-gray-500 text-xs uppercase">{coin.symbol}</p>
                {profile.nivel === 'avanzado' && (
                  <div className="mt-1 text-[10px] text-gray-500 space-y-0.5">
                    <p>
                      Máx 24h: <span className="text-gray-400">${coin.high_24h?.toLocaleString()}</span>
                    </p>
                    <p>
                      Mín 24h: <span className="text-gray-400">${coin.low_24h?.toLocaleString()}</span>
                    </p>
                    <p>
                      Vol 24h: <span className="text-gray-400">${coin.total_volume?.toLocaleString()}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">
                  ${coin.current_price.toLocaleString()}
                </p>
                <p
                  className={`text-xs ${
                    coin.price_change_percentage_24h == null
                      ? 'text-gray-500'
                      : coin.price_change_percentage_24h >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                  }`}
                >
                  {coin.price_change_percentage_24h != null
                    ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                    : 'N/A'}
                </p>
                {profile.nivel === 'principiante' && coin.price_change_percentage_24h != null && (
                  <p className="text-xs text-gray-500">
                    {coin.price_change_percentage_24h >= 0 ? 'Subió hoy' : 'Bajó hoy'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Mercado