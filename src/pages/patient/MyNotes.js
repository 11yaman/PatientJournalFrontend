import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import useNotes from "../../hooks/useNotes";
import useAuth from '../../hooks/useAuth';

const NoteDetails = () => {
    const {user} = useAuth();

    const { notes : myNotes, loading } = useNotes(user.id);
    const [notes, setMyNotes] = useState([]);

    useEffect(() => {
        setMyNotes(myNotes)
    }, [user, myNotes]);

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

export default NoteDetails;
