import { useTrackVisit } from '../hooks/useTrackVisit'
import { useMarketSentiment } from '../hooks/useMarketSentiment'
import { useTextToSpeech } from '../hooks/useTextToSpeech'

// Configuración visual según el sentimiento detectado
const SENTIMENT_STYLES = {
  positivo: { color: 'text-green-500', bg: 'bg-green-500/10', emoji: '📈' },
  negativo: { color: 'text-red-500', bg: 'bg-red-500/10', emoji: '📉' },
  neutral: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', emoji: '⚖️' },
}

function SentimientoIA() {
  const { data, loading, error } = useMarketSentiment()
    const { hablar, detener, hablando, soportado } = useTextToSpeech()
  useTrackVisit('sentimiento-ia')

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Sentimiento IA</h1>
      <p className="text-gray-400 mb-6">
        Análisis del sentimiento general del mercado, generado por IA a partir de noticias recientes.
      </p>

      {loading && (
        <p className="text-gray-500">Analizando noticias con IA, esto puede tardar unos segundos...</p>
      )}

      {error && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {data && !loading && !error && (
        <div>
          <div
            className={`border border-gray-800 rounded-xl p-6 mb-6 ${
              SENTIMENT_STYLES[data.sentimiento]?.bg || 'bg-gray-900'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{SENTIMENT_STYLES[data.sentimiento]?.emoji || '❔'}</span>
              <div>
                <p
                  className={`text-xl font-bold uppercase ${
                    SENTIMENT_STYLES[data.sentimiento]?.color || 'text-white'
                  }`}
                >
                  {data.sentimiento}
                </p>
                <p className="text-gray-400 text-sm">Confianza: {data.confianza}%</p>
              </div>
            </div>
                        <p className="text-gray-300 mb-3">{data.resumen}</p>

            {soportado && (
              <button
                onClick={() =>
                  hablando
                    ? detener()
                    : hablar(`Sentimiento del mercado: ${data.sentimiento}, con ${data.confianza} por ciento de confianza. ${data.resumen}`)
                }
                className="flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors w-fit"
              >
                {hablando ? '⏹️ Detener' : '🔊 Escuchar análisis'}
              </button>
            )}
          </div>

          <h2 className="text-white font-medium mb-3">Noticias analizadas</h2>
          <div className="space-y-2">
            {data.noticias.map((noticia, i) => (
              <a
                key={i}
                href={noticia.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-900 border border-gray-800 rounded-lg p-3 hover:border-gray-600 transition-colors"
              >
                <p className="text-white text-sm">{noticia.title}</p>
                <p className="text-gray-500 text-xs mt-1">{noticia.source}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SentimientoIA