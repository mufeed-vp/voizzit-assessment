"use client"
import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.firstName && formState.lastName && formState.age && formState.salary) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log("formData,",formState);
  };

  // const handleChange = (e) => {
  //   setFormState((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  //   console.log("formData,", formState);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="page">First Name</label>
            <input name="firstName" onChange={handleChange} value={formState.firstName} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Last Name</label>
            <input name="lastName" onChange={handleChange} value={formState.lastName} />
          </div>
          <div className="form-group">
            <label htmlFor="status">Age</label>
            <input type='number' name="age" onChange={handleChange} value={formState.age} />
          </div>
          <div className="form-group">
            <label htmlFor="status">Salary</label>
            <input type='number' name="salary" onChange={handleChange} value={formState.salary} />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};