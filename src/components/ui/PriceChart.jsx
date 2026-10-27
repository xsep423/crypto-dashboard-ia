import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

/**
 * PriceChart - Gráfica de línea para mostrar tendencia de precios
 * @param {Array} data - Arreglo de [timestamp, precio] proveniente de CoinGecko
 */
function PriceChart({ data }) {
  // Mantenemos el timestamp como número (eje "time") en vez de texto,
  // así Recharts interpola el hover entre cada punto real y no salta por día.
  const chartData = data.map(([timestamp, price]) => ({
    timestamp,
    price,
  }))

  // Formatea el timestamp solo para las etiquetas visibles del eje X
  const formatDateShort = (timestamp) =>
    new Date(timestamp).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })

  // Formatea fecha + hora para el tooltip (más preciso al pasar el mouse)
  const formatDateTime = (timestamp) =>
    new Date(timestamp).toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis
          dataKey="timestamp"
          type="number"
          domain={['dataMin', 'dataMax']}
          scale="time"
          tickFormatter={formatDateShort}
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          minTickGap={40}
        />
        <YAxis
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          domain={['auto', 'auto']}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '8px',
          }}
          labelStyle={{ color: '#9ca3af' }}
          labelFormatter={formatDateTime}
          formatter={(value) => [`$${value.toLocaleString()}`, 'Precio']}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PriceChart