import React, { useEffect } from "react";
import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronDown,
  UserPlus,
  CheckSquare,
  X,
  Mail,
  Phone,
  Calendar,
  Globe,
  Facebook,
  SearchIcon,
  Edit,
  Trash2,
  Loader,
  Eye,
} from "lucide-react";
import { addLead, getAllLeads, updatelead,deleteLead } from "../api/Lead";
import { getUser } from "../api/User";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import { downloadPDF } from "../function/pdfCreate";

export default function AdminLead() {
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newLeadform, setNewLeadForm] = useState(false);
  const [employees, setEmployees] = useState("");
  const [updateLead,serUpdateLead] = useState(false)

    const [loader, setLoader] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    status: "",
    assignTo: "",
    leadValue: "",
  });
  const [leads, setLeads] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addLead(formData).then((res) => console.log(res));
    setNewLeadForm(false); // Close the form after submission
  };

   const updateHandleSubmit = () => {
    updatelead(formData).then((res) => console.log(res));
    setNewLeadForm(false); // Close the form after submission
  };

  const deletelead = (x) => {
    deleteLead(x).then((res) => console.log(res));
   console.log(x)
  };

  // for downloading pdf

  useEffect(() => {
    getUser().then((res) => setEmployees(res.data.userData));
  }, [updateLead]);
  // Filter states
  const [filters, setFilters] = useState({
    source: "all",
    status: "all",
    employee: "all",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    getAllLeads().then((res) => {
      if(res.data.msg = 'Data'){
        setLoader(false)
      setLeads(res.data.data);
      }
    });
  }, []);
  
  const statuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Negotiation",
    "Won",
    "Lost",
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(leads.map((lead) => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId) => {
    if (selectedLeads.includes(leadId)) {
      setSelectedLeads(selectedLeads.filter((id) => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

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
      case "Qualified":
        return "bg-emerald-500/10 text-emerald-500";
      case "Proposal Sent":
        return "bg-amber-500/10 text-amber-500";
      case "Won":
        return "bg-green-500/10 text-green-500";
      case "Lost":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-neutral-500/10 text-neutral-500";
    }
  };

  const openLeadDetails = (lead) => {
    setSelectedLead(lead);
    setShowLeadDetails(true);
  };

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads Management</h1>
          <p className="mt-1 text-sm text-neutral-400">
            View and manage all your leads
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700" onClick={()=>downloadPDF(leads)}>
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            onClick={() => setNewLeadForm(!newLeadform)}
          >
            <UserPlus className="h-4 w-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, or company..."
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 py-2 pl-10 pr-4 text-sm text-white placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="mb-6 rounded-lg border border-neutral-700 bg-neutral-800 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">
                Source
              </label>
              <select
                value={filters.source}
                onChange={(e) =>
                  setFilters({ ...filters, source: e.target.value })
                }
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="meta">Meta</option>
                <option value="google">Google</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status.toLowerCase()}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">
                Assigned To
              </label>
              <select
                value={filters.employee}
                onChange={(e) =>
                  setFilters({ ...filters, employee: e.target.value })
                }
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Employees</option>
                {employees.map((emp) => (
                  <option key={emp} value={emp.toLowerCase()}>
                    {emp}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">
                Date From
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters({ ...filters, dateFrom: e.target.value })
                }
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">
                Date To
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters({ ...filters, dateTo: e.target.value })
                }
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions Bar */}
      {selectedLeads.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
          <div className="flex items-center gap-3">
            <CheckSquare className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-white">
              {selectedLeads.length} lead{selectedLeads.length > 1 ? "s" : ""}{" "}
              selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <select className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none">
              <option value="">Assign to...</option>
              {employees.map((emp) => (
                <option key={emp} value={emp}>
                  {emp}
                </option>
              ))}
            </select>
            <select className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none">
              <option value="">Change status...</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white transition-colors hover:bg-neutral-700">
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-800/50">
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === leads.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-neutral-600 bg-neutral-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="cursor-pointer p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white"
                >
                  Lead Name
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Contact
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Company
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Source
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Status
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Assigned To
                </th>
                <th
                  onClick={() => handleSort("date")}
                  className="cursor-pointer p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white"
                >
                  Date
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Value
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {loader ? 
                              <tr
                              className="text-2xl text-white p-2"
                                style={{
                                  display: "inline-block",
                                  animation: "spin 2s linear infinite",
                                }}
                              ><td>
              
                                <Loader />
                              </td>
                              </tr>
                            :
                leads.map((lead) => {
                  const SourceIcon = getSourceIcon(lead.source);
                  return (
                    <tr
                      key={lead._id}
                      className="transition-colors hover:bg-neutral-800/50"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead.id)}
                          onChange={() => handleSelectLead(lead.id)}
                          className="h-4 w-4 rounded border-neutral-600 bg-neutral-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => openLeadDetails(lead)}
                          className="font-medium text-white hover:text-blue-400"
                        >
                          {lead.name}
                        </button>
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
                      <td className="p-4 text-sm text-neutral-300">
                        {lead.company}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <SourceIcon className="h-4 w-4 text-neutral-400" />
                          <span className="text-sm text-neutral-300">
                            {lead.source}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-neutral-300">
                        {lead.employee ? lead.employee.name : "Unassign"}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-300">
                          <Calendar className="h-3 w-3 text-neutral-500" />
                          {new Date(lead.createdAt).toISOString().split("T")[0]}
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-white">
                        {lead.value}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
                            title="Edit"
                            onClick={() => {
                              setNewLeadForm(true);
                              setFormData({
                                fullName:lead.name,
                                company:lead.company,
                                email: lead.email,
                                phone: lead.phone,
                                source: lead.source,
                                status: lead.status,
                                assignTo: lead.assigned_to,
                                leadValue: lead.value,
                                update:true
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-red-400"
                            title="Delete"
                            onClick={()=>deletelead(lead.phone)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-neutral-800 p-4">
          <p className="text-sm text-neutral-400">
            Showing <span className="font-medium text-white">1</span> to{" "}
            <span className="font-medium text-white">5</span> of{" "}
            <span className="font-medium text-white">50</span> results
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white transition-colors hover:bg-neutral-700">
              Previous
            </button>
            <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white">
              1
            </button>
            <button className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white transition-colors hover:bg-neutral-700">
              2
            </button>
            <button className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white transition-colors hover:bg-neutral-700">
              3
            </button>
            <button className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white transition-colors hover:bg-neutral-700">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      {newLeadform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 p-6">
              <h2 className="text-xl font-bold text-white">Add Lead</h2>
              <button
                onClick={() => {setNewLeadForm(false)
                   setFormData({})}}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone No"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Source
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    {" "}
                    <option value="" disabled>
                      Select Source
                    </option>
                    <option value="Website">Website</option>
                    <option value="Meta">Meta</option>
                    <option value="Google">Google</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Assign To
                  </label>
                  <select
                    name="assignTo"
                    value={formData.assignTo}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Assign to">Assign</option>
                    {employees &&
                      employees.map((emp) => (
                        <option key={emp._id} value={emp.phone}>
                          {emp.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Lead Value
                  </label>
                  <input
                    type="text"
                    name="leadValue"
                    value={formData.leadValue}
                    placeholder="Value"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-neutral-800 p-6">
              <button
                onClick={() => {setNewLeadForm(false)
                  setFormData({})
                }}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Cancel
              </button>
              {formData.update ? ( <button
                onClick={updateHandleSubmit}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                Update
              </button>): ( <button
                onClick={handleSubmit}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                Add
              </button>)}
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
