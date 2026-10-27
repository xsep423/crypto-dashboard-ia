import { useUserProfile } from '../context/UserProfileContext'
import { useTrackVisit } from '../hooks/useTrackVisit'

const NIVELES = [
  {
    id: 'principiante',
    label: 'Principiante',
    desc: 'Interfaz simple, con explicaciones y sin datos técnicos avanzados.',
  },
  {
    id: 'intermedio',
    label: 'Intermedio',
    desc: 'Balance entre simplicidad y datos técnicos.',
  },
  {
    id: 'avanzado',
    label: 'Avanzado',
    desc: 'Máxima densidad de información, gráficas e indicadores técnicos.',
  },
]

const NOMBRES_SECCION = {
  mercado: 'Mercado',
  'sentimiento-ia': 'Sentimiento IA',
  personalizacion: 'Personalización',
  'asistente-ia': 'Asistente IA',
}

function Personalizacion() {
  const { profile, setNivel } = useUserProfile()
  useTrackVisit('personalizacion')

  // Ordenamos las secciones más visitadas primero, para mostrar el ranking
  const seccionesOrdenadas = Object.entries(profile.visitas).sort(
    (a, b) => b[1] - a[1]
  )
  const totalVisitas = Object.values(profile.visitas).reduce((a, b) => a + b, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Personalización</h1>
      <p className="text-gray-400 mb-6">
        Ajusta tu nivel de experiencia y consulta cómo la IA está adaptando la interfaz según tu uso.
      </p>

      {/* Selector de nivel manual */}
      <h2 className="text-white font-medium mb-3">Tu nivel de experiencia</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {NIVELES.map((nivel) => (
          <button
            key={nivel.id}
            onClick={() => setNivel(nivel.id)}
            className={`text-left border rounded-xl p-4 transition-colors ${
              profile.nivel === nivel.id
                ? 'bg-blue-600 border-blue-500'
                : 'bg-gray-900 border-gray-800 hover:border-gray-600'
            }`}
          >
            <p className="text-white font-semibold mb-1">{nivel.label}</p>
            <p className={`text-xs ${profile.nivel === nivel.id ? 'text-blue-100' : 'text-gray-500'}`}>
              {nivel.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Estadísticas de uso (rastreo automático) */}
      <h2 className="text-white font-medium mb-3">Tu actividad en el dashboard</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        {totalVisitas === 0 ? (
          <p className="text-gray-500 text-sm">Aún no hay suficiente actividad registrada.</p>
        ) : (
          <div className="space-y-3">
            {seccionesOrdenadas.map(([seccion, visitas]) => (
              <div key={seccion}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{NOMBRES_SECCION[seccion] || seccion}</span>
                  <span className="text-gray-500">{visitas} visitas</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{
                      width: totalVisitas > 0 ? `${(visitas / totalVisitas) * 100}%` : '0%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-gray-500 text-xs mt-3">
        El Sidebar se reordena automáticamente priorizando tus secciones más visitadas.
      </p>
    </div>
  )
}

export default Personalizacion