import React, { useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';

const EmployeeInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const employee = location.state;

  return (
    <div className="container mt-4">
      <table className="table">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{employee.firstName} {employee.lastName}</td>
          </tr>
          <tr>
            <td>Username:</td>
            <td>{employee.email}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <Link to={`/employee/${id}/future-encounters`} className="btn btn-info me-2">
          Future encounters
        </Link>
      </div>
    </div>
  );
};

export default EmployeeInfo;
