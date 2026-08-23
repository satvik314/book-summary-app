import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'bindery:'

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

/** State that survives a reload. Falls back to plain state if storage is unavailable. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => read(key, initialValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      /* private mode, quota, blocked storage — the app still works, it just forgets */
    }
  }, [key, value])

  return [value, setValue]
}

/** One-off read, for places that only need a snapshot (progress badges on the shelf). */
export function readStored(key, fallback) {
  return read(key, fallback)
}

/** Route changes need to nudge components that only read storage once. */
export function useStorageSignal() {
  const [signal, setSignal] = useState(0)
  return [signal, useCallback(() => setSignal((n) => n + 1), [])]
}
