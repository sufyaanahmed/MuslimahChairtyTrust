import { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const { casesLoading, mediaLoading, statsLoading } = useData()

  useEffect(() => {
    // Calculate progress
    let loaded = 0
    const total = 3 // cases, media, stats

    if (!casesLoading) loaded++
    if (!mediaLoading) loaded++
    if (!statsLoading) loaded++

    const newProgress = Math.min((loaded / total) * 100, 100)
    setProgress(newProgress)

    // When everything is loaded, wait a bit then hide loader
    if (!casesLoading && !mediaLoading && !statsLoading) {
      // Preload images
      preloadImages()
      
      // Wait a minimum of 1.5 seconds for smooth UX
      const timer = setTimeout(() => {
        if (onComplete) onComplete()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [casesLoading, mediaLoading, statsLoading, onComplete])

  const preloadImages = () => {
    // Preload hero image
    const heroImg = new Image()
    heroImg.src = '/hero_image2.jpg'

    // Preload logo
    const logoImg = new Image()
    logoImg.src = '/Logo.jpeg'
  }

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Logo Animation */}
        <div className="relative">
          <img 
            src="/Logo.jpeg" 
            alt="Muslimah Charity Trust Logo" 
            className="h-32 w-32 object-contain animate-pulse"
          />
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Muslimah Charity Trust
          </h2>
          <p className="text-primary">Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default Loader

