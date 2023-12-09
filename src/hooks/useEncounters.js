// useEncounters.js
import { useEffect, useState } from "react";
import useApi from "./useApi";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const useEncounters = (employeeId) => {
  const { get, loading, error } = useApi();
  const [encounters, setEncounters] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEncounters = async () => {
      try {
        if (user && user.token) {
          const fetchedEncounters = await get(
            `http://localhost:8082/api/v1/employees/${employeeId}/future_encounters`,
            user.token
          );
          if (fetchedEncounters) {
            setEncounters(fetchedEncounters);
          } else {
            toast.error("Error fetching future encounters");
          }
        }
      } catch (error) {
        toast.error("Error fetching future encounters");
      }
    };

    fetchEncounters();
  }, [user, employeeId]);

  return { encounters, loading, error };
};

export default useEncounters;
