import { Route, Routes } from 'react-router-dom'
import Landingpage from './pages/LandingPage'
import LoginPage from './components/Login'
import RegisterPage from './components/Register'
import AdminPanel from './pages/AdminPanel'
import CourseDetails from './components/CourseDetailsPage'
import ResetPasswordForm from './components/ResetPasswordForm'
const App = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
     <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/admin' element={<AdminPanel/>} />
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/course/:id' element={<CourseDetails/>}/>
      <Route path='/reset-password/:token' element={<ResetPasswordForm/>}/>
     </Routes>
    </div>
  )
}

export default App
