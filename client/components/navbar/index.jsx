"use client"
import React from 'react'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.scss"

const Navbar = () => {
    const router = useRouter();
    const logOut = () => {
        Cookies.remove("token");
        router.push('/');
      };

    return (
      <div className={styles.header_wrapper}>
        <div className={styles.logo}>
          <a href="/" className={styles.brand}>LOGO</a>
        </div>
        <div className={styles.nav_wrapper}>
          <nav className={styles.navigation}>
            <ul className={styles.flexList}>
              <li><a href="/">Login</a></li>
              <li><a href="/sign-up">Signup</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li onClick={logOut} className={styles.bn59}>Logout</li>
            </ul>
          </nav>
        </div>
      </div>
    );
};
  

export default Navbar