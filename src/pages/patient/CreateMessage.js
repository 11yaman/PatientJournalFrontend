import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const CreateMessage = () => {
  const { post, loading, error } = useApi();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!content) {
      toast.error('Please fill in requierd field');
      return;
    }
    try{
      console.log(user.token);
      const result = await post("https://patient-resource-microservice.app.cloud.cbh.kth.se/api/v1/messages", {content: content}, user.token);
      console.log(result);

      if (result) {
        toast.success('Message sent successfully');
        navigate('/mymessages');
      } else {
        toast.error('Error sending message');
      }
    } catch (err) {
        toast.error('Error sending message')
    }
  };

  return (
    <div>
      <h1>New Message</h1>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Message Content:
        </label>
        <textarea
          id="content"
          className="form-control"
          rows="5"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default CreateMessage;
