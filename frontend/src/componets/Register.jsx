import {useState, useEffect} from 'react'
import { createPortal } from 'react-dom'
import styles from './register.module.css'

function RegisterModal({onClose}) {

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    const [form, setForm] = useState({email:'', password:''})
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(form)
            })
            const data = await res.json()
            
            if(!res.ok) { 
                console.log(data.errors.msg)
                data.errors.forEach((er) =>
                   setError(er.msg)
                )
                
            }
                setForm({email: '', password: ''});
        }catch(err) {
            console.log(err)
        }
        
    }
    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
           <div className={styles.title}>
            <h2>Create an account</h2>
            <p>Start taking notes in your personal workspace</p>
            </div>
           <form className={styles.form} onSubmit={handleSubmit}>
            <label>EMAIL ADDRESS</label>
           <input 
           type="email"
           name="email"
           value={form.email}
           onChange={handleChange}
            placeholder="ex: carlo@gmail.com"/>
            <label>PASSWORD</label>
           <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"/>
            <div className={styles.error}>{error}</div>
           <button type="submit">register</button>
           </form>
           {/* register form dito */}
          <button type="button" onClick={onClose}>Close</button>
         </div>
        </div>,
        document.body
    )
}

export default RegisterModal