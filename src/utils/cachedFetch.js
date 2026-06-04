const cache = new Map();

/**
 * A wrapper around the global fetch that caches GET requests in memory.
 * Exposes a similar API signature to the native response object.
 */
export const cachedFetch = async (url, options = {}) => {
  const method = (options.method || 'GET').toUpperCase();
  if (method !== 'GET') {
    return fetch(url, options);
  }

  // Create a unique cache key based on the URL and options headers
  const cacheKey = JSON.stringify({ url, headers: options.headers || {} });

  if (!cache.has(cacheKey)) {
    const promise = (async () => {
      // Build clean headers to prevent WAF/ModSecurity blocks (e.g. 415/403 errors) on GitHub Actions
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        ...(options.headers || {})
      };

      // Strip Content-Type from GET requests to avoid triggering ModSecurity body parsing issues (which cause 415)
      if (headers['Content-Type']) delete headers['Content-Type'];
      if (headers['content-type']) delete headers['content-type'];

      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} url: ${url}`);
      }
      
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      return { data, headers: response.headers };
    })();

    cache.set(cacheKey, promise);

    // If the fetch fails, remove it from the cache so it can be retried later
    promise.catch(() => {
      cache.delete(cacheKey);
    });
  }

  const result = await cache.get(cacheKey);

  return {
    ok: true,
    headers: result.headers,
    json: async () => {
      // If data is a string (e.g. from text response), try parsing it as JSON if requested
      if (typeof result.data === 'string') {
        try {
          return JSON.parse(result.data);
        } catch {
          return result.data;
        }
      }
      return result.data;
    },
    text: async () => {
      if (typeof result.data === 'string') {
        return result.data;
      }
      return JSON.stringify(result.data);
    }
  };
};
