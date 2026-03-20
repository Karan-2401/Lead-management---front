import React, { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Loader,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import NotificationComponent from "../Component/notificationComponent";
import {
  getAllCompany,
  createCompany,
  deleteCompany,
  getCompany,
} from "../api/Company";
import { Input } from "../Component/inputComponent";
import { Media } from "../Component/inputComponent";
export function CompanyManagement() {
  const [companiesData, setCompaniesData] = useState([]);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationData, setNotificationData] = useState("");
  const [updateList, setUpdateList] = useState(true);
  const [loader, setLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState([]); // Using demo data here
  const [callApi, setCallApi] = useState(false);
  const [image, setImage] = useState(null);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [existCompany, setExistCompany] = useState({
    companyName: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChangeExist = (field) => (e) => {
    setExistCompany((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleChangeNew = (field) => (e) => {
    setNewCompany((prev) => ({
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

    Object.keys(newCompany).forEach((key) => {
      data.append(key, newCompany[key]);
    });
    data.append("image", image);
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }
    createCompany(data)
      .then((response) => {
        const { Heading, msg, statusCode } = response.data;
        if (msg == "Company is created") {
          setShowAddCompanyModal(false);
          setNotificationData({
            Heading: Heading,
            Text: msg,
            Code: statusCode,
          });
          setUpdateList(!updateList);
        }
        setNotification(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Delete = (id) => {
    deleteCompany(id).then((res) => {
      const { Heading, msg, statusCode } = res.data;
      if (res.data.msg == "Company deleted successfully") {
        setNotificationData({
          Heading: Heading,
          Text: msg,
          Code: statusCode,
        });
        setNotification(true);
        setUpdateList(!updateList);
      }
    });
  };

  const editCompany = (id) => {
    setShowEditCompanyModal(true);
    getCompany(id).then((res) => {
      const {address,city,email,name,phone,state,website,zipcode} = res.data.data
      setExistCompany({
        companyName: name,
        email: email,
        phone: phone,
        website: website,
        address: address,
        city: city,
        state: state,
        zipCode: zipcode,
      });
    });
  };
  // Simulated API calls

  // const deleteCompany = (companyId) => {
  //   setCompanies(companies.filter((company) => company._id !== companyId)); // Removing company by ID
  // };

  // const updateCompany = (company) => {
  //   setCompanies(
  //     companies.map((item) =>
  //       item._id === company._id ? { ...item, ...company } : item,
  //     ),
  //   ); // Updating company data
  // };

  // Handle input changes
  // const handleChange = (e) => {
  //   setSelectedCompany({ ...selectedCompany, [e.target.name]: e.target.value });
  // };

  // const handleDeleteCompany = (companyId) => {
  //   deleteCompany(companyId);
  //   setNotificationData({
  //     Heading: "Success",
  //     Text: "Company deleted successfully",
  //     Code: 200,
  //   });
  //   setNotification(true);
  //   setCallApi(!callApi);
  // };

  // const handleAddCompany = () => {
  //   createCompany(newCompany);
  //   setNotificationData({
  //     Heading: "Success",
  //     Text: "Company added successfully",
  //     Code: 200,
  //   });
  //   setNotification(true);
  //   setShowAddCompanyModal(false);
  //   setCallApi(!callApi);
  // };

  const filteredCompanies = companies.filter((company) => {
    return (
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    getAllCompany()
      .then((res) => {
        const { data, Heading, msg } = res.data;
        setLoader(true);
        if (msg == "company list") {
          setLoader(false);
          setCompanies(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateList]);

  return (
    <div className="h-full relative">
      {notification && (
        <NotificationComponent
          data={notificationData}
          action={setNotification}
        />
      )}

      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Company Management</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Manage companies, information, and details
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddCompanyModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            <UserPlus className="h-4 w-4" /> Add Company
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
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
      </div>

      {/* Companies Table */}
      <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-800/50">
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Image
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Compnay
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Website
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Contact
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Address
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {loader ? (
                <tr className="text-2xl text-white p-2">
                  <td>
                    <Loader className="h-6 w-6 animate-spin text-blue-500" />
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((company) => (
                  <tr
                    key={company._id}
                    className="transition-colors hover:bg-neutral-800/50"
                  >
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-neutral-300">
                          <img
                            src={`${import.meta.env.VITE_UrlBack}/uploads/${company.image}`}
                            alt={company.image}
                            className="w-52"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-500">
                          {company.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {company.name}
                          </p>
                          <p className="text-xs text-neutral-400">
                            ID: {company._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-neutral-300">
                          <Globe className="h-3 w-3 text-neutral-500" />{" "}
                          {company.website}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-neutral-300">
                          <Mail className="h-3 w-3 text-neutral-500" />{" "}
                          {company.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-300">
                          <Phone className="h-3 w-3 text-neutral-500" />{" "}
                          {company.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-neutral-300">
                        {company.address}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {company.city}, {company.state} {company.zipcode}
                      </p>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => editCompany(company._id)}
                          className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
                          title="Edit Company"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => Delete(company._id)}
                          className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-red-400"
                          title="Delete Company"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Modal */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 p-6">
              <h2 className="text-xl font-bold text-white">Add New Company</h2>
              <button
                onClick={() => setShowAddCompanyModal(false)}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Company Name"
                  field="companyName"
                  companySettings={newCompany}
                  onChange={handleChangeNew("companyName")}
                />
                <Input
                  label="Email"
                  field="email"
                  type="email"
                  companySettings={newCompany}
                  onChange={handleChangeNew("email")}
                />
                <Input
                  label="Phone"
                  field="phone"
                  companySettings={newCompany}
                  onChange={handleChangeNew("phone")}
                />
                <Media
                  accept="image/*"
                  onChange={handleFileChange}
                  label="Image"
                />
                <Input
                  label="Website"
                  field="website"
                  type="url"
                  companySettings={newCompany}
                  onChange={handleChangeNew("website")}
                />
                <Input
                  label="Address"
                  field="address"
                  companySettings={newCompany}
                  onChange={handleChangeNew("address")}
                />
                <Input
                  label="City"
                  field="city"
                  companySettings={newCompany}
                  onChange={handleChangeNew("city")}
                />
                <Input
                  label="State"
                  field="state"
                  companySettings={newCompany}
                  onChange={handleChangeNew("state")}
                />
                <Input
                  label="ZIP Code"
                  field="zipCode"
                  companySettings={newCompany}
                  onChange={handleChangeNew("zipCode")}
                />
                {/* Add more fields as needed */}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-neutral-800 p-6">
              <button
                onClick={() => setShowAddCompanyModal(false)}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                Add Company
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 p-6">
              <h2 className="text-xl font-bold text-white">Update Company</h2>
              <button
                onClick={() => setShowEditCompanyModal(false)}
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Company Name"
                  field="companyName"
                  companySettings={existCompany}
                  onChange={handleChangeExist("companyName")}
                />
                <Input
                  label="Email"
                  field="email"
                  type="email"
                  companySettings={existCompany}
                  onChange={handleChangeExist("email")}
                />
                <Input
                  label="Phone"
                  field="phone"
                  companySettings={existCompany}
                  onChange={handleChangeExist("phone")}
                />
                <Media
                  accept="image/*"
                  onChange={handleFileChange}
                  label="Image"
                />
                <Input
                  label="Website"
                  field="website"
                  type="url"
                  companySettings={existCompany}
                  onChange={handleChangeExist("website")}
                />
                <Input
                  label="Address"
                  field="address"
                  companySettings={existCompany}
                  onChange={handleChangeExist("address")}
                />
                <Input
                  label="City"
                  field="city"
                  companySettings={existCompany}
                  onChange={handleChangeExist("city")}
                />
                <Input
                  label="State"
                  field="state"
                  companySettings={existCompany}
                  onChange={handleChangeExist("state")}
                />
                <Input
                  label="ZIP Code"
                  field="zipCode"
                  companySettings={existCompany}
                  onChange={handleChangeExist("zipCode")}
                />
                {/* Add more fields as needed */}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-neutral-800 p-6">
              <button
                onClick={() => setShowEditCompanyModal(false)}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={onUpdate}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                Update Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyManagement;
