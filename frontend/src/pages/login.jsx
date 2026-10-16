import styles from './login.module.css'
import {useState} from 'react'
import RegisterModal from '../componets/Register.jsx'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [showRegister, setShowRegister] = useState(false)
  const [form, setForm] = useState({email:'', password: ''})
  const [error, setError] = useState('')
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
            setError(data.msg)
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
                <div className={styles.title}>
                    <h1>Notes System</h1><span>Sign in access your notes</span>
                    </div>
                
            <div className={styles.formContainer}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label>EMAIL ADDRESS</label>
                <input 
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ex: carlo@gmail.com" />
               <label>PASSWORD</label>
                <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange} 
                placeholder="your password" />
                <div className={styles.err}>{error}</div>
                <button type="submit">Login</button>
            </form>
            </div>
             <footer className={styles.footer}>
               <p>Don't have an account?</p>
               <a type="button" onClick={() => setShowRegister(true)} className={styles.register}>register here</a>
             </footer>
            {showRegister && (
                <RegisterModal onClose={() => setShowRegister(false)}/>
            )}
            </div>
        </div>
        </>
    )
}

export default Login