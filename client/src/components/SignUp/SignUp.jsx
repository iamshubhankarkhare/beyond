import React, { useState } from 'react'
import styles from './SignUp.module.css'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'


function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, seterror] = useState([])


    const [redirectTo, setRedirectTo] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("username" + username + " password " + password);
        try {
            const res = await axios.post('/users/register', {
                name: username,
                password: password,
                password2: conPassword,
                email: email
            })

            if (res.data.errors) {
                seterror(res.data.errors)
            }
            console.log(error);

            if (res.status === 200 && res.data.errors === undefined) {
                setRedirectTo('/users/login')
                console.log("signedup");

            }

        } catch (error) {
            console.log(error);

        }

    }
    return (
        redirectTo ? (<Redirect to={{ pathname: redirectTo }} />
        ) : (<div className={styles.loginWrapper}>
            <form className={styles.LoginForm} >
                <h2>Sign Up</h2>
                {error && error.map((e, i) => <div key={i}><h4 className={styles.errorh4}>{e.msg}</h4></div>)}
                <input type="email"
                    placeholder="email"
                    value={email}
                    className={styles.loginInput}
                    onChange={(e) => setEmail(e.target.value)}></input>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    className={styles.loginInput}
                    onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password"
                    placeholder="Password"
                    value={password}
                    className={styles.loginInput}
                    onChange={(e) => setPassword(e.target.value)}></input>
                <input type="password"
                    placeholder="Confirm Password"
                    value={conPassword}
                    className={styles.loginInput}
                    onChange={(e) => setConPassword(e.target.value)}></input>
                <button onClick={handleSubmit}
                    type="submit">submit</button>
                <div className={styles.redirect}>
                    <span>Already have an account?</span> <Link to="/users/login"> Login!</Link>

                </div>
            </form>

        </div>)

    )
}

export default SignUp
