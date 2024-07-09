const baseUrl = "http://localhost:3030/jsonstore/users";

export const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    const result = await response.json();
    const users = Object.values(result);

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};
