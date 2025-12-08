import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import CaseCard from '../components/CaseCard'
import MediaGrid from '../components/MediaGrid'
import NumberFlowComponent from '../components/ui/NumberFlow'
import { fetchStats } from '../api/api'
import { QuranHero } from '../components/ui/QuranHero'

const Home = () => {
  const { cases, media, loading } = useData()
  const [isLoaded, setIsLoaded] = useState(false)
  const [stats, setStats] = useState({
    total_donors: 0,
    total_cases: 0,
    our_volunteers: 0
  })
  const [statsLoading, setStatsLoading] = useState(true)

  // Get featured items (first 3)
  const featuredCases = useMemo(() => cases.slice(0, 3), [cases])
  const featuredMedia = useMemo(() => media.slice(0, 3), [media])

  useEffect(() => {
    // Trigger animation after component mounts
    setIsLoaded(true)
    
    // Fetch stats from Google Sheets
    const loadStats = async () => {
      try {
        setStatsLoading(true)
        const statsData = await fetchStats(true)
        setStats(statsData)
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }
    
    loadStats()
  }, [])

  const handleDonate = (caseData) => {
    window.location.href = `/cases#case-${caseData.case_id}`
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className={`relative text-white py-20 px-4 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: 'url(/hero_image2.jpg)',
          minHeight: '500px',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
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

        {/* Inverted Triangle Divider - Transparent triangle showing image, white below */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg
            className="relative block w-full h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            {/* White fill only below the triangle - triangle area is transparent */}
            <path
              d="M0,120 L1200,120 L1200,0 L600,60 L0,0Z"
              fill="white"
            />
          </svg>
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

      {/* Quran Verse Section */}
      <div className="mt-12">
        <QuranHero
          englishText="Indeed, the men who practice charity and the women who practice charity and [they who] have loaned Allāh a goodly loan – it will be multiplied for them, and they will have a noble reward."
          verseReference="Quran 57:18"
          gradient={true}
          blur={true}
        />
      </div>
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {statsLoading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  <NumberFlowComponent 
                    value={stats.total_donors} 
                    trend={false}
                    className="text-primary"
                  />
                )}
              </div>
              <div className="text-gray-700 font-medium">Total Donors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {statsLoading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  <NumberFlowComponent 
                    value={stats.total_cases} 
                    trend={false}
                    className="text-primary"
                  />
                )}
              </div>
              <div className="text-gray-700 font-medium">Total Cases</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {statsLoading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  <NumberFlowComponent 
                    value={stats.our_volunteers} 
                    trend={false}
                    className="text-primary"
                  />
                )}
              </div>
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


