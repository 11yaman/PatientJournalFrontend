import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ToastContext from "../../context/ToastContext";
import usePatients from "../../hooks/usePatients";
import useAuth from "../../hooks/useAuth";

const AllPatients = () => {
  const { patients, loading } = usePatients([]);
  const [allPatients, setAllPatients] = useState(patients);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setAllPatients(patients);
  }, [patients]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = patients.filter((patient) =>
      patient.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setAllPatients(newSearchUser);
  };

  return (
    <>
      <div>
        <h1>All Patients</h1>
        <a href="/patients/all" className="btn btn-danger my-2">
          Reload Patient List
        </a>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Patients..." />
        ) : (
          <>
            {allPatients.length === 0 ? ( // Use 'allPatients' for display
              <h3>No patients found</h3>
            ) : (
              <>
                <form className="d-flex mb-3" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Patient By Name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Search
                  </button>
                </form>

                <p>
                  Total Patients: <strong>{allPatients.length}</strong>
                </p>

                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPatients.map((patient) => (
                      <tr key={patient.id}>
                        <th scope="row">{patient.firstName + " " + patient.lastName}</th>
                        <td>{patient.email}</td>
                        <td>
                          <Link to={`/patient/${patient.id}`} state={patient} className="btn btn-info my-2">
                            Profile
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllPatients;
