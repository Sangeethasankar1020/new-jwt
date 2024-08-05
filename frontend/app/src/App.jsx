
import './App.css'
import Registration from './Registration'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'


function App() {
  const isAuthenticated = () => {
    // Check if access token exists in cookies
    return document.cookie.includes('accessToken');
};

return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/api/register' element={<Registration />} />
                <Route path='/api/login' element={<Login />} />
                <Route path='/api/dashboard' element={isAuthenticated() ? <Dashboard /> : <Navigate to="/api/login" />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
