import Navbar from './Navbar'
import Sidebar from './Sidebar'

/**
 * DashboardLayout - Estructura general de la app
 * children = el contenido de cada página/sección del dashboard
 */
function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout