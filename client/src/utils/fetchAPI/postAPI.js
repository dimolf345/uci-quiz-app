const { BASE_URL } = process.env;

export async function fetchPOST(endpoint, body) {
  const url = BASE_URL + endpoint;
  try {
    const rawResponse = await fetch(url, {
      method: "POST",
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

export async function fetchGET() {}
