/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line prefer-destructuring
const API_URL = process.env.API_URL;

export async function fetchPOST(endpoint, body) {
  const url = API_URL + endpoint;
  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await rawResponse.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
