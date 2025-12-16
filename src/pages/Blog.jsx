import { useEffect, useState } from 'react'
import { fetchBlogs } from '../api/api'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchBlogs(true)
        setBlogs(data)
      } catch (err) {
        console.error('Error loading blogs:', err)
        setError('Unable to load blogs at the moment. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [])

  const formatDate = (rawDate) => {
    if (!rawDate) return ''

    // Try to parse as a real Date first
    const parsed = new Date(rawDate)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    // Fallback for pre-formatted strings like "Mon Nov 18 2024 00:00:00 GMT+0530 (India Standard Time)"
    const match = String(rawDate).match(/\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\w+\s+\d{1,2}\s+\d{4}/)
    if (match && match[0]) {
      return match[0]
    }

    // Last resort: return original without anything after "GMT" or "("
    return String(rawDate).split('GMT')[0].split('(')[0].trim()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative text-white py-16 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/our_story_banner.jpg)',
          minHeight: '320px',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-accent drop-shadow-md">
            Stories, reflections, and updates from Muslimah Charity Trust
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading blogs...</p>
            </div>
          )}

          {error && !loading && (
            <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-md text-sm text-gray-800">
              {error}
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No blogs have been published yet.</p>
            </div>
          )}

          {!loading && blogs.length > 0 && (
            <div className="space-y-8">
              {blogs.map((blog) => (
                <article
                  key={blog.id || blog.slug || blog.title}
                  className="bg-white rounded-xl shadow-md border border-accent/40 overflow-hidden flex flex-col md:flex-row"
                >
                  {blog.imageUrl && (
                    <div className="md:w-1/3">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-48 md:h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className={`p-6 md:p-8 ${blog.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-xs md:text-sm text-gray-500">
                      {blog.date && (
                        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 font-medium text-gray-900">
                          {formatDate(blog.date)}
                        </span>
                      )}
                      {blog.author && (
                        <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 font-medium text-white">
                          By {blog.author}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                      <span className="bg-accent/60 px-1 rounded-sm">
                        {blog.title}
                      </span>
                    </h2>
                    {blog.summary && (
                      <p className="text-gray-700 mb-3 text-sm md:text-base">
                        {blog.summary}
                      </p>
                    )}
                    {blog.content && (
                      <div className="text-gray-700 text-sm md:text-base space-y-3">
                        {String(blog.content)
                          .split(/\n\s*\n/) // split into paragraphs on blank lines
                          .filter((para) => para.trim().length > 0)
                          .map((para, index) => (
                            <p key={index} className="leading-relaxed whitespace-pre-line">
                              {para.trim()}
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blog


