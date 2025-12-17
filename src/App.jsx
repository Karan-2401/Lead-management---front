import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Dashboard from "./Pages/dashboard";
import LmsLayout from "./Pages/lms-layout";
import LeadsPage from "./Pages/leads";
import AnalyticsPage from "./Pages/analytics";
import SettingsPage from "./Pages/setting";
import UserManagementPage from "./Pages/userManagement";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "./dataContext";

const App = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<LmsLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/lead" element={<LeadsPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/setting" element={<SettingsPage />} />
          <Route
            path="/dashboard/usermanagement"
            element={<UserManagementPage />}
          />
        </Route>
      </Routes>
    </DataProvider>
  );
};

export default App;
