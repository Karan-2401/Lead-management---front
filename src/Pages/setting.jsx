import React, { useContext } from "react"
import { useState } from "react"
import { Users, Key, Bell, Building2, Plus, Edit, Trash2, Save, X, Eye, EyeOff } from "lucide-react"
import { DataContext } from "../dataContext"
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users")
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showPassword, setShowPassword] = useState({})
  const Data = useContext(DataContext)
  const role = Data?.Data && Data.Data.profile.role


  const [apiKeys, setApiKeys] = useState({
    metaAds: "",
    googleAds: "",
    websiteToken: "",
  })

  const [notifications, setNotifications] = useState({
    newLeadEmail: true,
    newLeadSms: false,
    dailyReport: true,
    weeklyReport: true,
    leadAssignment: true,
    statusChange: false,
  })

  const [companySettings, setCompanySettings] = useState({
    companyName: "LeadTracker Inc.",
    email: "contact@leadtracker.com",
    phone: "+1 (555) 123-4567",
    website: "https://leadtracker.com",
    address: "123 Business St, Suite 100",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
  })

  const tabs = [
    { id: "api", label: "API Settings", icon: Key, for:['Admin'] },
    { id: "notifications", label: "Notifications", icon: Bell, for:['Admin','Employee'] },
    { id: "company", label: "Company Settings", icon: Building2, for:['Admin'] },
  ]

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }


  const handleSaveApiKeys = () => {
    console.log("[v0] Saving API keys:", apiKeys)
    // Implement save logic here
  }

  const handleSaveNotifications = () => {
    console.log("[v0] Saving notification preferences:", notifications)
    // Implement save logic here
  }

  const handleSaveCompanySettings = () => {
    console.log("[v0] Saving company settings:", companySettings)
    // Implement save logic here
  }

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-neutral-400">Manage your account and system preferences</p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-neutral-800">
        <nav className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={` ${tab.for.includes(role) ? '' : 'hidden'} flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-white"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {/* API Settings Tab */}
        {activeTab === "api" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">API Settings</h2>
              <p className="mt-1 text-sm text-neutral-400">
                Configure your lead source integrations and API credentials
              </p>
            </div>

            <div className="space-y-6">
              {/* Meta Ads API */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">Meta Ads Integration</h3>
                    <p className="mt-1 text-sm text-neutral-400">Connect your Meta Ads account to import leads</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                    Connected
                  </span>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">API Access Token</label>
                  <div className="relative">
                    <input
                      type={showPassword.metaAds ? "text" : "password"}
                      value={apiKeys.metaAds}
                      onChange={(e) => setApiKeys({ ...apiKeys, metaAds: e.target.value })}
                      placeholder="Enter your Meta Ads API token"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("metaAds")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      {showPassword.metaAds ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Google Ads API */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">Google Ads Integration</h3>
                    <p className="mt-1 text-sm text-neutral-400">Connect your Google Ads account to import leads</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                    Connected
                  </span>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">API Key</label>
                  <div className="relative">
                    <input
                      type={showPassword.googleAds ? "text" : "password"}
                      value={apiKeys.googleAds}
                      onChange={(e) => setApiKeys({ ...apiKeys, googleAds: e.target.value })}
                      placeholder="Enter your Google Ads API key"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("googleAds")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      {showPassword.googleAds ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Website Integration */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">Website Integration</h3>
                    <p className="mt-1 text-sm text-neutral-400">API token for your website lead forms</p>
                  </div>
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                    Active
                  </span>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">Integration Token</label>
                  <div className="relative">
                    <input
                      type={showPassword.websiteToken ? "text" : "password"}
                      value={apiKeys.websiteToken}
                      onChange={(e) => setApiKeys({ ...apiKeys, websiteToken: e.target.value })}
                      placeholder="Enter your website integration token"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("websiteToken")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      {showPassword.websiteToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">
                    Use this token in your website forms to send leads to the system
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveApiKeys}
                  className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <Save className="h-4 w-4" />
                  Save API Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
              <p className="mt-1 text-sm text-neutral-400">Control how and when you receive alerts</p>
            </div>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <h3 className="mb-4 font-semibold text-white">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">New Lead Alerts</p>
                      <p className="text-sm text-neutral-400">Get notified when a new lead is created</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={notifications.newLeadEmail}
                        onChange={(e) => setNotifications({ ...notifications, newLeadEmail: e.target.checked })}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Daily Report</p>
                      <p className="text-sm text-neutral-400">Receive a daily summary of leads and activity</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={notifications.dailyReport}
                        onChange={(e) => setNotifications({ ...notifications, dailyReport: e.target.checked })}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Weekly Report</p>
                      <p className="text-sm text-neutral-400">Get a weekly performance summary</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={notifications.weeklyReport}
                        onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* System Notifications */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <h3 className="mb-4 font-semibold text-white">System Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Lead Assignment</p>
                      <p className="text-sm text-neutral-400">Notify when leads are assigned to you</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={notifications.leadAssignment}
                        onChange={(e) => setNotifications({ ...notifications, leadAssignment: e.target.checked })}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Status Changes</p>
                      <p className="text-sm text-neutral-400">Get notified when lead status changes</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={notifications.statusChange}
                        onChange={(e) => setNotifications({ ...notifications, statusChange: e.target.checked })}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* SMS Notifications */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <h3 className="mb-4 font-semibold text-white">SMS Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">New Lead SMS</p>
                      <p className="text-sm text-neutral-400">Receive SMS alerts for new leads</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={notifications.newLeadSms}
                        onChange={(e) => setNotifications({ ...notifications, newLeadSms: e.target.checked })}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotifications}
                  className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <Save className="h-4 w-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Company Settings Tab */}
        {activeTab === "company" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Company Settings</h2>
              <p className="mt-1 text-sm text-neutral-400">Update your company information and branding</p>
            </div>

            <div className="space-y-6">
              {/* Company Information */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <h3 className="mb-4 font-semibold text-white">Company Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-400">Company Name</label>
                    <input
                      type="text"
                      value={companySettings.companyName}
                      onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-400">Email</label>
                    <input
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-400">Phone</label>
                    <input
                      type="tel"
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-400">Website</label>
                    <input
                      type="url"
                      value={companySettings.website}
                      onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-neutral-400">Address</label>
                    <input
                      type="text"
                      value={companySettings.address}
                      onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-400">City</label>
                    <input
                      type="text"
                      value={companySettings.city}
                      onChange={(e) => setCompanySettings({ ...companySettings, city: e.target.value })}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-400">State</label>
                    <input
                      type="text"
                      value={companySettings.state}
                      onChange={(e) => setCompanySettings({ ...companySettings, state: e.target.value })}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-400">ZIP Code</label>
                    <input
                      type="text"
                      value={companySettings.zipCode}
                      onChange={(e) => setCompanySettings({ ...companySettings, zipCode: e.target.value })}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Lead Handling Settings */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <h3 className="mb-4 font-semibold text-white">Lead Handling</h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-400">Auto-Assignment Rule</label>
                    <select className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none">
                      <option>Round Robin</option>
                      <option>Based on Availability</option>
                      <option>Manual Assignment</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-400">
                      Lead Response Time (hours)
                    </label>
                    <input
                      type="number"
                      defaultValue={24}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                    <p className="mt-2 text-xs text-neutral-500">Expected time to respond to new leads</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveCompanySettings}
                  className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <Save className="h-4 w-4" />
                  Save Company Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 p-6">
              <h2 className="text-xl font-bold text-white">Add New User</h2>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">Role</label>
                  <select className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none">
                    <option>Employee</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">Initial Password</label>
                  <input
                    type="password"
                    placeholder="Enter temporary password"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-neutral-800 p-6">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
