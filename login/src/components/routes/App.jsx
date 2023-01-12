import React from 'react'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/main" element={<Dashboard />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}


