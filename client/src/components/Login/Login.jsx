import React, { useState, useEffect } from 'react'
import styles from './Login.module.css'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'


function Login() {
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [redirectTo, setRedirectTo] = useState(null)
    const [error, seterror] = useState('')
    useEffect(() => {
        localStorage.clear('login')
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("email" + email + " password " + password);
        try {
            const res = await axios.post('/users/login', {
                email: email,
                password: password
            })
            console.log(res);

            console.log(res.data.message);
            console.log(res.data.token);

            if (res.data.message) {
                console.log(res.data.message);
                seterror(res.data.message)

            }

            if (res.data.token) {
                localStorage.clear('login')
                localStorage.setItem('login', res.data.token)
                setRedirectTo('/dashboard')
                console.log("loggedin from front");

            }

        } catch (error) {
            console.log(error);

        }

    }

    return (
        redirectTo ? ((<Redirect to={{ pathname: redirectTo }} />)) : (<div className={styles.loginWrapper}>
            <form className={styles.LoginForm} >
                <h2>Login</h2>
                {error && <h4 className={styles.errorh4}>{error}</h4>}
                <input type="text"
                    placeholder="email"
                    value={email}
                    className={styles.loginInput}
                    onChange={(e) => setemail(e.target.value)}></input>
                <input type="text"
                    placeholder="Password"
                    className={styles.loginInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={handleSubmit}
                    type="submit">Login</button>
                <div className={styles.redirect}>
                    <span>Dont have an account?</span> <Link to="/users/register"> Sign up!</Link>

                </div>
            </form>

        </div>)
    )
}

export default Login
