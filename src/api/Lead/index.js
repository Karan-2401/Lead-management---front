import api from "../apiInstance";

export const addLead = (data)=>api.post('/lead/add',data)
export const getAllLeads = ()=>api.get('/lead/getAllLeads')
export const getLeadsEmployee = (id)=>api.get(`/lead/getAllLeads${id}`)
export const updatelead = (data)=>api.put('/lead/updateLead',data)
export const updateleademp = (data)=>api.put('/lead/updateLeadEmp',data)
export const deleteLead = (id)=>api.delete(`/lead/deleteLead/${id}`)
export const getAllLeadEmp = (id)=>{return api.get(`/lead/getAllLeadEmp/${id}`)}