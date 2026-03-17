import React from "react";
import { useState } from "react";
import { updateProfilePassword } from "../api/User";
import NotificationComponent from "./notificationComponent";
const ProfilePasswordComponent = ({ data }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { phone } = data.Data;
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(false);
  const [notificationData, setNotificationData] = useState("");
  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password must be different from old password");
      return;
    }

    setError("");

    console.log("Password Change Data:", formData);
    updateProfilePassword(phone, formData)
      .then((res) => {
        const { Heading, msg, statusCode } = res.data;
        setNotificationData({
          Heading: Heading,
          Text: msg,
          Code: statusCode,
        });
        setNotification(true);
      })
      .catch((error) => {
         const { Heading, msg, statusCode } = error.response.data;
        setNotificationData({
          Heading: Heading,
          Text: msg,
          Code: statusCode,
        });
        setNotification(true);
      });

    // reset form
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      {notification ? (
        <NotificationComponent
          data={notificationData}
          action={setNotification}
        />
      ) : (
        ""
      )}
      <div className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
        {/* Header */}
        <div className="border-b border-neutral-800 p-6">
          <h2 className="text-xl font-bold text-white">Change Password</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium text-neutral-400">
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Enter current password"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Error */}
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-neutral-800 p-6">
          <button
            onClick={() =>
              setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
            }
            className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePasswordComponent;
