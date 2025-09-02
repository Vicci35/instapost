export const handleNewPost = async (
  caption: string,
  name: string,
  id: string,
  uri: string | null,
  platform: string
) => {
  let imageBase64: string | null = null;

  if (uri && platform === "web") {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );
    imageBase64 = `data:${blob.type};base64,${base64String}`;
  }

  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.207:3000";

  const response = await fetch(URL + "/posts/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      caption,
      username: name,
      userId: id,
      imageBase64,
    }),
  });

  const data = await response.json();
  console.log("Server response:", data);
  return data;
};
