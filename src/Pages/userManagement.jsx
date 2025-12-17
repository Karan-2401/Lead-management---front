import React, { useEffect } from "react";
import { useState } from "react";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
  Calendar,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { createUser, deleteUser, getUser, updateUser } from "../api/User";

export default function UserManagementPage() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [callApi, setCallApi] = useState(false);
  const [users, setUsers] = useState([]);
  const [emergency, setEmergency] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const editUser = () => {
    updateUser({ ...selectedUser }).then((res) => {
      if (res.data.msg == "User is Update") {
        setCallApi(!callApi);
        setShowEditUserModal(false);
      }
    });
  };

  const UserData = (e) => {
    switch (e.target.name) {
      case "name":
        setNewUser({ ...newUser, name: e.target.value });
        break;
      case "email":
        setNewUser({ ...newUser, email: e.target.value });
        break;
      case "phone":
        setNewUser({ ...newUser, phone: e.target.value });
        break;
      case "role":
        setNewUser({ ...newUser, role: e.target.value });
        break;
      case "password":
        setNewUser({ ...newUser, password: e.target.value });
        break;
    }
  };

  useEffect(() => {
    const { name, email, phone, role, password } = newUser;
    if (name && email && phone && role && password) {
      createUser(newUser).then((res) => {
        if (res.data.msg == "user is created") {
          setShowAddUserModal(false);
          setCallApi(!callApi);
        }
      });
    } else {
    }
  }, [callApi]);

  useEffect(() => {
    getUser()
      .then((res) => setUsers(res.data.userData))
      .catch((err) => console.log(err));
  }, [callApi,emergency]);

  const roles = ["Admin", "Employee"];
  const statuses = [
    { name: "Active", value: true },
    { name: "InActive", value: false },
  ];

  // Role permissions configuration
  const rolePermissions = {
    Admin: {
      description: "Full system access with all permissions",
      permissions: [
        { name: "Manage Users", granted: true },
        { name: "View All Leads", granted: true },
        { name: "Assign Leads", granted: true },
        { name: "Edit Lead Status", granted: true },
        { name: "Delete Leads", granted: true },
        { name: "View Analytics", granted: true },
        { name: "Export Reports", granted: true },
        { name: "Manage API Keys", granted: true },
        { name: "System Settings", granted: true },
      ],
    },
    Manager: {
      description: "Team management and reporting access",
      permissions: [
        { name: "Manage Users", granted: false },
        { name: "View All Leads", granted: true },
        { name: "Assign Leads", granted: true },
        { name: "Edit Lead Status", granted: true },
        { name: "Delete Leads", granted: true },
        { name: "View Analytics", granted: true },
        { name: "Export Reports", granted: true },
        { name: "Manage API Keys", granted: false },
        { name: "System Settings", granted: false },
      ],
    },
    Employee: {
      description: "Access to assigned leads only",
      permissions: [
        { name: "Manage Users", granted: false },
        { name: "View All Leads", granted: false },
        { name: "Assign Leads", granted: false },
        { name: "Edit Lead Status", granted: true },
        { name: "Delete Leads", granted: false },
        { name: "View Analytics", granted: false },
        { name: "Export Reports", granted: false },
        { name: "Manage API Keys", granted: false },
        { name: "System Settings", granted: false },
      ],
    },
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-500/10 text-purple-500";
      case "Manager":
        return "bg-blue-500/10 text-blue-500";
      case "Employee":
        return "bg-emerald-500/10 text-emerald-500";
      default:
        return "bg-neutral-500/10 text-neutral-500";
    }
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-emerald-500/10 text-emerald-500"
      : "bg-neutral-500/10 text-neutral-500";
  };
  const handleEditUser = () => {
    setShowEditUserModal(true);
  };
  const handleDeleteUser = (userId) => {
    deleteUser(userId).then((res) => {
      if (res.data.msg == "User deleted successfully") {
          setEmergency(!emergency)
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "all" || user.profiles.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.profiles.status == statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="h-full relative">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Manage users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPermissionsModal(true)}
            className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            <Shield className="h-4 w-4" />
            Role Permissions
          </button>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 py-2 pl-10 pr-4 text-sm text-white placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="all">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          {statuses.map((status) => (
            <option key={status.name} value={status.value}>
              {status.name}
            </option>
          ))}
        </select>
      </div>

      {/* Users Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-400">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-white">{users.length}</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-400">Active Users</p>
          <p className="mt-1 text-2xl font-bold text-emerald-500">
            {users.filter((u) => u.status === "Active").length}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-400">Admins</p>
          <p className="mt-1 text-2xl font-bold text-purple-500">
            {users.filter((u) => u.profiles.role === "Admin").length}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-400">Employees</p>
          <p className="mt-1 text-2xl font-bold text-blue-500">
            {users.filter((u) => u.profiles.role === "Employee").length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-800/50">
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  User
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Contact
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Role
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Status
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Leads Assigned
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Date Added
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Last Active
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="transition-colors hover:bg-neutral-800/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-500">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-neutral-400">
                          ID: {user._id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Mail className="h-3 w-3 text-neutral-500" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Phone className="h-3 w-3 text-neutral-500" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getRoleColor(
                        user.profiles.role
                      )}`}
                    >
                      {user.profiles.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                        user.profiles.status
                      )}`}
                    >
                      {user.profiles.status === true ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      {user.profiles.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-white">
                    {user.leads ? "232" : "0"}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                      <Calendar className="h-3 w-3 text-neutral-500" />
                      {new Date(user.createdAt).toLocaleDateString("en-GB")}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-neutral-300">
                    {user.lastActive}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleEditUser();
                          setSelectedUser({
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            role: user.profiles.role,
                          });
                        }}
                        className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.phone)}
                        className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-red-400"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
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
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={newUser.name}
                    onChange={(e) => UserData(e)}
                    type="text"
                    placeholder="John Smith"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Email *
                  </label>
                  <input
                    name="email"
                    value={newUser.email}
                    onChange={(e) => UserData(e)}
                    type="email"
                    placeholder="john.smith@company.com"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={newUser.phone}
                    onChange={(e) => UserData(e)}
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Role *
                  </label>
                  <select
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    name="role"
                    value={newUser.role}
                    onChange={(e) => UserData(e)}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Password *
                  </label>
                  <input
                    name="password"
                    value={newUser.password}
                    onChange={(e) => UserData(e)}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                {/* <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">Confirm Password *</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div> */}
              </div>

              <div className="mt-6 rounded-lg bg-blue-500/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-blue-400">
                      User Notification
                    </p>
                    <p className="mt-1 text-sm text-neutral-400">
                      The user will receive an email with their login
                      credentials and instructions to access the system.
                    </p>
                  </div>
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
              <button
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                onClick={() => setCallApi(!callApi)}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 p-6">
              <h2 className="text-xl font-bold text-white">Edit User</h2>
              <button
                onClick={() => setShowEditUserModal(false)}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Email
                  </label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    name="email"
                    onChange={(e) => handleChange(e)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                {/* <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={selectedUser.phone}
                      name='phone'
                    onChange={(e)=>handleChange(e)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div> */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Role
                  </label>
                  <select
                    value={selectedUser.role}
                    name="role"
                    onChange={(e) => handleChange(e)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {/* <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Status
                  </label>
                  <select
                    defaultValue={selectedUser.status}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select> */}
                </div>
                <div>
                  {/* <label className="mb-2 block text-xs font-medium text-neutral-400">
                    Leads Assigned
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedUser.leadsAssigned}
                    disabled
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-500"
                  /> */}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-neutral-800 p-6">
              <button
                onClick={() => setShowEditUserModal(false)}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                onClick={editUser}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-4xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 p-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Role Permissions
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  View and understand access levels for each role
                </p>
              </div>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {Object.entries(rolePermissions).map(([role, config]) => (
                  <div
                    key={role}
                    className="rounded-lg border border-neutral-800 bg-neutral-800/50 p-5"
                  >
                    <div className="mb-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getRoleColor(
                          role
                        )}`}
                      >
                        {role}
                      </span>
                      <p className="mt-3 text-sm text-neutral-400">
                        {config.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {config.permissions.map((permission, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-neutral-300">
                            {permission.name}
                          </span>
                          {permission.granted ? (
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-neutral-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-neutral-800 p-6">
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
