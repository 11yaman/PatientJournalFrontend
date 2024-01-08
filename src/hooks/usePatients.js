import { useEffect, useState } from 'react';
import useApi from './useApi';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

const usePatients = (searchQuery, searched) => {
  const { get, loading, error } = useApi();
  const [patients, setPatients] = useState([]);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searched && user && user.token) {
          const fetchedPatients = await get(`https://searching-microservice.app.cloud.cbh.kth.se/api/v1/patients/search?q=${searchQuery}`, user.token);
          if (fetchedPatients) {
            setPatients(fetchedPatients);
          } else {
            toast.error("Error fetching patients");
          }
        }
      } catch (error) {
        toast.error('Error fetching patients');
      }
    };

    fetchData();
  }, [user, searched, searchQuery]);

  return { patients, loading, error };
};

export default usePatients;
