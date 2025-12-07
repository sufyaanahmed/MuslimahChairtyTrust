import { useState, useEffect, useRef, useCallback } from 'react'
import { useData } from '../context/DataContext'
import { PhotoGallery } from '../components/ui/PhotoGallery'
import MediaGrid from '../components/MediaGrid'

const Gallery = () => {
  const { media, mediaLoading } = useData()
  const [visibleMedia, setVisibleMedia] = useState([])
  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showFullGallery, setShowFullGallery] = useState(false)
  const observerRef = useRef(null)
  const itemsPerPage = 12 // Load 12 items at a time

  // Initialize with first page
  useEffect(() => {
    if (media.length > 0) {
      setVisibleMedia(media.slice(0, itemsPerPage))
      setPage(1)
    }
  }, [media])

  // Load more items when scrolling
  const loadMore = useCallback(() => {
    if (isLoadingMore || visibleMedia.length >= media.length) return

    setIsLoadingMore(true)
    setTimeout(() => {
      const nextPage = page + 1
      const startIndex = 0
      const endIndex = nextPage * itemsPerPage
      setVisibleMedia(media.slice(startIndex, endIndex))
      setPage(nextPage)
      setIsLoadingMore(false)
    }, 300) // Small delay for smooth loading
  }, [page, media, visibleMedia.length, isLoadingMore, itemsPerPage])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const currentObserver = observerRef.current
    if (currentObserver) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoadingMore && visibleMedia.length < media.length) {
            loadMore()
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(currentObserver)

      return () => {
        if (currentObserver) {
          observer.unobserve(currentObserver)
        }
      }
    }
  }, [loadMore, isLoadingMore, visibleMedia.length, media.length])

  const handleViewAll = () => {
    setShowFullGallery(true)
    // Scroll to full gallery section
    setTimeout(() => {
      const element = document.getElementById('full-gallery')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <div className="py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {mediaLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        ) : media.length > 0 ? (
          <>
            {/* PhotoGallery Component - Featured Images */}
            <PhotoGallery 
              media={media} 
              animationDelay={0.3}
              onViewAll={handleViewAll}
            />

            {/* Full Gallery Grid */}
            {showFullGallery && (
              <div id="full-gallery" className="mt-20">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                  All Gallery Images
                </h2>
                <MediaGrid media={visibleMedia} />
                {/* Loading trigger element */}
                {visibleMedia.length < media.length && (
                  <div ref={observerRef} className="mt-8 text-center py-8">
                    {isLoadingMore ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-3 text-gray-600">Loading more...</span>
                      </div>
                    ) : (
                      <p className="text-gray-500">Scroll for more</p>
                    )}
                  </div>
                )}
                {visibleMedia.length >= media.length && media.length > 0 && (
                  <div className="mt-8 text-center py-4">
                    <p className="text-gray-500">All media loaded ({media.length} items)</p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No media available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery


