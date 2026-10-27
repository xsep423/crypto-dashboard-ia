import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Mercado from './pages/Mercado'
import SentimientoIA from './pages/SentimientoIA'
import Personalizacion from './pages/Personalizacion'
import AsistenteIA from './pages/AsistenteIA'

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Mercado />} />
        <Route path="/sentimiento-ia" element={<SentimientoIA />} />
        <Route path="/personalizacion" element={<Personalizacion />} />
        <Route path="/asistente-ia" element={<AsistenteIA />} />
      </Routes>
    </DashboardLayout>
  )
}

export default App