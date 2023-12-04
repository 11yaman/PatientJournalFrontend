import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyInfo = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    setPatient(user);
  }, []); 

  return (
    <div className="container mt-4">
      <h1>My Information</h1>
      {patient ? (
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
      ) : (
        <Spinner splash="Loading Patient Information..." />
      )}
      <div className="mt-4">
        <Link to={`/mynotes`} className="btn btn-info me-2">
          Notes
        </Link>
        <Link to={`/mymessages`} className="btn btn-info me-2">
          Messages
        </Link>
      </div>
    </div>
  );
};

export default MyInfo;
