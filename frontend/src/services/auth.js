import { apiFetch, setAuthToken, removeAuthToken } from "./api";

export const loginAdmin = async (email, password) => {
  const data = await apiFetch("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    setAuthToken(data.token);
  }

  return data;
};

export const logoutAdmin = () => {
  removeAuthToken();
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getCurrentAdmin = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  const data = await apiFetch("/admin/change-password", {
    method: "PATCH",
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  return data;
};
