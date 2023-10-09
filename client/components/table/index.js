"use client"
import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, role, deleteRow, editRow }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = rows.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(0);
  }, [rows]);

  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
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
          {currentData.map((row, idx) => {
            const rowNumber = startIndex + idx + 1;
            return (
              <tr key={idx}>
                <td>{rowNumber}</td>
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
                    </span>
                  </td> : ""
                }
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="paginationBtn">
        <div>
          <button className="previosBtn, btn" onClick={previousPage} disabled={currentPage === 0}>
            Previous
          </button>
        </div>
        <div>
          <button className="nextBtn, btn" onClick={nextPage} disabled={currentPage === totalPages - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};