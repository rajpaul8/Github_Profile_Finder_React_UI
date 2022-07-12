import { createContext, useReducer } from "react";
import { createRoutesFromChildren } from "react-router-dom";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  // Using useReducer to manage state now
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const initialState = { users: [], user: {}, repos: [], isLoading: false };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Search users using github api
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });
    const { items } = await response.json();

    // dispatch action to useReducer for fetching data
    dispatch({ type: "GET_USERS", payload: items });
  };

  // Clear users from the state
  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS", payload: [] });
  };

  //Set Loading
  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  // Get Single User
  const getUser = async (login) => {
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });

    if (response.status === 404) {
      window.location = "./notfound";
    } else {
      const data = await response.json();
      dispatch({ type: "GET_USER", payload: data });
    }
  };

  // Get User Repositories
  // Sort and get top 10 only
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  const getUserRepository = async (login) => {
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    if (response.status === 404) {
      window.location = "./notfound";
    } else {
      const data = await response.json();
      dispatch({ type: "GET_USER_REPOSITORY", payload: data });
    }
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.loading,
        searchUsers,
        clearUsers,
        user: state.user,
        getUser,
        getUserRepository,
        repos: state.repos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
