// Send login credentials to server
export const sendCredentials = async (
  email: string,
  pw: string,
  platform: string
) => {
  // !!! ÄNDRA TILL ERAN IP ADRESS + :3000
  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.140:3000";

  try {
    const response = await fetch(URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: pw, platform: platform }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Oops", data.error || "Something went wrong");
      return null;
    }

    return data.token;
  } catch (err) {
    console.log("PANIC!", err);
    return null;
  }
};

export const fetchUserData = async (
  email: string,
  password: string,
  platform: string
) => {
  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.223:3000";

  try {
    const response = await fetch(URL + "/api/login/userdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        platform: platform,
      }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Oops", data.error || "Something went wrong");
      return null;
    }

    return data.userData;
  } catch (err) {
    console.log("PANIC!", err);
    return null;
  }
};
