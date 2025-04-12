const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Generic GET request.
 * @param {string} endpoint - The endpoint path (e.g., '/data').
 * @returns {Promise<any>} - The response data as JSON.
 */
export async function apiGet(endpoint: string) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) {
      throw new Error(`GET request failed: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`GET ${endpoint} error:`, error);
    throw error;
  }
}

/**
 * Generic POST request.
 * @param {string} endpoint - The endpoint path (e.g., '/ai').
 * @param {Object} bodyData - The payload to send.
 * @returns {Promise<any>} - The response data as JSON.
 */
export async function apiPost(endpoint: string, bodyData: object) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });
    if (!res.ok) {
      throw new Error(`POST request failed: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`POST ${endpoint} error:`, error);
    throw error;
  }
}
