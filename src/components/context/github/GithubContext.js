import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  // Using useReducer to manage state now
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const initialState = { users: [], isLoading: false };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Fetch users from github api
  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`);
    const data = await response.json();
    // dispatch action to useReducer for fetching data
    dispatch({ type: "GET_USERS", payload: data });
  };

  //Set Loading 
  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };
  return (
    <GithubContext.Provider
      value={{ users: state.users, isLoading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;