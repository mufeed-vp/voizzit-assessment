"use client"
import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios'

import "./App.css";
import { Table } from '@/components/table';
import { Modal } from "@/components/modal";

const DarshBoard = () => {

  const baseURL = 'http://localhost:5000/dashboard'
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [userRole, setUserRole] = useState("")

  const getUserDetails = () => {
    try {
        axios.get(`${baseURL}`)
      .then( res => {
        setRows(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserDetails()
    const user = JSON.parse(localStorage.getItem("user"))
    setUserRole(user.role)
    // deteleUserDetails()
  },[])

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (userId,targetIndex) => {
    try {
      axios.delete(`${baseURL}`,{data:userId})
      .then( res => {
        setRows(rows.filter((_, idx) => idx !== targetIndex));
      })
    } catch (error) {
      console.log(error)
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    try {
      axios.put("http://localhost:5000/dashboard",newRow)
      .then( res => {
        setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;
            return newRow;
          })
        );
      })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="App">
      <Table rows={rows} role={userRole} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      {/* <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button> */}
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default DarshBoard
