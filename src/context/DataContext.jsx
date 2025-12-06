import { createContext, useContext, useEffect, useState } from 'react'
import { fetchCases, fetchMedia } from '../api/api'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [cases, setCases] = useState([])
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [casesLoading, setCasesLoading] = useState(true)
  const [mediaLoading, setMediaLoading] = useState(true)

  // Fetch cases immediately on app load
  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await fetchCases(true) // Use cache
        setCases(data)
      } catch (error) {
        console.error('Error loading cases:', error)
      } finally {
        setCasesLoading(false)
      }
    }

    loadCases()
  }, [])

  // Fetch media on app load
  useEffect(() => {
    const loadMedia = async () => {
      try {
        const data = await fetchMedia(true) // Use cache
        setMedia(data)
      } catch (error) {
        console.error('Error loading media:', error)
      } finally {
        setMediaLoading(false)
      }
    }

    loadMedia()
  }, [])

  // Update loading state when both are done
  useEffect(() => {
    if (!casesLoading && !mediaLoading) {
      setLoading(false)
    }
  }, [casesLoading, mediaLoading])

  // Refresh functions
  const refreshCases = async () => {
    setCasesLoading(true)
    try {
      const data = await fetchCases(false) // Bypass cache
      setCases(data)
    } catch (error) {
      console.error('Error refreshing cases:', error)
    } finally {
      setCasesLoading(false)
    }
  }

  const refreshMedia = async () => {
    setMediaLoading(true)
    try {
      const data = await fetchMedia(false) // Bypass cache
      setMedia(data)
    } catch (error) {
      console.error('Error refreshing media:', error)
    } finally {
      setMediaLoading(false)
    }
  }

  const value = {
    cases,
    media,
    loading,
    casesLoading,
    mediaLoading,
    refreshCases,
    refreshMedia,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

