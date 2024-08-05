
import './App.css'
import Registration from './Registration'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'
import Cookies from 'js-cookie';


function App() {
  const isAuthenticated = () => {
    const token = Cookies.get('accessToken');
    console.log('Token:', token);
  return token;
};

return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/api/register' element={<Registration />} />
                <Route path='/api/login' element={<Login />} />
                <Route path='/api/dashboard' element={isAuthenticated() ? <Dashboard /> : <Navigate to="/api/dashboard" />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
