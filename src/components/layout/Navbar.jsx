import { useState } from 'react'
import { useAccessibility } from '../../context/AccessibilityContext'

/**
 * Navbar - Barra superior de navegación
 * Incluye un menú desplegable de accesibilidad (alto contraste, tamaño de texto)
 */
function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { settings, toggleAltoContraste, setTamañoTexto } = useAccessibility()
  
  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-white">
          Crypto<span className="text-blue-500">Dashboard</span>
        </span>
        <span className="text-xs text-gray-500 hidden sm:inline">IA</span>
      </div>

      <div className="flex items-center gap-4 relative">

        {/* Botón de accesibilidad */}
        <button
          onClick={() => setMenuAbierto((prev) => !prev)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Opciones de accesibilidad"
          title="Accesibilidad"
        >
          ♿
        </button>

        {/* Panel desplegable */}
        {menuAbierto && (
          <div className="absolute top-10 right-0 w-64 bg-gray-950 border border-gray-800 rounded-xl p-4 shadow-xl">
            <p className="text-white text-sm font-medium mb-3">Accesibilidad</p>

            <label className="flex items-center justify-between mb-4 cursor-pointer">
              <span className="text-gray-300 text-sm">Alto contraste</span>
              <input
                type="checkbox"
                checked={settings.altoContraste}
                onChange={toggleAltoContraste}
                className="w-4 h-4"
              />
            </label>

            <p className="text-gray-300 text-sm mb-2">Tamaño de texto</p>
            <div className="flex gap-2">
              {[
                { id: 'normal', label: 'A' },
                { id: 'grande', label: 'A+' },
                { id: 'muy-grande', label: 'A++' },
              ].map((opcion) => (
                <button
                  key={opcion.id}
                  onClick={() => setTamañoTexto(opcion.id)}
                  className={`flex-1 py-1.5 rounded-lg text-sm transition-colors ${
                    settings.tamañoTexto === opcion.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {opcion.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
          KC
        </div>
      </div>
    </header>
  )
}

export default Navbar