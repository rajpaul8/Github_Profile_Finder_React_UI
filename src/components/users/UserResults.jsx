import React from "react";
import { useContext, useEffect } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "../UserItem";
import GithubContext from "../context/github/GithubContext";

function UserResults() {
  const { users, isLoading, fetchUsers } = useContext(GithubContext);
  //  Loading the data once fetched from the api:
  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grids-cols-2">
        {users.map((user) => {
          return <UserItem user={user}></UserItem>;
        })}
      </div>
    );
  }
}
export default UserResults;
