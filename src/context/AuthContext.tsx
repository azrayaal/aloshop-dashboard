import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface AuthUser {
  name: string
  email: string
  role: string
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
}

const STORAGE_KEY = 'aloshop.admin.auth'

const AuthContext = createContext<AuthContextValue | null>(null)

function readStored(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

/**
 * Dummy auth provider — no real backend. Any credentials "sign in" and the
 * session is persisted to localStorage so refreshes keep you logged in.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStored)

  const login = useCallback((email: string) => {
    const name = email.split('@')[0] || 'Budi Santoso'
    const nextUser: AuthUser = {
      name: name === 'admin' ? 'Budi Santoso' : name.replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: 'Seller Admin',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
