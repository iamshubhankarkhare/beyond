import React, { useState, useEffect } from 'react'
import styles from './Login.module.css'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'


function Login() {
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [redirectTo, setRedirectTo] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("email" + email + " password " + password);
        try {
            const res = await axios.post('/users/login', {
                email: email,
                password: password
            })
            console.log(res);
            if (res.status === 200) {
                setRedirectTo('/dashboard')
                console.log("loggedin");

            }

        } catch (error) {
            console.log(error);

        }

    }

    return (
        redirectTo ? ((<Redirect to={{ pathname: redirectTo }} />)) : (<div>
            <form className={styles.LoginForm} >
                <h2>Login</h2>
                <input type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}></input>
                <input type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={handleSubmit}
                    type="submit">submit</button>
                <span>Dont have an account?</span> <Link to="/users/register"> Sign up!</Link>
            </form>

        </div>)
    )
}

export default Login
