import React, { useContext } from 'react'
import AdminLead from '../Component/adminLead'
import EmployeeLeadsPage from '../Component/employeLead'
import { DataContext } from '../dataContext'
const LeadsPage = () => {
  const Data = useContext(DataContext)
  return (
    <>
     {Data.Data.profile.role == 'Admin' ? <AdminLead/> : <EmployeeLeadsPage/>}
    </>
  )
}

export default LeadsPage