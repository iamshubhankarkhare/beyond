import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'


function Dashboard() {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/users/login">Login</Link>
            <Link to="/users/register">Signup</Link>


        </div>
    )
}

export default Dashboard
