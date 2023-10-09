"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation'
import styles from './loginForm.module.scss'

const Login = () => {
  const router = useRouter()

  const baseURL = "http://localhost:5000"

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = async (event) => {
    try {
      //Prevent page reload
      event.preventDefault();
      const { email, pass } = event.target.elements;
      const loginUser = {
        email: email.value,
        password: pass.value
      }

      const response = await axios.post(`${baseURL}/login`, loginUser);
      if (response) {
        const user = response.data;
        
        Cookies.set('token', user.token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsSubmitted(true);
        // router.push("/login-form");
      }
    } catch (error) {
      console.log("Signup failed", error.message);
      setErrorMessages({ name: error.response.data.name , message: error.response.data.message });
      console.log("Server Error Message:", error.response.data.message)
      // toast.error(error.message);
    }

  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>Username </label>
          <input type="email" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className={styles.bn59Wrper}>
          <input className={styles.bn59} type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className={styles.Login}>
      <div className={styles.login_form}>
        <div className={styles.title}>Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login