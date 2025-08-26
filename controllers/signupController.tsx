export interface User {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const signupUser = async (userData: User, platform: string) => {
  // !!! ÄNDRA TILL ERAN IP ADRESS + :3000
  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.140:3000";

  const response = await fetch(URL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
};
