import { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'

// Preload critical images immediately - before component even mounts
const preloadCriticalImages = () => {
  // Preload hero images
  const heroImg1 = new Image()
  heroImg1.src = '/Hero_image_1.jpg'
  
  const heroImg2 = new Image()
  heroImg2.src = '/Hero_image_2.jpg'

  // Preload logo
  const logoImg = new Image()
  logoImg.src = '/Logo.jpeg'
}

// Start preloading as soon as this module loads
preloadCriticalImages()

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
      // Images should already be preloaded at this point
      // Wait a minimum of 1 second for smooth UX
      const timer = setTimeout(() => {
        if (onComplete) onComplete()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [casesLoading, mediaLoading, statsLoading, onComplete])

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
          
          {/* Progress Bar */}
          <div className="mt-4 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  )
}

export default Loader
