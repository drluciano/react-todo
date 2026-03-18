const API_URL = "http://localhost:8000";

export const getUsers = async () => {
  return await fetch(`${API_URL}/users`).then((res) => res.json());
};

export const newUser = async (name, email) => {
  await fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
