import styles from './login.module.css'
import {useState} from 'react'
import RegisterModal from '../componets/Register.jsx'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [showRegister, setShowRegister] = useState(false)
  const [form, setForm] = useState({email:'', password: ''})

  const handleChange = (e) => {
     setForm({...form, [e.target.name]:e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const res = await fetch('http://localhost:3000/login', {
            method:'POST',
            credentials: 'include',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form)
        })

        const data = await res.json()

        if(!res.ok) {
            console.log(data.msg)
            return
        }
        navigate('/home')

    } catch(err) {
        console.log(err)
    }
    
  }

    return(
        <>
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ex: carlo@gmail.com" />
                <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange} 
                placeholder="your password" />
                <button type="submit">Login</button>
            </form>
            <button type="button" onClick={() => setShowRegister(true)} className={styles.register}>register here</button>
            {showRegister && (
                <RegisterModal onClose={() => setShowRegister(false)}/>
            )}
            </div>
        </div>
        </>
    )
}

export default Login