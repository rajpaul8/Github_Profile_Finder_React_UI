import React from "react";
import { useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
function UserResults() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //  Loading the data once fetched from the api:
  useEffect(() => {
    fetchUsers();
  }, []);

  //Fetch users from github api
  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`);
    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grids-cols-2">
        {users.map((user) => {
          return <h3>{user.login}</h3>;
        })}
      </div>
    );
  }
}
export default UserResults;
