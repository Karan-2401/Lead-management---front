import React, { useContext } from 'react'
import AdminDashboard from '../Component/adminDashboard'
import EmployeeDashboard from '../Component/employeDashboard'
import { DataContext } from '../dataContext'
const Dashboard = () => {
  const Data = useContext(DataContext)
  return (
   <>
   {Data?.Data && Data.Data.profile.role == 'Admin' ? <AdminDashboard/> : <EmployeeDashboard/>}
   </>
  )
}

export default Dashboard