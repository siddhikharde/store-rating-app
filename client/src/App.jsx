import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import OwnerDashboard from './Pages/owner/OwnerDashboard'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/owner' element={<OwnerDashboard/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
