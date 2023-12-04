import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useMessages from "../../hooks/useMessages";

const Messages = () => {
  const { patientId } = useParams();

  const { messages, loading } = useMessages('patient', patientId); 
  const [patientMessages, setPatientMessages] = useState([]);

  useEffect(() => {
    setPatientMessages(messages);
  }, [patientId, messages]);
    
  return (
    <div>
      <h1>Messages for Patient</h1>
      <Link to="/patients/all" className="btn btn-danger my-2">
        Back to All Patients
      </Link>
      <hr className="my-4" />
      {loading ? (
        <Spinner splash="Loading Messages..." />
      ) : (
        <div>
          {patientMessages.length === 0 ? (
            <h3>No patientMessages for this patient</h3>
          ) : (
            <div>
              <table className="table table-hover">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">Content</th>
                    <th scope="col">Date & Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Replies</th>
                    <th scope="col"></th>

                  </tr>
                </thead>
                <tbody>
                  {patientMessages.map((message) => (
                    <tr key={message.id}>
                      <td>{message.content}</td>
                      <td>{new Date(message.dateTime).toLocaleString()}</td>
                      <td>{message.status}</td>
                      <td>
                        <Link to={`/messages/${message.id}`} className="btn btn-info">
                          Replies
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={console.log("Archived")}
                        >
                          Archive
                        </button>
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

export default Messages;