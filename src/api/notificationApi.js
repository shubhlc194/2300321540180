const BASE_URL =
  "http://20.244.56.144/evaluation-service/notifications";

export const fetchNotifications = async (
  type = ""
) => {
  const token =
    localStorage.getItem("token");

  let url = BASE_URL;

  if (type) {
    url += `?type=${type}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":
        "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch notifications"
    );
  }

  return response.json();
};