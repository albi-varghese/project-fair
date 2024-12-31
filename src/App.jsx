
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import { useContext } from 'react'
import { TokenAuthContext } from './ContextAPI/TokenAuth'

function App() {
const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/projects' element={isAuthorized? <Projects/>:<Home/>}/>
      <Route path='/register' element={<Auth register/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/dashboard' element={isAuthorized? <Dashboard/>:<Home/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>} />
    </Routes>

      <Footer/>
    </>
  )
}

export default App
