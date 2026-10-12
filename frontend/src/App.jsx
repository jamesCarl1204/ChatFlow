
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Login from './pages/login.jsx'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App