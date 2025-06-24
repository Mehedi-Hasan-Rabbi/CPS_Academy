const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

if (!STRAPI_API_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined in your .env.local file.");
}

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${STRAPI_API_URL}${path}${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(requestUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(`Error fetching data from ${requestUrl}`);
  }

  return await res.json();
}