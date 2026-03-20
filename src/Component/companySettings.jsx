import React, { useContext, useEffect } from "react";
import { Save } from "lucide-react";
import { useState } from "react";
import { updateCompany } from "../api/Company";
import { Input } from "./inputComponent";
import { Media } from "./inputComponent";
import { DataContext } from "../dataContext";
import NotificationComponent from "./notificationComponent";

export default function CompanySettings() {
  const Data = useContext(DataContext);
  const [notification, setNotification] = useState(false);
  const [notificationData, setNotificationData] = useState("");
  const { address, city, email, name, phone, state, website, zipcode, _id } =
    Data.Data.company;
  const [companySettings, setCompanySettings] = useState({
    companyName: name,
    email: email,
    phone: phone,
    website: website,
    address: address,
    city: city,
    state: state,
    zipCode: zipcode,
  });

  const [image, setImage] = useState(null);
  const handleChange = (field) => (e) => {
    setCompanySettings((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const onSave = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(companySettings).forEach((key) => {
      data.append(key, companySettings[key]);
    });
    data.append("image", image);
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }
    updateCompany(_id, data)
      .then((response) => {
          const { Heading, msg, statusCode } = response.data;
        if (msg == "company's information is save") {
          setNotificationData({
            Heading: Heading,
            Text: msg,
            Code: statusCode,
          });
        }
        setNotification(true);
      })
      .catch((error) => {
        console.log(error)
      });
  };
  return (
    <div>
      <div className="mb-6">
        {notification ? (
        <NotificationComponent
          data={notificationData}
          action={setNotification}
        />
      ) : (
        ""
      )}
        <h2 className="text-lg font-semibold text-white">Company Settings</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Update your company information
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Company Name"
              field="companyName"
              companySettings={companySettings}
              onChange={handleChange("companyName")}
            />
            <Input
              label="Email"
              field="email"
              type="email"
              companySettings={companySettings}
              onChange={handleChange("email")}
            />
            <Input
              label="Phone"
              field="phone"
              companySettings={companySettings}
              onChange={handleChange("phone")}
            />
            <Media accept="image/*" onChange={handleFileChange} label="Image" />
            <Input
              label="Website"
              field="website"
              type="url"
              companySettings={companySettings}
              onChange={handleChange("website")}
            />
            <Input
              label="Address"
              field="address"
              companySettings={companySettings}
              onChange={handleChange("address")}
            />
            <Input
              label="City"
              field="city"
              companySettings={companySettings}
              onChange={handleChange("city")}
            />
            <Input
              label="State"
              field="state"
              companySettings={companySettings}
              onChange={handleChange("state")}
            />
            <Input
              label="ZIP Code"
              field="zipCode"
              companySettings={companySettings}
              onChange={handleChange("zipCode")}
            />
          </div>
        </div>

        <div className="flex justify-end pb-2">
          <button
            onClick={onSave}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            <Save className="h-4 w-4" />
            Save Company Settings
          </button>
        </div>
      </div>
    </div>
  );
}
