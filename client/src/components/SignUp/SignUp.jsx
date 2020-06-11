import React, { useState, useEffect } from 'react'
import styles from './SignUp.module.css'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'


function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [email, setEmail] = useState('')


    const [redirectTo, setRedirectTo] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("username" + username + " password " + password);
        try {
            const res = await axios.post('http://localhost:5000/users/register', {
                name: username,
                password: password,
                password2: conPassword,
                email: email
            })
            console.log(res);
            if (res.status === 200 && res.error === undefined) {
                setRedirectTo('/users/login')
                console.log("signedup");

            }

        } catch (error) {
            console.log(error);

        }

    }
    return (
        redirectTo ? (<Redirect to={{ pathname: redirectTo }} />
        ) : (<div>
            <form className={styles.LoginForm} >
                <h2>Sign Up</h2>

                <input type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}></input>
                <input type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                <input type="text"
                    placeholder="Password"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}></input>
                <button onClick={handleSubmit}
                    type="submit">submit</button>
                <span>Already have an account?</span> <Link to="/users/login"> Login!</Link>
            </form>

        </div>)

    )
}

export default SignUp
