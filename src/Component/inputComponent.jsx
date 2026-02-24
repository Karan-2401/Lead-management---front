import React from "react";

export const Input = ({
  label,
  field,
  onChange,
  companySettings,
  type = "text",
}) => {

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-neutral-400">
        {label}
      </label>
      <input
        type={type}
        value={companySettings[field]}
        onChange={onChange}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export const Media = ({
  label,
  accept,
  onChange,
  type = "file",
}) => {

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-neutral-400">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        accept={accept}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};
