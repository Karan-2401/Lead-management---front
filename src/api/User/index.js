import api from '../apiInstance'

export const signIn = (data)=>{return api.post('/auth/login',data)}
export const createUser = (data)=>{return api.post('/createuser',data)}
export const getUser = (id)=>{return api.get(`/getusers/${id}`)}
export const updateUser = (data)=>{return api.patch('/updateUser',data)}
export const deleteUser = (id)=>{return api.delete(`/deleteUser/${id}`)}
export const updateProfile = (id,data)=>{return api.patch(`/updateProfile/${id}`,data)}
export const updateProfilePassword = (id,data)=>{return api.patch(`/updateProfilePassword/${id}`,data)}