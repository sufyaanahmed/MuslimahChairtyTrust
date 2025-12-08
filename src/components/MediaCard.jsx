import { useState } from 'react'

// Helper to optimize Cloudinary URLs
const optimizeCloudinaryUrl = (url, width = 800, quality = 'auto', format = 'auto') => {
  if (!url) return url
  if (url.includes('cloudinary.com')) {
    const uploadIndex = url.indexOf('/upload/')
    if (uploadIndex !== -1) {
      const afterUpload = url.substring(uploadIndex + 8)
      if (!afterUpload.match(/^[^/]+,[^/]+\//) && !afterUpload.match(/^v\d+\//)) {
        return url.replace('/upload/', `/upload/w_${width},q_${quality},f_${format}/`)
      }
    }
  }
  return url
}

const MediaCard = ({ item }) => {
  const [loaded, setLoaded] = useState(false)
  const optimizedUrl = item.type === 'image' 
    ? optimizeCloudinaryUrl(item.url, 800, 'auto', 'auto')
    : item.url

  return (
    <div className="relative rounded-2xl overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105">
      {item.type === 'image' ? (
        <>
          <div className="relative w-full">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="animate-pulse bg-gray-300 w-full h-full"></div>
              </div>
            )}
            <img
              src={optimizedUrl}
              alt={`Media ${item.media_id}`}
              className={`w-full h-auto object-cover transition-opacity duration-300 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        </>
      ) : (
        <>
          <video
            src={item.url}
            controls
            preload="none"
            className="w-full h-auto object-cover"
            poster={item.poster ? optimizeCloudinaryUrl(item.poster, 800) : ''}
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
        </>
      )}
    </div>
  )
}

export default MediaCard

