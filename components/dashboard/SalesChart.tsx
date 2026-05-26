'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '@/lib/utils'

interface Props {
  data: { date: string; revenue: number }[]
}

export function SalesChart({ data }: Props) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }),
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={formatted} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a2138" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: '#525a78', letterSpacing: 1 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatCurrency(Number(v))}
          tick={{ fontSize: 10, fill: '#525a78' }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        <Tooltip
          formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
          contentStyle={{
            background: '#080b15',
            border: '1px solid #232c4a',
            borderRadius: 0,
            color: '#eef0fa',
            fontSize: 12,
            letterSpacing: '0.08em',
          }}
          cursor={{ fill: 'rgba(91,108,255,0.07)' }}
        />
        <Bar dataKey="revenue" fill="#5b6cff" radius={[2, 2, 0, 0]}
          style={{ filter: 'drop-shadow(0 0 6px rgba(91,108,255,0.5))' }} />
      </BarChart>
    </ResponsiveContainer>
  )
}
