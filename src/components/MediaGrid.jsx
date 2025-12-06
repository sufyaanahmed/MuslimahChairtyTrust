import { useState, useRef, useEffect } from 'react'

// Helper function to optimize Cloudinary URLs
// Images load DIRECTLY from Cloudinary CDN (fast!)
const optimizeCloudinaryUrl = (url, width = 800, quality = 'auto', format = 'auto') => {
  if (!url) return url
  
  // Check if it's a Cloudinary URL
  if (url.includes('cloudinary.com')) {
    // Check if transformations already exist
    const uploadIndex = url.indexOf('/upload/')
    if (uploadIndex !== -1) {
      const afterUpload = url.substring(uploadIndex + 8) // After '/upload/'
      // If it doesn't start with transformation params, add them
      if (!afterUpload.match(/^[^/]+,[^/]+\//) && !afterUpload.match(/^v\d+\//)) {
        // No transformations, add them
        return url.replace('/upload/', `/upload/w_${width},q_${quality},f_${format}/`)
      }
    }
  }
  
  // Not a Cloudinary URL or already has transformations, return as-is
  return url
}

const MediaItem = ({ item }) => {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const imgRef = useRef(null)
  const itemRef = useRef(null)

  // Intersection Observer for lazy loading - only load when item is visible
  useEffect(() => {
    if (!itemRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '50px' } // Start loading 50px before item is visible
    )

    observer.observe(itemRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Optimize Cloudinary URLs for images
  // Images load DIRECTLY from Cloudinary CDN, not through Google Sheets!
  const optimizedUrl = item.type === 'image' 
    ? optimizeCloudinaryUrl(item.url, 800, 'auto', 'auto')
    : item.url

  return (
    <div ref={itemRef} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {item.type === 'image' ? (
        <div className="relative w-full h-64 bg-gray-200">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-300 w-full h-full"></div>
            </div>
          )}
          {inView && (
            <img
              ref={imgRef}
              src={optimizedUrl}
              alt={`Media ${item.media_id}`}
              loading="lazy"
              decoding="async"
              className={`w-full h-64 object-cover transition-opacity duration-300 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                e.target.style.display = 'none'
                const errorDiv = e.target.nextElementSibling
                if (errorDiv) errorDiv.classList.remove('hidden')
              }}
            />
          )}
          <div className="hidden text-center text-gray-500 p-4">
            Failed to load image
          </div>
        </div>
      ) : (
        <video
          src={inView ? item.url : ''}
          controls
          preload="none"
          className="w-full h-64 object-cover"
          poster={item.poster && inView ? optimizeCloudinaryUrl(item.poster, 800) : ''}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

const MediaGrid = ({ media }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {media.map((item) => (
        <MediaItem key={item.media_id} item={item} />
      ))}
    </div>
  )
}

export default MediaGrid


