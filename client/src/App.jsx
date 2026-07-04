import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import OwnerDashboard from './Pages/owner/OwnerDashboard'
import AdminDashboard from './Pages/admin/AdminDashboard'
import Users from './Pages/admin/Users'
import UserDashboard from './Pages/user/UserDashboard'
import Stores from './Pages/admin/Stores'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/owner' element={<OwnerDashboard/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/user' element={<UserDashboard/>}/>
      <Route path="/admin/users" element={<Users/>}/>
       <Route path="/admin/stores" element={<Stores/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
