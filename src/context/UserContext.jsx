import { createContext, useContext, useState, useEffect } from 'react'
import { userStorage, pointsStorage, settingsStorage } from '../utils/storage'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  // Load data from localStorage or use defaults
  const [user, setUser] = useState(() => userStorage.getProfile())
  const [points, setPoints] = useState(() => pointsStorage.getPoints())
  const [settings, setSettings] = useState(() => settingsStorage.get())
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Save to localStorage whenever state changes
  useEffect(() => {
    userStorage.saveProfile(user)
  }, [user])

  useEffect(() => {
    pointsStorage.savePoints(points)
  }, [points])

  useEffect(() => {
    settingsStorage.save(settings)
  }, [settings])

  // User actions
  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const updatePoints = (updates) => {
    setPoints(prev => ({ ...prev, ...updates }))
  }

  const addPoints = (amount) => {
    setPoints(prev => ({
      ...prev,
      total: prev.total + amount,
      available: prev.available + amount
    }))
  }

  const deductPoints = (amount, type = 'utilized') => {
    setPoints(prev => {
      if (prev.available >= amount) {
        return {
          ...prev,
          available: prev.available - amount,
          [type]: prev[type] + amount
        }
      }
      return prev
    })
  }

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
    // Optionally clear data or keep it for next login
  }

  const value = {
    user,
    setUser,
    updateUser,
    points,
    setPoints,
    updatePoints,
    addPoints,
    deductPoints,
    settings,
    updateSettings,
    isAuthenticated,
    login,
    logout
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext


