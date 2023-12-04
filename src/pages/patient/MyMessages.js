import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useAuth from "../../hooks/useAuth";
import useMessages from "../../hooks/useMessages";

const MyMessages = () => {
  const { user } = useAuth();
  
  const { messages : myMessages, loading } = useMessages('patient', user.id); 
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(myMessages);
  }, [myMessages]);

  return (
    <div>
      <h1>My messages</h1>
      <Link to="/mymessages/create" className="btn btn-success mb-3">
        New Message
      </Link>
      <hr className="my-4" />

      {loading ? (
        <Spinner splash="Loading Messages..." />
      ) : (
        <div>
          {messages.length === 0 ? (
            <h3>No messages yet</h3>
          ) : (
            <div>
              <table className="table table-hover">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">Content</th>
                    <th scope="col">Date & Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Replies</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message.id}>
                      <td>{message.content}</td>
                      <td>{new Date(message.dateTime).toLocaleString()}</td>
                      <td>{message.status}</td>
                      <td>
                        <Link to={`/mymessages/${message.id}`} className="btn btn-info">
                          Replies
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
  
  export default MyMessages;