import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'


function Dashboard() {


    return (

        <div className={styles.wrapper}>
            <p className={styles.screen} >BEYOND</p>
            <div className={styles.btns}>
                <button className={styles.myBtn}> <Link to="/users/login">Login</Link></button>
                <button className={styles.myBtn} ><Link to="/users/register">Signup</Link></button>

            </div>
        </div>


    )
}

export default Dashboard
