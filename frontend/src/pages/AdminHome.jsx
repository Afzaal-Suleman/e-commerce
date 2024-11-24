import React from 'react'
import AdminProductList from '../features/admin/components/adminProductList/AdminProductList'
import Navbar from '../features/navbar/Navbar'

const AdminHome = () => {
  return (
    <Navbar> 
        <AdminProductList/> 
    </Navbar>
  )
}

export default AdminHome