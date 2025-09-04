export const refreshUserData = async (
  platform: string,
  userID: string | null
) => {
  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.207:3000";

  const response = await fetch(URL + "/api/users/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID }),
  });

  const data = await response.json();
  console.log(data);
  return data.user;
};
