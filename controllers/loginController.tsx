export const sendCredentials = async (
  email: string,
  pw: string,
  platform: string
) => {
  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.198:3000";

  try {
    const response = await fetch(URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: pw, platform }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Oops", data.error || "Something went wrong");
      return null;
    }

    return { token: data.token, userData: data.userData };
  } catch (err) {
    console.log("PANIC!", err);
    return null;
  }
};
