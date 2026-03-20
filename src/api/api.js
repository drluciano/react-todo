const API_URL = "http://localhost:8000";

export const getUsers = async () => {
  return await fetch(`${API_URL}/users`).then((res) => res.json());
};

export const newUser = async (name, email, pin, avatarSeed) => {
  await fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      pin,
      avatarSeed,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const getTasks = async (userId) => {
  return await fetch(`${API_URL}/tasks?id=${userId}`).then((res) => res.json());
};

export const getTypes = async () => {
  return await fetch(`${API_URL}/types`).then((res) => res.json());
};

export const getSubtypes = async () => {
  return await fetch(`${API_URL}/subtypes`).then((res) => res.json());
};

export const newTask = async (
  task,
  userId,
  typeId,
  subtypeId,
  completed,
  completedById,
  lastUpdated,
  archived,
) => {
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify({
      task,
      userId,
      typeId,
      subtypeId,
      completed,
      completedById,
      lastUpdated,
      archived,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
