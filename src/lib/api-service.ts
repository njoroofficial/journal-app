// JSONPlaceholder API Endpoint

const MAX_RETRIES = 3;

/**
 * Utility function for making API calls with exponential backoff.
 * @param {string} url - The URL to fetch.
 * @param {object} options - Fetch options (method, headers, body).
 * @param {number} retries - Current retry count.
 * @returns {Promise<any>} - The response data.
 */
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries: number = 0
): Promise<any> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Handle 204 No Content for DELETE requests
    if (response.status === 204 || options.method === "DELETE") {
      return {};
    }
    return response.json();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      const delay = Math.pow(2, retries) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries + 1);
    }
    console.error(
      `Failed to fetch ${url} after ${MAX_RETRIES} attempts.`,
      error
    );
    throw new Error("Network request failed.");
  }
};

export { fetchWithRetry };
