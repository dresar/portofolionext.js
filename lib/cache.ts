// Browser cache utility using localStorage and sessionStorage

const CACHE_PREFIX = "portfolio_cache_"
const CACHE_EXPIRY = 5 * 60 * 1000 // 5 minutes

type CacheData<T> = {
  data: T
  timestamp: number
}

export const cache = {
  // Set cache with expiry
  set<T>(key: string, data: T, useSession = false): void {
    if (typeof window === "undefined") return

    const storage = useSession ? sessionStorage : localStorage
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    }
    storage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheData))
  },

  // Get cache if not expired
  get<T>(key: string, useSession = false): T | null {
    if (typeof window === "undefined") return null

    const storage = useSession ? sessionStorage : localStorage
    const cached = storage.getItem(`${CACHE_PREFIX}${key}`)

    if (!cached) return null

    try {
      const cacheData: CacheData<T> = JSON.parse(cached)
      const now = Date.now()

      // Check if cache is expired
      if (now - cacheData.timestamp > CACHE_EXPIRY) {
        storage.removeItem(`${CACHE_PREFIX}${key}`)
        return null
      }

      return cacheData.data
    } catch {
      return null
    }
  },

  // Remove cache
  remove(key: string, useSession = false): void {
    if (typeof window === "undefined") return

    const storage = useSession ? sessionStorage : localStorage
    storage.removeItem(`${CACHE_PREFIX}${key}`)
  },

  // Clear all cache
  clear(useSession = false): void {
    if (typeof window === "undefined") return

    const storage = useSession ? sessionStorage : localStorage
    const keys = Object.keys(storage)
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        storage.removeItem(key)
      }
    })
  },
}

