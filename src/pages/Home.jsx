import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import CaseCard from '../components/CaseCard'
import MediaGrid from '../components/MediaGrid'

const Home = () => {
  const { cases, media, loading } = useData()

  // Get featured items (first 3)
  const featuredCases = useMemo(() => cases.slice(0, 3), [cases])
  const featuredMedia = useMemo(() => media.slice(0, 3), [media])

  const handleDonate = (caseData) => {
    window.location.href = `/cases#case-${caseData.case_id}`
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-green-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Muslimah Charity Trust
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-50">
            Empowering communities through compassion and care
          </p>
          <Link
            to="/cases"
            className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Donate Now
          </Link>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Cases
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading cases...</p>
            </div>
          ) : featuredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCases.map((caseData) => (
                <CaseCard
                  key={caseData.case_id}
                  caseData={caseData}
                  onDonate={handleDonate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No cases available at the moment.</p>
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/cases"
              className="inline-block text-primary font-semibold hover:underline"
            >
              View All Cases →
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Our Mission
          </h2>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="text-center text-lg leading-relaxed">
              At Muslimah Charity Trust, we are dedicated to making a meaningful difference
              in the lives of those in need. Our mission is to provide support, care, and
              resources to communities, ensuring that every individual has access to the
              help they deserve. Through compassion, transparency, and dedicated service,
              we strive to create a better tomorrow for all.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Media */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Gallery
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : featuredMedia.length > 0 ? (
            <MediaGrid media={featuredMedia} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No media available at the moment.</p>
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-block text-primary font-semibold hover:underline"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home


