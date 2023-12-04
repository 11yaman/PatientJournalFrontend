import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';

const CreateEmployee = () => {
    const { post, loading, error } = useApi();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        position: 'OTHER',
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
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

        try{
            const userData = { ...credentials, confirmPassword: undefined };
            const result = await post("http://localhost:8082/api/v1/employees/create", userData, user.token);

            if (result) {
                toast.success('New employee created');
                navigate('/');
            } else {
                toast.error('Error creating employee');
            }
        } catch (err) {
            toast.error('Error creating employee')
        }
    };

    return (
        <>
            <ToastContainer autoClose={2000} />
            <form onSubmit={handleSubmit}>
                <h3>Create a new employee account</h3>
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
                        type="username" //edit later to email
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
                <div className='form-group'> 
                    <label htmlFor='position' className='form-label mt-4'>
                        Position
                    </label>
                    <select
                        id="position"
                        name="position"
                        className="form-select"
                        value={credentials.position}
                        onChange={handleChange}
                        >
                        <option value="OTHER">Other</option>
                        <option value="DOCTOR">Doctor</option>
                    </select>
                </div>
                <input type="submit" value="Create" className="btn btn-primary my-3" />
            </form>
        </>
    );
};

export default CreateEmployee;