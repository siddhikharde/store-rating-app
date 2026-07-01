import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import OwnerDashboard from './Pages/owner/OwnerDashboard'
import AdminDashboard from './Pages/admin/AdminDashboard'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/owner' element={<OwnerDashboard/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
