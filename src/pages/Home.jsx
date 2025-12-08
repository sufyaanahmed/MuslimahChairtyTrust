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
      <section 
        className="relative text-white py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero_image2.jpg)',
          minHeight: '500px',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Muslimah Charity Trust
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md">
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

      {/* Intro Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Welcome to Muslimah Charity Trust — Where compassion becomes a responsibility
          </h2>

          <h3 className="text-xl md:text-2xl font-semibold text-center mb-8 text-primary">
            Empowering Communities Through Service, Support & Sisterhood
          </h3>

          <div className="prose prose-lg mx-auto text-gray-700 space-y-4">
            <p className="text-center text-lg leading-relaxed">
              Muslimah Charity Trust is a community-driven initiative dedicated to supporting
              underprivileged families, vulnerable individuals, and struggling communities across
              the city. What began as a simple effort to help those in immediate need has grown
              into a movement of compassion, unity, and meaningful action.
            </p>

            <p className="text-center text-lg leading-relaxed">
              Our mission is rooted in dignity, care, and continuous support. Whether it's providing
              food, offering warmth, assisting the sick, or supporting vulnerable families,
              we believe in uplifting lives with sincerity and consistency. Every effort we make is
              a step toward building a stronger, more caring community for all.
      </p>

      <p className="text-center text-lg font-semibold text-primary mt-6">
        Our Current Impact
      </p>

      <div className="text-center text-lg leading-relaxed space-y-3 text-gray-800">
        <p> <strong>Food Kits Distribution:</strong> Around 200 food kits distributed daily to families in need</p>
        <p> <strong>Blanket Drives:</strong> Regular blanket distribution to individuals on the streets and in hospitals</p>
        <p> <strong>Friday Distribution:</strong> Weekly distribution of food, fresh fruits, and ration kits every Friday</p>
        <p> <strong>Community Support:</strong> Ongoing support for vulnerable families and individuals</p>
      </div>
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5,513</div>
              <div className="text-gray-700 font-medium">Total Donated Donors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">13</div>
              <div className="text-gray-700 font-medium">Total Cases</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1,308</div>
              <div className="text-gray-700 font-medium">Total Donors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">203</div>
              <div className="text-gray-700 font-medium">Our Volunteers</div>
            </div>
          </div>
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


