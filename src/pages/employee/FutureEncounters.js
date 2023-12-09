// FutureEncounters.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useEncounters from "../../hooks/useEncounters";

const FutureEncounters = () => {
  const { employeeId } = useParams();

  const { encounters, loading } = useEncounters(employeeId);
  const [employeeEncounters, setEmployeeEncounters] = useState([]);

  useEffect(() => {
    setEmployeeEncounters(encounters);
  }, [employeeId, encounters]);

  return (
    <div>
      <h1>Future Encounters</h1>
      <hr className="my-4" />
      {loading ? (
        <Spinner splash="Loading Future Encounters..." />
      ) : (
        <div>
          {employeeEncounters.length === 0 ? (
            <h3>No future encounters</h3>
          ) : (
            <div>
              <table className="table table-hover">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">Time</th>
                    <th scope="col">Date</th>
                    <th scope="col">Patient</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {employeeEncounters.map((encounter) => (
                    <tr key={encounter.id}>
                      <td>{new Date(encounter.dateTime).toLocaleTimeString()}</td>
                      <td>{new Date(encounter.dateTime).toLocaleDateString()}</td>
                      <td>{encounter.patient.firstName} {encounter.patient.lastName}</td>
                      <td>
                        <Link to={`/encounters/${encounter.id}`} className="btn btn-info">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FutureEncounters;
