import { useEffect, useState } from 'react';
import useApi from './useApi';
import useAuth from './useAuth';
import { toast } from 'react-toastify';

const useNotes = (patientId, token) => {
  const { get, loading, error } = useApi();
  const [notes, setNotes] = useState([]);

  const {user} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.token) {
          let url = 'http://localhost:8083/api/v1/patients/notes/list';
          
          if (patientId !== null && patientId !== undefined) {
              url += `?patientId=${patientId}`;
          }
  
          const fetchedNotes = await get(
              url,
              user.token
          );

          if (fetchedNotes) {
            setNotes(fetchedNotes);
          } else {
            toast.error('Error fetching patient notes');
          }
        }
      } catch (apiError) {
        toast.error('Error fetching patient notes');
      }
    };

    fetchData();
  }, [patientId, user]);

  return { notes, loading };
};

export default useNotes;
