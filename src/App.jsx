import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import { CheckSession } from './services/Auth'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <NavBar user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
