import React, { useEffect } from "react";
import { useState, memo } from "react";
import { updateProfile } from "../api/User";
import NotificationComponent from "./notificationComponent";
const ProfileComponent = ({ data }) => {
  const { name, email, phone } = data.Data;
  const [formData, setFormData] = useState({
    name: name,
    email: email,
  });
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
    updateProfile(phone, formData).then((res)=>{const { Heading, msg, statusCode } = res.data;
      if (msg == "Profile is updated") {
        setNotificationData({
          Heading: Heading,
          Text: msg,
          Code: statusCode,
        })}
      setNotification(true);}).catch((error)=>{console.log(error)});
  };

  // reset form
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
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
        <div className="flex items-center justify-between border-b border-neutral-800 p-6">
          <h2 className="text-xl font-bold text-white">Profile</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-400">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
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
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-neutral-800 p-6">
          <button
            onClick={handleReset}
            className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileComponent);
