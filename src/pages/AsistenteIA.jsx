import { useState, useRef, useEffect } from 'react'
import { useChat } from '../hooks/useChat'
import { useTrackVisit } from '../hooks/useTrackVisit'
import { useTextToSpeech } from '../hooks/useTextToSpeech'

function AsistenteIA() {
  useTrackVisit('asistente-ia')
  const { messages, loading, error, sendMessage } = useChat()
  const [input, setInput] = useState('')
  const finRef = useRef(null)
  const { hablar, detener, hablando, soportado } = useTextToSpeech()
  const [mensajeHablando, setMensajeHablando] = useState(null)

  // Auto-scroll al último mensaje cada vez que llega uno nuevo
  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function handleSubmit(e) {
    e.preventDefault()
    const texto = input
    setInput('')
    sendMessage(texto)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <h1 className="text-2xl font-bold text-white mb-2">Asistente IA</h1>
      <p className="text-gray-400 mb-4">
        Pregúntame sobre criptomonedas o cómo usar el dashboard.
      </p>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
                {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[80%]">
              <div
                className={`rounded-xl px-4 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-200'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'assistant' && soportado && (
                <button
                  onClick={() => {
                    if (mensajeHablando === i && hablando) {
                      detener()
                      setMensajeHablando(null)
                    } else {
                      setMensajeHablando(i)
                      hablar(msg.content)
                    }
                  }}
                  className="text-xs text-gray-500 hover:text-gray-300 mt-1 transition-colors"
                >
                  {mensajeHablando === i && hablando ? '⏹️ Detener' : '🔊 Escuchar'}
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-400 rounded-xl px-4 py-2 text-sm">
              Escribiendo...
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm">Error: {error}</p>
        )}

        <div ref={finRef} />
      </div>

      {/* Formulario de entrada */}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
          disabled={loading}
          className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default AsistenteIA