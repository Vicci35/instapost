export interface User {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const signupUser = async (userData: User) => {
  console.log(userData);
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  console.log("From server:", data);
};
