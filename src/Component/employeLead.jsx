import React from "react"

import { useState } from "react"
import {
  Search,
  Filter,
  ChevronDown,
  X,
  Mail,
  Phone,
  Calendar,
  Globe,
  Facebook,
  SearchIcon,
  MessageSquare,
  Clock,
  Edit2,
  Save,
} from "lucide-react"

export default function EmployeeLeadsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [showLeadDetails, setShowLeadDetails] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [newNote, setNewNote] = useState("")
  const [editingStatus, setEditingStatus] = useState(false)
  const [currentStatus, setCurrentStatus] = useState("")

  // Filter states
  const [filters, setFilters] = useState({
    source: "all",
    status: "all",
    priority: "all",
    search: "",
  })

  // Sample data - replace with your actual API data
  const myLeads = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      company: "Tech Corp",
      source: "Website",
      status: "New",
      priority: "High",
      assignedDate: "2024-01-15",
      lastContact: null,
      value: "$5,000",
      notes: [
        {
          id: 1,
          author: "You",
          date: "2024-01-15 10:30 AM",
          text: "Initial lead received. Need to reach out within 24 hours.",
        },
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@startup.io",
      phone: "+1 (555) 234-5678",
      company: "StartupIO",
      source: "Meta",
      status: "Contacted",
      priority: "Medium",
      assignedDate: "2024-01-14",
      lastContact: "2024-01-14 3:45 PM",
      value: "$12,000",
      notes: [
        {
          id: 1,
          author: "You",
          date: "2024-01-14 3:45 PM",
          text: "Had initial call. Interested in our premium package. Following up next week.",
        },
        { id: 2, author: "You", date: "2024-01-14 10:00 AM", text: "Left voicemail, waiting for callback." },
      ],
    },
    {
      id: 3,
      name: "Emma Williams",
      email: "emma.w@business.com",
      phone: "+1 (555) 345-6789",
      company: "Business Ltd",
      source: "Google",
      status: "Qualified",
      priority: "High",
      assignedDate: "2024-01-13",
      lastContact: "2024-01-15 11:20 AM",
      value: "$8,500",
      notes: [
        {
          id: 1,
          author: "You",
          date: "2024-01-15 11:20 AM",
          text: "Sent proposal via email. Budget approved. Waiting for final decision.",
        },
        {
          id: 2,
          author: "You",
          date: "2024-01-13 2:00 PM",
          text: "Great conversation. They need solution by end of month.",
        },
      ],
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.b@company.net",
      phone: "+1 (555) 456-7890",
      company: "Company Net",
      source: "Website",
      status: "New",
      priority: "Low",
      assignedDate: "2024-01-13",
      lastContact: null,
      value: "$3,200",
      notes: [],
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.a@enterprise.com",
      phone: "+1 (555) 567-8901",
      company: "Enterprise Co",
      source: "Meta",
      status: "Proposal Sent",
      priority: "High",
      assignedDate: "2024-01-12",
      lastContact: "2024-01-14 9:00 AM",
      value: "$25,000",
      notes: [
        {
          id: 1,
          author: "You",
          date: "2024-01-14 9:00 AM",
          text: "Proposal sent. Scheduled follow-up call for Jan 20.",
        },
        {
          id: 2,
          author: "You",
          date: "2024-01-12 4:30 PM",
          text: "Initial discovery call completed. Great fit for our enterprise plan.",
        },
      ],
    },
  ]

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"]

  const getSourceIcon = (source) => {
    switch (source) {
      case "Website":
        return Globe
      case "Meta":
        return Facebook
      case "Google":
        return SearchIcon
      default:
        return Globe
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Contacted":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "Qualified":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "Proposal Sent":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "Negotiation":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "Won":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Lost":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-neutral-500/10 text-neutral-500 border-neutral-500/20"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "border-l-4 border-l-red-500"
      case "Medium":
        return "border-l-4 border-l-amber-500"
      case "Low":
        return "border-l-4 border-l-green-500"
      default:
        return ""
    }
  }

  const openLeadDetails = (lead) => {
    setSelectedLead(lead)
    setCurrentStatus(lead.status)
    setShowLeadDetails(true)
    setEditingStatus(false)
    setNewNote("")
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

    console.log("[v0] Adding note:", newNote)
    // Add note logic here
    setNewNote("")
  }

  const handleUpdateStatus = () => {
    console.log("[v0] Updating status to:", currentStatus)
    // Update status logic here
    setEditingStatus(false)
  }

  const filteredLeads = myLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.company.toLowerCase().includes(filters.search.toLowerCase())
    const matchesSource = filters.source === "all" || lead.source.toLowerCase() === filters.source
    const matchesStatus = filters.status === "all" || lead.status.toLowerCase().replace(" ", "-") === filters.status
    const matchesPriority = filters.priority === "all" || lead.priority.toLowerCase() === filters.priority

    return matchesSearch && matchesSource && matchesStatus && matchesPriority
  })

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Leads</h1>
        <p className="mt-1 text-sm text-neutral-400">Manage and track your assigned leads</p>
      </div>

      {/* Stats Overview */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-400">Total Assigned</p>
          <p className="mt-1 text-2xl font-bold text-white">{myLeads.length}</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-400">New Leads</p>
          <p className="mt-1 text-2xl font-bold text-blue-500">{myLeads.filter((l) => l.status === "New").length}</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-400">In Progress</p>
          <p className="mt-1 text-2xl font-bold text-amber-500">
            {
              myLeads.filter((l) => ["Contacted", "Qualified", "Proposal Sent", "Negotiation"].includes(l.status))
                .length
            }
          </p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-400">High Priority</p>
          <p className="mt-1 text-2xl font-bold text-red-500">{myLeads.filter((l) => l.priority === "High").length}</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, or company..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 py-2 pl-10 pr-4 text-sm text-white placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 rounded-lg border border-neutral-700 bg-neutral-800 p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">Source</label>
              <select
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="meta">Meta</option>
                <option value="google">Google</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status.toLowerCase().replace(" ", "-")}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-800/50">
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Lead Info
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Contact
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Source
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Status
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Priority
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Last Contact
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">Value</th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredLeads.map((lead) => {
                const SourceIcon = getSourceIcon(lead.source)
                return (
                  <tr
                    key={lead.id}
                    className={`transition-colors hover:bg-neutral-800/50 ${getPriorityColor(lead.priority)}`}
                  >
                    <td className="p-4">
                      <div>
                        <button
                          onClick={() => openLeadDetails(lead)}
                          className="font-medium text-white hover:text-blue-400"
                        >
                          {lead.name}
                        </button>
                        <p className="text-sm text-neutral-400">{lead.company}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-neutral-300">
                          <Mail className="h-3 w-3 text-neutral-500" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-300">
                          <Phone className="h-3 w-3 text-neutral-500" />
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <SourceIcon className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm text-neutral-300">{lead.source}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(lead.status)}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 text-sm font-medium ${
                          lead.priority === "High"
                            ? "text-red-500"
                            : lead.priority === "Medium"
                              ? "text-amber-500"
                              : "text-green-500"
                        }`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      {lead.lastContact ? (
                        <div className="flex items-center gap-2 text-sm text-neutral-300">
                          <Clock className="h-3 w-3 text-neutral-500" />
                          {lead.lastContact}
                        </div>
                      ) : (
                        <span className="text-sm text-neutral-500">Never</span>
                      )}
                    </td>
                    <td className="p-4 text-sm font-medium text-white">{lead.value}</td>
                    <td className="p-4">
                      <button
                        onClick={() => openLeadDetails(lead)}
                        className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-neutral-400">No leads found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Lead Details Modal */}
      {showLeadDetails && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-4xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 p-6">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedLead.name}</h2>
                <p className="text-sm text-neutral-400">{selectedLead.company}</p>
              </div>
              <button
                onClick={() => setShowLeadDetails(false)}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid gap-6 p-6 md:grid-cols-3">
              {/* Left Column - Lead Info */}
              <div className="space-y-6 md:col-span-2">
                {/* Contact Information */}
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    Contact Information
                  </h3>
                  <div className="space-y-3 rounded-lg border border-neutral-800 bg-neutral-800/50 p-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-neutral-400" />
                      <div>
                        <p className="text-xs text-neutral-400">Email</p>
                        <p className="text-sm text-white">{selectedLead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-neutral-400" />
                      <div>
                        <p className="text-xs text-neutral-400">Phone</p>
                        <p className="text-sm text-white">{selectedLead.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-neutral-400" />
                      <div>
                        <p className="text-xs text-neutral-400">Assigned Date</p>
                        <p className="text-sm text-white">{selectedLead.assignedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    Notes & Activity
                  </h3>

                  {/* Add Note Form */}
                  <div className="mb-4 rounded-lg border border-neutral-800 bg-neutral-800/50 p-4">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a note about this lead..."
                      rows={3}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={handleAddNote}
                        className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Add Note
                      </button>
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-3">
                    {selectedLead.notes.length > 0 ? (
                      selectedLead.notes.map((note) => (
                        <div key={note.id} className="rounded-lg border border-neutral-800 bg-neutral-800/50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-medium text-blue-400">{note.author}</span>
                            <span className="text-xs text-neutral-500">{note.date}</span>
                          </div>
                          <p className="text-sm leading-relaxed text-neutral-300">{note.text}</p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg border border-neutral-800 bg-neutral-800/50 p-8 text-center">
                        <MessageSquare className="mx-auto h-8 w-8 text-neutral-600" />
                        <p className="mt-2 text-sm text-neutral-400">No notes yet. Add your first note above.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Status & Details */}
              <div className="space-y-6">
                {/* Status Update */}
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Lead Status</h3>
                  <div className="space-y-3 rounded-lg border border-neutral-800 bg-neutral-800/50 p-4">
                    {editingStatus ? (
                      <>
                        <select
                          value={currentStatus}
                          onChange={(e) => setCurrentStatus(e.target.value)}
                          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdateStatus}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
                          >
                            <Save className="h-4 w-4" />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingStatus(false)}
                            className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span
                          className={`inline-flex w-full justify-center rounded-full border px-3 py-2 text-sm font-medium ${getStatusColor(selectedLead.status)}`}
                        >
                          {selectedLead.status}
                        </span>
                        <button
                          onClick={() => setEditingStatus(true)}
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
                        >
                          <Edit2 className="h-4 w-4" />
                          Update Status
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Lead Details */}
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Lead Details</h3>
                  <div className="space-y-3 rounded-lg border border-neutral-800 bg-neutral-800/50 p-4">
                    <div>
                      <p className="text-xs text-neutral-400">Source</p>
                      <div className="mt-1 flex items-center gap-2">
                        {(() => {
                          const Icon = getSourceIcon(selectedLead.source)
                          return <Icon className="h-4 w-4 text-neutral-400" />
                        })()}
                        <p className="text-sm text-white">{selectedLead.source}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Priority</p>
                      <p
                        className={`mt-1 text-sm font-medium ${
                          selectedLead.priority === "High"
                            ? "text-red-500"
                            : selectedLead.priority === "Medium"
                              ? "text-amber-500"
                              : "text-green-500"
                        }`}
                      >
                        {selectedLead.priority}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Estimated Value</p>
                      <p className="mt-1 text-sm font-medium text-white">{selectedLead.value}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Last Contact</p>
                      <p className="mt-1 text-sm text-white">{selectedLead.lastContact || "Never"}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="flex w-full items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                      <Phone className="h-4 w-4" />
                      Log Call
                    </button>
                    <button className="flex w-full items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                      <Mail className="h-4 w-4" />
                      Send Email
                    </button>
                    <button className="flex w-full items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                      <Calendar className="h-4 w-4" />
                      Schedule Follow-up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
