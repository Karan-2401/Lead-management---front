import api from '../apiInstance'

export const signIn = (data)=>{return api.post('/auth/login',data)}
export const createUser = (data)=>{return api.post('/createuser',data)}
export const getUser = ()=>{return api.get('/getusers')}
export const updateUser = (data)=>{return api.patch('/updateUser',data)}
export const deleteUser = (id)=>{return api.delete(`/deleteUser/${id}`)}