import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../dataContext";
import { UserRoundPen, ShieldCheck, Component} from 'lucide-react'
import ProfileComponent from "../Component/profileComponent";
import ProfilePasswordComponent from "../Component/profilePasswordComponent";
const Profile = () => {
  const data = useContext(DataContext)
  const [ActiveTab,setactiveTab] = useState('ProfileComponent');
  const tab = [ {
      id: "ProfileComponent",
      Component:<ProfileComponent data={data}/>,
      label: "Profile",
      icon: UserRoundPen,
      for: ["Admin", "Employee"],
    },
  {
      id: "PasswordComponent",
      Component:<ProfilePasswordComponent data={data}/>,
      label: "Password",
      icon:ShieldCheck,
      for: ["Admin", "Employee"],
    }]
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // demo reset
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-neutral-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Your Profile</h1>
          <p className="mt-2 text-neutral-400">
            View and update your account details in one place
          </p>
        </div>
      </div>
      <div>

        <div className="mb-6 border-b border-neutral-800">
        <nav className="flex gap-6">
          {tab.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setactiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors cursor-pointer ${
                  ActiveTab === tab.id
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

       {tab.map((tab)=>{
        if(tab.id == ActiveTab){
         return(tab.Component)
        }
       })}
      </div>
    </div>
  );
};

export default Profile;
