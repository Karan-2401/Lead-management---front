import React from 'react'
import { useState } from 'react'
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, Users, Target, FileText, BarChart3, Filter } from 'lucide-react'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-01-31' })
  const [selectedSource, setSelectedSource] = useState('all')
  const [selectedEmployee, setSelectedEmployee] = useState('all')

  // Sample data - replace with your actual API data
  const summaryMetrics = [
    { label: 'Total Leads', value: '1,247', change: '+12.5%', trend: 'up', icon: Users },
    { label: 'Conversion Rate', value: '24.8%', change: '+3.2%', trend: 'up', icon: Target },
    { label: 'Total Revenue', value: '$156,400', change: '+18.7%', trend: 'up', icon: DollarSign },
    { label: 'Avg. Lead Value', value: '$5,234', change: '-2.1%', trend: 'down', icon: BarChart3 }
  ]

  const leadsBySource = [
    { source: 'Website', leads: 523, conversions: 142, revenue: 68500, roi: 285 },
    { source: 'Meta', leads: 412, conversions: 98, revenue: 52300, roi: 215 },
    { source: 'Google', leads: 312, conversions: 87, revenue: 35600, roi: 178 }
  ]

  const conversionFunnel = [
    { stage: 'New Leads', count: 1247, percentage: 100 },
    { stage: 'Contacted', count: 892, percentage: 71.5 },
    { stage: 'Qualified', count: 534, percentage: 42.8 },
    { stage: 'Proposal Sent', count: 387, percentage: 31.0 },
    { stage: 'Won', count: 309, percentage: 24.8 }
  ]

  const monthlyTrend = [
    { month: 'Jul', leads: 980, conversions: 210 },
    { month: 'Aug', leads: 1050, conversions: 245 },
    { month: 'Sep', leads: 1120, conversions: 268 },
    { month: 'Oct', leads: 1180, conversions: 285 },
    { month: 'Nov', leads: 1210, conversions: 295 },
    { month: 'Dec', leads: 1150, conversions: 278 },
    { month: 'Jan', leads: 1247, conversions: 309 }
  ]

  const maxLeads = Math.max(...monthlyTrend.map(m => m.leads))
  const maxConversions = Math.max(...monthlyTrend.map(m => m.conversions))

  const employeePerformance = [
    { name: 'John Smith', leads: 342, conversions: 89, rate: 26.0 },
    { name: 'Jane Doe', leads: 298, conversions: 76, rate: 25.5 },
    { name: 'Mike Wilson', leads: 267, conversions: 61, rate: 22.8 },
    { name: 'Sarah Parker', leads: 245, conversions: 53, rate: 21.6 }
  ]

  const handleExport = (format) => {
    console.log(`[v0] Exporting report as ${format}`)
    // Implement export logic here
  }

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Reports</h1>
          <p className="mt-1 text-sm text-neutral-400">Track performance and generate insights</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            <FileText className="h-4 w-4" />
            Export PDF
          </button>
          <button 
            onClick={() => handleExport('excel')}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Filter className="h-4 w-4 text-neutral-400" />
          <h3 className="text-sm font-semibold text-white">Filters</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-medium text-neutral-400">Date From</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 py-2 pl-10 pr-3 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-neutral-400">Date To</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 py-2 pl-10 pr-3 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-neutral-400">Lead Source</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Sources</option>
              <option value="website">Website</option>
              <option value="meta">Meta</option>
              <option value="google">Google</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-blue-500/10 p-2.5">
                  <Icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${metric.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {metric.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-neutral-400">{metric.label}</p>
                <p className="mt-1 text-2xl font-bold text-white">{metric.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend Chart */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Monthly Trend</h3>
              <p className="mt-1 text-sm text-neutral-400">Leads vs Conversions over time</p>
            </div>
          </div>
          <div className="space-y-4">
            {monthlyTrend.map((item, index) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-neutral-300">{item.month}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-blue-400">{item.leads} leads</span>
                    <span className="text-emerald-400">{item.conversions} won</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="h-8 overflow-hidden rounded bg-neutral-800">
                      <div
                        className="h-full rounded bg-blue-500 transition-all"
                        style={{ width: `${(item.leads / maxLeads) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-8 overflow-hidden rounded bg-neutral-800">
                      <div
                        className="h-full rounded bg-emerald-500 transition-all"
                        style={{ width: `${(item.conversions / maxConversions) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-neutral-400">Total Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-neutral-400">Conversions</span>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">Conversion Funnel</h3>
            <p className="mt-1 text-sm text-neutral-400">Lead progression through sales stages</p>
          </div>
          <div className="space-y-3">
            {conversionFunnel.map((stage, index) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-white">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-300">{stage.count}</span>
                    <span className="text-neutral-400">({stage.percentage}%)</span>
                  </div>
                </div>
                <div className="h-10 overflow-hidden rounded-lg bg-neutral-800">
                  <div
                    className="flex h-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-xs font-semibold text-white transition-all"
                    style={{ width: `${stage.percentage}%` }}
                  >
                    {stage.percentage > 20 && `${stage.percentage}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Source ROI Table */}
      <div className="mb-6 rounded-lg border border-neutral-800 bg-neutral-900 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white">Lead Source Performance & ROI</h3>
          <p className="mt-1 text-sm text-neutral-400">Return on investment by channel</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">Source</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Leads</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">Conversions</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">Conversion Rate</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">Revenue</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {leadsBySource.map((source, index) => {
                const conversionRate = ((source.conversions / source.leads) * 100).toFixed(1)
                return (
                  <tr key={index}>
                    <td className="py-4 text-sm font-medium text-white">{source.source}</td>
                    <td className="py-4 text-sm text-neutral-300">{source.leads}</td>
                    <td className="py-4 text-sm text-neutral-300">{source.conversions}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-neutral-800">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${conversionRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-neutral-300">{conversionRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium text-white">${source.revenue.toLocaleString()}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                        <TrendingUp className="h-3 w-3" />
                        {source.roi}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Source Comparison Pie Chart */}
        <div className="mt-8 flex items-center justify-center gap-8">
          <div className="relative h-48 w-48">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="15.915"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="31.83"
                strokeDasharray="42 58"
                strokeDashoffset="0"
              />
              <circle
                cx="50"
                cy="50"
                r="15.915"
                fill="none"
                stroke="#a855f7"
                strokeWidth="31.83"
                strokeDasharray="33 67"
                strokeDashoffset="-42"
              />
              <circle
                cx="50"
                cy="50"
                r="15.915"
                fill="none"
                stroke="#10b981"
                strokeWidth="31.83"
                strokeDasharray="25 75"
                strokeDashoffset="-75"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-xs text-neutral-400">Total Leads</p>
            </div>
          </div>
          <div className="space-y-3">
            {leadsBySource.map((source, index) => {
              const colors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500']
              const percentage = ((source.leads / 1247) * 100).toFixed(1)
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${colors[index]}`} />
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-white">{source.source}</span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-300">{source.leads}</span>
                    <span className="text-neutral-400">({percentage}%)</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Employee Performance */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white">Employee Performance</h3>
          <p className="mt-1 text-sm text-neutral-400">Individual conversion rates and lead handling</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {employeePerformance.map((employee, index) => (
            <div key={index} className="rounded-lg border border-neutral-800 bg-neutral-800/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-medium text-white">{employee.name}</p>
                <span className="text-sm font-semibold text-emerald-500">{employee.rate}%</span>
              </div>
              <div className="mb-3 flex items-center justify-between text-sm text-neutral-400">
                <span>{employee.leads} leads assigned</span>
                <span>{employee.conversions} conversions</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-700">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${employee.rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}