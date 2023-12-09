import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useEmployees from "../../hooks/useEmployees";

const AllEmployees = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false); 

  const { employees, loading } = useEmployees(searchQuery, searched);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput);
    setSearched(true);
  };

  const handleCreateEmployee = () => {
  };

  return (
    <>
      <div>
        <h1>All Employees</h1>
        <hr className="my-4" />
        <form className="d-flex mb-3" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            className="form-control my-2"
            placeholder="Search Employee By Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-info mx-2">
            Search
          </button>
          <Link to="/employees/create" className="btn btn-success">
            Create new
            </Link>
        </form>

        {loading ? (
          <Spinner splash="Loading Employees..." />
        ) : (
          <>
            {employees.length === 0 ? (
              <h3>No employees found</h3>
            ) : (
              <>
                <p>
                  Total Employees: <strong>{employees.length}</strong>
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
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <th scope="row">{employee.firstName + " " + employee.lastName}</th>
                        <td>{employee.email}</td>
                        <td>
                          <Link to={`/employee/${employee.id}`} state={employee} className="btn btn-info my-2">
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

export default AllEmployees;
