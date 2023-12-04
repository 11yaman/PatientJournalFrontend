import React, { useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';

const PatientInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const patient = location.state;

  return (
    <div className="container mt-4">
      <table className="table">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{patient.firstName} {patient.lastName}</td>
          </tr>
          <tr>
            <td>Username:</td>
            <td>{patient.email}</td>
          </tr>
          <tr>
            <td>Birth Date:</td>
            <td>{patient.birthDate}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <Link to={`/patient/${id}/notes`} className="btn btn-info me-2">
          Notes
        </Link>
        <Link to={`/patient/${id}/messages`} className="btn btn-info me-2">
          Messages
        </Link>
      </div>
    </div>
  );
};

export default PatientInfo;
