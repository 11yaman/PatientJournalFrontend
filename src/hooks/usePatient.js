import { useEffect, useState } from 'react';
import useApi from './useApi';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

const usePatient = (patientId) => {
  const { get, loading, error } = useApi();
  const [patient, setPatient] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (user && user.token) {
          const fetchedPatient = await get(`https://patient-resource-microservice.app.cloud.cbh.kth.se/api/v1/patients/${patientId}`, user.token);

          if (fetchedPatient) {
            setPatient(fetchedPatient);
          } else {
            toast.error(`Error fetching patient with ID ${patientId}`);
          }
        }
      } catch (error) {
        toast.error(`Error fetching patient with ID ${patientId}`);
      }
    };

    fetchPatient();
  }, [patientId, user]);

  return { patient, loading, error };
};

export default usePatient;
