import React from "react"
import { Save, Eye, EyeOff } from "lucide-react"

export default function ApiSettings({
  apiKeys,
  setApiKeys,
  showPassword,
  togglePasswordVisibility,
  onSave,
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">API Settings</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Configure your lead source integrations and API credentials
        </p>
      </div>

      <div className="space-y-6">
        {/* Meta Ads */}
        <ApiCard
          title="Meta Ads Integration"
          description="Connect your Meta Ads account to import leads"
          label="API Access Token"
          value={apiKeys.metaAds}
          field="metaAds"
          setApiKeys={setApiKeys}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        {/* Google Ads */}
        <ApiCard
          title="Google Ads Integration"
          description="Connect your Google Ads account to import leads"
          label="API Key"
          value={apiKeys.googleAds}
          field="googleAds"
          setApiKeys={setApiKeys}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        {/* Website */}
        <ApiCard
          title="Website Integration"
          description="API token for your website lead forms"
          label="Integration Token"
          value={apiKeys.websiteToken}
          field="websiteToken"
          setApiKeys={setApiKeys}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        <div className="flex justify-end">
          <button
            onClick={onSave}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            <Save className="h-4 w-4" />
            Save API Settings
          </button>
        </div>
      </div>
    </div>
  )
}

function ApiCard({
  title,
  description,
  label,
  value,
  field,
  setApiKeys,
  showPassword,
  togglePasswordVisibility,
}) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-4">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-neutral-400">{description}</p>
      </div>

      <label className="mb-2 block text-sm font-medium text-neutral-400">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword[field] ? "text" : "password"}
          value={value}
          onChange={(e) =>
            setApiKeys((prev) => ({ ...prev, [field]: e.target.value }))
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 pr-10 text-sm text-white focus:border-blue-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(field)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
        >
          {showPassword[field] ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}