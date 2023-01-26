export async function getPeople() {
  try {
    const url = "https://www.digi-api.com/api/v1/digimon";
    const response = await fetch(url);
    if (!response.ok) {
      throw new NetworkError();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

class NetworkError extends Error {
  constructor() {
    super("Network error");
  }
}
