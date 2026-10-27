import { NavLink } from 'react-router-dom'
import { useUserProfile } from '../../context/UserProfileContext'

const MENU_BASE = [
  { icon: '📊', label: 'Mercado', path: '/', key: 'mercado' },
  { icon: '🧠', label: 'Sentimiento IA', path: '/sentimiento-ia', key: 'sentimiento-ia' },
  { icon: '🎨', label: 'Personalización', path: '/personalizacion', key: 'personalizacion' },
  { icon: '💬', label: 'Asistente IA', path: '/asistente-ia', key: 'asistente-ia' },
]

/**
 * Sidebar - Navegación lateral del dashboard
 * El orden de los items se ajusta automáticamente: las secciones
 * más visitadas por el usuario suben al principio de la lista.
 */
function Sidebar() {
  const { profile } = useUserProfile()

  // Ordenamos una copia del menú según el contador de visitas (mayor a menor)
  const menuOrdenado = [...MENU_BASE].sort(
    (a, b) => (profile.visitas[b.key] || 0) - (profile.visitas[a.key] || 0)
  )

  return (
    <aside className="w-56 bg-gray-950 border-r border-gray-800 h-[calc(100vh-4rem)] sticky top-16 p-4">
      <nav className="flex flex-col gap-1">
        {menuOrdenado.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar