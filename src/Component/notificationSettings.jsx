import React from "react"
import { Save } from "lucide-react"

export default function NotificationSettings({
  notifications,
  setNotifications,
  onSave,
}) {
  const Toggle = ({ label, description, field }) => (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-white">{label}</p>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={notifications[field]}
          onChange={(e) =>
            setNotifications((prev) => ({
              ...prev,
              [field]: e.target.checked,
            }))
          }
          className="peer sr-only"
        />
        <div className="peer h-6 w-11 rounded-full bg-neutral-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full"></div>
      </label>
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Notification Preferences
        </h2>
        <p className="mt-1 text-sm text-neutral-400">
          Control how and when you receive alerts
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 space-y-4">
          <Toggle
            label="New Lead Email"
            description="Get notified when a new lead is created"
            field="newLeadEmail"
          />
          <Toggle
            label="Daily Report"
            description="Receive a daily summary"
            field="dailyReport"
          />
          <Toggle
            label="Weekly Report"
            description="Receive a weekly summary"
            field="weeklyReport"
          />
          <Toggle
            label="Lead Assignment"
            description="Notify when leads are assigned"
            field="leadAssignment"
          />
          <Toggle
            label="Status Changes"
            description="Notify when lead status changes"
            field="statusChange"
          />
          <Toggle
            label="New Lead SMS"
            description="Receive SMS alerts"
            field="newLeadSms"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onSave}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            <Save className="h-4 w-4" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}