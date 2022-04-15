/* eslint-disable no-undef */
/* eslint-disable no-console */
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
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchGET(endpoint) {
  const url = API_URL + endpoint;
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPATCH(endpoint, body) {
  const url = API_URL + endpoint;
  try {
    const rawResponse = await fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
