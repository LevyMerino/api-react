export async function getItems(page) {
  try {
    const url = `https://digimon-api.com/api/v1/digimon?page=${page}`;
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

export async function getItem(url) {
  try {
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
