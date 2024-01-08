import { useEffect, useState } from 'react';
import useApi from './useApi';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

const useEmployees = (searchQuery, searched) => {
  const { get, loading, error } = useApi();
  const [employees, setEmployees] = useState([]);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searched && user && user.token) {
          const fetchedEmployees = await get(`https://searching-microservice.app.cloud.cbh.kth.se/api/v1/employees/search?q=${searchQuery}`, user.token);
          if (fetchedEmployees) {
            setEmployees(fetchedEmployees);
          } else {
            toast.error("Error fetching employees");
          }
        }
      } catch (error) {
        toast.error('Error fetching employees');
      }
    };

    fetchData();
  }, [user, searched, searchQuery]);

  return { employees, loading, error };
};

export default useEmployees;
