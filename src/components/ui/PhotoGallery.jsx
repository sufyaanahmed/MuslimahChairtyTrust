import { useState, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Button } from './button'

// Helper to optimize Cloudinary URLs
const optimizeCloudinaryUrl = (url, width = 400, quality = 'auto', format = 'auto') => {
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

const Photo = ({
  src,
  alt,
  className,
  direction = 'left',
  width = 220,
  height = 220,
  ...props
}) => {
  const [rotation, setRotation] = useState(0)
  const x = useMotionValue(200)
  const y = useMotionValue(200)

  useEffect(() => {
    const randomRotation = (Math.random() * 3 + 1) * (direction === 'left' ? -1 : 1)
    setRotation(randomRotation)
  }, [direction])

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  const resetMouse = () => {
    x.set(200)
    y.set(200)
  }

  const optimizedSrc = optimizeCloudinaryUrl(src, width, 'auto', 'auto')

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === 'left' ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        transform: 'rotate(0deg) rotateX(0deg) rotateY(0deg)',
        zIndex: 1,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'none',
      }}
      className={cn(
        className,
        'relative mx-auto shrink-0 cursor-grab active:cursor-grabbing'
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-lg">
        <img
          className={cn('rounded-3xl object-cover w-full h-full')}
          src={optimizedSrc}
          alt={alt}
          draggable={false}
          loading="lazy"
          {...props}
        />
      </div>
    </motion.div>
  )
}

export const PhotoGallery = ({ 
  media = [], 
  animationDelay = 0.5,
  onViewAll 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, animationDelay * 1000)

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true)
      },
      (animationDelay + 0.4) * 1000
    )

    return () => {
      clearTimeout(visibilityTimer)
      clearTimeout(animationTimer)
    }
  }, [animationDelay])

  // Get first 5 images from media
  const imageMedia = media.filter(item => item.type === 'image').slice(0, 5)

  // If no media provided, use default photos
  const photos = imageMedia.length > 0
    ? imageMedia.map((item, index) => ({
        id: item.media_id || index,
        order: index,
        x: ['-320px', '-160px', '0px', '160px', '320px'][index] || '0px',
        y: ['15px', '32px', '8px', '22px', '44px'][index] || '0px',
        zIndex: 50 - (index * 10),
        direction: index % 2 === 0 ? 'left' : 'right',
        src: item.url,
        alt: `Gallery image ${index + 1}`,
      }))
    : [
        {
          id: 1,
          order: 0,
          x: '-320px',
          y: '15px',
          zIndex: 50,
          direction: 'left',
          src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
        },
        {
          id: 2,
          order: 1,
          x: '-160px',
          y: '32px',
          zIndex: 40,
          direction: 'left',
          src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=400&fit=crop',
        },
        {
          id: 3,
          order: 2,
          x: '0px',
          y: '8px',
          zIndex: 30,
          direction: 'right',
          src: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop',
        },
        {
          id: 4,
          order: 3,
          x: '160px',
          y: '22px',
          zIndex: 20,
          direction: 'right',
          src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
        },
        {
          id: 5,
          order: 4,
          x: '320px',
          y: '44px',
          zIndex: 10,
          direction: 'left',
          src: 'https://images.unsplash.com/photo-1493612276216-aa392422ebbc?w=400&h=400&fit=crop',
        },
      ]

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  }

  return (
    <div className="mt-20 relative">
      <div className="absolute inset-0 max-md:hidden top-[200px] -z-10 h-[300px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <p className="lg:text-md my-2 text-center text-xs font-light uppercase tracking-widest text-gray-600">
        A Journey Through Visual Stories
      </p>
      
      <h3 className="z-20 mx-auto max-w-2xl justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text py-3 text-center text-4xl text-transparent md:text-7xl">
        Welcome to Our <span className="text-primary">Gallery</span>
      </h3>

      <div className="relative mb-8 h-[350px] w-full items-center justify-center lg:flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            <div className="relative h-[220px] w-[220px]">
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{
                    x: photo.x,
                    y: photo.y,
                    order: photo.order,
                  }}
                >
                  <Photo
                    width={220}
                    height={220}
                    src={photo.src}
                    alt={photo.alt}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {onViewAll && (
        <div className="flex w-full justify-center">
          <Button onClick={onViewAll}>
            View All Stories
          </Button>
        </div>
      )}
    </div>
  )
}

