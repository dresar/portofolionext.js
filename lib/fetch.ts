// Native fetch wrapper to replace axios - Faster and lighter

const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api"
const defaultTimeout = 10000

type FetchOptions = RequestInit & {
  timeout?: number
}

// Create fetch wrapper with default config
async function fetchWrapper<T>(
  url: string,
  options: FetchOptions = {}
): Promise<{ data: T; status: number; statusText: string }> {
  const { timeout = defaultTimeout, ...fetchOptions } = options

  // No cache - always fetch fresh data for live server
  if (fetchOptions.method === "get" || !fetchOptions.method) {
    fetchOptions.headers = {
      ...fetchOptions.headers,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    }
  }

  // Add default headers
  fetchOptions.headers = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  }

  // Create AbortController for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`
    const response = await fetch(fullUrl, {
      ...fetchOptions,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Handle 401 unauthorized
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
      throw new Error("Unauthorized")
    }

    // Parse JSON response
    const data = await response.json()

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    }
  } catch (error: any) {
    clearTimeout(timeoutId)

    if (error.name === "AbortError") {
      throw new Error("Request timeout")
    }

    throw error
  }
}

// Create instance-like methods for compatibility
const fetchInstance = {
  get: <T>(url: string, options?: FetchOptions) =>
    fetchWrapper<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, data?: any, options?: FetchOptions) =>
    fetchWrapper<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(url: string, data?: any, options?: FetchOptions) =>
    fetchWrapper<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T>(url: string, data?: any, options?: FetchOptions) =>
    fetchWrapper<T>(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(url: string, options?: FetchOptions) =>
    fetchWrapper<T>(url, { ...options, method: "DELETE" }),
}

export default fetchInstance

