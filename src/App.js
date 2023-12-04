import React from 'react';
import './App.css';
import PatientInfo from './pages/employee/PatientInfo';
import TestData from './TestData.json';
import Layout from './components/Layout';
import {Routes as Switch, Route} from 'react-router-dom';
import Register from './pages/public/Register';
import Login from './pages/public/Login';
import Home from './pages/public/Home';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';
import AllPatients from './pages/employee/AllPatients';
import PatientMessages from './pages/employee/PatientMessages';
import MessageDetails from './pages/employee/MessageDetails';
import RequireAuth from './utils/RequireAuth';
import MyInfo from './pages/patient/MyInfo';
import MyMessageDetails from './pages/patient/MyMessageDetails';
import MyMessages from './pages/patient/MyMessages';
import CreateMessage from './pages/patient/CreateMessage';
import PatientNotes from "./pages/employee/PatientNotes";
import MyNotes from "./pages/patient/MyNotes";
import ActiveMessages from './pages/employee/ActiveMessages';
import CreateEmployee from './pages/employee/CreateEmployee';

function App() {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Switch>
            //public
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />

            //Employee
            <Route element={<RequireAuth allowedRoles={"EMPLOYEE"}/>}>
              <Route path="/patients/all" element={<AllPatients />} />
              <Route path="/messages/active" element={<ActiveMessages />} />
              <Route path="/patient/:id" element={<PatientInfo />} />
              <Route path="/patient/:patientId/messages" element={<PatientMessages />} />
              <Route path="/messages/:messageId" element={<MessageDetails />} />
              <Route path="/patient/:patientId/notes" element={<PatientNotes />} />
              <Route path="/employee" element={<CreateEmployee />} />
              // patient Notes, en knapp "create note"
              // note details
            </Route>

            //Patient
            <Route element={<RequireAuth allowedRoles={"PATIENT"}/>}>
              <Route path="/myinfo/" element={<MyInfo />} />
              <Route path="/mymessages" element={<MyMessages />} />
              <Route path="/mymessages/:messageId" element={<MyMessageDetails />} />
              <Route path="/mymessages/create" element={<CreateMessage />} />
              <Route path="/mynotes/" element={<MyNotes />} />
            </Route>
          </Switch> 
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
}

export default App;
