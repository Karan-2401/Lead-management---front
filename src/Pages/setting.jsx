import React, { useContext } from "react";
import { useState } from "react";
import {
  Users,
  Key,
  Bell,
  Building2,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { DataContext } from "../dataContext";
import ApiSettings from "../Component/apiSettings";
import NotificationSettings from "../Component/notificationSettings";
import CompanySettings from "../Component/companySettings";
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const Data = useContext(DataContext);
  const role = Data?.Data && Data.Data.profile.role;

  const [apiKeys, setApiKeys] = useState({
    metaAds: "",
    googleAds: "",
    websiteToken: "",
  });

  const [notifications, setNotifications] = useState({
    newLeadEmail: true,
    newLeadSms: false,
    dailyReport: true,
    weeklyReport: true,
    leadAssignment: true,
    statusChange: false,
  });

  const tabs = [
    { id: "api", label: "API Settings", icon: Key, for: ["Admin"] },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      for: ["Admin", "Employee"],
    },
    {
      id: "company",
      label: "Company Settings",
      icon: Building2,
      for: ["Admin"],
    },
  ];

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveApiKeys = () => {
    console.log("[v0] Saving API keys:", apiKeys);
    // Implement save logic here
  };

  const handleSaveNotifications = () => {
    console.log("[v0] Saving notification preferences:", notifications);
    // Implement save logic here
  };

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Manage your account and system preferences
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-neutral-800">
        <nav className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={` ${tab.for.includes(role) ? "" : "hidden"} flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-white"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="">
        {/* API Settings Tab */}
        {activeTab === "api" && (
          <ApiSettings
            apiKeys={apiKeys}
            setApiKeys={setApiKeys}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            onSave={handleSaveApiKeys}
          />
        )}

        {activeTab === "notifications" && (
          <NotificationSettings
            notifications={notifications}
            setNotifications={setNotifications}
            onSave={handleSaveNotifications}
          />
        )}

        {activeTab === "company" && (
          <CompanySettings/>
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
                  <label className="mb-2 block text-sm font-medium text-neutral-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">
                    Role
                  </label>
                  <select className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none">
                    <option>Employee</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-400">
                    Initial Password
                  </label>
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
  );
}
