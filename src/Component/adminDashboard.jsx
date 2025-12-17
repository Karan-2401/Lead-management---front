import React from 'react'
import { TrendingUp, TrendingDown, Users, Globe, Facebook, Search } from 'lucide-react'

export default function AdminDashboard() {
  // Sample data - replace with your actual data
  const totalLeads = 1247
  const todayLeads = 34
  const leadGrowth = 12.5
  
  const leadsBySource = [
    { source: 'Website', count: 523, percentage: 42, color: 'bg-blue-500', icon: Globe },
    { source: 'Meta', count: 412, percentage: 33, color: 'bg-purple-500', icon: Facebook },
    { source: 'Google', count: 312, percentage: 25, color: 'bg-emerald-500', icon: Search },
  ]

  // Sample bar chart data
  const dailyLeads = [
    { day: 'Mon', count: 28 },
    { day: 'Tue', count: 42 },
    { day: 'Wed', count: 35 },
    { day: 'Thu', count: 48 },
    { day: 'Fri', count: 52 },
    { day: 'Sat', count: 31 },
    { day: 'Sun', count: 34 },
  ]

  const maxCount = Math.max(...dailyLeads.map(d => d.count))

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Leads Dashboard</h1>
          <p className="mt-2 text-neutral-400">Track and monitor your lead sources</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Leads Card */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Total Leads</p>
                <p className="mt-2 text-3xl font-bold text-white">{totalLeads.toLocaleString()}</p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-500">+{leadGrowth}%</span>
              <span className="text-sm text-neutral-400">from last month</span>
            </div>
          </div>

          {/* Today's Leads Card */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">{"Today's Leads"}</p>
                <p className="mt-2 text-3xl font-bold text-white">{todayLeads}</p>
              </div>
              <div className="rounded-full bg-emerald-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${(todayLeads / 50) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-neutral-400">Target: 50 leads per day</p>
            </div>
          </div>

          {/* Weekly Trend Card with Bar Chart */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 md:col-span-2 lg:col-span-1">
            <p className="text-sm font-medium text-neutral-400">Last 7 Days</p>
            <div className="mt-4 flex items-end justify-between gap-2">
              {dailyLeads.map((day, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full">
                    <div
                      className="w-full rounded-t bg-blue-500 transition-all hover:bg-blue-400"
                      style={{ height: `${(day.count / maxCount) * 80}px` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leads by Source */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-lg font-semibold text-white">Leads by Source</h2>
          <p className="mt-1 text-sm text-neutral-400">Distribution across different channels</p>

          <div className="mt-6 space-y-6">
            {leadsBySource.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg ${item.color} p-2`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-white">{item.source}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{item.count}</p>
                      <p className="text-sm text-neutral-400">{item.percentage}%</p>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pie Chart Visual */}
          <div className="mt-8 flex items-center justify-center">
            <div className="relative h-40 w-40">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                {leadsBySource.reduce((acc, item, index) => {
                  const prevPercentage = leadsBySource
                    .slice(0, index)
                    .reduce((sum, i) => sum + i.percentage, 0)
                  const strokeDasharray = `${item.percentage} ${100 - item.percentage}`
                  const strokeDashoffset = -prevPercentage

                  const colors = {
                    'bg-blue-500': '#3b82f6',
                    'bg-purple-500': '#a855f7',
                    'bg-emerald-500': '#10b981',
                  }

                  acc.push(
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="15.915"
                      fill="none"
                      stroke={colors[item.color]}
                      strokeWidth="31.83"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                    />
                  )
                  return acc
                }, [])}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}