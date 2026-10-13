
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Login from './pages/login.jsx'
import Home from './pages/Home.jsx'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App