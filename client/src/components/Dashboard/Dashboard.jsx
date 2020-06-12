import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import styles from './Dashboard.module.css'


function Dashboard() {
    return (
        (localStorage.getItem('login') === null) ? (alert('Login to view dashboard'), <Redirect to={{ pathname: '/users/login' }} />) : (<div className={styles.wrapper}>
            <h1>Beyond dashboard</h1>
            <button className={styles.myBtn}
                onClick={() => localStorage.clear('login')}>
                <Link to="/users/login" >Logout</Link>
            </button>
        </div>)

    )
}

export default Dashboard
