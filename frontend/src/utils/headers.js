const token = localStorage.getItem("accessToken");

export const headers = {
  token: `Bearer ${token}`,
};
