"use client"
import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, role, deleteRow, editRow }) => {
  
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Page</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Salary</th>
            {role !== "user"?
              <th>Action</th> : ""
            }
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.age}</td>
                <td>{row.email}</td>
                <td>{row.salary}</td>
                {role !=="user"?
                  <td className="fit">
                    <span className="actions">
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow({_id:row._id},idx)}
                      />
                      <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => editRow(idx)}
                      />
                    </span>:
                  </td> : ""
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};