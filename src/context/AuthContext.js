import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ToastContext from "./ToastContext";
import useApi from "../hooks/useApi"; 

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const { get, post, loading, error } = useApi();  

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const getErrorMessage = (status) => {
    switch (status) {
      case 401:
        return "Incorrect user ID or password";
      case 403:
        return "Access Denied";
      case 404:
        return "Not found";
      case 406:
        return "Invalid input data";
      case 409:
        return "Already exists";
      default:
        return "An error occurred";
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.token) {
        const result = await get("http://vm.cloud.cbh.kth.se:2533/realms/fullstack/protocol/openid-connect/userinfo", storedUser.token);

        if (result) {
          const filteredUser = {
            role: getRoleFromRoles(result.realm_access.roles),
            name: result.name,
            username: result.preferred_username,
            given_name: result.given_name,
            family_name: result.family_name,
            email: result.email,
            token:storedUser.token
          };

          if (
            location.pathname === "/login" ||
            location.pathname === "/register"
          ) {
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 500);
          } else {
            navigate(location.pathname ? location.pathname : "/");
          }
          result.token = storedUser.token;
          localStorage.setItem("user", JSON.stringify(filteredUser));
          setUser(filteredUser);
        } else {
          navigate("/login", { replace: true });
        }
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = async ({ username, password }) => {
    try {
      const requestBody = {
        client_id: "patient-system",
        client_secret: "rs8f8zrvYixHAqH9RrlerYti2X4OA4By",
        grant_type: "password",
        username,
        password,
      };
  
      const result = await post("http://vm.cloud.cbh.kth.se:2533/realms/fullstack/protocol/openid-connect/token",
        requestBody,
        null,
        {},
        'application/x-www-form-urlencoded'
      );

      if (result && result.access_token) {
        localStorage.setItem("user", JSON.stringify({ token: result.access_token }));

        setUser({ token: result.access_token }); 

        toast.success(`Logged in`);

        navigate(location.state?.from?.pathname || "/", { replace: true });
      } else {
        const errorMessage = getErrorMessage(401);
        toast.error(errorMessage);
      }
    } catch (err) {
      toast.error(getErrorMessage(err.response.status));
    }
    checkUserLoggedIn();
  };

  //TODO move from here
  const registerPatient = async (userData) => {
    try {
      const result = await post("http://localhost:8083/api/v1/patients/register", userData);

      if (result) {
        localStorage.setItem("user", JSON.stringify(result));
        setUser(result);
        toast.success("User registered successfully!");

        navigate("/login", { replace: true });
      } else {
        toast.error("An error occurred");
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err.response.status);
      toast.error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        await post("http://vm.cloud.cbh.kth.se:2533/realms/fullstack/protocol/openid-connect/logout", 
          null,
          {},
          'application/x-www-form-urlencoded'
        );
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
        toast.success("Logged out successfully");
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err.response.status);
      toast.error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, registerPatient, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const getRoleFromRoles = (roles) => {
  if (roles.includes("PATIENT")) {
    return "PATIENT";
  } else if (roles.includes("EMPLOYEE")) {
    return "EMPLOYEE";
  } else if (roles.includes("ADMIN")) {
    return "ADMIN";
  } else {
    return null;
  }
};

export default AuthContext;