import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'


function Dashboard() {
    return (
        <div>
            <h1>dashboard</h1>
            <Link to="/users/login">Logout</Link>
        </div>
    )
}

export default Dashboard
