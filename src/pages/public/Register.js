import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/AuthContext';

const Register = () => {
  const { registerPatient } = useContext(AuthContext);

  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthDate: '', 
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword ||
      !credentials.firstName ||
      !credentials.lastName ||
      !credentials.birthDate
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    if (credentials.confirmPassword !== credentials.password) {
      toast.error('The passwords do not match');
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };
    registerPatient(userData);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={handleSubmit}>
        <h3>Create a patient account</h3>
        <div className="form-group">
          <label htmlFor="firstName" className="form-label mt-4">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={credentials.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label mt-4">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={credentials.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate" className="form-label mt-4">
            Birth Date
          </label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            value={credentials.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label mt-4">
            Confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary my-3" />
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
