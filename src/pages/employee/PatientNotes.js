import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import useNotes from "../../hooks/useNotes";
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';

const Notes = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();    
    
    const { notes : patientNotes, loading } = useNotes(patientId);
    const {post} = useApi();
    const {user} = useAuth();

    const [notes, setNotes] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        setNotes(patientNotes)
    }, [patientId, patientNotes]);

    const handleCreateNote = async () => {
        if (!text) {
          toast.error('Please fill in requierd field');
          return;
        }
        try{
          const result = await post(`http://localhost:8083/api/v1/patients/${patientId}/notes`, {text : text}, user.token);    
          if (result) {
            toast.success('Note created successfully');
            setText("");
            
            setNotes((prevNotes) => [...prevNotes, result]);
            navigate(`/patient/${patientId}/notes`);
          } else {
            toast.error('Error creating note');
          }
        } catch (err) {
            toast.error('Error creating note')
        }
      };

    const renderNotes = (note) => (
        <div key={note.id} className='ml-3 bg-light p-3 rounded mb-3'>
            <p>
                Written by: {note.employee.firstName} {note.employee.lastName} ({note.employee.email})
            </p>
            <p>{note.text}</p>
            {note.encounter && (
                <p>
                    Encounter: {note.encounter.toLocaleString()}
                </p>
            )}
            <p>Created at: {new Date(note.dateTimeCreated).toLocaleString()}</p>
        </div>
    );

    return (
        <div>
            <h1>Notes for patient</h1>
            <div className="mt-3">
                <input type="text" 
                placeholder="Type new note" 
                className="form-control" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <button className="btn btn-primary my-3" onClick={handleCreateNote}>
                    New Note
                </button>
            </div>
            {loading ? (
                <Spinner splash="Loading Note Details..." />
            ) : (
                <div>
                    {notes.map((note) => renderNotes(note))}
                </div>
            )}
        </div>
    );
};

export default Notes;
