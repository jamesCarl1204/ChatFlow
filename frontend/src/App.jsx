
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Login from './pages/login.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App