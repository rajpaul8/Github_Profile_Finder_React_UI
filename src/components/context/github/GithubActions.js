const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
//Search users using github api
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  const { items } = await response.json();
  return items;
};

// Get Single User
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });

  if (response.status === 404) {
    window.location = "./notfound";
  } else {
    const data = await response.json();
    return data;
  }
};


// Get User Repositories
// Sort and get top 10 only
const params = new URLSearchParams({
  sort: "created",
  per_page: 10,
});
export const getUserRepository = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });

  if (response.status === 404) {
    window.location = "./notfound";
  } else {
    const data = await response.json();
    return data;
  }
};
