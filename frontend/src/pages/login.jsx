import styles from './login.module.css'
import {useState} from 'react'
import RegisterModal from '../componets/Register.jsx'

function Login() {

  const [showRegister, setShowRegister] = useState(false)
    
    return(
        <>
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Login</h1>
            <form className={styles.form}>
                <input placeholder="ex: carlo@gmail.com" />
                <input placeholder="your password" />
                <button>Login</button>
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