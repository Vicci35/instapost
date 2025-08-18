// !!! ÄNDRA TILL ERAN IP ADRESS + /api/login
const URL = "http://192.168.1.211:3000/api/login";

// Send login credentials to server
export const sendCredentials = async (email: string, pw: string) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: pw }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Oops", data.error || "Something went wrong");
      return null;
    }

    return data;
  } catch (err) {
    console.log("PANIC!", err);
    return null;
  }
};
