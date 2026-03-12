import api from "../apiInstance";

export const createCompany = (data)=> { return api.post('/company/createCompany',data)}
export const getCompany = (id)=>{ return api.get(`/company/getCompany/${id}`)}
export const updateCompany = (id,data)=>{return api.patch(`/company/updateCompany/${id}`,data)}
