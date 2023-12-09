import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import usePatients from "../../hooks/usePatients";

const AllPatients = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const { patients, loading } = usePatients(searchQuery, searched);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput);
    setSearched(true); 
  };

  return (
    <>
      <div>
        <h1>All Patients</h1>
        <hr className="my-4" />
        <form className="d-flex mb-3" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            className="form-control my-2"
            placeholder="Search Patient By Name or Condition"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-info mx-2">
            Search
          </button>
        </form>

        {loading ? (
          <Spinner splash="Loading Patients..." />
        ) : (
          <>
            {patients.length === 0 ? (
              <h3>No patients found</h3>
            ) : (
              <>
                <p>
                  Total Patients: <strong>{patients.length}</strong>
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
                    {patients.map((patient) => (
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
