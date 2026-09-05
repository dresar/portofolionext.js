"use client"

import { useState, useEffect } from "react"
import fetchInstance from "@/lib/fetch"
import { cache } from "@/lib/cache"

type UseApiOptions = {
  cacheKey?: string
  useCache?: boolean
  refetchInterval?: number
}

export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
) {
  const { cacheKey, useCache = true, refetchInterval } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check cache first
      if (useCache && cacheKey) {
        const cached = cache.get<T>(cacheKey)
        if (cached) {
          setData(cached)
          setLoading(false)
          // Still fetch in background for fresh data
          fetchFreshData()
          return
        }
      }

      await fetchFreshData()
    } catch (err) {
      setError(err as Error)
      setLoading(false)
    }
  }

  const fetchFreshData = async () => {
    try {
      const response = await fetchInstance.get<T>(url)
      setData(response.data)
      setLoading(false)

      // Cache the data
      if (useCache && cacheKey) {
        cache.set(cacheKey, response.data)
      }
    } catch (err) {
      setError(err as Error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Set up refetch interval if provided
    let interval: NodeJS.Timeout | null = null
    if (refetchInterval) {
      interval = setInterval(fetchData, refetchInterval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [url, cacheKey])

  return { data, loading, error, refetch: fetchData }
}

