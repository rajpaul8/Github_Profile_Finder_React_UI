import axios from "axios";
const key = async () => {
  const res = await fetch(
    "https://api.jsonbin.io/v3/b/62cd9a7f5ecb581b56b78b57/latest"
  );
  const dat = await res.json();
  return dat.record.acc[0].key;
};
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = key();

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

//Search users using github api
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// Get Single User and Repos

export const getUserAndRepos = async (login) => {
  // Promise all takes array of requests to fetch promises
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);
  return { user: user.data, repos: repos.data };
};
