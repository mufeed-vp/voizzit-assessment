"use client"
import React, { useState } from "react";
// import axios from '@/config/api'
import axios from "axios"
import styles from './signUp.module.scss'

const Signup = () => {

  const baseURL = "http://localhost:5000"
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Signup info
  const [inputField , setInputField] = useState(null)

  const errors = {
    fname: "Please enter your first name",
    lname: "Please enter your last name",
    age: "Please enter your age",
    email: "Please enter a valid email address",
    pass: "Please enter a password",
  };

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    const { fname, lname, age, email, pass } = event.target.elements;

    setInputField({
        firstName: fname.value,
        lastName: lname.value,
        age: age.value,
        email: email.value,
        password: pass.value,
      });

    // Validate form fields
    if (!fname.value.trim()) {
      setErrorMessages({ name: "fname", message: errors.fname });
    } else if (!lname.value.trim()) {
      setErrorMessages({ name: "lname", message: errors.lname });
    } else if (!age.value.trim()) {
      setErrorMessages({ name: "age", message: errors.age });
    } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      setErrorMessages({ name: "email", message: errors.email });
    } else if (!pass.value.trim()) {
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      // Create a new user object
      const newUser = {
        firstName: fname.value,
        lastName: lname.value,
        age: age.value,
        email: email.value,
        password: pass.value,
      };

      // Signup successful
      try {
        // setLoading(true);
        const response = await axios.post(`${baseURL}/signup`, newUser);
        console.log("Signup success", response.data);
        setIsSubmitted(true);
        // router.push("/login-form");
        
    } catch (error) {
        console.log("Signup failed", error.message);
        
        // toast.error(error.message);
    }
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

  // JSX code for signup form
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>First Name</label>
          <input type="text" name="fname" required />
          {renderErrorMessage("fname")}
        </div>
        <div className={styles.input_container}>
          <label>Last Name</label>
          <input type="text" name="lname" required />
          {renderErrorMessage("lname")}
        </div>
        <div className={styles.input_container}>
          <label>Age</label>
          <input type="number" name="age" required />
          {renderErrorMessage("age")}
        </div>
        <div className={styles.input_container}>
          <label>Email</label>
          <input type="email" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className={styles.input_container}>
          <label>Password</label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className={styles.bn59Wrper}>
          <input className={styles.bn59} type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );

  return (
    <div className={styles.Signup}>
      <div className={styles.signup_form}>
        <div className={styles.title}>Sign Up</div>
        {isSubmitted ? <div>Sign up successful!</div> : renderForm}
      </div>
    </div>
  );
}

export default Signup;
