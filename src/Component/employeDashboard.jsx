import React, { useEffect } from "react";
import { useState } from "react";
import {
  Bell,
  Users,
  Target,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Globe,
  Facebook,
  SearchIcon,
  Eye,
  Edit,
  Loader,
  AlertCircle,
} from "lucide-react";
import { getAllLeadEmp, updateleademp } from "../api/Lead";
import { DataContext } from "../dataContext";
import { useContext } from "react";

export default function EmployeeDashboard() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const userData = useContext(DataContext).Data;
  const [leadDetails, setLeadDetails] = useState({ assignL: "", contact: "" });
  const [assignedLeads, setAssignedLeads] = useState([]);
  const [updateLead, setUpdateLead] = useState(false)
  const [loader, setLoader]= useState(true)
  // Sample data - replace with your actual API data for the logged-in employee
  const update = () => {
    updateleademp(selectedLead).then((res)=>{if(res.data.msg == 'lead is updated'){
      setUpdateLead(!updateLead)
    }});
  };
  useEffect(() => {
    getAllLeadEmp(userData.phone).then((res) => {
      if(res.data.msg == 'all employees lead'){
      setAssignedLeads(res.data.data);
      setLeadDetails({ ...leadDetails, assignL: res.data.data.length });
      setLoader(false)
      }

    });
  }, [updateLead]);

  const convertedPeople = assignedLeads.filter((x) => x.status == "New");
  const percantageOfConvertedPeople = Math.trunc(
    (convertedPeople.length / assignedLeads.length) * 100
  );
  const employeeStats = [
    {
      label: "Assigned Leads",
      value: leadDetails.assignL ? leadDetails.assignL : "0",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Contacted Today",
      value: "8",
      icon: Phone,
      color: "bg-purple-500",
    },
    {
      label: "Converted",
      value: convertedPeople ? convertedPeople.length : "0",
      icon: CheckCircle,
      color: "bg-emerald-500",
    },
    {
      label: "Conversion Rate",
      value: percantageOfConvertedPeople
        ? `${percantageOfConvertedPeople} %`
        : "0 %",
      icon: Target,
      color: "bg-amber-500",
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "new",
      message: "New lead assigned: Sarah Johnson from Tech Corp",
      time: "5 minutes ago",
      priority: "high",
    },
    {
      id: 2,
      type: "reminder",
      message: "Follow-up reminder: Contact Emma Williams today",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: 3,
      type: "info",
      message: "Lead status updated: Michael Chen marked as Contacted",
      time: "4 hours ago",
      priority: "medium",
    },
  ];

  const weeklyPerformance = [
    { day: "Mon", worked: 5, converted: 1 },
    { day: "Tue", worked: 7, converted: 2 },
    { day: "Wed", worked: 6, converted: 2 },
    { day: "Thu", worked: 8, converted: 3 },
    { day: "Fri", worked: 9, converted: 2 },
    { day: "Sat", worked: 4, converted: 1 },
    { day: "Sun", worked: 3, converted: 1 },
  ];

  const maxWorked = Math.max(...weeklyPerformance.map((d) => d.worked));

  const getSourceIcon = (source) => {
    switch (source) {
      case "Website":
        return Globe;
      case "Meta":
        return Facebook;
      case "Google":
        return SearchIcon;
      default:
        return Globe;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 text-blue-500";
      case "Contacted":
        return "bg-purple-500/10 text-purple-500";
      case "Follow-up":
        return "bg-amber-500/10 text-amber-500";
      case "Qualified":
        return "bg-emerald-500/10 text-emerald-500";
      default:
        return "bg-neutral-500/10 text-neutral-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-500";
      case "medium":
        return "border-amber-500";
      case "low":
        return "border-emerald-500";
      default:
        return "border-neutral-700";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "new":
        return Bell;
      case "reminder":
        return Clock;
      case "info":
        return AlertCircle;
      default:
        return Bell;
    }
  };

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Track your assigned leads and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {employeeStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="rounded-lg border border-neutral-800 bg-neutral-900 p-5"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-lg ${stat.color}/10 p-2.5`}>
                  <Icon
                    className={`h-5 w-5 ${stat.color.replace("bg-", "text-")}`}
                  />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-neutral-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Assigned Leads - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900">
            {/* Header */}
            <div className="border-b border-neutral-800 p-4">
              <h2 className="text-lg font-semibold text-white">
                My Assigned Leads
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Leads currently assigned to you
              </p>
            </div>

            {/* Leads List */}
            <div className="divide-y divide-neutral-800 p-2 text-2xl text-white">
              {loader ?  (<div  style={{
          display: 'inline-block',
          animation: 'spin 2s linear infinite',
        }}><Loader /></div>) : assignedLeads.map((lead) => {
                const SourceIcon = getSourceIcon(lead.source);
                return (
                  <div
                    key={lead.id}
                    className={`border-l-4 p-4 transition-colors hover:bg-neutral-800/50 ${getPriorityColor(
                      lead.priority
                    )}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowLeadDetails(true);
                            }}
                            className="text-base font-semibold text-white hover:text-blue-400"
                          >
                            {lead.name}
                          </button>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                              lead.status
                            )}`}
                          >
                            {lead.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-neutral-400">
                          {lead.company}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-neutral-300">
                            <Mail className="h-3.5 w-3.5 text-neutral-500" />
                            {lead.email}
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-300">
                            <Phone className="h-3.5 w-3.5 text-neutral-500" />
                            {lead.phone}
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-300">
                            <SourceIcon className="h-3.5 w-3.5 text-neutral-500" />
                            {lead.source}
                          </div>
                        </div>
                      </div>

                      <div className="ml-4 flex items-center gap-2">
                        {/* <button
                          onClick={() => {
                            setSelectedLead(lead)
                            setShowLeadDetails(true)
                          }}
                          className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button> */}
                        <button
                          className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                          title="Edit"
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowLeadDetails(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">
                Weekly Performance
              </h3>
              <p className="mt-1 text-sm text-neutral-400">
                Leads worked on vs converted this week
              </p>
            </div>

            <div className="flex items-end justify-between gap-3">
              {weeklyPerformance.map((day, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-3"
                >
                  <div className="relative w-full space-y-1">
                    {/* Worked Bar */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-full rounded-t-lg bg-blue-500 transition-all hover:bg-blue-400"
                        style={{
                          height: `${(day.worked / maxWorked) * 100}px`,
                        }}
                        title={`${day.worked} worked`}
                      />
                    </div>
                    {/* Converted Bar */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-full rounded-t-lg bg-emerald-500 transition-all hover:bg-emerald-400"
                        style={{
                          height: `${(day.converted / maxWorked) * 100}px`,
                        }}
                        title={`${day.converted} converted`}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-neutral-400">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-neutral-400">Worked On</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-neutral-400">Converted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications - Takes 1 column */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900">
            {/* Header */}
            <div className="border-b border-neutral-800 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Alerts</h2>
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                  {alerts.filter((a) => a.priority === "high").length}
                </span>
              </div>
              <p className="mt-1 text-sm text-neutral-400">
                Recent notifications and reminders
              </p>
            </div>

            {/* Alerts List */}
            <div className="divide-y divide-neutral-800">
              {alerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <div
                    key={alert.id}
                    className="p-4 transition-colors hover:bg-neutral-800/50"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`flex-shrink-0 rounded-lg p-2 ${
                          alert.priority === "high"
                            ? "bg-red-500/10"
                            : "bg-blue-500/10"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            alert.priority === "high"
                              ? "text-red-500"
                              : "text-blue-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed text-neutral-200">
                          {alert.message}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Button */}
            <div className="border-t border-neutral-800 p-4">
              <button className="w-full rounded-lg border border-neutral-700 bg-neutral-800 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                View All Notifications
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                <Phone className="h-4 w-4 text-blue-500" />
                Log a Call
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                <Mail className="h-4 w-4 text-purple-500" />
                Send Email
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      {showLeadDetails && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 p-6">
              <h2 className="text-xl font-bold text-white">Lead Details</h2>
              <button
                onClick={() => setShowLeadDetails(false)}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={selectedLead.name}
                    onChange={(e) =>
                      setSelectedLead({ ...selectedLead, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Company
                  </label>
                  <input
                    type="text"
                    value={selectedLead.company}
                    onChange={(e) =>
                      setSelectedLead({
                        ...selectedLead,
                        company: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Email
                  </label>
                  <input
                    type="email"
                    value={selectedLead.email}
                    onChange={(e) =>
                      setSelectedLead({
                        ...selectedLead,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={selectedLead.phone}
                    onChange={(e) =>
                      setSelectedLead({
                        ...selectedLead,
                        phone: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Status
                  </label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) =>
                      setSelectedLead({
                        ...selectedLead,
                        status: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Follow-up</option>
                    <option>Qualified</option>
                    <option>Proposal Sent</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Source
                  </label>
                  <input
                    type="text"
                    value={selectedLead.source}
                    disabled
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Value
                  </label>
                  <input
                    type="text"
                    value={selectedLead.value}
                    onChange={(e) =>
                      setSelectedLead({
                        ...selectedLead,
                        value: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-neutral-800 p-6">
              <button
                onClick={() => setShowLeadDetails(false)}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  // selectedLead now has updated values
                  setShowLeadDetails(false);
                  update();
                }}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
