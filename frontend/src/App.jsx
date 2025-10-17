import React from 'react'
import Home from './Home'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App