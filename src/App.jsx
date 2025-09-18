import { Route, Routes } from 'react-router-dom'
import Landingpage from './pages/LandingPage'
import LoginPage from './components/Login'
import RegisterPage from './components/Register'
import AdminPanel from './pages/AdminPanel'
const App = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
     <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/admin' element={<AdminPanel/>} />
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
     </Routes>
    </div>
  )
}

export default App
