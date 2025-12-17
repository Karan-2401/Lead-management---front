import api from "../apiInstance";

export const addLead = (data)=>api.post('/lead/add',data)
export const getAllLeads = ()=>api.get('/lead/getAllLeads')
export const getLeadsEmployee = (id)=>api.get(`/lead/getAllLeads${id}`)